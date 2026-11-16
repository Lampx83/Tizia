#!/bin/bash
# ============================================================
# deploy-prod.sh — đưa code đã COMMIT lên production tizia.vn
#
# VÌ SAO CÓ FILE NÀY
# Prod KHÔNG tự deploy khi push lên GitHub: không có CI, watchtower chỉ theo dõi
# sim-agent. Hai container `tizia` (Express) và `tizia-next` (Next, cửa trước)
# được build từ thư mục /home/codelab/tizia-dev trên server — thư mục này KHÔNG
# có .git, chỉ được cập nhật bằng tay. Merge vào `main` hay bất kỳ nhánh nào cũng
# không đưa được dòng nào lên prod. Còn `docker cp` vào container thì sống ngay
# nhưng mất ở lần rebuild sau (từng mất 300 ảnh biển báo GPLX vì vậy).
#
# Script này làm đúng một đường: HEAD đã commit → tizia-dev → rebuild → kiểm tra.
#   1) Kiểm tra trước: nhánh, cây làm việc sạch, HEAD đã push, SSH tới được.
#   2) Xuất HEAD bằng `git archive` (chỉ file đã commit, không lẫn file rác/.env).
#   3) Dry-run: liệt kê file sẽ đổi trên prod, tự chọn container cần rebuild.
#   4) Hỏi xác nhận, rồi rsync. File bị ghi đè được rsync cất sang
#      /home/codelab/tizia-dev/.bak-deploy-<giờ>/ để quay lại khi cần.
#   5) `docker compose up -d --build` đúng các service cần, chờ healthy.
#   6) Kiểm tra: /api/health, trang chủ, md5 file trong container = file trong
#      tizia-dev, và scripts/check-deployed-build.mjs.
#
# KHÔNG BAO GIỜ đụng: .env, docker-compose.yml, Dockerfile, node_modules,
# web-next/.env.local, dữ liệu /data, Postgres. Thay đổi cấu trúc bảng (DDL)
# phải tự chạy trên tizia-postgres TRƯỚC khi deploy.
#
# CÁCH DÙNG:
#   bash scripts/deploy-prod.sh --dry-run      # chỉ xem sẽ đổi gì, không ghi gì
#   bash scripts/deploy-prod.sh                # deploy, có hỏi xác nhận
#   bash scripts/deploy-prod.sh --only next    # chỉ web-next → tizia-next
#   bash scripts/deploy-prod.sh --only tizia   # chỉ server/public/scripts → tizia
#
# Tuỳ chọn khác:
#   --yes            không hỏi xác nhận
#   --delete         xoá trên prod các file đã bị xoá khỏi git (vẫn cất vào .bak)
#   --allow-dirty    cho deploy khi cây làm việc còn thay đổi chưa commit
#                    (vẫn chỉ deploy HEAD — thay đổi chưa commit KHÔNG lên prod)
#   --any-branch     cho deploy từ nhánh khác nhánh prod
#   --skip-verify    bỏ bước 6
#
# Biến môi trường: PROD_HOST (mặc định tizia-prod — alias trong ~/.ssh/config),
# PROD_DIR, PROD_BRANCH, PROD_URL.
#
# QUAY LẠI BẢN TRƯỚC: script in sẵn lệnh ở cuối, dạng
#   ssh tizia-prod 'cd /home/codelab/tizia-dev && cp -a .bak-deploy-<giờ>/. . \
#     && rm -f DEPLOY-INFO && docker compose up -d --build tizia tizia-next'
# Lệnh này trả lại các file bị ghi đè/xoá; file MỚI thêm trong lần deploy đó vẫn
# nằm lại (thường vô hại vì code cũ không gọi tới).
# ============================================================
set -euo pipefail

PROD_HOST="${PROD_HOST:-tizia-prod}"
PROD_DIR="${PROD_DIR:-/home/codelab/tizia-dev}"
PROD_BRANCH="${PROD_BRANCH:-feat/postgres-migration}"
PROD_URL="${PROD_URL:-https://tizia.vn}"

DRY_RUN=0 ASSUME_YES=0 DELETE=0 ALLOW_DIRTY=0 ANY_BRANCH=0 SKIP_VERIFY=0 ONLY=""
while [ $# -gt 0 ]; do
  case "$1" in
    --dry-run) DRY_RUN=1 ;;
    --yes|-y) ASSUME_YES=1 ;;
    --delete) DELETE=1 ;;
    --allow-dirty) ALLOW_DIRTY=1 ;;
    --any-branch) ANY_BRANCH=1 ;;
    --skip-verify) SKIP_VERIFY=1 ;;
    --only) ONLY="${2:-}"; shift ;;
    -h|--help) sed -n '2,48p' "$0"; exit 0 ;;
    *) echo "Không hiểu tuỳ chọn: $1 (xem --help)" >&2; exit 2 ;;
  esac
  shift
done

# Nguồn của từng container — khớp COPY trong Dockerfile và build.context trong
# docker-compose.yml trên prod.
TIZIA_PATHS="server public scripts package.json package-lock.json"
NEXT_PATHS="web-next"
case "$ONLY" in
  "") PATHS="$TIZIA_PATHS $NEXT_PATHS" ;;
  tizia) PATHS="$TIZIA_PATHS" ;;
  next|tizia-next) PATHS="$NEXT_PATHS" ;;
  *) echo "--only nhận 'tizia' hoặc 'next'" >&2; exit 2 ;;
esac

EXCLUDES=(--exclude node_modules --exclude .next --exclude '.env' --exclude '.env.*'
          --exclude .DS_Store --exclude .claude --exclude tsconfig.tsbuildinfo --exclude '*.log')

say()  { printf '\n\033[1m== %s\033[0m\n' "$*"; }
warn() { printf '\033[33m⚠️  %s\033[0m\n' "$*"; }
die()  { printf '\033[31m✗ %s\033[0m\n' "$*" >&2; exit 1; }

cd "$(git rev-parse --show-toplevel)"

# ---- 1) Kiểm tra trước ----
say "Kiểm tra trước"
BRANCH="$(git rev-parse --abbrev-ref HEAD)"
SHA="$(git rev-parse --short HEAD)"
echo "Nhánh: $BRANCH @ $SHA — $(git log -1 --format=%s | cut -c1-90)"
if [ "$BRANCH" != "$PROD_BRANCH" ] && [ $ANY_BRANCH -eq 0 ]; then
  die "Prod chạy nhánh $PROD_BRANCH, bạn đang ở $BRANCH. Thêm --any-branch nếu thật sự muốn."
fi
if [ -n "$(git status --porcelain)" ]; then
  [ $ALLOW_DIRTY -eq 1 ] || die "Còn thay đổi chưa commit. Commit trước, hoặc --allow-dirty (chỉ HEAD được deploy)."
  warn "Còn thay đổi chưa commit — chúng sẽ KHÔNG lên prod."
fi
git fetch -q origin "$BRANCH" 2>/dev/null || warn "Không fetch được origin/$BRANCH."
if git rev-parse -q --verify "origin/$BRANCH" >/dev/null; then
  AHEAD="$(git rev-list --count "origin/$BRANCH..HEAD")"
  BEHIND="$(git rev-list --count "HEAD..origin/$BRANCH")"
  [ "$AHEAD" = 0 ] || warn "HEAD có $AHEAD commit chưa push lên GitHub — nên push để người khác không deploy đè mất."
  [ "$BEHIND" = 0 ] || die "origin/$BRANCH có $BEHIND commit bạn chưa có. Pull/merge trước, kẻo deploy xoá việc của người khác."
fi
ssh -o ConnectTimeout=10 "$PROD_HOST" "test -f '$PROD_DIR/docker-compose.yml'" \
  || die "Không SSH được $PROD_HOST hoặc không thấy $PROD_DIR/docker-compose.yml."

# ---- 2) Xuất HEAD ----
STAGE="$(mktemp -d "${TMPDIR:-/tmp}/tizia-deploy.XXXXXX")"
trap 'rm -rf "$STAGE"' EXIT
# shellcheck disable=SC2086
git archive --format=tar HEAD $PATHS | tar -x -C "$STAGE"

# ---- 3) Dry-run ----
say "Các file sẽ đổi trên prod ($PROD_HOST:$PROD_DIR)"
# Không dùng -t: `git archive` đặt giờ sửa = giờ commit, -t sẽ liệt kê cả nghìn
# file chỉ khác giờ. So nội dung bằng -c là đủ.
RSYNC_OPTS=(-rlc --relative "${EXCLUDES[@]}" --out-format='%i %n')
[ $DELETE -eq 1 ] && RSYNC_OPTS+=(--delete)
# shellcheck disable=SC2086
PLAN="$(cd "$STAGE" && rsync "${RSYNC_OPTS[@]}" -n $PATHS "$PROD_HOST:$PROD_DIR/" | grep -v '/$' || true)"
if [ -z "$PLAN" ]; then
  echo "Prod đã khớp HEAD $SHA — không có gì để deploy."
  exit 0
fi
CHANGED="$(printf '%s\n' "$PLAN" | grep -v '^\*deleting' | awk '{print $2}')"
DELETED="$(printf '%s\n' "$PLAN" | grep '^\*deleting' | awk '{print $2}' || true)"
NEW_COUNT="$(printf '%s\n' "$PLAN" | grep -c '^<f+++' || true)"
echo "$(printf '%s\n' "$CHANGED" | grep -c . || true) file đổi/thêm (mới: $NEW_COUNT), $(printf '%s\n' "$DELETED" | grep -c . || true) file xoá."
printf '%s\n' "$CHANGED" | awk -F/ '{ d = (NF > 2) ? $1"/"$2 : $1; c[d]++ } END { for (d in c) printf "  %5d  %s\n", c[d], d }' | sort -k2
[ -n "$DELETED" ] && { echo "Sẽ xoá:"; printf '  %s\n' $DELETED; }
if [ $DELETE -eq 0 ]; then
  echo "(File đã bị xoá khỏi git vẫn nằm lại trên prod. Dùng --delete để dọn.)"
fi

# Không dùng `grep -q` trong pipe: grep thoát sớm → printf ăn SIGPIPE → pipefail
# coi cả pipe là lỗi và bỏ qua container cần rebuild.
TOUCHED="$CHANGED
$DELETED"
SERVICES=""
grep -E '^(server|public|scripts|package)' <<<"$TOUCHED" >/dev/null && SERVICES="tizia"
grep '^web-next/' <<<"$TOUCHED" >/dev/null && SERVICES="$SERVICES tizia-next"
SERVICES="${SERVICES# }"
echo "Sẽ rebuild: ${SERVICES:-(không)}"

if grep -E '^server/(db|pg)\.js|migrations|schema' <<<"$CHANGED" >/dev/null; then
  warn "Có đổi file DB (db.js/pg.js/schema). Nếu thêm bảng/cột, chạy DDL trên tizia-postgres TRƯỚC rồi mới deploy."
fi
# Hot-patch `docker cp` chưa ghi vào tizia-dev sẽ biến mất khi rebuild — báo trước.
if [[ " $SERVICES " == *" tizia "* ]]; then
  MINES="$(ssh "$PROD_HOST" "cd '$PROD_DIR' && for f in server/*.js server/contexts/*/*.js public/*.html; do \
    [ -f \"\$f\" ] || continue; a=\$(docker exec tizia md5sum \"/app/\$f\" 2>/dev/null | cut -d' ' -f1); \
    b=\$(md5sum \"\$f\" | cut -d' ' -f1); [ -n \"\$a\" ] && [ \"\$a\" != \"\$b\" ] && echo \"\$f\"; done" || true)"
  if [ -n "$MINES" ]; then
    warn "Container tizia đang có file khác tizia-dev (hot-patch bằng docker cp?). Rebuild sẽ ghi đè:"
    printf '    %s\n' $MINES
    echo "    Xem: ssh $PROD_HOST 'docker exec tizia cat /app/<file>' trước khi tiếp tục."
  fi
fi

if [ $DRY_RUN -eq 1 ]; then
  echo; echo "Dry-run xong, chưa ghi gì lên prod."
  exit 0
fi

if [ $ASSUME_YES -eq 0 ]; then
  printf '\nDeploy %s @ %s lên %s? Gõ "deploy" để tiếp tục: ' "$BRANCH" "$SHA" "$PROD_URL"
  read -r ANSWER
  [ "$ANSWER" = "deploy" ] || die "Đã huỷ."
fi

# ---- 4) Sync (cất file bị ghi đè/xoá vào .bak) ----
TS="$(date +%Y%m%d-%H%M%S)"
BAK="$PROD_DIR/.bak-deploy-$TS"
say "Đồng bộ vào $PROD_DIR (bản cũ cất ở $BAK)"
# shellcheck disable=SC2086
(cd "$STAGE" && rsync "${RSYNC_OPTS[@]}" --backup --backup-dir="$BAK" $PATHS "$PROD_HOST:$PROD_DIR/" | grep -v '/$' | wc -l | xargs echo "Đã ghi file:")
ssh "$PROD_HOST" "mkdir -p '$BAK' && printf '%s\n' 'branch=$BRANCH' 'commit=$(git rev-parse HEAD)' 'deployed_at=$TS' 'by=$(git config user.name)' > '$BAK/DEPLOY-INFO' && cp '$BAK/DEPLOY-INFO' '$PROD_DIR/.last-deploy'"

# ---- 5) Rebuild ----
if [ -z "$SERVICES" ]; then
  echo "Không có container nào cần rebuild."
else
  say "Rebuild: $SERVICES (tizia-next mất vài phút)"
  ssh "$PROD_HOST" "cd '$PROD_DIR' && docker compose up -d --build $SERVICES"
  for svc in $SERVICES; do
    printf 'Chờ %s healthy' "$svc"
    for _ in $(seq 1 60); do
      st="$(ssh "$PROD_HOST" "docker inspect -f '{{.State.Health.Status}}' $svc" 2>/dev/null || echo '?')"
      [ "$st" = healthy ] && break
      printf '.'; sleep 5
    done
    echo " $st"
    [ "$st" = healthy ] || die "$svc chưa healthy sau 5 phút. Xem: ssh $PROD_HOST 'docker logs --tail 80 $svc'"
  done
fi

ROLLBACK="ssh $PROD_HOST 'cd $PROD_DIR && cp -a .bak-deploy-$TS/. . && rm -f DEPLOY-INFO && docker compose up -d --build ${SERVICES:-tizia}'"

# ---- 6) Kiểm tra ----
if [ $SKIP_VERIFY -eq 0 ]; then
  say "Kiểm tra"
  FAIL=0
  for path in /api/health /; do
    code="$(curl -s -o /dev/null -w '%{http_code}' --max-time 20 "$PROD_URL$path" || echo 000)"
    case "$code" in 2*|3*) echo "✓ $path → $code" ;; *) echo "✗ $path → $code"; FAIL=1 ;; esac
  done
  if [[ " $SERVICES " == *" tizia "* ]]; then
    # File trong container phải trùng file vừa ghi vào tizia-dev (không còn "mìn").
    LIST="$(printf '%s\n' "$CHANGED" | grep -E '^(server|public|scripts)/' || true)"
    if [ -n "$LIST" ]; then
      BAD="$(printf '%s\n' "$LIST" | ssh "$PROD_HOST" "cd '$PROD_DIR' && while read -r f; do \
        a=\$(docker exec tizia md5sum \"/app/\$f\" 2>/dev/null | cut -d' ' -f1); b=\$(md5sum \"\$f\" | cut -d' ' -f1); \
        [ \"\$a\" = \"\$b\" ] || echo \"\$f\"; done")"
      if [ -z "$BAD" ]; then echo "✓ $(printf '%s\n' "$LIST" | wc -l | xargs) file trong container tizia khớp tizia-dev"
      else echo "✗ File trong container khác tizia-dev:"; printf '    %s\n' $BAD; FAIL=1; fi
    fi
  fi
  if command -v node >/dev/null; then
    TIZIA_BASE_URL="$PROD_URL" TIZIA_GIT_REF="$BRANCH" node scripts/check-deployed-build.mjs \
      || warn "check-deployed-build.mjs báo lệch — đọc kết quả bên trên."
  fi
  [ $FAIL -eq 0 ] || { warn "Có bước kiểm tra lỗi. Quay lại bản trước:"; echo "  $ROLLBACK"; exit 1; }
fi

say "Xong: $BRANCH @ $SHA đã lên $PROD_URL"
echo "Quay lại bản trước nếu cần:"
echo "  $ROLLBACK"

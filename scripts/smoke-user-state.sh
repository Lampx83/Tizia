#!/usr/bin/env bash
# ============================================================
# Smoke test: /api/user-state KV (cross-device sync).
# Chạy local:  PORT=8099 node server/index.js &  bash scripts/smoke-user-state.sh
# Chạy prod:   BASE=https://tizia.vn bash scripts/smoke-user-state.sh
# ============================================================
set -euo pipefail

BASE=${BASE:-http://localhost:8099}
USER=${USER_NAME:-smoke-userstate}
PASS=${PASS:-smoke123!}
COOKIE=$(mktemp)
trap 'rm -f $COOKIE' EXIT

say() { printf "\n\033[1;36m== %s ==\033[0m\n" "$*"; }
http_check() {
  local label="$1" expect="$2" got="$3"
  if [[ "$got" == "$expect" ]]; then printf "  ✅ %s (HTTP %s)\n" "$label" "$got"
  else printf "  ❌ %s expected %s got %s\n" "$label" "$expect" "$got"; exit 1; fi
}

say "Register (idempotent — 409 nếu đã tồn tại)"
CODE=$(curl -s -c $COOKIE -X POST $BASE/api/auth/register \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\",\"display_name\":\"Smoke\",\"role\":\"pupil\",\"age\":10,\"grade\":2}" \
  -o /tmp/_reg.json -w "%{http_code}")
if [[ "$CODE" != "200" && "$CODE" != "409" ]]; then
  echo "  ❌ register HTTP $CODE"; cat /tmp/_reg.json; exit 1
fi
echo "  ✅ register HTTP $CODE"

say "Login"
CODE=$(curl -s -c $COOKIE -X POST $BASE/api/auth/login \
  -H 'Content-Type: application/json' \
  -d "{\"username\":\"$USER\",\"password\":\"$PASS\"}" \
  -o /tmp/_login.json -w "%{http_code}")
http_check "login" 200 "$CODE"

say "PUT 3 keys"
CODE=$(curl -s -b $COOKIE -X PUT $BASE/api/user-state \
  -H 'Content-Type: application/json' \
  -d '{"math2.stars":"42","tizia:space:done":"{\"algolab\":3}","do-chu-ghep-van.best":"99"}' \
  -o /tmp/_put.json -w "%{http_code}")
http_check "PUT" 200 "$CODE"
grep -q '"written":3' /tmp/_put.json && echo "  ✅ written=3" || { echo "  ❌ written count"; cat /tmp/_put.json; exit 1; }

say "GET → assert 3 keys"
CODE=$(curl -s -b $COOKIE $BASE/api/user-state -o /tmp/_get.json -w "%{http_code}")
http_check "GET" 200 "$CODE"
for k in math2.stars 'tizia:space:done' 'do-chu-ghep-van.best'; do
  grep -q "\"$k\"" /tmp/_get.json || { echo "  ❌ thiếu key $k"; cat /tmp/_get.json; exit 1; }
done
echo "  ✅ đủ 3 key"

say "PUT empty value → delete 1 key"
CODE=$(curl -s -b $COOKIE -X PUT $BASE/api/user-state \
  -H 'Content-Type: application/json' \
  -d '{"do-chu-ghep-van.best":""}' \
  -o /tmp/_del.json -w "%{http_code}")
http_check "PUT-delete" 200 "$CODE"

say "GET → assert chỉ còn 2 key"
curl -s -b $COOKIE $BASE/api/user-state -o /tmp/_get2.json
grep -q '"do-chu-ghep-van.best"' /tmp/_get2.json && { echo "  ❌ key đáng lẽ đã xoá"; cat /tmp/_get2.json; exit 1; }
echo "  ✅ key đã bị xoá"

say "Reject body không phải object"
CODE=$(curl -s -b $COOKIE -X PUT $BASE/api/user-state \
  -H 'Content-Type: application/json' -d '["a","b"]' \
  -o /tmp/_bad.json -w "%{http_code}")
http_check "PUT array → 400" 400 "$CODE"

say "Reject >100 keys"
BIG=$(python3 -c "import json; print(json.dumps({f'k{i}':'1' for i in range(200)}))" 2>/dev/null || node -e "console.log(JSON.stringify(Object.fromEntries(Array.from({length:200},(_,i)=>['k'+i,'1']))))")
CODE=$(curl -s -b $COOKIE -X PUT $BASE/api/user-state \
  -H 'Content-Type: application/json' -d "$BIG" \
  -o /tmp/_big.json -w "%{http_code}")
http_check "PUT 200 keys → 413" 413 "$CODE"

say "Reject value > 32KB (chống truncate JSON ngầm)"
HUGE_VAL=$(node -e "console.log(JSON.stringify({'tizia.tutor.history.v1': 'x'.repeat(33000)}))")
CODE=$(printf '%s' "$HUGE_VAL" | curl -s -b $COOKIE -X PUT $BASE/api/user-state \
  -H 'Content-Type: application/json' --data-binary @- \
  -o /tmp/_huge.json -w "%{http_code}")
http_check "PUT 33KB value → 413" 413 "$CODE"
grep -q '"error":"value_too_large"' /tmp/_huge.json || { echo "  ❌ thiếu error code"; cat /tmp/_huge.json; exit 1; }
echo "  ✅ trả error=value_too_large + key + size"

printf "\n\033[1;32m🎉 user-state smoke PASS\033[0m\n"

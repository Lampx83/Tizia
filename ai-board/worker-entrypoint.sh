#!/bin/sh
# AI Board worker container entrypoint. Runs as root only to lock egress (and, without a sandbox runner,
# start dockerd), then drops to user aiboard (no app data volume; talks to the app over HTTP with AI_BOARD_WORKER_KEY).
set -eu

REPO_DIR=${AI_BOARD_REPO_DIR:-/repo}
REPO_URL=${AI_BOARD_REPO_URL:-https://github.com/Lampx83/Tizia.git}

# 1. Docker-in-Docker for gate 5. A restarted container keeps the old pid file.
# With AI_BOARD_SANDBOX_URL, gate 5 runs in the sandbox runner's microVM and this container needs no daemon.
if [ -z "${AI_BOARD_SANDBOX_URL:-}" ]; then
  rm -f /var/run/docker.pid
  dockerd --host=unix:///var/run/docker.sock >/var/log/dockerd.log 2>&1 &
  i=0
  until docker info >/dev/null 2>&1; do
    i=$((i + 1))
    [ "$i" -lt 60 ] || { echo "dockerd did not start"; tail -20 /var/log/dockerd.log; exit 1; }
    sleep 1
  done
fi

# 2. Egress for processes of user aiboard: private networks (app, Ollama, sandbox runner), DNS,
# the Ollama host and GitHub. Without a sandbox runner, dockerd (root) keeps general egress to pull images and
# npm packages for the gate 5 build; the candidate container itself runs on an internal network (no egress).
# ponytail: all of RFC1918 is allowed, not just the app/Ollama hosts; pin addresses if the LAN matters.
uid=$(id -u aiboard)
iptables -N AIBOARD_OUT 2>/dev/null || iptables -F AIBOARD_OUT
iptables -A AIBOARD_OUT -o lo -j ACCEPT
iptables -A AIBOARD_OUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
iptables -A AIBOARD_OUT -p udp --dport 53 -j ACCEPT
iptables -A AIBOARD_OUT -p tcp --dport 53 -j ACCEPT
for net in 10.0.0.0/8 172.16.0.0/12 192.168.0.0/16; do iptables -A AIBOARD_OUT -d "$net" -j ACCEPT; done
ollama_host=$(python -c 'import os, urllib.parse; print(urllib.parse.urlsplit(os.environ.get("OLLAMA_URL", "")).hostname or "")')
if [ -n "$ollama_host" ]; then
  for ip in $(getent ahostsv4 "$ollama_host" | awk '{print $1}' | sort -u); do iptables -A AIBOARD_OUT -d "$ip" -j ACCEPT; done
fi
github=$(curl -fsS --max-time 20 https://api.github.com/meta | python -c '
import json, sys
meta = json.load(sys.stdin)
print("\n".join(sorted({n for k in ("git", "web", "api") for n in meta.get(k, []) if ":" not in n})))')
[ -n "$github" ] || { echo "could not read GitHub address ranges"; exit 1; }
for net in $github; do iptables -A AIBOARD_OUT -d "$net" -j ACCEPT; done
iptables -A AIBOARD_OUT -j REJECT
iptables -C OUTPUT -m owner --uid-owner "$uid" -j AIBOARD_OUT 2>/dev/null \
  || iptables -A OUTPUT -m owner --uid-owner "$uid" -j AIBOARD_OUT
ip6tables -C OUTPUT -m owner --uid-owner "$uid" ! -o lo -j REJECT 2>/dev/null \
  || ip6tables -A OUTPUT -m owner --uid-owner "$uid" ! -o lo -j REJECT 2>/dev/null || true

# 3. The worker's own clone; worker.py resets it to origin/$PR_BASE_BRANCH before every ticket.
chown aiboard:aiboard "$REPO_DIR" /opt/ai-board/ai-board/memory
as_worker() { setpriv --reuid=aiboard --regid=aiboard --init-groups env HOME=/home/aiboard "$@"; }
[ -d "$REPO_DIR/.git" ] || as_worker git clone -q "$REPO_URL" "$REPO_DIR"

case "${AI_BOARD_WORKER_MODE:-off}" in
  active) set -- --mode active --execute ;;
  shadow) set -- --mode shadow ;;
  *) set -- --mode off ;;
esac
exec setpriv --reuid=aiboard --regid=aiboard --init-groups env HOME=/home/aiboard \
  nice -n 10 python /opt/ai-board/ai-board/worker.py "$@"

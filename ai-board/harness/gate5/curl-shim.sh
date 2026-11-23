#!/bin/sh
# curl subset over busybox wget: [-sSfL] [-o FILE] URL. Any other option exits 2 so a check never passes on ignored flags.
out=-
url=
while [ $# -gt 0 ]; do
  case "$1" in
    -o|--output) out="$2"; shift ;;
    --silent|--fail|--location|--show-error) ;;
    --*) echo "curl shim: unsupported option $1" >&2; exit 2 ;;
    -?*) case "${1#-}" in *[!sSfL]*) echo "curl shim: unsupported option $1" >&2; exit 2 ;; esac ;;
    *) url="$1" ;;
  esac
  shift
done
[ -n "$url" ] || { echo "curl shim: no URL" >&2; exit 2; }
case "$url" in http://*|https://*) ;; *) url="http://$url" ;; esac
# busybox wget tries ::1 only for localhost; the app listens on IPv4 and curl would fall back.
url=$(printf %s "$url" | sed -E 's#^(https?://)localhost([:/?]|$)#\1127.0.0.1\2#')
exec wget -q -O "$out" "$url"

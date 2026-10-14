"""CLI dọn checkpoint tool-loop: dry-run mặc định, --apply mới xoá. Chạy trong thư mục harness."""
import argparse
import json
import os
import sys

from repositories.tool_steps import purge_checkpoints, ttl_days


def main(argv=None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ticket", type=int, help="dọn mọi run của ticket này (không cần hết hạn)")
    parser.add_argument("--ttl-days", type=float, help="ghi đè AI_BOARD_CHECKPOINT_TTL_DAYS")
    parser.add_argument("--apply", action="store_true", help="xoá thật; thiếu cờ này chỉ liệt kê")
    args = parser.parse_args(argv)
    dsn = os.getenv("DATABASE_URL")
    if not dsn:
        print("thiếu DATABASE_URL", file=sys.stderr)
        return 2
    report = purge_checkpoints(dsn, ticket_id=args.ticket, ttl=args.ttl_days, apply=args.apply)
    print(json.dumps({"apply": args.apply, "ttl_days": args.ttl_days or ttl_days(), "runs": report}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())

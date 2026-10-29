"""Kiểm tra tất định: còn dấu conflict git ở đầu dòng. Không gọi model."""
import re
import sys
from pathlib import Path

MARKER = re.compile(r'^(<{7}|={7}|>{7})(?=\s|$)', re.M)


def find_markers(text):
    """[(số dòng, dấu)] của mọi dấu conflict git còn trong text."""
    return [(text.count('\n', 0, m.start()) + 1, m.group(1)) for m in MARKER.finditer(text)]


def main(paths):
    failed = 0
    for path in paths:
        hits = find_markers(Path(path).read_text(encoding='utf-8', errors='replace'))
        for line, marker in hits:
            print(f'{path}:{line}: {marker}')
        failed += bool(hits)
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))

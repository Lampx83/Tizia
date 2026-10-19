"""Conservative literal-copy policy, not a browser visibility or full JavaScript parser."""
from collections import Counter
from html import unescape
from html.parser import HTMLParser
import re

from services.file_context import strip_comments, string_literals


class _Copy(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.parts, self.raw = [], None

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.raw = tag
        self.parts.extend(value for name, value in attrs if value is not None
                          and name in ('alt', 'title', 'placeholder', 'aria-label', 'value'))

    def handle_endtag(self, tag):
        if tag == self.raw:
            self.raw = None

    def handle_data(self, data):
        self.parts.extend(string_literals(data, 'inline.js' if self.raw == 'script' else 'inline.css') if self.raw else [data])


def literals(text, file):
    text = strip_comments(text, file)
    if file.endswith('.html'):
        parser = _Copy()
        parser.feed(text)
        parts = parser.parts
    else:
        parts = string_literals(text, file)
    normalized = [' '.join(unescape(re.sub(r'\\u(?:2014|\{0*2014\})', '\u2014', p)).split()) for p in parts]
    return Counter(p for p in normalized if '\u2014' in p)


def introduces_em_dash(file, before, after):
    if not file.startswith('public/') or not file.endswith(('.js', '.mjs', '.cjs', '.html', '.css')):
        return False
    return bool(literals(after, file) - literals(before, file))

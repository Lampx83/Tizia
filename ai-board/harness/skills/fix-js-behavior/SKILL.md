---
name: fix-js-behavior
match: không bấm được, bấm không được, khi bấm, khi nhấn, nhấn vào, bấm vào, nút không, không chạy, không hoạt động, không hiện, không hiển thị, bị lỗi, báo lỗi, bị treo, bị đơ, đếm sai, tính sai, sự kiện, javascript, js, script, click, bug, broken, not working, crash
files: *.js, *.mjs
tools: outline, grep, lessons
tools3: grep, outline, lessons
budget: 2200
budget3: 5500
priority: 5
---
## gate 1
1. The behaviour lives in a module under "js liên kết" of the page, or in the page's inline module script. Pick the file whose outline or excerpt shows the function, id or string involved.
2. Smallest possible fix: one subtask, one file, size "small". Never rewrite a module.
3. verify = one fact a test can check: an exported pure function's result, or a fixed line present in the file.
## gate 3
1. Change as few lines as possible; keep names, exports and imports.
2. Events via addEventListener. Never add "on...=" after a space, eval(, new Function(, "<script".
3. Test: import an exported pure function if one exists; otherwise read the file with fs and assert the fixed line.
Example output:
{"edits": [{"search": "  const total = items.length - 1;", "replace": "  const total = items.length;"}], "test_file": "test/quest-count.test.js", "test": "import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { readFileSync } from 'node:fs';\n\ntest('đếm đủ số nhiệm vụ', () => {\n  const js = readFileSync('public/js/daily-login.js', 'utf8');\n  assert.ok(js.includes('const total = items.length;'));\n});\n"}

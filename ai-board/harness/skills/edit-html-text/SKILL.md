---
name: edit-html-text
match: đổi chữ, sửa chữ, thay chữ, dòng chữ, câu chữ, đoạn chữ, chính tả, lỗi chính tả, viết sai, ghi sai, sai chữ, đổi tiêu đề, sửa tiêu đề, đổi tên nút, sửa tên nút, đổi nội dung, sửa nội dung, đổi câu, sửa câu, đổi thành chữ, dịch sang, text, typo, wording, heading, title, label, spelling
tools: outline, grep, lessons
tools3: grep, lessons
budget: 2200
budget3: 5000
priority: 2
---
## gate 1
1. "file" = the file whose lines (in "(trích)" or "file khớp từ khoá") contain the old text. If a script sets it (textContent = '...'), "file" is where that string literal is.
2. One subtask per file, usually one in total, size "small".
3. title quotes old and new text: Đổi "<cũ>" thành "<mới>" trong <thẻ/id>.
4. verify = "<file> chứa '<mới>' và không còn '<cũ>'".
## gate 3
1. Change only the words; keep tags, attributes, ids, classes and indentation.
2. `search` = the whole original line copied from the excerpt, without `Lnn| `.
3. Test: read the file with fs; assert it includes the new text and not the old text.
Example output:
{"edits": [{"search": "    <h2 id=\"path-title\">📊 Tiến độ của bạn</h2>", "replace": "    <h2 id=\"path-title\">📊 Hành trình học của bạn</h2>"}], "test_file": "test/school-path-title.test.js", "test": "import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { readFileSync } from 'node:fs';\n\ntest('đổi tiêu đề tiến độ', () => {\n  const html = readFileSync('public/school.html', 'utf8');\n  assert.ok(html.includes('Hành trình học của bạn'));\n  assert.ok(!html.includes('Tiến độ của bạn'));\n});\n"}

---
name: add-html-section
description: "Insert a new static block (section, button, link, table, note) next to an anchor in an existing HTML page. Use when the request asks to add, insert or append a block to a page without changing its scripts."
metadata:
  match: "thêm mục, thêm phần, thêm khối, thêm khung, thêm ô, thêm nút, thêm bảng, thêm danh sách, thêm đoạn, thêm liên kết, thêm link, thêm hình, thêm ảnh, thêm chú thích, thêm ghi chú, thêm lời chào, thêm dòng, chèn, add section, add block, add button, add link, add table, insert"
  tools: "outline, repomap, lessons"
  tools3: "grep, outline, lessons"
  budget: "2200"
  budget3: "5000"
  priority: "3"
---
## gate 1
1. "file" = the page itself. An empty `<div id="...-host">` is filled by JS: put the new static block next to it, not inside it.
2. The title says exactly where: "Thêm khối <nội dung> ngay sau <div id=...>" or "ngay trước <footer>".
3. Static HTML only, reuse classes from the outline (e.g. `section`, `section-title`). No <script>, no onclick.
4. One subtask, size "small". verify = "<file> chứa id=\"<id mới>\" và chữ '<nội dung>'".
## gate 3
1. Insert, do not rewrite: `search` = one unique existing line at the anchor; `replace` = that same line plus the new block (or the block plus that line when inserting before it).
2. Give the new block a new unique id. Vietnamese text with diacritics.
3. Test: read the file with fs; assert it includes the new id and text.
Example output:
{"edits": [{"search": "<div id=\"host-mau\"></div>", "replace": "<div id=\"host-mau\"></div>\n<div class=\"khoi-mau\" id=\"study-tip\">\n  <div class=\"khoi-mau-tieu-de\"><h2>💡 Mẹo học</h2></div>\n  <p>Học 20 phút mỗi ngày hiệu quả hơn học dồn.</p>\n</div>"}], "test_file": "test/<trang>-study-tip.test.js", "test": "import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { readFileSync } from 'node:fs';\n\ntest('có khối mẹo học', () => {\n  const html = readFileSync('public/<trang>.html', 'utf8');\n  assert.ok(html.includes('id=\"study-tip\"'));\n  assert.ok(html.includes('Mẹo học'));\n});\n"}

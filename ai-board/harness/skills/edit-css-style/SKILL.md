---
name: edit-css-style
description: "Change one CSS rule (color, font, size, spacing, border, background) via a named selector in the page's linked stylesheet or style block. Use when the request asks to restyle or recolor existing page elements."
metadata:
  match: "màu chữ, màu nền, màu sắc, đổi màu, tô màu, sang màu, thành màu, xanh dương, xanh lá, xanh lam, màu xanh, màu đỏ, màu vàng, màu tím, màu cam, màu hồng, màu đen, màu trắng, font, phông chữ, kiểu chữ, cỡ chữ, kích thước chữ, chữ to, chữ nhỏ, to hơn, nhỏ hơn, in đậm, in nghiêng, khoảng cách, giãn dòng, căn giữa, căn lề, bo góc, đường viền, đổ bóng, hình nền, color, colour, background, font size, css, style, padding, margin, spacing, bold"
  files: "*.css"
  tools: "outline, lessons"
  tools3: "grep, outline, lessons"
  follow_css: "true"
  budget: "2200"
  budget3: "5000"
  priority: "1"
---
## gate 1
1. Find the page in REPO DATA and read its "css liên kết" line.
2. If it lists a local .css file, "file" = that .css file. If it says "(không có file .css ...)", "file" = the page itself (the rule is in its <style>).
3. Name the ONE selector to change from the "selector" list (e.g. `.khoi-mau h1`). Whole-page text → `body`; never `*`. No fitting selector → say "thêm rule mới <selector>".
4. Colour names used in requests map to these values: xanh dương #2563eb, xanh lá #16a34a, đỏ #dc2626, vàng #facc15, tím #7c3aed, cam #ea580c, hồng #db2777, đen #111827, trắng #ffffff.
5. One subtask, size "small". verify = "rule <selector> trong <file> có <property>: <value>".
## gate 3
1. Change only the declaration inside the existing rule. Property missing → add one declaration line to that rule. Rule missing → add it just before `</style>` (or at the end of the .css file).
2. Never touch HTML markup or scripts.
3. Test: read the file with fs and match the rule with a regex.
Example output:
{"edits": [{"search": "  .khoi-mau h1, .khoi-mau h2 { margin: 0; font-size: 22px; font-weight: 700; }", "replace": "  .khoi-mau h1, .khoi-mau h2 { margin: 0; font-size: 22px; font-weight: 700; color: #2563eb; }"}], "test_file": "test/<trang>-title-color.test.js", "test": "import test from 'node:test';\nimport assert from 'node:assert/strict';\nimport { readFileSync } from 'node:fs';\n\ntest('tiêu đề trường màu xanh dương', () => {\n  const html = readFileSync('public/<trang>.html', 'utf8');\n  assert.match(html, /\\.khoi-mau h1[^{]*\\{[^}]*color:\\s*#2563eb/);\n});\n"}

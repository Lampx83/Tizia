---
name: new-static-page
match: trang mới, tạo trang, thêm trang, làm trang, trang riêng, một trang, page mới, new page, create page, landing page
types: game, lab, theory
files: new:*.html
tools: tree, repomap, lessons
tools3: tree, lessons
budget: 2200
budget3: 3000
priority: 4
---
## gate 1
1. "file" = public/<ascii-kebab-name>.html with a name NOT in the tree listing (e.g. public/meo-hoc-tap.html).
2. Static page only: HTML plus one <style> block. No <script>, no forms that send data.
3. Link it from another page only if the request asks; that is a second subtask on that page.
4. Size "small". verify = "public/<tên>.html có <html lang=\"vi\">, <title> và <h1> '<tiêu đề>'".
## gate 3
1. New file: return the whole page in `code`, following this skeleton; keep head lines as they are.
2. Vietnamese text with diacritics; reuse the dark theme below.
3. Test: read the file with fs; assert lang="vi", the <title> and the <h1> text.
Skeleton:
<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Tiêu đề · Tizia</title>
<link rel="icon" type="image/svg+xml" href="./favicon.svg" />
<style>
  body { margin: 0; min-height: 100vh; font-family: 'Inter', system-ui, sans-serif; color: white; background: linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #312e81 100%); }
  .section { max-width: 1100px; margin: 0 auto; padding: 24px 20px; }
</style>
</head>
<body>
<main class="section">
  <h1>Tiêu đề</h1>
</main>
</body>
</html>

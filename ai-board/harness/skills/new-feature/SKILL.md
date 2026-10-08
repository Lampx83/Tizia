---
name: new-feature
match: chức năng mới, tính năng mới, trò chơi mới, trò mới, bảng xếp hạng, trang chức năng, feature mới, new feature
types: feature
files: new:*.html, new:index.js
tools: exemplar, repomap, tree, lessons
tools3: exemplar, lessons
budget: 3200
budget3: 5000
priority: 5
---
## gate 1
1. This is the FIRST draft of a new feature (FEATURE BRIEF has no "Đã làm"). At most 3 subtasks, in this order:
   a. file = the page named in FEATURE BRIEF ("trang: public/<slug>.html"): layout copied from the EXEMPLAR page (same head, theme, header), one <main> with the feature skeleton, and exactly one script line `<script type="module" src="./js/features/<slug>/index.js"></script>`.
   b. file = public/js/features/<slug>/index.js: ES module with fake data as const arrays, render into the page, addEventListener for buttons, progress in localStorage. Import shared modules only from the building blocks below.
   c. Only if the idea truly needs a second screen or piece; otherwise stop at 2.
2. Never plan server code, a database, payments or login. If the idea needs them, say so in summary_vi as "cần người làm: …" and still ship the front-end draft with fake data.
3. Do not add a link to the new page from other pages: the school page shows released features by itself.
4. verify = one checkable fact per file (the <h1> text; the module exports render or contains addEventListener).
5. Later requests of the same folder use other skills; they change only the files under "File sở hữu".
## gate 3
1. Page: copy the EXEMPLAR head lines and theme; Vietnamese text with diacritics; the only script tag is the module line above.
2. Module: no inline HTML event attributes (onclick=…), no eval, no fetch to other origins, no document.write; build DOM with createElement/textContent or template strings without handlers, then addEventListener.
3. Keep the draft small and working: 1 screen, 3–5 fake items, a start button, visible result.
4. Test: read files with fs; assert the page has the <h1> and the module script line, and the module source contains addEventListener.
Building blocks (import paths are relative to public/js/features/<slug>/index.js):
- ../../engine/wallet.js: getWallet() reads stars/coins/streak. Read only: never edit this file, never add coins yourself.
- ../../engine/path-renderer.js: showAchievementToast({icon, title, desc}) shows the corner achievement card.
- ../../engine/storage.js: lsGet(key) / lsSet(key, value) safe localStorage.
- ../../engine/domain.js: DOMAIN_META, array of {id, name, icon, accent} per school.

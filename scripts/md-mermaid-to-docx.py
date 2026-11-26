"""Markdown with Mermaid blocks -> .docx with figures as PNG.

Usage: python scripts/md-mermaid-to-docx.py input.md [output.docx] [--no-word] [--check]
Needs pandoc, python-docx, Chrome or Edge, network for the Mermaid CDN. Word (optional) fills the table of contents.
Figures go to <output>-figures/ next to the output.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
from pathlib import Path

FENCE = "`" * 3
MERMAID_JS = "https://cdn.jsdelivr.net/npm/mermaid@10.9.1/dist/mermaid.min.js"
BROWSERS = (
    os.environ.get("CHROME_PATH", ""),
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
)
FONT = "Times New Roman"
PX_CM = 2.54 / 96
PORTRAIT_BOX = (16.5, 21.5)
LANDSCAPE_BOX = (25.0, 12.5)
MARGINS = 'w:top="1134" w:right="1134" w:bottom="1134" w:left="1418" w:header="708" w:footer="708" w:gutter="0"'
SECT_PORTRAIT = f'<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar {MARGINS}/></w:sectPr>'
SECT_LANDSCAPE = f'<w:sectPr><w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/><w:pgMar {MARGINS}/></w:sectPr>'
FIGURE = re.compile(r"(\n---\n\n)?((?:#{2,4} [^\n]*\n\n)*)((?:\*Hình [^\n]*\*\n\n)?)" + FENCE + r"mermaid\n.*?" + FENCE + r"\n", re.S)

PAGE = """<!doctype html><meta charset=utf-8>
<style>html,body{margin:0;background:#fff}#out{padding:8px;display:inline-block}svg{display:block}</style>
<body><div id=out></div><pre id=sizes></pre>
<script src="%s"></script>
<script>
const B=%s;
mermaid.initialize({startOnLoad:false,theme:'neutral',securityLevel:'loose',
  flowchart:{useMaxWidth:false,nodeSpacing:28,rankSpacing:38,padding:8},
  sequence:{useMaxWidth:false,actorMargin:24,messageMargin:26,boxMargin:6,noteMargin:6,width:140,wrap:false},
  er:{useMaxWidth:false,entityPadding:8,fontSize:17,minEntityWidth:80,minEntityHeight:40},
  state:{useMaxWidth:false,padding:6,nodeSpacing:28,rankSpacing:36},
  themeVariables:{fontFamily:'Arial, sans-serif',fontSize:'18px'}});
(async()=>{
  const one=new URLSearchParams(location.search).get('i');
  const out=document.getElementById('out'),res=[];
  for(let i=0;i<B.length;i++){
    if(one!==null&&Number(one)!==i)continue;
    try{
      const d=document.createElement('div');d.innerHTML=(await mermaid.render('g'+i,B[i])).svg;out.appendChild(d);
      const b=d.querySelector('svg').getBoundingClientRect();res.push({i,w:Math.ceil(b.width),h:Math.ceil(b.height)});
    }catch(e){res.push({i,err:String(e.message||e).slice(0,300)});}
  }
  document.getElementById('sizes').textContent=JSON.stringify(res);
})();
</script>"""


def raw(xml: str) -> str:
    return f"\n\n{FENCE}{{=openxml}}\n{xml}\n{FENCE}\n\n"


PAGE_BREAK = raw('<w:p><w:r><w:br w:type="page"/></w:r></w:p>')
TOC_PLACEHOLDER = "Cập nhật mục lục: chuột phải, Update Field."
TOC = raw(
    '<w:p><w:r><w:fldChar w:fldCharType="begin"/></w:r>'
    '<w:r><w:instrText xml:space="preserve"> TOC \\o "1-2" \\h \\z \\u </w:instrText></w:r>'
    f'<w:r><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:t>{TOC_PLACEHOLDER}</w:t></w:r>'
    '<w:r><w:fldChar w:fldCharType="end"/></w:r></w:p>'
)


def section_break(sect: str) -> str:
    return raw(f"<w:p><w:pPr>{sect}</w:pPr></w:p>")


def find_browser() -> str:
    for candidate in BROWSERS:
        if candidate and Path(candidate).exists():
            return candidate
    raise SystemExit("Chrome or Edge not found; set CHROME_PATH")


def headless(browser: str, profile: Path, *args: str) -> str:
    done = subprocess.run([browser, "--headless=new", "--disable-gpu", "--hide-scrollbars", f"--user-data-dir={profile}",
                           "--virtual-time-budget=30000", *args], check=True, capture_output=True, timeout=300)
    return done.stdout.decode("utf-8", "replace")


def render_figures(blocks: list[str], fig_dir: Path, work: Path) -> tuple[list[dict], list[Path]]:
    """Measure every diagram, then screenshot each at 2x. Raise on a Mermaid syntax error."""
    browser, profile = find_browser(), work / "profile"
    page = work / "figures.html"
    page.write_text(PAGE % (MERMAID_JS, json.dumps(blocks, ensure_ascii=False)), encoding="utf-8")
    dom = headless(browser, profile, "--dump-dom", page.as_uri())
    found = re.search(r'<pre id="sizes">(.*?)</pre>', dom, re.S)
    if not found or not found.group(1).strip():
        raise SystemExit("diagrams did not render: no network for the Mermaid CDN?")
    sizes = json.loads(found.group(1).replace("&quot;", '"').replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">"))
    broken = [s for s in sizes if "err" in s]
    if broken or len(sizes) != len(blocks):
        raise SystemExit(f"Mermaid errors: {broken or 'missing diagrams'}")
    fig_dir.mkdir(parents=True, exist_ok=True)
    paths = []
    for item in sizes:
        path = fig_dir / f"hinh-{item['i'] + 1:02d}.png"
        headless(browser, profile, "--force-device-scale-factor=2", f"--window-size={item['w'] + 16},{item['h'] + 16}",
                 f"--screenshot={path}", f"{page.as_uri()}?i={item['i']}")
        paths.append(path)
    return sizes, paths


def fit(width_px: int, height_px: int) -> tuple[bool, float]:
    """(landscape, width_cm) giving the larger printed scale; never upscale past 96 dpi."""
    def scale(box):
        return min(box[0] / width_px, box[1] / height_px, PX_CM)
    portrait, landscape = scale(PORTRAIT_BOX), scale(LANDSCAPE_BOX)
    use_landscape = landscape > portrait * 1.1
    return use_landscape, round(width_px * (landscape if use_landscape else portrait), 2)


def widen_separators(text: str) -> str:
    """Pandoc sizes pipe-table columns by separator dash counts; make them follow cell length."""
    lines, out, i = text.split("\n"), [], 0
    while i < len(lines):
        j = i
        while j < len(lines) and lines[j].startswith("|"):
            j += 1
        if j - i < 2:
            out.append(lines[i])
            i += 1
            continue
        rows = [[c.strip() for c in line.strip().strip("|").split("|")] for line in lines[i:j]]

        def weight(c):
            cells = [r[c] for k, r in enumerate(rows) if k != 1 and c < len(r)]
            longest_word = max((len(w) for cell in cells for w in re.split(r"[\s/<>]+", cell.replace("`", ""))), default=0)
            return max(16, min(30, int(longest_word * 1.7)), min(45, max(len(cell) for cell in cells)))

        block = lines[i:j]
        block[1] = "|" + "|".join("-" * weight(c) for c in range(len(rows[0]))) + "|"
        out.extend(block)
        i = j
    return "\n".join(out)


def preprocess(text: str, sizes: list[dict], figures: list[Path]) -> tuple[str, list[tuple[float, float]]]:
    """Markdown ready for pandoc, plus (width_cm, height_cm) per figure in document order."""
    index, figure_cm = iter(range(len(figures))), []

    def figure(match):
        i = next(index)
        landscape, width = fit(sizes[i]["w"], sizes[i]["h"])
        figure_cm.append((width, round(width * sizes[i]["h"] / sizes[i]["w"], 2)))
        rule, heads, caption = match.group(1) or "", match.group(2), match.group(3).strip()
        body = f"{heads}![](<{figures[i].as_posix()}>){{width={width}cm}}\n\n{caption}"
        if landscape:
            # the section break already starts a new page, so a preceding rule (page break) would leave a blank page
            return section_break(SECT_PORTRAIT) + body + section_break(SECT_LANDSCAPE)
        return rule + body + "\n\n"

    text = FIGURE.sub(figure, text)
    # two landscape figures in a row: the portrait break between them would be an empty page
    landscape_end, portrait_end = section_break(SECT_LANDSCAPE).strip(), section_break(SECT_PORTRAIT).strip()
    text = re.sub(re.escape(landscape_end) + r"\s*" + re.escape(portrait_end), lambda _: landscape_end, text)
    text = re.sub(r"## MỤC LỤC\n.*?\n---\n", lambda _: PAGE_BREAK + "**MỤC LỤC**" + TOC + "\n---\n", text, flags=re.S)
    text = text.replace("## QUÁ TRÌNH THAY ĐỔI", "**QUÁ TRÌNH THAY ĐỔI**")
    text = re.sub(r"\n---\n", lambda _: PAGE_BREAK, text)
    return widen_separators(text), figure_cm


def style_doc(path: Path, figure_cm: list[tuple[float, float]]) -> tuple[int, int]:
    from docx import Document
    from docx.enum.text import WD_ALIGN_PARAGRAPH
    from docx.oxml import OxmlElement
    from docx.oxml.ns import qn
    from docx.shared import Cm, Pt, RGBColor

    def set_fonts(element, name):
        rpr = element.get_or_add_rPr()
        fonts = rpr.find(qn("w:rFonts"))
        if fonts is None:
            fonts = OxmlElement("w:rFonts")
            rpr.insert(0, fonts)
        for attr in ("w:ascii", "w:hAnsi", "w:eastAsia", "w:cs"):
            fonts.set(qn(attr), name)
        for theme in ("w:asciiTheme", "w:hAnsiTheme", "w:eastAsiaTheme", "w:cstheme"):
            fonts.attrib.pop(qn(theme), None)

    def child(tag, **attrs):
        el = OxmlElement(tag)
        for key, value in attrs.items():
            el.set(qn(f"w:{key}"), value)
        return el

    doc = Document(str(path))
    sizes = {"Normal": 13, "Body Text": 13, "First Paragraph": 13, "Compact": 11, "Title": 20,
             "Heading 1": 16, "Heading 2": 14, "Heading 3": 13, "Heading 4": 13}
    for style in doc.styles:
        if style.type not in (1, 2):
            continue
        if style.name == "Verbatim Char":
            set_fonts(style.element, "Consolas")
            style.font.size = Pt(10.5)
            continue
        set_fonts(style.element, FONT)
        if style.name in sizes:
            style.font.size = Pt(sizes[style.name])
        if style.name.startswith("Heading") or style.name == "Title":
            style.font.bold = True
            style.font.color.rgb = RGBColor(0, 0, 0)
        if style.name in ("Normal", "Body Text", "First Paragraph"):
            style.paragraph_format.space_after, style.paragraph_format.line_spacing = Pt(6), 1.2

    last = doc.sections[-1]
    last.page_width, last.page_height = Cm(21), Cm(29.7)
    last.top_margin = last.bottom_margin = last.right_margin = Cm(2)
    last.left_margin = Cm(2.5)

    # pandoc clamps images to the reference page width, which undersizes landscape figures
    assert len(doc.inline_shapes) == len(figure_cm), "image count mismatch"
    for shape, (width, height) in zip(doc.inline_shapes, figure_cm):
        shape.width, shape.height = Cm(width), Cm(height)

    for para in doc.paragraphs:
        text = para.text.strip()
        has_image = bool(para._p.findall(".//" + qn("w:drawing")))
        if has_image or re.match(r"^Hình \d+\.\d+[a-z]?\. ", text) or text in ("MỤC LỤC", "QUÁ TRÌNH THAY ĐỔI"):
            para.alignment = WD_ALIGN_PARAGRAPH.CENTER
        if has_image:
            para.paragraph_format.keep_with_next = True

    for table in doc.tables:
        borders = OxmlElement("w:tblBorders")
        for edge in ("top", "left", "bottom", "right", "insideH", "insideV"):
            borders.append(child(f"w:{edge}", val="single", sz="4", space="0", color="808080"))
        table._tbl.tblPr.append(borders)
        for cell in table.rows[0].cells:
            cell._tc.get_or_add_tcPr().append(child("w:shd", val="clear", color="auto", fill="D9D9D9"))
            for para in cell.paragraphs:
                for run in para.runs:
                    run.bold = True
    doc.save(str(path))
    return len(doc.tables), len(doc.inline_shapes)


def update_toc(path: Path) -> bool:
    """Fill the TOC through Word. False when Word is missing or the placeholder is still there afterwards."""
    from docx import Document

    # path goes through the environment: PowerShell splits -Command arguments on spaces
    script = (
        "$ErrorActionPreference = 'Stop'; $w = New-Object -ComObject Word.Application; $w.Visible = $false; $w.DisplayAlerts = 0; "
        "try { $d = $w.Documents.Open($env:DOCX_PATH, $false, $false); "
        "if ($d.TablesOfContents.Count -gt 0) { $d.TablesOfContents.Item(1).Update() }; $d.Save(); $d.Close($false) } "
        "finally { if ($w.Documents.Count -eq 0) { $w.Quit() } }"
    )
    try:
        subprocess.run(["powershell", "-NoProfile", "-Command", script], capture_output=True, timeout=180,
                       env={**os.environ, "DOCX_PATH": str(path.resolve())})
    except (OSError, subprocess.TimeoutExpired):
        return False
    return not any(TOC_PLACEHOLDER in para.text for para in Document(str(path)).paragraphs)


def build(source: Path, output: Path, use_word: bool):
    text = source.read_text(encoding="utf-8")
    blocks = re.findall(FENCE + r"mermaid\n(.*?)" + FENCE, text, re.S)
    fig_dir = output.with_name(output.stem + "-figures")
    with tempfile.TemporaryDirectory(ignore_cleanup_errors=True) as tmp:
        work = Path(tmp)
        sizes, figures = render_figures(blocks, fig_dir, work) if blocks else ([], [])
        prepared, figure_cm = preprocess(text, sizes, figures)
        (work / "prepared.md").write_text(prepared, encoding="utf-8")
        (work / "br.lua").write_text(
            "function RawInline(el)\n  if el.format:match('html') and el.text:match('^<br') then return pandoc.LineBreak() end\nend\n",
            encoding="utf-8")
        subprocess.run(["pandoc", str(work / "prepared.md"), "-f", "markdown", "-t", "docx", "--shift-heading-level-by=-1",
                        "--lua-filter", str(work / "br.lua"), "-o", str(output)], check=True)
    tables, images = style_doc(output, figure_cm)
    if TOC_PLACEHOLDER not in prepared:
        toc = "none"
    elif use_word and update_toc(output):
        toc = "filled"
    else:
        toc = "not filled (update the field in Word)"
    print(f"{output}: {tables} tables, {images} figures, TOC {toc}")


def self_check():
    assert fit(1000, 500) == (True, 25.0), fit(1000, 500)
    assert fit(1000, 1400)[0] is False
    assert fit(100, 100) == (False, round(100 * PX_CM, 2))
    table = "| a | b |\n|---|---|\n| x | " + "y" * 60 + " |"
    assert widen_separators(table).split("\n")[1] == "|" + "-" * 16 + "|" + "-" * 45 + "|"
    assert widen_separators("plain\n| not a table") == "plain\n| not a table"
    doc = f"## T\n\n*Hình 1.1. X*\n\n{FENCE}mermaid\nflowchart TD\n  A-->B\n{FENCE}\n\nafter\n"
    prepared, cm = preprocess(doc, [{"i": 0, "w": 400, "h": 300}], [Path("f.png")])
    assert "mermaid" not in prepared and prepared.index("![](<f.png>)") < prepared.index("*Hình 1.1. X*") and len(cm) == 1
    print("self-check ok")


def main():
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("input", nargs="?", type=Path)
    parser.add_argument("output", nargs="?", type=Path)
    parser.add_argument("--no-word", action="store_true", help="skip the TOC update through Word")
    parser.add_argument("--check", action="store_true", help="run the self-check and exit")
    args = parser.parse_args()
    if args.check:
        return self_check()
    if not args.input:
        parser.error("input.md is required")
    build(args.input, args.output or args.input.with_suffix(".docx"), not args.no_word)


if __name__ == "__main__":
    sys.exit(main())

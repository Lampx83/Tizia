#!/usr/bin/env python3
"""Đồng bộ ảnh mặt hộp thuốc (Nhà thuốc thực hành, req #235/#249) từ cột "Link google drive" của Danh mục 1.

  python3 scripts/gpp-drive-faces.py [--sheet FILE.csv] [--dry]

- Tải CSV Google Sheet Danh mục 1 (hoặc dùng --sheet), mỗi dòng có link thư mục Drive → liệt kê ảnh trong thư mục
  (đọc HTML trang thư mục công khai), tải ảnh về public/hop-thuoc/mat/<buoi-N-slug>/<i>.jpg (cạnh dài 640px).
- Chỉ tải lại thư mục nào MỚI hoặc đổi số ảnh so với PKG_FACES hiện có trong public/tu-thuoc-mo-phong.html.
- Ghi lại hằng PKG_FACES trong trang. Khoá = "Buổi N|Mẫu thuốc TH" (cột B|D của sheet).
"""
import csv, io, json, os, re, sys, unicodedata, urllib.request
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGE = os.path.join(ROOT, 'public', 'tu-thuoc-mo-phong.html')
OUT = os.path.join(ROOT, 'public', 'hop-thuoc', 'mat')
SHEET = 'https://docs.google.com/spreadsheets/d/1HAlrv2wHq-hrgf_mC82r9K3SMUr553IOZ2ejjeorMOQ/export?format=csv&gid=1785059940'
UA = {'User-Agent': 'Mozilla/5.0'}
get = lambda u: urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=60).read()

def slug(s):
    s = unicodedata.normalize('NFD', s.replace('đ', 'd').replace('Đ', 'D'))
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn').lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def folder_images(fid):
    html = get(f'https://drive.google.com/drive/folders/{fid}').decode('utf-8', 'ignore')
    ids = []
    for m in re.finditer(r'data-id="([^"]+)"', html):
        if m.group(1) != '_gd' and m.group(1) not in ids and m.group(1) != fid: ids.append(m.group(1))
    labs = re.findall(r'aria-label="([^"]+?) (?:Image|Folder|Video|PDF|Google)[^"]*"', html)
    return ids if len(ids) <= len(labs) + 2 else ids  # chỉ giữ id thật của tệp ảnh bên dưới

def main():
    dry = '--dry' in sys.argv
    sheet = sys.argv[sys.argv.index('--sheet') + 1] if '--sheet' in sys.argv else None
    raw = open(sheet, encoding='utf-8').read() if sheet else get(SHEET).decode('utf-8')
    rows = [r for r in list(csv.reader(io.StringIO(raw)))[4:] if r and r[0].strip()]
    page = open(PAGE, encoding='utf-8').read()
    m = re.search(r'const PKG_FACES = (\{.*?\});', page, re.S)
    faces = json.loads(m.group(1)) if m else {}
    for r in rows:
        link = r[18] if len(r) > 18 else ''
        fm = re.search(r'folders/([0-9A-Za-z_-]+)', link)
        if not fm: continue
        key = f'{r[1].strip()}|{r[3].strip()}'
        d = f'{slug(r[1])}-{slug(r[3])}'
        ids = folder_images(fm.group(1))
        if not ids: print('  (trống)', key); continue
        if faces.get(key, {}).get('n') == len(ids) and os.path.isdir(os.path.join(OUT, d)):
            continue
        print('→', key, len(ids), 'ảnh', '(dry)' if dry else '')
        if dry: continue
        os.makedirs(os.path.join(OUT, d), exist_ok=True)
        n = 0
        for i, fid in enumerate(ids, 1):
            try:
                img = Image.open(io.BytesIO(get(f'https://drive.google.com/thumbnail?id={fid}&sz=w640'))).convert('RGB')
                img.thumbnail((640, 640)); img.save(os.path.join(OUT, d, f'{i}.jpg'), 'JPEG', quality=72, optimize=True); n += 1
            except Exception as e:
                print('   lỗi', fid, e)
        if n: faces[key] = {'dir': d, 'n': n}
    if not dry:
        new = 'const PKG_FACES = ' + json.dumps(faces, ensure_ascii=False, separators=(',', ':')) + ';'
        page = re.sub(r'const PKG_FACES = \{.*?\};', lambda _: new, page, count=1, flags=re.S)
        open(PAGE, 'w', encoding='utf-8').write(page)
        print('PKG_FACES:', len(faces), 'thuốc')

if __name__ == '__main__': main()

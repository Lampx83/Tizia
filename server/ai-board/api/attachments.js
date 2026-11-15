// Đính kèm yêu cầu AI board (ảnh chụp + file HS gửi): nhận raw, kiểm MIME + magic bytes, serve kèm header phòng thủ.
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { shotProxy } from '../shot-storage.js';

// POST /api/requests/attachments — nhận raw binary 1 file (ảnh chụp màn hình,
// hoặc file đính kèm tuỳ chọn). FE gửi body = bytes file, header:
//   Content-Type: <mime>
//   X-Filename:   <tên gốc>  (optional)
//   X-Kind:       'screenshot' | 'file'  (optional, default 'file')
// Lý do tách route + raw thay vì multipart: tránh thêm dep (multer) + payload
// đơn giản (1 file/req). Trả URL public + meta để FE nhồi vào array attachments.
// LƯU Ý BẢO MẬT: cố tình KHÔNG cho image/svg+xml. SVG là XML có thể nhúng
// <script>; nếu serve inline từ chính origin → stored-XSS khi mở link/ảnh. Ảnh
// minh hoạ feedback dùng PNG/JPEG là đủ. Mọi file vẫn được serve với nosniff +
// CSP sandbox + ép tải về (xem mount /uploads/requests) như lớp phòng thủ.
const REQUEST_UPLOAD_MIME_WHITELIST = new Set([
  'image/png', 'image/jpeg', 'image/webp', 'image/gif',
  'application/pdf', 'text/plain', 'text/csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint',
  'application/zip',
]);
const MIME_TO_EXT = {
  'image/png': '.png', 'image/jpeg': '.jpg', 'image/webp': '.webp',
  'image/gif': '.gif', 'application/pdf': '.pdf',
  'text/plain': '.txt', 'text/csv': '.csv',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'application/msword': '.doc', 'application/vnd.ms-excel': '.xls',
  'application/vnd.ms-powerpoint': '.ppt', 'application/zip': '.zip',
};
// Ảnh raster an toàn để render inline (img src + mở thẳng). Mọi định dạng khác
// (pdf/office/zip/txt/csv/db/sql) bị ép tải về để không bao giờ thực thi trong origin.
const REQUEST_INLINE_SAFE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif']);
// File DỮ LIỆU (CSDL SQLite + script SQL). Định danh theo PHẦN MỞ RỘNG vì trình
// duyệt hay để Content-Type rỗng/application/octet-stream cho các đuôi này → không
// thể tin whitelist MIME. SQLite kiểm magic header; .sql là văn bản. Tất cả đều
// bị ép tải về (không nằm trong INLINE_SAFE) nên không thực thi trong origin.
const REQUEST_SQLITE_EXTS = new Set(['.db', '.sqlite', '.sqlite3']);
const REQUEST_DATA_EXTS = new Set(['.db', '.sqlite', '.sqlite3', '.sql']);
// Magic-byte sniffing chống Content-Type spoofing: client tự đặt header Content-Type
// nên với định dạng có chữ ký rõ ràng ta kiểm bytes đầu. text/plain & text/csv không
// có chữ ký tin cậy → chấp nhận. Trả false nếu không khớp (handler sẽ từ chối 415).
function requestUploadSniffOk(mime, buf) {
  if (!Buffer.isBuffer(buf) || buf.length < 4) return false;
  const at = (...sig) => sig.every((v, i) => buf[i] === v);
  const ascii = (off, str) => buf.slice(off, off + str.length).toString('latin1') === str;
  switch (mime) {
    case 'image/png':  return at(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
    case 'image/jpeg': return at(0xff, 0xd8, 0xff);
    case 'image/gif':  return ascii(0, 'GIF87a') || ascii(0, 'GIF89a');
    case 'image/webp': return ascii(0, 'RIFF') && ascii(8, 'WEBP');
    case 'application/pdf': return ascii(0, '%PDF-');
    // OOXML (docx/xlsx/pptx) + zip đều là container ZIP: PK\x03\x04 (hoặc empty/spanned).
    case 'application/zip':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return ascii(0, 'PK\x03\x04') || ascii(0, 'PK\x05\x06') || ascii(0, 'PK\x07\x08');
    // Office cũ (.doc/.xls/.ppt) = OLE compound file.
    case 'application/msword':
    case 'application/vnd.ms-excel':
    case 'application/vnd.ms-powerpoint':
      return at(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1);
    case 'text/plain':
    case 'text/csv':
      return true;
    default: return false;
  }
}

export function attachRequestUpload(router, { dir, requireAuth, requireEnrolled }) {
  router.post('/api/requests/attachments',
    requireAuth, requireEnrolled,
    // 50MB: ảnh/office nhỏ, nhưng file dữ liệu (.db SQLite, .sql dump) có thể lớn.
    express.raw({ type: () => true, limit: '50mb' }),
    async (req, res) => {
      try {
        const mime = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
        const rawName = String(req.headers['x-filename'] || '').slice(0, 200);
        const nameExt = path.extname(rawName).toLowerCase();
        const isSqlite = REQUEST_SQLITE_EXTS.has(nameExt);
        const isData = REQUEST_DATA_EXTS.has(nameExt);
        // File dữ liệu (DB/SQL) nhận theo ĐUÔI vì Content-Type không tin được; còn
        // lại bắt buộc nằm trong whitelist MIME.
        if (!isData && !REQUEST_UPLOAD_MIME_WHITELIST.has(mime)) {
          return res.status(415).json({ error: 'unsupported_media_type', mime, message: 'Định dạng file không hỗ trợ.' });
        }
        const buf = req.body;
        if (!Buffer.isBuffer(buf) || buf.length === 0) {
          return res.status(400).json({ error: 'empty_body', message: 'File rỗng.' });
        }
        // Chống Content-Type spoofing: nội dung phải khớp định dạng khai báo.
        if (isSqlite) {
          // SQLite có magic header cố định 16 byte: 15 ký tự "SQLite format 3" + 1 byte NUL.
          const sqliteOk = buf.length >= 16
            && buf.subarray(0, 15).toString('latin1') === 'SQLite format 3'
            && buf[15] === 0x00;
          if (!sqliteOk) {
            return res.status(415).json({ error: 'content_mismatch', message: 'File không phải cơ sở dữ liệu SQLite hợp lệ.' });
          }
        } else if (isData) {
          // .sql là văn bản: chặn nếu trông như nhị phân (có null byte ở 8KB đầu).
          if (buf.subarray(0, 8192).includes(0x00)) {
            return res.status(415).json({ error: 'content_mismatch', message: 'File .sql phải là văn bản SQL (không phải nhị phân).' });
          }
        } else if (!requestUploadSniffOk(mime, buf)) {
          return res.status(415).json({ error: 'content_mismatch', mime, message: 'Nội dung file không khớp định dạng khai báo.' });
        }
        const kind = String(req.headers['x-kind'] || 'file').toLowerCase() === 'screenshot' ? 'screenshot' : 'file';
        // Sanitize tên hiển thị: loại bỏ ký tự nguy hiểm để tránh XSS khi render trong inbox.
        const safeName = rawName.replace(/[\\/\x00-\x1f<>"|?*]/g, '_').trim()
          || (kind === 'screenshot' ? 'screenshot.png' : 'attachment');
        // Phân thư mục theo ngày để dễ housekeeping + tránh 1 dir quá đông.
        const day = new Date().toISOString().slice(0, 10);
        const targetDir = path.join(dir, day);
        await fs.mkdir(targetDir, { recursive: true });
        // Data file giữ đúng đuôi gốc; còn lại suy từ MIME đã kiểm.
        const ext = isData ? nameExt : (MIME_TO_EXT[mime] || path.extname(safeName).toLowerCase().slice(0, 8) || '');
        const fname = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
        const fpath = path.join(targetDir, fname);
        await fs.writeFile(fpath, buf);
        const url = `/uploads/requests/${day}/${fname}`;
        // Chuẩn hoá MIME trả về cho data file để FE/inbox hiển thị đúng (không phải ảnh).
        const reportMime = isSqlite ? 'application/x-sqlite3' : (nameExt === '.sql' ? 'application/sql' : mime);
        res.json({ ok: true, url, name: safeName, mime: reportMime, size: buf.length, kind });
      } catch (err) {
        console.warn('[requests/attachments] upload failed:', err?.message || err);
        res.status(500).json({ error: 'upload_failed', message: 'Không lưu được file.' });
      }
    });
}

// Đính kèm "Ban điều hành AI" — ảnh chụp màn hình + file của HS gửi kèm yêu cầu.
// Read-only (POST đi qua /api/requests/attachments có gate). Cache vài giờ vì
// asset bất biến (tên file random, ghi đè bất khả thi). NO directory listing.
export const setRequestUploadHeaders = (res, filePath) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  // Phòng thủ nhiều lớp cho nội dung do người dùng tải lên:
  //  • nosniff: trình duyệt không tự đoán lại Content-Type.
  //  • CSP sandbox + default-src 'none': kể cả file HTML/SVG lọt vào cũng KHÔNG
  //    chạy được script khi mở thẳng.
  //  • Content-Disposition: ép tải về với mọi định dạng trừ ảnh raster an toàn —
  //    SVG/PDF/Office… không bao giờ render inline trong origin.
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'none'; sandbox");
  const ext = path.extname(filePath).toLowerCase();
  if (!REQUEST_INLINE_SAFE_EXT.has(ext)) res.setHeader('Content-Disposition', 'attachment');
};

// Ảnh bản nháp ở S3-compatible: proxy GET trước static (miss → static, nên FAB upload local vẫn chạy).
export function attachRequestUploadStatic(router, { dir, shotBackend }) {
  if (shotBackend?.kind === 's3') router.use('/uploads/requests', shotProxy(shotBackend, setRequestUploadHeaders));
  router.use('/uploads/requests', express.static(dir, {
    fallthrough: false,
    index: false,
    setHeaders: setRequestUploadHeaders,
  }));
  router.use('/uploads/requests', (error, _req, res, next) => (Number(error?.status) === 404
    ? res.status(404).type('text/plain').send('Not found') : next(error)));
}

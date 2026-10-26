-- LF/99: cột additive `requests.execution_mode` ('now' | 'queue'); NULL = luồng cũ.
-- 'queue': request không tạo root ticket cho worker claim, chờ Claude Code qua inbox.
-- 'now'/'queue' do người gửi chọn trong cửa sổ đề nghị; mặc định 'làm ngay'.
ALTER TABLE requests ADD COLUMN execution_mode TEXT;

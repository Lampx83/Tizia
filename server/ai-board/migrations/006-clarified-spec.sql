-- Spec đã làm rõ với người gửi (ticket 06). detail gốc giữ nguyên; worker dùng spec nếu có.
ALTER TABLE requests ADD COLUMN clarified_spec TEXT;

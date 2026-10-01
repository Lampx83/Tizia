-- Spec đã làm rõ với người gửi. detail gốc giữ nguyên; worker dùng spec nếu có.
ALTER TABLE requests ADD COLUMN clarified_spec TEXT;

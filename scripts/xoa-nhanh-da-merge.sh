#!/bin/bash
# ============================================================
# xoa-nhanh-da-merge.sh — dọn 61 nhánh remote đã gộp hết vào main
#
# VÌ SAO CÓ FILE NÀY: phiên Ban điều hành AI 2026-09-30 được yêu cầu xoá hết
# nhánh, nhưng `git push origin --delete` trả HTTP 403 — token GitHub của môi
# trường routine tạo/cập nhật ref được, KHÔNG xoá được ref. Cùng phiên đó vẫn
# push nhánh và merge PR bình thường ⇒ là giới hạn quyền, không phải lỗi mạng.
# Nên phần xoá để người vận hành chạy ở máy có quyền.
#
# DANH SÁCH DƯỚI ĐÂY AN TOÀN: mỗi nhánh đã được kiểm bằng `git cherry origin/main
# <nhánh>` — 0 commit nào của nó chưa có trên main ⇒ xoá không mất gì.
#
# KHÔNG có trong danh sách (cố ý):
#   • feat/postgres-migration — PRODUCTION đang chạy từ nhánh này.
#   • 26 nhánh còn commit chưa có trên main (dev, feat/plugin-registry-*, …).
#   • 30 nhánh không chung gốc với main (lịch sử trước lần viết lại repo).
#
# CÁCH DÙNG:  bash scripts/xoa-nhanh-da-merge.sh
# Chạy xong thì file này hết việc — xoá đi được.
# ============================================================
set -e
git fetch origin --prune
git push origin --delete ai-board/2026-07-27 ai-board/2026-07-28 ai-board/2026-07-29 ai-board/2026-07-30 ai-board/2026-07-31 ai-board/2026-08-01 ai-board/2026-08-02 ai-board/2026-08-03 ai-board/2026-08-05 ai-board/2026-08-06 ai-board/2026-08-07 ai-board/2026-08-08 ai-board/2026-08-09 ai-board/2026-08-11 ai-board/2026-08-13 ai-board/2026-08-14 ai-board/2026-08-15 ai-board/2026-08-16 ai-board/2026-08-18 ai-board/2026-08-19 ai-board/2026-08-19-fix ai-board/2026-08-20 ai-board/2026-08-21 ai-board/2026-08-22 ai-board/2026-08-24 ai-board/2026-08-25 ai-board/2026-08-26 ai-board/2026-08-29 ai-board/2026-08-30 ai-board/2026-09-01 ai-board/2026-09-02 ai-board/2026-09-03 ai-board/2026-09-06 ai-board/2026-09-07 ai-board/2026-09-09 ai-board/2026-09-10 ai-board/2026-09-14 ai-board/2026-09-14-inbox-api ai-board/2026-09-15 ai-board/2026-09-16 ai-board/2026-09-17 ai-board/2026-09-19 ai-board/2026-09-20 ai-board/2026-09-21 ai-board/2026-09-22 ai-board/2026-09-23 ai-board/2026-09-24 ai-board/2026-09-25 ai-board/2026-09-26 ai-board/2026-09-27 ai-board/2026-09-27-p75 ai-board/2026-09-28 ai-board/2026-09-29 ai-board/2026-09-29-preflight claude/brave-keller-1t0i9h claude/brave-keller-k3l4vm claude/brave-keller-mc9370 claude/brave-keller-qugyka claude/youthful-hypatia-ek3tju claude/youthful-hypatia-in7bmu claude/youthful-hypatia-l41ex3
git fetch origin --prune

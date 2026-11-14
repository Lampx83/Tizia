'use client';

import { useEffect } from 'react';
import styles from './index.module.css';

declare global {
  interface Window { EduTutor?: { open?: () => void } }
}

// Nút "Hỏi AI Tutor" — mở trợ lý AI nổi (tutor-floating.js gắn window.EduTutor).
// Trang gốc index.html nạp <script src="./js/tutor-floating.js" data-domain="general">;
// web-next là cửa trước nên phải tự nhúng widget đó, nếu không window.EduTutor
// không tồn tại → bấm nút không hiện gì (bug đã gặp).
export default function HeroTutorButton() {
  useEffect(() => {
    // Đã có (do trang khác nạp hoặc điều hướng nội bộ) → khỏi nhúng lại.
    if (window.EduTutor || document.getElementById('tizia-tutor-floating')) return;
    const el = document.createElement('script');
    el.id = 'tizia-tutor-floating';
    el.src = '/js/tutor-floating.js';
    el.defer = true;
    el.setAttribute('data-domain', 'general');
    document.body.appendChild(el);
    // Không gỡ khi unmount: widget nổi dùng chung toàn phiên, gỡ đi sẽ mất hội thoại.
  }, []);

  const openTutor = () => {
    // Nếu script đã nạp xong thì mở ngay; nếu người dùng bấm quá sớm thì đợi
    // một nhịp cho tới khi window.EduTutor sẵn sàng (tối đa ~2s).
    if (window.EduTutor?.open) { window.EduTutor.open(); return; }
    let tries = 0;
    const timer = setInterval(() => {
      if (window.EduTutor?.open) { window.EduTutor.open(); clearInterval(timer); }
      else if (++tries > 20) clearInterval(timer);
    }, 100);
  };

  return (
    <button
      type="button"
      className={`${styles.cta} ${styles.ctaGhost}`}
      onClick={openTutor}
    >
      Hỏi AI Tutor
    </button>
  );
}

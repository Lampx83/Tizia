// BASE_PATH — tiền tố sub-path khi deploy sau reverse proxy (vd '/ps'). Tính 1
// lần, dùng chung cho mọi context cần biết app mount ở đâu (SEO canonical,
// OAuth redirect, sibling-app proxy…) mà không phải nhận lại qua tham số.
export const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/$/, '');

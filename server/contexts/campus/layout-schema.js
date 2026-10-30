export const ALLOWED_DOMAINS = new Set(['preschool', 'primary', 'secondary', 'it', 'pharmacy', 'language', 'driving']);

// Whitelist key cấp 1 — bám schema CAMPUSES trong public/campus-proto/b-iso-canvas.html.
export const ALLOWED_KEYS = new Set([
  'title', 'credit', 'grass', 'vroads', 'hroads', 'autoPaths', 'roads',
  'buildings', 'facilities', 'fields', 'playthings', 'critters',
  'trees', 'cars', 'props', 'walkways', 'tints', 'sportTargets',
  'walls',
]);

/** Giữ đúng key cho phép; null khi rỗng/không phải object. */
export function sanitize(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const out = {};
  for (const k of Object.keys(input)) if (ALLOWED_KEYS.has(k)) out[k] = input[k];
  return Object.keys(out).length ? out : null;
}

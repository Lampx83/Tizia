import fs from 'node:fs';
// Optional: the worker image lints skills without npm dependencies and must fall back to UTF-8 counting.
let Tokenizer = null;
try { ({ Tokenizer } = await import('@huggingface/tokenizers')); } catch { Tokenizer = null; }

const ENV = 'AI_BOARD_QWEN_TOKENIZER';
const cache = new Map();
const utf8 = { method: 'utf8_upper_bound', count: text => Buffer.byteLength(text, 'utf8') };

function load(file) {
  if (!cache.has(file)) {
    let tokenizer = null;
    try { tokenizer = Tokenizer && new Tokenizer(JSON.parse(fs.readFileSync(file, 'utf8')), {}); } catch { tokenizer = null; }
    cache.set(file, tokenizer);
  }
  return cache.get(file);
}

/** Qwen tokenizer.json từ env AI_BOARD_QWEN_TOKENIZER; thiếu/lỗi thì UTF-8 bytes (cận trên). */
export function tokenCounter() {
  const file = process.env[ENV];
  const tokenizer = file && fs.existsSync(file) ? load(file) : null;
  if (!tokenizer) return utf8;
  return { method: 'qwen_tokenizer', count: text => tokenizer.encode(text, { add_special_tokens: false }).ids.length };
}

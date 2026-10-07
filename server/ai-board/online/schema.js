// Data-only UI schema for online features. The host renderer draws it with textContent only:
// no generated HTML, script, URL, style or event handler can be expressed here.
export class SchemaError extends Error {
  constructor(path, reason) { super(`${path}: ${reason}`); this.code = 'invalid_ui_schema'; }
}
const NAME = /^[a-z][a-z0-9_]{0,63}$/;
// markup, URL schemes/protocol-relative links and control characters are never display text
const UNSAFE = /[<>]|\b(?:https?|javascript|data|vbscript|file|blob|ftp|wss?):|\/\/|[\u0000-\u0008\u000b-\u001f\u007f]/i;
const FORBID_KEY = /^(?:on.*|href|src|srcdoc|url|html|style|script|action|formaction|target|rel|download)$/i;
const LIMITS = { blocks: 30, fields: 16, actions: 8, text: 2000, label: 120 };
const fail = (path, reason) => { throw new SchemaError(path, reason); };

function exact(value, keys, path) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(path, 'mapping required');
  for (const key of Object.keys(value)) {
    if (FORBID_KEY.test(key)) fail(`${path}.${key}`, 'forbidden key');
    if (!keys.includes(key)) fail(`${path}.${key}`, 'unknown key');
  }
  for (const key of keys) if (!(key in value)) fail(`${path}.${key}`, 'required');
}
const str = (value, path, max) => {
  if (typeof value !== 'string' || !value.length || value.length > max) fail(path, `text 1..${max} required`);
  if (UNSAFE.test(value)) fail(path, 'markup, URL or control character not allowed');
  return value;
};
const name = (value, path) => { if (typeof value !== 'string' || !NAME.test(value)) fail(path, 'identifier required'); return value; };
const id = (value, path) => { if (!Number.isSafeInteger(value) || value < 1) fail(path, 'positive integer required'); return value; };
const list = (value, path, max, each) => {
  if (!Array.isArray(value) || value.length > max) fail(path, `list of at most ${max} required`);
  return value.map((item, i) => each(item, `${path}[${i}]`));
};
const column = (v, p) => { exact(v, ['name', 'label'], p); return { name: name(v.name, `${p}.name`), label: str(v.label, `${p}.label`, LIMITS.label) }; };

/** Validate + return a normalised copy. `approvedOperations` = names the platform manifest allows for this feature. */
export function validateUiSchema(input, { approvedOperations = [] } = {}) {
  exact(input, ['version', 'title', 'blocks'], 'ui');
  if (input.version !== 1) fail('ui.version', 'must be 1');
  const blocks = list(input.blocks, 'ui.blocks', LIMITS.blocks, (b, p) => {
    if (!b || typeof b !== 'object') fail(p, 'mapping required');
    switch (b.type) {
      case 'heading': case 'text':
        exact(b, ['type', 'text'], p);
        return { type: b.type, text: str(b.text, `${p}.text`, LIMITS.text) };
      case 'record_list':
        exact(b, ['type', 'title', 'resource_id', 'fields', 'row_actions'], p);
        return {
          type: b.type, title: str(b.title, `${p}.title`, LIMITS.label), resource_id: id(b.resource_id, `${p}.resource_id`),
          fields: list(b.fields, `${p}.fields`, LIMITS.fields, column),
          row_actions: list(b.row_actions, `${p}.row_actions`, LIMITS.actions, (a, ap) => {
            exact(a, ['label', 'operation'], ap);
            const operation = name(a.operation, `${ap}.operation`);
            if (!approvedOperations.includes(operation)) fail(`${ap}.operation`, 'operation not approved');
            return { label: str(a.label, `${ap}.label`, LIMITS.label), operation };
          }),
        };
      case 'form':
        exact(b, ['type', 'title', 'resource_id', 'fields', 'submit_label'], p);
        return {
          type: b.type, title: str(b.title, `${p}.title`, LIMITS.label), resource_id: id(b.resource_id, `${p}.resource_id`),
          fields: list(b.fields, `${p}.fields`, LIMITS.fields, (f, fp) => {
            exact(f, ['name', 'label', 'kind'], fp);
            if (!['text', 'number', 'checkbox'].includes(f.kind)) fail(`${fp}.kind`, 'text|number|checkbox');
            return { ...column({ name: f.name, label: f.label }, fp), kind: f.kind };
          }),
          submit_label: str(b.submit_label, `${p}.submit_label`, LIMITS.label),
        };
      default: return fail(`${p}.type`, 'unknown component');
    }
  });
  return { version: 1, title: str(input.title, 'ui.title', LIMITS.label), blocks };
}

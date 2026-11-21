// JSON-schema subset for data_kinds payloads; same rules and messages as ai-board/harness/gates/data_kinds.py (test/fixtures/data-schema-vectors.json).
const json = (value) => JSON.stringify(value);
const same = (a, b) => json(a) === json(b);
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const TYPES = {
  object: isObject,
  array: Array.isArray,
  string: (value) => typeof value === 'string',
  boolean: (value) => typeof value === 'boolean',
  null: (value) => value === null,
  number: (value) => typeof value === 'number',
  integer: (value) => Number.isInteger(value),
};
const outside = (count, lo, hi) => count < (lo ?? 0) || count > (hi ?? count);

/** Problems of value against schema; [] when valid. */
export function validate(value, schema, path = 'payload') {
  if ('const' in schema && !same(value, schema.const)) return [`${path} phải bằng ${json(schema.const)}`];
  if ('enum' in schema && !schema.enum.some((item) => same(item, value))) {
    return [`${path}=${json(value)} không thuộc ${json(schema.enum)}`];
  }
  if (schema.type && !TYPES[schema.type](value)) return [`${path} phải là ${schema.type}`];
  const out = [];
  if (isObject(value)) {
    const keys = Object.keys(value);
    out.push(...(schema.required ?? []).filter((key) => !(key in value)).map((key) => `${path}.${key} bắt buộc`));
    if (keys.length < (schema.minProperties ?? 0)) out.push(`${path} cần ít nhất ${schema.minProperties} khoá`);
    if (keys.length > (schema.maxProperties ?? keys.length)) out.push(`${path} tối đa ${schema.maxProperties} khoá`);
    const props = schema.properties ?? {};
    const extra = schema.additionalProperties ?? true;
    for (const key of keys) {
      if (key in props) out.push(...validate(value[key], props[key], `${path}.${key}`));
      else if (extra === false) out.push(`${path}.${key} không được phép`);
      else if (isObject(extra)) out.push(...validate(value[key], extra, `${path}.${key}`));
    }
  } else if (Array.isArray(value)) {
    if (outside(value.length, schema.minItems, schema.maxItems)) out.push(`${path} sai số phần tử`);
    if (schema.items) value.forEach((item, i) => out.push(...validate(item, schema.items, `${path}[${i}]`)));
  } else if (typeof value === 'string') {
    if (outside([...value].length, schema.minLength, schema.maxLength)) out.push(`${path} sai độ dài`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) out.push(`${path} không khớp ${schema.pattern}`);
  } else if (typeof value === 'number') {
    if (value < (schema.minimum ?? value) || value > (schema.maximum ?? value)) out.push(`${path} ngoài khoảng cho phép`);
  }
  return out;
}

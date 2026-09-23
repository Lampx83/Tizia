import { createHash } from 'node:crypto';

export const CAPABILITY_POLICY_VERSION = 'd0-v2';
const capability = (tier, allow, rationale, overrides = {}) => Object.freeze({
  tier,
  allow,
  deny: overrides.deny || [],
  imports: overrides.imports || [],
  dependencies: overrides.dependencies || [],
  mandatoryTests: overrides.mandatoryTests || [],
  owner: overrides.owner || 'ai-board-maintainers',
  rationale,
});

export const CAPABILITY_POLICY = Object.freeze({
  'public.ui': capability('surface', ['public/'], 'Public static interface files.'),
  'generated.context': capability('surface', ['server/contexts/_ai-generated/'], 'Generated context output only.'),
  features: capability('surface', ['public/', 'server/contexts/_ai-generated/'], 'Feature presentation without server core changes.'),
  content: capability('surface', ['public/', 'server/contexts/_ai-generated/'], 'Domain content and presentation.'),
  experiments: capability('surface', ['public/', 'server/contexts/_ai-generated/'], 'Experiment presentation and generated context.'),
  quiz: capability('surface', ['public/', 'server/contexts/_ai-generated/'], 'Quiz presentation and generated context.'),
  'content.write': capability('protected', ['server/contexts/content/', 'public/'], 'Changes the shared content service.'),
  'integration.write': capability('protected', ['server/contexts/integration/'], 'Changes external service integrations.'),
  'core.server': capability('core', ['server/', 'scripts/'], 'Core server or operational code always needs a human.'),
});

const TIERS = Object.freeze({ surface: 0, protected: 1, core: 2 });
const RISKS = new Set(['low', 'medium', 'high']);

export class PlanGuardrailError extends Error {
  constructor(code, internalReason, publicMessage = 'Kế hoạch cần được làm rõ trước khi tiếp tục.') {
    super(internalReason);
    this.code = code;
    this.internalReason = internalReason;
    this.publicMessage = publicMessage;
  }
}

function fail(code, internal, publicMessage) {
  throw new PlanGuardrailError(code, internal, publicMessage);
}

function nonEmptyString(value, field) {
  if (typeof value !== 'string' || !value.trim()) fail('malformed_plan', `${field} must be a non-empty string`);
  return value.trim();
}

function stringList(value, field, { allowEmpty = false } = {}) {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0) || value.some((item) => typeof item !== 'string' || !item.trim())) {
    fail('malformed_plan', `${field} must be ${allowEmpty ? 'an' : 'a non-empty'} array of strings`);
  }
  return value.map((item) => item.trim());
}

function safePath(value, field) {
  const normalized = nonEmptyString(value, field).replaceAll('\\', '/').replace(/^\.\//, '');
  if (normalized.startsWith('/') || /^[A-Za-z]:\//.test(normalized) || normalized.split('/').includes('..')) {
    fail('scope_violation', `${field} contains unsafe path: ${value}`,
      'Kế hoạch vượt ngoài phạm vi an toàn và đang chờ xem lại.');
  }
  return normalized;
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

export function stablePlanJson(plan) {
  return JSON.stringify(stable(plan));
}

export function hashCapabilityPolicy(policy) {
  const enforcedPolicy = Object.fromEntries(Object.entries(policy).map(([name, entry]) => [name, {
    tier: entry.tier,
    allow: entry.allow,
    deny: entry.deny,
    mandatoryTests: entry.mandatoryTests,
  }]));
  return createHash('sha256').update(JSON.stringify(stable(enforcedPolicy))).digest('hex');
}

export const CAPABILITY_POLICY_HASH = hashCapabilityPolicy(CAPABILITY_POLICY);

export function validatePlan(plan, requestDomain) {
  if (!plan || typeof plan !== 'object' || Array.isArray(plan)) fail('malformed_plan', 'plan must be an object');
  const domain = nonEmptyString(plan.domain, 'domain');
  if (domain !== requestDomain) {
    fail('domain_mismatch', `plan domain '${domain}' does not match request domain '${requestDomain}'`,
      'Kế hoạch không khớp trường của yêu cầu và đang chờ xem lại.');
  }
  const normalized = {
    domain,
    goal: nonEmptyString(plan.goal, 'goal'),
    allowed_scope: stringList(plan.allowed_scope, 'allowed_scope').map((item) => safePath(item, 'allowed_scope')),
    acceptance: stringList(plan.acceptance, 'acceptance'),
    tests: stringList(plan.tests, 'tests'),
    capabilities: stringList(plan.capabilities, 'capabilities'),
    risk: nonEmptyString(plan.risk, 'risk'),
    non_goals: stringList(plan.non_goals, 'non_goals', { allowEmpty: true }),
    steps: plan.steps,
  };
  if (!RISKS.has(normalized.risk)) fail('malformed_plan', `unknown risk '${normalized.risk}'`);
  if (!Array.isArray(normalized.steps) || normalized.steps.length === 0) fail('malformed_plan', 'steps must be non-empty');
  const topCapabilities = new Set(normalized.capabilities);
  let tier = normalized.risk === 'high' ? 'protected' : 'surface';
  const planScope = new Set(normalized.allowed_scope);

  for (const capability of normalized.capabilities) {
    const policy = CAPABILITY_POLICY[capability];
    if (!policy) fail('unknown_capability', `unknown capability '${capability}'`,
      'Kế hoạch yêu cầu quyền chưa được hỗ trợ và đang chờ xem lại.');
    if (TIERS[policy.tier] > TIERS[tier]) tier = policy.tier;
    for (const requiredTest of policy.mandatoryTests) {
      if (!normalized.tests.includes(requiredTest)) fail('missing_mandatory_test', `capability '${capability}' requires test '${requiredTest}'`);
    }
  }

  normalized.steps = normalized.steps.map((step, index) => {
    if (!step || typeof step !== 'object' || Array.isArray(step)) fail('malformed_plan', `steps[${index}] must be an object`);
    const order = Number(step.order);
    if (!Number.isInteger(order) || order !== index + 1) fail('malformed_plan', `steps[${index}].order must be ${index + 1}`);
    const capability = nonEmptyString(step.capability, `steps[${index}].capability`);
    const policy = CAPABILITY_POLICY[capability];
    if (!policy || !topCapabilities.has(capability)) fail('unknown_capability', `step capability '${capability}' is unknown or undeclared`,
      'Kế hoạch yêu cầu quyền chưa được hỗ trợ và đang chờ xem lại.');
    const allowedScope = stringList(step.allowed_scope, `steps[${index}].allowed_scope`).map((item) => safePath(item, `steps[${index}].allowed_scope`));
    for (const item of allowedScope) {
      if (policy.deny.some((denied) => item === denied || item.startsWith(denied))
        || !planScope.has(item) || !policy.allow.some((prefix) => item.startsWith(prefix))) {
        fail('scope_violation', `scope '${item}' is not granted to capability '${capability}'`,
          'Kế hoạch vượt ngoài phạm vi an toàn và đang chờ xem lại.');
      }
    }
    if (TIERS[policy.tier] > TIERS[tier]) tier = policy.tier;
    const risk = nonEmptyString(step.risk, `steps[${index}].risk`);
    if (!RISKS.has(risk)) fail('malformed_plan', `unknown step risk '${risk}'`);
    if (risk === 'high' && tier === 'surface') tier = 'protected';
    return {
      order,
      title: nonEmptyString(step.title, `steps[${index}].title`),
      description: nonEmptyString(step.description, `steps[${index}].description`),
      allowed_scope: allowedScope,
      acceptance: stringList(step.acceptance, `steps[${index}].acceptance`),
      tests: stringList(step.tests, `steps[${index}].tests`),
      capability,
      risk,
      non_goals: stringList(step.non_goals, `steps[${index}].non_goals`, { allowEmpty: true }),
    };
  });

  const planJson = stablePlanJson(normalized);
  return {
    plan: normalized,
    planJson,
    policyHash: CAPABILITY_POLICY_HASH,
    planHash: createHash('sha256').update(`${CAPABILITY_POLICY_VERSION}\n${CAPABILITY_POLICY_HASH}\n${planJson}`).digest('hex'),
    tier,
  };
}

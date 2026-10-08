import { BrokerError } from './adapter.js';
export { BrokerError };

const NAME = /^[a-z][a-z0-9_]{0,63}$/;
const own = (obj, key) => Object.hasOwn(obj, key) ? obj[key] : undefined;
const MAX_RESULT_BYTES = 16384;

/**
 * Platform broker. Generated code may only name an approved operation + a record id.
 * `manifest[featureId][operation] = { adapter, resource_id, fields, response_fields }` is host-owned.
 * Authorization is re-read per request through the scoped-CRUD seam (session, role, feature approval, grants),
 * before the adapter runs and again before any result is returned.
 */
export function createBroker({ crud, manifest, operations, adapters = {}, audit = () => {}, releaseAllowed = async () => true }) {
  // `operations` = async provider { get(featureId, name), names(featureId) } (DB registry); `manifest` = static object form for tests
  const provider = operations ?? {
    get: async (featureId, operation) => { const ops = own(manifest ?? {}, String(featureId)); return ops && own(ops, operation); },
    names: async (featureId) => Object.keys(own(manifest ?? {}, String(featureId)) ?? {}),
  };
  const lookup = (featureId, operation) => provider.get(featureId, operation);
  const reread = (identity, featureId, def, recordId) => crud.read(identity, featureId, def.resource_id, recordId);

  async function invoke(identity, featureId, input) {
    const trace = { actor: Number(identity?.id) || null, feature: Number(featureId) || null, operation: null, adapter: null };
    const done = async (outcome) => { try { await audit({ ...trace, outcome, at: Date.now() }); } catch { /* audit must not change the outcome */ } };
    try {
      if (!input || typeof input !== 'object' || Array.isArray(input)
        || Object.keys(input).some((k) => !['operation', 'record_id'].includes(k))) throw new BrokerError('invalid_input', 400);
      if (typeof input.operation !== 'string' || !NAME.test(input.operation)
        || !Number.isSafeInteger(input.record_id) || input.record_id < 1) throw new BrokerError('invalid_input', 400);
      trace.operation = input.operation;
      const def = await lookup(featureId, input.operation);
      if (!def) throw new BrokerError('operation_not_approved', 404);
      const adapter = own(adapters, def.adapter);
      if (!adapter) throw new BrokerError('operation_not_approved', 404);
      trace.adapter = def.adapter;
      if (!await releaseAllowed(identity, featureId)) throw new BrokerError('feature_unavailable', 404);
      const record = await reread(identity, featureId, def, input.record_id); // throws ScopedCrudError when denied
      if (record.deleted) throw new BrokerError('record_deleted', 409);
      const payload = {};
      for (const field of def.fields) if (field in record.data) payload[field] = record.data[field];
      const raw = await adapter.send(payload);
      // authorization may have been revoked while the external call was pending: withhold the stale result
      if (!await releaseAllowed(identity, featureId)) throw new BrokerError('feature_unavailable', 404);
      await reread(identity, featureId, def, input.record_id);
      const result = {};
      for (const field of def.response_fields) {
        const v = raw?.[field];
        if (v === null || ['string', 'boolean'].includes(typeof v) || (typeof v === 'number' && Number.isFinite(v))) result[field] = v;
      }
      if (Buffer.byteLength(JSON.stringify(result)) > MAX_RESULT_BYTES) throw new BrokerError('response_too_large', 502);
      await done('ok');
      return { result };
    } catch (error) {
      await done(error.code ?? 'internal');
      throw error;
    }
  }
  return { invoke, approvedOperations: (featureId) => provider.names(featureId) };
}

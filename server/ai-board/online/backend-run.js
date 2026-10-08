import { BrokerError } from './adapter.js';

/**
 * OPTIONAL, off by default (AI_BOARD_ONLINE_BACKEND_SCRIPTS=true): request -> generated backend (zero-egress microVM) -> single intent over the exec channel -> broker.invoke.
 * The VM sees only a record id and the NAMES of approved operations; never identity, session, credentials or URLs.
 */
export function createBackendRunner({ registry, runner, broker, releaseAllowed, enabled = false, audit = async () => {} }) {
  return {
    async run(identity, featureId, input) {
      const trace = { actor: Number(identity?.id) || null, feature: Number(featureId) || null, operation: 'backend', adapter: null };
      const fail = async (error) => { try { await audit({ ...trace, outcome: error.code ?? 'internal', at: Date.now() }); } catch { /* ignore */ } throw error; };
      try {
        if (!enabled) throw new BrokerError('backend_disabled', 404); // UI actions use /invoke; a generated backend is opt-in
        if (!input || typeof input !== 'object' || Object.keys(input).some((k) => k !== 'record_id') || !Number.isSafeInteger(input.record_id) || input.record_id < 1) {
          throw new BrokerError('invalid_input', 400);
        }
        if (!runner) throw new BrokerError('backend_runner_unconfigured', 503);
        if (!await releaseAllowed(identity, featureId)) throw new BrokerError('feature_unavailable', 404);
        const script = await registry.backendScript(featureId);
        if (!script) throw new BrokerError('backend_not_found', 404);
        const request = JSON.stringify({ record_id: input.record_id, operations: await broker.approvedOperations(featureId) });
        const stdout = await runner.exec(['sh', '-c', script, 'backend', request]);
        const line = stdout.split('\n').map((l) => l.trim()).filter(Boolean).at(-1) ?? '';
        let message;
        try { message = JSON.parse(line); } catch { throw new BrokerError('backend_bad_output', 502); }
        if (!message || typeof message !== 'object' || Array.isArray(message) || Object.keys(message).join() !== 'intent') throw new BrokerError('backend_bad_output', 502);
        // Authorization is evaluated NOW (after the VM ran), so revocation during execution is honoured.
        return await broker.invoke(identity, featureId, message.intent);
      } catch (error) { return fail(error); }
    },
  };
}

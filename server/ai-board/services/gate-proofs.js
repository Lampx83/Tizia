// Bằng chứng một cổng kiểm chứng đã qua, tái dùng sau crash khi mọi pin còn khớp. Server là verifier: worker chỉ gửi pin hiện tại,
// lời model không chứng minh được validity. Proof không cấp quyền hay chứng nhận release; lease hiện tại luôn kiểm trước.
import { createHash, randomBytes } from 'node:crypto';
import { WorkerContractError } from '../repositories/store-contract.js';
import { createGateProofRepository } from '../repositories/gate-proofs.js';

// Cổng có hợp đồng reuse. Cổng khác (vd Gate 5 microVM) luôn kiểm thật cho tới khi có hợp đồng riêng.
export const REUSABLE_GATES = new Map([[4, { pins: ['candidate', 'plan', 'base', 'harness', 'prompt', 'tool', 'model', 'oracle'] }]]);
const MAX_RESULT = 100_000;
const HEX = /^[0-9a-f]{16,64}$/;
const bad = (message, code = 'invalid_gate_proof', status = 400) => new WorkerContractError(message, status, code);
const sha = (text) => createHash('sha256').update(String(text), 'utf8').digest('hex');
const canon = (value) => JSON.stringify(value, Object.keys(value).sort());
const parse = (text) => { try { return JSON.parse(text); } catch { return null; } };

function pinsOf(gate, raw) {
  const spec = REUSABLE_GATES.get(gate);
  if (!spec) throw bad('gate has no reuse contract', 'gate_not_reusable');
  if (!raw || typeof raw !== 'object') throw bad('pins required');
  const pins = {};
  for (const key of spec.pins) {
    const value = raw[key];
    if (typeof value !== 'string' || !value || value.length > 200) throw bad(`pin ${key} required`);
    pins[key] = value;
  }
  if (!HEX.test(pins.candidate)) throw bad('candidate pin must be a digest');
  return pins;
}

export function createGateProofService(store, repo = createGateProofRepository(store.db)) {
  async function event(ticketId, type, detail) {
    const now = Date.now();
    await repo.insertEvent({ ticketId, type, detail, key: `${type}:${ticketId}:${now}:${randomBytes(4).toString('hex')}`, now });
  }

  const ops = {
    async record(ticketId, body) {
      const gate = Number(body.gate), pins = pinsOf(gate, body.pins), result = body.result;
      if (!result || typeof result !== 'object' || result.blocked !== false) throw bad('only a passed gate leaves a proof', 'proof_requires_pass');
      const resultJson = JSON.stringify(result);
      if (resultJson.length > MAX_RESULT) throw bad('result too large');
      await repo.upsertProof({ ticketId, gate, runId: Number(body.run_id) || null, pinsJson: canon(pins), resultJson,
        digest: sha(resultJson), now: Date.now() });
      return { ok: true };
    },
    async check(ticketId, body) {
      const gate = Number(body.gate), pins = pinsOf(gate, body.pins);
      const proof = await repo.proof(ticketId, gate);
      const invalid = async (reason, drift = []) => {
        await event(ticketId, 'gate_proof_invalidated', { gate, reason, drift, proof_run_id: proof?.run_id ?? null });
        return { reuse: false, reason, drift };
      };
      if (!proof) return { reuse: false, reason: 'no_proof', drift: [] };
      if (sha(proof.result_json) !== proof.result_digest) return await invalid('proof_corrupt');
      const saved = parse(proof.pins_json) || {};
      const drift = Object.keys(pins).filter((key) => saved[key] !== pins[key]);
      if (drift.length) return await invalid('pin_drift', drift);
      await event(ticketId, 'gate_proof_reused', { gate, proof_run_id: proof.run_id, pins: Object.keys(pins) });
      return { reuse: true, result: parse(proof.result_json), proof_run_id: proof.run_id };
    },
  };

  /** record | check của ticket; lease sai/cũ → stale_lease trước khi đọc proof. */
  async function apply(ticketId, op, body = {}) {
    if (!Object.hasOwn(ops, op)) throw bad('unknown gate proof operation', 'unknown_operation', 404);
    return repo.tx(async () => {
      await store.assertLease(ticketId, body.worker_id, body.lease_token);
      return ops[op](Number(ticketId), body);
    });
  }
  return { apply };
}

# AI Board lessons: server-owned memory

Implemented locally on 2026-10-11 for approved memory tickets 01–04. This store is separate from run checkpoints, folder conversations, code indexes and traces. It does not skip gates or grant execution permissions.

## Runtime

Migration `021-lessons.sql` adds lessons, review audit, import manifests and bounded anonymous retry tombstones. The existing server migration runner applies the additive schema. HTTP workers require no database credential: a leased snapshot advertises `lessons_schema_version: 1`, and `RemoteLessons` uses the existing worker-key HTTP transport.

The worker buffers proposed interpretations during execution and sends them after the server acknowledges the verdict. Passing observations are reconstructed by the server from stored accepted gate evidence; worker text cannot certify an arbitrary rule. Recall returns at most three eligible lessons with source/version references. Every call checks current lease and namespace authority. Optional memory failures emit an error-type diagnostic and return no memory; there is no JSONL or stale-cache fallback.

Namespace comes from the request's verified owner, domain and active folder. Private lessons remain in that scope. An authorized admin can promote verified lessons within the same repository/domain. Revocation, missing evidence, file drift and stale proof block reuse. Dependency hashes cover the serving repository files named by the accepted plan; historical gate facts do not certify availability of a candidate artifact or completion of HSM deep history.

## Review and lifecycle

Open `/ai-board-lessons.html` while logged in. Owners can inspect sources/history and verify, correct, reject or delete their lessons. Admins can also promote, curate and run maintenance. Mutations require a current session, CSRF token and lesson version; the database rechecks current authority inside the transaction.

Proposed/legacy lessons expire after 30 days. Verified/curated lessons need revalidation within 90 days and immediately after a dependency changes. Source proof older than 90 days cannot be verified again. A different, newer accepted run can be supplied for verification/revalidation; review without fresh evidence cannot refresh stale trust. Correction returns a lesson to private/proposed status.

Curated lessons remain stored until withdrawal/deletion but still need current validity. Terminal payload and source identity are removed 30 days after `ended_at`; anonymous audit metadata lasts at most 90 days from the same date. Source evidence deletion or authority withdrawal can remove data earlier. Hashed retry tombstones prevent resurrection after payload removal and expire within the applicable source/audit window. GC touches only lesson tables, not unresolved release receipts or execution checkpoints.

## Legacy import and rollout

The review page reads a user-selected JSONL file in chunks of at most 100 entries. Stable source hashes, batch keys and entry keys make retries idempotent. It preserves the source file and offers a downloadable mapping report. The server maps ticket/run/gate evidence and namespace; missing `run_id` is accepted only when the latest matching finalized source is unambiguous. Mapped entries remain unreviewed legacy; unmappable entries are quarantined without storing their raw payload. Rollback removes only untouched imported versions, preserving later reviews/corrections.

Upgrade all HTTP workers before a production memory cutover. A new worker against an older server disables remote lessons without using local JSONL as authority. Standalone/offline legacy callers still retain their existing JSONL interface. No real legacy data was imported and no production migration/deployment was performed in this implementation. Private preview and self-improvement remain outside this rollout approval.

## Verification and limits

Public seams are covered in `test/ai-board-lessons.test.js` (real HTTP/PostgreSQL, actual Python client across workers), `test/ai-board-lessons-ui.test.js` and `ai-board/harness/tests/test_server_memory.py`. Fixtures cover source canonicalization, current ACL/lease/session, review/version, correction/revalidation, concurrent recalls/records, two folders/tenants, retention/tombstones, import/rollback and unresolved receipt preservation.

Full-suite attempts and their environmental/regression limitations are recorded in the local implementation handoff. These fixture results do not measure model/GPU quality, meet measurement/06's 5% criterion, certify HSM acceptance, or prove production readiness.

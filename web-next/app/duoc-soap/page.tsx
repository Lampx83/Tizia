'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

// ============================================================
// SOAP Writer Studio — hội thảo tương tác: chọn ca lâm sàng thực →
// viết báo cáo SOAP → AI giảng viên chấm theo rubric.
// ------------------------------------------------------------
// CONTENT (danh mục ca lâm sàng) KHÔNG hardcode trong file này. Nó nằm ở
// module gốc /js/engine/case-db.js (cùng nguồn mà server/ai.js đọc để chấm).
// Ta import ĐỘNG module đó lúc chạy (đường /js/* được Next proxy sang Express),
// nên nội dung ca vẫn ở đúng file gốc, không nhân bản sang code Next.
// Chấm bài: POST /api/ai/grade-soap (proxy sang Express → Claude API).
// ============================================================

// ---- Kiểu dữ liệu ca (khớp typedef ClinicalCase ở /js/engine/types.js) ----
type Prescription = { drugId: string; dose?: string; route?: string; frequency?: string; duration?: string };
type Patient = {
  id?: string;
  initials?: string;
  ageYears?: number;
  sex?: string;
  weightKg?: number;
  heightCm?: number;
  comorbidities?: string[];
  currentMeds?: string[];
  labs?: Record<string, unknown>;
  allergies?: string[];
};
type ClinicalCase = {
  id: string;
  title: string;
  chiefComplaint: string;
  history?: string;
  patient?: Patient;
  prescriptions?: Prescription[];
  soapRubric?: Record<string, unknown>;
  specialties?: string[];
  difficulty?: number;
  usedInYears?: number[];
};

type CaseDbModule = {
  CASES: ClinicalCase[];
  getCase: (id: string) => ClinicalCase | undefined;
};

// ---- Kết quả chấm từ /api/ai/grade-soap ----
type GradeScores = Partial<Record<'subjective' | 'objective' | 'assessment' | 'plan', number>>;
type GradeResult = {
  scores?: GradeScores;
  feedback?: Partial<Record<'subjective' | 'objective' | 'assessment' | 'plan', string>>;
  overallComment?: string;
  html?: string;
  missedDRPs?: string[];
  strengths?: string[];
};

const COLORS = ['#fbbf24', '#0ea5e9', '#10b981', '#f97316', '#a78bfa', '#ec4899'];
const ICONS = ['🩸', '👶', '👵', '🩺', '💊', '⚕️'];
const DIFF_LBL: Record<number, string> = { 1: 'Dễ', 2: 'Cơ bản', 3: 'TB', 4: 'Khó', 5: 'Rất khó' };
const SOAP_KEYS = ['s', 'o', 'a', 'p'] as const;
type SoapKey = (typeof SOAP_KEYS)[number];

function avgScore(scores?: GradeScores): number {
  if (!scores) return 0;
  const vals = (['subjective', 'objective', 'assessment', 'plan'] as const).map((k) => Number(scores[k]) || 0);
  return vals.reduce((a, b) => a + b, 0) / vals.length;
}

const PLACEHOLDERS: Record<SoapKey, string> = {
  s: 'VD: BN nam 68t tự thuật nôn ra máu đỏ tươi 2 lần sáng nay, đang dùng warfarin 5mg/ngày, mới được kê thêm clarithromycin 5 ngày…',
  o: 'VD: INR 7.8 (mục tiêu 2–3), Hb 8.5 g/dL (giảm), eGFR 65 mL/ph. Đơn hiện tại: warfarin 5mg…',
  a: 'VD: Xuất huyết tiêu hoá do quá liều warfarin, nguyên nhân tương tác CYP3A4 với clarithromycin, mức độ nguy hiểm (INR > 5 + chảy máu hoạt động)…',
  p: 'VD: Ngưng warfarin + clarithromycin; Vitamin K 10mg IV chậm; đổi sang azithromycin; re-start warfarin khi INR<2; theo dõi INR mỗi 3 ngày; tư vấn BN báo BS mọi thuốc mới…',
};
const SOAP_LABELS: Record<SoapKey, { label: string; hint: string }> = {
  s: { label: 'S — Subjective', hint: 'Lời kể của BN: triệu chứng chính, hoàn cảnh xuất hiện, tiền sử thuốc bằng lời kể.' },
  o: { label: 'O — Objective', hint: 'Sinh hiệu, xét nghiệm đáng chú ý, thuốc đang dùng (liều cụ thể), khám lâm sàng.' },
  a: { label: 'A — Assessment', hint: 'Nhận định vấn đề dùng thuốc (DRP): chẩn đoán, nguyên nhân, mức độ nặng.' },
  p: { label: 'P — Plan', hint: 'Kế hoạch can thiệp + theo dõi: ngưng thuốc, đảo ngược tác dụng, thay thế, theo dõi INR/AE, tư vấn BN.' },
};

export default function DuocSoapPage() {
  const [cases, setCases] = useState<ClinicalCase[] | null>(null);
  const [loadErr, setLoadErr] = useState(false);
  const getCaseRef = useRef<CaseDbModule['getCase'] | null>(null);

  const [currentCase, setCurrentCase] = useState<ClinicalCase | null>(null);
  const [soap, setSoap] = useState<Record<SoapKey, string>>({ s: '', o: '', a: '', p: '' });

  const [grading, setGrading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [gradeError, setGradeError] = useState<string | null>(null);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const feedbackRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  // Nạp danh mục ca từ module gốc (content ở /js/engine/case-db.js, không copy vào
  // code). Đường /js/* được Next proxy sang Express. Dùng native dynamic import qua
  // URL dựng lúc chạy (Function indirection) để Turbopack/webpack KHÔNG cố bundle
  // file này — nó là ESM thuần, không import runtime nào khác.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const url = new URL('/js/engine/case-db.js', window.location.origin).href;
        const nativeImport = new Function('u', 'return import(u)') as (u: string) => Promise<CaseDbModule>;
        const mod = await nativeImport(url);
        if (!alive) return;
        getCaseRef.current = mod.getCase;
        const soapCases = (mod.CASES || []).filter((c) => c.soapRubric && c.patient && c.prescriptions);
        setCases(soapCases);
      } catch {
        if (alive) setLoadErr(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const wordCount = SOAP_KEYS.map((k) => soap[k].trim().split(/\s+/).filter(Boolean).length).reduce((a, b) => a + b, 0);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast((t) => (t === msg ? null : t)), 2800);
  }, []);

  const startCase = useCallback((c: ClinicalCase) => {
    const full = getCaseRef.current?.(c.id) || c;
    setCurrentCase(full);
    setSoap({ s: '', o: '', a: '', p: '' });
    setFeedbackVisible(false);
    setResult(null);
    setGradeError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const backToList = useCallback(() => {
    setCurrentCase(null);
    setFeedbackVisible(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const clearDraft = useCallback(() => {
    if (!confirm('Xoá toàn bộ nháp SOAP?')) return;
    setSoap({ s: '', o: '', a: '', p: '' });
  }, []);

  const submit = useCallback(async () => {
    if (!currentCase) return;
    const [s, o, a, p] = SOAP_KEYS.map((k) => soap[k].trim());
    const filledCount = [s, o, a, p].filter((t) => t.length >= 10).length;
    if (filledCount < 3) {
      showToast('⚠️ Cần viết ít nhất 3/4 mục SOAP (mỗi mục ≥ 10 ký tự) trước khi chấm.');
      return;
    }

    // Gộp 4 mục thành 1 SOAP note có nhãn rõ ràng — backend đọc cấu trúc này tốt hơn.
    const soapText = `[S — SUBJECTIVE]
${s || '(BN chưa khai thác)'}

[O — OBJECTIVE]
${o || '(Chưa ghi)'}

[A — ASSESSMENT]
${a || '(Chưa nhận định)'}

[P — PLAN]
${p || '(Chưa lập kế hoạch)'}`;

    setFeedbackVisible(true);
    setResult(null);
    setGradeError(null);
    setGrading(true);
    setTimeout(() => feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);

    try {
      const res = await fetch('/api/ai/grade-soap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ caseId: currentCase.id, soapText, rubric: 'all' }),
      });
      if (!res.ok) {
        let msg = `Lỗi máy chủ (${res.status})`;
        try {
          const err = await res.json();
          if (err?.error) msg = err.error;
        } catch {
          /* giữ msg mặc định */
        }
        throw new Error(msg);
      }
      const data = (await res.json()) as GradeResult;
      setResult(data);

      // Push adaptive event để tính skill (giống trang gốc) — global chỉ có ở shell cũ.
      try {
        const eduAdaptive = (window as unknown as { EduAdaptive?: { event: (e: unknown) => Promise<void> } }).EduAdaptive;
        if (eduAdaptive) {
          const overall = avgScore(data.scores);
          await eduAdaptive.event({
            skill: 'soap-' + currentCase.id,
            correct: overall >= 0.7,
            domain: 'pharmacy',
            context: currentCase.id,
            durationMs: 0,
          });
        }
      } catch {
        /* bỏ qua nếu shell không có EduAdaptive */
      }
    } catch (e) {
      setGradeError((e as Error)?.message || String(e));
    } finally {
      setGrading(false);
    }
  }, [currentCase, soap, showToast]);

  const retryCase = useCallback(() => {
    setFeedbackVisible(false);
    setResult(null);
    setGradeError(null);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth' }), 0);
  }, []);

  return (
    <div className="soap-studio">
      <div className="head">
        <Link className="back" href="/space?domain=pharmacy&b=hall">
          ← Hội trường
        </Link>
        <h1>🎓 SOAP Writer Studio</h1>
        <div className="stats">
          {cases ? `${cases.length} ca · Rubric SOAP chuẩn` : 'Hội thảo chuyên đề · Báo cáo ca theo SOAP'}
        </div>
      </div>

      {!currentCase && (
        <div>
          <p className="tagline">
            Đây là <b>hội thảo tương tác</b> — không chỉ xem slide. Chọn một <b>ca lâm sàng thực</b>, đọc kỹ thông tin BN,
            đơn thuốc, xét nghiệm, sau đó viết báo cáo theo cấu trúc <b>SOAP</b> (Subjective – Objective – Assessment – Plan).
            AI giảng viên sẽ chấm từng mục theo rubric, chỉ DRP còn bỏ sót, gợi ý phần cần cải thiện.
          </p>

          {loadErr && <div className="notice">Không tải được danh mục ca lâm sàng. Thử tải lại trang.</div>}
          {!cases && !loadErr && <div className="notice">Đang tải danh mục ca lâm sàng…</div>}

          {cases && (
            <div className="cases">
              {cases.map((c, i) => (
                <div
                  key={c.id}
                  className="case"
                  style={{ ['--case-color' as string]: COLORS[i % COLORS.length] }}
                  onClick={() => startCase(c)}
                >
                  <div className="diff">
                    {DIFF_LBL[c.difficulty ?? 3] || 'TB'} · ⭐{c.difficulty || 3}
                  </div>
                  <div className="ico">{ICONS[i % ICONS.length]}</div>
                  <h3>{c.title}</h3>
                  <div className="cc">{c.chiefComplaint}</div>
                  <div>
                    <span className="pill">Năm {(c.usedInYears || [4, 5]).join('–')}</span>
                    <span className="pill">{(c.specialties || ['general']).slice(0, 2).join(' · ')}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {currentCase && (
        <div className="work">
          {/* TRÁI: hồ sơ ca */}
          <div className="panel">
            <h2>📋 Hồ sơ ca lâm sàng</h2>
            <div className="ci-title">{currentCase.title}</div>
            <h3>Lý do vào viện</h3>
            <div className="row">{currentCase.chiefComplaint}</div>
            <h3>Diễn biến bệnh sử</h3>
            <div className="history">{currentCase.history || '—'}</div>
            <h3>Người bệnh</h3>
            <PatientGrid patient={currentCase.patient || {}} />
            <h3>Bệnh nền & dị ứng</h3>
            <BackgroundRow patient={currentCase.patient || {}} />
            <h3>Xét nghiệm / Sinh hiệu</h3>
            <LabsGrid labs={(currentCase.patient || {}).labs || {}} />
            <h3>Đơn thuốc hiện tại</h3>
            <RxList rx={currentCase.prescriptions || []} />
            <div style={{ marginTop: 14 }}>
              <button className="btn ghost" onClick={backToList}>
                ← Đổi ca
              </button>
            </div>
          </div>

          {/* PHẢI: form SOAP */}
          <div className="panel">
            <h2>✍️ Báo cáo SOAP của bạn</h2>
            <div style={{ fontSize: 12.5, opacity: 0.7, marginBottom: 10 }}>
              Tham khảo phác đồ Bộ Y tế, Dược thư Quốc gia. Viết ngắn gọn, đúng trọng tâm — KHÔNG copy lại đề bài.
            </div>
            <form className="soap-form" ref={formRef} onSubmit={(e) => e.preventDefault()}>
              {SOAP_KEYS.map((k) => (
                <div className="field" key={k}>
                  <label>
                    {SOAP_LABELS[k].label}
                    <span className="hint">{SOAP_LABELS[k].hint}</span>
                  </label>
                  <textarea
                    value={soap[k]}
                    placeholder={PLACEHOLDERS[k]}
                    onChange={(e) => setSoap((prev) => ({ ...prev, [k]: e.target.value }))}
                  />
                </div>
              ))}
              <div className="actions">
                <button type="button" className="btn primary" onClick={submit} disabled={grading}>
                  🤖 Nộp — AI chấm theo rubric
                </button>
                <button type="button" className="btn ghost" onClick={clearDraft}>
                  Xoá nháp
                </button>
                <span className="word-meter">{wordCount} từ</span>
              </div>
            </form>

            {feedbackVisible && (
              <div className={`feedback ${gradeError ? 'err' : ''} show`} ref={feedbackRef}>
                {grading && (
                  <>
                    <h3>🤖 AI giảng viên đang chấm…</h3>
                    <div className="loading">Phân tích SOAP theo rubric — có thể mất 20–40 giây.</div>
                  </>
                )}
                {!grading && gradeError && (
                  <>
                    <h3 style={{ color: '#fca5a5' }}>⚠️ Lỗi chấm bài</h3>
                    <div style={{ marginTop: 8, lineHeight: 1.5 }}>{gradeError}</div>
                    <div style={{ marginTop: 10, fontSize: 13, opacity: 0.7 }}>
                      Có thể server AI đang khởi động lại hoặc hết quota. Thử lại sau 30s, hoặc liên hệ ban điều hành.
                    </div>
                  </>
                )}
                {!grading && !gradeError && result && (
                  <Feedback result={result} caseTitle={currentCase.title} onRetry={retryCase} onNext={backToList} />
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {toast && <div className="toast show">{toast}</div>}

      <ScopedStyle />
    </div>
  );
}

// ── Hồ sơ BN: lưới 2 cột ──
function PatientGrid({ patient }: { patient: Patient }) {
  const sex = patient.sex === 'M' ? '· Nam' : patient.sex === 'F' ? '· Nữ' : '';
  return (
    <div className="grid2">
      <div className="l">Mã BN</div>
      <div className="v">{patient.initials || patient.id || '—'}</div>
      <div className="l">Tuổi</div>
      <div className="v">
        {patient.ageYears ?? '—'} {sex}
      </div>
      <div className="l">Cân nặng</div>
      <div className="v">{patient.weightKg ? patient.weightKg + ' kg' : '—'}</div>
      <div className="l">Chiều cao</div>
      <div className="v">{patient.heightCm ? patient.heightCm + ' cm' : '—'}</div>
    </div>
  );
}

// ── Bệnh nền & dị ứng ──
function BackgroundRow({ patient }: { patient: Patient }) {
  const como = patient.comorbidities || [];
  const allergies = patient.allergies || [];
  return (
    <div className="row">
      {como.length > 0 && (
        <>
          <b>Bệnh nền:</b> {como.join(', ')}
          <br />
        </>
      )}
      <b>Dị ứng:</b> {allergies.length > 0 ? allergies.join(', ') : 'Không'}
    </div>
  );
}

// ── Xét nghiệm / sinh hiệu ──
function LabsGrid({ labs }: { labs: Record<string, unknown> }) {
  const entries = Object.entries(labs);
  if (entries.length === 0) {
    return (
      <div className="grid2">
        <div className="l" style={{ gridColumn: '1/3', opacity: 0.6 }}>
          — Chưa có —
        </div>
      </div>
    );
  }
  return (
    <div className="grid2">
      {entries.map(([k, v]) => (
        <div key={k} style={{ display: 'contents' }}>
          <div className="l">{k}</div>
          <div className="v">{String(v)}</div>
        </div>
      ))}
    </div>
  );
}

// ── Đơn thuốc ──
function RxList({ rx }: { rx: Prescription[] }) {
  if (rx.length === 0) return <div className="row" style={{ opacity: 0.6 }}>— Chưa có đơn —</div>;
  return (
    <div className="rx-list">
      {rx.map((r, i) => (
        <div className="rx" key={i}>
          <span>
            <span className="drug">{r.drugId}</span>{' '}
            <span className="dose">
              {r.dose} {r.route} {r.frequency}
            </span>
          </span>
          <span className="dose">{r.duration || ''}</span>
        </div>
      ))}
    </div>
  );
}

// ── Kết quả chấm SOAP ──
function Feedback({
  result,
  caseTitle,
  onRetry,
  onNext,
}: {
  result: GradeResult;
  caseTitle: string;
  onRetry: () => void;
  onNext: () => void;
}) {
  const overall = Math.round(avgScore(result.scores) * 100);
  const color = overall >= 80 ? '#10b981' : overall >= 60 ? '#fbbf24' : '#ef4444';
  const verdict =
    overall >= 80 ? '🏆 Xuất sắc' : overall >= 70 ? '✅ Đạt yêu cầu' : overall >= 50 ? '⚠️ Cần cải thiện' : '❌ Chưa đạt';

  const s = result.scores || {};
  const fb = result.feedback || {};
  const pct = (v?: number) => Math.round((v ?? 0) * 100);
  const rows: { label: string; key: keyof GradeScores }[] = [
    { label: 'S — Subjective', key: 'subjective' },
    { label: 'O — Objective', key: 'objective' },
    { label: 'A — Assessment', key: 'assessment' },
    { label: 'P — Plan', key: 'plan' },
  ];

  return (
    <>
      <h3>📊 Kết quả chấm SOAP — {caseTitle}</h3>
      <div className="overall-score">
        <div>
          <div className="big" style={{ color }}>
            {overall}
            <span style={{ fontSize: 18, opacity: 0.6 }}>/100</span>
          </div>
          <div className="lbl">{verdict}</div>
        </div>
        <div style={{ flex: 1, fontSize: 13, opacity: 0.9, lineHeight: 1.55 }}>
          {result.overallComment ||
            'AI đã đánh giá theo rubric của ca. Đọc kỹ phần feedback từng mục để biết điểm cần bổ sung.'}
        </div>
      </div>

      {result.html ? (
        // Server có thể trả HTML render sẵn — giữ nguyên hành vi trang gốc.
        <div dangerouslySetInnerHTML={{ __html: result.html }} />
      ) : (
        <div className="ai-feedback-grid">
          {rows.map((r) => (
            <div className="soap-row" key={r.key}>
              <div className="soap-label">
                <b>{r.label}</b> — {pct(s[r.key])}/100
              </div>
              <div className="soap-bar">
                <div style={{ width: `${pct(s[r.key])}%` }} />
              </div>
              <div className="soap-fb">{fb[r.key] || '—'}</div>
            </div>
          ))}
          {(result.missedDRPs || []).length > 0 && (
            <div className="soap-missed">
              <b>⚠️ DRPs còn bỏ sót:</b>
              <ul>
                {result.missedDRPs!.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          )}
          {(result.strengths || []).length > 0 && (
            <div className="soap-strengths">
              <b>✅ Điểm tốt:</b>
              <ul>
                {result.strengths!.map((x, i) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div style={{ display: 'flex', gap: 10, marginTop: 14, flexWrap: 'wrap' }}>
        <button className="btn primary" onClick={onRetry}>
          ✍️ Viết lại ca này
        </button>
        <button className="btn ghost" onClick={onNext}>
          → Chọn ca khác
        </button>
      </div>
    </>
  );
}

// Thương hiệu riêng của trang (nền tím Dược lâm sàng) — giữ nguyên bảng màu bản gốc
// bằng CSS scoped, không dùng token theme chung. Xem risks.
function ScopedStyle() {
  return (
    <style>{`
      .soap-studio {
        --accent:#8b5cf6; --gold:#fbbf24; --ok:#10b981; --bad:#ef4444; --info:#0ea5e9;
        --card:rgba(255,255,255,.06); --card-h:rgba(255,255,255,.12);
        --border:rgba(255,255,255,.12);
        color:#fff;
      }
      .soap-studio * { box-sizing:border-box; }
      .soap-studio .head { display:flex; gap:14px; align-items:center; margin-bottom:20px; flex-wrap:wrap; }
      .soap-studio .head a.back { padding:8px 14px; background:var(--card); border:1px solid var(--border);
        border-radius:999px; color:#fff; text-decoration:none; font-size:13px; }
      .soap-studio .head h1 { margin:0; font-size:26px;
        background:linear-gradient(135deg,#fff 0%,#c4b5fd 50%,#8b5cf6 100%);
        -webkit-background-clip:text; background-clip:text; color:transparent; }
      .soap-studio .head .stats { margin-left:auto; opacity:.85; font-size:13px; }
      .soap-studio .tagline { opacity:.85; font-size:14px; line-height:1.6; max-width:920px; margin:0 0 20px; }
      .soap-studio .notice { opacity:.75; font-size:14px; padding:20px 0; }

      .soap-studio .cases { display:grid; gap:14px; grid-template-columns:repeat(auto-fill,minmax(290px,1fr)); }
      .soap-studio .case { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:18px;
        cursor:pointer; transition:transform .15s,background .15s,border-color .15s; position:relative; overflow:hidden; }
      .soap-studio .case::before { content:''; position:absolute; left:0; top:0; bottom:0; width:4px; background:var(--case-color,#8b5cf6); }
      .soap-studio .case:hover { background:var(--card-h); transform:translateY(-2px); border-color:var(--case-color,#8b5cf6); }
      .soap-studio .case .ico { font-size:34px; margin-bottom:6px; }
      .soap-studio .case h3 { margin:0 0 6px; font-size:16px; line-height:1.35; }
      .soap-studio .case .cc { font-size:13px; opacity:.9; line-height:1.4; margin-bottom:10px; }
      .soap-studio .case .diff { position:absolute; top:14px; right:14px; font-size:11px; padding:4px 9px; border-radius:999px;
        background:rgba(251,191,36,.15); color:#fcd34d; font-weight:700; }
      .soap-studio .case .pill { font-size:11px; padding:4px 10px; border-radius:999px; background:rgba(14,165,233,.15);
        color:#7dd3fc; display:inline-block; margin-right:5px; }

      .soap-studio .work { display:grid; grid-template-columns:1fr 1.05fr; gap:16px; margin-top:10px; }
      @media(max-width:980px){ .soap-studio .work { grid-template-columns:1fr; } }
      .soap-studio .panel { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:16px; }
      .soap-studio .panel h2 { margin:0 0 10px; font-size:17px; display:flex; gap:8px; align-items:center; }
      .soap-studio .panel h3 { margin:14px 0 6px; font-size:13.5px; opacity:.85; letter-spacing:.02em; text-transform:uppercase; }
      .soap-studio .panel .row { font-size:13px; line-height:1.55; opacity:.9; margin:4px 0; }
      .soap-studio .panel .row b { opacity:.95; }
      .soap-studio .ci-title { font-size:15px; font-weight:700; margin:0 0 10px; line-height:1.4; }
      .soap-studio .history { background:rgba(255,255,255,.04); border-left:3px solid var(--accent);
        border-radius:0 10px 10px 0; padding:10px 12px; font-size:13px; line-height:1.55; white-space:pre-wrap; margin-top:4px; }
      .soap-studio .grid2 { display:grid; gap:6px 14px; grid-template-columns:repeat(2,1fr); font-size:12.5px; }
      .soap-studio .grid2 .l { opacity:.65; }
      .soap-studio .grid2 .v { font-weight:600; font-variant-numeric:tabular-nums; text-align:right; }
      .soap-studio .rx-list { display:flex; flex-direction:column; gap:6px; margin-top:4px; }
      .soap-studio .rx { background:rgba(255,255,255,.04); border:1px solid var(--border); border-radius:10px;
        padding:8px 12px; font-size:13px; display:flex; justify-content:space-between; gap:10px; flex-wrap:wrap; }
      .soap-studio .rx .drug { font-weight:700; color:#fcd34d; }
      .soap-studio .rx .dose { opacity:.85; font-size:12.5px; }

      .soap-studio .soap-form .field { margin-bottom:12px; }
      .soap-studio .soap-form label { display:block; font-weight:700; font-size:13.5px; margin-bottom:6px; color:#c4b5fd; }
      .soap-studio .soap-form label .hint { display:block; font-weight:500; font-size:11.5px; opacity:.65; margin-top:2px; }
      .soap-studio .soap-form textarea { width:100%; min-height:78px; padding:10px 12px; border-radius:10px;
        background:rgba(0,0,0,.25); border:1px solid var(--border); color:#fff; font-family:inherit;
        font-size:13.5px; line-height:1.5; resize:vertical; transition:border-color .15s,background .15s; }
      .soap-studio .soap-form textarea:focus { outline:none; border-color:var(--accent); background:rgba(0,0,0,.35); }
      .soap-studio .soap-form .actions { display:flex; gap:10px; align-items:center; margin-top:12px; flex-wrap:wrap; }
      .soap-studio .btn { padding:11px 18px; border:none; border-radius:12px; cursor:pointer; font-weight:700; font-size:14px;
        font-family:inherit; transition:transform .12s,filter .12s; }
      .soap-studio .btn:hover { filter:brightness(1.12); transform:translateY(-1px); }
      .soap-studio .btn:disabled { opacity:.6; cursor:default; }
      .soap-studio .btn.primary { background:linear-gradient(135deg,#fbbf24,#f97316); color:#3e2723; }
      .soap-studio .btn.ghost { background:rgba(255,255,255,.08); color:#fff; border:1px solid var(--border); }
      .soap-studio .word-meter { margin-left:auto; font-size:12px; opacity:.7; font-variant-numeric:tabular-nums; }

      .soap-studio .feedback { background:var(--card); border:1px solid var(--ok); border-radius:14px; padding:18px; margin-top:16px; }
      .soap-studio .feedback.err { border-color:var(--bad); }
      .soap-studio .feedback h3 { margin:0 0 10px; color:var(--ok); font-size:17px; }
      .soap-studio .feedback .ai-feedback-grid { display:flex; flex-direction:column; gap:12px; }
      .soap-studio .feedback .soap-row { background:rgba(255,255,255,.04); border-radius:10px; padding:10px 14px; }
      .soap-studio .feedback .soap-label { font-size:13.5px; margin-bottom:6px; }
      .soap-studio .feedback .soap-bar { height:8px; background:rgba(255,255,255,.08); border-radius:99px; overflow:hidden; margin-bottom:6px; }
      .soap-studio .feedback .soap-bar > div { height:100%; background:linear-gradient(90deg,#fbbf24,#f97316); transition:width .6s ease-out; }
      .soap-studio .feedback .soap-fb { font-size:13px; line-height:1.5; opacity:.92; }
      .soap-studio .feedback .soap-missed { background:rgba(239,68,68,.1); border:1px solid rgba(239,68,68,.3);
        padding:10px 14px; border-radius:10px; color:#fca5a5; }
      .soap-studio .feedback .soap-missed b { color:#fecaca; }
      .soap-studio .feedback .soap-missed ul, .soap-studio .feedback .soap-strengths ul { margin:6px 0 0; padding-left:20px; font-size:13px; line-height:1.5; }
      .soap-studio .feedback .soap-strengths { background:rgba(16,185,129,.1); border:1px solid rgba(16,185,129,.3);
        padding:10px 14px; border-radius:10px; color:#6ee7b7; }
      .soap-studio .feedback .soap-strengths b { color:#a7f3d0; }
      .soap-studio .feedback .soap-overall { margin-top:6px; padding:12px 14px; background:rgba(139,92,246,.12);
        border-left:3px solid var(--accent); border-radius:0 10px 10px 0; font-size:13.5px; line-height:1.55; }
      .soap-studio .overall-score { display:flex; align-items:center; gap:14px; margin-bottom:14px;
        padding:12px 16px; background:rgba(0,0,0,.25); border-radius:12px; }
      .soap-studio .overall-score .big { font-size:36px; font-weight:900; font-variant-numeric:tabular-nums; }
      .soap-studio .overall-score .lbl { opacity:.7; font-size:12px; text-transform:uppercase; letter-spacing:.05em; }
      .soap-studio .loading { display:inline-flex; align-items:center; gap:8px; opacity:.85; font-size:13px; }
      .soap-studio .loading::before { content:''; width:14px; height:14px; border:2px solid rgba(255,255,255,.25);
        border-top-color:#fff; border-radius:50%; animation:soap-spin .8s linear infinite; }
      @keyframes soap-spin { to { transform:rotate(360deg); } }
      .soap-studio .toast { position:fixed; left:50%; bottom:30px; transform:translateX(-50%); background:rgba(15,23,42,.95);
        border:1px solid var(--border); border-radius:12px; padding:10px 18px; font-size:14px;
        box-shadow:0 12px 30px rgba(0,0,0,.4); z-index:50; animation:soap-fadein .25s; }
      @keyframes soap-fadein { from { opacity:0; transform:translate(-50%,8px); } to { opacity:1; transform:translate(-50%,0); } }
    `}</style>
  );
}

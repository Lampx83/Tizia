'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// ============================================================
// Bảng điều khiển GV real-time — migrate từ public/teacher-live.html
// Giữ nguyên hành vi: WS /ws-orchestrate, các loại message, text tiếng Việt.
// DOM Map<students> → React state; vòng đời WS trong useEffect + refs.
// ============================================================

type Student = {
  id: number;
  name: string;
  color: string;
  page?: string;
  status?: string;
  score?: number;
  correct?: number;
  total?: number;
  joinedAt?: number;
  lastSeen: number;
};

type LogEntry = { id: number; at: string; text: string };

function formatTimeAgo(epoch: number): string {
  const ago = Math.max(0, Math.floor(Date.now() / 1000) - epoch);
  if (ago < 60) return ago + 's trước';
  if (ago < 3600) return Math.floor(ago / 60) + 'p trước';
  return Math.floor(ago / 3600) + 'h trước';
}

const PRESETS: { target: string; label: string }[] = [
  { target: 'space.html', label: '🌌 Sảnh' },
  { target: 'quiz.html', label: '📝 Quiz' },
  { target: 'school.html', label: '🏫 School' },
];

let logSeq = 0;

export default function TeacherLive() {
  // Setup form
  const [teacherName, setTeacherName] = useState('');
  const [classCode, setClassCode] = useState('');
  const [connected, setConnected] = useState(false); // đã vào dashboard (đã join)
  const [connState, setConnState] = useState<{ on: boolean; text: string }>({
    on: false,
    text: '⚫ Chưa kết nối',
  });

  // Live state
  const [students, setStudents] = useState<Map<number, Student>>(new Map());
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Control inputs
  const [bcText, setBcText] = useState('');
  const [gatherTarget, setGatherTarget] = useState('space.html');
  const [pinText, setPinText] = useState('');
  const [quizId, setQuizId] = useState('');

  // Refs không trigger re-render
  const wsRef = useRef<WebSocket | null>(null);
  const studentsRef = useRef<Map<number, Student>>(new Map());
  const teacherNameRef = useRef('');
  const classCodeRef = useRef('');
  const startedRef = useRef(false); // đã bấm "Vào phiên live"
  const reconnectRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Khôi phục phiên trước từ localStorage
  useEffect(() => {
    try {
      const sv = JSON.parse(localStorage.getItem('teacher.live.session') || '{}');
      if (sv.teacherName) setTeacherName(sv.teacherName);
      if (sv.classCode) setClassCode(sv.classCode);
    } catch {
      /* ignore */
    }
  }, []);

  const commitStudents = useCallback(() => {
    // Clone Map để React nhận diện thay đổi.
    setStudents(new Map(studentsRef.current));
  }, []);

  const logEvent = useCallback((text: string) => {
    const entry: LogEntry = {
      id: ++logSeq,
      at: new Date().toLocaleTimeString('vi-VN'),
      text,
    };
    setLogs((prev) => {
      const next = [entry, ...prev];
      return next.length > 30 ? next.slice(0, 30) : next;
    });
  }, []);

  const handle = useCallback(
    (m: any) => {
      const S = studentsRef.current;
      switch (m.type) {
        case 'welcome': {
          S.clear();
          (m.snapshot?.students || []).forEach((s: Student) => S.set(s.id, s));
          commitStudents();
          logEvent(`Snapshot: ${m.snapshot?.students?.length ?? 0} HS đang online`);
          break;
        }
        case 'student-join': {
          S.set(m.student.id, m.student);
          commitStudents();
          logEvent(`➕ ${m.student.name} vào lớp`);
          break;
        }
        case 'student-leave': {
          const s = S.get(m.id);
          S.delete(m.id);
          commitStudents();
          logEvent(`➖ ${s?.name || 'HS'} rời lớp`);
          break;
        }
        case 'student-location': {
          const s = S.get(m.id);
          if (s) {
            s.page = m.page;
            commitStudents();
          }
          break;
        }
        case 'student-progress': {
          const s = S.get(m.id);
          if (s) {
            s.score = m.score;
            s.correct = m.correct;
            s.total = m.total;
            commitStudents();
          }
          break;
        }
        case 'student-status': {
          const s = S.get(m.id);
          if (s) {
            s.status = m.status;
            commitStudents();
          }
          break;
        }
        case 'student-raise': {
          const s = S.get(m.id);
          if (s) {
            s.status = 'raised';
            commitStudents();
            logEvent(`✋ ${s.name} giơ tay xin trợ giúp!`);
          }
          try {
            new Audio(
              'data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=',
            ).play();
          } catch {
            /* ignore */
          }
          break;
        }
        case 'teacher-pinned':
          logEvent('📌 Đã ghim: ' + (m.task || '(bỏ ghim)'));
          break;
        case 'teacher-broadcast':
          logEvent('📣 Broadcast: ' + m.text);
          break;
        case 'teacher-quiz':
          logEvent('📝 Quiz: ' + (m.quizId || '(đóng)'));
          break;
      }
    },
    [commitStudents, logEvent],
  );

  const connect = useCallback(() => {
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const ws = new WebSocket(`${proto}//${location.host}/ws-orchestrate`);
    wsRef.current = ws;
    setConnState({ on: false, text: '⏳ Đang kết nối…' });

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'join',
          role: 'teacher',
          name: teacherNameRef.current,
          classCode: classCodeRef.current,
        }),
      );
      setConnState({ on: true, text: '🟢 ' + classCodeRef.current });
      setConnected(true);
      logEvent('Đã vào phiên ' + classCodeRef.current);
    };
    ws.onmessage = (ev) => {
      let m: any;
      try {
        m = JSON.parse(ev.data);
      } catch {
        return;
      }
      handle(m);
    };
    ws.onclose = () => {
      setConnState({ on: false, text: '⚫ Mất kết nối' });
      if (startedRef.current) {
        reconnectRef.current = setTimeout(connect, 2000);
      }
    };
    ws.onerror = () => {
      setConnState((s) => ({ ...s, on: false }));
    };
  }, [handle, logEvent]);

  // Cleanup khi unmount: đóng WS, huỷ timer.
  useEffect(() => {
    return () => {
      startedRef.current = false;
      if (reconnectRef.current) clearTimeout(reconnectRef.current);
      if (tickRef.current) clearInterval(tickRef.current);
      try {
        wsRef.current?.close();
      } catch {
        /* ignore */
      }
    };
  }, []);

  // Re-render định kỳ để cập nhật "thời gian trước" (như setInterval renderGrid).
  useEffect(() => {
    if (!connected) return;
    tickRef.current = setInterval(() => {
      setStudents(new Map(studentsRef.current));
    }, 5000);
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [connected]);

  const onGo = useCallback(() => {
    const tn = teacherName.trim() || 'GV';
    const cc = classCode.trim().toUpperCase();
    if (!cc) {
      alert('Vui lòng nhập mã lớp');
      return;
    }
    teacherNameRef.current = tn;
    classCodeRef.current = cc;
    localStorage.setItem(
      'teacher.live.session',
      JSON.stringify({ teacherName: tn, classCode: cc }),
    );
    startedRef.current = true;
    connect();
  }, [teacherName, classCode, connect]);

  const wsSend = useCallback((msg: unknown) => {
    const ws = wsRef.current;
    if (ws && ws.readyState === 1) ws.send(JSON.stringify(msg));
  }, []);

  const onBroadcast = useCallback(() => {
    const t = bcText.trim();
    if (!t) return;
    wsSend({ type: 'broadcast', text: t });
    setBcText('');
  }, [bcText, wsSend]);

  const onGather = useCallback(
    (target?: string) => {
      const t = (target ?? gatherTarget).trim();
      if (!t) return;
      if (target !== undefined) setGatherTarget(target);
      wsSend({ type: 'gather', target: t });
    },
    [gatherTarget, wsSend],
  );

  const onPinSet = useCallback(() => {
    const t = pinText.trim();
    if (!t) return;
    wsSend({ type: 'pin-task', text: t });
  }, [pinText, wsSend]);

  const onPinClear = useCallback(() => {
    wsSend({ type: 'pin-task', text: '' });
  }, [wsSend]);

  const onQuizOpen = useCallback(() => {
    const id = quizId.trim();
    if (!id) return;
    wsSend({ type: 'open-quiz', quizId: id });
  }, [quizId, wsSend]);

  const onQuizClose = useCallback(() => {
    wsSend({ type: 'close-quiz' });
  }, [wsSend]);

  const onKick = useCallback(
    (id: number) => {
      if (confirm('Mời HS này ra khỏi lớp?')) wsSend({ type: 'kick', studentId: id });
    },
    [wsSend],
  );

  const studentList = [...students.values()];

  return (
    <>
      <style>{teacherLiveCss}</style>
      <div className="tl-wrap">
        <div className="tl-head">
          <Link href="/teacher" className="tl-back">
            ← Lớp học
          </Link>
          <h1>🎛 Bảng điều khiển GV real-time</h1>
          <div className={`tl-conn ${connState.on ? 'on' : 'off'}`}>{connState.text}</div>
        </div>

        {!connected && (
          <div className="tl-setup">
            <h2>📡 Bắt đầu phiên live</h2>
            <label>Tên giáo viên</label>
            <input
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="VD: Cô Mai"
            />
            <label>Mã lớp (6 ký tự)</label>
            <input
              value={classCode}
              onChange={(e) => setClassCode(e.target.value)}
              placeholder="VD: A3X9KL"
              maxLength={12}
              style={{ textTransform: 'uppercase' }}
            />
            <button onClick={onGo}>Vào phiên live</button>
            <div className="tl-hint">
              Học sinh tham gia bằng cách mở bất kỳ trang Tizia nào với{' '}
              <code>?room=&lt;mã lớp&gt;</code>. Bạn sẽ thấy live tên, vị trí trang, tiến độ
              quiz, tay giơ.
            </div>
          </div>
        )}

        {connected && (
          <div className="tl-dashboard show">
            <div className="tl-students-panel">
              <h3>
                👥 Học sinh đang online
                <span className="tl-count">{students.size}</span>
              </h3>
              <div className="tl-student-grid">
                {studentList.map((s) => {
                  const pct = s.total ? Math.round(((s.correct || 0) / s.total) * 100) : 0;
                  return (
                    <div
                      key={s.id}
                      className={`tl-stu ${s.status === 'raised' ? 'raised' : ''}`}
                      style={{ borderLeft: `3px solid ${s.color}` }}
                    >
                      {s.status === 'raised' && <div className="tl-raise-badge">✋</div>}
                      <button
                        className="tl-kick"
                        title="Mời ra"
                        onClick={(e) => {
                          e.stopPropagation();
                          onKick(s.id);
                        }}
                      >
                        ✕
                      </button>
                      <div className="tl-name">{s.name}</div>
                      <div className="tl-meta">
                        {formatTimeAgo(s.lastSeen)} · {s.status || 'idle'}
                      </div>
                      <div className="tl-page">📄 {s.page || '—'}</div>
                      {(s.total || 0) > 0 && (
                        <>
                          <div className="tl-progress-bar">
                            <div style={{ width: `${pct}%` }} />
                          </div>
                          <div className="tl-meta" style={{ marginTop: 3 }}>
                            {s.correct}/{s.total} · {s.score}đ
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="tl-controls">
              <div className="tl-block">
                <h3>📣 Gửi tin nhắn cả lớp</h3>
                <textarea
                  value={bcText}
                  onChange={(e) => setBcText(e.target.value)}
                  placeholder="VD: Các em mở quiz Q3 nhé"
                />
                <button className="tl-btn-primary" onClick={onBroadcast}>
                  Gửi toast cả lớp
                </button>
              </div>

              <div className="tl-block">
                <h3>🔔 Gọi cả lớp về 1 trang</h3>
                <input
                  value={gatherTarget}
                  onChange={(e) => setGatherTarget(e.target.value)}
                  placeholder="VD: space.html"
                />
                <button className="tl-btn-info" onClick={() => onGather()}>
                  Gọi cả lớp
                </button>
                <div className="tl-preset-chips" style={{ marginTop: 8 }}>
                  {PRESETS.map((p) => (
                    <button key={p.target} onClick={() => onGather(p.target)}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="tl-block">
                <h3>📌 Ghim task hiện tại</h3>
                <input
                  value={pinText}
                  onChange={(e) => setPinText(e.target.value)}
                  placeholder="VD: Đang làm bài 3 — chương Sắc ký"
                />
                <div className="tl-grid2">
                  <button className="tl-btn-primary" onClick={onPinSet}>
                    Ghim
                  </button>
                  <button className="tl-btn-danger" onClick={onPinClear}>
                    Bỏ ghim
                  </button>
                </div>
              </div>

              <div className="tl-block">
                <h3>📝 Mở quiz</h3>
                <input
                  value={quizId}
                  onChange={(e) => setQuizId(e.target.value)}
                  placeholder="quiz-id (VD: sql-basic)"
                />
                <div className="tl-grid2">
                  <button className="tl-btn-info" onClick={onQuizOpen}>
                    Mở
                  </button>
                  <button className="tl-btn-danger" onClick={onQuizClose}>
                    Đóng
                  </button>
                </div>
              </div>

              <div className="tl-block">
                <h3>📜 Nhật ký phiên</h3>
                <div className="tl-events">
                  {logs.map((l) => (
                    <div key={l.id} className="tl-ev">
                      <span className="tl-t">{l.at}</span> {l.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// Thương hiệu riêng của trang gốc (nền gradient tím/vàng, accent #fbbf24) —
// giữ y hệt vanilla nên dùng scoped CSS thay vì token theme. Xem note ở risks.
const teacherLiveCss = `
  .tl-wrap { --tl-accent:#fbbf24; --tl-card:rgba(255,255,255,0.06); --tl-border:rgba(255,255,255,0.12);
    max-width:1400px; margin:0 auto; color:#fff;
    font-family:'Inter',system-ui,sans-serif; }
  .tl-head { display:flex; gap:14px; align-items:center; margin-bottom:22px; flex-wrap:wrap; }
  .tl-back { padding:8px 14px; background:var(--tl-card); border:1px solid var(--tl-border);
    border-radius:999px; color:#fff; text-decoration:none; font-size:13px; }
  .tl-head h1 { margin:0; font-size:26px;
    background:linear-gradient(135deg,#fff 0%,#fbbf24 60%,#f97316 100%);
    -webkit-background-clip:text; background-clip:text; color:transparent; }
  .tl-conn { margin-left:auto; padding:6px 14px; border-radius:999px; font-size:12px; font-weight:600; }
  .tl-conn.on { background:rgba(16,185,129,0.2); color:#6ee7b7; border:1px solid rgba(16,185,129,0.4); }
  .tl-conn.off { background:rgba(239,68,68,0.2); color:#fca5a5; border:1px solid rgba(239,68,68,0.4); }

  .tl-setup { background:var(--tl-card); border:1px solid var(--tl-border); border-radius:14px;
    padding:24px; max-width:480px; margin:40px auto; }
  .tl-setup h2 { margin:0 0 14px; font-size:20px; }
  .tl-setup label { display:block; font-size:13px; opacity:0.85; margin:10px 0 4px; }
  .tl-setup input { width:100%; padding:10px 14px; border-radius:10px;
    border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.06);
    color:#fff; font-family:inherit; font-size:15px; }
  .tl-setup button { width:100%; margin-top:16px; padding:12px 18px; border-radius:10px;
    border:none; cursor:pointer; font-size:15px;
    background:linear-gradient(135deg,#fbbf24,#f97316); color:#3e2723; font-weight:700; }
  .tl-setup .tl-hint { font-size:12px; opacity:0.7; margin-top:12px; line-height:1.5; }

  .tl-dashboard { display:none; grid-template-columns:1fr 360px; gap:18px; }
  .tl-dashboard.show { display:grid; }
  @media (max-width:960px){ .tl-dashboard.show { grid-template-columns:1fr; } }

  .tl-students-panel { background:var(--tl-card); border:1px solid var(--tl-border); border-radius:14px;
    padding:18px; min-height:480px; }
  .tl-students-panel h3 { margin:0 0 16px; display:flex; align-items:center; gap:8px; font-size:16px; }
  .tl-count { margin-left:auto; padding:3px 10px; border-radius:999px;
    background:rgba(14,165,233,0.2); color:#7dd3fc; font-size:12px; font-weight:700; }
  .tl-student-grid { display:grid; gap:10px; grid-template-columns:repeat(auto-fill,minmax(180px,1fr)); }
  .tl-stu { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1);
    border-radius:10px; padding:12px; position:relative; cursor:pointer;
    transition:background 0.15s,border-color 0.15s,transform 0.1s; }
  .tl-stu:hover { background:rgba(255,255,255,0.08); transform:translateY(-2px); }
  .tl-stu.raised { border-color:#fbbf24;
    background:linear-gradient(135deg,rgba(251,191,36,0.2),rgba(255,255,255,0.04));
    animation:tl-pulse-raised 1.5s infinite; }
  @keyframes tl-pulse-raised {
    0%,100% { box-shadow:0 0 0 0 rgba(251,191,36,0); }
    50% { box-shadow:0 0 0 5px rgba(251,191,36,0.4); }
  }
  .tl-stu .tl-name { font-weight:700; font-size:13px; }
  .tl-stu .tl-meta { font-size:11px; opacity:0.7; margin-top:4px; }
  .tl-stu .tl-page { font-size:10px; padding:2px 8px; border-radius:999px;
    background:rgba(255,255,255,0.1); display:inline-block; margin-top:6px; }
  .tl-stu .tl-progress-bar { height:4px; background:rgba(255,255,255,0.1); border-radius:2px;
    margin-top:6px; overflow:hidden; }
  .tl-stu .tl-progress-bar > div { height:100%; background:linear-gradient(90deg,#10b981,#6ee7b7); }
  .tl-stu .tl-raise-badge { position:absolute; top:-8px; right:-8px;
    background:#fbbf24; color:#3e2723; width:26px; height:26px; border-radius:50%;
    display:flex; align-items:center; justify-content:center; font-size:16px;
    box-shadow:0 4px 10px rgba(251,191,36,0.5); }
  .tl-stu .tl-kick { position:absolute; top:8px; right:8px; background:none; border:none;
    color:rgba(255,255,255,0.4); cursor:pointer; font-size:14px; padding:2px 6px; }
  .tl-stu .tl-kick:hover { color:#f87171; }

  .tl-controls { background:var(--tl-card); border:1px solid var(--tl-border); border-radius:14px;
    padding:18px; display:flex; flex-direction:column; gap:14px; }
  .tl-controls h3 { margin:0; font-size:14px; opacity:0.9; }
  .tl-block { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08);
    border-radius:10px; padding:12px; }
  .tl-controls input, .tl-controls textarea { width:100%; padding:8px 12px; border-radius:8px;
    border:1px solid rgba(255,255,255,0.2); background:rgba(255,255,255,0.04);
    color:#fff; font-family:inherit; font-size:13px; margin-bottom:8px; }
  .tl-controls textarea { resize:vertical; min-height:50px; }
  .tl-controls button { width:100%; padding:9px 14px; border-radius:8px; border:none;
    cursor:pointer; font-size:13px; font-weight:600; }
  .tl-btn-primary { background:linear-gradient(135deg,#fbbf24,#f97316); color:#3e2723; }
  .tl-btn-info { background:linear-gradient(135deg,#0ea5e9,#2563eb); color:#fff; }
  .tl-btn-danger { background:linear-gradient(135deg,#ef4444,#b91c1c); color:#fff; }
  .tl-grid2 { display:grid; grid-template-columns:1fr 1fr; gap:6px; }
  .tl-preset-chips { display:flex; gap:6px; flex-wrap:wrap; }
  .tl-preset-chips button { flex:1 1 auto; min-width:80px; font-size:11px; padding:6px 8px;
    background:rgba(14,165,233,0.15); color:#7dd3fc; border:1px solid rgba(14,165,233,0.3); }
  .tl-events { background:rgba(255,255,255,0.03); border-radius:10px; padding:10px;
    max-height:200px; overflow-y:auto; font-size:11px; line-height:1.5; }
  .tl-ev { padding:3px 0; opacity:0.8; }
  .tl-ev .tl-t { opacity:0.5; font-size:10px; }
`;

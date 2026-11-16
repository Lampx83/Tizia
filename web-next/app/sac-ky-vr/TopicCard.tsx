'use client';

import { useState } from 'react';
import type { Mode, Topic } from './topic-data';

// Port của renderTopicCard() trong public/js/topic-modes.js: 1 card gộp mọi phiên bản,
// chip đổi chế độ, thân card hiển thị tech + mô tả + specs + nút Play theo mode đang chọn.

function specChip(s: string, i: number) {
  let cls = '';
  let txt = s;
  if (s.startsWith('ok:')) { cls = 'ok'; txt = s.slice(3); }
  else if (s.startsWith('bad:')) { cls = 'bad'; txt = s.slice(4); }
  return (
    <span key={i} className={`tm-spec ${cls}`}>{txt}</span>
  );
}

function statusBadge(status?: Mode['status']) {
  if (status === 'soon') return <span className="tm-badge tm-badge-soon">Sắp có</span>;
  if (status === 'external') return <span className="tm-badge tm-badge-ext">Repo ngoài</span>;
  return null;
}

export default function TopicCard({ topic }: { topic: Topic }) {
  const initial = topic.modes.find((m) => m.id === topic.defaultMode)?.id ?? topic.modes[0].id;
  const [current, setCurrent] = useState(initial);

  const mode = topic.modes.find((m) => m.id === current) ?? topic.modes[0];
  const isDisabled = mode.status === 'soon';
  const isExternal = mode.status === 'external';
  const cta = mode.cta || (isExternal ? '🔗 Mở repo' : '▶️ Vào chế độ này');

  return (
    <div className="tm-card" style={{ ['--tm-accent' as string]: topic.accentColor }}>
      <div className="tm-head">
        <div className="tm-icon">{topic.icon}</div>
        <div className="tm-titles">
          <h3 className="tm-title">{topic.title}</h3>
          <p className="tm-sub">{topic.subtitle}</p>
        </div>
      </div>

      <div className="tm-chips-label">Chọn phiên bản</div>
      <div className="tm-chips" role="radiogroup" aria-label="Phiên bản">
        {topic.modes.map((m) => {
          const active = m.id === current;
          return (
            <button
              key={m.id}
              type="button"
              className={`tm-chip ${active ? 'active' : ''} ${m.status === 'soon' ? 'soon' : ''}`}
              role="radio"
              aria-checked={active}
              title={m.tech}
              onClick={() => setCurrent(m.id)}
            >
              <span className="tm-chip-icon">{m.icon}</span>
              <span className="tm-chip-label">{m.label}</span>
              {m.status === 'soon' && <span className="tm-chip-soon">Sắp có</span>}
              {m.status === 'external' && <span className="tm-chip-soon">Repo</span>}
            </button>
          );
        })}
      </div>

      <div className="tm-body">
        <div className="tm-tech">{mode.tech} {statusBadge(mode.status)}</div>
        <p className="tm-desc">{mode.desc}</p>
        <div className="tm-specs">{mode.specs.map(specChip)}</div>
        <a
          className={`tm-btn ${isDisabled ? 'disabled' : ''}`}
          href={isDisabled ? '#' : mode.url}
          {...(isExternal ? { target: '_blank', rel: 'noopener' } : {})}
          {...(isDisabled ? { 'aria-disabled': true } : {})}
        >
          {isDisabled ? '📦 Đang phát triển' : cta}
        </a>
      </div>
    </div>
  );
}

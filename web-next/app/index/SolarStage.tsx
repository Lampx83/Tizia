'use client';

import { useEffect, useRef } from 'react';
import styles from './index.module.css';

// Hệ mặt trời hero: mặt trời (không icon) + 6 quỹ đạo elip nghiêng. Kiến thức/môn
// học bay quanh; 1 node là Trái đất–Mặt trăng, 1 là Sao Hỏa. Icon các quỹ đạo tự
// đảo ngẫu nhiên (interval), pause khi tab ẩn — mirror public/.
const POOL = ['📚','📐','💊','💻','🧪','🎨','⚖️','🩺','🔬','🧬','🌱','🎼','🏛️','📜','🧮','🚀','🤖','🧠','🎭','⚗️','📊','🔭','🌐','✏️','🎯','🧩','🗺️','⚙️','🔢','🌟','🎲','📖','🖋️','🎤','🏥','💡','🪄','🧭'];

type Orbit = { w: number; k: number; tilt: number; dur: number; delay: number; ringA: number; rev?: boolean; icon: string };
const ORBITS: Orbit[] = [
  { w: 210, k: 0.80, tilt: 0,   dur: 14, delay: 0,   ringA: 0.32, icon: '💊' },
  { w: 300, k: 0.55, tilt: 20,  dur: 18, delay: -5,  ringA: 0.20, rev: true, icon: '💻' },
  { w: 362, k: 0.64, tilt: -24, dur: 23, delay: -11, ringA: 0.14, icon: '⚖️' },
  { w: 300, k: 0.86, tilt: 10,  dur: 30, delay: -17, ringA: 0.26, rev: true, icon: '📐' },
];

function orbitStyle(o: Orbit): React.CSSProperties {
  return {
    ['--w' as string]: `${o.w}px`,
    ['--k' as string]: o.k,
    ['--tilt' as string]: `${o.tilt}deg`,
    ['--dur' as string]: `${o.dur}s`,
    ['--delay' as string]: `${o.delay}s`,
    ['--ring-a' as string]: o.ringA,
  };
}

export default function SolarStage() {
  const stageRef = useRef<HTMLDivElement>(null);

  // Đảo icon quỹ đạo ngẫu nhiên, không lặp tức thời; pause khi tab ẩn.
  useEffect(() => {
    const nodes = stageRef.current
      ? Array.from(stageRef.current.querySelectorAll<HTMLElement>('[data-rot="1"]'))
      : [];
    if (!nodes.length) return;
    let i = 0;
    const id = setInterval(() => {
      if (document.hidden) return;
      const el = nodes[i++ % nodes.length];
      if (!el) return;
      let next = '';
      let tries = 0;
      do { next = POOL[Math.floor(Math.random() * POOL.length)]; tries++; }
      while (next === (el.textContent || '').trim() && tries < 6);
      el.classList.add(styles.swap);
      setTimeout(() => { el.textContent = next; el.classList.remove(styles.swap); }, 720);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={stageRef} className={styles.stage} aria-hidden="true">
      <div className={styles.solar}>
        <div className={styles.core} />
        {ORBITS.map((o, idx) => (
          <div key={idx} className={styles.osys} data-dir={o.rev ? 'rev' : undefined} style={orbitStyle(o)}>
            <div className={styles.ring} />
            <div className={styles.rot}>
              <span className={`${styles.planet} ${styles.top}`}>
                <span className={styles.pf} data-rot="1">{o.icon}</span>
              </span>
            </div>
          </div>
        ))}
        {/* Trái đất + Mặt trăng */}
        <div className={styles.osys} style={orbitStyle({ w: 412, k: 0.58, tilt: -14, dur: 37, delay: -9, ringA: 0.18, icon: '' })}>
          <div className={styles.ring} />
          <div className={styles.rot}>
            <span className={`${styles.planet} ${styles.binode} ${styles.top}`}>
              <span className={styles.bfix}>
                <span className={styles.bring} />
                <span className={styles.earth}>🌍</span>
                <span className={styles.bspin}><span className={styles.moon}>🌕</span></span>
              </span>
            </span>
          </div>
        </div>
        {/* Sao Hỏa: quỹ đạo ngoài cùng */}
        <div className={styles.osys} data-dir="rev" style={orbitStyle({ w: 462, k: 0.62, tilt: 16, dur: 46, delay: -15, ringA: 0.12, icon: '' })}>
          <div className={styles.ring} />
          <div className={styles.rot}>
            <span className={`${styles.planet} ${styles.mars} ${styles.top}`}><span className={styles.pf} /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

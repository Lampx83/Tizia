// ── Legacy engine cho trang "Phân Loại Rác — HĐTN Lớp 2" ──────────────────────
// Copy NGUYÊN VĂN khối <script> (classic, KHÔNG module) từ
// public/lop2-phan-loai-rac.html. Không dịch sang React, không đổi hành vi.
//
// GHI CHÚ CONTENT: mảng ITEMS (15 vật rác × 3 nhóm recycle/organic/other) là
// CONTENT nghiệp vụ đang HARDCODE trong script — gốc cũng hardcode, chưa có
// /api. Xem risks: nên đưa vào DB nếu muốn quản nội dung nóng.
const ITEMS=[
  // recycle (tái chế)
  {e:'🥤',cat:'recycle'},{e:'🍾',cat:'recycle'},{e:'📰',cat:'recycle'},{e:'🥫',cat:'recycle'},{e:'📦',cat:'recycle'},
  // organic (hữu cơ)
  {e:'🍌',cat:'organic'},{e:'🍎',cat:'organic'},{e:'🍂',cat:'organic'},{e:'🥬',cat:'organic'},{e:'🍖',cat:'organic'},
  // other (vô cơ / khó tái chế)
  {e:'🔋',cat:'other'},{e:'💊',cat:'other'},{e:'🧴',cat:'other'},{e:'🪥',cat:'other'},{e:'🧦',cat:'other'},
];
const $=s=>document.querySelector(s);
const stage=$('#stage'), center=$('#center'), binsEl=$('#bins');
const bins=Array.from(binsEl.children);
let drops=[], right=0, wrong=0, timeLeft=60, timer=null, spawnT=null, raf=null, lastTs=0, running=false, drag=null;

function spawn(){
  if(!running) return;
  const it = ITEMS[Math.floor(Math.random()*ITEMS.length)];
  const el=document.createElement('div');
  el.className='item'; el.textContent=it.e;
  el.dataset.cat=it.cat;
  const sw=stage.clientWidth;
  const x = 10 + Math.random()*(sw-72);
  el.style.left=x+'px'; el.style.top='-60px';
  stage.appendChild(el);
  // Lớp 2 — giảm tốc rơi gần 1/2 (px/ms): 0.025–0.045 → ~10s chạm thùng.
  drops.push({el,x,y:-60,vy: 0.025 + Math.random()*0.020, cat: it.cat});
  attachDrag(el);
  // Khoảng spawn giãn ra (2s → tối thiểu 1.2s) để bé có thời gian xử lý từng vật.
  spawnT=setTimeout(spawn, Math.max(1200, 2000 - right*25));
}

function tick(ts){
  if(!running) return;
  const dt = lastTs?(ts-lastTs):16; lastTs=ts;
  const binTop = stage.clientHeight - 120 - 8;
  for(let i=drops.length-1;i>=0;i--){
    const d=drops[i];
    if(drag && drag.el===d.el) continue; // đang kéo, đừng cho rơi
    d.y += d.vy*dt;
    d.el.style.top=d.y+'px';
    if(d.y > binTop - 52){
      // rơi xuống chạm thùng — tính sai vì chưa được kéo vào đúng
      drop(d, null);
    }
  }
  raf=requestAnimationFrame(tick);
}

function drop(d, binEl){
  if(!d.el.parentNode) return;
  const cat = binEl?.dataset?.cat || null;
  if(cat===d.cat){
    right++; $('#right').textContent=right;
    flash(binEl,'#bbf7d0');
  }else{
    wrong++; $('#wrong').textContent=wrong;
    if(binEl) flash(binEl,'#fecaca');
  }
  d.el.remove();
  drops = drops.filter(x=>x!==d);
}

function flash(binEl, color){
  if(!binEl) return;
  const old = binEl.style.background;
  binEl.style.background = color;
  setTimeout(()=>{ binEl.style.background = ''; }, 220);
}

function attachDrag(el){
  let sx=0,sy=0,ox=0,oy=0;
  const start = (cx,cy)=>{
    const d = drops.find(x=>x.el===el);
    if(!d) return;
    drag={el,d};
    el.classList.add('drag');
    const r=el.getBoundingClientRect();
    const sr=stage.getBoundingClientRect();
    ox = r.left - sr.left;
    oy = r.top - sr.top;
    sx=cx; sy=cy;
  };
  const move = (cx,cy)=>{
    if(!drag||drag.el!==el) return;
    const nx = ox + (cx-sx);
    const ny = oy + (cy-sy);
    el.style.left=nx+'px';
    el.style.top=ny+'px';
    drag.d.x = nx; drag.d.y = ny;
    // hover bin
    bins.forEach(b=>b.classList.remove('hover'));
    const hb = binAt(cx,cy);
    if(hb) hb.classList.add('hover');
  };
  const end = (cx,cy)=>{
    if(!drag||drag.el!==el) return;
    bins.forEach(b=>b.classList.remove('hover'));
    el.classList.remove('drag');
    const hb = binAt(cx,cy);
    drop(drag.d, hb);
    drag=null;
  };
  el.addEventListener('mousedown',e=>{e.preventDefault();start(e.clientX,e.clientY);
    const mm=ev=>move(ev.clientX,ev.clientY);
    const mu=ev=>{end(ev.clientX,ev.clientY);document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu)};
    document.addEventListener('mousemove',mm); document.addEventListener('mouseup',mu);
  });
  el.addEventListener('touchstart',e=>{e.preventDefault();const t=e.touches[0];start(t.clientX,t.clientY);
    const mm=ev=>{const tt=ev.touches[0];move(tt.clientX,tt.clientY)};
    const mu=ev=>{const tt=ev.changedTouches[0];end(tt.clientX,tt.clientY);document.removeEventListener('touchmove',mm);document.removeEventListener('touchend',mu)};
    document.addEventListener('touchmove',mm,{passive:false}); document.addEventListener('touchend',mu);
  },{passive:false});
}

function binAt(cx,cy){
  for(const b of bins){
    const r=b.getBoundingClientRect();
    if(cx>=r.left && cx<=r.right && cy>=r.top && cy<=r.bottom) return b;
  }
  return null;
}

function start(){
  right=0;wrong=0;timeLeft=60;drops=[];lastTs=0;running=true;
  $('#right').textContent=0; $('#wrong').textContent=0; $('#time').textContent='60s';
  Array.from(stage.querySelectorAll('.item')).forEach(n=>n.remove());
  center.classList.add('hide');
  spawn();
  raf=requestAnimationFrame(tick);
  timer=setInterval(()=>{
    timeLeft--; $('#time').textContent=timeLeft+'s';
    if(timeLeft<=0) end();
  },1000);
}

function end(){
  running=false; clearInterval(timer); clearTimeout(spawnT); cancelAnimationFrame(raf);
  drops.forEach(d=>d.el.remove()); drops=[];
  const score=Math.max(0, right*15 - wrong*6);
  const key='lop2-phan-loai-rac.best';
  const prev=Number(localStorage.getItem(key)||0);
  const best=Math.max(prev,score);
  if(score>prev) localStorage.setItem(key,score);
  $('#ov-right').textContent=right; $('#ov-wrong').textContent=wrong;
  $('#ov-score').textContent=score; $('#ov-best').textContent=best;
  $('#ov-title').textContent = right>=18?'🏆 Vệ sĩ môi trường!':right>=10?'🌟 Tốt lắm!':'👍 Cố lên!';
  $('#ov-msg').textContent = wrong<=2?'Phân loại siêu chính xác!':'Nhớ đọc gợi ý trên thùng nhé.';
  $('#modal-over').classList.remove('hide');
  try{
    const xp=Math.floor(score/12);
    if(xp>0 && window.fetch){
      fetch('/api/wallet',{credentials:'include'}).then(r=>r.ok?r.json():null).then(w=>{
        if(!w) return;
        fetch('/api/wallet',{method:'PUT',credentials:'include',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({...w, xp:(w.xp||0)+xp})});
      });
    }
  }catch{}
}

$('#btn-start').addEventListener('click',start);
$('#btn-restart').addEventListener('click',()=>{
  $('#modal-over').classList.add('hide');
  center.classList.remove('hide');
  start();
});

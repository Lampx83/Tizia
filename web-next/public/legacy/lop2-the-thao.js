const $ = s => document.querySelector(s);
const field=$('#field'), center=$('#center');
const ICONS=['⚽','🏐','🏸','🥎','🏀'];
let hit=0,miss=0,timeLeft=30,timer=null,spawnT=null,curTarget=null,running=false;

field.addEventListener('click',e=>{
  if(!running) return;
  // Click missed (not on target — target stops propagation)
  miss++; $('#miss').textContent=miss;
});

function spawn(){
  if(!running) return;
  if(curTarget){ curTarget.remove(); curTarget=null }
  const fr=field.getBoundingClientRect();
  const size=64, pad=10;
  const x=Math.random()*(fr.width-size-pad*2)+pad;
  const y=Math.random()*(fr.height-size-pad*2)+pad;
  const el=document.createElement('div');
  el.className='target';
  el.style.left=x+'px'; el.style.top=y+'px';
  el.textContent=ICONS[Math.floor(Math.random()*ICONS.length)];
  el.addEventListener('click',ev=>{
    ev.stopPropagation();
    hit++; $('#hit').textContent=hit;
    el.remove(); curTarget=null;
    clearTimeout(spawnT);
    spawnT=setTimeout(spawn, 200+Math.random()*300);
  });
  field.appendChild(el);
  curTarget=el;
  // Tự biến mất sau 1.1–1.6s (tăng độ khó dần)
  const life = Math.max(700, 1600 - hit*30);
  setTimeout(()=>{ if(el.parentNode){ el.remove(); curTarget=null; spawn(); } }, life);
}

function start(){
  hit=0; miss=0; timeLeft=30; running=true;
  $('#hit').textContent=0; $('#miss').textContent=0; $('#time').textContent='30s';
  center.classList.add('hide');
  spawn();
  timer=setInterval(()=>{
    timeLeft--;
    $('#time').textContent=timeLeft+'s';
    if(timeLeft<=0){ end(); }
  },1000);
}

function end(){
  running=false;
  clearInterval(timer); clearTimeout(spawnT);
  if(curTarget){ curTarget.remove(); curTarget=null }
  const score = Math.max(0, hit*10 - miss*4);
  const key='lop2-the-thao.best';
  const prev=Number(localStorage.getItem(key)||0);
  const best=Math.max(prev,score);
  if(score>prev) localStorage.setItem(key,score);

  $('#ov-hit').textContent=hit; $('#ov-miss').textContent=miss;
  $('#ov-score').textContent=score; $('#ov-best').textContent=best;
  $('#ov-title').textContent = hit>=25?'🏆 Tốc độ ánh chớp!':hit>=15?'🌟 Phản xạ tốt!':'👍 Hết giờ!';
  $('#ov-msg').textContent = hit>=25?'Bạn xứng đáng vào đội tuyển!':'Tập đều mỗi ngày sẽ nhanh hơn nhé.';
  $('#modal-over').classList.remove('hide');

  try{
    const xp=Math.floor(score/10);
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

// Queue logic: call next, complete, no-show, slots, walk-ins, statistics, rendering
const cur=()=>D.P.find(p=>p.status==="serving");
const avg=()=>Math.round(D.durs.reduce((a,b)=>a+b,0)/D.durs.length);
const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
function callNext(){
 if(cur())return;const n=D.P.find(p=>p.status==="waiting");if(!n)return;
 n.status="serving";D.start=Date.now();clearInterval(timer);timer=setInterval(tick,1000);render();
}
function finish(st){
 const c=cur();if(!c)return;c.status=st;
 if(st==="done")D.durs.push(Math.max(1,Math.round((Date.now()-D.start)/60000)));
 clearInterval(timer);D.start=null;render();
}
function tick(){const t=$("tm");if(t&&D&&D.start)t.textContent=fmt(Math.floor((Date.now()-D.start)/1000))}
function setStatus(tok,st){const p=D.P.find(x=>x.tok===tok);if(p&&p.status!=="serving"&&p.status!=="done"){p.status=st;render()}}
function syncAvail(){$("avail").setAttribute("aria-checked",D.avail);$("availT").textContent=D.avail?"Accepting new bookings":"On break";$("banner").hidden=D.avail}
$("avail").onclick=()=>{D.avail=!D.avail;syncAvail()};

function render(){
 if(!D)return;
 const P=D.P,c=cur(),w=P.filter(p=>p.status==="waiting"),d=P.filter(p=>p.status==="done");
 $("now").innerHTML=c?
 `<div><div class="lab">Now in consultation</div><div class="tk">#${c.tok}</div><div class="nm">${esc(c.name)}</div><div class="rs">${esc(c.why)}</div></div>
  <div><div class="tm" id="tm">00:00</div><div class="btns"><button class="btn" id="b1">Complete visit</button><button class="btn o" id="b2">No-show</button></div></div>`:
 `<div><div class="lab">Consultation room</div><div class="tk">Free</div><div class="rs">${w.length?w.length+" waiting. Next is #"+w[0].tok+" "+esc(w[0].name):"Queue is clear for now."}</div></div>
  <div><div class="btns" style="margin:0"><button class="btn" id="b0" ${w.length?"":"disabled"}>Call next patient</button></div></div>`;
 if($("b0"))$("b0").onclick=callNext;
 if($("b1")){$("b1").onclick=()=>finish("done");$("b2").onclick=()=>finish("skipped")}
 tick();
 $("stats").innerHTML=[[w.length,"Waiting"],[d.length,"Completed"],[avg()+" min","Avg consult"],[w.length*avg()+" min","Wait for last"]].map(s=>`<div class="st"><b>${s[0]}</b><span>${s[1]}</span></div>`).join("");
 const ord={serving:0,waiting:1,skipped:2,done:3};
 const L=[...P].sort((a,b)=>ord[a.status]-ord[b.status]||a.tok-b.tok);
 let pos=0;
 $("queue").innerHTML=L.length?L.map(p=>{
  let est="";if(p.status==="waiting"){pos++;est=`<small>Est. wait about ${(pos-1)*avg()+(c?avg():0)} min</small>`}
  const act=p.status==="waiting"?`<button class="btn sm o" data-s="skipped" data-t="${p.tok}">No-show</button>`:p.status==="skipped"?`<button class="btn sm o" data-s="waiting" data-t="${p.tok}">Undo</button>`:"";
  return `<div class="row"><div class="tok">#${p.tok}</div><div>${esc(p.name)}<small>${esc(p.why)} · ${esc(p.time)}</small>${est}</div><span class="chip ${p.status}">${{waiting:"Waiting",serving:"In room",done:"Done",skipped:"No-show"}[p.status]}</span><div class="act">${act}</div></div>`}).join(""):'<div class="empty">No patients yet. Bookings will show up here.</div>';
 document.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>setStatus(+b.dataset.t,b.dataset.s));
 const bk=new Set(P.map(p=>p.time));
 $("slots").innerHTML=D.SL.map(t=>{const b=bk.has(t),x=D.blocked.has(t);return `<button class="slot ${b?"booked":""} ${x?"blocked":""}" data-sl="${t}" ${b?"disabled":""} aria-pressed="${x}" title="${b?"Booked":x?"Blocked. Tap to open":"Open. Tap to block"}">${t}</button>`}).join("");
 document.querySelectorAll("[data-sl]").forEach(b=>b.onclick=()=>{const t=b.dataset.sl;D.blocked.has(t)?D.blocked.delete(t):D.blocked.add(t);render()});
}
$("wb").onclick=addWalk;$("wn").onkeydown=e=>{if(e.key==="Enter")addWalk()};
function addWalk(){
 const v=$("wn").value.trim();
 if(v.length<2){$("wh").textContent="Enter the patient's name.";return}
 D.P.push(mk(D.nextTok++,v,"Walk-in","Walk-in patient","waiting"));
 $("wn").value="";$("wh").textContent="Added as #"+(D.nextTok-1)+".";render();
}

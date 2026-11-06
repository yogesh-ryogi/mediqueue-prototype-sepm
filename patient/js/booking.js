// Doctor list, filters, booking dialog, token and My appointments
/* ---------- booking app ---------- */

const days=[0,1,2].map(i=>{const d=new Date();d.setDate(d.getDate()+i);return{l:i?d.toLocaleDateString("en-IN",{weekday:"short",day:"numeric",month:"short"}):"Today",k:d.toDateString()}});
const booked={};let appts=[],tok=100;
const areas=[...new Set(DOCS.map(d=>d.a))].sort(),specs=[...new Set(DOCS.map(d=>d.s))].sort();
$("area").innerHTML='<option value="">All localities</option>'+areas.map(a=>`<option>${a}</option>`).join("");
{const sv=store.get("mq_area");if(sv&&areas.includes(sv))$("area").value=sv}
$("spec").innerHTML='<option value="">All specialties</option>'+specs.map(a=>`<option>${a}</option>`).join("");
["area","spec","kind"].forEach(i=>$(i).onchange=()=>{if(i==="area")store.set("mq_area",$("area").value);render()});$("q").oninput=render;
const ini=n=>n.replace("Dr. ","").split(" ").map(w=>w[0]).join("");
function render(){
const a=$("area").value,s=$("spec").value,kd=$("kind").value,q=$("q").value.toLowerCase().trim();
const r=DOCS.map((d,i)=>({...d,i})).filter(d=>(!a||d.a===a)&&(!s||d.s===s)&&(!kd||(d.k||"Hospital")===kd)&&(!q||(d.n+d.h).toLowerCase().includes(q)));
$("count").textContent=r.length+(r.length===1?" doctor":" doctors")+(a?" in "+a:" across all areas");
$("list").innerHTML=r.length?r.map(d=>{const lvl=d.w<=4?"":d.w<=8?"mid":"hi";return`<article class="doc"><div class="av" aria-hidden="true">${ini(d.n)}</div><div><h3>${esc(d.n)}</h3><div class="meta">${d.s} · ${esc(d.h)}, ${d.a} <span class="kind">${d.k||"Hospital"}</span></div><div class="q"><span class="dot ${lvl}"></span>${d.w} waiting now · about ${d.w*d.x} min</div></div><div class="side"><div class="fee">₹${d.f}</div><button class="btn" data-i="${d.i}">Book appointment</button></div></article>`}).join(""):'<div class="empty">No doctors match. Try another area or clear the specialty.</div>';
document.querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>openBook(+b.dataset.i));
}
function openBook(i){
const d=DOCS[i];let day=days[0].k,slot=null;
const dlg=$("book"),body=$("bookBody");
function draw(err){
body.innerHTML=`<h2>${esc(d.n)}</h2><div class="meta">${d.s} · ${esc(d.h)} · ₹${d.f}</div>
<label style="margin-top:16px">Day</label><div class="row">${days.map(x=>`<button class="chip" data-d="${x.k}" aria-pressed="${x.k===day}">${x.l}</button>`).join("")}</div>
<label>Time slot</label><div class="row">${d.t.map(t=>{const taken=booked[i+day+t];return`<button class="chip" data-t="${t}" aria-pressed="${t===slot}" ${taken?"disabled":""}>${t}</button>`}).join("")}</div>
<div class="fld"><label for="pn">Patient name</label><input id="pn" autocomplete="name" value="${esc(draw.pn)}"></div>
<div class="fld"><label for="ph">Mobile number</label><input id="ph" inputmode="numeric" maxlength="10" autocomplete="tel" value="${esc(draw.ph)}"></div>
<p class="err" role="alert">${err||""}</p>
<div class="actions"><button class="btn ghost" id="cx">Cancel</button><button class="btn" id="ok">Confirm booking</button></div>`;
body.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{keep();day=b.dataset.d;slot=null;draw()});
body.querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{keep();slot=b.dataset.t;draw()});
$("cx").onclick=()=>dlg.close();
$("ok").onclick=()=>{keep();
if(!slot)return draw("Choose a time slot.");
if(draw.pn.trim().length<2)return draw("Enter the patient's name.");
if(!/^[6-9]\d{9}$/.test(draw.ph))return draw("Enter a valid 10-digit mobile number.");
const key=i+day+slot;booked[key]=1;tok++;
const dl=days.find(x=>x.k===day).l;
const ap={tok,key,n:d.n,h:d.h,day:dl,slot,pn:draw.pn.trim()};appts.push(ap);
store.set("mq_appts_"+user.mob,JSON.stringify(appts));$("mineN").textContent=appts.length;
const ahead=day===days[0].k?d.w:Math.floor(Math.random()*4)+1;
body.innerHTML=`<h2>Booked</h2><div class="meta">${esc(d.n)} · ${esc(d.h)}</div>
<div class="ticket"><div class="tok">#${tok}</div><small>${dl}, ${slot} · ${ahead} ahead of you</small></div>
<p class="meta">Show this token at the ${esc(d.h)} reception. We will text ${esc(draw.ph)} when your turn is near.</p>
<div class="actions"><button class="btn" id="done">Done</button></div>`;
$("done").onclick=()=>dlg.close();};
}
function keep(){const a=$("pn"),b=$("ph");if(a){draw.pn=a.value;draw.ph=b.value}}
draw.pn=user.name;draw.ph=user.mob;draw();dlg.showModal();
}
$("mineBtn").onclick=()=>{$("mineList").innerHTML=appts.length?appts.map(a=>`<div class="appt"><div><strong>${esc(a.n)}</strong><br><span class="meta">${esc(a.h)} · ${a.day}, ${a.slot} · ${esc(a.pn)}</span></div><strong>#${a.tok}</strong></div>`).join(""):'<div class="empty" style="margin:14px 0">No appointments yet. Book a doctor to see it here.</div>';$("mineDlg").showModal()};
$("mineClose").onclick=()=>$("mineDlg").close();

// Doctor login (demo accounts), sign in and sign out
$("accs").innerHTML=Object.entries(DOCS).map(([id,d])=>`<button class="acc" data-id="${id}"><div class="av" aria-hidden="true">${d.ini}</div><div><b>${esc(d.name)}</b><small>${esc(d.spec)} · ${esc(d.hosp)}</small><small>ID: ${id} · Password: ${esc(d.pw)}</small></div></button>`).join("");
document.querySelectorAll(".acc").forEach(b=>b.onclick=()=>{$("uid").value=b.dataset.id;$("pw").value=DOCS[b.dataset.id].pw;$("err").textContent="";$("go").focus()});
function signIn(){
 const id=$("uid").value.trim().toLowerCase(),d=DOCS[id];
 if(!id||!$("pw").value){$("err").textContent="Enter your Doctor ID and password.";return}
 if(!d||d.pw!==$("pw").value){$("err").textContent="Wrong Doctor ID or password.";return}
 D=d;$("err").textContent="";$("pw").value="";
 $("login").hidden=true;$("dash").hidden=false;
 $("dav").textContent=D.ini;$("dname").textContent=D.name;$("dsub").textContent=D.spec+" · "+D.hosp+", "+D.area;
 $("date").textContent=new Date().toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
 $("wh").textContent="";$("wn").value="";syncAvail();
 clearInterval(timer);if(D.start)timer=setInterval(tick,1000);
 render();window.scrollTo(0,0);
}
function signOut(){clearInterval(timer);D=null;$("dash").hidden=true;$("login").hidden=false;$("uid").value="";$("pw").value="";$("uid").focus()}
$("go").onclick=signIn;$("pw").onkeydown=e=>{if(e.key==="Enter")signIn()};$("uid").onkeydown=e=>{if(e.key==="Enter")signIn()};
$("logout").onclick=signOut;

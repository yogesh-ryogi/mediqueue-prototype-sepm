// Patient authentication: sign up, log in, session, log out
/* ---------- auth ---------- */
let mode="login",user=null;
function setMode(m){
 mode=m;const su=m==="signup";
 $("tLogin").setAttribute("aria-selected",!su);$("tSignup").setAttribute("aria-selected",su);
 $("fName").hidden=!su;$("fConf").hidden=!su;
 $("aTitle").textContent=su?"Create your account":"Welcome back";
 $("aSub").textContent=su?"Sign up once to book doctors and track your tokens.":"Log in to book doctors and see your tokens.";
 $("aGo").textContent=su?"Create account":"Log in";
 $("pw").autocomplete=su?"new-password":"current-password";
 $("aAlt").innerHTML=su?'Already have an account? <a href="#" id="sw">Log in</a>':'New to MediQueue? <a href="#" id="sw">Sign up</a>';
 $("sw").onclick=e=>{e.preventDefault();setMode(su?"login":"signup")};
 $("aErr").textContent="";
}
$("tLogin").onclick=()=>setMode("login");$("tSignup").onclick=()=>setMode("signup");
$("sp").onchange=()=>{const t=$("sp").checked?"text":"password";$("pw").type=t;$("pw2").type=t};
["nm","mb","pw","pw2"].forEach(i=>$(i).onkeydown=e=>{if(e.key==="Enter")submitAuth()});
$("aGo").onclick=submitAuth;
async function submitAuth(){
 const mob=$("mb").value.trim(),pw=$("pw").value,U=users();
 if(!/^[6-9]\d{9}$/.test(mob))return $("aErr").textContent="Enter a valid 10-digit mobile number.";
 if(mode==="signup"){
  const nm=$("nm").value.trim();
  if(nm.length<2)return $("aErr").textContent="Enter your full name.";
  if(pw.length<6)return $("aErr").textContent="Password must be at least 6 characters.";
  if(pw!==$("pw2").value)return $("aErr").textContent="Passwords do not match.";
  if(U[mob])return $("aErr").textContent="This number is already registered. Please log in.";
  const s=salt();U[mob]={name:nm,salt:s,hash:await hash(pw,s)};
  store.set("mq_users",JSON.stringify(U));
  enter(mob,nm);
 }else{
  const u=U[mob];
  if(!pw)return $("aErr").textContent="Enter your password.";
  if(!u||u.hash!==await hash(pw,u.salt))return $("aErr").textContent="Wrong mobile number or password.";
  enter(mob,u.name);
 }
}
function enter(mob,name){
 user={mob,name};store.set("mq_session",mob);
 ["nm","mb","pw","pw2"].forEach(i=>$(i).value="");$("aErr").textContent="";$("sp").checked=false;$("pw").type="password";$("pw2").type="password";
 appts=[];Object.keys(booked).forEach(k=>delete booked[k]);
 try{appts=JSON.parse(store.get("mq_appts_"+mob)||"[]")}catch(e){}
 appts.forEach(a=>{if(a.key)booked[a.key]=1});
 tok=Math.max(100,...appts.map(a=>a.tok));
 $("auth").hidden=true;$("app").hidden=false;
 $("hi").textContent="Hi, "+name.split(" ")[0];$("mineN").textContent=appts.length;
 render();window.scrollTo(0,0);
}
function logout(){
 store.del("mq_session");user=null;$("app").hidden=true;$("auth").hidden=false;setMode("login");$("mb").focus();
}
$("out").onclick=logout;

// Shared helpers and browser storage (localStorage with in-memory fallback)
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* storage: localStorage when available, memory otherwise */
const mem={};
const store={
 get(k){let v=null;try{v=localStorage.getItem(k)}catch(e){}return v!==null?v:(mem[k]??null)},
 set(k,v){mem[k]=v;try{localStorage.setItem(k,v)}catch(e){}},
 del(k){delete mem[k];try{localStorage.removeItem(k)}catch(e){}}
};
const users=()=>{try{return JSON.parse(store.get("mq_users")||"{}")}catch(e){return{}}};
async function hash(pw,salt){
 try{const d=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(salt+pw));return[...new Uint8Array(d)].map(x=>x.toString(16).padStart(2,"0")).join("")}
 catch(e){return salt+":"+pw}
}
const salt=()=>Array.from({length:8},()=>Math.floor(Math.random()*16).toString(16)).join("");

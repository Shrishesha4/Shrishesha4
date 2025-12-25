var f_=Object.defineProperty;var Lh=n=>{throw TypeError(n)};var p_=(n,e,t)=>e in n?f_(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var gn=(n,e,t)=>p_(n,typeof e!="symbol"?e+"":e,t),ql=(n,e,t)=>e.has(n)||Lh("Cannot "+t);var N=(n,e,t)=>(ql(n,e,"read from private field"),t?t.call(n):e.get(n)),_e=(n,e,t)=>e.has(n)?Lh("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),ie=(n,e,t,r)=>(ql(n,e,"write to private field"),r?r.call(n,t):e.set(n,t),t),We=(n,e,t)=>(ql(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const g_="5";var Rf;typeof window<"u"&&((Rf=window.__svelte??(window.__svelte={})).v??(Rf.v=new Set)).add(g_);let fs=!1,m_=!1;function __(){fs=!0}__();const v_=1,y_=2,kf=4,w_=8,b_=16,E_=2,T_=4,I_=8,A_=1,S_=2,Tt=Symbol(),R_="http://www.w3.org/1999/xhtml",ic=!1;var Pf=Array.isArray,k_=Array.prototype.indexOf,rl=Array.from,Cf=Object.defineProperty,Hi=Object.getOwnPropertyDescriptor,xf=Object.getOwnPropertyDescriptors,P_=Object.prototype,C_=Array.prototype,Hc=Object.getPrototypeOf,Mh=Object.isExtensible;const Wi=()=>{};function x_(n){return n()}function sc(n){for(var e=0;e<n.length;e++)n[e]()}function Df(){var n,e,t=new Promise((r,i)=>{n=r,e=i});return{promise:t,resolve:n,reject:e}}const _t=2,Wc=4,il=8,D_=1<<24,er=16,tr=32,wi=64,sl=128,hn=512,pt=1024,Ft=2048,dn=4096,qt=8192,Wn=16384,Gc=32768,ts=65536,Fh=1<<17,Vf=1<<18,ps=1<<19,Nf=1<<20,jn=1<<25,hi=32768,oc=1<<21,Kc=1<<22,Ir=1<<23,si=Symbol("$state"),V_=Symbol("legacy props"),N_=Symbol(""),Bi=new class extends Error{constructor(){super(...arguments);gn(this,"name","StaleReactionError");gn(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};function Of(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function O_(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function L_(n){throw new Error("https://svelte.dev/e/effect_in_teardown")}function M_(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function F_(n){throw new Error("https://svelte.dev/e/effect_orphan")}function U_(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function j_(n){throw new Error("https://svelte.dev/e/props_invalid_value")}function B_(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function $_(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function q_(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function z_(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}function H_(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Lf(n){return n===this.v}function Mf(n,e){return n!=n?e==e:n!==e||n!==null&&typeof n=="object"||typeof n=="function"}function Ff(n){return!Mf(n,this.v)}let Me=null;function ns(n){Me=n}function en(n,e=!1,t){Me={p:Me,i:!1,c:null,e:null,s:n,x:null,l:fs&&!e?{s:null,u:null,$:[]}:null}}function tn(n){var e=Me,t=e.e;if(t!==null){e.e=null;for(var r of t)tp(r)}return e.i=!0,Me=e.p,{}}function To(){return!fs||Me!==null&&Me.l===null}let Yr=[];function Uf(){var n=Yr;Yr=[],sc(n)}function gs(n){if(Yr.length===0&&!Js){var e=Yr;queueMicrotask(()=>{e===Yr&&Uf()})}Yr.push(n)}function W_(){for(;Yr.length>0;)Uf()}function jf(n){var e=be;if(e===null)return fe.f|=Ir,n;if(e.f&Gc)rs(n,e);else{if(!(e.f&sl))throw n;e.b.error(n)}}function rs(n,e){for(;e!==null;){if(e.f&sl)try{e.b.error(n);return}catch(t){n=t}e=e.parent}throw n}const ra=new Set;let le=null,pa=null,Xe=null,Qt=[],ol=null,ac=!1,Js=!1;var Yi,Xi,Zr,ei,wo,Zi,es,gt,lc,js,cc,Bf,$f;const el=class el{constructor(){_e(this,gt);gn(this,"committed",!1);gn(this,"current",new Map);gn(this,"previous",new Map);_e(this,Yi,new Set);_e(this,Xi,new Set);_e(this,Zr,0);_e(this,ei,0);_e(this,wo,null);_e(this,Zi,new Set);_e(this,es,new Set);gn(this,"skipped_effects",new Set);gn(this,"is_fork",!1)}is_deferred(){return this.is_fork||N(this,ei)>0}process(e){var r;Qt=[],pa=null,this.apply();var t={parent:null,effect:null,effects:[],render_effects:[]};for(const i of e)We(this,gt,lc).call(this,i,t);this.is_fork||We(this,gt,Bf).call(this),this.is_deferred()?(We(this,gt,js).call(this,t.effects),We(this,gt,js).call(this,t.render_effects)):(pa=this,le=null,Uh(t.render_effects),Uh(t.effects),pa=null,(r=N(this,wo))==null||r.resolve()),Xe=null}capture(e,t){this.previous.has(e)||this.previous.set(e,t),e.f&Ir||(this.current.set(e,e.v),Xe==null||Xe.set(e,e.v))}activate(){le=this,this.apply()}deactivate(){le===this&&(le=null,Xe=null)}flush(){if(this.activate(),Qt.length>0){if(qf(),le!==null&&le!==this)return}else N(this,Zr)===0&&this.process([]);this.deactivate()}discard(){for(const e of N(this,Xi))e(this);N(this,Xi).clear()}increment(e){ie(this,Zr,N(this,Zr)+1),e&&ie(this,ei,N(this,ei)+1)}decrement(e){ie(this,Zr,N(this,Zr)-1),e&&ie(this,ei,N(this,ei)-1),this.revive()}revive(){for(const e of N(this,Zi))N(this,es).delete(e),mt(e,Ft),di(e);for(const e of N(this,es))mt(e,dn),di(e);this.flush()}oncommit(e){N(this,Yi).add(e)}ondiscard(e){N(this,Xi).add(e)}settled(){return(N(this,wo)??ie(this,wo,Df())).promise}static ensure(){if(le===null){const e=le=new el;ra.add(le),Js||el.enqueue(()=>{le===e&&e.flush()})}return le}static enqueue(e){gs(e)}apply(){}};Yi=new WeakMap,Xi=new WeakMap,Zr=new WeakMap,ei=new WeakMap,wo=new WeakMap,Zi=new WeakMap,es=new WeakMap,gt=new WeakSet,lc=function(e,t){var f;e.f^=pt;for(var r=e.first;r!==null;){var i=r.f,s=(i&(tr|wi))!==0,a=s&&(i&pt)!==0,l=a||(i&qt)!==0||this.skipped_effects.has(r);if(r.f&sl&&((f=r.b)!=null&&f.is_pending())&&(t={parent:t,effect:r,effects:[],render_effects:[]}),!l&&r.fn!==null){s?r.f^=pt:i&Wc?t.effects.push(r):_s(r)&&(r.f&er&&N(this,Zi).add(r),is(r));var c=r.first;if(c!==null){r=c;continue}}var h=r.parent;for(r=r.next;r===null&&h!==null;)h===t.effect&&(We(this,gt,js).call(this,t.effects),We(this,gt,js).call(this,t.render_effects),t=t.parent),r=h.next,h=h.parent}},js=function(e){for(const t of e)t.f&Ft?N(this,Zi).add(t):t.f&dn&&N(this,es).add(t),We(this,gt,cc).call(this,t.deps),mt(t,pt)},cc=function(e){if(e!==null)for(const t of e)!(t.f&_t)||!(t.f&hi)||(t.f^=hi,We(this,gt,cc).call(this,t.deps))},Bf=function(){if(N(this,ei)===0){for(const e of N(this,Yi))e();N(this,Yi).clear()}N(this,Zr)===0&&We(this,gt,$f).call(this)},$f=function(){var s;if(ra.size>1){this.previous.clear();var e=Xe,t=!0,r={parent:null,effect:null,effects:[],render_effects:[]};for(const a of ra){if(a===this){t=!1;continue}const l=[];for(const[h,f]of this.current){if(a.current.has(h))if(t&&f!==a.current.get(h))a.current.set(h,f);else continue;l.push(h)}if(l.length===0)continue;const c=[...a.current.keys()].filter(h=>!this.current.has(h));if(c.length>0){var i=Qt;Qt=[];const h=new Set,f=new Map;for(const g of l)zf(g,c,h,f);if(Qt.length>0){le=a,a.apply();for(const g of Qt)We(s=a,gt,lc).call(s,g,r);a.deactivate()}Qt=i}}le=null,Xe=e}this.committed=!0,ra.delete(this)};let Bn=el;function G_(n){var e=Js;Js=!0;try{for(var t;;){if(W_(),Qt.length===0&&(le==null||le.flush(),Qt.length===0))return ol=null,t;qf()}}finally{Js=e}}function qf(){var n=ai;ac=!0;var e=null;try{var t=0;for(Pa(!0);Qt.length>0;){var r=Bn.ensure();if(t++>1e3){var i,s;K_()}r.process(Qt),Ar.clear()}}finally{ac=!1,Pa(n),ol=null}}function K_(){try{U_()}catch(n){rs(n,ol)}}let sn=null;function Uh(n){var e=n.length;if(e!==0){for(var t=0;t<e;){var r=n[t++];if(!(r.f&(Wn|qt))&&_s(r)&&(sn=new Set,is(r),r.deps===null&&r.first===null&&r.nodes===null&&(r.teardown===null&&r.ac===null?ip(r):r.fn=null),(sn==null?void 0:sn.size)>0)){Ar.clear();for(const i of sn){if(i.f&(Wn|qt))continue;const s=[i];let a=i.parent;for(;a!==null;)sn.has(a)&&(sn.delete(a),s.push(a)),a=a.parent;for(let l=s.length-1;l>=0;l--){const c=s[l];c.f&(Wn|qt)||is(c)}}sn.clear()}}sn=null}}function zf(n,e,t,r){if(!t.has(n)&&(t.add(n),n.reactions!==null))for(const i of n.reactions){const s=i.f;s&_t?zf(i,e,t,r):s&(Kc|er)&&!(s&Ft)&&Hf(i,e,r)&&(mt(i,Ft),di(i))}}function Hf(n,e,t){const r=t.get(n);if(r!==void 0)return r;if(n.deps!==null)for(const i of n.deps){if(e.includes(i))return!0;if(i.f&_t&&Hf(i,e,t))return t.set(i,!0),!0}return t.set(n,!1),!1}function di(n){for(var e=ol=n;e.parent!==null;){e=e.parent;var t=e.f;if(ac&&e===be&&t&er&&!(t&Vf))return;if(t&(wi|tr)){if(!(t&pt))return;e.f^=pt}}Qt.push(e)}function Q_(n){let e=0,t=fi(0),r;return()=>{io()&&(y(t),ms(()=>(e===0&&(r=Re(()=>n(()=>Ys(t)))),e+=1,()=>{gs(()=>{e-=1,e===0&&(r==null||r(),r=void 0,Ys(t))})})))}}var J_=ts|ps|sl;function Y_(n,e,t){new X_(n,e,t)}var Wt,Gt,zc,_n,ti,vn,Kt,Nt,yn,Un,wr,ni,br,ri,Er,tl,lt,Z_,ev,uc,ga,ma,hc;class X_{constructor(e,t,r){_e(this,lt);gn(this,"parent");_e(this,Wt,!1);_e(this,Gt);_e(this,zc,null);_e(this,_n);_e(this,ti);_e(this,vn);_e(this,Kt,null);_e(this,Nt,null);_e(this,yn,null);_e(this,Un,null);_e(this,wr,null);_e(this,ni,0);_e(this,br,0);_e(this,ri,!1);_e(this,Er,null);_e(this,tl,Q_(()=>(ie(this,Er,fi(N(this,ni))),()=>{ie(this,Er,null)})));ie(this,Gt,e),ie(this,_n,t),ie(this,ti,r),this.parent=be.b,ie(this,Wt,!!N(this,_n).pending),ie(this,vn,tu(()=>{be.b=this;{var i=We(this,lt,uc).call(this);try{ie(this,Kt,Jt(()=>r(i)))}catch(s){this.error(s)}N(this,br)>0?We(this,lt,ma).call(this):ie(this,Wt,!1)}return()=>{var s;(s=N(this,wr))==null||s.remove()}},J_))}is_pending(){return N(this,Wt)||!!this.parent&&this.parent.is_pending()}has_pending_snippet(){return!!N(this,_n).pending}update_pending_count(e){We(this,lt,hc).call(this,e),ie(this,ni,N(this,ni)+e),N(this,Er)&&pi(N(this,Er),N(this,ni))}get_effect_pending(){return N(this,tl).call(this),y(N(this,Er))}error(e){var t=N(this,_n).onerror;let r=N(this,_n).failed;if(N(this,ri)||!t&&!r)throw e;N(this,Kt)&&(Mt(N(this,Kt)),ie(this,Kt,null)),N(this,Nt)&&(Mt(N(this,Nt)),ie(this,Nt,null)),N(this,yn)&&(Mt(N(this,yn)),ie(this,yn,null));var i=!1,s=!1;const a=()=>{if(i){H_();return}i=!0,s&&z_(),Bn.ensure(),ie(this,ni,0),N(this,yn)!==null&&oi(N(this,yn),()=>{ie(this,yn,null)}),ie(this,Wt,this.has_pending_snippet()),ie(this,Kt,We(this,lt,ga).call(this,()=>(ie(this,ri,!1),Jt(()=>N(this,ti).call(this,N(this,Gt)))))),N(this,br)>0?We(this,lt,ma).call(this):ie(this,Wt,!1)};var l=fe;try{Lt(null),s=!0,t==null||t(e,a),s=!1}catch(c){rs(c,N(this,vn)&&N(this,vn).parent)}finally{Lt(l)}r&&gs(()=>{ie(this,yn,We(this,lt,ga).call(this,()=>{Bn.ensure(),ie(this,ri,!0);try{return Jt(()=>{r(N(this,Gt),()=>e,()=>a)})}catch(c){return rs(c,N(this,vn).parent),null}finally{ie(this,ri,!1)}}))})}}Wt=new WeakMap,Gt=new WeakMap,zc=new WeakMap,_n=new WeakMap,ti=new WeakMap,vn=new WeakMap,Kt=new WeakMap,Nt=new WeakMap,yn=new WeakMap,Un=new WeakMap,wr=new WeakMap,ni=new WeakMap,br=new WeakMap,ri=new WeakMap,Er=new WeakMap,tl=new WeakMap,lt=new WeakSet,Z_=function(){try{ie(this,Kt,Jt(()=>N(this,ti).call(this,N(this,Gt))))}catch(e){this.error(e)}ie(this,Wt,!1)},ev=function(){const e=N(this,_n).pending;e&&(ie(this,Nt,Jt(()=>e(N(this,Gt)))),Bn.enqueue(()=>{var t=We(this,lt,uc).call(this);ie(this,Kt,We(this,lt,ga).call(this,()=>(Bn.ensure(),Jt(()=>N(this,ti).call(this,t))))),N(this,br)>0?We(this,lt,ma).call(this):(oi(N(this,Nt),()=>{ie(this,Nt,null)}),ie(this,Wt,!1))}))},uc=function(){var e=N(this,Gt);return N(this,Wt)&&(ie(this,wr,Gn()),N(this,Gt).before(N(this,wr)),e=N(this,wr)),e},ga=function(e){var t=be,r=fe,i=Me;xn(N(this,vn)),Lt(N(this,vn)),ns(N(this,vn).ctx);try{return e()}catch(s){return jf(s),null}finally{xn(t),Lt(r),ns(i)}},ma=function(){const e=N(this,_n).pending;N(this,Kt)!==null&&(ie(this,Un,document.createDocumentFragment()),N(this,Un).append(N(this,wr)),ap(N(this,Kt),N(this,Un))),N(this,Nt)===null&&ie(this,Nt,Jt(()=>e(N(this,Gt))))},hc=function(e){var t;if(!this.has_pending_snippet()){this.parent&&We(t=this.parent,lt,hc).call(t,e);return}ie(this,br,N(this,br)+e),N(this,br)===0&&(ie(this,Wt,!1),N(this,Nt)&&oi(N(this,Nt),()=>{ie(this,Nt,null)}),N(this,Un)&&(N(this,Gt).before(N(this,Un)),ie(this,Un,null)))};function tv(n,e,t,r){const i=To()?Qc:Jc;if(t.length===0&&n.length===0){r(e.map(i));return}var s=le,a=be,l=nv();function c(){Promise.all(t.map(h=>rv(h))).then(h=>{l();try{r([...e.map(i),...h])}catch(f){a.f&Wn||rs(f,a)}s==null||s.deactivate(),Ra()}).catch(h=>{rs(h,a)})}n.length>0?Promise.all(n).then(()=>{l();try{return c()}finally{s==null||s.deactivate(),Ra()}}):c()}function nv(){var n=be,e=fe,t=Me,r=le;return function(s=!0){xn(n),Lt(e),ns(t),s&&(r==null||r.activate())}}function Ra(){xn(null),Lt(null),ns(null)}function Qc(n){var e=_t|Ft,t=fe!==null&&fe.f&_t?fe:null;return be!==null&&(be.f|=ps),{ctx:Me,deps:null,effects:null,equals:Lf,f:e,fn:n,reactions:null,rv:0,v:Tt,wv:0,parent:t??be,ac:null}}function rv(n,e){let t=be;t===null&&O_();var r=t.b,i=void 0,s=fi(Tt),a=!fe,l=new Map;return pv(()=>{var m;var c=Df();i=c.promise;try{Promise.resolve(n()).then(c.resolve,c.reject).then(()=>{h===le&&h.committed&&h.deactivate(),Ra()})}catch(T){c.reject(T),Ra()}var h=le;if(a){var f=!r.is_pending();r.update_pending_count(1),h.increment(f),(m=l.get(h))==null||m.reject(Bi),l.delete(h),l.set(h,c)}const g=(T,k=void 0)=>{if(h.activate(),k)k!==Bi&&(s.f|=Ir,pi(s,k));else{s.f&Ir&&(s.f^=Ir),pi(s,T);for(const[P,A]of l){if(l.delete(P),P===h)break;A.reject(Bi)}}a&&(r.update_pending_count(-1),h.decrement(f))};c.promise.then(g,T=>g(null,T||"unknown"))}),Xc(()=>{for(const c of l.values())c.reject(Bi)}),new Promise(c=>{function h(f){function g(){f===i?c(s):h(i)}f.then(g,g)}h(i)})}function Jc(n){const e=Qc(n);return e.equals=Ff,e}function Wf(n){var e=n.effects;if(e!==null){n.effects=null;for(var t=0;t<e.length;t+=1)Mt(e[t])}}function iv(n){for(var e=n.parent;e!==null;){if(!(e.f&_t))return e.f&Wn?null:e;e=e.parent}return null}function Yc(n){var e,t=be;xn(iv(n));try{n.f&=~hi,Wf(n),e=hp(n)}finally{xn(t)}return e}function Gf(n){var e=Yc(n);if(n.equals(e)||(le!=null&&le.is_fork||(n.v=e),n.wv=cp()),!bi)if(Xe!==null)(io()||le!=null&&le.is_fork)&&Xe.set(n,e);else{var t=n.f&hn?pt:dn;mt(n,t)}}let dc=new Set;const Ar=new Map;let Kf=!1;function fi(n,e){var t={f:0,v:n,reactions:null,equals:Lf,rv:0,wv:0};return t}function dr(n,e){const t=fi(n);return vv(t),t}function he(n,e=!1,t=!0){var i;const r=fi(n);return e||(r.equals=Ff),fs&&t&&Me!==null&&Me.l!==null&&((i=Me.l).s??(i.s=[])).push(r),r}function se(n,e){return z(n,Re(()=>y(n))),e}function z(n,e,t=!1){fe!==null&&(!Tn||fe.f&Fh)&&To()&&fe.f&(_t|er|Kc|Fh)&&!(Ct!=null&&Ct.includes(n))&&q_();let r=t?$i(e):e;return pi(n,r)}function pi(n,e){if(!n.equals(e)){var t=n.v;bi?Ar.set(n,e):Ar.set(n,t),n.v=e;var r=Bn.ensure();r.capture(n,t),n.f&_t&&(n.f&Ft&&Yc(n),mt(n,n.f&hn?pt:dn)),n.wv=cp(),Qf(n,Ft),To()&&be!==null&&be.f&pt&&!(be.f&(tr|wi))&&(Ht===null?yv([n]):Ht.push(n)),!r.is_fork&&dc.size>0&&!Kf&&sv()}return e}function sv(){Kf=!1;var n=ai;Pa(!0);const e=Array.from(dc);try{for(const t of e)t.f&pt&&mt(t,dn),_s(t)&&is(t)}finally{Pa(n)}dc.clear()}function Ys(n){z(n,n.v+1)}function Qf(n,e){var t=n.reactions;if(t!==null)for(var r=To(),i=t.length,s=0;s<i;s++){var a=t[s],l=a.f;if(!(!r&&a===be)){var c=(l&Ft)===0;if(c&&mt(a,e),l&_t){var h=a;Xe==null||Xe.delete(h),l&hi||(l&hn&&(a.f|=hi),Qf(h,dn))}else c&&(l&er&&sn!==null&&sn.add(a),di(a))}}}function $i(n){if(typeof n!="object"||n===null||si in n)return n;const e=Hc(n);if(e!==P_&&e!==C_)return n;var t=new Map,r=Pf(n),i=dr(0),s=li,a=l=>{if(li===s)return l();var c=fe,h=li;Lt(null),qh(s);var f=l();return Lt(c),qh(h),f};return r&&t.set("length",dr(n.length)),new Proxy(n,{defineProperty(l,c,h){(!("value"in h)||h.configurable===!1||h.enumerable===!1||h.writable===!1)&&B_();var f=t.get(c);return f===void 0?f=a(()=>{var g=dr(h.value);return t.set(c,g),g}):z(f,h.value,!0),!0},deleteProperty(l,c){var h=t.get(c);if(h===void 0){if(c in l){const f=a(()=>dr(Tt));t.set(c,f),Ys(i)}}else z(h,Tt),Ys(i);return!0},get(l,c,h){var T;if(c===si)return n;var f=t.get(c),g=c in l;if(f===void 0&&(!g||(T=Hi(l,c))!=null&&T.writable)&&(f=a(()=>{var k=$i(g?l[c]:Tt),P=dr(k);return P}),t.set(c,f)),f!==void 0){var m=y(f);return m===Tt?void 0:m}return Reflect.get(l,c,h)},getOwnPropertyDescriptor(l,c){var h=Reflect.getOwnPropertyDescriptor(l,c);if(h&&"value"in h){var f=t.get(c);f&&(h.value=y(f))}else if(h===void 0){var g=t.get(c),m=g==null?void 0:g.v;if(g!==void 0&&m!==Tt)return{enumerable:!0,configurable:!0,value:m,writable:!0}}return h},has(l,c){var m;if(c===si)return!0;var h=t.get(c),f=h!==void 0&&h.v!==Tt||Reflect.has(l,c);if(h!==void 0||be!==null&&(!f||(m=Hi(l,c))!=null&&m.writable)){h===void 0&&(h=a(()=>{var T=f?$i(l[c]):Tt,k=dr(T);return k}),t.set(c,h));var g=y(h);if(g===Tt)return!1}return f},set(l,c,h,f){var F;var g=t.get(c),m=c in l;if(r&&c==="length")for(var T=h;T<g.v;T+=1){var k=t.get(T+"");k!==void 0?z(k,Tt):T in l&&(k=a(()=>dr(Tt)),t.set(T+"",k))}if(g===void 0)(!m||(F=Hi(l,c))!=null&&F.writable)&&(g=a(()=>dr(void 0)),z(g,$i(h)),t.set(c,g));else{m=g.v!==Tt;var P=a(()=>$i(h));z(g,P)}var A=Reflect.getOwnPropertyDescriptor(l,c);if(A!=null&&A.set&&A.set.call(f,h),!m){if(r&&typeof c=="string"){var C=t.get("length"),U=Number(c);Number.isInteger(U)&&U>=C.v&&z(C,U+1)}Ys(i)}return!0},ownKeys(l){y(i);var c=Reflect.ownKeys(l).filter(g=>{var m=t.get(g);return m===void 0||m.v!==Tt});for(var[h,f]of t)f.v!==Tt&&!(h in l)&&c.push(h);return c},setPrototypeOf(){$_()}})}var jh,Jf,Yf,Xf;function ov(){if(jh===void 0){jh=window,Jf=/Firefox/.test(navigator.userAgent);var n=Element.prototype,e=Node.prototype,t=Text.prototype;Yf=Hi(e,"firstChild").get,Xf=Hi(e,"nextSibling").get,Mh(n)&&(n.__click=void 0,n.__className=void 0,n.__attributes=null,n.__style=void 0,n.__e=void 0),Mh(t)&&(t.__t=void 0)}}function Gn(n=""){return document.createTextNode(n)}function ka(n){return Yf.call(n)}function Io(n){return Xf.call(n)}function x(n,e){return ka(n)}function Ke(n,e=!1){{var t=ka(n);return t instanceof Comment&&t.data===""?Io(t):t}}function V(n,e=1,t=!1){let r=n;for(;e--;)r=Io(r);return r}function av(n){n.textContent=""}function Zf(){return!1}let Bh=!1;function lv(){Bh||(Bh=!0,document.addEventListener("reset",n=>{Promise.resolve().then(()=>{var e;if(!n.defaultPrevented)for(const t of n.target.elements)(e=t.__on_r)==null||e.call(t)})},{capture:!0}))}function al(n){var e=fe,t=be;Lt(null),xn(null);try{return n()}finally{Lt(e),xn(t)}}function cv(n,e,t,r=t){n.addEventListener(e,()=>al(t));const i=n.__on_r;i?n.__on_r=()=>{i(),r(!0)}:n.__on_r=()=>r(!0),lv()}function ep(n){be===null&&(fe===null&&F_(),M_()),bi&&L_()}function uv(n,e){var t=e.last;t===null?e.last=e.first=n:(t.next=n,n.prev=t,e.last=n)}function Nn(n,e,t){var r=be;r!==null&&r.f&qt&&(n|=qt);var i={ctx:Me,deps:null,nodes:null,f:n|Ft|hn,first:null,fn:e,last:null,next:null,parent:r,b:r&&r.b,prev:null,teardown:null,wv:0,ac:null};if(t)try{is(i),i.f|=Gc}catch(l){throw Mt(i),l}else e!==null&&di(i);var s=i;if(t&&s.deps===null&&s.teardown===null&&s.nodes===null&&s.first===s.last&&!(s.f&ps)&&(s=s.first,n&er&&n&ts&&s!==null&&(s.f|=ts)),s!==null&&(s.parent=r,r!==null&&uv(s,r),fe!==null&&fe.f&_t&&!(n&wi))){var a=fe;(a.effects??(a.effects=[])).push(s)}return i}function io(){return fe!==null&&!Tn}function Xc(n){const e=Nn(il,null,!1);return mt(e,pt),e.teardown=n,e}function fc(n){ep();var e=be.f,t=!fe&&(e&tr)!==0&&(e&Gc)===0;if(t){var r=Me;(r.e??(r.e=[])).push(n)}else return tp(n)}function tp(n){return Nn(Wc|Nf,n,!1)}function hv(n){return ep(),Nn(il|Nf,n,!0)}function dv(n){Bn.ensure();const e=Nn(wi|ps,n,!0);return(t={})=>new Promise(r=>{t.outro?oi(e,()=>{Mt(e),r(void 0)}):(Mt(e),r(void 0))})}function fv(n){return Nn(Wc,n,!1)}function Zc(n,e){var t=Me,r={effect:null,ran:!1,deps:n};t.l.$.push(r),r.effect=ms(()=>{n(),!r.ran&&(r.ran=!0,Re(e))})}function eu(){var n=Me;ms(()=>{for(var e of n.l.$){e.deps();var t=e.effect;t.f&pt&&mt(t,dn),_s(t)&&is(t),e.ran=!1}})}function pv(n){return Nn(Kc|ps,n,!0)}function ms(n,e=0){return Nn(il|e,n,!0)}function Ne(n,e=[],t=[],r=[]){tv(r,e,t,i=>{Nn(il,()=>n(...i.map(y)),!0)})}function tu(n,e=0){var t=Nn(er|e,n,!0);return t}function Jt(n){return Nn(tr|ps,n,!0)}function np(n){var e=n.teardown;if(e!==null){const t=bi,r=fe;$h(!0),Lt(null);try{e.call(null)}finally{$h(t),Lt(r)}}}function rp(n,e=!1){var t=n.first;for(n.first=n.last=null;t!==null;){const i=t.ac;i!==null&&al(()=>{i.abort(Bi)});var r=t.next;t.f&wi?t.parent=null:Mt(t,e),t=r}}function gv(n){for(var e=n.first;e!==null;){var t=e.next;e.f&tr||Mt(e),e=t}}function Mt(n,e=!0){var t=!1;(e||n.f&Vf)&&n.nodes!==null&&n.nodes.end!==null&&(mv(n.nodes.start,n.nodes.end),t=!0),rp(n,e&&!t),Ca(n,0),mt(n,Wn);var r=n.nodes&&n.nodes.t;if(r!==null)for(const s of r)s.stop();np(n);var i=n.parent;i!==null&&i.first!==null&&ip(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes=n.ac=null}function mv(n,e){for(;n!==null;){var t=n===e?null:Io(n);n.remove(),n=t}}function ip(n){var e=n.parent,t=n.prev,r=n.next;t!==null&&(t.next=r),r!==null&&(r.prev=t),e!==null&&(e.first===n&&(e.first=r),e.last===n&&(e.last=t))}function oi(n,e,t=!0){var r=[];sp(n,r,!0);var i=()=>{t&&Mt(n),e&&e()},s=r.length;if(s>0){var a=()=>--s||i();for(var l of r)l.out(a)}else i()}function sp(n,e,t){if(!(n.f&qt)){n.f^=qt;var r=n.nodes&&n.nodes.t;if(r!==null)for(const l of r)(l.is_global||t)&&e.push(l);for(var i=n.first;i!==null;){var s=i.next,a=(i.f&ts)!==0||(i.f&tr)!==0&&(n.f&er)!==0;sp(i,e,a?t:!1),i=s}}}function nu(n){op(n,!0)}function op(n,e){if(n.f&qt){n.f^=qt,n.f&pt||(mt(n,Ft),di(n));for(var t=n.first;t!==null;){var r=t.next,i=(t.f&ts)!==0||(t.f&tr)!==0;op(t,i?e:!1),t=r}var s=n.nodes&&n.nodes.t;if(s!==null)for(const a of s)(a.is_global||e)&&a.in()}}function ap(n,e){if(n.nodes)for(var t=n.nodes.start,r=n.nodes.end;t!==null;){var i=t===r?null:Io(t);e.append(t),t=i}}let gr=null;function _v(n){var e=gr;try{if(gr=new Set,Re(n),e!==null)for(var t of gr)e.add(t);return gr}finally{gr=e}}function ia(n){for(var e of _v(n))pi(e,e.v)}let ai=!1;function Pa(n){ai=n}let bi=!1;function $h(n){bi=n}let fe=null,Tn=!1;function Lt(n){fe=n}let be=null;function xn(n){be=n}let Ct=null;function vv(n){fe!==null&&(Ct===null?Ct=[n]:Ct.push(n))}let Pt=null,Bt=0,Ht=null;function yv(n){Ht=n}let lp=1,so=0,li=so;function qh(n){li=n}function cp(){return++lp}function _s(n){var e=n.f;if(e&Ft)return!0;if(e&_t&&(n.f&=~hi),e&dn){var t=n.deps;if(t!==null)for(var r=t.length,i=0;i<r;i++){var s=t[i];if(_s(s)&&Gf(s),s.wv>n.wv)return!0}e&hn&&Xe===null&&mt(n,pt)}return!1}function up(n,e,t=!0){var r=n.reactions;if(r!==null&&!(Ct!=null&&Ct.includes(n)))for(var i=0;i<r.length;i++){var s=r[i];s.f&_t?up(s,e,!1):e===s&&(t?mt(s,Ft):s.f&pt&&mt(s,dn),di(s))}}function hp(n){var k;var e=Pt,t=Bt,r=Ht,i=fe,s=Ct,a=Me,l=Tn,c=li,h=n.f;Pt=null,Bt=0,Ht=null,fe=h&(tr|wi)?null:n,Ct=null,ns(n.ctx),Tn=!1,li=++so,n.ac!==null&&(al(()=>{n.ac.abort(Bi)}),n.ac=null);try{n.f|=oc;var f=n.fn,g=f(),m=n.deps;if(Pt!==null){var T;if(Ca(n,Bt),m!==null&&Bt>0)for(m.length=Bt+Pt.length,T=0;T<Pt.length;T++)m[Bt+T]=Pt[T];else n.deps=m=Pt;if(io()&&n.f&hn)for(T=Bt;T<m.length;T++)((k=m[T]).reactions??(k.reactions=[])).push(n)}else m!==null&&Bt<m.length&&(Ca(n,Bt),m.length=Bt);if(To()&&Ht!==null&&!Tn&&m!==null&&!(n.f&(_t|dn|Ft)))for(T=0;T<Ht.length;T++)up(Ht[T],n);return i!==null&&i!==n&&(so++,Ht!==null&&(r===null?r=Ht:r.push(...Ht))),n.f&Ir&&(n.f^=Ir),g}catch(P){return jf(P)}finally{n.f^=oc,Pt=e,Bt=t,Ht=r,fe=i,Ct=s,ns(a),Tn=l,li=c}}function wv(n,e){let t=e.reactions;if(t!==null){var r=k_.call(t,n);if(r!==-1){var i=t.length-1;i===0?t=e.reactions=null:(t[r]=t[i],t.pop())}}t===null&&e.f&_t&&(Pt===null||!Pt.includes(e))&&(mt(e,dn),e.f&hn&&(e.f^=hn,e.f&=~hi),Wf(e),Ca(e,0))}function Ca(n,e){var t=n.deps;if(t!==null)for(var r=e;r<t.length;r++)wv(n,t[r])}function is(n){var e=n.f;if(!(e&Wn)){mt(n,pt);var t=be,r=ai;be=n,ai=!0;try{e&(er|D_)?gv(n):rp(n),np(n);var i=hp(n);n.teardown=typeof i=="function"?i:null,n.wv=lp;var s;ic&&m_&&n.f&Ft&&n.deps}finally{ai=r,be=t}}}async function bv(){await Promise.resolve(),G_()}function y(n){var e=n.f,t=(e&_t)!==0;if(gr==null||gr.add(n),fe!==null&&!Tn){var r=be!==null&&(be.f&Wn)!==0;if(!r&&!(Ct!=null&&Ct.includes(n))){var i=fe.deps;if(fe.f&oc)n.rv<so&&(n.rv=so,Pt===null&&i!==null&&i[Bt]===n?Bt++:Pt===null?Pt=[n]:Pt.includes(n)||Pt.push(n));else{(fe.deps??(fe.deps=[])).push(n);var s=n.reactions;s===null?n.reactions=[fe]:s.includes(fe)||s.push(fe)}}}if(bi){if(Ar.has(n))return Ar.get(n);if(t){var a=n,l=a.v;return(!(a.f&pt)&&a.reactions!==null||fp(a))&&(l=Yc(a)),Ar.set(a,l),l}}else t&&(!(Xe!=null&&Xe.has(n))||le!=null&&le.is_fork&&!io())&&(a=n,_s(a)&&Gf(a),ai&&io()&&!(a.f&hn)&&dp(a));if(Xe!=null&&Xe.has(n))return Xe.get(n);if(n.f&Ir)throw n.v;return n.v}function dp(n){if(n.deps!==null){n.f^=hn;for(const e of n.deps)(e.reactions??(e.reactions=[])).push(n),e.f&_t&&!(e.f&hn)&&dp(e)}}function fp(n){if(n.v===Tt)return!0;if(n.deps===null)return!1;for(const e of n.deps)if(Ar.has(e)||e.f&_t&&fp(e))return!0;return!1}function Re(n){var e=Tn;try{return Tn=!0,n()}finally{Tn=e}}const Ev=-7169;function mt(n,e){n.f=n.f&Ev|e}function Tv(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(si in n)pc(n);else if(!Array.isArray(n))for(let e in n){const t=n[e];typeof t=="object"&&t&&si in t&&pc(t)}}}function pc(n,e=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!e.has(n)){e.add(n),n instanceof Date&&n.getTime();for(let r in n)try{pc(n[r],e)}catch{}const t=Hc(n);if(t!==Object.prototype&&t!==Array.prototype&&t!==Map.prototype&&t!==Set.prototype&&t!==Date.prototype){const r=xf(t);for(let i in r){const s=r[i].get;if(s)try{s.call(n)}catch{}}}}}const Iv=new Set,zh=new Set;function Av(n,e,t,r={}){function i(s){if(r.capture||Bs.call(e,s),!s.cancelBubble)return al(()=>t==null?void 0:t.call(this,s))}return n.startsWith("pointer")||n.startsWith("touch")||n==="wheel"?gs(()=>{e.addEventListener(n,i,r)}):e.addEventListener(n,i,r),i}function J(n,e,t,r,i){var s={capture:r,passive:i},a=Av(n,e,t,s);(e===document.body||e===window||e===document||e instanceof HTMLMediaElement)&&Xc(()=>{e.removeEventListener(n,a,s)})}let Hh=null;function Bs(n){var A;var e=this,t=e.ownerDocument,r=n.type,i=((A=n.composedPath)==null?void 0:A.call(n))||[],s=i[0]||n.target;Hh=n;var a=0,l=Hh===n&&n.__root;if(l){var c=i.indexOf(l);if(c!==-1&&(e===document||e===window)){n.__root=e;return}var h=i.indexOf(e);if(h===-1)return;c<=h&&(a=c)}if(s=i[a]||n.target,s!==e){Cf(n,"currentTarget",{configurable:!0,get(){return s||t}});var f=fe,g=be;Lt(null),xn(null);try{for(var m,T=[];s!==null;){var k=s.assignedSlot||s.parentNode||s.host||null;try{var P=s["__"+r];P!=null&&(!s.disabled||n.target===s)&&P.call(s,n)}catch(C){m?T.push(C):m=C}if(n.cancelBubble||k===e||k===null)break;s=k}if(m){for(let C of T)queueMicrotask(()=>{throw C});throw m}}finally{n.__root=e,delete n.currentTarget,Lt(f),xn(g)}}}function Sv(n){var e=document.createElement("template");return e.innerHTML=n.replaceAll("<!>","<!---->"),e.content}function xa(n,e){var t=be;t.nodes===null&&(t.nodes={start:n,end:e,a:null,t:null})}function K(n,e){var t=(e&A_)!==0,r=(e&S_)!==0,i,s=!n.startsWith("<!>");return()=>{i===void 0&&(i=Sv(s?n:"<!>"+n),t||(i=ka(i)));var a=r||Jf?document.importNode(i,!0):i.cloneNode(!0);if(t){var l=ka(a),c=a.lastChild;xa(l,c)}else xa(a,a);return a}}function sa(n=""){{var e=Gn(n+"");return xa(e,e),e}}function at(){var n=document.createDocumentFragment(),e=document.createComment(""),t=Gn();return n.append(e,t),xa(e,t),n}function q(n,e){n!==null&&n.before(e)}const Rv=["touchstart","touchmove"];function kv(n){return Rv.includes(n)}function Oe(n,e){var t=e==null?"":typeof e=="object"?e+"":e;t!==(n.__t??(n.__t=n.nodeValue))&&(n.__t=t,n.nodeValue=t+"")}function Pv(n,e){return Cv(n,e)}const Oi=new Map;function Cv(n,{target:e,anchor:t,props:r={},events:i,context:s,intro:a=!0}){ov();var l=new Set,c=g=>{for(var m=0;m<g.length;m++){var T=g[m];if(!l.has(T)){l.add(T);var k=kv(T);e.addEventListener(T,Bs,{passive:k});var P=Oi.get(T);P===void 0?(document.addEventListener(T,Bs,{passive:k}),Oi.set(T,1)):Oi.set(T,P+1)}}};c(rl(Iv)),zh.add(c);var h=void 0,f=dv(()=>{var g=t??e.appendChild(Gn());return Y_(g,{pending:()=>{}},m=>{if(s){en({});var T=Me;T.c=s}i&&(r.$$events=i),h=n(m,r)||{},s&&tn()}),()=>{var k;for(var m of l){e.removeEventListener(m,Bs);var T=Oi.get(m);--T===0?(document.removeEventListener(m,Bs),Oi.delete(m)):Oi.set(m,T)}zh.delete(c),g!==t&&((k=g.parentNode)==null||k.removeChild(g))}});return xv.set(h,f),h}let xv=new WeakMap;var on,wn,$t,ii,bo,Eo,nl;class Dv{constructor(e,t=!0){gn(this,"anchor");_e(this,on,new Map);_e(this,wn,new Map);_e(this,$t,new Map);_e(this,ii,new Set);_e(this,bo,!0);_e(this,Eo,()=>{var e=le;if(N(this,on).has(e)){var t=N(this,on).get(e),r=N(this,wn).get(t);if(r)nu(r),N(this,ii).delete(t);else{var i=N(this,$t).get(t);i&&(N(this,wn).set(t,i.effect),N(this,$t).delete(t),i.fragment.lastChild.remove(),this.anchor.before(i.fragment),r=i.effect)}for(const[s,a]of N(this,on)){if(N(this,on).delete(s),s===e)break;const l=N(this,$t).get(a);l&&(Mt(l.effect),N(this,$t).delete(a))}for(const[s,a]of N(this,wn)){if(s===t||N(this,ii).has(s))continue;const l=()=>{if(Array.from(N(this,on).values()).includes(s)){var h=document.createDocumentFragment();ap(a,h),h.append(Gn()),N(this,$t).set(s,{effect:a,fragment:h})}else Mt(a);N(this,ii).delete(s),N(this,wn).delete(s)};N(this,bo)||!r?(N(this,ii).add(s),oi(a,l,!1)):l()}}});_e(this,nl,e=>{N(this,on).delete(e);const t=Array.from(N(this,on).values());for(const[r,i]of N(this,$t))t.includes(r)||(Mt(i.effect),N(this,$t).delete(r))});this.anchor=e,ie(this,bo,t)}ensure(e,t){var r=le,i=Zf();if(t&&!N(this,wn).has(e)&&!N(this,$t).has(e))if(i){var s=document.createDocumentFragment(),a=Gn();s.append(a),N(this,$t).set(e,{effect:Jt(()=>t(a)),fragment:s})}else N(this,wn).set(e,Jt(()=>t(this.anchor)));if(N(this,on).set(r,e),i){for(const[l,c]of N(this,wn))l===e?r.skipped_effects.delete(c):r.skipped_effects.add(c);for(const[l,c]of N(this,$t))l===e?r.skipped_effects.delete(c.effect):r.skipped_effects.add(c.effect);r.oncommit(N(this,Eo)),r.ondiscard(N(this,nl))}else N(this,Eo).call(this)}}on=new WeakMap,wn=new WeakMap,$t=new WeakMap,ii=new WeakMap,bo=new WeakMap,Eo=new WeakMap,nl=new WeakMap;function On(n){Me===null&&Of(),fs&&Me.l!==null?Vv(Me).m.push(n):fc(()=>{const e=Re(n);if(typeof e=="function")return e})}function pp(n){Me===null&&Of(),On(()=>()=>Re(n))}function Vv(n){var e=n.l;return e.u??(e.u={a:[],b:[],m:[]})}function oe(n,e,t=!1){var r=new Dv(n),i=t?ts:0;function s(a,l){r.ensure(a,l)}tu(()=>{var a=!1;e((l,c=!0)=>{a=!0,s(c,l)}),a||s(!1,null)},i)}function bn(n,e){return e}function Nv(n,e,t){for(var r=[],i=e.length,s,a=e.length,l=0;l<i;l++){let g=e[l];oi(g,()=>{if(s){if(s.pending.delete(g),s.done.add(g),s.pending.size===0){var m=n.outrogroups;gc(rl(s.done)),m.delete(s),m.size===0&&(n.outrogroups=null)}}else a-=1},!1)}if(a===0){var c=r.length===0&&t!==null;if(c){var h=t,f=h.parentNode;av(f),f.append(h),n.items.clear()}gc(e,!c)}else s={pending:new Set(e),done:new Set},(n.outrogroups??(n.outrogroups=new Set)).add(s)}function gc(n,e=!0){for(var t=0;t<n.length;t++)Mt(n[t],e)}var Wh;function En(n,e,t,r,i,s=null){var a=n,l=new Map,c=(e&kf)!==0;if(c){var h=n;a=h.appendChild(Gn())}var f=null,g=Jc(()=>{var C=t();return Pf(C)?C:C==null?[]:rl(C)}),m,T=!0;function k(){A.fallback=f,Ov(A,m,a,e,r),f!==null&&(m.length===0?f.f&jn?(f.f^=jn,$s(f,null,a)):nu(f):oi(f,()=>{f=null}))}var P=tu(()=>{m=y(g);for(var C=m.length,U=new Set,F=le,M=Zf(),j=0;j<C;j+=1){var $=m[j],E=r($,j),_=T?null:l.get(E);_?(_.v&&pi(_.v,$),_.i&&pi(_.i,j),M&&F.skipped_effects.delete(_.e)):(_=Lv(l,T?a:Wh??(Wh=Gn()),$,E,j,i,e,t),T||(_.e.f|=jn),l.set(E,_)),U.add(E)}if(C===0&&s&&!f&&(T?f=Jt(()=>s(a)):(f=Jt(()=>s(Wh??(Wh=Gn()))),f.f|=jn)),!T)if(M){for(const[w,v]of l)U.has(w)||F.skipped_effects.add(v.e);F.oncommit(k),F.ondiscard(()=>{})}else k();y(g)}),A={effect:P,items:l,outrogroups:null,fallback:f};T=!1}function Ov(n,e,t,r,i){var v,I,S,b,Te,we,ge,re,me;var s=(r&w_)!==0,a=e.length,l=n.items,c=n.effect.first,h,f=null,g,m=[],T=[],k,P,A,C;if(s)for(C=0;C<a;C+=1)k=e[C],P=i(k,C),A=l.get(P).e,A.f&jn||((I=(v=A.nodes)==null?void 0:v.a)==null||I.measure(),(g??(g=new Set)).add(A));for(C=0;C<a;C+=1){if(k=e[C],P=i(k,C),A=l.get(P).e,n.outrogroups!==null)for(const Ae of n.outrogroups)Ae.pending.delete(A),Ae.done.delete(A);if(A.f&jn)if(A.f^=jn,A===c)$s(A,null,t);else{var U=f?f.next:c;A===n.effect.last&&(n.effect.last=A.prev),A.prev&&(A.prev.next=A.next),A.next&&(A.next.prev=A.prev),fr(n,f,A),fr(n,A,U),$s(A,U,t),f=A,m=[],T=[],c=f.next;continue}if(A.f&qt&&(nu(A),s&&((b=(S=A.nodes)==null?void 0:S.a)==null||b.unfix(),(g??(g=new Set)).delete(A))),A!==c){if(h!==void 0&&h.has(A)){if(m.length<T.length){var F=T[0],M;f=F.prev;var j=m[0],$=m[m.length-1];for(M=0;M<m.length;M+=1)$s(m[M],F,t);for(M=0;M<T.length;M+=1)h.delete(T[M]);fr(n,j.prev,$.next),fr(n,f,j),fr(n,$,F),c=F,f=$,C-=1,m=[],T=[]}else h.delete(A),$s(A,c,t),fr(n,A.prev,A.next),fr(n,A,f===null?n.effect.first:f.next),fr(n,f,A),f=A;continue}for(m=[],T=[];c!==null&&c!==A;)(h??(h=new Set)).add(c),T.push(c),c=c.next;if(c===null)continue}A.f&jn||m.push(A),f=A,c=A.next}if(n.outrogroups!==null){for(const Ae of n.outrogroups)Ae.pending.size===0&&(gc(rl(Ae.done)),(Te=n.outrogroups)==null||Te.delete(Ae));n.outrogroups.size===0&&(n.outrogroups=null)}if(c!==null||h!==void 0){var E=[];if(h!==void 0)for(A of h)A.f&qt||E.push(A);for(;c!==null;)!(c.f&qt)&&c!==n.fallback&&E.push(c),c=c.next;var _=E.length;if(_>0){var w=r&kf&&a===0?t:null;if(s){for(C=0;C<_;C+=1)(ge=(we=E[C].nodes)==null?void 0:we.a)==null||ge.measure();for(C=0;C<_;C+=1)(me=(re=E[C].nodes)==null?void 0:re.a)==null||me.fix()}Nv(n,E,w)}}s&&gs(()=>{var Ae,je;if(g!==void 0)for(A of g)(je=(Ae=A.nodes)==null?void 0:Ae.a)==null||je.apply()})}function Lv(n,e,t,r,i,s,a,l){var c=a&v_?a&b_?fi(t):he(t,!1,!1):null,h=a&y_?fi(i):null;return{v:c,i:h,e:Jt(()=>(s(e,c??t,h??i,l),()=>{n.delete(r)}))}}function $s(n,e,t){if(n.nodes)for(var r=n.nodes.start,i=n.nodes.end,s=e&&!(e.f&jn)?e.nodes.start:t;r!==null;){var a=Io(r);if(s.before(r),r===i)return;r=a}}function fr(n,e,t){e===null?n.effect.first=t:e.next=t,t===null?n.effect.last=e:t.prev=e}function gp(n){var e,t,r="";if(typeof n=="string"||typeof n=="number")r+=n;else if(typeof n=="object")if(Array.isArray(n)){var i=n.length;for(e=0;e<i;e++)n[e]&&(t=gp(n[e]))&&(r&&(r+=" "),r+=t)}else for(t in n)n[t]&&(r&&(r+=" "),r+=t);return r}function Mv(){for(var n,e,t=0,r="",i=arguments.length;t<i;t++)(n=arguments[t])&&(e=gp(n))&&(r&&(r+=" "),r+=e);return r}function Fv(n){return typeof n=="object"?Mv(n):n??""}function Uv(n,e,t){var r=n==null?"":""+n;return r===""?null:r}function qs(n,e,t,r,i,s){var a=n.__className;if(a!==t||a===void 0){var l=Uv(t);l==null?n.removeAttribute("class"):n.className=l,n.__className=t}return s}const jv=Symbol("is custom element"),Bv=Symbol("is html");function Da(n,e){var t=mp(n);t.value===(t.value=e??void 0)||n.value===e&&(e!==0||n.nodeName!=="PROGRESS")||(n.value=e??"")}function oo(n,e,t,r){var i=mp(n);i[e]!==(i[e]=t)&&(e==="loading"&&(n[N_]=t),t==null?n.removeAttribute(e):typeof t!="string"&&$v(n).includes(e)?n[e]=t:n.setAttribute(e,t))}function mp(n){return n.__attributes??(n.__attributes={[jv]:n.nodeName.includes("-"),[Bv]:n.namespaceURI===R_})}var Gh=new Map;function $v(n){var e=n.getAttribute("is")||n.nodeName,t=Gh.get(e);if(t)return t;Gh.set(e,t=[]);for(var r,i=n,s=Element.prototype;s!==i;){r=xf(i);for(var a in r)r[a].set&&t.push(a);i=Hc(i)}return t}function Pe(n,e,t=e){var r=new WeakSet;cv(n,"input",async i=>{var s=i?n.defaultValue:n.value;if(s=zl(n)?Hl(s):s,t(s),le!==null&&r.add(le),await bv(),s!==(s=e())){var a=n.selectionStart,l=n.selectionEnd,c=n.value.length;if(n.value=s??"",l!==null){var h=n.value.length;a===l&&l===c&&h>c?(n.selectionStart=h,n.selectionEnd=h):(n.selectionStart=a,n.selectionEnd=Math.min(l,h))}}}),Re(e)==null&&n.value&&(t(zl(n)?Hl(n.value):n.value),le!==null&&r.add(le)),ms(()=>{var i=e();if(n===document.activeElement){var s=pa??le;if(r.has(s))return}zl(n)&&i===Hl(n.value)||n.type==="date"&&!i&&!n.value||i!==n.value&&(n.value=i??"")})}function zl(n){var e=n.type;return e==="number"||e==="range"}function Hl(n){return n===""?null:+n}function Kh(n,e){return n===e||(n==null?void 0:n[si])===e}function qv(n={},e,t,r){return fv(()=>{var i,s;return ms(()=>{i=s,s=[],Re(()=>{n!==t(...s)&&(e(n,...s),i&&Kh(t(...i),n)&&e(null,...i))})}),()=>{gs(()=>{s&&Kh(t(...s),n)&&e(null,...s)})}}),n}function zv(n,e,t,r=t){e.addEventListener("input",()=>{r(e[n])}),ms(()=>{var i=t();if(e[n]!==i)if(i==null){var s=e[n];r(s)}else e[n]=i+""})}function Ao(n){return function(...e){var t=e[0];return t.preventDefault(),n==null?void 0:n.apply(this,e)}}function pn(n=!1){const e=Me,t=e.l.u;if(!t)return;let r=()=>Tv(e.s);if(n){let i=0,s={};const a=Qc(()=>{let l=!1;const c=e.s;for(const h in c)c[h]!==s[h]&&(s[h]=c[h],l=!0);return l&&i++,i});r=()=>y(a)}t.b.length&&hv(()=>{Qh(e,r),sc(t.b)}),fc(()=>{const i=Re(()=>t.m.map(x_));return()=>{for(const s of i)typeof s=="function"&&s()}}),t.a.length&&fc(()=>{Qh(e,r),sc(t.a)})}function Qh(n,e){if(n.l.s)for(const t of n.l.s)y(t);e()}function _p(n,e,t){if(n==null)return e(void 0),Wi;const r=Re(()=>n.subscribe(e,t));return r.unsubscribe?()=>r.unsubscribe():r}const Li=[];function Ei(n,e=Wi){let t=null;const r=new Set;function i(l){if(Mf(n,l)&&(n=l,t)){const c=!Li.length;for(const h of r)h[1](),Li.push(h,n);if(c){for(let h=0;h<Li.length;h+=2)Li[h][0](Li[h+1]);Li.length=0}}}function s(l){i(l(n))}function a(l,c=Wi){const h=[l,c];return r.add(h),r.size===1&&(t=e(i,s)||Wi),l(n),()=>{r.delete(h),r.size===0&&t&&(t(),t=null)}}return{set:i,update:s,subscribe:a}}function Hv(n){let e;return _p(n,t=>e=t)(),e}let oa=!1,mc=Symbol();function jr(n,e,t){const r=t[e]??(t[e]={store:null,source:he(void 0),unsubscribe:Wi});if(r.store!==n&&!(mc in t))if(r.unsubscribe(),r.store=n??null,n==null)r.source.v=void 0,r.unsubscribe=Wi;else{var i=!0;r.unsubscribe=_p(n,s=>{i?r.source.v=s:z(r.source,s)}),i=!1}return n&&mc in t?Hv(n):y(r.source)}function Br(){const n={};function e(){Xc(()=>{for(var t in n)n[t].unsubscribe();Cf(n,mc,{enumerable:!1,value:!0})})}return[n,e]}function Wv(n,e,t){return n.set(t),e}function Gv(n){var e=oa;try{return oa=!1,[n(),oa]}finally{oa=e}}function _c(n,e,t,r){var U;var i=!fs||(t&E_)!==0,s=(t&I_)!==0,a=r,l=!0,c=()=>(l&&(l=!1,a=r),a),h;{var f=si in n||V_ in n;h=((U=Hi(n,e))==null?void 0:U.set)??(f&&e in n?F=>n[e]=F:void 0)}var g,m=!1;[g,m]=Gv(()=>n[e]),g===void 0&&r!==void 0&&(g=c(),h&&(i&&j_(),h(g)));var T;if(i?T=()=>{var F=n[e];return F===void 0?c():(l=!0,F)}:T=()=>{var F=n[e];return F!==void 0&&(a=void 0),F===void 0?a:F},i&&!(t&T_))return T;if(h){var k=n.$$legacy;return function(F,M){return arguments.length>0?((!i||!M||k||m)&&h(M?T():F),F):T()}}var P=!1,A=Jc(()=>(P=!1,T()));y(A);var C=be;return function(F,M){if(arguments.length>0){const j=M?y(A):i&&s?$i(F):F;return z(A,j),P=!0,a!==void 0&&(a=j),F}return bi&&P||C.f&Wn?A.v:y(A)}}const Kv=()=>{};var Jh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Qv=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],a=n[t++],l=n[t++],c=((i&7)<<18|(s&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},yp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],a=i+1<n.length,l=a?n[i+1]:0,c=i+2<n.length,h=c?n[i+2]:0,f=s>>2,g=(s&3)<<4|l>>4;let m=(l&15)<<2|h>>6,T=h&63;c||(T=64,a||(m=64)),r.push(t[f],t[g],t[m],t[T])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(vp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Qv(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],l=i<n.length?t[n.charAt(i)]:0;++i;const h=i<n.length?t[n.charAt(i)]:64;++i;const g=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||l==null||h==null||g==null)throw new Jv;const m=s<<2|l>>4;if(r.push(m),h!==64){const T=l<<4&240|h>>2;if(r.push(T),g!==64){const k=h<<6&192|g;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Jv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Yv=function(n){const e=vp(n);return yp.encodeByteArray(e,!0)},Va=function(n){return Yv(n).replace(/\./g,"")},wp=function(n){try{return yp.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xv(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zv=()=>Xv().__FIREBASE_DEFAULTS__,ey=()=>{if(typeof process>"u"||typeof Jh>"u")return;const n=Jh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ty=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&wp(n[1]);return e&&JSON.parse(e)},ll=()=>{try{return Kv()||Zv()||ey()||ty()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},bp=n=>{var e,t;return(t=(e=ll())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},ny=n=>{const e=bp(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Ep=()=>{var n;return(n=ll())===null||n===void 0?void 0:n.config},Tp=n=>{var e;return(e=ll())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vs(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ip(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iy(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Va(JSON.stringify(t)),Va(JSON.stringify(a)),""].join(".")}const Xs={};function sy(){const n={prod:[],emulator:[]};for(const e of Object.keys(Xs))Xs[e]?n.emulator.push(e):n.prod.push(e);return n}function oy(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Yh=!1;function Ap(n,e){if(typeof window>"u"||typeof document>"u"||!vs(window.location.host)||Xs[n]===e||Xs[n]||Yh)return;Xs[n]=e;function t(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=sy().prod.length>0;function a(){const m=document.getElementById(r);m&&m.remove()}function l(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function c(m,T){m.setAttribute("width","24"),m.setAttribute("id",T),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function h(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{Yh=!0,a()},m}function f(m,T){m.setAttribute("id",T),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function g(){const m=oy(r),T=t("text"),k=document.getElementById(T)||document.createElement("span"),P=t("learnmore"),A=document.getElementById(P)||document.createElement("a"),C=t("preprendIcon"),U=document.getElementById(C)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const F=m.element;l(F),f(A,P);const M=h();c(U,C),F.append(U,k,A,M),document.body.appendChild(F)}s?(k.innerText="Preview backend disconnected.",U.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(U.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",T)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function St(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ay(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(St())}function ly(){var n;const e=(n=ll())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function cy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function uy(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function hy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dy(){const n=St();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function fy(){return!ly()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function py(){try{return typeof indexedDB=="object"}catch{return!1}}function gy(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const my="FirebaseError";class nr extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=my,Object.setPrototypeOf(this,nr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,So.prototype.create)}}class So{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?_y(s,r):"Error",l=`${this.serviceName}: ${a} (${i}).`;return new nr(i,l,r)}}function _y(n,e){return n.replace(vy,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const vy=/\{\$([^}]+)}/g;function yy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function gi(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],a=e[i];if(Xh(s)&&Xh(a)){if(!gi(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Xh(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ro(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function zs(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Hs(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function wy(n,e){const t=new by(n,e);return t.subscribe.bind(t)}class by{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Ey(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Wl),i.error===void 0&&(i.error=Wl),i.complete===void 0&&(i.complete=Wl);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ey(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Wl(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(n){return n&&n._delegate?n._delegate:n}class mi{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ty{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new ry;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ay(e))try{this.getOrInitializeService({instanceIdentifier:Jr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Jr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Jr){return this.instances.has(e)}getOptions(e=Jr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&a.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Iy(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Jr){return this.component?this.component.multipleInstances?e:Jr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Iy(n){return n===Jr?void 0:n}function Ay(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sy{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Ty(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ue;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ue||(ue={}));const Ry={debug:ue.DEBUG,verbose:ue.VERBOSE,info:ue.INFO,warn:ue.WARN,error:ue.ERROR,silent:ue.SILENT},ky=ue.INFO,Py={[ue.DEBUG]:"log",[ue.VERBOSE]:"log",[ue.INFO]:"info",[ue.WARN]:"warn",[ue.ERROR]:"error"},Cy=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Py[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ru{constructor(e){this.name=e,this._logLevel=ky,this._logHandler=Cy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ue))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ry[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ue.DEBUG,...e),this._logHandler(this,ue.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ue.VERBOSE,...e),this._logHandler(this,ue.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ue.INFO,...e),this._logHandler(this,ue.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ue.WARN,...e),this._logHandler(this,ue.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ue.ERROR,...e),this._logHandler(this,ue.ERROR,...e)}}const xy=(n,e)=>e.some(t=>n instanceof t);let Zh,ed;function Dy(){return Zh||(Zh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Vy(){return ed||(ed=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Sp=new WeakMap,vc=new WeakMap,Rp=new WeakMap,Gl=new WeakMap,iu=new WeakMap;function Ny(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Sr(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Sp.set(t,n)}).catch(()=>{}),iu.set(e,n),e}function Oy(n){if(vc.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});vc.set(n,e)}let yc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return vc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Rp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Sr(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ly(n){yc=n(yc)}function My(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Kl(this),e,...t);return Rp.set(r,e.sort?e.sort():[e]),Sr(r)}:Vy().includes(n)?function(...e){return n.apply(Kl(this),e),Sr(Sp.get(this))}:function(...e){return Sr(n.apply(Kl(this),e))}}function Fy(n){return typeof n=="function"?My(n):(n instanceof IDBTransaction&&Oy(n),xy(n,Dy())?new Proxy(n,yc):n)}function Sr(n){if(n instanceof IDBRequest)return Ny(n);if(Gl.has(n))return Gl.get(n);const e=Fy(n);return e!==n&&(Gl.set(n,e),iu.set(e,n)),e}const Kl=n=>iu.get(n);function Uy(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(n,e),l=Sr(a);return r&&a.addEventListener("upgradeneeded",c=>{r(Sr(a.result),c.oldVersion,c.newVersion,Sr(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const jy=["get","getKey","getAll","getAllKeys","count"],By=["put","add","delete","clear"],Ql=new Map;function td(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ql.get(e))return Ql.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=By.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||jy.includes(t)))return;const s=async function(a,...l){const c=this.transaction(a,i?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),i&&c.done]))[0]};return Ql.set(e,s),s}Ly(n=>({...n,get:(e,t,r)=>td(e,t)||n.get(e,t,r),has:(e,t)=>!!td(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(qy(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function qy(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const wc="@firebase/app",nd="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn=new ru("@firebase/app"),zy="@firebase/app-compat",Hy="@firebase/analytics-compat",Wy="@firebase/analytics",Gy="@firebase/app-check-compat",Ky="@firebase/app-check",Qy="@firebase/auth",Jy="@firebase/auth-compat",Yy="@firebase/database",Xy="@firebase/data-connect",Zy="@firebase/database-compat",e0="@firebase/functions",t0="@firebase/functions-compat",n0="@firebase/installations",r0="@firebase/installations-compat",i0="@firebase/messaging",s0="@firebase/messaging-compat",o0="@firebase/performance",a0="@firebase/performance-compat",l0="@firebase/remote-config",c0="@firebase/remote-config-compat",u0="@firebase/storage",h0="@firebase/storage-compat",d0="@firebase/firestore",f0="@firebase/ai",p0="@firebase/firestore-compat",g0="firebase",m0="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bc="[DEFAULT]",_0={[wc]:"fire-core",[zy]:"fire-core-compat",[Wy]:"fire-analytics",[Hy]:"fire-analytics-compat",[Ky]:"fire-app-check",[Gy]:"fire-app-check-compat",[Qy]:"fire-auth",[Jy]:"fire-auth-compat",[Yy]:"fire-rtdb",[Xy]:"fire-data-connect",[Zy]:"fire-rtdb-compat",[e0]:"fire-fn",[t0]:"fire-fn-compat",[n0]:"fire-iid",[r0]:"fire-iid-compat",[i0]:"fire-fcm",[s0]:"fire-fcm-compat",[o0]:"fire-perf",[a0]:"fire-perf-compat",[l0]:"fire-rc",[c0]:"fire-rc-compat",[u0]:"fire-gcs",[h0]:"fire-gcs-compat",[d0]:"fire-fst",[p0]:"fire-fst-compat",[f0]:"fire-vertex","fire-js":"fire-js",[g0]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ao=new Map,v0=new Map,Ec=new Map;function rd(n,e){try{n.container.addComponent(e)}catch(t){Jn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ss(n){const e=n.name;if(Ec.has(e))return Jn.debug(`There were multiple attempts to register component ${e}.`),!1;Ec.set(e,n);for(const t of ao.values())rd(t,n);for(const t of v0.values())rd(t,n);return!0}function su(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function an(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Rr=new So("app","Firebase",y0);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w0{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new mi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Rr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ys=m0;function kp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:bc,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw Rr.create("bad-app-name",{appName:String(i)});if(t||(t=Ep()),!t)throw Rr.create("no-options");const s=ao.get(i);if(s){if(gi(t,s.options)&&gi(r,s.config))return s;throw Rr.create("duplicate-app",{appName:i})}const a=new Sy(i);for(const c of Ec.values())a.addComponent(c);const l=new w0(t,r,a);return ao.set(i,l),l}function Pp(n=bc){const e=ao.get(n);if(!e&&n===bc&&Ep())return kp();if(!e)throw Rr.create("no-app",{appName:n});return e}function id(){return Array.from(ao.values())}function kr(n,e,t){var r;let i=(r=_0[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Jn.warn(l.join(" "));return}ss(new mi(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b0="firebase-heartbeat-database",E0=1,lo="firebase-heartbeat-store";let Jl=null;function Cp(){return Jl||(Jl=Uy(b0,E0,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(lo)}catch(t){console.warn(t)}}}}).catch(n=>{throw Rr.create("idb-open",{originalErrorMessage:n.message})})),Jl}async function T0(n){try{const t=(await Cp()).transaction(lo),r=await t.objectStore(lo).get(xp(n));return await t.done,r}catch(e){if(e instanceof nr)Jn.warn(e.message);else{const t=Rr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Jn.warn(t.message)}}}async function sd(n,e){try{const r=(await Cp()).transaction(lo,"readwrite");await r.objectStore(lo).put(e,xp(n)),await r.done}catch(t){if(t instanceof nr)Jn.warn(t.message);else{const r=Rr.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Jn.warn(r.message)}}}function xp(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I0=1024,A0=30;class S0{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new k0(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=od();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>A0){const a=P0(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Jn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=od(),{heartbeatsToSend:r,unsentEntries:i}=R0(this._heartbeatsCache.heartbeats),s=Va(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Jn.warn(t),""}}}function od(){return new Date().toISOString().substring(0,10)}function R0(n,e=I0){const t=[];let r=n.slice();for(const i of n){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),ad(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ad(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class k0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return py()?gy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await T0(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return sd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return sd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ad(n){return Va(JSON.stringify({version:2,heartbeats:n})).length}function P0(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function C0(n){ss(new mi("platform-logger",e=>new $y(e),"PRIVATE")),ss(new mi("heartbeat",e=>new S0(e),"PRIVATE")),kr(wc,nd,n),kr(wc,nd,"esm2017"),kr("fire-js","")}C0("");var x0="firebase",D0="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */kr(x0,D0,"app");var ld=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Pr,Dp;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function w(){}w.prototype=_.prototype,E.D=_.prototype,E.prototype=new w,E.prototype.constructor=E,E.C=function(v,I,S){for(var b=Array(arguments.length-2),Te=2;Te<arguments.length;Te++)b[Te-2]=arguments[Te];return _.prototype[I].apply(v,b)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,_,w){w||(w=0);var v=Array(16);if(typeof _=="string")for(var I=0;16>I;++I)v[I]=_.charCodeAt(w++)|_.charCodeAt(w++)<<8|_.charCodeAt(w++)<<16|_.charCodeAt(w++)<<24;else for(I=0;16>I;++I)v[I]=_[w++]|_[w++]<<8|_[w++]<<16|_[w++]<<24;_=E.g[0],w=E.g[1],I=E.g[2];var S=E.g[3],b=_+(S^w&(I^S))+v[0]+3614090360&4294967295;_=w+(b<<7&4294967295|b>>>25),b=S+(I^_&(w^I))+v[1]+3905402710&4294967295,S=_+(b<<12&4294967295|b>>>20),b=I+(w^S&(_^w))+v[2]+606105819&4294967295,I=S+(b<<17&4294967295|b>>>15),b=w+(_^I&(S^_))+v[3]+3250441966&4294967295,w=I+(b<<22&4294967295|b>>>10),b=_+(S^w&(I^S))+v[4]+4118548399&4294967295,_=w+(b<<7&4294967295|b>>>25),b=S+(I^_&(w^I))+v[5]+1200080426&4294967295,S=_+(b<<12&4294967295|b>>>20),b=I+(w^S&(_^w))+v[6]+2821735955&4294967295,I=S+(b<<17&4294967295|b>>>15),b=w+(_^I&(S^_))+v[7]+4249261313&4294967295,w=I+(b<<22&4294967295|b>>>10),b=_+(S^w&(I^S))+v[8]+1770035416&4294967295,_=w+(b<<7&4294967295|b>>>25),b=S+(I^_&(w^I))+v[9]+2336552879&4294967295,S=_+(b<<12&4294967295|b>>>20),b=I+(w^S&(_^w))+v[10]+4294925233&4294967295,I=S+(b<<17&4294967295|b>>>15),b=w+(_^I&(S^_))+v[11]+2304563134&4294967295,w=I+(b<<22&4294967295|b>>>10),b=_+(S^w&(I^S))+v[12]+1804603682&4294967295,_=w+(b<<7&4294967295|b>>>25),b=S+(I^_&(w^I))+v[13]+4254626195&4294967295,S=_+(b<<12&4294967295|b>>>20),b=I+(w^S&(_^w))+v[14]+2792965006&4294967295,I=S+(b<<17&4294967295|b>>>15),b=w+(_^I&(S^_))+v[15]+1236535329&4294967295,w=I+(b<<22&4294967295|b>>>10),b=_+(I^S&(w^I))+v[1]+4129170786&4294967295,_=w+(b<<5&4294967295|b>>>27),b=S+(w^I&(_^w))+v[6]+3225465664&4294967295,S=_+(b<<9&4294967295|b>>>23),b=I+(_^w&(S^_))+v[11]+643717713&4294967295,I=S+(b<<14&4294967295|b>>>18),b=w+(S^_&(I^S))+v[0]+3921069994&4294967295,w=I+(b<<20&4294967295|b>>>12),b=_+(I^S&(w^I))+v[5]+3593408605&4294967295,_=w+(b<<5&4294967295|b>>>27),b=S+(w^I&(_^w))+v[10]+38016083&4294967295,S=_+(b<<9&4294967295|b>>>23),b=I+(_^w&(S^_))+v[15]+3634488961&4294967295,I=S+(b<<14&4294967295|b>>>18),b=w+(S^_&(I^S))+v[4]+3889429448&4294967295,w=I+(b<<20&4294967295|b>>>12),b=_+(I^S&(w^I))+v[9]+568446438&4294967295,_=w+(b<<5&4294967295|b>>>27),b=S+(w^I&(_^w))+v[14]+3275163606&4294967295,S=_+(b<<9&4294967295|b>>>23),b=I+(_^w&(S^_))+v[3]+4107603335&4294967295,I=S+(b<<14&4294967295|b>>>18),b=w+(S^_&(I^S))+v[8]+1163531501&4294967295,w=I+(b<<20&4294967295|b>>>12),b=_+(I^S&(w^I))+v[13]+2850285829&4294967295,_=w+(b<<5&4294967295|b>>>27),b=S+(w^I&(_^w))+v[2]+4243563512&4294967295,S=_+(b<<9&4294967295|b>>>23),b=I+(_^w&(S^_))+v[7]+1735328473&4294967295,I=S+(b<<14&4294967295|b>>>18),b=w+(S^_&(I^S))+v[12]+2368359562&4294967295,w=I+(b<<20&4294967295|b>>>12),b=_+(w^I^S)+v[5]+4294588738&4294967295,_=w+(b<<4&4294967295|b>>>28),b=S+(_^w^I)+v[8]+2272392833&4294967295,S=_+(b<<11&4294967295|b>>>21),b=I+(S^_^w)+v[11]+1839030562&4294967295,I=S+(b<<16&4294967295|b>>>16),b=w+(I^S^_)+v[14]+4259657740&4294967295,w=I+(b<<23&4294967295|b>>>9),b=_+(w^I^S)+v[1]+2763975236&4294967295,_=w+(b<<4&4294967295|b>>>28),b=S+(_^w^I)+v[4]+1272893353&4294967295,S=_+(b<<11&4294967295|b>>>21),b=I+(S^_^w)+v[7]+4139469664&4294967295,I=S+(b<<16&4294967295|b>>>16),b=w+(I^S^_)+v[10]+3200236656&4294967295,w=I+(b<<23&4294967295|b>>>9),b=_+(w^I^S)+v[13]+681279174&4294967295,_=w+(b<<4&4294967295|b>>>28),b=S+(_^w^I)+v[0]+3936430074&4294967295,S=_+(b<<11&4294967295|b>>>21),b=I+(S^_^w)+v[3]+3572445317&4294967295,I=S+(b<<16&4294967295|b>>>16),b=w+(I^S^_)+v[6]+76029189&4294967295,w=I+(b<<23&4294967295|b>>>9),b=_+(w^I^S)+v[9]+3654602809&4294967295,_=w+(b<<4&4294967295|b>>>28),b=S+(_^w^I)+v[12]+3873151461&4294967295,S=_+(b<<11&4294967295|b>>>21),b=I+(S^_^w)+v[15]+530742520&4294967295,I=S+(b<<16&4294967295|b>>>16),b=w+(I^S^_)+v[2]+3299628645&4294967295,w=I+(b<<23&4294967295|b>>>9),b=_+(I^(w|~S))+v[0]+4096336452&4294967295,_=w+(b<<6&4294967295|b>>>26),b=S+(w^(_|~I))+v[7]+1126891415&4294967295,S=_+(b<<10&4294967295|b>>>22),b=I+(_^(S|~w))+v[14]+2878612391&4294967295,I=S+(b<<15&4294967295|b>>>17),b=w+(S^(I|~_))+v[5]+4237533241&4294967295,w=I+(b<<21&4294967295|b>>>11),b=_+(I^(w|~S))+v[12]+1700485571&4294967295,_=w+(b<<6&4294967295|b>>>26),b=S+(w^(_|~I))+v[3]+2399980690&4294967295,S=_+(b<<10&4294967295|b>>>22),b=I+(_^(S|~w))+v[10]+4293915773&4294967295,I=S+(b<<15&4294967295|b>>>17),b=w+(S^(I|~_))+v[1]+2240044497&4294967295,w=I+(b<<21&4294967295|b>>>11),b=_+(I^(w|~S))+v[8]+1873313359&4294967295,_=w+(b<<6&4294967295|b>>>26),b=S+(w^(_|~I))+v[15]+4264355552&4294967295,S=_+(b<<10&4294967295|b>>>22),b=I+(_^(S|~w))+v[6]+2734768916&4294967295,I=S+(b<<15&4294967295|b>>>17),b=w+(S^(I|~_))+v[13]+1309151649&4294967295,w=I+(b<<21&4294967295|b>>>11),b=_+(I^(w|~S))+v[4]+4149444226&4294967295,_=w+(b<<6&4294967295|b>>>26),b=S+(w^(_|~I))+v[11]+3174756917&4294967295,S=_+(b<<10&4294967295|b>>>22),b=I+(_^(S|~w))+v[2]+718787259&4294967295,I=S+(b<<15&4294967295|b>>>17),b=w+(S^(I|~_))+v[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(I+(b<<21&4294967295|b>>>11))&4294967295,E.g[2]=E.g[2]+I&4294967295,E.g[3]=E.g[3]+S&4294967295}r.prototype.u=function(E,_){_===void 0&&(_=E.length);for(var w=_-this.blockSize,v=this.B,I=this.h,S=0;S<_;){if(I==0)for(;S<=w;)i(this,E,S),S+=this.blockSize;if(typeof E=="string"){for(;S<_;)if(v[I++]=E.charCodeAt(S++),I==this.blockSize){i(this,v),I=0;break}}else for(;S<_;)if(v[I++]=E[S++],I==this.blockSize){i(this,v),I=0;break}}this.h=I,this.o+=_},r.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;var w=8*this.o;for(_=E.length-8;_<E.length;++_)E[_]=w&255,w/=256;for(this.u(E),E=Array(16),_=w=0;4>_;++_)for(var v=0;32>v;v+=8)E[w++]=this.g[_]>>>v&255;return E};function s(E,_){var w=l;return Object.prototype.hasOwnProperty.call(w,E)?w[E]:w[E]=_(E)}function a(E,_){this.h=_;for(var w=[],v=!0,I=E.length-1;0<=I;I--){var S=E[I]|0;v&&S==_||(w[I]=S,v=!1)}this.g=w}var l={};function c(E){return-128<=E&&128>E?s(E,function(_){return new a([_|0],0>_?-1:0)}):new a([E|0],0>E?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return g;if(0>E)return A(h(-E));for(var _=[],w=1,v=0;E>=w;v++)_[v]=E/w|0,w*=4294967296;return new a(_,0)}function f(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return A(f(E.substring(1),_));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var w=h(Math.pow(_,8)),v=g,I=0;I<E.length;I+=8){var S=Math.min(8,E.length-I),b=parseInt(E.substring(I,I+S),_);8>S?(S=h(Math.pow(_,S)),v=v.j(S).add(h(b))):(v=v.j(w),v=v.add(h(b)))}return v}var g=c(0),m=c(1),T=c(16777216);n=a.prototype,n.m=function(){if(P(this))return-A(this).m();for(var E=0,_=1,w=0;w<this.g.length;w++){var v=this.i(w);E+=(0<=v?v:4294967296+v)*_,_*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(k(this))return"0";if(P(this))return"-"+A(this).toString(E);for(var _=h(Math.pow(E,6)),w=this,v="";;){var I=M(w,_).g;w=C(w,I.j(_));var S=((0<w.g.length?w.g[0]:w.h)>>>0).toString(E);if(w=I,k(w))return S+v;for(;6>S.length;)S="0"+S;v=S+v}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function k(E){if(E.h!=0)return!1;for(var _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function P(E){return E.h==-1}n.l=function(E){return E=C(this,E),P(E)?-1:k(E)?0:1};function A(E){for(var _=E.g.length,w=[],v=0;v<_;v++)w[v]=~E.g[v];return new a(w,~E.h).add(m)}n.abs=function(){return P(this)?A(this):this},n.add=function(E){for(var _=Math.max(this.g.length,E.g.length),w=[],v=0,I=0;I<=_;I++){var S=v+(this.i(I)&65535)+(E.i(I)&65535),b=(S>>>16)+(this.i(I)>>>16)+(E.i(I)>>>16);v=b>>>16,S&=65535,b&=65535,w[I]=b<<16|S}return new a(w,w[w.length-1]&-2147483648?-1:0)};function C(E,_){return E.add(A(_))}n.j=function(E){if(k(this)||k(E))return g;if(P(this))return P(E)?A(this).j(A(E)):A(A(this).j(E));if(P(E))return A(this.j(A(E)));if(0>this.l(T)&&0>E.l(T))return h(this.m()*E.m());for(var _=this.g.length+E.g.length,w=[],v=0;v<2*_;v++)w[v]=0;for(v=0;v<this.g.length;v++)for(var I=0;I<E.g.length;I++){var S=this.i(v)>>>16,b=this.i(v)&65535,Te=E.i(I)>>>16,we=E.i(I)&65535;w[2*v+2*I]+=b*we,U(w,2*v+2*I),w[2*v+2*I+1]+=S*we,U(w,2*v+2*I+1),w[2*v+2*I+1]+=b*Te,U(w,2*v+2*I+1),w[2*v+2*I+2]+=S*Te,U(w,2*v+2*I+2)}for(v=0;v<_;v++)w[v]=w[2*v+1]<<16|w[2*v];for(v=_;v<2*_;v++)w[v]=0;return new a(w,0)};function U(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function F(E,_){this.g=E,this.h=_}function M(E,_){if(k(_))throw Error("division by zero");if(k(E))return new F(g,g);if(P(E))return _=M(A(E),_),new F(A(_.g),A(_.h));if(P(_))return _=M(E,A(_)),new F(A(_.g),_.h);if(30<E.g.length){if(P(E)||P(_))throw Error("slowDivide_ only works with positive integers.");for(var w=m,v=_;0>=v.l(E);)w=j(w),v=j(v);var I=$(w,1),S=$(v,1);for(v=$(v,2),w=$(w,2);!k(v);){var b=S.add(v);0>=b.l(E)&&(I=I.add(w),S=b),v=$(v,1),w=$(w,1)}return _=C(E,I.j(_)),new F(I,_)}for(I=g;0<=E.l(_);){for(w=Math.max(1,Math.floor(E.m()/_.m())),v=Math.ceil(Math.log(w)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),S=h(w),b=S.j(_);P(b)||0<b.l(E);)w-=v,S=h(w),b=S.j(_);k(S)&&(S=m),I=I.add(S),E=C(E,b)}return new F(I,E)}n.A=function(E){return M(this,E).h},n.and=function(E){for(var _=Math.max(this.g.length,E.g.length),w=[],v=0;v<_;v++)w[v]=this.i(v)&E.i(v);return new a(w,this.h&E.h)},n.or=function(E){for(var _=Math.max(this.g.length,E.g.length),w=[],v=0;v<_;v++)w[v]=this.i(v)|E.i(v);return new a(w,this.h|E.h)},n.xor=function(E){for(var _=Math.max(this.g.length,E.g.length),w=[],v=0;v<_;v++)w[v]=this.i(v)^E.i(v);return new a(w,this.h^E.h)};function j(E){for(var _=E.g.length+1,w=[],v=0;v<_;v++)w[v]=E.i(v)<<1|E.i(v-1)>>>31;return new a(w,E.h)}function $(E,_){var w=_>>5;_%=32;for(var v=E.g.length-w,I=[],S=0;S<v;S++)I[S]=0<_?E.i(S+w)>>>_|E.i(S+w+1)<<32-_:E.i(S+w);return new a(I,E.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Dp=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Pr=a}).apply(typeof ld<"u"?ld:typeof self<"u"?self:typeof window<"u"?window:{});var aa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Vp,Ws,Np,_a,Tc,Op,Lp,Mp;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,d){return o==Array.prototype||o==Object.prototype||(o[u]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof aa=="object"&&aa];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function i(o,u){if(u)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var R=o[p];if(!(R in d))break e;d=d[R]}o=o[o.length-1],p=d[o],u=u(p),u!=p&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}function s(o,u){o instanceof String&&(o+="");var d=0,p=!1,R={next:function(){if(!p&&d<o.length){var D=d++;return{value:u(D,o[D]),done:!1}}return p=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}i("Array.prototype.values",function(o){return o||function(){return s(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function c(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function f(o,u,d){return o.call.apply(o.bind,arguments)}function g(o,u,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,p),o.apply(u,R)}}return function(){return o.apply(u,arguments)}}function m(o,u,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:g,m.apply(null,arguments)}function T(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function k(o,u){function d(){}d.prototype=u.prototype,o.aa=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,R,D){for(var B=Array(arguments.length-2),ke=2;ke<arguments.length;ke++)B[ke-2]=arguments[ke];return u.prototype[R].apply(p,B)}}function P(o){const u=o.length;if(0<u){const d=Array(u);for(let p=0;p<u;p++)d[p]=o[p];return d}return[]}function A(o,u){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(c(p)){const R=o.length||0,D=p.length||0;o.length=R+D;for(let B=0;B<D;B++)o[R+B]=p[B]}else o.push(p)}}class C{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function U(o){return/^[\s\xa0]*$/.test(o)}function F(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function M(o){return M[" "](o),o}M[" "]=function(){};var j=F().indexOf("Gecko")!=-1&&!(F().toLowerCase().indexOf("webkit")!=-1&&F().indexOf("Edge")==-1)&&!(F().indexOf("Trident")!=-1||F().indexOf("MSIE")!=-1)&&F().indexOf("Edge")==-1;function $(o,u,d){for(const p in o)u.call(d,o[p],p,o)}function E(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function _(o){const u={};for(const d in o)u[d]=o[d];return u}const w="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,u){let d,p;for(let R=1;R<arguments.length;R++){p=arguments[R];for(d in p)o[d]=p[d];for(let D=0;D<w.length;D++)d=w[D],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function I(o){var u=1;o=o.split(":");const d=[];for(;0<u&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function S(o){l.setTimeout(()=>{throw o},0)}function b(){var o=Ae;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class Te{constructor(){this.h=this.g=null}add(u,d){const p=we.get();p.set(u,d),this.h?this.h.next=p:this.g=p,this.h=p}}var we=new C(()=>new ge,o=>o.reset());class ge{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let re,me=!1,Ae=new Te,je=()=>{const o=l.Promise.resolve(void 0);re=()=>{o.then(st)}};var st=()=>{for(var o;o=b();){try{o.h.call(o.g)}catch(d){S(d)}var u=we;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}me=!1};function ce(){this.s=this.s,this.C=this.C}ce.prototype.s=!1,ce.prototype.ma=function(){this.s||(this.s=!0,this.N())},ce.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ee(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}ee.prototype.h=function(){this.defaultPrevented=!0};var Be=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};l.addEventListener("test",d,u),l.removeEventListener("test",d,u)}catch{}return o}();function $e(o,u){if(ee.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(j){e:{try{M(u.nodeName);var R=!0;break e}catch{}R=!1}R||(u=null)}}else d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement);this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:yt[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&$e.aa.h.call(this)}}k($e,ee);var yt={2:"touch",3:"pen",4:"mouse"};$e.prototype.h=function(){$e.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ie="closure_listenable_"+(1e6*Math.random()|0),Z=0;function Le(o,u,d,p,R){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!p,this.ha=R,this.key=++Z,this.da=this.fa=!1}function He(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function Fe(o){this.src=o,this.g={},this.h=0}Fe.prototype.add=function(o,u,d,p,R){var D=o.toString();o=this.g[D],o||(o=this.g[D]=[],this.h++);var B=ir(o,u,p,R);return-1<B?(u=o[B],d||(u.fa=!1)):(u=new Le(u,this.src,D,!!p,R),u.fa=d,o.push(u)),u};function Ln(o,u){var d=u.type;if(d in o.g){var p=o.g[d],R=Array.prototype.indexOf.call(p,u,void 0),D;(D=0<=R)&&Array.prototype.splice.call(p,R,1),D&&(He(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function ir(o,u,d,p){for(var R=0;R<o.length;++R){var D=o[R];if(!D.da&&D.listener==u&&D.capture==!!d&&D.ha==p)return R}return-1}var sr="closure_lm_"+(1e6*Math.random()|0),or={};function ki(o,u,d,p,R){if(Array.isArray(u)){for(var D=0;D<u.length;D++)ki(o,u[D],d,p,R);return null}return d=jo(d),o&&o[Ie]?o.K(u,d,h(p)?!!p.capture:!1,R):Qe(o,u,d,!1,p,R)}function Qe(o,u,d,p,R,D){if(!u)throw Error("Invalid event type");var B=h(R)?!!R.capture:!!R,ke=As(o);if(ke||(o[sr]=ke=new Fe(o)),d=ke.add(u,d,p,B,D),d.proxy)return d;if(p=ar(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)Be||(R=B),R===void 0&&(R=!1),o.addEventListener(u.toString(),p,R);else if(o.attachEvent)o.attachEvent(Fo(u.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function ar(){function o(d){return u.call(o.src,o.listener,d)}const u=Uo;return o}function lr(o,u,d,p,R){if(Array.isArray(u))for(var D=0;D<u.length;D++)lr(o,u[D],d,p,R);else p=h(p)?!!p.capture:!!p,d=jo(d),o&&o[Ie]?(o=o.i,u=String(u).toString(),u in o.g&&(D=o.g[u],d=ir(D,d,p,R),-1<d&&(He(D[d]),Array.prototype.splice.call(D,d,1),D.length==0&&(delete o.g[u],o.h--)))):o&&(o=As(o))&&(u=o.g[u.toString()],o=-1,u&&(o=ir(u,d,p,R)),(d=-1<o?u[o]:null)&&qr(d))}function qr(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Ie])Ln(u.i,o);else{var d=o.type,p=o.proxy;u.removeEventListener?u.removeEventListener(d,p,o.capture):u.detachEvent?u.detachEvent(Fo(d),p):u.addListener&&u.removeListener&&u.removeListener(p),(d=As(u))?(Ln(d,o),d.h==0&&(d.src=null,u[sr]=null)):He(o)}}}function Fo(o){return o in or?or[o]:or[o]="on"+o}function Uo(o,u){if(o.da)o=!0;else{u=new $e(u,this);var d=o.listener,p=o.ha||o.src;o.fa&&qr(o),o=d.call(p,u)}return o}function As(o){return o=o[sr],o instanceof Fe?o:null}var Pi="__closure_events_fn_"+(1e9*Math.random()>>>0);function jo(o){return typeof o=="function"?o:(o[Pi]||(o[Pi]=function(u){return o.handleEvent(u)}),o[Pi])}function tt(){ce.call(this),this.i=new Fe(this),this.M=this,this.F=null}k(tt,ce),tt.prototype[Ie]=!0,tt.prototype.removeEventListener=function(o,u,d,p){lr(this,o,u,d,p)};function ct(o,u){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=u.type||u,typeof u=="string")u=new ee(u,o);else if(u instanceof ee)u.target=u.target||o;else{var R=u;u=new ee(p,o),v(u,R)}if(R=!0,d)for(var D=d.length-1;0<=D;D--){var B=u.g=d[D];R=zr(B,p,!0,u)&&R}if(B=u.g=o,R=zr(B,p,!0,u)&&R,R=zr(B,p,!1,u)&&R,d)for(D=0;D<d.length;D++)B=u.g=d[D],R=zr(B,p,!1,u)&&R}tt.prototype.N=function(){if(tt.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var d=o.g[u],p=0;p<d.length;p++)He(d[p]);delete o.g[u],o.h--}}this.F=null},tt.prototype.K=function(o,u,d,p){return this.i.add(String(o),u,!1,d,p)},tt.prototype.L=function(o,u,d,p){return this.i.add(String(o),u,!0,d,p)};function zr(o,u,d,p){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var R=!0,D=0;D<u.length;++D){var B=u[D];if(B&&!B.da&&B.capture==d){var ke=B.listener,ht=B.ha||B.src;B.fa&&Ln(o.i,B),R=ke.call(ht,p)!==!1&&R}}return R&&!p.defaultPrevented}function Bo(o,u,d){if(typeof o=="function")d&&(o=m(o,d));else if(o&&typeof o.handleEvent=="function")o=m(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(o,u||0)}function Ss(o){o.g=Bo(()=>{o.g=null,o.i&&(o.i=!1,Ss(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Cl extends ce{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Ss(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Hr(o){ce.call(this),this.h=o,this.g={}}k(Hr,ce);var Rs=[];function $o(o){$(o.g,function(u,d){this.g.hasOwnProperty(d)&&qr(u)},o),o.g={}}Hr.prototype.N=function(){Hr.aa.N.call(this),$o(this)},Hr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Q=l.JSON.stringify,Se=l.JSON.parse,Ce=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function Je(){}Je.prototype.h=null;function ut(o){return o.h||(o.h=o.i())}function Dt(){}var nt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ut(){ee.call(this,"d")}k(Ut,ee);function Wr(){ee.call(this,"c")}k(Wr,ee);var Vt={},nn=null;function Ci(){return nn=nn||new tt}Vt.La="serverreachability";function Ku(o){ee.call(this,Vt.La,o)}k(Ku,ee);function ks(o){const u=Ci();ct(u,new Ku(u))}Vt.STAT_EVENT="statevent";function Qu(o,u){ee.call(this,Vt.STAT_EVENT,o),this.stat=u}k(Qu,ee);function kt(o){const u=Ci();ct(u,new Qu(u,o))}Vt.Ma="timingevent";function Ju(o,u){ee.call(this,Vt.Ma,o),this.size=u}k(Ju,ee);function Ps(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},u)}function Cs(){this.g=!0}Cs.prototype.xa=function(){this.g=!1};function zm(o,u,d,p,R,D){o.info(function(){if(o.g)if(D)for(var B="",ke=D.split("&"),ht=0;ht<ke.length;ht++){var ve=ke[ht].split("=");if(1<ve.length){var wt=ve[0];ve=ve[1];var bt=wt.split("_");B=2<=bt.length&&bt[1]=="type"?B+(wt+"="+ve+"&"):B+(wt+"=redacted&")}}else B=null;else B=D;return"XMLHTTP REQ ("+p+") [attempt "+R+"]: "+u+`
`+d+`
`+B})}function Hm(o,u,d,p,R,D,B){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+R+"]: "+u+`
`+d+`
`+D+" "+B})}function xi(o,u,d,p){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Gm(o,d)+(p?" "+p:"")})}function Wm(o,u){o.info(function(){return"TIMEOUT: "+u})}Cs.prototype.info=function(){};function Gm(o,u){if(!o.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var R=p[1];if(Array.isArray(R)&&!(1>R.length)){var D=R[0];if(D!="noop"&&D!="stop"&&D!="close")for(var B=1;B<R.length;B++)R[B]=""}}}}return Q(d)}catch{return u}}var qo={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Yu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},xl;function zo(){}k(zo,Je),zo.prototype.g=function(){return new XMLHttpRequest},zo.prototype.i=function(){return{}},xl=new zo;function cr(o,u,d,p){this.j=o,this.i=u,this.l=d,this.R=p||1,this.U=new Hr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Xu}function Xu(){this.i=null,this.g="",this.h=!1}var Zu={},Dl={};function Vl(o,u,d){o.L=1,o.v=Ko(Mn(u)),o.m=d,o.P=!0,eh(o,null)}function eh(o,u){o.F=Date.now(),Ho(o),o.A=Mn(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),ph(d.i,"t",p),o.C=0,d=o.j.J,o.h=new Xu,o.g=Dh(o.j,d?u:null,!o.m),0<o.O&&(o.M=new Cl(m(o.Y,o,o.g),o.O)),u=o.U,d=o.g,p=o.ca;var R="readystatechange";Array.isArray(R)||(R&&(Rs[0]=R.toString()),R=Rs);for(var D=0;D<R.length;D++){var B=ki(d,R[D],p||u.handleEvent,!1,u.h||u);if(!B)break;u.g[B.key]=B}u=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),ks(),zm(o.i,o.u,o.A,o.l,o.R,o.m)}cr.prototype.ca=function(o){o=o.target;const u=this.M;u&&Fn(o)==3?u.j():this.Y(o)},cr.prototype.Y=function(o){try{if(o==this.g)e:{const bt=Fn(this.g);var u=this.g.Ba();const Ni=this.g.Z();if(!(3>bt)&&(bt!=3||this.g&&(this.h.h||this.g.oa()||bh(this.g)))){this.J||bt!=4||u==7||(u==8||0>=Ni?ks(3):ks(2)),Nl(this);var d=this.g.Z();this.X=d;t:if(th(this)){var p=bh(this.g);o="";var R=p.length,D=Fn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Gr(this),xs(this);var B="";break t}this.h.i=new l.TextDecoder}for(u=0;u<R;u++)this.h.h=!0,o+=this.h.i.decode(p[u],{stream:!(D&&u==R-1)});p.length=0,this.h.g+=o,this.C=0,B=this.h.g}else B=this.g.oa();if(this.o=d==200,Hm(this.i,this.u,this.A,this.l,this.R,bt,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ke,ht=this.g;if((ke=ht.g?ht.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!U(ke)){var ve=ke;break t}}ve=null}if(d=ve)xi(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ol(this,d);else{this.o=!1,this.s=3,kt(12),Gr(this),xs(this);break e}}if(this.P){d=!0;let rn;for(;!this.J&&this.C<B.length;)if(rn=Km(this,B),rn==Dl){bt==4&&(this.s=4,kt(14),d=!1),xi(this.i,this.l,null,"[Incomplete Response]");break}else if(rn==Zu){this.s=4,kt(15),xi(this.i,this.l,B,"[Invalid Chunk]"),d=!1;break}else xi(this.i,this.l,rn,null),Ol(this,rn);if(th(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),bt!=4||B.length!=0||this.h.h||(this.s=1,kt(16),d=!1),this.o=this.o&&d,!d)xi(this.i,this.l,B,"[Invalid Chunked Response]"),Gr(this),xs(this);else if(0<B.length&&!this.W){this.W=!0;var wt=this.j;wt.g==this&&wt.ba&&!wt.M&&(wt.j.info("Great, no buffering proxy detected. Bytes received: "+B.length),Bl(wt),wt.M=!0,kt(11))}}else xi(this.i,this.l,B,null),Ol(this,B);bt==4&&Gr(this),this.o&&!this.J&&(bt==4?kh(this.j,this):(this.o=!1,Ho(this)))}else h_(this.g),d==400&&0<B.indexOf("Unknown SID")?(this.s=3,kt(12)):(this.s=0,kt(13)),Gr(this),xs(this)}}}catch{}finally{}};function th(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Km(o,u){var d=o.C,p=u.indexOf(`
`,d);return p==-1?Dl:(d=Number(u.substring(d,p)),isNaN(d)?Zu:(p+=1,p+d>u.length?Dl:(u=u.slice(p,p+d),o.C=p+d,u)))}cr.prototype.cancel=function(){this.J=!0,Gr(this)};function Ho(o){o.S=Date.now()+o.I,nh(o,o.I)}function nh(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Ps(m(o.ba,o),u)}function Nl(o){o.B&&(l.clearTimeout(o.B),o.B=null)}cr.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Wm(this.i,this.A),this.L!=2&&(ks(),kt(17)),Gr(this),this.s=2,xs(this)):nh(this,this.S-o)};function xs(o){o.j.G==0||o.J||kh(o.j,o)}function Gr(o){Nl(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,$o(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function Ol(o,u){try{var d=o.j;if(d.G!=0&&(d.g==o||Ll(d.h,o))){if(!o.K&&Ll(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var R=p;if(R[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)ea(d),Xo(d);else break e;jl(d),kt(18)}}else d.za=R[1],0<d.za-d.T&&37500>R[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ps(m(d.Za,d),6e3));if(1>=sh(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Qr(d,11)}else if((o.K||d.g==o)&&ea(d),!U(u))for(R=d.Da.g.parse(u),u=0;u<R.length;u++){let ve=R[u];if(d.T=ve[0],ve=ve[1],d.G==2)if(ve[0]=="c"){d.K=ve[1],d.ia=ve[2];const wt=ve[3];wt!=null&&(d.la=wt,d.j.info("VER="+d.la));const bt=ve[4];bt!=null&&(d.Aa=bt,d.j.info("SVER="+d.Aa));const Ni=ve[5];Ni!=null&&typeof Ni=="number"&&0<Ni&&(p=1.5*Ni,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const rn=o.g;if(rn){const na=rn.g?rn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(na){var D=p.h;D.g||na.indexOf("spdy")==-1&&na.indexOf("quic")==-1&&na.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(Ml(D,D.h),D.h=null))}if(p.D){const $l=rn.g?rn.g.getResponseHeader("X-HTTP-Session-Id"):null;$l&&(p.ya=$l,xe(p.I,p.D,$l))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var B=o;if(p.qa=xh(p,p.J?p.ia:null,p.W),B.K){oh(p.h,B);var ke=B,ht=p.L;ht&&(ke.I=ht),ke.B&&(Nl(ke),Ho(ke)),p.g=B}else Sh(p);0<d.i.length&&Zo(d)}else ve[0]!="stop"&&ve[0]!="close"||Qr(d,7);else d.G==3&&(ve[0]=="stop"||ve[0]=="close"?ve[0]=="stop"?Qr(d,7):Ul(d):ve[0]!="noop"&&d.l&&d.l.ta(ve),d.v=0)}}ks(4)}catch{}}var Qm=class{constructor(o,u){this.g=o,this.map=u}};function rh(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ih(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function sh(o){return o.h?1:o.g?o.g.size:0}function Ll(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Ml(o,u){o.g?o.g.add(u):o.h=u}function oh(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}rh.prototype.cancel=function(){if(this.i=ah(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ah(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.D);return u}return P(o.i)}function Jm(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var u=[],d=o.length,p=0;p<d;p++)u.push(o[p]);return u}u=[],d=0;for(p in o)u[d++]=o[p];return u}function Ym(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var u=[];o=o.length;for(var d=0;d<o;d++)u.push(d);return u}u=[],d=0;for(const p in o)u[d++]=p;return u}}}function lh(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var d=Ym(o),p=Jm(o),R=p.length,D=0;D<R;D++)u.call(void 0,p[D],d&&d[D],o)}var ch=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xm(o,u){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),R=null;if(0<=p){var D=o[d].substring(0,p);R=o[d].substring(p+1)}else D=o[d];u(D,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Kr(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Kr){this.h=o.h,Wo(this,o.j),this.o=o.o,this.g=o.g,Go(this,o.s),this.l=o.l;var u=o.i,d=new Ns;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),uh(this,d),this.m=o.m}else o&&(u=String(o).match(ch))?(this.h=!1,Wo(this,u[1]||"",!0),this.o=Ds(u[2]||""),this.g=Ds(u[3]||"",!0),Go(this,u[4]),this.l=Ds(u[5]||"",!0),uh(this,u[6]||"",!0),this.m=Ds(u[7]||"")):(this.h=!1,this.i=new Ns(null,this.h))}Kr.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Vs(u,hh,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Vs(u,hh,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Vs(d,d.charAt(0)=="/"?t_:e_,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Vs(d,r_)),o.join("")};function Mn(o){return new Kr(o)}function Wo(o,u,d){o.j=d?Ds(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Go(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function uh(o,u,d){u instanceof Ns?(o.i=u,i_(o.i,o.h)):(d||(u=Vs(u,n_)),o.i=new Ns(u,o.h))}function xe(o,u,d){o.i.set(u,d)}function Ko(o){return xe(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Ds(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Vs(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,Zm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Zm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var hh=/[#\/\?@]/g,e_=/[#\?:]/g,t_=/[#\?]/g,n_=/[#\?@]/g,r_=/#/g;function Ns(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function ur(o){o.g||(o.g=new Map,o.h=0,o.i&&Xm(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=Ns.prototype,n.add=function(o,u){ur(this),this.i=null,o=Di(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function dh(o,u){ur(o),u=Di(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function fh(o,u){return ur(o),u=Di(o,u),o.g.has(u)}n.forEach=function(o,u){ur(this),this.g.forEach(function(d,p){d.forEach(function(R){o.call(u,R,p,this)},this)},this)},n.na=function(){ur(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let p=0;p<u.length;p++){const R=o[p];for(let D=0;D<R.length;D++)d.push(u[p])}return d},n.V=function(o){ur(this);let u=[];if(typeof o=="string")fh(this,o)&&(u=u.concat(this.g.get(Di(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)u=u.concat(o[d])}return u},n.set=function(o,u){return ur(this),this.i=null,o=Di(this,o),fh(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function ph(o,u,d){dh(o,u),0<d.length&&(o.i=null,o.g.set(Di(o,u),P(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var p=u[d];const D=encodeURIComponent(String(p)),B=this.V(p);for(p=0;p<B.length;p++){var R=D;B[p]!==""&&(R+="="+encodeURIComponent(String(B[p]))),o.push(R)}}return this.i=o.join("&")};function Di(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function i_(o,u){u&&!o.j&&(ur(o),o.i=null,o.g.forEach(function(d,p){var R=p.toLowerCase();p!=R&&(dh(this,p),ph(this,R,d))},o)),o.j=u}function s_(o,u){const d=new Cs;if(l.Image){const p=new Image;p.onload=T(hr,d,"TestLoadImage: loaded",!0,u,p),p.onerror=T(hr,d,"TestLoadImage: error",!1,u,p),p.onabort=T(hr,d,"TestLoadImage: abort",!1,u,p),p.ontimeout=T(hr,d,"TestLoadImage: timeout",!1,u,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else u(!1)}function o_(o,u){const d=new Cs,p=new AbortController,R=setTimeout(()=>{p.abort(),hr(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:p.signal}).then(D=>{clearTimeout(R),D.ok?hr(d,"TestPingServer: ok",!0,u):hr(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(R),hr(d,"TestPingServer: error",!1,u)})}function hr(o,u,d,p,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),p(d)}catch{}}function a_(){this.g=new Ce}function l_(o,u,d){const p=d||"";try{lh(o,function(R,D){let B=R;h(R)&&(B=Q(R)),u.push(p+D+"="+encodeURIComponent(B))})}catch(R){throw u.push(p+"type="+encodeURIComponent("_badmap")),R}}function Qo(o){this.l=o.Ub||null,this.j=o.eb||!1}k(Qo,Je),Qo.prototype.g=function(){return new Jo(this.l,this.j)},Qo.prototype.i=function(o){return function(){return o}}({});function Jo(o,u){tt.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Jo,tt),n=Jo.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,Ls(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Os(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Ls(this)),this.g&&(this.readyState=3,Ls(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;gh(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function gh(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Os(this):Ls(this),this.readyState==3&&gh(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Os(this))},n.Qa=function(o){this.g&&(this.response=o,Os(this))},n.ga=function(){this.g&&Os(this)};function Os(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Ls(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function Ls(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Jo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function mh(o){let u="";return $(o,function(d,p){u+=p,u+=":",u+=d,u+=`\r
`}),u}function Fl(o,u,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=mh(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):xe(o,u,d))}function qe(o){tt.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(qe,tt);var c_=/^https?$/i,u_=["POST","PUT"];n=qe.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():xl.g(),this.v=this.o?ut(this.o):ut(xl),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(D){_h(this,D);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var R in p)d.set(R,p[R]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const D of p.keys())d.set(D,p.get(D));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(D=>D.toLowerCase()=="content-type"),R=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(u_,u,void 0))||p||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,B]of d)this.g.setRequestHeader(D,B);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{wh(this),this.u=!0,this.g.send(o),this.u=!1}catch(D){_h(this,D)}};function _h(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,vh(o),Yo(o)}function vh(o){o.A||(o.A=!0,ct(o,"complete"),ct(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ct(this,"complete"),ct(this,"abort"),Yo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Yo(this,!0)),qe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?yh(this):this.bb())},n.bb=function(){yh(this)};function yh(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Fn(o)!=4||o.Z()!=2)){if(o.u&&Fn(o)==4)Bo(o.Ea,0,o);else if(ct(o,"readystatechange"),Fn(o)==4){o.h=!1;try{const B=o.Z();e:switch(B){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var p;if(p=B===0){var R=String(o.D).match(ch)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),p=!c_.test(R?R.toLowerCase():"")}d=p}if(d)ct(o,"complete"),ct(o,"success");else{o.m=6;try{var D=2<Fn(o)?o.g.statusText:""}catch{D=""}o.l=D+" ["+o.Z()+"]",vh(o)}}finally{Yo(o)}}}}function Yo(o,u){if(o.g){wh(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||ct(o,"ready");try{d.onreadystatechange=p}catch{}}}function wh(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function Fn(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<Fn(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Se(u)}};function bh(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function h_(o){const u={};o=(o.g&&2<=Fn(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(U(o[p]))continue;var d=I(o[p]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const D=u[R]||[];u[R]=D,D.push(d)}E(u,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ms(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function Eh(o){this.Aa=0,this.i=[],this.j=new Cs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ms("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ms("baseRetryDelayMs",5e3,o),this.cb=Ms("retryDelaySeedMs",1e4,o),this.Wa=Ms("forwardChannelMaxRetries",2,o),this.wa=Ms("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new rh(o&&o.concurrentRequestLimit),this.Da=new a_,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Eh.prototype,n.la=8,n.G=1,n.connect=function(o,u,d,p){kt(0),this.W=o,this.H=u||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=xh(this,null,this.W),Zo(this)};function Ul(o){if(Th(o),o.G==3){var u=o.U++,d=Mn(o.I);if(xe(d,"SID",o.K),xe(d,"RID",u),xe(d,"TYPE","terminate"),Fs(o,d),u=new cr(o,o.j,u),u.L=2,u.v=Ko(Mn(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=u.v,d=!0),d||(u.g=Dh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ho(u)}Ch(o)}function Xo(o){o.g&&(Bl(o),o.g.cancel(),o.g=null)}function Th(o){Xo(o),o.u&&(l.clearTimeout(o.u),o.u=null),ea(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function Zo(o){if(!ih(o.h)&&!o.s){o.s=!0;var u=o.Ga;re||je(),me||(re(),me=!0),Ae.add(u,o),o.B=0}}function d_(o,u){return sh(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Ps(m(o.Ga,o,u),Ph(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const R=new cr(this,this.j,o);let D=this.o;if(this.S&&(D?(D=_(D),v(D,this.S)):D=this.S),this.m!==null||this.O||(R.H=D,D=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(u+=p,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Ah(this,R,u),d=Mn(this.I),xe(d,"RID",o),xe(d,"CVER",22),this.D&&xe(d,"X-HTTP-Session-Id",this.D),Fs(this,d),D&&(this.O?u="headers="+encodeURIComponent(String(mh(D)))+"&"+u:this.m&&Fl(d,this.m,D)),Ml(this.h,R),this.Ua&&xe(d,"TYPE","init"),this.P?(xe(d,"$req",u),xe(d,"SID","null"),R.T=!0,Vl(R,d,null)):Vl(R,d,u),this.G=2}}else this.G==3&&(o?Ih(this,o):this.i.length==0||ih(this.h)||Ih(this))};function Ih(o,u){var d;u?d=u.l:d=o.U++;const p=Mn(o.I);xe(p,"SID",o.K),xe(p,"RID",d),xe(p,"AID",o.T),Fs(o,p),o.m&&o.o&&Fl(p,o.m,o.o),d=new cr(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Ah(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ml(o.h,d),Vl(d,p,u)}function Fs(o,u){o.H&&$(o.H,function(d,p){xe(u,p,d)}),o.l&&lh({},function(d,p){xe(u,p,d)})}function Ah(o,u,d){d=Math.min(o.i.length,d);var p=o.l?m(o.l.Na,o.l,o):null;e:{var R=o.i;let D=-1;for(;;){const B=["count="+d];D==-1?0<d?(D=R[0].g,B.push("ofs="+D)):D=0:B.push("ofs="+D);let ke=!0;for(let ht=0;ht<d;ht++){let ve=R[ht].g;const wt=R[ht].map;if(ve-=D,0>ve)D=Math.max(0,R[ht].g-100),ke=!1;else try{l_(wt,B,"req"+ve+"_")}catch{p&&p(wt)}}if(ke){p=B.join("&");break e}}}return o=o.i.splice(0,d),u.D=o,p}function Sh(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;re||je(),me||(re(),me=!0),Ae.add(u,o),o.v=0}}function jl(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Ps(m(o.Fa,o),Ph(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Rh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Ps(m(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,kt(10),Xo(this),Rh(this))};function Bl(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Rh(o){o.g=new cr(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=Mn(o.qa);xe(u,"RID","rpc"),xe(u,"SID",o.K),xe(u,"AID",o.T),xe(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&xe(u,"TO",o.ja),xe(u,"TYPE","xmlhttp"),Fs(o,u),o.m&&o.o&&Fl(u,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Ko(Mn(u)),d.m=null,d.P=!0,eh(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Xo(this),jl(this),kt(19))};function ea(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function kh(o,u){var d=null;if(o.g==u){ea(o),Bl(o),o.g=null;var p=2}else if(Ll(o.h,u))d=u.D,oh(o.h,u),p=1;else return;if(o.G!=0){if(u.o)if(p==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var R=o.B;p=Ci(),ct(p,new Ju(p,d)),Zo(o)}else Sh(o);else if(R=u.s,R==3||R==0&&0<u.X||!(p==1&&d_(o,u)||p==2&&jl(o)))switch(d&&0<d.length&&(u=o.h,u.i=u.i.concat(d)),R){case 1:Qr(o,5);break;case 4:Qr(o,10);break;case 3:Qr(o,6);break;default:Qr(o,2)}}}function Ph(o,u){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*u}function Qr(o,u){if(o.j.info("Error code "+u),u==2){var d=m(o.fb,o),p=o.Xa;const R=!p;p=new Kr(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Wo(p,"https"),Ko(p),R?s_(p.toString(),d):o_(p.toString(),d)}else kt(2);o.G=0,o.l&&o.l.sa(u),Ch(o),Th(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),kt(2)):(this.j.info("Failed to ping google.com"),kt(1))};function Ch(o){if(o.G=0,o.ka=[],o.l){const u=ah(o.h);(u.length!=0||o.i.length!=0)&&(A(o.ka,u),A(o.ka,o.i),o.h.i.length=0,P(o.i),o.i.length=0),o.l.ra()}}function xh(o,u,d){var p=d instanceof Kr?Mn(d):new Kr(d);if(p.g!="")u&&(p.g=u+"."+p.g),Go(p,p.s);else{var R=l.location;p=R.protocol,u=u?u+"."+R.hostname:R.hostname,R=+R.port;var D=new Kr(null);p&&Wo(D,p),u&&(D.g=u),R&&Go(D,R),d&&(D.l=d),p=D}return d=o.D,u=o.ya,d&&u&&xe(p,d,u),xe(p,"VER",o.la),Fs(o,p),p}function Dh(o,u,d){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new qe(new Qo({eb:d})):new qe(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Vh(){}n=Vh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ta(){}ta.prototype.g=function(o,u){return new jt(o,u)};function jt(o,u){tt.call(this),this.g=new Eh(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!U(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!U(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new Vi(this)}k(jt,tt),jt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},jt.prototype.close=function(){Ul(this.g)},jt.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=Q(o),o=d);u.i.push(new Qm(u.Ya++,o)),u.G==3&&Zo(u)},jt.prototype.N=function(){this.g.l=null,delete this.j,Ul(this.g),delete this.g,jt.aa.N.call(this)};function Nh(o){Ut.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}k(Nh,Ut);function Oh(){Wr.call(this),this.status=1}k(Oh,Wr);function Vi(o){this.g=o}k(Vi,Vh),Vi.prototype.ua=function(){ct(this.g,"a")},Vi.prototype.ta=function(o){ct(this.g,new Nh(o))},Vi.prototype.sa=function(o){ct(this.g,new Oh)},Vi.prototype.ra=function(){ct(this.g,"b")},ta.prototype.createWebChannel=ta.prototype.g,jt.prototype.send=jt.prototype.o,jt.prototype.open=jt.prototype.m,jt.prototype.close=jt.prototype.close,Mp=function(){return new ta},Lp=function(){return Ci()},Op=Vt,Tc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},qo.NO_ERROR=0,qo.TIMEOUT=8,qo.HTTP_ERROR=6,_a=qo,Yu.COMPLETE="complete",Np=Yu,Dt.EventType=nt,nt.OPEN="a",nt.CLOSE="b",nt.ERROR="c",nt.MESSAGE="d",tt.prototype.listen=tt.prototype.K,Ws=Dt,qe.prototype.listenOnce=qe.prototype.L,qe.prototype.getLastError=qe.prototype.Ka,qe.prototype.getLastErrorCode=qe.prototype.Ba,qe.prototype.getStatus=qe.prototype.Z,qe.prototype.getResponseJson=qe.prototype.Oa,qe.prototype.getResponseText=qe.prototype.oa,qe.prototype.send=qe.prototype.ea,qe.prototype.setWithCredentials=qe.prototype.Ha,Vp=qe}).apply(typeof aa<"u"?aa:typeof self<"u"?self:typeof window<"u"?window:{});const cd="@firebase/firestore",ud="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}It.UNAUTHENTICATED=new It(null),It.GOOGLE_CREDENTIALS=new It("google-credentials-uid"),It.FIRST_PARTY=new It("first-party-uid"),It.MOCK_USER=new It("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ws="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i=new ru("@firebase/firestore");function Mi(){return _i.logLevel}function H(n,...e){if(_i.logLevel<=ue.DEBUG){const t=e.map(ou);_i.debug(`Firestore (${ws}): ${n}`,...t)}}function Yn(n,...e){if(_i.logLevel<=ue.ERROR){const t=e.map(ou);_i.error(`Firestore (${ws}): ${n}`,...t)}}function Vr(n,...e){if(_i.logLevel<=ue.WARN){const t=e.map(ou);_i.warn(`Firestore (${ws}): ${n}`,...t)}}function ou(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function X(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Fp(n,r,t)}function Fp(n,e,t){let r=`FIRESTORE (${ws}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Yn(r),new Error(r)}function Ee(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Fp(e,i,r)}function ne(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class W extends nr{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class V0{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(It.UNAUTHENTICATED))}shutdown(){}}class N0{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class O0{constructor(e){this.t=e,this.currentUser=It.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Ee(this.o===void 0,42304);let r=this.i;const i=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let s=new Kn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Kn,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const c=s;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},l=c=>{H("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(H("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Kn)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(H("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Ee(typeof r.accessToken=="string",31837,{l:r}),new Up(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Ee(e===null||typeof e=="string",2055,{h:e}),new It(e)}}class L0{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=It.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class M0{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new L0(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(It.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class hd{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class F0{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,an(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Ee(this.o===void 0,3512);const r=s=>{s.error!=null&&H("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,H("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{H("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):H("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new hd(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Ee(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new hd(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U0(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jp(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=U0(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function ae(n,e){return n<e?-1:n>e?1:0}function Ic(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return ae(r,i);{const s=jp(),a=j0(s.encode(dd(n,t)),s.encode(dd(e,t)));return a!==0?a:ae(r,i)}}t+=r>65535?2:1}return ae(n.length,e.length)}function dd(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function j0(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return ae(n[t],e[t]);return ae(n.length,e.length)}function os(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fd="__name__";class mn{constructor(e,t,r){t===void 0?t=0:t>e.length&&X(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&X(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return mn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof mn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=mn.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return ae(e.length,t.length)}static compareSegments(e,t){const r=mn.isNumericId(e),i=mn.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?mn.extractNumericId(e).compare(mn.extractNumericId(t)):Ic(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Pr.fromString(e.substring(4,e.length-2))}}class De extends mn{construct(e,t,r){return new De(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new W(L.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new De(t)}static emptyPath(){return new De([])}}const B0=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ft extends mn{construct(e,t,r){return new ft(e,t,r)}static isValidIdentifier(e){return B0.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ft.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===fd}static keyField(){return new ft([fd])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new W(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new W(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new W(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else l==="`"?(a=!a,i++):l!=="."||a?(r+=l,i++):(s(),i++)}if(s(),a)throw new W(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ft(t)}static emptyPath(){return new ft([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G{constructor(e){this.path=e}static fromPath(e){return new G(De.fromString(e))}static fromName(e){return new G(De.fromString(e).popFirst(5))}static empty(){return new G(De.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&De.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return De.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new G(new De(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bp(n,e,t){if(!t)throw new W(L.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function $0(n,e,t,r){if(e===!0&&r===!0)throw new W(L.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function pd(n){if(!G.isDocumentKey(n))throw new W(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function gd(n){if(G.isDocumentKey(n))throw new W(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function $p(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function lu(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":X(12329,{type:typeof n})}function In(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new W(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=lu(n);throw new W(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(n,e){const t={typeString:n};return e&&(t.value=e),t}function ko(n,e){if(!$p(n))throw new W(L.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new W(L.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const md=-62135596800,_d=1e6;class Ve{static now(){return Ve.fromMillis(Date.now())}static fromDate(e){return Ve.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*_d);return new Ve(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new W(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new W(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<md)throw new W(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new W(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/_d}_compareTo(e){return this.seconds===e.seconds?ae(this.nanoseconds,e.nanoseconds):ae(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ve._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ko(e,Ve._jsonSchema))return new Ve(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-md;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ve._jsonSchemaVersion="firestore/timestamp/1.0",Ve._jsonSchema={type:Ze("string",Ve._jsonSchemaVersion),seconds:Ze("number"),nanoseconds:Ze("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te{static fromTimestamp(e){return new te(e)}static min(){return new te(new Ve(0,0))}static max(){return new te(new Ve(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const co=-1;function q0(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=te.fromTimestamp(r===1e9?new Ve(t+1,0):new Ve(t,r));return new Nr(i,G.empty(),e)}function z0(n){return new Nr(n.readTime,n.key,co)}class Nr{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Nr(te.min(),G.empty(),co)}static max(){return new Nr(te.max(),G.empty(),co)}}function H0(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=G.comparator(n.documentKey,e.documentKey),t!==0?t:ae(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W0="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class G0{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bs(n){if(n.code!==L.FAILED_PRECONDITION||n.message!==W0)throw n;H("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&X(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new O((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof O?t:O.resolve(t)}catch(t){return O.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):O.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):O.reject(t)}static resolve(e){return new O((t,r)=>{t(e)})}static reject(e){return new O((t,r)=>{r(e)})}static waitFor(e){return new O((t,r)=>{let i=0,s=0,a=!1;e.forEach(l=>{++i,l.next(()=>{++s,a&&s===i&&t()},c=>r(c))}),a=!0,s===i&&t()})}static or(e){let t=O.resolve(!1);for(const r of e)t=t.next(i=>i?O.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new O((r,i)=>{const s=e.length,a=new Array(s);let l=0;for(let c=0;c<s;c++){const h=c;t(e[h]).next(f=>{a[h]=f,++l,l===s&&r(a)},f=>i(f))}})}static doWhile(e,t){return new O((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function K0(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Es(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cl{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}cl.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cu=-1;function ul(n){return n==null}function Na(n){return n===0&&1/n==-1/0}function Q0(n){return typeof n=="number"&&Number.isInteger(n)&&!Na(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qp="";function J0(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=vd(e)),e=Y0(n.get(t),e);return vd(e)}function Y0(n,e){let t=e;const r=n.length;for(let i=0;i<r;i++){const s=n.charAt(i);switch(s){case"\0":t+="";break;case qp:t+="";break;default:t+=s}}return t}function vd(n){return n+qp+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yd(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ti(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function zp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e,t){this.comparator=e,this.root=t||dt.EMPTY}insert(e,t){return new Ue(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,dt.BLACK,null,null))}remove(e){return new Ue(this.comparator,this.root.remove(e,this.comparator).copy(null,null,dt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new la(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new la(this.root,e,this.comparator,!1)}getReverseIterator(){return new la(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new la(this.root,e,this.comparator,!0)}}class la{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class dt{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??dt.RED,this.left=i??dt.EMPTY,this.right=s??dt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new dt(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return dt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return dt.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,dt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,dt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw X(43730,{key:this.key,value:this.value});if(this.right.isRed())throw X(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw X(27949);return e+(this.isRed()?0:1)}}dt.EMPTY=null,dt.RED=!0,dt.BLACK=!1;dt.EMPTY=new class{constructor(){this.size=0}get key(){throw X(57766)}get value(){throw X(16141)}get color(){throw X(16727)}get left(){throw X(29726)}get right(){throw X(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new dt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class it{constructor(e){this.comparator=e,this.data=new Ue(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new wd(this.data.getIterator())}getIteratorFrom(e){return new wd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof it)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new it(this.comparator);return t.data=e,t}}class wd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ln{constructor(e){this.fields=e,e.sort(ft.comparator)}static empty(){return new ln([])}unionWith(e){let t=new it(ft.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ln(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return os(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hp extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Hp("Invalid base64 string: "+s):s}}(e);return new vt(t)}static fromUint8Array(e){const t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new vt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ae(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}vt.EMPTY_BYTE_STRING=new vt("");const X0=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Or(n){if(Ee(!!n,39018),typeof n=="string"){let e=0;const t=X0.exec(n);if(Ee(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ge(n.seconds),nanos:Ge(n.nanos)}}function Ge(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Lr(n){return typeof n=="string"?vt.fromBase64String(n):vt.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wp="server_timestamp",Gp="__type__",Kp="__previous_value__",Qp="__local_write_time__";function uu(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Gp])===null||t===void 0?void 0:t.stringValue)===Wp}function hl(n){const e=n.mapValue.fields[Kp];return uu(e)?hl(e):e}function uo(n){const e=Or(n.mapValue.fields[Qp].timestampValue);return new Ve(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z0{constructor(e,t,r,i,s,a,l,c,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=f}}const Oa="(default)";class ho{constructor(e,t){this.projectId=e,this.database=t||Oa}static empty(){return new ho("","")}get isDefaultDatabase(){return this.database===Oa}isEqual(e){return e instanceof ho&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jp="__type__",ew="__max__",ca={mapValue:{}},Yp="__vector__",La="value";function Mr(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?uu(n)?4:nw(n)?9007199254740991:tw(n)?10:11:X(28295,{value:n})}function Dn(n,e){if(n===e)return!0;const t=Mr(n);if(t!==Mr(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return uo(n).isEqual(uo(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=Or(i.timestampValue),l=Or(s.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Lr(i.bytesValue).isEqual(Lr(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return Ge(i.geoPointValue.latitude)===Ge(s.geoPointValue.latitude)&&Ge(i.geoPointValue.longitude)===Ge(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Ge(i.integerValue)===Ge(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=Ge(i.doubleValue),l=Ge(s.doubleValue);return a===l?Na(a)===Na(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return os(n.arrayValue.values||[],e.arrayValue.values||[],Dn);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},l=s.mapValue.fields||{};if(yd(a)!==yd(l))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(l[c]===void 0||!Dn(a[c],l[c])))return!1;return!0}(n,e);default:return X(52216,{left:n})}}function fo(n,e){return(n.values||[]).find(t=>Dn(t,e))!==void 0}function as(n,e){if(n===e)return 0;const t=Mr(n),r=Mr(e);if(t!==r)return ae(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ae(n.booleanValue,e.booleanValue);case 2:return function(s,a){const l=Ge(s.integerValue||s.doubleValue),c=Ge(a.integerValue||a.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(n,e);case 3:return bd(n.timestampValue,e.timestampValue);case 4:return bd(uo(n),uo(e));case 5:return Ic(n.stringValue,e.stringValue);case 6:return function(s,a){const l=Lr(s),c=Lr(a);return l.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){const l=s.split("/"),c=a.split("/");for(let h=0;h<l.length&&h<c.length;h++){const f=ae(l[h],c[h]);if(f!==0)return f}return ae(l.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){const l=ae(Ge(s.latitude),Ge(a.latitude));return l!==0?l:ae(Ge(s.longitude),Ge(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return Ed(n.arrayValue,e.arrayValue);case 10:return function(s,a){var l,c,h,f;const g=s.fields||{},m=a.fields||{},T=(l=g[La])===null||l===void 0?void 0:l.arrayValue,k=(c=m[La])===null||c===void 0?void 0:c.arrayValue,P=ae(((h=T==null?void 0:T.values)===null||h===void 0?void 0:h.length)||0,((f=k==null?void 0:k.values)===null||f===void 0?void 0:f.length)||0);return P!==0?P:Ed(T,k)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===ca.mapValue&&a===ca.mapValue)return 0;if(s===ca.mapValue)return 1;if(a===ca.mapValue)return-1;const l=s.fields||{},c=Object.keys(l),h=a.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let g=0;g<c.length&&g<f.length;++g){const m=Ic(c[g],f[g]);if(m!==0)return m;const T=as(l[c[g]],h[f[g]]);if(T!==0)return T}return ae(c.length,f.length)}(n.mapValue,e.mapValue);default:throw X(23264,{le:t})}}function bd(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ae(n,e);const t=Or(n),r=Or(e),i=ae(t.seconds,r.seconds);return i!==0?i:ae(t.nanos,r.nanos)}function Ed(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=as(t[i],r[i]);if(s)return s}return ae(t.length,r.length)}function ls(n){return Ac(n)}function Ac(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Or(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Lr(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return G.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Ac(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${Ac(t.fields[a])}`;return i+"}"}(n.mapValue):X(61005,{value:n})}function va(n){switch(Mr(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=hl(n);return e?16+va(e):16;case 5:return 2*n.stringValue.length;case 6:return Lr(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+va(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Ti(r.fields,(s,a)=>{i+=s.length+va(a)}),i}(n.mapValue);default:throw X(13486,{value:n})}}function Sc(n){return!!n&&"integerValue"in n}function hu(n){return!!n&&"arrayValue"in n}function Td(n){return!!n&&"nullValue"in n}function Id(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ya(n){return!!n&&"mapValue"in n}function tw(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Jp])===null||t===void 0?void 0:t.stringValue)===Yp}function Zs(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Ti(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Zs(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Zs(n.arrayValue.values[t]);return e}return Object.assign({},n)}function nw(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===ew}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt{constructor(e){this.value=e}static empty(){return new Yt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ya(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Zs(t)}setAll(e){let t=ft.emptyPath(),r={},i=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=l.popLast()}a?r[l.lastSegment()]=Zs(a):i.push(l.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());ya(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Dn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];ya(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Ti(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Yt(Zs(this.value))}}function Xp(n){const e=[];return Ti(n.fields,(t,r)=>{const i=new ft([t]);if(ya(r)){const s=Xp(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new ln(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e,t,r,i,s,a,l){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=a,this.documentState=l}static newInvalidDocument(e){return new At(e,0,te.min(),te.min(),te.min(),Yt.empty(),0)}static newFoundDocument(e,t,r,i){return new At(e,1,t,te.min(),r,i,0)}static newNoDocument(e,t){return new At(e,2,t,te.min(),te.min(),Yt.empty(),0)}static newUnknownDocument(e,t){return new At(e,3,t,te.min(),te.min(),Yt.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(te.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Yt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Yt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=te.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof At&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new At(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(e,t){this.position=e,this.inclusive=t}}function Ad(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],a=n.position[i];if(s.field.isKeyField()?r=G.comparator(G.fromName(a.referenceValue),t.key):r=as(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Sd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Dn(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fa{constructor(e,t="asc"){this.field=e,this.dir=t}}function rw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{}class rt extends Zp{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new sw(e,t,r):t==="array-contains"?new lw(e,r):t==="in"?new cw(e,r):t==="not-in"?new uw(e,r):t==="array-contains-any"?new hw(e,r):new rt(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new ow(e,r):new aw(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(as(t,this.value)):t!==null&&Mr(this.value)===Mr(t)&&this.matchesComparison(as(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return X(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Vn extends Zp{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new Vn(e,t)}matches(e){return eg(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function eg(n){return n.op==="and"}function tg(n){return iw(n)&&eg(n)}function iw(n){for(const e of n.filters)if(e instanceof Vn)return!1;return!0}function Rc(n){if(n instanceof rt)return n.field.canonicalString()+n.op.toString()+ls(n.value);if(tg(n))return n.filters.map(e=>Rc(e)).join(",");{const e=n.filters.map(t=>Rc(t)).join(",");return`${n.op}(${e})`}}function ng(n,e){return n instanceof rt?function(r,i){return i instanceof rt&&r.op===i.op&&r.field.isEqual(i.field)&&Dn(r.value,i.value)}(n,e):n instanceof Vn?function(r,i){return i instanceof Vn&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,l)=>s&&ng(a,i.filters[l]),!0):!1}(n,e):void X(19439)}function rg(n){return n instanceof rt?function(t){return`${t.field.canonicalString()} ${t.op} ${ls(t.value)}`}(n):n instanceof Vn?function(t){return t.op.toString()+" {"+t.getFilters().map(rg).join(" ,")+"}"}(n):"Filter"}class sw extends rt{constructor(e,t,r){super(e,t,r),this.key=G.fromName(r.referenceValue)}matches(e){const t=G.comparator(e.key,this.key);return this.matchesComparison(t)}}class ow extends rt{constructor(e,t){super(e,"in",t),this.keys=ig("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class aw extends rt{constructor(e,t){super(e,"not-in",t),this.keys=ig("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function ig(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>G.fromName(r.referenceValue))}class lw extends rt{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return hu(t)&&fo(t.arrayValue,this.value)}}class cw extends rt{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&fo(this.value.arrayValue,t)}}class uw extends rt{constructor(e,t){super(e,"not-in",t)}matches(e){if(fo(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!fo(this.value.arrayValue,t)}}class hw extends rt{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!hu(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>fo(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dw{constructor(e,t=null,r=[],i=[],s=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=l,this.Pe=null}}function Rd(n,e=null,t=[],r=[],i=null,s=null,a=null){return new dw(n,e,t,r,i,s,a)}function du(n){const e=ne(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Rc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),ul(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>ls(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>ls(r)).join(",")),e.Pe=t}return e.Pe}function fu(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!rw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!ng(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Sd(n.startAt,e.startAt)&&Sd(n.endAt,e.endAt)}function kc(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dl{constructor(e,t=null,r=[],i=[],s=null,a="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=l,this.endAt=c,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function fw(n,e,t,r,i,s,a,l){return new dl(n,e,t,r,i,s,a,l)}function fl(n){return new dl(n)}function kd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function pw(n){return n.collectionGroup!==null}function eo(n){const e=ne(n);if(e.Te===null){e.Te=[];const t=new Set;for(const s of e.explicitOrderBy)e.Te.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new it(ft.comparator);return a.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Te.push(new Fa(s,r))}),t.has(ft.keyField().canonicalString())||e.Te.push(new Fa(ft.keyField(),r))}return e.Te}function An(n){const e=ne(n);return e.Ie||(e.Ie=gw(e,eo(n))),e.Ie}function gw(n,e){if(n.limitType==="F")return Rd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Fa(i.field,s)});const t=n.endAt?new Ma(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ma(n.startAt.position,n.startAt.inclusive):null;return Rd(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Pc(n,e,t){return new dl(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function pl(n,e){return fu(An(n),An(e))&&n.limitType===e.limitType}function sg(n){return`${du(An(n))}|lt:${n.limitType}`}function Fi(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>rg(i)).join(", ")}]`),ul(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>ls(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>ls(i)).join(",")),`Target(${r})`}(An(n))}; limitType=${n.limitType})`}function gl(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):G.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of eo(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,l,c){const h=Ad(a,l,c);return a.inclusive?h<=0:h<0}(r.startAt,eo(r),i)||r.endAt&&!function(a,l,c){const h=Ad(a,l,c);return a.inclusive?h>=0:h>0}(r.endAt,eo(r),i))}(n,e)}function mw(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function og(n){return(e,t)=>{let r=!1;for(const i of eo(n)){const s=_w(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function _w(n,e,t){const r=n.field.isKeyField()?G.comparator(e.key,t.key):function(s,a,l){const c=a.data.field(s),h=l.data.field(s);return c!==null&&h!==null?as(c,h):X(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return X(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Ti(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return zp(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vw=new Ue(G.comparator);function Xn(){return vw}const ag=new Ue(G.comparator);function Gs(...n){let e=ag;for(const t of n)e=e.insert(t.key,t);return e}function lg(n){let e=ag;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Xr(){return to()}function cg(){return to()}function to(){return new Ii(n=>n.toString(),(n,e)=>n.isEqual(e))}const yw=new Ue(G.comparator),ww=new it(G.comparator);function de(...n){let e=ww;for(const t of n)e=e.add(t);return e}const bw=new it(ae);function Ew(){return bw}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Na(e)?"-0":e}}function ug(n){return{integerValue:""+n}}function Tw(n,e){return Q0(e)?ug(e):pu(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(){this._=void 0}}function Iw(n,e,t){return n instanceof Ua?function(i,s){const a={fields:{[Gp]:{stringValue:Wp},[Qp]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&uu(s)&&(s=hl(s)),s&&(a.fields[Kp]=s),{mapValue:a}}(t,e):n instanceof po?dg(n,e):n instanceof go?fg(n,e):function(i,s){const a=hg(i,s),l=Pd(a)+Pd(i.Ee);return Sc(a)&&Sc(i.Ee)?ug(l):pu(i.serializer,l)}(n,e)}function Aw(n,e,t){return n instanceof po?dg(n,e):n instanceof go?fg(n,e):t}function hg(n,e){return n instanceof ja?function(r){return Sc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class Ua extends ml{}class po extends ml{constructor(e){super(),this.elements=e}}function dg(n,e){const t=pg(e);for(const r of n.elements)t.some(i=>Dn(i,r))||t.push(r);return{arrayValue:{values:t}}}class go extends ml{constructor(e){super(),this.elements=e}}function fg(n,e){let t=pg(e);for(const r of n.elements)t=t.filter(i=>!Dn(i,r));return{arrayValue:{values:t}}}class ja extends ml{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function Pd(n){return Ge(n.integerValue||n.doubleValue)}function pg(n){return hu(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Sw(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof po&&i instanceof po||r instanceof go&&i instanceof go?os(r.elements,i.elements,Dn):r instanceof ja&&i instanceof ja?Dn(r.Ee,i.Ee):r instanceof Ua&&i instanceof Ua}(n.transform,e.transform)}class Rw{constructor(e,t){this.version=e,this.transformResults=t}}class Qn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Qn}static exists(e){return new Qn(void 0,e)}static updateTime(e){return new Qn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function wa(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class _l{}function gg(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new _g(n.key,Qn.none()):new Po(n.key,n.data,Qn.none());{const t=n.data,r=Yt.empty();let i=new it(ft.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Ai(n.key,r,new ln(i.toArray()),Qn.none())}}function kw(n,e,t){n instanceof Po?function(i,s,a){const l=i.value.clone(),c=xd(i.fieldTransforms,s,a.transformResults);l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Ai?function(i,s,a){if(!wa(i.precondition,s))return void s.convertToUnknownDocument(a.version);const l=xd(i.fieldTransforms,s,a.transformResults),c=s.data;c.setAll(mg(i)),c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function no(n,e,t,r){return n instanceof Po?function(s,a,l,c){if(!wa(s.precondition,a))return l;const h=s.value.clone(),f=Dd(s.fieldTransforms,c,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ai?function(s,a,l,c){if(!wa(s.precondition,a))return l;const h=Dd(s.fieldTransforms,c,a),f=a.data;return f.setAll(mg(s)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(s,a,l){return wa(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function Pw(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=hg(r.transform,i||null);s!=null&&(t===null&&(t=Yt.empty()),t.set(r.field,s))}return t||null}function Cd(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&os(r,i,(s,a)=>Sw(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Po extends _l{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Ai extends _l{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function mg(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function xd(n,e,t){const r=new Map;Ee(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let i=0;i<t.length;i++){const s=n[i],a=s.transform,l=e.data.field(s.field);r.set(s.field,Aw(a,l,t[i]))}return r}function Dd(n,e,t){const r=new Map;for(const i of n){const s=i.transform,a=t.data.field(i.field);r.set(i.field,Iw(s,a,e))}return r}class _g extends _l{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Cw extends _l{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&kw(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=no(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=no(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=cg();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let l=this.applyToLocalView(a,s.mutatedFields);l=t.has(i.key)?null:l;const c=gg(a,l);c!==null&&r.set(i.key,c),a.isValidDocument()||a.convertToNoDocument(te.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),de())}isEqual(e){return this.batchId===e.batchId&&os(this.mutations,e.mutations,(t,r)=>Cd(t,r))&&os(this.baseMutations,e.baseMutations,(t,r)=>Cd(t,r))}}class gu{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){Ee(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return yw}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new gu(e,t,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Ye,pe;function Nw(n){switch(n){case L.OK:return X(64938);case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0;default:return X(15467,{code:n})}}function vg(n){if(n===void 0)return Yn("GRPC error has no .code"),L.UNKNOWN;switch(n){case Ye.OK:return L.OK;case Ye.CANCELLED:return L.CANCELLED;case Ye.UNKNOWN:return L.UNKNOWN;case Ye.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case Ye.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case Ye.INTERNAL:return L.INTERNAL;case Ye.UNAVAILABLE:return L.UNAVAILABLE;case Ye.UNAUTHENTICATED:return L.UNAUTHENTICATED;case Ye.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case Ye.NOT_FOUND:return L.NOT_FOUND;case Ye.ALREADY_EXISTS:return L.ALREADY_EXISTS;case Ye.PERMISSION_DENIED:return L.PERMISSION_DENIED;case Ye.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case Ye.ABORTED:return L.ABORTED;case Ye.OUT_OF_RANGE:return L.OUT_OF_RANGE;case Ye.UNIMPLEMENTED:return L.UNIMPLEMENTED;case Ye.DATA_LOSS:return L.DATA_LOSS;default:return X(39323,{code:n})}}(pe=Ye||(Ye={}))[pe.OK=0]="OK",pe[pe.CANCELLED=1]="CANCELLED",pe[pe.UNKNOWN=2]="UNKNOWN",pe[pe.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",pe[pe.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",pe[pe.NOT_FOUND=5]="NOT_FOUND",pe[pe.ALREADY_EXISTS=6]="ALREADY_EXISTS",pe[pe.PERMISSION_DENIED=7]="PERMISSION_DENIED",pe[pe.UNAUTHENTICATED=16]="UNAUTHENTICATED",pe[pe.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",pe[pe.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",pe[pe.ABORTED=10]="ABORTED",pe[pe.OUT_OF_RANGE=11]="OUT_OF_RANGE",pe[pe.UNIMPLEMENTED=12]="UNIMPLEMENTED",pe[pe.INTERNAL=13]="INTERNAL",pe[pe.UNAVAILABLE=14]="UNAVAILABLE",pe[pe.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ow=new Pr([4294967295,4294967295],0);function Vd(n){const e=jp().encode(n),t=new Dp;return t.update(e),new Uint8Array(t.digest())}function Nd(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Pr([t,r],0),new Pr([i,s],0)]}class mu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ks(`Invalid padding: ${t}`);if(r<0)throw new Ks(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ks(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ks(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Pr.fromNumber(this.fe)}pe(e,t,r){let i=e.add(t.multiply(Pr.fromNumber(r)));return i.compare(Ow)===1&&(i=new Pr([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=Vd(e),[r,i]=Nd(t);for(let s=0;s<this.hashCount;s++){const a=this.pe(r,i,s);if(!this.ye(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new mu(s,i,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.fe===0)return;const t=Vd(e),[r,i]=Nd(t);for(let s=0;s<this.hashCount;s++){const a=this.pe(r,i,s);this.we(a)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ks extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,Co.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new vl(te.min(),i,new Ue(ae),Xn(),de())}}class Co{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new Co(r,t,de(),de(),de())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ba{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=i}}class yg{constructor(e,t){this.targetId=e,this.De=t}}class wg{constructor(e,t,r=vt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Od{constructor(){this.ve=0,this.Ce=Ld(),this.Fe=vt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=de(),t=de(),r=de();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:X(38017,{changeType:s})}}),new Co(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=Ld()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,Ee(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class Lw{constructor(e){this.We=e,this.Ge=new Map,this.ze=Xn(),this.je=ua(),this.Je=ua(),this.He=new Ue(ae)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:X(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,i)=>{this.nt(i)&&t(i)})}it(e){const t=e.targetId,r=e.De.count,i=this.st(t);if(i){const s=i.target;if(kc(s))if(r===0){const a=new G(s.path);this.Xe(t,a,At.newNoDocument(a,te.min()))}else Ee(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const l=this._t(e),c=l?this.ut(l,e,a):1;if(c!==0){this.rt(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let a,l;try{a=Lr(r).toUint8Array()}catch(c){if(c instanceof Hp)return Vr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new mu(a,i,s)}catch(c){return Vr(c instanceof Ks?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.fe===0?null:l}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const a=this.We.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,s,null),i++)}),i}Pt(e){const t=new Map;this.Ge.forEach((s,a)=>{const l=this.st(a);if(l){if(s.current&&kc(l.target)){const c=new G(l.target.path);this.Tt(c).has(a)||this.It(a,c)||this.Xe(a,c,At.newNoDocument(c,e))}s.Ne&&(t.set(a,s.Le()),s.ke())}});let r=de();this.Je.forEach((s,a)=>{let l=!0;a.forEachWhile(c=>{const h=this.st(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ze.forEach((s,a)=>a.setReadTime(e));const i=new vl(e,t,this.He,this.ze,r);return this.ze=Xn(),this.je=ua(),this.Je=ua(),this.He=new Ue(ae),i}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Od,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new it(ae),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new it(ae),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||H("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Od),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function ua(){return new Ue(G.comparator)}function Ld(){return new Ue(G.comparator)}const Mw={asc:"ASCENDING",desc:"DESCENDING"},Fw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Uw={and:"AND",or:"OR"};class jw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Cc(n,e){return n.useProto3Json||ul(e)?e:{value:e}}function Ba(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function bg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Bw(n,e){return Ba(n,e.toTimestamp())}function Sn(n){return Ee(!!n,49232),te.fromTimestamp(function(t){const r=Or(t);return new Ve(r.seconds,r.nanos)}(n))}function _u(n,e){return xc(n,e).canonicalString()}function xc(n,e){const t=function(i){return new De(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function Eg(n){const e=De.fromString(n);return Ee(Rg(e),10190,{key:e.toString()}),e}function Dc(n,e){return _u(n.databaseId,e.path)}function Yl(n,e){const t=Eg(e);if(t.get(1)!==n.databaseId.projectId)throw new W(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new W(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new G(Ig(t))}function Tg(n,e){return _u(n.databaseId,e)}function $w(n){const e=Eg(n);return e.length===4?De.emptyPath():Ig(e)}function Vc(n){return new De(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ig(n){return Ee(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Md(n,e,t){return{name:Dc(n,e),fields:t.value.mapValue.fields}}function qw(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:X(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(Ee(f===void 0||typeof f=="string",58123),vt.fromBase64String(f||"")):(Ee(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),vt.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const f=h.code===void 0?L.UNKNOWN:vg(h.code);return new W(f,h.message||"")}(a);t=new wg(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Yl(n,r.document.name),s=Sn(r.document.updateTime),a=r.document.createTime?Sn(r.document.createTime):te.min(),l=new Yt({mapValue:{fields:r.document.fields}}),c=At.newFoundDocument(i,s,a,l),h=r.targetIds||[],f=r.removedTargetIds||[];t=new ba(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Yl(n,r.document),s=r.readTime?Sn(r.readTime):te.min(),a=At.newNoDocument(i,s),l=r.removedTargetIds||[];t=new ba([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Yl(n,r.document),s=r.removedTargetIds||[];t=new ba([],s,i,null)}else{if(!("filter"in e))return X(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new Vw(i,s),l=r.targetId;t=new yg(l,a)}}return t}function zw(n,e){let t;if(e instanceof Po)t={update:Md(n,e.key,e.value)};else if(e instanceof _g)t={delete:Dc(n,e.key)};else if(e instanceof Ai)t={update:Md(n,e.key,e.data),updateMask:Zw(e.fieldMask)};else{if(!(e instanceof Cw))return X(16599,{Rt:e.type});t={verify:Dc(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const l=a.transform;if(l instanceof Ua)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof po)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof go)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof ja)return{fieldPath:a.field.canonicalString(),increment:l.Ee};throw X(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Bw(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:X(27497)}(n,e.precondition)),t}function Hw(n,e){return n&&n.length>0?(Ee(e!==void 0,14353),n.map(t=>function(i,s){let a=i.updateTime?Sn(i.updateTime):Sn(s);return a.isEqual(te.min())&&(a=Sn(s)),new Rw(a,i.transformResults||[])}(t,e))):[]}function Ww(n,e){return{documents:[Tg(n,e.path)]}}function Gw(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Tg(n,i);const s=function(h){if(h.length!==0)return Sg(Vn.create(h,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const a=function(h){if(h.length!==0)return h.map(f=>function(m){return{field:Ui(m.field),direction:Jw(m.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=Cc(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:i}}function Kw(n){let e=$w(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){Ee(r===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(g){const m=Ag(g);return m instanceof Vn&&tg(m)?m.getFilters():[m]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(m=>function(k){return new Fa(ji(k.field),function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(g){let m;return m=typeof g=="object"?g.value:g,ul(m)?null:m}(t.limit));let c=null;t.startAt&&(c=function(g){const m=!!g.before,T=g.values||[];return new Ma(T,m)}(t.startAt));let h=null;return t.endAt&&(h=function(g){const m=!g.before,T=g.values||[];return new Ma(T,m)}(t.endAt)),fw(e,i,a,s,l,"F",c,h)}function Qw(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return X(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Ag(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=ji(t.unaryFilter.field);return rt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=ji(t.unaryFilter.field);return rt.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=ji(t.unaryFilter.field);return rt.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=ji(t.unaryFilter.field);return rt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return X(61313);default:return X(60726)}}(n):n.fieldFilter!==void 0?function(t){return rt.create(ji(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return X(58110);default:return X(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Vn.create(t.compositeFilter.filters.map(r=>Ag(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return X(1026)}}(t.compositeFilter.op))}(n):X(30097,{filter:n})}function Jw(n){return Mw[n]}function Yw(n){return Fw[n]}function Xw(n){return Uw[n]}function Ui(n){return{fieldPath:n.canonicalString()}}function ji(n){return ft.fromServerFormat(n.fieldPath)}function Sg(n){return n instanceof rt?function(t){if(t.op==="=="){if(Id(t.value))return{unaryFilter:{field:Ui(t.field),op:"IS_NAN"}};if(Td(t.value))return{unaryFilter:{field:Ui(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Id(t.value))return{unaryFilter:{field:Ui(t.field),op:"IS_NOT_NAN"}};if(Td(t.value))return{unaryFilter:{field:Ui(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ui(t.field),op:Yw(t.op),value:t.value}}}(n):n instanceof Vn?function(t){const r=t.getFilters().map(i=>Sg(i));return r.length===1?r[0]:{compositeFilter:{op:Xw(t.op),filters:r}}}(n):X(54877,{filter:n})}function Zw(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Rg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(e,t,r,i,s=te.min(),a=te.min(),l=vt.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new Tr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Tr(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Tr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Tr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eb{constructor(e){this.gt=e}}function tb(n){const e=Kw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Pc(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nb{constructor(){this.Dn=new rb}addToCollectionParentIndex(e,t){return this.Dn.add(t),O.resolve()}getCollectionParents(e,t){return O.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return O.resolve()}deleteFieldIndex(e,t){return O.resolve()}deleteAllFieldIndexes(e){return O.resolve()}createTargetIndexes(e,t){return O.resolve()}getDocumentsMatchingTarget(e,t){return O.resolve(null)}getIndexType(e,t){return O.resolve(0)}getFieldIndexes(e,t){return O.resolve([])}getNextCollectionGroupToUpdate(e){return O.resolve(null)}getMinOffset(e,t){return O.resolve(Nr.min())}getMinOffsetFromCollectionGroup(e,t){return O.resolve(Nr.min())}updateCollectionGroup(e,t,r){return O.resolve()}updateIndexEntries(e,t){return O.resolve()}}class rb{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new it(De.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new it(De.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},kg=41943040;class Ot{static withCacheSize(e){return new Ot(e,Ot.DEFAULT_COLLECTION_PERCENTILE,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ot.DEFAULT_COLLECTION_PERCENTILE=10,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ot.DEFAULT=new Ot(kg,Ot.DEFAULT_COLLECTION_PERCENTILE,Ot.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ot.DISABLED=new Ot(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new cs(0)}static ur(){return new cs(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ud="LruGarbageCollector",ib=1048576;function jd([n,e],[t,r]){const i=ae(n,t);return i===0?ae(e,r):i}class sb{constructor(e){this.Tr=e,this.buffer=new it(jd),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();jd(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class ob{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){H(Ud,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Es(t)?H(Ud,"Ignoring IndexedDB error during garbage collection: ",t):await bs(t)}await this.Rr(3e5)})}}class ab{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return O.resolve(cl.ue);const r=new sb(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(H("LruGarbageCollector","Garbage collection skipped; disabled"),O.resolve(Fd)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(H("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Fd):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,i,s,a,l,c,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(H("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),i=this.params.maximumSequenceNumbersToCollect):i=g,a=Date.now(),this.nthSequenceNumber(e,i))).next(g=>(r=g,l=Date.now(),this.removeTargets(e,r,t))).next(g=>(s=g,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(h=Date.now(),Mi()<=ue.DEBUG&&H("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(l-a)+`ms
	Removed ${s} targets in `+(c-l)+`ms
	Removed ${g} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),O.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:g})))}}function lb(n,e){return new ab(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cb{constructor(){this.changes=new Ii(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,At.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?O.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ub{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hb{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&no(r.mutation,i,ln.empty(),Ve.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,de()).next(()=>r))}getLocalViewOfDocuments(e,t,r=de()){const i=Xr();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=Gs();return s.forEach((l,c)=>{a=a.insert(l,c.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Xr();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,de()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,i){let s=Xn();const a=to(),l=function(){return to()}();return t.forEach((c,h)=>{const f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof Ai)?s=s.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),no(f.mutation,h,f.mutation.getFieldMask(),Ve.now())):a.set(h.key,ln.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var g;return l.set(h,new ub(f,(g=a.get(h))!==null&&g!==void 0?g:null))}),l))}recalculateAndSaveOverlays(e,t){const r=to();let i=new Ue((a,l)=>a-l),s=de();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let f=r.get(c)||ln.empty();f=l.applyToLocalView(h,f),r.set(c,f);const g=(i.get(l.batchId)||de()).add(c);i=i.insert(l.batchId,g)})}).next(()=>{const a=[],l=i.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,f=c.value,g=cg();f.forEach(m=>{if(!s.has(m)){const T=gg(t.get(m),r.get(m));T!==null&&g.set(m,T),s=s.add(m)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,g))}return O.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return G.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):pw(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):O.resolve(Xr());let l=co,c=s;return a.next(h=>O.forEach(h,(f,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),s.get(f)?O.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{c=c.insert(f,m)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,c,h,de())).next(f=>({batchId:l,changes:lg(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new G(t)).next(r=>{let i=Gs();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let a=Gs();return this.indexManager.getCollectionParents(e,s).next(l=>O.forEach(l,c=>{const h=function(g,m){return new dl(m,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((g,m)=>{a=a.insert(g,m)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((c,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,At.newInvalidDocument(f)))});let l=Gs();return a.forEach((c,h)=>{const f=s.get(c);f!==void 0&&no(f.mutation,h,ln.empty(),Ve.now()),gl(t,h)&&(l=l.insert(c,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class db{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return O.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Sn(i.createTime)}}(t)),O.resolve()}getNamedQuery(e,t){return O.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:tb(i.bundledQuery),readTime:Sn(i.readTime)}}(t)),O.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fb{constructor(){this.overlays=new Ue(G.comparator),this.kr=new Map}getOverlay(e,t){return O.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Xr();return O.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.wt(e,t,s)}),O.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),O.resolve()}getOverlaysForCollection(e,t,r){const i=Xr(),s=t.length+1,a=new G(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return O.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Ue((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=Xr(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=Xr(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=i)););return O.resolve(l)}wt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Dw(t,r));let s=this.kr.get(t);s===void 0&&(s=de(),this.kr.set(t,s)),this.kr.set(t,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pb{constructor(){this.sessionToken=vt.EMPTY_BYTE_STRING}getSessionToken(e){return O.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,O.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(){this.qr=new it(ot.Qr),this.$r=new it(ot.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new ot(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new ot(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new G(new De([])),r=new ot(t,e),i=new ot(t,e+1),s=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),s.push(a.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new G(new De([])),r=new ot(t,e),i=new ot(t,e+1);let s=de();return this.$r.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){const t=new ot(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class ot{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return G.comparator(e.key,t.key)||ae(e.Hr,t.Hr)}static Ur(e,t){return ae(e.Hr,t.Hr)||G.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gb{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new it(ot.Qr)}checkEmpty(e){return O.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new xw(s,t,r,i);this.mutationQueue.push(a);for(const l of i)this.Yr=this.Yr.add(new ot(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return O.resolve(a)}lookupMutationBatch(e,t){return O.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return O.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return O.resolve(this.mutationQueue.length===0?cu:this.er-1)}getAllMutationBatches(e){return O.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new ot(t,0),i=new ot(t,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],a=>{const l=this.Zr(a.Hr);s.push(l)}),O.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new it(ae);return t.forEach(i=>{const s=new ot(i,0),a=new ot(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,a],l=>{r=r.add(l.Hr)})}),O.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;G.isDocumentKey(s)||(s=s.child(""));const a=new ot(new G(s),0);let l=new it(ae);return this.Yr.forEachWhile(c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(l=l.add(c.Hr)),!0)},a),O.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Ee(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return O.forEach(t.mutations,i=>{const s=new ot(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new ot(t,0),i=this.Yr.firstAfterOrEqual(r);return O.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,O.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mb{constructor(e){this.ni=e,this.docs=function(){return new Ue(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return O.resolve(r?r.document.mutableCopy():At.newInvalidDocument(t))}getEntries(e,t){let r=Xn();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():At.newInvalidDocument(i))}),O.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Xn();const a=t.path,l=new G(a.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||H0(z0(f),r)<=0||(i.has(f.key)||gl(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return O.resolve(s)}getAllFromCollectionGroup(e,t,r,i){X(9500)}ri(e,t){return O.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new _b(this)}getSize(e){return O.resolve(this.size)}}class _b extends cb{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),O.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vb{constructor(e){this.persistence=e,this.ii=new Ii(t=>du(t),fu),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.si=0,this.oi=new vu,this.targetCount=0,this._i=cs.ar()}forEachTarget(e,t){return this.ii.forEach((r,i)=>t(i)),O.resolve()}getLastRemoteSnapshotVersion(e){return O.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return O.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),O.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),O.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new cs(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,O.resolve()}updateTargetData(e,t){return this.hr(t),O.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,O.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ii.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.ii.delete(a),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),O.waitFor(s).next(()=>i)}getTargetCount(e){return O.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return O.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),O.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),O.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),O.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return O.resolve(r)}containsKey(e,t){return O.resolve(this.oi.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(e,t){this.ai={},this.overlays={},this.ui=new cl(0),this.ci=!1,this.ci=!0,this.li=new pb,this.referenceDelegate=e(this),this.hi=new vb(this),this.indexManager=new nb,this.remoteDocumentCache=function(i){return new mb(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new eb(t),this.Ti=new db(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new fb,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new gb(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){H("MemoryPersistence","Starting transaction:",e);const i=new yb(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return O.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class yb extends G0{constructor(e){super(),this.currentSequenceNumber=e}}class yu{constructor(e){this.persistence=e,this.Ai=new vu,this.Ri=null}static Vi(e){return new yu(e)}get mi(){if(this.Ri)return this.Ri;throw X(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),O.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),O.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),O.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return O.forEach(this.mi,r=>{const i=G.fromPath(r);return this.fi(e,i).next(s=>{s||t.removeEntry(i,te.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return O.or([()=>O.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class $a{constructor(e,t){this.persistence=e,this.gi=new Ii(r=>J0(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=lb(this,t)}static Vi(e,t){return new $a(e,t)}Ii(){}di(e){return O.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return O.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?O.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,a=>this.Sr(e,a,t).next(l=>{l||(r++,s.removeEntry(a,te.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),O.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),O.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),O.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),O.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=va(e.data.value)),t}Sr(e,t,r){return O.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.gi.get(t);return O.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wu{constructor(e,t,r,i){this.targetId=e,this.fromCache=t,this.Is=r,this.ds=i}static Es(e,t){let r=de(),i=de();for(const s of t.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new wu(e,t.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wb{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bb{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return fy()?8:K0(St())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.ps(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ys(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new wb;return this.ws(e,t,a).next(l=>{if(s.result=l,this.Rs)return this.Ss(e,t,a,l.size)})}).next(()=>s.result)}Ss(e,t,r,i){return r.documentReadCount<this.Vs?(Mi()<=ue.DEBUG&&H("QueryEngine","SDK will not create cache indexes for query:",Fi(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),O.resolve()):(Mi()<=ue.DEBUG&&H("QueryEngine","Query:",Fi(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(Mi()<=ue.DEBUG&&H("QueryEngine","The SDK decides to create cache indexes for query:",Fi(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,An(t))):O.resolve())}ps(e,t){if(kd(t))return O.resolve(null);let r=An(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Pc(t,null,"F"),r=An(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=de(...s);return this.gs.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(c=>{const h=this.bs(t,l);return this.Ds(t,h,a,c.readTime)?this.ps(e,Pc(t,null,"F")):this.vs(e,h,t,c)}))})))}ys(e,t,r,i){return kd(t)||i.isEqual(te.min())?O.resolve(null):this.gs.getDocuments(e,r).next(s=>{const a=this.bs(t,s);return this.Ds(t,a,r,i)?O.resolve(null):(Mi()<=ue.DEBUG&&H("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Fi(t)),this.vs(e,a,t,q0(i,co)).next(l=>l))})}bs(e,t){let r=new it(og(e));return t.forEach((i,s)=>{gl(e,s)&&(r=r.add(s))}),r}Ds(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,t,r){return Mi()<=ue.DEBUG&&H("QueryEngine","Using full collection scan to execute query:",Fi(t)),this.gs.getDocumentsMatchingQuery(e,t,Nr.min(),r)}vs(e,t,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bu="LocalStore",Eb=3e8;class Tb{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new Ue(ae),this.Ms=new Ii(s=>du(s),fu),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new hb(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function Ib(n,e,t,r){return new Tb(n,e,t,r)}async function Cg(n,e){const t=ne(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],l=[];let c=de();for(const h of i){a.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of s){l.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(r,c).next(h=>({Bs:h,removedBatchIds:a,addedBatchIds:l}))})})}function Ab(n,e){const t=ne(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,c,h,f){const g=h.batch,m=g.keys();let T=O.resolve();return m.forEach(k=>{T=T.next(()=>f.getEntry(c,k)).next(P=>{const A=h.docVersions.get(k);Ee(A!==null,48541),P.version.compareTo(A)<0&&(g.applyToRemoteDocument(P,h),P.isValidDocument()&&(P.setReadTime(h.commitVersion),f.addEntry(P)))})}),T.next(()=>l.mutationQueue.removeMutationBatch(c,g))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let c=de();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function xg(n){const e=ne(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function Sb(n,e){const t=ne(n),r=e.snapshotVersion;let i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;const l=[];e.targetChanges.forEach((f,g)=>{const m=i.get(g);if(!m)return;l.push(t.hi.removeMatchingKeys(s,f.removedDocuments,g).next(()=>t.hi.addMatchingKeys(s,f.addedDocuments,g)));let T=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(g)!==null?T=T.withResumeToken(vt.EMPTY_BYTE_STRING,te.min()).withLastLimboFreeSnapshotVersion(te.min()):f.resumeToken.approximateByteSize()>0&&(T=T.withResumeToken(f.resumeToken,r)),i=i.insert(g,T),function(P,A,C){return P.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=Eb?!0:C.addedDocuments.size+C.modifiedDocuments.size+C.removedDocuments.size>0}(m,T,f)&&l.push(t.hi.updateTargetData(s,T))});let c=Xn(),h=de();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(Rb(s,a,e.documentUpdates).next(f=>{c=f.Ls,h=f.ks})),!r.isEqual(te.min())){const f=t.hi.getLastRemoteSnapshotVersion(s).next(g=>t.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return O.waitFor(l).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,c,h)).next(()=>c)}).then(s=>(t.Fs=i,s))}function Rb(n,e,t){let r=de(),i=de();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=Xn();return t.forEach((l,c)=>{const h=s.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(l)),c.isNoDocument()&&c.version.isEqual(te.min())?(e.removeEntry(l,c.readTime),a=a.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),a=a.insert(l,c)):H(bu,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Ls:a,ks:i}})}function kb(n,e){const t=ne(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=cu),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Pb(n,e){const t=ne(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.hi.getTargetData(r,e).next(s=>s?(i=s,O.resolve(i)):t.hi.allocateTargetId(r).next(a=>(i=new Tr(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Nc(n,e,t){const r=ne(n),i=r.Fs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!Es(a))throw a;H(bu,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function Bd(n,e,t){const r=ne(n);let i=te.min(),s=de();return r.persistence.runTransaction("Execute query","readwrite",a=>function(c,h,f){const g=ne(c),m=g.Ms.get(f);return m!==void 0?O.resolve(g.Fs.get(m)):g.hi.getTargetData(h,f)}(r,a,An(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,l.targetId).next(c=>{s=c})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?i:te.min(),t?s:de())).next(l=>(Cb(r,mw(e),l),{documents:l,qs:s})))}function Cb(n,e,t){let r=n.xs.get(e)||te.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.xs.set(e,r)}class $d{constructor(){this.activeTargetIds=Ew()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class xb{constructor(){this.Fo=new $d,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new $d,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Db{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qd="ConnectivityMonitor";class zd{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){H(qd,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){H(qd,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ha=null;function Oc(){return ha===null?ha=function(){return 268435456+Math.round(2147483648*Math.random())}():ha++,"0x"+ha.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl="RestConnection",Vb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class Nb{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===Oa?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const a=Oc(),l=this.Go(e,t.toUriEncodedString());H(Xl,`Sending RPC '${e}' ${a}:`,l,r);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(c,i,s);const{host:h}=new URL(l),f=vs(h);return this.jo(e,l,c,r,f).then(g=>(H(Xl,`Received RPC '${e}' ${a}: `,g),g),g=>{throw Vr(Xl,`RPC '${e}' ${a} failed with error: `,g,"url: ",l,"request:",r),g})}Jo(e,t,r,i,s,a){return this.Wo(e,t,r,i,s)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ws}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,t){const r=Vb[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ob{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et="WebChannelConnection";class Lb extends Nb{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,i,s){const a=Oc();return new Promise((l,c)=>{const h=new Vp;h.setWithCredentials(!0),h.listenOnce(Np.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case _a.NO_ERROR:const g=h.getResponseJson();H(Et,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(g)),l(g);break;case _a.TIMEOUT:H(Et,`RPC '${e}' ${a} timed out`),c(new W(L.DEADLINE_EXCEEDED,"Request time out"));break;case _a.HTTP_ERROR:const m=h.getStatus();if(H(Et,`RPC '${e}' ${a} failed with status:`,m,"response text:",h.getResponseText()),m>0){let T=h.getResponseJson();Array.isArray(T)&&(T=T[0]);const k=T==null?void 0:T.error;if(k&&k.status&&k.message){const P=function(C){const U=C.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(U)>=0?U:L.UNKNOWN}(k.status);c(new W(P,k.message))}else c(new W(L.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new W(L.UNAVAILABLE,"Connection failed."));break;default:X(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{H(Et,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(i);H(Et,`RPC '${e}' ${a} sending request:`,i),h.send(t,"POST",f,r,15)})}P_(e,t,r){const i=Oc(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Mp(),l=Lp(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.zo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const f=s.join("");H(Et,`Creating RPC '${e}' stream ${i}: ${f}`,c);const g=a.createWebChannel(f,c);this.T_(g);let m=!1,T=!1;const k=new Ob({Ho:A=>{T?H(Et,`Not sending because RPC '${e}' stream ${i} is closed:`,A):(m||(H(Et,`Opening RPC '${e}' stream ${i} transport.`),g.open(),m=!0),H(Et,`RPC '${e}' stream ${i} sending:`,A),g.send(A))},Yo:()=>g.close()}),P=(A,C,U)=>{A.listen(C,F=>{try{U(F)}catch(M){setTimeout(()=>{throw M},0)}})};return P(g,Ws.EventType.OPEN,()=>{T||(H(Et,`RPC '${e}' stream ${i} transport opened.`),k.s_())}),P(g,Ws.EventType.CLOSE,()=>{T||(T=!0,H(Et,`RPC '${e}' stream ${i} transport closed`),k.__(),this.I_(g))}),P(g,Ws.EventType.ERROR,A=>{T||(T=!0,Vr(Et,`RPC '${e}' stream ${i} transport errored. Name:`,A.name,"Message:",A.message),k.__(new W(L.UNAVAILABLE,"The operation could not be completed")))}),P(g,Ws.EventType.MESSAGE,A=>{var C;if(!T){const U=A.data[0];Ee(!!U,16349);const F=U,M=(F==null?void 0:F.error)||((C=F[0])===null||C===void 0?void 0:C.error);if(M){H(Et,`RPC '${e}' stream ${i} received error:`,M);const j=M.status;let $=function(w){const v=Ye[w];if(v!==void 0)return vg(v)}(j),E=M.message;$===void 0&&($=L.INTERNAL,E="Unknown error status: "+j+" with message "+M.message),T=!0,k.__(new W($,E)),g.close()}else H(Et,`RPC '${e}' stream ${i} received:`,U),k.a_(U)}}),P(l,Op.STAT_EVENT,A=>{A.stat===Tc.PROXY?H(Et,`RPC '${e}' stream ${i} detected buffering proxy`):A.stat===Tc.NOPROXY&&H(Et,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.o_()},0),k}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function Zl(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yl(n){return new jw(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dg{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-r);i>0&&H("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hd="PersistentStream";class Vg{constructor(e,t,r,i,s,a,l,c){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Dg(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===L.RESOURCE_EXHAUSTED?(Yn(t.toString()),Yn("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===t&&this.W_(r,i)},r=>{e(()=>{const i=new W(L.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return H(Hd,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(H(Hd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Mb extends Vg{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=qw(this.serializer,e),r=function(s){if(!("targetChange"in s))return te.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?te.min():a.readTime?Sn(a.readTime):te.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=Vc(this.serializer),t.addTarget=function(s,a){let l;const c=a.target;if(l=kc(c)?{documents:Ww(s,c)}:{query:Gw(s,c).Vt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=bg(s,a.resumeToken);const h=Cc(s,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(te.min())>0){l.readTime=Ba(s,a.snapshotVersion.toTimestamp());const h=Cc(s,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=Qw(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=Vc(this.serializer),t.removeTarget=e,this.k_(t)}}class Fb extends Vg{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return Ee(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Ee(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){Ee(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=Hw(e.writeResults,e.commitTime),r=Sn(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=Vc(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>zw(this.serializer,r))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ub{}class jb extends Ub{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new W(L.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Wo(e,xc(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new W(L.UNKNOWN,s.toString())})}Jo(e,t,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Jo(e,xc(t,r),i,a,l,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new W(L.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class Bb{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Yn(t),this._a=!1):H("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vi="RemoteStore";class $b{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{Si(this)&&(H(vi,"Restarting streams for network reachability change."),await async function(c){const h=ne(c);h.Ia.add(4),await xo(h),h.Aa.set("Unknown"),h.Ia.delete(4),await wl(h)}(this))})}),this.Aa=new Bb(r,i)}}async function wl(n){if(Si(n))for(const e of n.da)await e(!0)}async function xo(n){for(const e of n.da)await e(!1)}function Ng(n,e){const t=ne(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),Au(t)?Iu(t):Ts(t).x_()&&Tu(t,e))}function Eu(n,e){const t=ne(n),r=Ts(t);t.Ta.delete(e),r.x_()&&Og(t,e),t.Ta.size===0&&(r.x_()?r.B_():Si(t)&&t.Aa.set("Unknown"))}function Tu(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(te.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Ts(n).H_(e)}function Og(n,e){n.Ra.$e(e),Ts(n).Y_(e)}function Iu(n){n.Ra=new Lw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),Ts(n).start(),n.Aa.aa()}function Au(n){return Si(n)&&!Ts(n).M_()&&n.Ta.size>0}function Si(n){return ne(n).Ia.size===0}function Lg(n){n.Ra=void 0}async function qb(n){n.Aa.set("Online")}async function zb(n){n.Ta.forEach((e,t)=>{Tu(n,e)})}async function Hb(n,e){Lg(n),Au(n)?(n.Aa.la(e),Iu(n)):n.Aa.set("Unknown")}async function Wb(n,e,t){if(n.Aa.set("Online"),e instanceof wg&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const l of s.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,a),i.Ta.delete(l),i.Ra.removeTarget(l))}(n,e)}catch(r){H(vi,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await qa(n,r)}else if(e instanceof ba?n.Ra.Ye(e):e instanceof yg?n.Ra.it(e):n.Ra.et(e),!t.isEqual(te.min()))try{const r=await xg(n.localStore);t.compareTo(r)>=0&&await function(s,a){const l=s.Ra.Pt(a);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=s.Ta.get(h);f&&s.Ta.set(h,f.withResumeToken(c.resumeToken,a))}}),l.targetMismatches.forEach((c,h)=>{const f=s.Ta.get(c);if(!f)return;s.Ta.set(c,f.withResumeToken(vt.EMPTY_BYTE_STRING,f.snapshotVersion)),Og(s,c);const g=new Tr(f.target,c,h,f.sequenceNumber);Tu(s,g)}),s.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){H(vi,"Failed to raise snapshot:",r),await qa(n,r)}}async function qa(n,e,t){if(!Es(e))throw e;n.Ia.add(1),await xo(n),n.Aa.set("Offline"),t||(t=()=>xg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{H(vi,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await wl(n)})}function Mg(n,e){return e().catch(t=>qa(n,t,e))}async function bl(n){const e=ne(n),t=Fr(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:cu;for(;Gb(e);)try{const i=await kb(e.localStore,r);if(i===null){e.Pa.length===0&&t.B_();break}r=i.batchId,Kb(e,i)}catch(i){await qa(e,i)}Fg(e)&&Ug(e)}function Gb(n){return Si(n)&&n.Pa.length<10}function Kb(n,e){n.Pa.push(e);const t=Fr(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function Fg(n){return Si(n)&&!Fr(n).M_()&&n.Pa.length>0}function Ug(n){Fr(n).start()}async function Qb(n){Fr(n).na()}async function Jb(n){const e=Fr(n);for(const t of n.Pa)e.X_(t.mutations)}async function Yb(n,e,t){const r=n.Pa.shift(),i=gu.from(r,e,t);await Mg(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await bl(n)}async function Xb(n,e){e&&Fr(n).Z_&&await async function(r,i){if(function(a){return Nw(a)&&a!==L.ABORTED}(i.code)){const s=r.Pa.shift();Fr(r).N_(),await Mg(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await bl(r)}}(n,e),Fg(n)&&Ug(n)}async function Wd(n,e){const t=ne(n);t.asyncQueue.verifyOperationInProgress(),H(vi,"RemoteStore received new credentials");const r=Si(t);t.Ia.add(3),await xo(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await wl(t)}async function Zb(n,e){const t=ne(n);e?(t.Ia.delete(2),await wl(t)):e||(t.Ia.add(2),await xo(t),t.Aa.set("Unknown"))}function Ts(n){return n.Va||(n.Va=function(t,r,i){const s=ne(t);return s.ia(),new Mb(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:qb.bind(null,n),e_:zb.bind(null,n),n_:Hb.bind(null,n),J_:Wb.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),Au(n)?Iu(n):n.Aa.set("Unknown")):(await n.Va.stop(),Lg(n))})),n.Va}function Fr(n){return n.ma||(n.ma=function(t,r,i){const s=ne(t);return s.ia(),new Fb(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:Qb.bind(null,n),n_:Xb.bind(null,n),ea:Jb.bind(null,n),ta:Yb.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await bl(n)):(await n.ma.stop(),n.Pa.length>0&&(H(vi,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Kn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const a=Date.now()+r,l=new Su(e,t,a,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new W(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ru(n,e){if(Yn("AsyncQueue",`${e}: ${n}`),Es(n))return new W(L.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{static emptySet(e){return new Gi(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||G.comparator(t.key,r.key):(t,r)=>G.comparator(t.key,r.key),this.keyedMap=Gs(),this.sortedSet=new Ue(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Gi)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Gi;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gd{constructor(){this.fa=new Ue(G.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):X(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class us{constructor(e,t,r,i,s,a,l,c,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,i,s){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new us(e,t,Gi.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&pl(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eE{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class tE{constructor(){this.queries=Kd(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const i=ne(t),s=i.queries;i.queries=Kd(),s.forEach((a,l)=>{for(const c of l.wa)c.onError(r)})})(this,new W(L.ABORTED,"Firestore shutting down"))}}function Kd(){return new Ii(n=>sg(n),pl)}async function ku(n,e){const t=ne(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new eE,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await t.onListen(i,!0);break;case 1:s.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const l=Ru(a,`Initialization of query '${Fi(e.query)}' failed`);return void e.onError(l)}t.queries.set(i,s),s.wa.push(e),e.va(t.onlineState),s.ya&&e.Ca(s.ya)&&Cu(t)}async function Pu(n,e){const t=ne(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const a=s.wa.indexOf(e);a>=0&&(s.wa.splice(a,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function nE(n,e){const t=ne(n);let r=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const l of a.wa)l.Ca(i)&&(r=!0);a.ya=i}}r&&Cu(t)}function rE(n,e,t){const r=ne(n),i=r.queries.get(e);if(i)for(const s of i.wa)s.onError(t);r.queries.delete(e)}function Cu(n){n.Da.forEach(e=>{e.next()})}var Lc,Qd;(Qd=Lc||(Lc={})).Fa="default",Qd.Cache="cache";class xu{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new us(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=us.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Lc.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(e){this.key=e}}class Bg{constructor(e){this.key=e}}class iE{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=de(),this.mutatedKeys=de(),this.Xa=og(e),this.eu=new Gi(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new Gd,i=t?t.eu:this.eu;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,l=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,g)=>{const m=i.get(f),T=gl(this.query,g)?g:null,k=!!m&&this.mutatedKeys.has(m.key),P=!!T&&(T.hasLocalMutations||this.mutatedKeys.has(T.key)&&T.hasCommittedMutations);let A=!1;m&&T?m.data.isEqual(T.data)?k!==P&&(r.track({type:3,doc:T}),A=!0):this.iu(m,T)||(r.track({type:2,doc:T}),A=!0,(c&&this.Xa(T,c)>0||h&&this.Xa(T,h)<0)&&(l=!0)):!m&&T?(r.track({type:0,doc:T}),A=!0):m&&!T&&(r.track({type:1,doc:m}),A=!0,(c||h)&&(l=!0)),A&&(T?(a=a.add(T),s=P?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:l,mutatedKeys:s}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort((f,g)=>function(T,k){const P=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return X(20277,{At:A})}};return P(T)-P(k)}(f.type,g.type)||this.Xa(f.doc,g.doc)),this.su(r),i=i!=null&&i;const l=t&&!i?this.ou():[],c=this.Za.size===0&&this.current&&!i?1:0,h=c!==this.Ya;return this.Ya=c,a.length!==0||h?{snapshot:new us(this.query,e.eu,s,a,e.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Gd,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=de(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new Bg(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new jg(r))}),t}uu(e){this.Ha=e.qs,this.Za=de();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return us.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Du="SyncEngine";class sE{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class oE{constructor(e){this.key=e,this.lu=!1}}class aE{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new Ii(l=>sg(l),pl),this.Tu=new Map,this.Iu=new Set,this.du=new Ue(G.comparator),this.Eu=new Map,this.Au=new vu,this.Ru={},this.Vu=new Map,this.mu=cs.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function lE(n,e,t=!0){const r=Gg(n);let i;const s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await $g(r,e,t,!0),i}async function cE(n,e){const t=Gg(n);await $g(t,e,!0,!1)}async function $g(n,e,t,r){const i=await Pb(n.localStore,An(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let l;return r&&(l=await uE(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&Ng(n.remoteStore,i),l}async function uE(n,e,t,r,i){n.gu=(g,m,T)=>async function(P,A,C,U){let F=A.view.nu(C);F.Ds&&(F=await Bd(P.localStore,A.query,!1).then(({documents:E})=>A.view.nu(E,F)));const M=U&&U.targetChanges.get(A.targetId),j=U&&U.targetMismatches.get(A.targetId)!=null,$=A.view.applyChanges(F,P.isPrimaryClient,M,j);return Yd(P,A.targetId,$._u),$.snapshot}(n,g,m,T);const s=await Bd(n.localStore,e,!0),a=new iE(e,s.qs),l=a.nu(s.documents),c=Co.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),h=a.applyChanges(l,n.isPrimaryClient,c);Yd(n,t,h._u);const f=new sE(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function hE(n,e,t){const r=ne(n),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(a=>!pl(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Nc(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&Eu(r.remoteStore,i.targetId),Mc(r,i.targetId)}).catch(bs)):(Mc(r,i.targetId),await Nc(r.localStore,i.targetId,!0))}async function dE(n,e){const t=ne(n),r=t.Pu.get(e),i=t.Tu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),Eu(t.remoteStore,r.targetId))}async function fE(n,e,t){const r=wE(n);try{const i=await function(a,l){const c=ne(a),h=Ve.now(),f=l.reduce((T,k)=>T.add(k.key),de());let g,m;return c.persistence.runTransaction("Locally write mutations","readwrite",T=>{let k=Xn(),P=de();return c.Os.getEntries(T,f).next(A=>{k=A,k.forEach((C,U)=>{U.isValidDocument()||(P=P.add(C))})}).next(()=>c.localDocuments.getOverlayedDocuments(T,k)).next(A=>{g=A;const C=[];for(const U of l){const F=Pw(U,g.get(U.key).overlayedDocument);F!=null&&C.push(new Ai(U.key,F,Xp(F.value.mapValue),Qn.exists(!0)))}return c.mutationQueue.addMutationBatch(T,h,C,l)}).next(A=>{m=A;const C=A.applyToLocalDocumentSet(g,P);return c.documentOverlayCache.saveOverlays(T,A.batchId,C)})}).then(()=>({batchId:m.batchId,changes:lg(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,l,c){let h=a.Ru[a.currentUser.toKey()];h||(h=new Ue(ae)),h=h.insert(l,c),a.Ru[a.currentUser.toKey()]=h}(r,i.batchId,t),await Do(r,i.changes),await bl(r.remoteStore)}catch(i){const s=Ru(i,"Failed to persist write");t.reject(s)}}async function qg(n,e){const t=ne(n);try{const r=await Sb(t.localStore,e);e.targetChanges.forEach((i,s)=>{const a=t.Eu.get(s);a&&(Ee(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?Ee(a.lu,14607):i.removedDocuments.size>0&&(Ee(a.lu,42227),a.lu=!1))}),await Do(t,r,e)}catch(r){await bs(r)}}function Jd(n,e,t){const r=ne(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Pu.forEach((s,a)=>{const l=a.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(a,l){const c=ne(a);c.onlineState=l;let h=!1;c.queries.forEach((f,g)=>{for(const m of g.wa)m.va(l)&&(h=!0)}),h&&Cu(c)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function pE(n,e,t){const r=ne(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Eu.get(e),s=i&&i.key;if(s){let a=new Ue(G.comparator);a=a.insert(s,At.newNoDocument(s,te.min()));const l=de().add(s),c=new vl(te.min(),new Map,new Ue(ae),a,l);await qg(r,c),r.du=r.du.remove(s),r.Eu.delete(e),Vu(r)}else await Nc(r.localStore,e,!1).then(()=>Mc(r,e,t)).catch(bs)}async function gE(n,e){const t=ne(n),r=e.batch.batchId;try{const i=await Ab(t.localStore,e);Hg(t,r,null),zg(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Do(t,i)}catch(i){await bs(i)}}async function mE(n,e,t){const r=ne(n);try{const i=await function(a,l){const c=ne(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,l).next(g=>(Ee(g!==null,37113),f=g.keys(),c.mutationQueue.removeMutationBatch(h,g))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(r.localStore,e);Hg(r,e,t),zg(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Do(r,i)}catch(i){await bs(i)}}function zg(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function Hg(n,e,t){const r=ne(n);let i=r.Ru[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function Mc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||Wg(n,r)})}function Wg(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(Eu(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),Vu(n))}function Yd(n,e,t){for(const r of t)r instanceof jg?(n.Au.addReference(r.key,e),_E(n,r)):r instanceof Bg?(H(Du,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||Wg(n,r.key)):X(19791,{yu:r})}function _E(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(H(Du,"New document in limbo: "+t),n.Iu.add(r),Vu(n))}function Vu(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new G(De.fromString(e)),r=n.mu.next();n.Eu.set(r,new oE(t)),n.du=n.du.insert(t,r),Ng(n.remoteStore,new Tr(An(fl(t.path)),r,"TargetPurposeLimboResolution",cl.ue))}}async function Do(n,e,t){const r=ne(n),i=[],s=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((l,c)=>{a.push(r.gu(c,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const g=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(c.targetId,g?"current":"not-current")}if(h){i.push(h);const g=wu.Es(c.targetId,h);s.push(g)}}))}),await Promise.all(a),r.hu.J_(i),await async function(c,h){const f=ne(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>O.forEach(h,m=>O.forEach(m.Is,T=>f.persistence.referenceDelegate.addReference(g,m.targetId,T)).next(()=>O.forEach(m.ds,T=>f.persistence.referenceDelegate.removeReference(g,m.targetId,T)))))}catch(g){if(!Es(g))throw g;H(bu,"Failed to update sequence numbers: "+g)}for(const g of h){const m=g.targetId;if(!g.fromCache){const T=f.Fs.get(m),k=T.snapshotVersion,P=T.withLastLimboFreeSnapshotVersion(k);f.Fs=f.Fs.insert(m,P)}}}(r.localStore,s))}async function vE(n,e){const t=ne(n);if(!t.currentUser.isEqual(e)){H(Du,"User change. New user:",e.toKey());const r=await Cg(t.localStore,e);t.currentUser=e,function(s,a){s.Vu.forEach(l=>{l.forEach(c=>{c.reject(new W(L.CANCELLED,a))})}),s.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Do(t,r.Bs)}}function yE(n,e){const t=ne(n),r=t.Eu.get(e);if(r&&r.lu)return de().add(r.key);{let i=de();const s=t.Tu.get(e);if(!s)return i;for(const a of s){const l=t.Pu.get(a);i=i.unionWith(l.view.tu)}return i}}function Gg(n){const e=ne(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=qg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=yE.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=pE.bind(null,e),e.hu.J_=nE.bind(null,e.eventManager),e.hu.pu=rE.bind(null,e.eventManager),e}function wE(n){const e=ne(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=gE.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=mE.bind(null,e),e}class za{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=yl(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return Ib(this.persistence,new bb,e.initialUser,this.serializer)}Du(e){return new Pg(yu.Vi,this.serializer)}bu(e){return new xb}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}za.provider={build:()=>new za};class bE extends za{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){Ee(this.persistence.referenceDelegate instanceof $a,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new ob(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?Ot.withCacheSize(this.cacheSizeBytes):Ot.DEFAULT;return new Pg(r=>$a.Vi(r,t),this.serializer)}}class Fc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Jd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=vE.bind(null,this.syncEngine),await Zb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new tE}()}createDatastore(e){const t=yl(e.databaseInfo.databaseId),r=function(s){return new Lb(s)}(e.databaseInfo);return function(s,a,l,c){return new jb(s,a,l,c)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,l){return new $b(r,i,s,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Jd(this.syncEngine,t,0),function(){return zd.C()?new zd:new Db}())}createSyncEngine(e,t){return function(i,s,a,l,c,h,f){const g=new aE(i,s,a,l,c,h);return f&&(g.fu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=ne(i);H(vi,"RemoteStore shutting down."),s.Ia.add(5),await xo(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Fc.provider={build:()=>new Fc};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):Yn("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur="FirestoreClient";class EE{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=It.UNAUTHENTICATED,this.clientId=au.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{H(Ur,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(H(Ur,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Kn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Ru(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ec(n,e){n.asyncQueue.verifyOperationInProgress(),H(Ur,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Cg(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{Vr("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{H("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{Vr("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=e}async function Xd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await TE(n);H(Ur,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Wd(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Wd(e.remoteStore,i)),n._onlineComponents=e}async function TE(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){H(Ur,"Using user provided OfflineComponentProvider");try{await ec(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===L.FAILED_PRECONDITION||i.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Vr("Error using user provided cache. Falling back to memory cache: "+t),await ec(n,new za)}}else H(Ur,"Using default OfflineComponentProvider"),await ec(n,new bE(void 0));return n._offlineComponents}async function Kg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(H(Ur,"Using user provided OnlineComponentProvider"),await Xd(n,n._uninitializedComponentsProvider._online)):(H(Ur,"Using default OnlineComponentProvider"),await Xd(n,new Fc))),n._onlineComponents}function IE(n){return Kg(n).then(e=>e.syncEngine)}async function Ha(n){const e=await Kg(n),t=e.eventManager;return t.onListen=lE.bind(null,e.syncEngine),t.onUnlisten=hE.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=cE.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=dE.bind(null,e.syncEngine),t}function AE(n,e,t={}){const r=new Kn;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,l,c,h){const f=new Nu({next:m=>{f.Ou(),a.enqueueAndForget(()=>Pu(s,g));const T=m.docs.has(l);!T&&m.fromCache?h.reject(new W(L.UNAVAILABLE,"Failed to get document because the client is offline.")):T&&m.fromCache&&c&&c.source==="server"?h.reject(new W(L.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),g=new xu(fl(l.path),f,{includeMetadataChanges:!0,ka:!0});return ku(s,g)}(await Ha(n),n.asyncQueue,e,t,r)),r.promise}function SE(n,e,t={}){const r=new Kn;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,l,c,h){const f=new Nu({next:m=>{f.Ou(),a.enqueueAndForget(()=>Pu(s,g)),m.fromCache&&c.source==="server"?h.reject(new W(L.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(m)},error:m=>h.reject(m)}),g=new xu(l,f,{includeMetadataChanges:!0,ka:!0});return ku(s,g)}(await Ha(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qg(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zd=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jg="firestore.googleapis.com",ef=!0;class tf{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new W(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Jg,this.ssl=ef}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:ef;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=kg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ib)throw new W(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}$0("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Qg((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new W(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new W(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new W(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class El{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new tf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new W(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new W(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new tf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new V0;switch(r.type){case"firstParty":return new M0(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new W(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Zd.get(t);r&&(H("ComponentProvider","Removing Datastore"),Zd.delete(t),r.terminate())}(this),Promise.resolve()}}function RE(n,e,t,r={}){var i;n=In(n,El);const s=vs(e),a=n._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),c=`${e}:${t}`;s&&(Ip(`https://${c}`),Ap("Firestore",!0)),a.host!==Jg&&a.host!==c&&Vr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},a),{host:c,ssl:s,emulatorOptions:r});if(!gi(h,l)&&(n._setSettings(h),r.mockUserToken)){let f,g;if(typeof r.mockUserToken=="string")f=r.mockUserToken,g=It.MOCK_USER;else{f=iy(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new W(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new It(m)}n._authCredentials=new N0(new Up(f,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Vo(this.firestore,e,this._query)}}class et{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Cr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new et(this.firestore,e,this._key)}toJSON(){return{type:et._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ko(t,et._jsonSchema))return new et(e,r||null,new G(De.fromString(t.referencePath)))}}et._jsonSchemaVersion="firestore/documentReference/1.0",et._jsonSchema={type:Ze("string",et._jsonSchemaVersion),referencePath:Ze("string")};class Cr extends Vo{constructor(e,t,r){super(e,t,fl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new et(this.firestore,null,new G(e))}withConverter(e){return new Cr(this.firestore,e,this._path)}}function mo(n,e,...t){if(n=Rt(n),Bp("collection","path",e),n instanceof El){const r=De.fromString(e,...t);return gd(r),new Cr(n,null,r)}{if(!(n instanceof et||n instanceof Cr))throw new W(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(De.fromString(e,...t));return gd(r),new Cr(n.firestore,null,r)}}function un(n,e,...t){if(n=Rt(n),arguments.length===1&&(e=au.newId()),Bp("doc","path",e),n instanceof El){const r=De.fromString(e,...t);return pd(r),new et(n,null,new G(r))}{if(!(n instanceof et||n instanceof Cr))throw new W(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(De.fromString(e,...t));return pd(r),new et(n.firestore,n instanceof Cr?n.converter:null,new G(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nf="AsyncQueue";class rf{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Dg(this,"async_queue_retry"),this.oc=()=>{const r=Zl();r&&H(nf,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=Zl();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Zl();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new Kn;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!Es(e))throw e;H(nf,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,Yn("INTERNAL UNHANDLED ERROR: ",sf(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const i=Su.createAndSchedule(this,e,t,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&X(47125,{hc:sf(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function sf(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function of(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class hs extends El{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new rf,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new rf(e),this._firestoreClient=void 0,await e}}}function Yg(n,e){const t=typeof n=="object"?n:Pp(),r=typeof n=="string"?n:Oa,i=su(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=ny("firestore");s&&RE(i,...s)}return i}function Tl(n){if(n._terminated)throw new W(L.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||kE(n),n._firestoreClient}function kE(n){var e,t,r;const i=n._freezeSettings(),s=function(l,c,h,f){return new Z0(l,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Qg(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new EE(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Xt(vt.fromBase64String(e))}catch(t){throw new W(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Xt(vt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Xt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ko(e,Xt._jsonSchema))return Xt.fromBase64String(e.bytes)}}Xt._jsonSchemaVersion="firestore/bytes/1.0",Xt._jsonSchema={type:Ze("string",Xt._jsonSchemaVersion),bytes:Ze("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new W(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ft(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rn{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new W(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new W(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ae(this._lat,e._lat)||ae(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Rn._jsonSchemaVersion}}static fromJSON(e){if(ko(e,Rn._jsonSchema))return new Rn(e.latitude,e.longitude)}}Rn._jsonSchemaVersion="firestore/geoPoint/1.0",Rn._jsonSchema={type:Ze("string",Rn._jsonSchemaVersion),latitude:Ze("number"),longitude:Ze("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:kn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ko(e,kn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new kn(e.vectorValues);throw new W(L.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}kn._jsonSchemaVersion="firestore/vectorValue/1.0",kn._jsonSchema={type:Ze("string",kn._jsonSchemaVersion),vectorValues:Ze("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const PE=/^__.*__$/;class CE{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ai(e,this.data,this.fieldMask,t,this.fieldTransforms):new Po(e,this.data,t,this.fieldTransforms)}}function Zg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw X(40011,{Ec:n})}}class Lu{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new Lu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Wa(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Zg(this.Ec)&&PE.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class xE{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||yl(e)}Dc(e,t,r,i=!1){return new Lu({Ec:e,methodName:t,bc:r,path:ft.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function DE(n){const e=n._freezeSettings(),t=yl(n._databaseId);return new xE(n._databaseId,!!e.ignoreUndefinedProperties,t)}function VE(n,e,t,r,i,s={}){const a=n.Dc(s.merge||s.mergeFields?2:0,e,t,i);rm("Data must be an object, but it was:",a,r);const l=tm(r,a);let c,h;if(s.merge)c=new ln(a.fieldMask),h=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const g of s.mergeFields){const m=NE(e,g,t);if(!a.contains(m))throw new W(L.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);LE(f,m)||f.push(m)}c=new ln(f),h=a.fieldTransforms.filter(g=>c.covers(g.field))}else c=null,h=a.fieldTransforms;return new CE(new Yt(l),c,h)}function em(n,e){if(nm(n=Rt(n)))return rm("Unsupported field value:",e,n),tm(n,e);if(n instanceof Xg)return function(r,i){if(!Zg(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){const s=[];let a=0;for(const l of r){let c=em(l,i.yc(a));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=Rt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Tw(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ve.fromDate(r);return{timestampValue:Ba(i.serializer,s)}}if(r instanceof Ve){const s=new Ve(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Ba(i.serializer,s)}}if(r instanceof Rn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Xt)return{bytesValue:bg(i.serializer,r._byteString)};if(r instanceof et){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:_u(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof kn)return function(a,l){return{mapValue:{fields:{[Jp]:{stringValue:Yp},[La]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw l.wc("VectorValues must only contain numeric values.");return pu(l.serializer,h)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${lu(r)}`)}(n,e)}function tm(n,e){const t={};return zp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ti(n,(r,i)=>{const s=em(i,e.Vc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function nm(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ve||n instanceof Rn||n instanceof Xt||n instanceof et||n instanceof Xg||n instanceof kn)}function rm(n,e,t){if(!nm(t)||!$p(t)){const r=lu(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function NE(n,e,t){if((e=Rt(e))instanceof Ou)return e._internalPath;if(typeof e=="string")return im(n,e);throw Wa("Field path arguments must be of type string or ",n,!1,void 0,t)}const OE=new RegExp("[~\\*/\\[\\]]");function im(n,e,t){if(e.search(OE)>=0)throw Wa(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ou(...e.split("."))._internalPath}catch{throw Wa(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Wa(n,e,t,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(s||a)&&(c+=" (found",s&&(c+=` in field ${r}`),a&&(c+=` in document ${i}`),c+=")"),new W(L.INVALID_ARGUMENT,l+n+c)}function LE(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sm{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new et(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new ME(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(om("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class ME extends sm{data(){return super.data()}}function om(n,e){return typeof e=="string"?im(n,e):e instanceof Ou?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new W(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class FE{convertValue(e,t="none"){switch(Mr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ge(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Lr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw X(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Ti(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[La].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>Ge(a.doubleValue));return new kn(s)}convertGeoPoint(e){return new Rn(Ge(e.latitude),Ge(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=hl(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(uo(e));default:return null}}convertTimestamp(e){const t=Or(e);return new Ve(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=De.fromString(e);Ee(Rg(r),9688,{name:e});const i=new ho(r.get(1),r.get(3)),s=new G(r.popFirst(5));return i.isEqual(t)||Yn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UE(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Qs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ci extends sm{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ea(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(om("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new W(L.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ci._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}ci._jsonSchemaVersion="firestore/documentSnapshot/1.0",ci._jsonSchema={type:Ze("string",ci._jsonSchemaVersion),bundleSource:Ze("string","DocumentSnapshot"),bundleName:Ze("string"),bundle:Ze("string")};class Ea extends ci{data(e={}){return super.data(e)}}class ui{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Qs(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ea(this._firestore,this._userDataWriter,r.key,r,new Qs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new W(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(l=>{const c=new Ea(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Qs(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const c=new Ea(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Qs(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:jE(l.type),doc:c,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new W(L.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=ui._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=au.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function jE(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return X(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function af(n){n=In(n,et);const e=In(n.firestore,hs);return AE(Tl(e),n._key).then(t=>lm(e,n,t))}ui._jsonSchemaVersion="firestore/querySnapshot/1.0",ui._jsonSchema={type:Ze("string",ui._jsonSchemaVersion),bundleSource:Ze("string","QuerySnapshot"),bundleName:Ze("string"),bundle:Ze("string")};class Mu extends FE{constructor(e){super(),this.firestore=e}convertBytes(e){return new Xt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new et(this.firestore,null,t)}}function _o(n){n=In(n,Vo);const e=In(n.firestore,hs),t=Tl(e),r=new Mu(e);return am(n._query),SE(t,n._query).then(i=>new ui(e,r,n,i))}function No(n,e,t){n=In(n,et);const r=In(n.firestore,hs),i=UE(n.converter,e);return BE(r,[VE(DE(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Qn.none())])}function Il(n,...e){var t,r,i;n=Rt(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||of(e[a])||(s=e[a++]);const l={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(of(e[a])){const g=e[a];e[a]=(t=g.next)===null||t===void 0?void 0:t.bind(g),e[a+1]=(r=g.error)===null||r===void 0?void 0:r.bind(g),e[a+2]=(i=g.complete)===null||i===void 0?void 0:i.bind(g)}let c,h,f;if(n instanceof et)h=In(n.firestore,hs),f=fl(n._key.path),c={next:g=>{e[a]&&e[a](lm(h,n,g))},error:e[a+1],complete:e[a+2]};else{const g=In(n,Vo);h=In(g.firestore,hs),f=g._query;const m=new Mu(h);c={next:T=>{e[a]&&e[a](new ui(h,m,g,T))},error:e[a+1],complete:e[a+2]},am(n._query)}return function(m,T,k,P){const A=new Nu(P),C=new xu(T,A,k);return m.asyncQueue.enqueueAndForget(async()=>ku(await Ha(m),C)),()=>{A.Ou(),m.asyncQueue.enqueueAndForget(async()=>Pu(await Ha(m),C))}}(Tl(h),f,l,c)}function BE(n,e){return function(r,i){const s=new Kn;return r.asyncQueue.enqueueAndForget(async()=>fE(await IE(r),i,s)),s.promise}(Tl(n),e)}function lm(n,e,t){const r=t.docs.get(e._key),i=new Mu(n);return new ci(n,i,e._key,r,new Qs(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(i){ws=i})(ys),ss(new mi("firestore",(r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),l=new hs(new O0(r.getProvider("auth-internal")),new F0(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new W(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ho(h.options.projectId,f)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),kr(cd,ud,e),kr(cd,ud,"esm2017")})();function Fu(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function cm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const $E=cm,um=new So("auth","Firebase",cm());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ga=new ru("@firebase/auth");function qE(n,...e){Ga.logLevel<=ue.WARN&&Ga.warn(`Auth (${ys}): ${n}`,...e)}function Ta(n,...e){Ga.logLevel<=ue.ERROR&&Ga.error(`Auth (${ys}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(n,...e){throw Uu(n,...e)}function Pn(n,...e){return Uu(n,...e)}function hm(n,e,t){const r=Object.assign(Object.assign({},$E()),{[e]:t});return new So("auth","Firebase",r).create(e,{appName:n.name})}function xr(n){return hm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Uu(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return um.create(n,...e)}function Y(n,e,...t){if(!n)throw Uu(e,...t)}function $n(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ta(e),new Error(e)}function Zn(n,e){n||$n(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function zE(){return lf()==="http:"||lf()==="https:"}function lf(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function HE(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(zE()||uy()||"connection"in navigator)?navigator.onLine:!0}function WE(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oo{constructor(e,t){this.shortDelay=e,this.longDelay=t,Zn(t>e,"Short delay should be less than long delay!"),this.isMobile=ay()||hy()}get(){return HE()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ju(n,e){Zn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;$n("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;$n("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;$n("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GE={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KE=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],QE=new Oo(3e4,6e4);function $r(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function rr(n,e,t,r,i={}){return fm(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const l=Ro(Object.assign({key:n.config.apiKey},a)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:c},s);return cy()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&vs(n.emulatorConfig.host)&&(h.credentials="include"),dm.fetch()(await pm(n,n.config.apiHost,t,l),h)})}async function fm(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},GE),e);try{const i=new YE(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw da(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const l=s.ok?a.errorMessage:a.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw da(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw da(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw da(n,"user-disabled",a);const f=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw hm(n,f,h);fn(n,f)}}catch(i){if(i instanceof nr)throw i;fn(n,"network-request-failed",{message:String(i)})}}async function Al(n,e,t,r,i={}){const s=await rr(n,e,t,r,i);return"mfaPendingCredential"in s&&fn(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function pm(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?ju(n.config,i):`${n.config.apiScheme}://${i}`;return KE.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function JE(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class YE{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Pn(this.auth,"network-request-failed")),QE.get())})}}function da(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Pn(n,e,r);return i.customData._tokenResponse=t,i}function cf(n){return n!==void 0&&n.enterprise!==void 0}class XE{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return JE(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function ZE(n,e){return rr(n,"GET","/v2/recaptchaConfig",$r(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function eT(n,e){return rr(n,"POST","/v1/accounts:delete",e)}async function Ka(n,e){return rr(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ro(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function tT(n,e=!1){const t=Rt(n),r=await t.getIdToken(e),i=Bu(r);Y(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:ro(tc(i.auth_time)),issuedAtTime:ro(tc(i.iat)),expirationTime:ro(tc(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function tc(n){return Number(n)*1e3}function Bu(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ta("JWT malformed, contained fewer than 3 sections"),null;try{const i=wp(t);return i?JSON.parse(i):(Ta("Failed to decode base64 JWT payload"),null)}catch(i){return Ta("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function uf(n){const e=Bu(n);return Y(e,"internal-error"),Y(typeof e.exp<"u","internal-error"),Y(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vo(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof nr&&nT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function nT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const i=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,i)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=ro(this.lastLoginAt),this.creationTime=ro(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qa(n){var e;const t=n.auth,r=await n.getIdToken(),i=await vo(n,Ka(t,{idToken:r}));Y(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?gm(s.providerUserInfo):[],l=sT(n.providerData,a),c=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!(l!=null&&l.length),f=c?h:!1,g={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new jc(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,g)}async function iT(n){const e=Rt(n);await Qa(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function sT(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function gm(n){return n.map(e=>{var{providerId:t}=e,r=Fu(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oT(n,e){const t=await fm(n,{},async()=>{const r=Ro({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await pm(n,i,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:r};return n.emulatorConfig&&vs(n.emulatorConfig.host)&&(c.credentials="include"),dm.fetch()(a,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function aT(n,e){return rr(n,"POST","/v2/accounts:revokeToken",$r(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ki{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Y(e.idToken,"internal-error"),Y(typeof e.idToken<"u","internal-error"),Y(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):uf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){Y(e.length!==0,"internal-error");const t=uf(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(Y(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await oT(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new Ki;return r&&(Y(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(Y(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(Y(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ki,this.toJSON())}_performRefresh(){return $n("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(n,e){Y(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class cn{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Fu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new rT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new jc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await vo(this,this.stsTokenManager.getToken(this.auth,e));return Y(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return tT(this,e)}reload(){return iT(this)}_assign(e){this!==e&&(Y(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new cn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){Y(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Qa(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(an(this.auth.app))return Promise.reject(xr(this.auth));const e=await this.getIdToken();return await vo(this,eT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,l,c,h,f;const g=(r=t.displayName)!==null&&r!==void 0?r:void 0,m=(i=t.email)!==null&&i!==void 0?i:void 0,T=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,P=(l=t.tenantId)!==null&&l!==void 0?l:void 0,A=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,C=(h=t.createdAt)!==null&&h!==void 0?h:void 0,U=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:F,emailVerified:M,isAnonymous:j,providerData:$,stsTokenManager:E}=t;Y(F&&E,e,"internal-error");const _=Ki.fromJSON(this.name,E);Y(typeof F=="string",e,"internal-error"),pr(g,e.name),pr(m,e.name),Y(typeof M=="boolean",e,"internal-error"),Y(typeof j=="boolean",e,"internal-error"),pr(T,e.name),pr(k,e.name),pr(P,e.name),pr(A,e.name),pr(C,e.name),pr(U,e.name);const w=new cn({uid:F,auth:e,email:m,emailVerified:M,displayName:g,isAnonymous:j,photoURL:k,phoneNumber:T,tenantId:P,stsTokenManager:_,createdAt:C,lastLoginAt:U});return $&&Array.isArray($)&&(w.providerData=$.map(v=>Object.assign({},v))),A&&(w._redirectEventId=A),w}static async _fromIdTokenResponse(e,t,r=!1){const i=new Ki;i.updateFromServerResponse(t);const s=new cn({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Qa(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];Y(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?gm(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new Ki;l.updateFromIdToken(r);const c=new cn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new jc(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hf=new Map;function qn(n){Zn(n instanceof Function,"Expected a class definition");let e=hf.get(n);return e?(Zn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,hf.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mm{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}mm.type="NONE";const df=mm;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ia(n,e,t){return`firebase:${n}:${e}:${t}`}class Qi{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Ia(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ia("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Ka(this.auth,{idToken:e}).catch(()=>{});return t?cn._fromGetAccountInfoResponse(this.auth,t,e):null}return cn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Qi(qn(df),e,r);const i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||qn(df);const a=Ia(r,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(a);if(f){let g;if(typeof f=="string"){const m=await Ka(e,{idToken:f}).catch(()=>{});if(!m)break;g=await cn._fromGetAccountInfoResponse(e,m,f)}else g=cn._fromJSON(e,f);h!==s&&(l=g),s=h;break}}catch{}const c=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Qi(s,e,r):(s=c[0],l&&await s._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(a)}catch{}})),new Qi(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ff(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(wm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(_m(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Em(e))return"Blackberry";if(Tm(e))return"Webos";if(vm(e))return"Safari";if((e.includes("chrome/")||ym(e))&&!e.includes("edge/"))return"Chrome";if(bm(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function _m(n=St()){return/firefox\//i.test(n)}function vm(n=St()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ym(n=St()){return/crios\//i.test(n)}function wm(n=St()){return/iemobile/i.test(n)}function bm(n=St()){return/android/i.test(n)}function Em(n=St()){return/blackberry/i.test(n)}function Tm(n=St()){return/webos/i.test(n)}function $u(n=St()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function lT(n=St()){var e;return $u(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function cT(){return dy()&&document.documentMode===10}function Im(n=St()){return $u(n)||bm(n)||Tm(n)||Em(n)||/windows phone/i.test(n)||wm(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Am(n,e=[]){let t;switch(n){case"Browser":t=ff(St());break;case"Worker":t=`${ff(St())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ys}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,l)=>{try{const c=e(s);a(c)}catch(c){l(c)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hT(n,e={}){return rr(n,"GET","/v2/passwordPolicy",$r(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dT=6;class fT{constructor(e){var t,r,i,s;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:dT,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(i=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&i!==void 0?i:"",this.forceUpgradeOnSignin=(s=e.forceUpgradeOnSignin)!==null&&s!==void 0?s:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,i,s,a,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(t=c.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(i=c.containsLowercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(s=c.containsUppercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(a=c.containsNumericCharacter)!==null&&a!==void 0?a:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pT{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new pf(this),this.idTokenSubscription=new pf(this),this.beforeStateQueue=new uT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=um,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=qn(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Qi.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Ka(this,{idToken:e}),r=await cn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(an(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===l)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return Y(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Qa(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=WE()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(an(this.app))return Promise.reject(xr(this));const t=e?Rt(e):null;return t&&Y(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&Y(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return an(this.app)?Promise.reject(xr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return an(this.app)?Promise.reject(xr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(qn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hT(this),t=new fT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new So("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await aT(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&qn(e)||this._popupRedirectResolver;Y(t,this,"argument-error"),this.redirectPersistenceManager=await Qi.create(this,[qn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Y(l,this,"internal-error"),l.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,i);return()=>{a=!0,c()}}else{const c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Y(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Am(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(an(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&qE(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Ri(n){return Rt(n)}class pf{constructor(e){this.auth=e,this.observer=null,this.addObserver=wy(t=>this.observer=t)}get next(){return Y(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Sl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function gT(n){Sl=n}function Sm(n){return Sl.loadJS(n)}function mT(){return Sl.recaptchaEnterpriseScript}function _T(){return Sl.gapiScript}function vT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class yT{constructor(){this.enterprise=new wT}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class wT{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const bT="recaptcha-enterprise",Rm="NO_RECAPTCHA";class ET{constructor(e){this.type=bT,this.auth=Ri(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,l)=>{ZE(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new XE(c);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,a(h.siteKey)}}).catch(c=>{l(c)})})}function i(s,a,l){const c=window.grecaptcha;cf(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(h=>{a(h)}).catch(()=>{a(Rm)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new yT().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(l=>{if(!t&&cf(window.grecaptcha))i(l,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let c=mT();c.length!==0&&(c+=l),Sm(c).then(()=>{i(l,s,a)}).catch(h=>{a(h)})}}).catch(l=>{a(l)})})}}async function gf(n,e,t,r=!1,i=!1){const s=new ET(n);let a;if(i)a=Rm;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const l=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,h=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:a}):Object.assign(l,{captchaResponse:a}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function Bc(n,e,t,r,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await gf(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await gf(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TT(n,e){const t=su(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(gi(s,e??{}))return i;fn(i,"already-initialized")}return t.initialize({options:e})}function IT(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(qn);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function AT(n,e,t){const r=Ri(n);Y(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=km(e),{host:a,port:l}=ST(e),c=l===null?"":`:${l}`,h={url:`${s}//${a}${c}/`},f=Object.freeze({host:a,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){Y(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Y(gi(h,r.config.emulator)&&gi(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,vs(a)?(Ip(`${s}//${a}${c}`),Ap("Auth",!0)):RT()}function km(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ST(n){const e=km(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:mf(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:mf(a)}}}function mf(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function RT(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return $n("not implemented")}_getIdTokenResponse(e){return $n("not implemented")}_linkToIdToken(e,t){return $n("not implemented")}_getReauthenticationResolver(e){return $n("not implemented")}}async function kT(n,e){return rr(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function PT(n,e){return Al(n,"POST","/v1/accounts:signInWithPassword",$r(n,e))}async function CT(n,e){return rr(n,"POST","/v1/accounts:sendOobCode",$r(n,e))}async function xT(n,e){return CT(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function DT(n,e){return Al(n,"POST","/v1/accounts:signInWithEmailLink",$r(n,e))}async function VT(n,e){return Al(n,"POST","/v1/accounts:signInWithEmailLink",$r(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo extends qu{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new yo(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new yo(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Bc(e,t,"signInWithPassword",PT);case"emailLink":return DT(e,{email:this._email,oobCode:this._password});default:fn(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Bc(e,r,"signUpPassword",kT);case"emailLink":return VT(e,{idToken:t,email:this._email,oobCode:this._password});default:fn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ji(n,e){return Al(n,"POST","/v1/accounts:signInWithIdp",$r(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NT="http://localhost";class yi extends qu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new yi(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):fn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Fu(t,["providerId","signInMethod"]);if(!r||!i)return null;const a=new yi(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Ji(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Ji(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ji(e,t)}buildRequest(){const e={requestUri:NT,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ro(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OT(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function LT(n){const e=zs(Hs(n)).link,t=e?zs(Hs(e)).deep_link_id:null,r=zs(Hs(n)).deep_link_id;return(r?zs(Hs(r)).link:null)||r||t||e||n}class zu{constructor(e){var t,r,i,s,a,l;const c=zs(Hs(e)),h=(t=c.apiKey)!==null&&t!==void 0?t:null,f=(r=c.oobCode)!==null&&r!==void 0?r:null,g=OT((i=c.mode)!==null&&i!==void 0?i:null);Y(h&&f&&g,"argument-error"),this.apiKey=h,this.operation=g,this.code=f,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=c.lang)!==null&&a!==void 0?a:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=LT(e);try{return new zu(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(){this.providerId=Is.PROVIDER_ID}static credential(e,t){return yo._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=zu.parseLink(t);return Y(r,"argument-error"),yo._fromEmailAndCode(e,r.code,r.tenantId)}}Is.PROVIDER_ID="password";Is.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Is.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lo extends Pm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mr extends Lo{constructor(){super("facebook.com")}static credential(e){return yi._fromParams({providerId:mr.PROVIDER_ID,signInMethod:mr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return mr.credentialFromTaggedObject(e)}static credentialFromError(e){return mr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return mr.credential(e.oauthAccessToken)}catch{return null}}}mr.FACEBOOK_SIGN_IN_METHOD="facebook.com";mr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _r extends Lo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return yi._fromParams({providerId:_r.PROVIDER_ID,signInMethod:_r.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return _r.credentialFromTaggedObject(e)}static credentialFromError(e){return _r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return _r.credential(t,r)}catch{return null}}}_r.GOOGLE_SIGN_IN_METHOD="google.com";_r.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr extends Lo{constructor(){super("github.com")}static credential(e){return yi._fromParams({providerId:vr.PROVIDER_ID,signInMethod:vr.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return vr.credentialFromTaggedObject(e)}static credentialFromError(e){return vr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return vr.credential(e.oauthAccessToken)}catch{return null}}}vr.GITHUB_SIGN_IN_METHOD="github.com";vr.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr extends Lo{constructor(){super("twitter.com")}static credential(e,t){return yi._fromParams({providerId:yr.PROVIDER_ID,signInMethod:yr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return yr.credentialFromTaggedObject(e)}static credentialFromError(e){return yr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return yr.credential(t,r)}catch{return null}}}yr.TWITTER_SIGN_IN_METHOD="twitter.com";yr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await cn._fromIdTokenResponse(e,r,i),a=_f(r);return new ds({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=_f(r);return new ds({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function _f(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ja extends nr{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Ja.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Ja(e,t,r,i)}}function Cm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ja._fromErrorAndOperation(n,s,e,r):s})}async function MT(n,e,t=!1){const r=await vo(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return ds._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FT(n,e,t=!1){const{auth:r}=n;if(an(r.app))return Promise.reject(xr(r));const i="reauthenticate";try{const s=await vo(n,Cm(r,i,e,n),t);Y(s.idToken,r,"internal-error");const a=Bu(s.idToken);Y(a,r,"internal-error");const{sub:l}=a;return Y(n.uid===l,r,"user-mismatch"),ds._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&fn(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function xm(n,e,t=!1){if(an(n.app))return Promise.reject(xr(n));const r="signIn",i=await Cm(n,r,e),s=await ds._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function UT(n,e){return xm(Ri(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jT(n){const e=Ri(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function BT(n,e,t){const r=Ri(n);await Bc(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",xT)}function Hu(n,e,t){return an(n.app)?Promise.reject(xr(n)):UT(Rt(n),Is.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&jT(n),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $T(n,e){return Rt(n).setPersistence(e)}function qT(n,e,t,r){return Rt(n).onIdTokenChanged(e,t,r)}function zT(n,e,t){return Rt(n).beforeAuthStateChanged(e,t)}function HT(n,e,t,r){return Rt(n).onAuthStateChanged(e,t,r)}function WT(n){return Rt(n).signOut()}const Ya="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Ya,"1"),this.storage.removeItem(Ya),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GT=1e3,KT=10;class Vm extends Dm{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Im(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,l,c)=>{this.notifyListeners(a,c)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);cT()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,KT):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},GT)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Vm.type="LOCAL";const Nm=Vm;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Om extends Dm{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Om.type="SESSION";const Lm=Om;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function QT(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Rl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(a).map(async h=>h(t.origin,s)),c=await QT(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Rl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wu(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JT{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((l,c)=>{const h=Wu("",20);i.port1.start();const f=setTimeout(()=>{c(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(g){const m=g;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(m.data.response);break;default:clearTimeout(f),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cn(){return window}function YT(n){Cn().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mm(){return typeof Cn().WorkerGlobalScope<"u"&&typeof Cn().importScripts=="function"}async function XT(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ZT(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function eI(){return Mm()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fm="firebaseLocalStorageDb",tI=1,Xa="firebaseLocalStorage",Um="fbase_key";class Mo{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function kl(n,e){return n.transaction([Xa],e?"readwrite":"readonly").objectStore(Xa)}function nI(){const n=indexedDB.deleteDatabase(Fm);return new Mo(n).toPromise()}function $c(){const n=indexedDB.open(Fm,tI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Xa,{keyPath:Um})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Xa)?e(r):(r.close(),await nI(),e(await $c()))})})}async function vf(n,e,t){const r=kl(n,!0).put({[Um]:e,value:t});return new Mo(r).toPromise()}async function rI(n,e){const t=kl(n,!1).get(e),r=await new Mo(t).toPromise();return r===void 0?null:r.value}function yf(n,e){const t=kl(n,!0).delete(e);return new Mo(t).toPromise()}const iI=800,sI=3;class jm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await $c(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>sI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Mm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Rl._getInstance(eI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await XT(),!this.activeServiceWorker)return;this.sender=new JT(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ZT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await $c();return await vf(e,Ya,"1"),await yf(e,Ya),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>vf(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>rI(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>yf(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=kl(i,!1).getAll();return new Mo(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),iI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}jm.type="LOCAL";const oI=jm;new Oo(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aI(n,e){return e?qn(e):(Y(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gu extends qu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ji(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ji(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ji(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function lI(n){return xm(n.auth,new Gu(n),n.bypassAuthState)}function cI(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),FT(t,new Gu(n),n.bypassAuthState)}async function uI(n){const{auth:e,user:t}=n;return Y(t,e,"internal-error"),MT(t,new Gu(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bm{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:l}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return lI;case"linkViaPopup":case"linkViaRedirect":return uI;case"reauthViaPopup":case"reauthViaRedirect":return cI;default:fn(this.auth,"internal-error")}}resolve(e){Zn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Zn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hI=new Oo(2e3,1e4);class qi extends Bm{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,qi.currentPopupAction&&qi.currentPopupAction.cancel(),qi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Y(e,this.auth,"internal-error"),e}async onExecution(){Zn(this.filter.length===1,"Popup operations only handle one event");const e=Wu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Pn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Pn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,qi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Pn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,hI.get())};e()}}qi.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dI="pendingRedirect",Aa=new Map;class fI extends Bm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Aa.get(this.auth._key());if(!e){try{const r=await pI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Aa.set(this.auth._key(),e)}return this.bypassAuthState||Aa.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function pI(n,e){const t=_I(e),r=mI(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function gI(n,e){Aa.set(n._key(),e)}function mI(n){return qn(n._redirectPersistence)}function _I(n){return Ia(dI,n.config.apiKey,n.name)}async function vI(n,e,t=!1){if(an(n.app))return Promise.reject(xr(n));const r=Ri(n),i=aI(r,e),a=await new fI(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yI=10*60*1e3;class wI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!bI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!$m(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Pn(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=yI&&this.cachedEventUids.clear(),this.cachedEventUids.has(wf(e))}saveEventToCache(e){this.cachedEventUids.add(wf(e)),this.lastProcessedEventTime=Date.now()}}function wf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function $m({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function bI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $m(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function EI(n,e={}){return rr(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,II=/^https?/;async function AI(n){if(n.config.emulator)return;const{authorizedDomains:e}=await EI(n);for(const t of e)try{if(SI(t))return}catch{}fn(n,"unauthorized-domain")}function SI(n){const e=Uc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!II.test(t))return!1;if(TI.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RI=new Oo(3e4,6e4);function bf(){const n=Cn().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function kI(n){return new Promise((e,t)=>{var r,i,s;function a(){bf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{bf(),t(Pn(n,"network-request-failed"))},timeout:RI.get()})}if(!((i=(r=Cn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=Cn().gapi)===null||s===void 0)&&s.load)a();else{const l=vT("iframefcb");return Cn()[l]=()=>{gapi.load?a():t(Pn(n,"network-request-failed"))},Sm(`${_T()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw Sa=null,e})}let Sa=null;function PI(n){return Sa=Sa||kI(n),Sa}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const CI=new Oo(5e3,15e3),xI="__/auth/iframe",DI="emulator/auth/iframe",VI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},NI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function OI(n){const e=n.config;Y(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ju(e,DI):`https://${n.config.authDomain}/${xI}`,r={apiKey:e.apiKey,appName:n.name,v:ys},i=NI.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Ro(r).slice(1)}`}async function LI(n){const e=await PI(n),t=Cn().gapi;return Y(t,n,"internal-error"),e.open({where:document.body,url:OI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:VI,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=Pn(n,"network-request-failed"),l=Cn().setTimeout(()=>{s(a)},CI.get());function c(){Cn().clearTimeout(l),i(r)}r.ping(c).then(c,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},FI=500,UI=600,jI="_blank",BI="http://localhost";class Ef{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function $I(n,e,t,r=FI,i=UI){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c=Object.assign(Object.assign({},MI),{width:r.toString(),height:i.toString(),top:s,left:a}),h=St().toLowerCase();t&&(l=ym(h)?jI:t),_m(h)&&(e=e||BI,c.scrollbars="yes");const f=Object.entries(c).reduce((m,[T,k])=>`${m}${T}=${k},`,"");if(lT(h)&&l!=="_self")return qI(e||"",l),new Ef(null);const g=window.open(e||"",l,f);Y(g,n,"popup-blocked");try{g.focus()}catch{}return new Ef(g)}function qI(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zI="__/auth/handler",HI="emulator/auth/handler",WI=encodeURIComponent("fac");async function Tf(n,e,t,r,i,s){Y(n.config.authDomain,n,"auth-domain-config-required"),Y(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ys,eventId:i};if(e instanceof Pm){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",yy(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries({}))a[f]=g}if(e instanceof Lo){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const c=await n._getAppCheckToken(),h=c?`#${WI}=${encodeURIComponent(c)}`:"";return`${GI(n)}?${Ro(l).slice(1)}${h}`}function GI({config:n}){return n.emulator?ju(n,HI):`https://${n.authDomain}/${zI}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc="webStorageSupport";class KI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Lm,this._completeRedirectFn=vI,this._overrideRedirectResult=gI}async _openPopup(e,t,r,i){var s;Zn((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await Tf(e,t,r,Uc(),i);return $I(e,a,Wu())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Tf(e,t,r,Uc(),i);return YT(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(Zn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await LI(e),r=new wI(e);return t.register("authEvent",i=>(Y(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(nc,{type:nc},i=>{var s;const a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[nc];a!==void 0&&t(!!a),fn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=AI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Im()||vm()||$u()}}const QI=KI;var If="@firebase/auth",Af="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){Y(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function XI(n){ss(new mi("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;Y(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Am(n)},h=new pT(r,i,s,c);return IT(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),ss(new mi("auth-internal",e=>{const t=Ri(e.getProvider("auth").getImmediate());return(r=>new JI(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),kr(If,Af,YI(n)),kr(If,Af,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZI=5*60,eA=Tp("authIdTokenMaxAge")||ZI;let Sf=null;const tA=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>eA)return;const i=t==null?void 0:t.token;Sf!==i&&(Sf=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function nA(n=Pp()){const e=su(n,"auth");if(e.isInitialized())return e.getImmediate();const t=TT(n,{popupRedirectResolver:QI,persistence:[oI,Nm,Lm]}),r=Tp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=tA(s.toString());zT(t,a,()=>a(t.currentUser)),qT(t,l=>a(l))}}const i=bp("auth");return i&&AT(t,`http://${i}`),t}function rA(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}gT({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Pn("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",rA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});XI("Browser");const iA={apiKey:"AIzaSyDYl7I27PHWm8o-1j0JQbiN21GqofATtMk",authDomain:"shrishesha-n.firebaseapp.com",projectId:"shrishesha-n",storageBucket:"shrishesha-n.firebasestorage.app",messagingSenderId:"947201474466",appId:"1:947201474466:web:81e4d49ef5bd00c4047cfb",measurementId:"G-R4WJP4HS1D"},qm=id().length===0?kp(iA):id()[0],zt=Yg(qm),ye=nA(qm),sA=typeof window<"u"?localStorage.getItem("isAuthenticated")==="true":!1,Pl=Ei(sA);$T(ye,Nm);Pl.subscribe(n=>{typeof window<"u"&&localStorage.setItem("isAuthenticated",n.toString())});HT(ye,n=>{const e=!!n;Pl.set(e)});async function oA(n,e){try{await Hu(ye,n,e),Pl.set(!0)}catch(t){throw console.error("Firebase auth error:",t),new Error("Invalid credentials")}}async function aA(n){try{return await BT(ye,n),{success:!0,message:"Password reset email sent successfully"}}catch(e){throw console.error("Password reset error:",e),new Error("Failed to send password reset email")}}function ze(n,e){e!=null&&e.replace?window.history.replaceState({},"",n):window.history.pushState({},"",n),window.dispatchEvent(new Event("popstate"))}function lA(){const{subscribe:n,set:e}=Ei(!1);return{subscribe:n,show:()=>e(!0),hide:()=>e(!1)}}const qc=lA();var cA=K('<div class="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 dark:bg-neutral-900/30 z-50"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-neutral-900 dark:border-white"></div></div>');function zi(n){const e=()=>jr(qc,"$loading",t),[t,r]=Br();var i=at(),s=Ke(i);{var a=l=>{var c=cA();q(l,c)};oe(s,l=>{e()&&l(a)})}q(n,i),r()}function uA(){const{subscribe:n,set:e}=Ei([]);let t=null;return{subscribe:n,set:async r=>{try{if(!ye.currentUser)throw new Error("Authentication required to save projects");await No(un(zt,"projects",ye.currentUser.uid),{projects:r}),e(r)}catch(i){throw console.error("Error saving projects:",i),i}},load:async()=>{try{if(t&&t(),ye.currentUser)t=Il(un(zt,"projects",ye.currentUser.uid),r=>{if(r.exists()){const i=r.data().projects||[];e(i)}else e([])},r=>{console.error("Projects listener error:",r),e([])});else try{const r=mo(zt,"projects"),i=await _o(r);if(i.empty)e([]);else{const a=i.docs[0].data().projects||[];e(a)}}catch(r){console.error("Error fetching public projects:",r),e([])}}catch(r){console.error("Error loading projects:",r),e([])}},cleanup:()=>{t&&t()}}}const Zt=uA();function hA(){const{subscribe:n,set:e}=Ei(null);return{subscribe:n,show:(t,r)=>{e({message:t,type:r}),setTimeout(()=>e(null),3e3)}}}const xt=hA();var dA=K('<div class="text-red-500 text-center p-4"> </div>'),fA=K('<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>'),pA=K('<div class="w-full h-full flex items-center justify-center text-neutral-300 dark:text-neutral-700"><i class="fas fa-image text-4xl"></i></div>'),gA=K('<span class="px-2 py-1 rounded-md bg-neutral-100 dark:bg-white/5 text-xs font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-white/5"> </span>'),mA=K('<span class="px-2 py-1 text-xs text-neutral-400"> </span>'),_A=K('<div class="glass-card group relative overflow-hidden hover:border-orange-500/30 transition-all duration-300"><div class="aspect-video w-full bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden"><!> <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]"><button class="w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors shadow-lg" title="Edit"><i class="fas fa-pen"></i></button> <button class="w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg" title="Delete"><i class="fas fa-trash"></i></button></div></div> <div class="p-5"><h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2 line-clamp-1"> </h3> <p class="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]"> </p> <div class="flex flex-wrap gap-2"><!> <!></div></div></div>'),vA=K('<div class="space-y-6 pb-20 md:pb-0"><div class="flex justify-between items-center mb-6"><div><h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Projects</h1> <p class="text-neutral-500 dark:text-neutral-400 text-sm">Manage your portfolio showcase</p></div> <button class="glass-button glass-button-primary px-4 py-2 flex items-center gap-2 shadow-lg shadow-orange-500/20"><i class="fas fa-plus"></i> <span class="hidden sm:inline">New Project</span></button></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div></div>');function yA(n,e){en(e,!1);const t=()=>jr(Zt,"$projects",r),[r,i]=Br();let s=he([]),a=he(!0),l=he("");On(()=>{const P=ye.onAuthStateChanged(async A=>{try{if(!A){ze("/login",{replace:!0});return}await Zt.load(),z(s,[...t()]),z(a,!1)}catch{z(l,"Failed to load projects data"),z(a,!1)}});return()=>P()});function c(){ze("/projects/new")}function h(P){ze(`/projects/edit/${P.id}`)}async function f(P){if(confirm("Are you sure you want to delete this project?"))try{const A=y(s).filter(C=>C.id!==P.id);await Zt.set(A),xt.show("Project deleted successfully!","success")}catch{xt.show("Failed to delete project","error")}}Zc(()=>t(),()=>{t()&&z(s,[...t()])}),eu(),pn();var g=at(),m=Ke(g);{var T=P=>{zi(P)},k=P=>{var A=at(),C=Ke(A);{var U=M=>{var j=dA(),$=x(j);Ne(()=>Oe($,y(l))),q(M,j)},F=M=>{var j=vA(),$=x(j),E=V(x($),2),_=V($,2);En(_,5,()=>y(s),bn,(w,v)=>{var I=_A(),S=x(I),b=x(S);{var Te=Z=>{var Le=fA();Ne(()=>{oo(Le,"src",(y(v),Re(()=>y(v).image))),oo(Le,"alt",(y(v),Re(()=>y(v).title)))}),q(Z,Le)},we=Z=>{var Le=pA();q(Z,Le)};oe(b,Z=>{y(v),Re(()=>y(v).image)?Z(Te):Z(we,!1)})}var ge=V(b,2),re=x(ge),me=V(re,2),Ae=V(S,2),je=x(Ae),st=x(je),ce=V(je,2),ee=x(ce),Be=V(ce,2),$e=x(Be);En($e,1,()=>(y(v),Re(()=>y(v).technologies.slice(0,3))),bn,(Z,Le)=>{var He=gA(),Fe=x(He);Ne(()=>Oe(Fe,y(Le))),q(Z,He)});var yt=V($e,2);{var Ie=Z=>{var Le=mA(),He=x(Le);Ne(()=>Oe(He,`+${y(v),Re(()=>y(v).technologies.length-3)??""}`)),q(Z,Le)};oe(yt,Z=>{y(v),Re(()=>y(v).technologies.length>3)&&Z(Ie)})}Ne(()=>{Oe(st,(y(v),Re(()=>y(v).title))),Oe(ee,(y(v),Re(()=>y(v).description)))}),J("click",re,()=>h(y(v))),J("click",me,()=>f(y(v))),q(w,I)}),J("click",E,c),q(M,j)};oe(C,M=>{y(l)?M(U):M(F,!1)},!0)}q(P,A)};oe(m,P=>{y(a)?P(T):P(k,!1)})}q(n,g),tn(),i()}async function wA(n,e){try{return await No(un(zt,"profiles",n),e),!0}catch(t){throw console.error("Error saving profile:",t),t}}async function rc(){var n,e;try{console.log("Testing Firestore connection..."),console.log("Current user:",(n=ye.currentUser)==null?void 0:n.uid);const t=mo(zt,"profiles"),r=mo(zt,"projects"),i=await _o(t),s=await _o(r);return{success:!0,userId:(e=ye.currentUser)==null?void 0:e.uid,isConnected:!0,collections:{profiles:!i.empty,projects:!s.empty}}}catch(t){return console.error("Firestore debug error:",t),{success:!1,error:t instanceof Error?t.message:"Unknown error",isConnected:!1}}}const Us={name:"",title:"",sub_title:[""],bio:"",location:"",skills:[],experience:[],education:[],typingStrings:[""],favicon:"",profileImage:"",techStack:[],particlesQuantity:1e3,badges:[]};function bA(){const{subscribe:n,set:e}=Ei(Us);let t=null;return{subscribe:n,set:async r=>{try{if(!ye.currentUser)throw new Error("Authentication required to save profile");await wA(ye.currentUser.uid,r),e(r)}catch(i){throw console.error("Error saving profile:",i),i}},load:async()=>{try{t&&t();const r=mo(zt,"profiles"),i=await _o(r);if(i.empty)e(Us);else{const s=i.docs[0];t=Il(un(zt,"profiles",s.id),a=>{a.exists()?e(a.data()):e(Us)},a=>{console.error("Profile snapshot error:",a),e(Us)})}}catch(r){console.error("Error loading profile:",r),e(Us)}},cleanup:()=>{t&&t()}}}const zn=bA(),EA="optimage",TA="portfolio-images";async function IA(n){try{const e=new FormData;e.append("file",n),e.append("upload_preset",TA);const t=await fetch(`https://api.cloudinary.com/v1_1/${EA}/image/upload`,{method:"POST",body:e});if(!t.ok)throw new Error("Upload failed");return(await t.json()).secure_url}catch(e){throw console.error("Error uploading image:",e),new Error("Failed to upload image")}}var AA=K('<div class="relative group glass-card-hover"><img alt="Preview" class="w-full h-48 object-cover rounded-lg"/> <button type="button" class="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">Change Image</button></div>'),SA=K('<button type="button" class="w-full h-48 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg flex items-center justify-center hover:border-primary-500 transition-colors"><div class="text-center"><i class="fas fa-cloud-upload-alt text-white text-2xl mb-2"></i> <p class="text-white">Click to upload image</p> <p class="text-sm text-neutral-100">Max size: 10MB</p></div></button>'),RA=K('<p class="text-red-500 text-sm"> </p>'),kA=K('<div class="flex flex-col items-center gap-4"><!> <input type="file" accept="image/*" class="hidden"/> <!></div>');function Za(n,e){en(e,!1);let t=_c(e,"currentImage",8,""),r=_c(e,"onImageUploaded",8),i=he(),s=he(t()),a=he("");async function l(P){var U;const C=(U=P.target.files)==null?void 0:U[0];if(C){if(!C.type.startsWith("image/")){z(a,"Please select an image file");return}if(C.size>10*1024*1024){z(a,"Image size should be less than 10MB");return}try{z(a,""),qc.show(),z(s,URL.createObjectURL(C));const F=await IA(C);r()(F)}catch(F){z(a,"Failed to upload image"),console.error("Upload error:",F)}finally{qc.hide()}}}pn();var c=kA(),h=x(c);{var f=P=>{var A=AA(),C=x(A),U=V(C,2);Ne(()=>oo(C,"src",y(s))),J("click",U,()=>y(i).click()),q(P,A)},g=P=>{var A=SA();J("click",A,()=>y(i).click()),q(P,A)};oe(h,P=>{y(s)?P(f):P(g,!1)})}var m=V(h,2);qv(m,P=>z(i,P),()=>y(i));var T=V(m,2);{var k=P=>{var A=RA(),C=x(A);Ne(()=>Oe(C,y(a))),q(P,A)};oe(T,P=>{y(a)&&P(k)})}J("change",m,l),q(n,c),tn()}var PA=K('<div class="text-red-500 text-center p-4"> </div>'),CA=K('<div class="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm z-10"><!></div>'),xA=K('<div class="flex gap-2 w-min"><input type="text" class="flex-1 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/> <button type="button" class="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><i class="fas fa-trash"></i></button></div>'),DA=K('<div class="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm z-10"><!></div>'),VA=K('<div class="flex flex-col sm:flex-row items-center gap-2 mb-4"><div class="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full"><input type="text" placeholder="Year" class="w-[calc(100%-2rem)] px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/> <div class="relative flex items-center"><input type="text" placeholder="Degree" class="w-[calc(100%-2rem)] px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <input type="text" placeholder="Institution" class="w-[calc(100%-2rem)] px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <button type="button" class="absolute right-0 py-2 sm:mt-0 mt-14 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><i class="fas fa-trash"></i></button></div>'),NA=K('<div class="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm z-10"><!></div>'),OA=K('<div class="flex gap-2 w-min"><input type="text" class="flex-1 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/> <button type="button" class="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><i class="fas fa-trash"></i></button></div>'),LA=K('<div class="flex gap-2"><input type="text" class="flex-1 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500" placeholder="e.g., React, Node.js, etc."/> <button type="button" class="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><i class="fas fa-trash"></i></button></div>'),MA=K('<div class="glass-card p-4 space-y-3"><div class="flex justify-between items-start"><input type="text" class="flex-1 px-3 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500" placeholder="Badge title (e.g., Oracle Certified Professional)"/> <button type="button" class="ml-2 px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><i class="fas fa-trash"></i></button></div> <div class="max-w-xs"><!></div></div>'),FA=K('<div><form class="space-y-6"><div class="relative"><!> <div class="mb-6"><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Profile Image</label> <div class="max-w-auto"><!></div> <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Recommended size: 256x256 pixels (Square format)</p></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Particle Quantity</label> <input type="text" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Name</label> <input type="text" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Title</label> <input type="text" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Subtitle</label> <div class="space-y-2 mb-3"><!> <button type="button" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">+ Add More</button></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Bio</label> <textarea class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500" rows="4"></textarea></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Location</label> <input class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Skills (comma-separated)</label> <input type="text" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Experience (one per line)</label> <textarea class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500" rows="4"></textarea></div></div> <div><div class="relative"><!> <label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Education</label> <!> <button type="button" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-2 border-black dark:border-white">+ Add Education</button></div></div> <div><div class="relative"><!> <label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Typing Animation Strings</label> <div class="space-y-2"><!> <button type="button" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">+ Add String</button></div></div> <div class="relative"><label class="block mb-2 mt-6 font-bold text-neutral-700 dark:text-neutral-300">Tech Stack</label> <div class="space-y-2"><!> <button type="button" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">+ Add Technology</button></div></div> <div class="relative"><label class="block mb-2 mt-6 font-bold text-neutral-700 dark:text-neutral-300">Certification Badges</label> <div class="space-y-4"><!> <button type="button" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">+ Add Badge</button></div></div> <div class="flex justify-center mt-6"><button type="submit" class="glass-button hover:scale-105 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"> </button></div></div></form></div>');function UA(n,e){en(e,!1);const t=()=>jr(zn,"$profile",r),[r,i]=Br(),s=Yg();let a=he({...t()}),l=he(!0),c=he(""),h=he({profile:!1,education:!1,typing:!1});async function f(){try{if(!ye.currentUser){ze("/login",{replace:!0});return}const A=await af(un(s,"profiles","default"));let C=A.exists()?A.data():{};const U=await af(un(s,"profiles",ye.currentUser.uid));if(U.exists()){const F=U.data();C={...C,...F}}z(a,{name:C.name||"",title:C.title||"",sub_title:C.sub_title||"",bio:C.bio||"",location:C.location||"",skills:C.skills||[],experience:C.experience||[],education:C.education||[],typingStrings:C.typingStrings||"",favicon:C.favicon||"",profileImage:C.profileImage||"",techStack:C.techStack||"",particlesQuantity:C.particlesQuantity||100,badges:C.badges||[]}),await zn.set(y(a)),z(l,!1)}catch(A){console.error("Error loading profile:",A),z(c,"Failed to load profile data"),z(l,!1)}}async function g(){try{if(!ye.currentUser)throw new Error("Not authenticated");se(h,y(h).profile=!0),await No(un(s,"profiles",ye.currentUser.uid),y(a)),await zn.set(y(a)),xt.show("Profile updated successfully!","success")}catch(A){console.error("Error updating profile:",A),xt.show("Failed to update profile","error")}finally{se(h,y(h).profile=!1)}}On(()=>{const A=ye.onAuthStateChanged(C=>{C&&f()});return()=>{A()}}),pn();var m=at(),T=Ke(m);{var k=A=>{zi(A)},P=A=>{var C=at(),U=Ke(C);{var F=j=>{var $=PA(),E=x($);Ne(()=>Oe(E,y(c))),q(j,$)},M=j=>{var $=FA(),E=x($),_=x(E),w=x(_);{var v=Q=>{var Se=CA(),Ce=x(Se);zi(Ce),q(Q,Se)};oe(w,Q=>{y(h).profile&&Q(v)})}var I=V(w,2),S=V(x(I),2),b=x(S);Za(b,{get currentImage(){return y(a).profileImage},onImageUploaded:Q=>se(a,y(a).profileImage=Q)});var Te=V(I,2),we=V(x(Te),2),ge=V(Te,2),re=V(x(ge),2),me=V(ge,2),Ae=V(x(me),2),je=V(me,4),st=x(je);En(st,1,()=>y(a).sub_title,bn,(Q,Se,Ce)=>{var Je=xA(),ut=x(Je),Dt=V(ut,2);Pe(ut,()=>y(a).sub_title[Ce],nt=>se(a,y(a).sub_title[Ce]=nt)),J("click",Dt,()=>{se(a,y(a).sub_title=y(a).sub_title.filter((nt,Ut)=>Ut!==Ce))}),q(Q,Je)});var ce=V(st,2),ee=V(je,2),Be=V(x(ee),2),$e=V(ee,2),yt=V(x($e),2),Ie=V($e,2),Z=V(x(Ie),2),Le=V(Ie,2),He=V(x(Le),2),Fe=V(_,2),Ln=x(Fe),ir=x(Ln);{var sr=Q=>{var Se=DA(),Ce=x(Se);zi(Ce),q(Q,Se)};oe(ir,Q=>{y(h).education&&Q(sr)})}var or=V(ir,4);En(or,1,()=>y(a).education,bn,(Q,Se,Ce)=>{var Je=VA(),ut=x(Je),Dt=x(ut),nt=V(Dt,2),Ut=x(nt),Wr=V(nt,2),Vt=V(ut,2);Pe(Dt,()=>y(Se).year,nn=>(y(Se).year=nn,ia(()=>y(a)))),Pe(Ut,()=>y(Se).degree,nn=>(y(Se).degree=nn,ia(()=>y(a)))),Pe(Wr,()=>y(Se).institution,nn=>(y(Se).institution=nn,ia(()=>y(a)))),J("click",Vt,()=>{se(a,y(a).education=y(a).education.filter((nn,Ci)=>Ci!==Ce))}),q(Q,Je)});var ki=V(or,2),Qe=V(Fe,2),ar=x(Qe),lr=x(ar);{var qr=Q=>{var Se=NA(),Ce=x(Se);zi(Ce),q(Q,Se)};oe(lr,Q=>{y(h).typing&&Q(qr)})}var Fo=V(lr,4),Uo=x(Fo);En(Uo,1,()=>y(a).typingStrings,bn,(Q,Se,Ce)=>{var Je=OA(),ut=x(Je),Dt=V(ut,2);Pe(ut,()=>y(a).typingStrings[Ce],nt=>se(a,y(a).typingStrings[Ce]=nt)),J("click",Dt,()=>{se(a,y(a).typingStrings=y(a).typingStrings.filter((nt,Ut)=>Ut!==Ce))}),q(Q,Je)});var As=V(Uo,2),Pi=V(ar,2),jo=V(x(Pi),2),tt=x(jo);En(tt,1,()=>y(a).techStack,bn,(Q,Se,Ce)=>{var Je=LA(),ut=x(Je),Dt=V(ut,2);Pe(ut,()=>y(a).techStack[Ce],nt=>se(a,y(a).techStack[Ce]=nt)),J("click",Dt,()=>{se(a,y(a).techStack=y(a).techStack.filter((nt,Ut)=>Ut!==Ce))}),q(Q,Je)});var ct=V(tt,2),zr=V(Pi,2),Bo=V(x(zr),2),Ss=x(Bo);En(Ss,1,()=>y(a).badges,bn,(Q,Se,Ce)=>{var Je=MA(),ut=x(Je),Dt=x(ut),nt=V(Dt,2),Ut=V(ut,2),Wr=x(Ut);Za(Wr,{get currentImage(){return y(Se).imageUrl},onImageUploaded:Vt=>{se(a,y(a).badges[Ce].imageUrl=Vt),se(a,y(a).badges=y(a).badges)}}),Pe(Dt,()=>y(Se).title,Vt=>(y(Se).title=Vt,ia(()=>y(a)))),J("click",nt,()=>{se(a,y(a).badges=y(a).badges.filter((Vt,nn)=>nn!==Ce))}),q(Q,Je)});var Cl=V(Ss,2),Hr=V(zr,2),Rs=x(Hr),$o=x(Rs);Ne((Q,Se,Ce,Je)=>{Da(Z,Q),Da(He,Se),Rs.disabled=Ce,Oe($o,Je)},[()=>y(a).skills.join(", "),()=>y(a).experience.join(`
`),()=>Object.values(y(h)).some(Q=>Q),()=>Object.values(y(h)).some(Q=>Q)?"Saving...":"Save Changes"]),Pe(we,()=>t().particlesQuantity,Q=>Wv(zn,Re(t).particlesQuantity=Q,Re(t))),Pe(re,()=>y(a).name,Q=>se(a,y(a).name=Q)),Pe(Ae,()=>y(a).title,Q=>se(a,y(a).title=Q)),J("click",ce,()=>{se(a,y(a).sub_title=[...y(a).sub_title,""])}),Pe(Be,()=>y(a).bio,Q=>se(a,y(a).bio=Q)),Pe(yt,()=>y(a).location,Q=>se(a,y(a).location=Q)),J("input",Z,Q=>{Q.target&&se(a,y(a).skills=Q.target.value.split(",").map(Se=>Se.trim()))}),J("input",He,Q=>{Q.target&&Q.target instanceof HTMLTextAreaElement&&se(a,y(a).experience=Q.target.value.split(`
`).filter(Boolean))}),J("click",ki,()=>se(a,y(a).education=[...y(a).education,{year:"",degree:"",institution:""}])),J("click",As,()=>{se(a,y(a).typingStrings=[...y(a).typingStrings,""])}),J("click",ct,()=>{se(a,y(a).techStack=[...y(a).techStack,""])}),J("click",Cl,()=>{se(a,y(a).badges=[...y(a).badges,{title:"",imageUrl:""}])}),J("submit",E,Ao(g)),q(j,$)};oe(U,j=>{y(c)?j(F):j(M,!1)},!0)}q(A,C)};oe(T,A=>{y(l)?A(k):A(P,!1)})}q(n,m),tn(),i()}function jA(){const{subscribe:n,set:e}=Ei([]);let t=null;return{subscribe:n,set:async r=>{try{if(!ye.currentUser)throw new Error("Authentication required to save blogs");await No(un(zt,"blogs",ye.currentUser.uid),{blogs:r}),e(r)}catch(i){throw console.error("Error saving blogs:",i),i}},load:async()=>{try{if(t&&t(),ye.currentUser)t=Il(un(zt,"blogs",ye.currentUser.uid),r=>{if(r.exists()){const i=r.data().blogs||[];e(i)}else e([])},r=>{console.error("Blogs listener error:",r),e([])});else try{const r=mo(zt,"blogs"),i=await _o(r);if(i.empty)e([]);else{const a=i.docs[0].data().blogs||[];e(a)}}catch(r){console.error("Error fetching public blogs:",r),e([])}}catch(r){console.error("Error loading blogs:",r),e([])}},cleanup:()=>{t&&t()}}}const Hn=jA();var BA=K('<img class="w-full h-full object-cover"/>'),$A=K('<div class="w-full h-full flex items-center justify-center text-neutral-300 dark:text-neutral-700"><i class="fas fa-newspaper"></i></div>'),qA=K('<span class="text-xs text-neutral-400">•</span> <span class="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[150px]"> </span>',1),zA=K('<div class="glass-card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center group hover:border-orange-500/30 transition-all duration-300"><div class="w-full sm:w-24 h-24 sm:h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0"><!></div> <div class="flex-1 min-w-0"><h3 class="text-lg font-bold text-neutral-900 dark:text-white truncate"> </h3> <p class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1"> </p> <div class="flex items-center gap-2 mt-2"><span class="text-xs font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300"> </span> <!></div></div> <div class="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0"><button class="flex-1 sm:flex-none glass-button-outline px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-2 hover:text-orange-600 dark:hover:text-orange-400"><i class="fas fa-pen"></i> <span class="sm:hidden">Edit</span></button> <button class="flex-1 sm:flex-none glass-button-outline px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30"><i class="fas fa-trash"></i> <span class="sm:hidden">Delete</span></button></div></div>'),HA=K('<div class="space-y-6 pb-20 md:pb-0"><div class="flex justify-between items-center mb-6"><div><h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Blog Posts</h1> <p class="text-neutral-500 dark:text-neutral-400 text-sm">Manage your editorial content</p></div> <button class="glass-button glass-button-primary px-4 py-2 flex items-center gap-2 shadow-lg shadow-orange-500/20"><i class="fas fa-plus"></i> <span class="hidden sm:inline">New Post</span></button></div> <div class="grid grid-cols-1 gap-4"></div></div>');function WA(n,e){en(e,!1);const t=()=>jr(Hn,"$blogs",r),[r,i]=Br();_c(e,"editingBlog",8,null);let s=he([]),a=he(!0);On(()=>{const k=ye.onAuthStateChanged(async P=>{try{if(!P){ze("/login");return}await Hn.load(),z(s,[...t()]),z(a,!1)}catch{xt.show("Failed to load blogs data","error"),z(a,!1)}});return()=>k()});function l(){ze("/blogs/new")}function c(k){ze(`/blogs/edit/${k.id}`)}async function h(k){if(confirm("Are you sure you want to delete this post?"))try{const P=y(s).filter(A=>A.id!==k);await Hn.set(P),xt.show("Blog post deleted successfully!","success")}catch{xt.show("Failed to delete blog post","error")}}Zc(()=>t(),()=>{t()&&z(s,[...t()])}),eu(),pn();var f=at(),g=Ke(f);{var m=k=>{zi(k)},T=k=>{var P=HA(),A=x(P),C=V(x(A),2),U=V(A,2);En(U,5,()=>y(s),bn,(F,M)=>{var j=zA(),$=x(j),E=x($);{var _=ee=>{var Be=BA();Ne(()=>{oo(Be,"src",(y(M),Re(()=>y(M).image))),oo(Be,"alt",(y(M),Re(()=>y(M).title)))}),q(ee,Be)},w=ee=>{var Be=$A();q(ee,Be)};oe(E,ee=>{y(M),Re(()=>y(M).image)?ee(_):ee(w,!1)})}var v=V($,2),I=x(v),S=x(I),b=V(I,2),Te=x(b),we=V(b,2),ge=x(we),re=x(ge),me=V(ge,2);{var Ae=ee=>{var Be=qA(),$e=V(Ke(Be),2),yt=x($e);Ne(Ie=>Oe(yt,Ie),[()=>(y(M),Re(()=>y(M).tags.join(", ")))]),q(ee,Be)};oe(me,ee=>{y(M),Re(()=>y(M).tags&&y(M).tags.length>0)&&ee(Ae)})}var je=V(v,2),st=x(je),ce=V(st,2);Ne(ee=>{Oe(S,(y(M),Re(()=>y(M).title))),Oe(Te,(y(M),Re(()=>y(M).description))),Oe(re,ee)},[()=>(y(M),Re(()=>new Date(y(M).date).toLocaleDateString()))]),J("click",st,()=>c(y(M))),J("click",ce,()=>h(y(M).id)),q(F,j)}),J("click",C,l),q(k,P)};oe(g,k=>{y(a)?k(m):k(T,!1)})}q(n,f),tn(),i()}const fa={spreadsheetUrl:"",email:"",phone:"",location:""};function GA(){const{subscribe:n,set:e}=Ei(fa);let t=null;return{subscribe:n,set:async r=>{try{await No(un(zt,"config","contact"),r),e(r)}catch(i){throw console.error("Error saving contact config:",i),i}},load:async()=>{try{t&&t(),t=Il(un(zt,"config","contact"),r=>{r.exists()?e(r.data()):e(fa)},r=>{console.error("Contact config listener error:",r),e(fa)})}catch(r){console.error("Error loading contact config:",r),e(fa)}},cleanup:()=>{t&&t()}}}const Dr=GA();var KA=K('<div class="flex justify-center"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div></div>'),QA=K('<div class="text-red-500 text-center p-4"> </div>'),JA=K('<form class="space-y-6"><div><label class="block mb-2 text-neutral-700 dark:text-neutral-300">Google Apps Script Link</label> <input type="url" required class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500" placeholder=""/></div> <div><label class="block mb-2 text-neutral-700 dark:text-neutral-300">Email</label> <input type="email" required class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 text-neutral-700 dark:text-neutral-300">Phone (optional)</label> <input type="tel" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 text-neutral-700 dark:text-neutral-300">Location (optional)</label> <input type="text" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div class="flex justify-center"><button type="submit" class="glass-button hover:scale-105 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500">Save Changes</button></div></form>'),YA=K("<div><!></div>");function XA(n,e){en(e,!1);const t=()=>jr(Dr,"$contact",r),[r,i]=Br();let s=he({spreadsheetUrl:"",email:"",phone:"",location:""}),a=he(!0),l=he("");On(()=>{const T=ye.onAuthStateChanged(async k=>{try{if(!k){ze("/login");return}await Dr.load(),z(s,{...t()}),z(a,!1)}catch{z(l,"Failed to load contact configuration"),z(a,!1)}});return()=>T()});async function c(){try{await Dr.set(y(s)),xt.show("Contact information updated successfully!","success")}catch{xt.show("Failed to update contact information","error")}}pn();var h=YA(),f=x(h);{var g=T=>{var k=KA();q(T,k)},m=T=>{var k=at(),P=Ke(k);{var A=U=>{var F=QA(),M=x(F);Ne(()=>Oe(M,y(l))),q(U,F)},C=U=>{var F=JA(),M=x(F),j=V(x(M),2),$=V(M,2),E=V(x($),2),_=V($,2),w=V(x(_),2),v=V(_,2),I=V(x(v),2);Pe(j,()=>y(s).spreadsheetUrl,S=>se(s,y(s).spreadsheetUrl=S)),Pe(E,()=>y(s).email,S=>se(s,y(s).email=S)),Pe(w,()=>y(s).phone,S=>se(s,y(s).phone=S)),Pe(I,()=>y(s).location,S=>se(s,y(s).location=S)),J("submit",F,Ao(c)),q(U,F)};oe(P,U=>{y(l)?U(A):U(C,!1)},!0)}q(T,k)};oe(f,T=>{y(a)?T(g):T(m,!1)})}q(n,h),tn(),i()}var ZA=K('<div class="h-screen w-screen overflow-hidden flex flex-col md:flex-row p-4 gap-4 bg-neutral-100 dark:bg-neutral-950 transition-colors duration-500"><nav class="md:h-full md:w-24 w-full h-20 glass-card flex md:flex-col justify-between items-center py-6 px-2 z-50 shrink-0 border-neutral-200 dark:border-white/5"><div class="flex md:flex-col gap-6 items-center justify-center w-full"><button><div class="icon-container"><i class="fas fa-user"></i></div></button> <button><div class="icon-container"><i class="fas fa-cubes"></i></div></button> <button><div class="icon-container"><i class="fas fa-edit"></i></div></button> <button><div class="icon-container"><i class="fas fa-address-book"></i></div></button> <button class="dock-item group"><div class="icon-container bg-red-500/5 dark:bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"><i class="fas fa-power-off"></i></div></button></div></nav> <main class="flex-1 glass-card overflow-hidden flex flex-col border-neutral-200 dark:border-white/5"><div class="h-14 border-b border-neutral-200/50 dark:border-white/5 flex items-center justify-between px-6 bg-white/20 dark:bg-white/5 backdrop-blur-xl shrink-0"><div class="flex items-center gap-3"><h2 class="text-sm font-semibold text-neutral-800 dark:text-white/90"><!></h2></div></div> <div class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar svelte-1thed0a"><div class="max-w-5xl mx-auto animate-workspace-in svelte-1thed0a"><!></div></div></main></div>');function eS(n,e){en(e,!1);const t=()=>jr(Pl,"$isAuthenticated",r),[r,i]=Br();let s=he("profile"),a=he(null);function l(m){z(s,m),ze(`/?tab=${m}`,{replace:!0})}On(async()=>{if(!t()){ze("/login");return}const T=new URLSearchParams(window.location.search).get("tab");T&&["profile","projects","blogs","contact"].includes(T)&&z(s,T),await Promise.all([Hn.load(),Zt.load(),zn.load(),Dr.load()])});async function c(){try{await WT(ye),ze("/login")}catch(m){console.error("Error signing out:",m)}}pp(()=>{Hn.cleanup(),Zt.cleanup(),zn.cleanup(),Dr.cleanup()}),Zc(()=>y(s),()=>{y(s)!=="blogs"&&z(a,null)}),eu(),pn();var h=at(),f=Ke(h);{var g=m=>{var T=ZA(),k=x(T),P=x(k),A=x(P),C=V(A,2),U=V(C,2),F=V(U,2),M=V(F,2),j=V(k,2),$=x(j),E=x($),_=x(E),w=x(_);{var v=re=>{var me=sa("Manage Profile");q(re,me)},I=re=>{var me=at(),Ae=Ke(me);{var je=ce=>{var ee=sa("Project Portfolio");q(ce,ee)},st=ce=>{var ee=at(),Be=Ke(ee);{var $e=Ie=>{var Z=sa("Editorial Studio");q(Ie,Z)},yt=Ie=>{var Z=at(),Le=Ke(Z);{var He=Fe=>{var Ln=sa("Communication Hub");q(Fe,Ln)};oe(Le,Fe=>{y(s)==="contact"&&Fe(He)},!0)}q(Ie,Z)};oe(Be,Ie=>{y(s)==="blogs"?Ie($e):Ie(yt,!1)},!0)}q(ce,ee)};oe(Ae,ce=>{y(s)==="projects"?ce(je):ce(st,!1)},!0)}q(re,me)};oe(w,re=>{y(s)==="profile"?re(v):re(I,!1)})}var S=V($,2),b=x(S),Te=x(b);{var we=re=>{UA(re,{})},ge=re=>{var me=at(),Ae=Ke(me);{var je=ce=>{yA(ce,{})},st=ce=>{var ee=at(),Be=Ke(ee);{var $e=Ie=>{WA(Ie,{get editingBlog(){return y(a)},set editingBlog(Z){z(a,Z)},$$legacy:!0})},yt=Ie=>{var Z=at(),Le=Ke(Z);{var He=Fe=>{XA(Fe,{})};oe(Le,Fe=>{y(s)==="contact"&&Fe(He)},!0)}q(Ie,Z)};oe(Be,Ie=>{y(s)==="blogs"?Ie($e):Ie(yt,!1)},!0)}q(ce,ee)};oe(Ae,ce=>{y(s)==="projects"?ce(je):ce(st,!1)},!0)}q(re,me)};oe(Te,re=>{y(s)==="profile"?re(we):re(ge,!1)})}Ne(()=>{qs(A,1,`dock-item group ${y(s)==="profile"?"active":""}`),qs(C,1,`dock-item group ${y(s)==="projects"?"active":""}`),qs(U,1,`dock-item group ${y(s)==="blogs"?"active":""}`),qs(F,1,`dock-item group ${y(s)==="contact"?"active":""}`)}),J("click",A,()=>l("profile")),J("click",C,()=>l("projects")),J("click",U,()=>l("blogs")),J("click",F,()=>l("contact")),J("click",M,c),q(m,T)};oe(f,m=>{t()&&m(g)})}q(n,h),tn(),i()}var tS=K('<div class="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold p-4 rounded-2xl text-center backdrop-blur-md uppercase tracking-widest"> </div>'),nS=K('<div class="bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold p-4 rounded-2xl text-center backdrop-blur-md uppercase tracking-widest"> </div>'),rS=K('<div class="group"><label for="password" class="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Access Key</label> <input id="password" name="password" type="password" required autocomplete="current-password" class="glass-input w-full" placeholder="••••••••"/></div>'),iS=K('<button disabled class="w-full glass-button opacity-50 cursor-wait"><i class="fas fa-circle-notch animate-spin"></i></button>'),sS=K('<button type="button" class="w-full glass-button glass-button-primary">Authorize Reset</button> <button type="button" class="w-full text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white uppercase tracking-widest transition-all">Back to Access</button>',1),oS=K('<button type="submit" class="w-full glass-button glass-button-primary">Gain Access</button> <button type="button" class="w-full text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white uppercase tracking-widest transition-all">Lost Access Key?</button>',1),aS=K('<div class="min-h-screen flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-950 transition-colors duration-500"><div class="glass-card w-full max-w-md p-10 border-neutral-200 dark:border-white/5 relative overflow-hidden"><div class="text-center mb-10"><div class="w-16 h-16 bg-neutral-900 dark:bg-white rounded-[1.5rem] mx-auto flex items-center justify-center mb-6 shadow-2xl"><span class="text-white dark:text-black font-black text-2xl tracking-tighter">S4</span></div> <h2 class="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">Admin</h2> <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-medium">System Authentication Required</p></div> <form class="space-y-6"><!> <!> <div class="space-y-4"><div class="group"><label for="username" class="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Identity</label> <input id="username" name="username" type="email" required autocomplete="email" class="glass-input w-full" placeholder="admin@mail.com"/></div> <!></div> <div class="pt-4 flex flex-col gap-4"><!></div></form></div></div>');function lS(n,e){en(e,!1);let t=he(""),r=he(""),i=he(""),s=he(""),a=he(!1),l=he(!1);async function c(){try{z(a,!0),await Hu(ye,y(t),y(r)),await oA(y(t),y(r)),ze("/")}catch(v){z(i,v instanceof Error?v.message:"Invalid credentials")}finally{z(a,!1)}}async function h(){try{z(a,!0),z(i,""),await aA(y(t)),z(s,"Password reset email sent. Please check your inbox.")}catch(v){z(i,v instanceof Error?v.message:"Failed to send reset email"),z(s,"")}finally{z(a,!1)}}pn();var f=aS(),g=x(f),m=V(x(g),2),T=x(m);{var k=v=>{var I=tS(),S=x(I);Ne(()=>Oe(S,y(i))),q(v,I)};oe(T,v=>{y(i)&&v(k)})}var P=V(T,2);{var A=v=>{var I=nS(),S=x(I);Ne(()=>Oe(S,y(s))),q(v,I)};oe(P,v=>{y(s)&&v(A)})}var C=V(P,2),U=x(C),F=V(x(U),2),M=V(U,2);{var j=v=>{var I=rS(),S=V(x(I),2);Pe(S,()=>y(r),b=>z(r,b)),q(v,I)};oe(M,v=>{y(l)||v(j)})}var $=V(C,2),E=x($);{var _=v=>{var I=iS();q(v,I)},w=v=>{var I=at(),S=Ke(I);{var b=we=>{var ge=sS(),re=Ke(ge),me=V(re,2);J("click",re,h),J("click",me,()=>{z(l,!1),z(i,""),z(s,"")}),q(we,ge)},Te=we=>{var ge=oS(),re=V(Ke(ge),2);J("click",re,()=>{z(l,!0),z(i,""),z(s,"")}),q(we,ge)};oe(S,we=>{y(l)?we(b):we(Te,!1)})}q(v,I)};oe(E,v=>{y(a)?v(_):v(w,!1)})}Pe(F,()=>y(t),v=>z(t,v)),J("submit",m,Ao(c)),q(n,f),tn()}var cS=K('<p class="text-red-500 text-sm"> </p>'),uS=K('<div class="mb-6 space-y-4"><div><label class="block text-sm mb-1">Email</label> <input type="email" class="w-full p-2 border rounded dark:bg-neutral-700" placeholder="Enter your email"/></div> <div><label class="block text-sm mb-1">Password</label> <input type="password" class="w-full p-2 border rounded dark:bg-neutral-700" placeholder="Enter your password"/></div> <button class="w-full bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">Login</button> <!></div>'),hS=K("<span> </span>"),dS=K('<div class="p-4 pb-32 md:pb-4"><h1 class="text-2xl mb-4">Firebase Debug</h1> <!> <div class="mb-4"><strong>Auth Status:</strong> </div> <div class="mb-4"><button class="bg-primary-600 text-white px-4 py-2 rounded mr-2">Initialize Firestore Data</button> <!></div> <pre class="bg-neutral-100 dark:bg-neutral-800 p-4 rounded"> </pre> <button class="mt-4 bg-primary-600 text-white px-4 py-2 rounded">Retry Test</button></div>');function fS(n,e){en(e,!1);let t=he("Testing..."),r=he(!1),i=he(""),s=he(""),a=he(""),l=he("");async function c(){try{z(l,""),await Hu(ye,y(s),y(a)),z(r,!0),await h();const E=await rc();z(t,JSON.stringify(E,null,2))}catch(E){z(l,E.message),console.error("Login error:",E)}}async function h(){await Promise.all([Zt.load(),zn.load(),Dr.load()])}async function f(){if(!ye.currentUser){z(i,"Error: Not logged in");return}try{z(i,"Initializing data..."),await Promise.all([Zt.set([]),zn.set({name:"",title:"",bio:"",skills:[],experience:[],education:[],typingStrings:[],favicon:"",profileImage:""}),Dr.set({spreadsheetUrl:"",email:"",phone:"",location:""})]),z(i,"Initialization completed successfully!");const E=await rc();z(t,JSON.stringify(E,null,2))}catch(E){z(i,`Initialization failed: ${E.message}`),console.error("Initialization error:",E)}}On(async()=>{z(r,!!ye.currentUser),y(r)&&await h();const E=await rc();z(t,JSON.stringify(E,null,2))}),pp(()=>{Zt.cleanup(),zn.cleanup(),Dr.cleanup()}),pn();var g=dS(),m=V(x(g),2);{var T=E=>{var _=uS(),w=x(_),v=V(x(w),2),I=V(w,2),S=V(x(I),2),b=V(I,2),Te=V(b,2);{var we=ge=>{var re=cS(),me=x(re);Ne(()=>Oe(me,y(l))),q(ge,re)};oe(Te,ge=>{y(l)&&ge(we)})}Pe(v,()=>y(s),ge=>z(s,ge)),Pe(S,()=>y(a),ge=>z(a,ge)),J("click",b,c),q(E,_)};oe(m,E=>{y(r)||E(T)})}var k=V(m,2),P=V(x(k)),A=V(k,2),C=x(A),U=V(C,2);{var F=E=>{var _=hS(),w=x(_);Ne(v=>{qs(_,1,v),Oe(w,y(i))},[()=>Fv(y(i).includes("Error")?"text-red-500":y(i).includes("completed")?"text-green-500":"text-blue-500")]),q(E,_)};oe(U,E=>{y(i)&&E(F)})}var M=V(A,2),j=x(M),$=V(M,2);Ne(()=>{Oe(P,` ${y(r)?"Logged In":"Not Logged In"}`),C.disabled=!y(r),Oe(j,`
        ${y(t)??""}
    `)}),J("click",C,f),J("click",$,()=>location.reload()),q(n,g),tn()}var pS=K('<div class="glass-card p-12 flex justify-center"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div></div>'),gS=K('<span class="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-200 dark:border-orange-500/20"> </span>'),mS=K('<div class="glass-card p-6 md:p-8 border border-neutral-200 dark:border-white/5 bg-white/50 dark:bg-neutral-900/50"><form id="projectForm" class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="md:col-span-2"><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Project Title</label> <input type="text" required class="glass-input w-full text-lg" placeholder="e.g., Portfolio Website"/></div> <div class="md:col-span-2"><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Description</label> <textarea required class="glass-input w-full" rows="4" placeholder="Describe the project goals and features..."></textarea></div> <div class="md:col-span-2"><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Project Thumbnail</label> <div class="bg-neutral-100 dark:bg-black/20 rounded-2xl p-4 border border-dashed border-neutral-300 dark:border-white/10"><!></div></div> <div><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Live URL</label> <div class="relative"><span class="absolute left-4 top-3 text-neutral-400"><i class="fas fa-globe"></i></span> <input type="url" class="glass-input w-full pl-10" placeholder="https://..."/></div></div> <div><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">GitHub Repository</label> <div class="relative"><span class="absolute left-4 top-3 text-neutral-400"><i class="fab fa-github"></i></span> <input type="url" class="glass-input w-full pl-10" placeholder="https://github.com/..."/></div></div> <div class="md:col-span-2"><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Technologies</label> <input type="text" class="glass-input w-full" placeholder="Svelte, TypeScript, Tailwind CSS..."/> <div class="flex flex-wrap gap-2 mt-3"></div></div></div> <div class="pt-6 border-t border-neutral-200 dark:border-white/10 flex justify-end gap-4"><button type="button" class="px-6 py-3 rounded-xl font-bold text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-white/5 transition-colors">Cancel</button> <button type="submit" class="px-8 py-3 rounded-xl font-bold glass-button-primary shadow-xl shadow-orange-500/20"> </button></div></form></div>'),_S=K('<div class="min-h-screen bg-neutral-100 dark:bg-neutral-950 p-4 md:p-8"><div class="max-w-3xl mx-auto space-y-6 animate-workspace-in"><div class="flex items-center gap-4"><button class="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors shadow-sm border border-neutral-200 dark:border-white/5"><i class="fas fa-arrow-left"></i></button> <h1 class="text-2xl font-bold text-neutral-900 dark:text-white"> </h1></div> <!></div></div>');function vS(n,e){en(e,!1);const t=()=>jr(Zt,"$projects",r),[r,i]=Br(),s=window.location.pathname,a=s.includes("/edit/"),l=a?s.split("/edit/")[1]:null;let c=he({id:crypto.randomUUID(),title:"",description:"",image:"",technologies:[],url:"",github:""}),h=he(!0);On(async()=>{if(!ye.currentUser){ze("/login");return}if(a&&l){await Zt.load();const M=t().find(j=>j.id===l);M?z(c,JSON.parse(JSON.stringify(M))):(xt.show("Project not found","error"),ze("/"))}z(h,!1)});async function f(){try{let M=t();M.length===0&&(await Zt.load(),M=t());let j=[...M];if(a){const $=j.findIndex(E=>E.id===y(c).id);$!==-1&&(j[$]=y(c))}else j.push(y(c));await Zt.set(j),xt.show(`Project ${a?"updated":"created"} successfully!`,"success"),ze("/?tab=projects")}catch(M){console.error(M),xt.show("Failed to save project","error")}}pn();var g=_S(),m=x(g),T=x(m),k=x(T),P=V(k,2),A=x(P),C=V(T,2);{var U=M=>{var j=pS();q(M,j)},F=M=>{var j=mS(),$=x(j),E=x($),_=x(E),w=V(x(_),2),v=V(_,2),I=V(x(v),2),S=V(v,2),b=V(x(S),2),Te=x(b);Za(Te,{get currentImage(){return y(c).image},onImageUploaded:Z=>se(c,y(c).image=Z)});var we=V(S,2),ge=V(x(we),2),re=V(x(ge),2),me=V(we,2),Ae=V(x(me),2),je=V(x(Ae),2),st=V(me,2),ce=V(x(st),2),ee=V(ce,2);En(ee,5,()=>y(c).technologies,bn,(Z,Le)=>{var He=gS(),Fe=x(He);Ne(()=>Oe(Fe,y(Le))),q(Z,He)});var Be=V(E,2),$e=x(Be),yt=V($e,2),Ie=x(yt);Ne(Z=>{Da(ce,Z),Oe(Ie,a?"Save Changes":"Create Project")},[()=>y(c).technologies.join(", ")]),Pe(w,()=>y(c).title,Z=>se(c,y(c).title=Z)),Pe(I,()=>y(c).description,Z=>se(c,y(c).description=Z)),Pe(re,()=>y(c).url,Z=>se(c,y(c).url=Z)),Pe(je,()=>y(c).github,Z=>se(c,y(c).github=Z)),J("input",ce,Z=>{Z.target&&se(c,y(c).technologies=Z.target.value.split(",").map(Le=>Le.trim()).filter(Boolean))}),J("click",$e,()=>ze("/?tab=projects")),J("submit",$,Ao(f)),q(M,j)};oe(C,M=>{y(h)?M(U):M(F,!1)})}Ne(()=>Oe(A,a?"Edit Project":"New Project")),J("click",k,()=>ze("/?tab=projects")),q(n,g),tn(),i()}var yS=K('<div class="glass-card p-12 flex justify-center"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div></div>'),wS=K('<span class="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-500/20"> </span>'),bS=K('<div class="glass-card p-6 md:p-8 border border-neutral-200 dark:border-white/5 bg-white/50 dark:bg-neutral-900/50"><form id="blogForm" class="space-y-8"><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="md:col-span-2 space-y-6"><div><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Title</label> <input type="text" required class="glass-input w-full text-xl font-bold" placeholder="Enter article title..."/></div> <div><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Summary</label> <textarea required class="glass-input w-full" rows="3" placeholder="Brief summary for search results and cards..."></textarea></div> <div><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Content</label> <div class="border border-neutral-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-neutral-950 shadow-inner"><div class="bg-neutral-50 dark:bg-white/5 border-b border-neutral-200 dark:border-white/10 p-2 flex flex-wrap gap-1 sticky top-0 z-10"><button type="button" class="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-neutral-600 dark:text-neutral-300 transition-colors" title="Bold"><i class="fas fa-bold"></i></button> <button type="button" class="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-neutral-600 dark:text-neutral-300 transition-colors" title="Italic"><i class="fas fa-italic"></i></button> <button type="button" class="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-neutral-600 dark:text-neutral-300 transition-colors" title="Underline"><i class="fas fa-underline"></i></button> <div class="w-px h-5 bg-neutral-300 dark:bg-white/10 mx-2 my-auto"></div> <button type="button" class="px-2 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-sm font-bold text-neutral-600 dark:text-neutral-300 transition-colors">H2</button> <button type="button" class="px-2 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-sm font-bold text-neutral-600 dark:text-neutral-300 transition-colors">H3</button> <div class="w-px h-5 bg-neutral-300 dark:bg-white/10 mx-2 my-auto"></div> <button type="button" class="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-neutral-600 dark:text-neutral-300 transition-colors"><i class="fas fa-list-ul"></i></button> <button type="button" class="w-8 h-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded text-neutral-600 dark:text-neutral-300 transition-colors"><i class="fas fa-list-ol"></i></button></div> <div contenteditable="true" class="min-h-[400px] p-6 focus:outline-none prose dark:prose-invert max-w-none prose-img:rounded-xl prose-headings:text-neutral-900 dark:prose-headings:text-white"></div></div></div></div> <div class="space-y-6"><div class="bg-neutral-50 dark:bg-white/5 rounded-2xl p-6 border border-neutral-200 dark:border-white/5"><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Publish Date</label> <input type="date" class="glass-input w-full"/></div> <div class="bg-neutral-50 dark:bg-white/5 rounded-2xl p-6 border border-neutral-200 dark:border-white/5"><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Cover Image</label> <!></div> <div class="bg-neutral-50 dark:bg-white/5 rounded-2xl p-6 border border-neutral-200 dark:border-white/5"><label class="block mb-2 text-sm font-bold text-neutral-700 dark:text-neutral-300">Tags</label> <input type="text" class="glass-input w-full" placeholder="Add tags..."/> <div class="flex flex-wrap gap-2 mt-3"></div></div></div></div> <div class="pt-6 border-t border-neutral-200 dark:border-white/10 flex justify-end gap-4"><button type="button" class="px-6 py-3 rounded-xl font-bold text-neutral-600 hover:bg-neutral-200 dark:text-neutral-400 dark:hover:bg-white/5 transition-colors">Cancel</button> <button type="submit" class="px-8 py-3 rounded-xl font-bold glass-button-primary shadow-xl shadow-orange-500/20"> </button></div></form></div>'),ES=K('<div class="min-h-screen bg-neutral-100 dark:bg-neutral-950 p-4 md:p-8"><div class="max-w-4xl mx-auto space-y-6 animate-workspace-in"><div class="flex items-center gap-4"><button class="w-10 h-10 rounded-xl bg-white dark:bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors shadow-sm border border-neutral-200 dark:border-white/5"><i class="fas fa-arrow-left"></i></button> <h1 class="text-2xl font-bold text-neutral-900 dark:text-white"> </h1></div> <!></div></div>');function TS(n,e){en(e,!1);const t=()=>jr(Hn,"$blogs",r),[r,i]=Br(),s=window.location.pathname,a=s.includes("/edit/"),l=a?s.split("/edit/")[1]:null;let c=he({id:crypto.randomUUID(),title:"",content:"",description:"",image:"",date:new Date().toISOString().split("T")[0],tags:[],slug:""}),h=he(!0);On(async()=>{if(!ye.currentUser){ze("/login");return}if(a&&l){await Hn.load();const j=t().find($=>$.id===l);j?z(c,JSON.parse(JSON.stringify(j))):(xt.show("Blog post not found","error"),ze("/"))}z(h,!1)});async function f(){try{y(c).slug||se(c,y(c).slug=y(c).title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""));let j=t();j.length===0&&(await Hn.load(),j=t());let $=[...j];if(a){const E=$.findIndex(_=>_.id===y(c).id);E!==-1&&($[E]=y(c))}else $.push(y(c));await Hn.set($),xt.show(`Blog post ${a?"updated":"created"} successfully!`,"success"),ze("/?tab=blogs")}catch(j){console.error(j),xt.show("Failed to save blog post","error")}}function g(j,$=null){document.execCommand(j,!1,$)}pn();var m=ES(),T=x(m),k=x(T),P=x(k),A=V(P,2),C=x(A),U=V(k,2);{var F=j=>{var $=yS();q(j,$)},M=j=>{var $=bS(),E=x($),_=x(E),w=x(_),v=x(w),I=V(x(v),2),S=V(v,2),b=V(x(S),2),Te=V(S,2),we=V(x(Te),2),ge=x(we),re=x(ge),me=V(re,2),Ae=V(me,2),je=V(Ae,4),st=V(je,2),ce=V(st,4),ee=V(ce,2),Be=V(ge,2),$e=V(w,2),yt=x($e),Ie=V(x(yt),2),Z=V(yt,2),Le=V(x(Z),2);Za(Le,{get currentImage(){return y(c).image},onImageUploaded:Qe=>se(c,y(c).image=Qe)});var He=V(Z,2),Fe=V(x(He),2),Ln=V(Fe,2);En(Ln,5,()=>y(c).tags,bn,(Qe,ar)=>{var lr=wS(),qr=x(lr);Ne(()=>Oe(qr,`#${y(ar)??""}`)),q(Qe,lr)});var ir=V(_,2),sr=x(ir),or=V(sr,2),ki=x(or);Ne(Qe=>{Da(Fe,Qe),Oe(ki,a?"Save Changes":"Publish Post")},[()=>y(c).tags?y(c).tags.join(", "):""]),Pe(I,()=>y(c).title,Qe=>se(c,y(c).title=Qe)),Pe(b,()=>y(c).description,Qe=>se(c,y(c).description=Qe)),J("click",re,()=>g("bold")),J("click",me,()=>g("italic")),J("click",Ae,()=>g("underline")),J("click",je,()=>g("formatBlock","<h2>")),J("click",st,()=>g("formatBlock","<h3>")),J("click",ce,()=>g("insertUnorderedList")),J("click",ee,()=>g("insertOrderedList")),zv("innerHTML",Be,()=>y(c).content,Qe=>se(c,y(c).content=Qe)),Pe(Ie,()=>y(c).date,Qe=>se(c,y(c).date=Qe)),J("input",Fe,Qe=>{Qe.target&&se(c,y(c).tags=Qe.target.value.split(",").map(ar=>ar.trim()).filter(Boolean))}),J("click",sr,()=>ze("/?tab=blogs")),J("submit",E,Ao(f)),q(j,$)};oe(U,j=>{y(h)?j(F):j(M,!1)})}Ne(()=>Oe(C,a?"Edit Article":"New Article")),J("click",P,()=>ze("/?tab=blogs")),q(n,m),tn(),i()}var IS=K("<div><!></div>");function AS(n,e){en(e,!1);let t=he(window.location.pathname);On(()=>{const l=()=>{z(t,window.location.pathname)};return window.addEventListener("popstate",l),()=>window.removeEventListener("popstate",l)}),pn();var r=IS(),i=x(r);{var s=l=>{lS(l,{})},a=l=>{var c=at(),h=Ke(c);{var f=m=>{fS(m,{})},g=m=>{var T=at(),k=Ke(T);{var P=C=>{vS(C,{})},A=C=>{var U=at(),F=Ke(U);{var M=$=>{TS($,{})},j=$=>{eS($,{})};oe(F,$=>{y(t)==="/blogs/new"||y(t).startsWith("/blogs/edit/")?$(M):$(j,!1)},!0)}q(C,U)};oe(k,C=>{y(t)==="/projects/new"||y(t).startsWith("/projects/edit/")?C(P):C(A,!1)},!0)}q(m,T)};oe(h,m=>{y(t)==="/debug"?m(f):m(g,!1)},!0)}q(l,c)};oe(i,l=>{y(t)==="/login"?l(s):l(a,!1)})}q(n,r),tn()}Pv(AS,{target:document.getElementById("app")});

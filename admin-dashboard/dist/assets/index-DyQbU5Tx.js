var f_=Object.defineProperty;var Lh=n=>{throw TypeError(n)};var p_=(n,e,t)=>e in n?f_(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var gn=(n,e,t)=>p_(n,typeof e!="symbol"?e+"":e,t),ql=(n,e,t)=>e.has(n)||Lh("Cannot "+t);var N=(n,e,t)=>(ql(n,e,"read from private field"),t?t.call(n):e.get(n)),me=(n,e,t)=>e.has(n)?Lh("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(n):e.set(n,t),ie=(n,e,t,r)=>(ql(n,e,"write to private field"),r?r.call(n,t):e.set(n,t),t),Ge=(n,e,t)=>(ql(n,e,"access private method"),t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const g_="5";var Rf;typeof window<"u"&&((Rf=window.__svelte??(window.__svelte={})).v??(Rf.v=new Set)).add(g_);let ds=!1,m_=!1;function __(){ds=!0}__();const v_=1,y_=2,kf=4,w_=8,E_=16,b_=2,T_=4,I_=8,A_=1,S_=2,Tt=Symbol(),R_="http://www.w3.org/1999/xhtml",ic=!1;var Pf=Array.isArray,k_=Array.prototype.indexOf,il=Array.from,Cf=Object.defineProperty,qi=Object.getOwnPropertyDescriptor,xf=Object.getOwnPropertyDescriptors,P_=Object.prototype,C_=Array.prototype,Hc=Object.getPrototypeOf,Mh=Object.isExtensible;const zi=()=>{};function x_(n){return n()}function sc(n){for(var e=0;e<n.length;e++)n[e]()}function Df(){var n,e,t=new Promise((r,i)=>{n=r,e=i});return{promise:t,resolve:n,reject:e}}const vt=2,Wc=4,sl=8,D_=1<<24,tr=16,nr=32,vi=64,ol=128,hn=512,gt=1024,Ft=2048,dn=4096,qt=8192,Gn=16384,Gc=32768,Zi=65536,Fh=1<<17,Vf=1<<18,fs=1<<19,Nf=1<<20,Bn=1<<25,ci=32768,oc=1<<21,Kc=1<<22,Tr=1<<23,ri=Symbol("$state"),V_=Symbol("legacy props"),N_=Symbol(""),Ui=new class extends Error{constructor(){super(...arguments);gn(this,"name","StaleReactionError");gn(this,"message","The reaction that called `getAbortSignal()` was re-run or destroyed")}};function Of(n){throw new Error("https://svelte.dev/e/lifecycle_outside_component")}function O_(){throw new Error("https://svelte.dev/e/async_derived_orphan")}function L_(n){throw new Error("https://svelte.dev/e/effect_in_teardown")}function M_(){throw new Error("https://svelte.dev/e/effect_in_unowned_derived")}function F_(n){throw new Error("https://svelte.dev/e/effect_orphan")}function U_(){throw new Error("https://svelte.dev/e/effect_update_depth_exceeded")}function j_(n){throw new Error("https://svelte.dev/e/props_invalid_value")}function B_(){throw new Error("https://svelte.dev/e/state_descriptors_fixed")}function $_(){throw new Error("https://svelte.dev/e/state_prototype_fixed")}function q_(){throw new Error("https://svelte.dev/e/state_unsafe_mutation")}function z_(){throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror")}function H_(){console.warn("https://svelte.dev/e/svelte_boundary_reset_noop")}function Lf(n){return n===this.v}function Mf(n,e){return n!=n?e==e:n!==e||n!==null&&typeof n=="object"||typeof n=="function"}function Ff(n){return!Mf(n,this.v)}let Me=null;function es(n){Me=n}function en(n,e=!1,t){Me={p:Me,i:!1,c:null,e:null,s:n,x:null,l:ds&&!e?{s:null,u:null,$:[]}:null}}function tn(n){var e=Me,t=e.e;if(t!==null){e.e=null;for(var r of t)tp(r)}return e.i=!0,Me=e.p,{}}function Io(){return!ds||Me!==null&&Me.l===null}let Qr=[];function Uf(){var n=Qr;Qr=[],sc(n)}function ps(n){if(Qr.length===0&&!Ys){var e=Qr;queueMicrotask(()=>{e===Qr&&Uf()})}Qr.push(n)}function W_(){for(;Qr.length>0;)Uf()}function jf(n){var e=be;if(e===null)return fe.f|=Tr,n;if(e.f&Gc)ts(n,e);else{if(!(e.f&ol))throw n;e.b.error(n)}}function ts(n,e){for(;e!==null;){if(e.f&ol)try{e.b.error(n);return}catch(t){n=t}e=e.parent}throw n}const ia=new Set;let ce=null,ga=null,Ye=null,Qt=[],al=null,ac=!1,Ys=!1;var Qi,Ji,Yr,Xr,Eo,Yi,Xi,mt,lc,Bs,cc,Bf,$f;const tl=class tl{constructor(){me(this,mt);gn(this,"committed",!1);gn(this,"current",new Map);gn(this,"previous",new Map);me(this,Qi,new Set);me(this,Ji,new Set);me(this,Yr,0);me(this,Xr,0);me(this,Eo,null);me(this,Yi,new Set);me(this,Xi,new Set);gn(this,"skipped_effects",new Set);gn(this,"is_fork",!1)}is_deferred(){return this.is_fork||N(this,Xr)>0}process(e){var r;Qt=[],ga=null,this.apply();var t={parent:null,effect:null,effects:[],render_effects:[]};for(const i of e)Ge(this,mt,lc).call(this,i,t);this.is_fork||Ge(this,mt,Bf).call(this),this.is_deferred()?(Ge(this,mt,Bs).call(this,t.effects),Ge(this,mt,Bs).call(this,t.render_effects)):(ga=this,ce=null,Uh(t.render_effects),Uh(t.effects),ga=null,(r=N(this,Eo))==null||r.resolve()),Ye=null}capture(e,t){this.previous.has(e)||this.previous.set(e,t),e.f&Tr||(this.current.set(e,e.v),Ye==null||Ye.set(e,e.v))}activate(){ce=this,this.apply()}deactivate(){ce===this&&(ce=null,Ye=null)}flush(){if(this.activate(),Qt.length>0){if(qf(),ce!==null&&ce!==this)return}else N(this,Yr)===0&&this.process([]);this.deactivate()}discard(){for(const e of N(this,Ji))e(this);N(this,Ji).clear()}increment(e){ie(this,Yr,N(this,Yr)+1),e&&ie(this,Xr,N(this,Xr)+1)}decrement(e){ie(this,Yr,N(this,Yr)-1),e&&ie(this,Xr,N(this,Xr)-1),this.revive()}revive(){for(const e of N(this,Yi))N(this,Xi).delete(e),_t(e,Ft),ui(e);for(const e of N(this,Xi))_t(e,dn),ui(e);this.flush()}oncommit(e){N(this,Qi).add(e)}ondiscard(e){N(this,Ji).add(e)}settled(){return(N(this,Eo)??ie(this,Eo,Df())).promise}static ensure(){if(ce===null){const e=ce=new tl;ia.add(ce),Ys||tl.enqueue(()=>{ce===e&&e.flush()})}return ce}static enqueue(e){ps(e)}apply(){}};Qi=new WeakMap,Ji=new WeakMap,Yr=new WeakMap,Xr=new WeakMap,Eo=new WeakMap,Yi=new WeakMap,Xi=new WeakMap,mt=new WeakSet,lc=function(e,t){var f;e.f^=gt;for(var r=e.first;r!==null;){var i=r.f,s=(i&(nr|vi))!==0,a=s&&(i&gt)!==0,l=a||(i&qt)!==0||this.skipped_effects.has(r);if(r.f&ol&&((f=r.b)!=null&&f.is_pending())&&(t={parent:t,effect:r,effects:[],render_effects:[]}),!l&&r.fn!==null){s?r.f^=gt:i&Wc?t.effects.push(r):ms(r)&&(r.f&tr&&N(this,Yi).add(r),ns(r));var c=r.first;if(c!==null){r=c;continue}}var h=r.parent;for(r=r.next;r===null&&h!==null;)h===t.effect&&(Ge(this,mt,Bs).call(this,t.effects),Ge(this,mt,Bs).call(this,t.render_effects),t=t.parent),r=h.next,h=h.parent}},Bs=function(e){for(const t of e)t.f&Ft?N(this,Yi).add(t):t.f&dn&&N(this,Xi).add(t),Ge(this,mt,cc).call(this,t.deps),_t(t,gt)},cc=function(e){if(e!==null)for(const t of e)!(t.f&vt)||!(t.f&ci)||(t.f^=ci,Ge(this,mt,cc).call(this,t.deps))},Bf=function(){if(N(this,Xr)===0){for(const e of N(this,Qi))e();N(this,Qi).clear()}N(this,Yr)===0&&Ge(this,mt,$f).call(this)},$f=function(){var s;if(ia.size>1){this.previous.clear();var e=Ye,t=!0,r={parent:null,effect:null,effects:[],render_effects:[]};for(const a of ia){if(a===this){t=!1;continue}const l=[];for(const[h,f]of this.current){if(a.current.has(h))if(t&&f!==a.current.get(h))a.current.set(h,f);else continue;l.push(h)}if(l.length===0)continue;const c=[...a.current.keys()].filter(h=>!this.current.has(h));if(c.length>0){var i=Qt;Qt=[];const h=new Set,f=new Map;for(const g of l)zf(g,c,h,f);if(Qt.length>0){ce=a,a.apply();for(const g of Qt)Ge(s=a,mt,lc).call(s,g,r);a.deactivate()}Qt=i}}ce=null,Ye=e}this.committed=!0,ia.delete(this)};let $n=tl;function G_(n){var e=Ys;Ys=!0;try{for(var t;;){if(W_(),Qt.length===0&&(ce==null||ce.flush(),Qt.length===0))return al=null,t;qf()}}finally{Ys=e}}function qf(){var n=si;ac=!0;var e=null;try{var t=0;for(Ca(!0);Qt.length>0;){var r=$n.ensure();if(t++>1e3){var i,s;K_()}r.process(Qt),Ir.clear()}}finally{ac=!1,Ca(n),al=null}}function K_(){try{U_()}catch(n){ts(n,al)}}let sn=null;function Uh(n){var e=n.length;if(e!==0){for(var t=0;t<e;){var r=n[t++];if(!(r.f&(Gn|qt))&&ms(r)&&(sn=new Set,ns(r),r.deps===null&&r.first===null&&r.nodes===null&&(r.teardown===null&&r.ac===null?ip(r):r.fn=null),(sn==null?void 0:sn.size)>0)){Ir.clear();for(const i of sn){if(i.f&(Gn|qt))continue;const s=[i];let a=i.parent;for(;a!==null;)sn.has(a)&&(sn.delete(a),s.push(a)),a=a.parent;for(let l=s.length-1;l>=0;l--){const c=s[l];c.f&(Gn|qt)||ns(c)}}sn.clear()}}sn=null}}function zf(n,e,t,r){if(!t.has(n)&&(t.add(n),n.reactions!==null))for(const i of n.reactions){const s=i.f;s&vt?zf(i,e,t,r):s&(Kc|tr)&&!(s&Ft)&&Hf(i,e,r)&&(_t(i,Ft),ui(i))}}function Hf(n,e,t){const r=t.get(n);if(r!==void 0)return r;if(n.deps!==null)for(const i of n.deps){if(e.includes(i))return!0;if(i.f&vt&&Hf(i,e,t))return t.set(i,!0),!0}return t.set(n,!1),!1}function ui(n){for(var e=al=n;e.parent!==null;){e=e.parent;var t=e.f;if(ac&&e===be&&t&tr&&!(t&Vf))return;if(t&(vi|nr)){if(!(t&gt))return;e.f^=gt}}Qt.push(e)}function Q_(n){let e=0,t=hi(0),r;return()=>{so()&&(w(t),gs(()=>(e===0&&(r=Se(()=>n(()=>Xs(t)))),e+=1,()=>{ps(()=>{e-=1,e===0&&(r==null||r(),r=void 0,Xs(t))})})))}}var J_=Zi|fs|ol;function Y_(n,e,t){new X_(n,e,t)}var Wt,Gt,zc,_n,Zr,vn,Kt,Nt,yn,Fn,yr,ei,wr,ti,Er,nl,lt,Z_,ev,uc,ma,_a,hc;class X_{constructor(e,t,r){me(this,lt);gn(this,"parent");me(this,Wt,!1);me(this,Gt);me(this,zc,null);me(this,_n);me(this,Zr);me(this,vn);me(this,Kt,null);me(this,Nt,null);me(this,yn,null);me(this,Fn,null);me(this,yr,null);me(this,ei,0);me(this,wr,0);me(this,ti,!1);me(this,Er,null);me(this,nl,Q_(()=>(ie(this,Er,hi(N(this,ei))),()=>{ie(this,Er,null)})));ie(this,Gt,e),ie(this,_n,t),ie(this,Zr,r),this.parent=be.b,ie(this,Wt,!!N(this,_n).pending),ie(this,vn,tu(()=>{be.b=this;{var i=Ge(this,lt,uc).call(this);try{ie(this,Kt,Jt(()=>r(i)))}catch(s){this.error(s)}N(this,wr)>0?Ge(this,lt,_a).call(this):ie(this,Wt,!1)}return()=>{var s;(s=N(this,yr))==null||s.remove()}},J_))}is_pending(){return N(this,Wt)||!!this.parent&&this.parent.is_pending()}has_pending_snippet(){return!!N(this,_n).pending}update_pending_count(e){Ge(this,lt,hc).call(this,e),ie(this,ei,N(this,ei)+e),N(this,Er)&&di(N(this,Er),N(this,ei))}get_effect_pending(){return N(this,nl).call(this),w(N(this,Er))}error(e){var t=N(this,_n).onerror;let r=N(this,_n).failed;if(N(this,ti)||!t&&!r)throw e;N(this,Kt)&&(Mt(N(this,Kt)),ie(this,Kt,null)),N(this,Nt)&&(Mt(N(this,Nt)),ie(this,Nt,null)),N(this,yn)&&(Mt(N(this,yn)),ie(this,yn,null));var i=!1,s=!1;const a=()=>{if(i){H_();return}i=!0,s&&z_(),$n.ensure(),ie(this,ei,0),N(this,yn)!==null&&ii(N(this,yn),()=>{ie(this,yn,null)}),ie(this,Wt,this.has_pending_snippet()),ie(this,Kt,Ge(this,lt,ma).call(this,()=>(ie(this,ti,!1),Jt(()=>N(this,Zr).call(this,N(this,Gt)))))),N(this,wr)>0?Ge(this,lt,_a).call(this):ie(this,Wt,!1)};var l=fe;try{Lt(null),s=!0,t==null||t(e,a),s=!1}catch(c){ts(c,N(this,vn)&&N(this,vn).parent)}finally{Lt(l)}r&&ps(()=>{ie(this,yn,Ge(this,lt,ma).call(this,()=>{$n.ensure(),ie(this,ti,!0);try{return Jt(()=>{r(N(this,Gt),()=>e,()=>a)})}catch(c){return ts(c,N(this,vn).parent),null}finally{ie(this,ti,!1)}}))})}}Wt=new WeakMap,Gt=new WeakMap,zc=new WeakMap,_n=new WeakMap,Zr=new WeakMap,vn=new WeakMap,Kt=new WeakMap,Nt=new WeakMap,yn=new WeakMap,Fn=new WeakMap,yr=new WeakMap,ei=new WeakMap,wr=new WeakMap,ti=new WeakMap,Er=new WeakMap,nl=new WeakMap,lt=new WeakSet,Z_=function(){try{ie(this,Kt,Jt(()=>N(this,Zr).call(this,N(this,Gt))))}catch(e){this.error(e)}ie(this,Wt,!1)},ev=function(){const e=N(this,_n).pending;e&&(ie(this,Nt,Jt(()=>e(N(this,Gt)))),$n.enqueue(()=>{var t=Ge(this,lt,uc).call(this);ie(this,Kt,Ge(this,lt,ma).call(this,()=>($n.ensure(),Jt(()=>N(this,Zr).call(this,t))))),N(this,wr)>0?Ge(this,lt,_a).call(this):(ii(N(this,Nt),()=>{ie(this,Nt,null)}),ie(this,Wt,!1))}))},uc=function(){var e=N(this,Gt);return N(this,Wt)&&(ie(this,yr,Kn()),N(this,Gt).before(N(this,yr)),e=N(this,yr)),e},ma=function(e){var t=be,r=fe,i=Me;Pn(N(this,vn)),Lt(N(this,vn)),es(N(this,vn).ctx);try{return e()}catch(s){return jf(s),null}finally{Pn(t),Lt(r),es(i)}},_a=function(){const e=N(this,_n).pending;N(this,Kt)!==null&&(ie(this,Fn,document.createDocumentFragment()),N(this,Fn).append(N(this,yr)),ap(N(this,Kt),N(this,Fn))),N(this,Nt)===null&&ie(this,Nt,Jt(()=>e(N(this,Gt))))},hc=function(e){var t;if(!this.has_pending_snippet()){this.parent&&Ge(t=this.parent,lt,hc).call(t,e);return}ie(this,wr,N(this,wr)+e),N(this,wr)===0&&(ie(this,Wt,!1),N(this,Nt)&&ii(N(this,Nt),()=>{ie(this,Nt,null)}),N(this,Fn)&&(N(this,Gt).before(N(this,Fn)),ie(this,Fn,null)))};function tv(n,e,t,r){const i=Io()?Qc:Jc;if(t.length===0&&n.length===0){r(e.map(i));return}var s=ce,a=be,l=nv();function c(){Promise.all(t.map(h=>rv(h))).then(h=>{l();try{r([...e.map(i),...h])}catch(f){a.f&Gn||ts(f,a)}s==null||s.deactivate(),ka()}).catch(h=>{ts(h,a)})}n.length>0?Promise.all(n).then(()=>{l();try{return c()}finally{s==null||s.deactivate(),ka()}}):c()}function nv(){var n=be,e=fe,t=Me,r=ce;return function(s=!0){Pn(n),Lt(e),es(t),s&&(r==null||r.activate())}}function ka(){Pn(null),Lt(null),es(null)}function Qc(n){var e=vt|Ft,t=fe!==null&&fe.f&vt?fe:null;return be!==null&&(be.f|=fs),{ctx:Me,deps:null,effects:null,equals:Lf,f:e,fn:n,reactions:null,rv:0,v:Tt,wv:0,parent:t??be,ac:null}}function rv(n,e){let t=be;t===null&&O_();var r=t.b,i=void 0,s=hi(Tt),a=!fe,l=new Map;return pv(()=>{var m;var c=Df();i=c.promise;try{Promise.resolve(n()).then(c.resolve,c.reject).then(()=>{h===ce&&h.committed&&h.deactivate(),ka()})}catch(I){c.reject(I),ka()}var h=ce;if(a){var f=!r.is_pending();r.update_pending_count(1),h.increment(f),(m=l.get(h))==null||m.reject(Ui),l.delete(h),l.set(h,c)}const g=(I,k=void 0)=>{if(h.activate(),k)k!==Ui&&(s.f|=Tr,di(s,k));else{s.f&Tr&&(s.f^=Tr),di(s,I);for(const[P,A]of l){if(l.delete(P),P===h)break;A.reject(Ui)}}a&&(r.update_pending_count(-1),h.decrement(f))};c.promise.then(g,I=>g(null,I||"unknown"))}),Xc(()=>{for(const c of l.values())c.reject(Ui)}),new Promise(c=>{function h(f){function g(){f===i?c(s):h(i)}f.then(g,g)}h(i)})}function Jc(n){const e=Qc(n);return e.equals=Ff,e}function Wf(n){var e=n.effects;if(e!==null){n.effects=null;for(var t=0;t<e.length;t+=1)Mt(e[t])}}function iv(n){for(var e=n.parent;e!==null;){if(!(e.f&vt))return e.f&Gn?null:e;e=e.parent}return null}function Yc(n){var e,t=be;Pn(iv(n));try{n.f&=~ci,Wf(n),e=hp(n)}finally{Pn(t)}return e}function Gf(n){var e=Yc(n);if(n.equals(e)||(ce!=null&&ce.is_fork||(n.v=e),n.wv=cp()),!yi)if(Ye!==null)(so()||ce!=null&&ce.is_fork)&&Ye.set(n,e);else{var t=n.f&hn?gt:dn;_t(n,t)}}let dc=new Set;const Ir=new Map;let Kf=!1;function hi(n,e){var t={f:0,v:n,reactions:null,equals:Lf,rv:0,wv:0};return t}function hr(n,e){const t=hi(n);return vv(t),t}function he(n,e=!1,t=!0){var i;const r=hi(n);return e||(r.equals=Ff),ds&&t&&Me!==null&&Me.l!==null&&((i=Me.l).s??(i.s=[])).push(r),r}function se(n,e){return $(n,Se(()=>w(n))),e}function $(n,e,t=!1){fe!==null&&(!En||fe.f&Fh)&&Io()&&fe.f&(vt|tr|Kc|Fh)&&!(Ct!=null&&Ct.includes(n))&&q_();let r=t?ji(e):e;return di(n,r)}function di(n,e){if(!n.equals(e)){var t=n.v;yi?Ir.set(n,e):Ir.set(n,t),n.v=e;var r=$n.ensure();r.capture(n,t),n.f&vt&&(n.f&Ft&&Yc(n),_t(n,n.f&hn?gt:dn)),n.wv=cp(),Qf(n,Ft),Io()&&be!==null&&be.f&gt&&!(be.f&(nr|vi))&&(Ht===null?yv([n]):Ht.push(n)),!r.is_fork&&dc.size>0&&!Kf&&sv()}return e}function sv(){Kf=!1;var n=si;Ca(!0);const e=Array.from(dc);try{for(const t of e)t.f&gt&&_t(t,dn),ms(t)&&ns(t)}finally{Ca(n)}dc.clear()}function Xs(n){$(n,n.v+1)}function Qf(n,e){var t=n.reactions;if(t!==null)for(var r=Io(),i=t.length,s=0;s<i;s++){var a=t[s],l=a.f;if(!(!r&&a===be)){var c=(l&Ft)===0;if(c&&_t(a,e),l&vt){var h=a;Ye==null||Ye.delete(h),l&ci||(l&hn&&(a.f|=ci),Qf(h,dn))}else c&&(l&tr&&sn!==null&&sn.add(a),ui(a))}}}function ji(n){if(typeof n!="object"||n===null||ri in n)return n;const e=Hc(n);if(e!==P_&&e!==C_)return n;var t=new Map,r=Pf(n),i=hr(0),s=oi,a=l=>{if(oi===s)return l();var c=fe,h=oi;Lt(null),qh(s);var f=l();return Lt(c),qh(h),f};return r&&t.set("length",hr(n.length)),new Proxy(n,{defineProperty(l,c,h){(!("value"in h)||h.configurable===!1||h.enumerable===!1||h.writable===!1)&&B_();var f=t.get(c);return f===void 0?f=a(()=>{var g=hr(h.value);return t.set(c,g),g}):$(f,h.value,!0),!0},deleteProperty(l,c){var h=t.get(c);if(h===void 0){if(c in l){const f=a(()=>hr(Tt));t.set(c,f),Xs(i)}}else $(h,Tt),Xs(i);return!0},get(l,c,h){var I;if(c===ri)return n;var f=t.get(c),g=c in l;if(f===void 0&&(!g||(I=qi(l,c))!=null&&I.writable)&&(f=a(()=>{var k=ji(g?l[c]:Tt),P=hr(k);return P}),t.set(c,f)),f!==void 0){var m=w(f);return m===Tt?void 0:m}return Reflect.get(l,c,h)},getOwnPropertyDescriptor(l,c){var h=Reflect.getOwnPropertyDescriptor(l,c);if(h&&"value"in h){var f=t.get(c);f&&(h.value=w(f))}else if(h===void 0){var g=t.get(c),m=g==null?void 0:g.v;if(g!==void 0&&m!==Tt)return{enumerable:!0,configurable:!0,value:m,writable:!0}}return h},has(l,c){var m;if(c===ri)return!0;var h=t.get(c),f=h!==void 0&&h.v!==Tt||Reflect.has(l,c);if(h!==void 0||be!==null&&(!f||(m=qi(l,c))!=null&&m.writable)){h===void 0&&(h=a(()=>{var I=f?ji(l[c]):Tt,k=hr(I);return k}),t.set(c,h));var g=w(h);if(g===Tt)return!1}return f},set(l,c,h,f){var M;var g=t.get(c),m=c in l;if(r&&c==="length")for(var I=h;I<g.v;I+=1){var k=t.get(I+"");k!==void 0?$(k,Tt):I in l&&(k=a(()=>hr(Tt)),t.set(I+"",k))}if(g===void 0)(!m||(M=qi(l,c))!=null&&M.writable)&&(g=a(()=>hr(void 0)),$(g,ji(h)),t.set(c,g));else{m=g.v!==Tt;var P=a(()=>ji(h));$(g,P)}var A=Reflect.getOwnPropertyDescriptor(l,c);if(A!=null&&A.set&&A.set.call(f,h),!m){if(r&&typeof c=="string"){var x=t.get("length"),F=Number(c);Number.isInteger(F)&&F>=x.v&&$(x,F+1)}Xs(i)}return!0},ownKeys(l){w(i);var c=Reflect.ownKeys(l).filter(g=>{var m=t.get(g);return m===void 0||m.v!==Tt});for(var[h,f]of t)f.v!==Tt&&!(h in l)&&c.push(h);return c},setPrototypeOf(){$_()}})}var jh,Jf,Yf,Xf;function ov(){if(jh===void 0){jh=window,Jf=/Firefox/.test(navigator.userAgent);var n=Element.prototype,e=Node.prototype,t=Text.prototype;Yf=qi(e,"firstChild").get,Xf=qi(e,"nextSibling").get,Mh(n)&&(n.__click=void 0,n.__className=void 0,n.__attributes=null,n.__style=void 0,n.__e=void 0),Mh(t)&&(t.__t=void 0)}}function Kn(n=""){return document.createTextNode(n)}function Pa(n){return Yf.call(n)}function Ao(n){return Xf.call(n)}function C(n,e){return Pa(n)}function ze(n,e=!1){{var t=Pa(n);return t instanceof Comment&&t.data===""?Ao(t):t}}function V(n,e=1,t=!1){let r=n;for(;e--;)r=Ao(r);return r}function av(n){n.textContent=""}function Zf(){return!1}let Bh=!1;function lv(){Bh||(Bh=!0,document.addEventListener("reset",n=>{Promise.resolve().then(()=>{var e;if(!n.defaultPrevented)for(const t of n.target.elements)(e=t.__on_r)==null||e.call(t)})},{capture:!0}))}function ll(n){var e=fe,t=be;Lt(null),Pn(null);try{return n()}finally{Lt(e),Pn(t)}}function cv(n,e,t,r=t){n.addEventListener(e,()=>ll(t));const i=n.__on_r;i?n.__on_r=()=>{i(),r(!0)}:n.__on_r=()=>r(!0),lv()}function ep(n){be===null&&(fe===null&&F_(),M_()),yi&&L_()}function uv(n,e){var t=e.last;t===null?e.last=e.first=n:(t.next=n,n.prev=t,e.last=n)}function Dn(n,e,t){var r=be;r!==null&&r.f&qt&&(n|=qt);var i={ctx:Me,deps:null,nodes:null,f:n|Ft|hn,first:null,fn:e,last:null,next:null,parent:r,b:r&&r.b,prev:null,teardown:null,wv:0,ac:null};if(t)try{ns(i),i.f|=Gc}catch(l){throw Mt(i),l}else e!==null&&ui(i);var s=i;if(t&&s.deps===null&&s.teardown===null&&s.nodes===null&&s.first===s.last&&!(s.f&fs)&&(s=s.first,n&tr&&n&Zi&&s!==null&&(s.f|=Zi)),s!==null&&(s.parent=r,r!==null&&uv(s,r),fe!==null&&fe.f&vt&&!(n&vi))){var a=fe;(a.effects??(a.effects=[])).push(s)}return i}function so(){return fe!==null&&!En}function Xc(n){const e=Dn(sl,null,!1);return _t(e,gt),e.teardown=n,e}function fc(n){ep();var e=be.f,t=!fe&&(e&nr)!==0&&(e&Gc)===0;if(t){var r=Me;(r.e??(r.e=[])).push(n)}else return tp(n)}function tp(n){return Dn(Wc|Nf,n,!1)}function hv(n){return ep(),Dn(sl|Nf,n,!0)}function dv(n){$n.ensure();const e=Dn(vi|fs,n,!0);return(t={})=>new Promise(r=>{t.outro?ii(e,()=>{Mt(e),r(void 0)}):(Mt(e),r(void 0))})}function fv(n){return Dn(Wc,n,!1)}function Zc(n,e){var t=Me,r={effect:null,ran:!1,deps:n};t.l.$.push(r),r.effect=gs(()=>{n(),!r.ran&&(r.ran=!0,Se(e))})}function eu(){var n=Me;gs(()=>{for(var e of n.l.$){e.deps();var t=e.effect;t.f&gt&&_t(t,dn),ms(t)&&ns(t),e.ran=!1}})}function pv(n){return Dn(Kc|fs,n,!0)}function gs(n,e=0){return Dn(sl|e,n,!0)}function Oe(n,e=[],t=[],r=[]){tv(r,e,t,i=>{Dn(sl,()=>n(...i.map(w)),!0)})}function tu(n,e=0){var t=Dn(tr|e,n,!0);return t}function Jt(n){return Dn(nr|fs,n,!0)}function np(n){var e=n.teardown;if(e!==null){const t=yi,r=fe;$h(!0),Lt(null);try{e.call(null)}finally{$h(t),Lt(r)}}}function rp(n,e=!1){var t=n.first;for(n.first=n.last=null;t!==null;){const i=t.ac;i!==null&&ll(()=>{i.abort(Ui)});var r=t.next;t.f&vi?t.parent=null:Mt(t,e),t=r}}function gv(n){for(var e=n.first;e!==null;){var t=e.next;e.f&nr||Mt(e),e=t}}function Mt(n,e=!0){var t=!1;(e||n.f&Vf)&&n.nodes!==null&&n.nodes.end!==null&&(mv(n.nodes.start,n.nodes.end),t=!0),rp(n,e&&!t),xa(n,0),_t(n,Gn);var r=n.nodes&&n.nodes.t;if(r!==null)for(const s of r)s.stop();np(n);var i=n.parent;i!==null&&i.first!==null&&ip(n),n.next=n.prev=n.teardown=n.ctx=n.deps=n.fn=n.nodes=n.ac=null}function mv(n,e){for(;n!==null;){var t=n===e?null:Ao(n);n.remove(),n=t}}function ip(n){var e=n.parent,t=n.prev,r=n.next;t!==null&&(t.next=r),r!==null&&(r.prev=t),e!==null&&(e.first===n&&(e.first=r),e.last===n&&(e.last=t))}function ii(n,e,t=!0){var r=[];sp(n,r,!0);var i=()=>{t&&Mt(n),e&&e()},s=r.length;if(s>0){var a=()=>--s||i();for(var l of r)l.out(a)}else i()}function sp(n,e,t){if(!(n.f&qt)){n.f^=qt;var r=n.nodes&&n.nodes.t;if(r!==null)for(const l of r)(l.is_global||t)&&e.push(l);for(var i=n.first;i!==null;){var s=i.next,a=(i.f&Zi)!==0||(i.f&nr)!==0&&(n.f&tr)!==0;sp(i,e,a?t:!1),i=s}}}function nu(n){op(n,!0)}function op(n,e){if(n.f&qt){n.f^=qt,n.f&gt||(_t(n,Ft),ui(n));for(var t=n.first;t!==null;){var r=t.next,i=(t.f&Zi)!==0||(t.f&nr)!==0;op(t,i?e:!1),t=r}var s=n.nodes&&n.nodes.t;if(s!==null)for(const a of s)(a.is_global||e)&&a.in()}}function ap(n,e){if(n.nodes)for(var t=n.nodes.start,r=n.nodes.end;t!==null;){var i=t===r?null:Ao(t);e.append(t),t=i}}let pr=null;function _v(n){var e=pr;try{if(pr=new Set,Se(n),e!==null)for(var t of pr)e.add(t);return pr}finally{pr=e}}function sa(n){for(var e of _v(n))di(e,e.v)}let si=!1;function Ca(n){si=n}let yi=!1;function $h(n){yi=n}let fe=null,En=!1;function Lt(n){fe=n}let be=null;function Pn(n){be=n}let Ct=null;function vv(n){fe!==null&&(Ct===null?Ct=[n]:Ct.push(n))}let Pt=null,Bt=0,Ht=null;function yv(n){Ht=n}let lp=1,oo=0,oi=oo;function qh(n){oi=n}function cp(){return++lp}function ms(n){var e=n.f;if(e&Ft)return!0;if(e&vt&&(n.f&=~ci),e&dn){var t=n.deps;if(t!==null)for(var r=t.length,i=0;i<r;i++){var s=t[i];if(ms(s)&&Gf(s),s.wv>n.wv)return!0}e&hn&&Ye===null&&_t(n,gt)}return!1}function up(n,e,t=!0){var r=n.reactions;if(r!==null&&!(Ct!=null&&Ct.includes(n)))for(var i=0;i<r.length;i++){var s=r[i];s.f&vt?up(s,e,!1):e===s&&(t?_t(s,Ft):s.f&gt&&_t(s,dn),ui(s))}}function hp(n){var k;var e=Pt,t=Bt,r=Ht,i=fe,s=Ct,a=Me,l=En,c=oi,h=n.f;Pt=null,Bt=0,Ht=null,fe=h&(nr|vi)?null:n,Ct=null,es(n.ctx),En=!1,oi=++oo,n.ac!==null&&(ll(()=>{n.ac.abort(Ui)}),n.ac=null);try{n.f|=oc;var f=n.fn,g=f(),m=n.deps;if(Pt!==null){var I;if(xa(n,Bt),m!==null&&Bt>0)for(m.length=Bt+Pt.length,I=0;I<Pt.length;I++)m[Bt+I]=Pt[I];else n.deps=m=Pt;if(so()&&n.f&hn)for(I=Bt;I<m.length;I++)((k=m[I]).reactions??(k.reactions=[])).push(n)}else m!==null&&Bt<m.length&&(xa(n,Bt),m.length=Bt);if(Io()&&Ht!==null&&!En&&m!==null&&!(n.f&(vt|dn|Ft)))for(I=0;I<Ht.length;I++)up(Ht[I],n);return i!==null&&i!==n&&(oo++,Ht!==null&&(r===null?r=Ht:r.push(...Ht))),n.f&Tr&&(n.f^=Tr),g}catch(P){return jf(P)}finally{n.f^=oc,Pt=e,Bt=t,Ht=r,fe=i,Ct=s,es(a),En=l,oi=c}}function wv(n,e){let t=e.reactions;if(t!==null){var r=k_.call(t,n);if(r!==-1){var i=t.length-1;i===0?t=e.reactions=null:(t[r]=t[i],t.pop())}}t===null&&e.f&vt&&(Pt===null||!Pt.includes(e))&&(_t(e,dn),e.f&hn&&(e.f^=hn,e.f&=~ci),Wf(e),xa(e,0))}function xa(n,e){var t=n.deps;if(t!==null)for(var r=e;r<t.length;r++)wv(n,t[r])}function ns(n){var e=n.f;if(!(e&Gn)){_t(n,gt);var t=be,r=si;be=n,si=!0;try{e&(tr|D_)?gv(n):rp(n),np(n);var i=hp(n);n.teardown=typeof i=="function"?i:null,n.wv=lp;var s;ic&&m_&&n.f&Ft&&n.deps}finally{si=r,be=t}}}async function Ev(){await Promise.resolve(),G_()}function w(n){var e=n.f,t=(e&vt)!==0;if(pr==null||pr.add(n),fe!==null&&!En){var r=be!==null&&(be.f&Gn)!==0;if(!r&&!(Ct!=null&&Ct.includes(n))){var i=fe.deps;if(fe.f&oc)n.rv<oo&&(n.rv=oo,Pt===null&&i!==null&&i[Bt]===n?Bt++:Pt===null?Pt=[n]:Pt.includes(n)||Pt.push(n));else{(fe.deps??(fe.deps=[])).push(n);var s=n.reactions;s===null?n.reactions=[fe]:s.includes(fe)||s.push(fe)}}}if(yi){if(Ir.has(n))return Ir.get(n);if(t){var a=n,l=a.v;return(!(a.f&gt)&&a.reactions!==null||fp(a))&&(l=Yc(a)),Ir.set(a,l),l}}else t&&(!(Ye!=null&&Ye.has(n))||ce!=null&&ce.is_fork&&!so())&&(a=n,ms(a)&&Gf(a),si&&so()&&!(a.f&hn)&&dp(a));if(Ye!=null&&Ye.has(n))return Ye.get(n);if(n.f&Tr)throw n.v;return n.v}function dp(n){if(n.deps!==null){n.f^=hn;for(const e of n.deps)(e.reactions??(e.reactions=[])).push(n),e.f&vt&&!(e.f&hn)&&dp(e)}}function fp(n){if(n.v===Tt)return!0;if(n.deps===null)return!1;for(const e of n.deps)if(Ir.has(e)||e.f&vt&&fp(e))return!0;return!1}function Se(n){var e=En;try{return En=!0,n()}finally{En=e}}const bv=-7169;function _t(n,e){n.f=n.f&bv|e}function Tv(n){if(!(typeof n!="object"||!n||n instanceof EventTarget)){if(ri in n)pc(n);else if(!Array.isArray(n))for(let e in n){const t=n[e];typeof t=="object"&&t&&ri in t&&pc(t)}}}function pc(n,e=new Set){if(typeof n=="object"&&n!==null&&!(n instanceof EventTarget)&&!e.has(n)){e.add(n),n instanceof Date&&n.getTime();for(let r in n)try{pc(n[r],e)}catch{}const t=Hc(n);if(t!==Object.prototype&&t!==Array.prototype&&t!==Map.prototype&&t!==Set.prototype&&t!==Date.prototype){const r=xf(t);for(let i in r){const s=r[i].get;if(s)try{s.call(n)}catch{}}}}}const Iv=new Set,zh=new Set;function Av(n,e,t,r={}){function i(s){if(r.capture||$s.call(e,s),!s.cancelBubble)return ll(()=>t==null?void 0:t.call(this,s))}return n.startsWith("pointer")||n.startsWith("touch")||n==="wheel"?ps(()=>{e.addEventListener(n,i,r)}):e.addEventListener(n,i,r),i}function ee(n,e,t,r,i){var s={capture:r,passive:i},a=Av(n,e,t,s);(e===document.body||e===window||e===document||e instanceof HTMLMediaElement)&&Xc(()=>{e.removeEventListener(n,a,s)})}let Hh=null;function $s(n){var A;var e=this,t=e.ownerDocument,r=n.type,i=((A=n.composedPath)==null?void 0:A.call(n))||[],s=i[0]||n.target;Hh=n;var a=0,l=Hh===n&&n.__root;if(l){var c=i.indexOf(l);if(c!==-1&&(e===document||e===window)){n.__root=e;return}var h=i.indexOf(e);if(h===-1)return;c<=h&&(a=c)}if(s=i[a]||n.target,s!==e){Cf(n,"currentTarget",{configurable:!0,get(){return s||t}});var f=fe,g=be;Lt(null),Pn(null);try{for(var m,I=[];s!==null;){var k=s.assignedSlot||s.parentNode||s.host||null;try{var P=s["__"+r];P!=null&&(!s.disabled||n.target===s)&&P.call(s,n)}catch(x){m?I.push(x):m=x}if(n.cancelBubble||k===e||k===null)break;s=k}if(m){for(let x of I)queueMicrotask(()=>{throw x});throw m}}finally{n.__root=e,delete n.currentTarget,Lt(f),Pn(g)}}}function Sv(n){var e=document.createElement("template");return e.innerHTML=n.replaceAll("<!>","<!---->"),e.content}function Da(n,e){var t=be;t.nodes===null&&(t.nodes={start:n,end:e,a:null,t:null})}function K(n,e){var t=(e&A_)!==0,r=(e&S_)!==0,i,s=!n.startsWith("<!>");return()=>{i===void 0&&(i=Sv(s?n:"<!>"+n),t||(i=Pa(i)));var a=r||Jf?document.importNode(i,!0):i.cloneNode(!0);if(t){var l=Pa(a),c=a.lastChild;Da(l,c)}else Da(a,a);return a}}function oa(n=""){{var e=Kn(n+"");return Da(e,e),e}}function rt(){var n=document.createDocumentFragment(),e=document.createComment(""),t=Kn();return n.append(e,t),Da(e,t),n}function B(n,e){n!==null&&n.before(e)}const Rv=["touchstart","touchmove"];function kv(n){return Rv.includes(n)}function Le(n,e){var t=e==null?"":typeof e=="object"?e+"":e;t!==(n.__t??(n.__t=n.nodeValue))&&(n.__t=t,n.nodeValue=t+"")}function Pv(n,e){return Cv(n,e)}const Vi=new Map;function Cv(n,{target:e,anchor:t,props:r={},events:i,context:s,intro:a=!0}){ov();var l=new Set,c=g=>{for(var m=0;m<g.length;m++){var I=g[m];if(!l.has(I)){l.add(I);var k=kv(I);e.addEventListener(I,$s,{passive:k});var P=Vi.get(I);P===void 0?(document.addEventListener(I,$s,{passive:k}),Vi.set(I,1)):Vi.set(I,P+1)}}};c(il(Iv)),zh.add(c);var h=void 0,f=dv(()=>{var g=t??e.appendChild(Kn());return Y_(g,{pending:()=>{}},m=>{if(s){en({});var I=Me;I.c=s}i&&(r.$$events=i),h=n(m,r)||{},s&&tn()}),()=>{var k;for(var m of l){e.removeEventListener(m,$s);var I=Vi.get(m);--I===0?(document.removeEventListener(m,$s),Vi.delete(m)):Vi.set(m,I)}zh.delete(c),g!==t&&((k=g.parentNode)==null||k.removeChild(g))}});return xv.set(h,f),h}let xv=new WeakMap;var on,wn,$t,ni,bo,To,rl;class Dv{constructor(e,t=!0){gn(this,"anchor");me(this,on,new Map);me(this,wn,new Map);me(this,$t,new Map);me(this,ni,new Set);me(this,bo,!0);me(this,To,()=>{var e=ce;if(N(this,on).has(e)){var t=N(this,on).get(e),r=N(this,wn).get(t);if(r)nu(r),N(this,ni).delete(t);else{var i=N(this,$t).get(t);i&&(N(this,wn).set(t,i.effect),N(this,$t).delete(t),i.fragment.lastChild.remove(),this.anchor.before(i.fragment),r=i.effect)}for(const[s,a]of N(this,on)){if(N(this,on).delete(s),s===e)break;const l=N(this,$t).get(a);l&&(Mt(l.effect),N(this,$t).delete(a))}for(const[s,a]of N(this,wn)){if(s===t||N(this,ni).has(s))continue;const l=()=>{if(Array.from(N(this,on).values()).includes(s)){var h=document.createDocumentFragment();ap(a,h),h.append(Kn()),N(this,$t).set(s,{effect:a,fragment:h})}else Mt(a);N(this,ni).delete(s),N(this,wn).delete(s)};N(this,bo)||!r?(N(this,ni).add(s),ii(a,l,!1)):l()}}});me(this,rl,e=>{N(this,on).delete(e);const t=Array.from(N(this,on).values());for(const[r,i]of N(this,$t))t.includes(r)||(Mt(i.effect),N(this,$t).delete(r))});this.anchor=e,ie(this,bo,t)}ensure(e,t){var r=ce,i=Zf();if(t&&!N(this,wn).has(e)&&!N(this,$t).has(e))if(i){var s=document.createDocumentFragment(),a=Kn();s.append(a),N(this,$t).set(e,{effect:Jt(()=>t(a)),fragment:s})}else N(this,wn).set(e,Jt(()=>t(this.anchor)));if(N(this,on).set(r,e),i){for(const[l,c]of N(this,wn))l===e?r.skipped_effects.delete(c):r.skipped_effects.add(c);for(const[l,c]of N(this,$t))l===e?r.skipped_effects.delete(c.effect):r.skipped_effects.add(c.effect);r.oncommit(N(this,To)),r.ondiscard(N(this,rl))}else N(this,To).call(this)}}on=new WeakMap,wn=new WeakMap,$t=new WeakMap,ni=new WeakMap,bo=new WeakMap,To=new WeakMap,rl=new WeakMap;function Vn(n){Me===null&&Of(),ds&&Me.l!==null?Vv(Me).m.push(n):fc(()=>{const e=Se(n);if(typeof e=="function")return e})}function pp(n){Me===null&&Of(),Vn(()=>()=>Se(n))}function Vv(n){var e=n.l;return e.u??(e.u={a:[],b:[],m:[]})}function oe(n,e,t=!1){var r=new Dv(n),i=t?Zi:0;function s(a,l){r.ensure(a,l)}tu(()=>{var a=!1;e((l,c=!0)=>{a=!0,s(c,l)}),a||s(!1,null)},i)}function Un(n,e){return e}function Nv(n,e,t){for(var r=[],i=e.length,s,a=e.length,l=0;l<i;l++){let g=e[l];ii(g,()=>{if(s){if(s.pending.delete(g),s.done.add(g),s.pending.size===0){var m=n.outrogroups;gc(il(s.done)),m.delete(s),m.size===0&&(n.outrogroups=null)}}else a-=1},!1)}if(a===0){var c=r.length===0&&t!==null;if(c){var h=t,f=h.parentNode;av(f),f.append(h),n.items.clear()}gc(e,!c)}else s={pending:new Set(e),done:new Set},(n.outrogroups??(n.outrogroups=new Set)).add(s)}function gc(n,e=!0){for(var t=0;t<n.length;t++)Mt(n[t],e)}var Wh;function jn(n,e,t,r,i,s=null){var a=n,l=new Map,c=(e&kf)!==0;if(c){var h=n;a=h.appendChild(Kn())}var f=null,g=Jc(()=>{var x=t();return Pf(x)?x:x==null?[]:il(x)}),m,I=!0;function k(){A.fallback=f,Ov(A,m,a,e,r),f!==null&&(m.length===0?f.f&Bn?(f.f^=Bn,qs(f,null,a)):nu(f):ii(f,()=>{f=null}))}var P=tu(()=>{m=w(g);for(var x=m.length,F=new Set,M=ce,U=Zf(),H=0;H<x;H+=1){var W=m[H],b=r(W,H),_=I?null:l.get(b);_?(_.v&&di(_.v,W),_.i&&di(_.i,H),U&&M.skipped_effects.delete(_.e)):(_=Lv(l,I?a:Wh??(Wh=Kn()),W,b,H,i,e,t),I||(_.e.f|=Bn),l.set(b,_)),F.add(b)}if(x===0&&s&&!f&&(I?f=Jt(()=>s(a)):(f=Jt(()=>s(Wh??(Wh=Kn()))),f.f|=Bn)),!I)if(U){for(const[y,v]of l)F.has(y)||M.skipped_effects.add(v.e);M.oncommit(k),M.ondiscard(()=>{})}else k();w(g)}),A={effect:P,items:l,outrogroups:null,fallback:f};I=!1}function Ov(n,e,t,r,i){var v,T,S,E,_e,le,ve,re,we;var s=(r&w_)!==0,a=e.length,l=n.items,c=n.effect.first,h,f=null,g,m=[],I=[],k,P,A,x;if(s)for(x=0;x<a;x+=1)k=e[x],P=i(k,x),A=l.get(P).e,A.f&Bn||((T=(v=A.nodes)==null?void 0:v.a)==null||T.measure(),(g??(g=new Set)).add(A));for(x=0;x<a;x+=1){if(k=e[x],P=i(k,x),A=l.get(P).e,n.outrogroups!==null)for(const Re of n.outrogroups)Re.pending.delete(A),Re.done.delete(A);if(A.f&Bn)if(A.f^=Bn,A===c)qs(A,null,t);else{var F=f?f.next:c;A===n.effect.last&&(n.effect.last=A.prev),A.prev&&(A.prev.next=A.next),A.next&&(A.next.prev=A.prev),dr(n,f,A),dr(n,A,F),qs(A,F,t),f=A,m=[],I=[],c=f.next;continue}if(A.f&qt&&(nu(A),s&&((E=(S=A.nodes)==null?void 0:S.a)==null||E.unfix(),(g??(g=new Set)).delete(A))),A!==c){if(h!==void 0&&h.has(A)){if(m.length<I.length){var M=I[0],U;f=M.prev;var H=m[0],W=m[m.length-1];for(U=0;U<m.length;U+=1)qs(m[U],M,t);for(U=0;U<I.length;U+=1)h.delete(I[U]);dr(n,H.prev,W.next),dr(n,f,H),dr(n,W,M),c=M,f=W,x-=1,m=[],I=[]}else h.delete(A),qs(A,c,t),dr(n,A.prev,A.next),dr(n,A,f===null?n.effect.first:f.next),dr(n,f,A),f=A;continue}for(m=[],I=[];c!==null&&c!==A;)(h??(h=new Set)).add(c),I.push(c),c=c.next;if(c===null)continue}A.f&Bn||m.push(A),f=A,c=A.next}if(n.outrogroups!==null){for(const Re of n.outrogroups)Re.pending.size===0&&(gc(il(Re.done)),(_e=n.outrogroups)==null||_e.delete(Re));n.outrogroups.size===0&&(n.outrogroups=null)}if(c!==null||h!==void 0){var b=[];if(h!==void 0)for(A of h)A.f&qt||b.push(A);for(;c!==null;)!(c.f&qt)&&c!==n.fallback&&b.push(c),c=c.next;var _=b.length;if(_>0){var y=r&kf&&a===0?t:null;if(s){for(x=0;x<_;x+=1)(ve=(le=b[x].nodes)==null?void 0:le.a)==null||ve.measure();for(x=0;x<_;x+=1)(we=(re=b[x].nodes)==null?void 0:re.a)==null||we.fix()}Nv(n,b,y)}}s&&ps(()=>{var Re,je;if(g!==void 0)for(A of g)(je=(Re=A.nodes)==null?void 0:Re.a)==null||je.apply()})}function Lv(n,e,t,r,i,s,a,l){var c=a&v_?a&E_?hi(t):he(t,!1,!1):null,h=a&y_?hi(i):null;return{v:c,i:h,e:Jt(()=>(s(e,c??t,h??i,l),()=>{n.delete(r)}))}}function qs(n,e,t){if(n.nodes)for(var r=n.nodes.start,i=n.nodes.end,s=e&&!(e.f&Bn)?e.nodes.start:t;r!==null;){var a=Ao(r);if(s.before(r),r===i)return;r=a}}function dr(n,e,t){e===null?n.effect.first=t:e.next=t,t===null?n.effect.last=e:t.prev=e}function gp(n){var e,t,r="";if(typeof n=="string"||typeof n=="number")r+=n;else if(typeof n=="object")if(Array.isArray(n)){var i=n.length;for(e=0;e<i;e++)n[e]&&(t=gp(n[e]))&&(r&&(r+=" "),r+=t)}else for(t in n)n[t]&&(r&&(r+=" "),r+=t);return r}function Mv(){for(var n,e,t=0,r="",i=arguments.length;t<i;t++)(n=arguments[t])&&(e=gp(n))&&(r&&(r+=" "),r+=e);return r}function Fv(n){return typeof n=="object"?Mv(n):n??""}function Uv(n,e,t){var r=n==null?"":""+n;return r===""?null:r}function zs(n,e,t,r,i,s){var a=n.__className;if(a!==t||a===void 0){var l=Uv(t);l==null?n.removeAttribute("class"):n.className=l,n.__className=t}return s}const jv=Symbol("is custom element"),Bv=Symbol("is html");function Va(n,e){var t=mp(n);t.value===(t.value=e??void 0)||n.value===e&&(e!==0||n.nodeName!=="PROGRESS")||(n.value=e??"")}function ao(n,e,t,r){var i=mp(n);i[e]!==(i[e]=t)&&(e==="loading"&&(n[N_]=t),t==null?n.removeAttribute(e):typeof t!="string"&&$v(n).includes(e)?n[e]=t:n.setAttribute(e,t))}function mp(n){return n.__attributes??(n.__attributes={[jv]:n.nodeName.includes("-"),[Bv]:n.namespaceURI===R_})}var Gh=new Map;function $v(n){var e=n.getAttribute("is")||n.nodeName,t=Gh.get(e);if(t)return t;Gh.set(e,t=[]);for(var r,i=n,s=Element.prototype;s!==i;){r=xf(i);for(var a in r)r[a].set&&t.push(a);i=Hc(i)}return t}function Pe(n,e,t=e){var r=new WeakSet;cv(n,"input",async i=>{var s=i?n.defaultValue:n.value;if(s=zl(n)?Hl(s):s,t(s),ce!==null&&r.add(ce),await Ev(),s!==(s=e())){var a=n.selectionStart,l=n.selectionEnd,c=n.value.length;if(n.value=s??"",l!==null){var h=n.value.length;a===l&&l===c&&h>c?(n.selectionStart=h,n.selectionEnd=h):(n.selectionStart=a,n.selectionEnd=Math.min(l,h))}}}),Se(e)==null&&n.value&&(t(zl(n)?Hl(n.value):n.value),ce!==null&&r.add(ce)),gs(()=>{var i=e();if(n===document.activeElement){var s=ga??ce;if(r.has(s))return}zl(n)&&i===Hl(n.value)||n.type==="date"&&!i&&!n.value||i!==n.value&&(n.value=i??"")})}function zl(n){var e=n.type;return e==="number"||e==="range"}function Hl(n){return n===""?null:+n}function Kh(n,e){return n===e||(n==null?void 0:n[ri])===e}function qv(n={},e,t,r){return fv(()=>{var i,s;return gs(()=>{i=s,s=[],Se(()=>{n!==t(...s)&&(e(n,...s),i&&Kh(t(...i),n)&&e(null,...i))})}),()=>{ps(()=>{s&&Kh(t(...s),n)&&e(null,...s)})}}),n}function zv(n,e,t,r=t){e.addEventListener("input",()=>{r(e[n])}),gs(()=>{var i=t();if(e[n]!==i)if(i==null){var s=e[n];r(s)}else e[n]=i+""})}function So(n){return function(...e){var t=e[0];return t.preventDefault(),n==null?void 0:n.apply(this,e)}}function pn(n=!1){const e=Me,t=e.l.u;if(!t)return;let r=()=>Tv(e.s);if(n){let i=0,s={};const a=Qc(()=>{let l=!1;const c=e.s;for(const h in c)c[h]!==s[h]&&(s[h]=c[h],l=!0);return l&&i++,i});r=()=>w(a)}t.b.length&&hv(()=>{Qh(e,r),sc(t.b)}),fc(()=>{const i=Se(()=>t.m.map(x_));return()=>{for(const s of i)typeof s=="function"&&s()}}),t.a.length&&fc(()=>{Qh(e,r),sc(t.a)})}function Qh(n,e){if(n.l.s)for(const t of n.l.s)w(t);e()}function _p(n,e,t){if(n==null)return e(void 0),zi;const r=Se(()=>n.subscribe(e,t));return r.unsubscribe?()=>r.unsubscribe():r}const Ni=[];function wi(n,e=zi){let t=null;const r=new Set;function i(l){if(Mf(n,l)&&(n=l,t)){const c=!Ni.length;for(const h of r)h[1](),Ni.push(h,n);if(c){for(let h=0;h<Ni.length;h+=2)Ni[h][0](Ni[h+1]);Ni.length=0}}}function s(l){i(l(n))}function a(l,c=zi){const h=[l,c];return r.add(h),r.size===1&&(t=e(i,s)||zi),l(n),()=>{r.delete(h),r.size===0&&t&&(t(),t=null)}}return{set:i,update:s,subscribe:a}}function Hv(n){let e;return _p(n,t=>e=t)(),e}let aa=!1,mc=Symbol();function rr(n,e,t){const r=t[e]??(t[e]={store:null,source:he(void 0),unsubscribe:zi});if(r.store!==n&&!(mc in t))if(r.unsubscribe(),r.store=n??null,n==null)r.source.v=void 0,r.unsubscribe=zi;else{var i=!0;r.unsubscribe=_p(n,s=>{i?r.source.v=s:$(r.source,s)}),i=!1}return n&&mc in t?Hv(n):w(r.source)}function ir(){const n={};function e(){Xc(()=>{for(var t in n)n[t].unsubscribe();Cf(n,mc,{enumerable:!1,value:!0})})}return[n,e]}function Wv(n,e,t){return n.set(t),e}function Gv(n){var e=aa;try{return aa=!1,[n(),aa]}finally{aa=e}}function _c(n,e,t,r){var F;var i=!ds||(t&b_)!==0,s=(t&I_)!==0,a=r,l=!0,c=()=>(l&&(l=!1,a=r),a),h;{var f=ri in n||V_ in n;h=((F=qi(n,e))==null?void 0:F.set)??(f&&e in n?M=>n[e]=M:void 0)}var g,m=!1;[g,m]=Gv(()=>n[e]),g===void 0&&r!==void 0&&(g=c(),h&&(i&&j_(),h(g)));var I;if(i?I=()=>{var M=n[e];return M===void 0?c():(l=!0,M)}:I=()=>{var M=n[e];return M!==void 0&&(a=void 0),M===void 0?a:M},i&&!(t&T_))return I;if(h){var k=n.$$legacy;return function(M,U){return arguments.length>0?((!i||!U||k||m)&&h(U?I():M),M):I()}}var P=!1,A=Jc(()=>(P=!1,I()));w(A);var x=be;return function(M,U){if(arguments.length>0){const H=U?w(A):i&&s?ji(M):M;return $(A,H),P=!0,a!==void 0&&(a=H),M}return yi&&P||x.f&Gn?A.v:w(A)}}const Kv=()=>{};var Jh={};/**
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
 */const vp=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Qv=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=n[t++],a=n[t++],l=n[t++],c=((i&7)<<18|(s&63)<<12|(a&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const s=n[t++],a=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|a&63)}}return e.join("")},yp={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){const s=n[i],a=i+1<n.length,l=a?n[i+1]:0,c=i+2<n.length,h=c?n[i+2]:0,f=s>>2,g=(s&3)<<4|l>>4;let m=(l&15)<<2|h>>6,I=h&63;c||(I=64,a||(m=64)),r.push(t[f],t[g],t[m],t[I])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(vp(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Qv(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){const s=t[n.charAt(i++)],l=i<n.length?t[n.charAt(i)]:0;++i;const h=i<n.length?t[n.charAt(i)]:64;++i;const g=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||l==null||h==null||g==null)throw new Jv;const m=s<<2|l>>4;if(r.push(m),h!==64){const I=l<<4&240|h>>2;if(r.push(I),g!==64){const k=h<<6&192|g;r.push(k)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Jv extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Yv=function(n){const e=vp(n);return yp.encodeByteArray(e,!0)},Na=function(n){return Yv(n).replace(/\./g,"")},wp=function(n){try{return yp.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */const Zv=()=>Xv().__FIREBASE_DEFAULTS__,ey=()=>{if(typeof process>"u"||typeof Jh>"u")return;const n=Jh.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ty=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&wp(n[1]);return e&&JSON.parse(e)},cl=()=>{try{return Kv()||Zv()||ey()||ty()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Ep=n=>{var e,t;return(t=(e=cl())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},ny=n=>{const e=Ep(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},bp=()=>{var n;return(n=cl())===null||n===void 0?void 0:n.config},Tp=n=>{var e;return(e=cl())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */function _s(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Ip(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function iy(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Na(JSON.stringify(t)),Na(JSON.stringify(a)),""].join(".")}const Zs={};function sy(){const n={prod:[],emulator:[]};for(const e of Object.keys(Zs))Zs[e]?n.emulator.push(e):n.prod.push(e);return n}function oy(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Yh=!1;function Ap(n,e){if(typeof window>"u"||typeof document>"u"||!_s(window.location.host)||Zs[n]===e||Zs[n]||Yh)return;Zs[n]=e;function t(m){return`__firebase__banner__${m}`}const r="__firebase__banner",s=sy().prod.length>0;function a(){const m=document.getElementById(r);m&&m.remove()}function l(m){m.style.display="flex",m.style.background="#7faaf0",m.style.position="fixed",m.style.bottom="5px",m.style.left="5px",m.style.padding=".5em",m.style.borderRadius="5px",m.style.alignItems="center"}function c(m,I){m.setAttribute("width","24"),m.setAttribute("id",I),m.setAttribute("height","24"),m.setAttribute("viewBox","0 0 24 24"),m.setAttribute("fill","none"),m.style.marginLeft="-6px"}function h(){const m=document.createElement("span");return m.style.cursor="pointer",m.style.marginLeft="16px",m.style.fontSize="24px",m.innerHTML=" &times;",m.onclick=()=>{Yh=!0,a()},m}function f(m,I){m.setAttribute("id",I),m.innerText="Learn more",m.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",m.setAttribute("target","__blank"),m.style.paddingLeft="5px",m.style.textDecoration="underline"}function g(){const m=oy(r),I=t("text"),k=document.getElementById(I)||document.createElement("span"),P=t("learnmore"),A=document.getElementById(P)||document.createElement("a"),x=t("preprendIcon"),F=document.getElementById(x)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(m.created){const M=m.element;l(M),f(A,P);const U=h();c(F,x),M.append(F,k,A,U),document.body.appendChild(M)}s?(k.innerText="Preview backend disconnected.",F.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(F.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,k.innerText="Preview backend running in this workspace."),k.setAttribute("id",I)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
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
 */function St(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function ay(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(St())}function ly(){var n;const e=(n=cl())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function cy(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function uy(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function hy(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dy(){const n=St();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function fy(){return!ly()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function py(){try{return typeof indexedDB=="object"}catch{return!1}}function gy(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var s;e(((s=i.error)===null||s===void 0?void 0:s.message)||"")}}catch(t){e(t)}})}/**
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
 */const my="FirebaseError";class sr extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=my,Object.setPrototypeOf(this,sr.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ro.prototype.create)}}class Ro{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],a=s?_y(s,r):"Error",l=`${this.serviceName}: ${a} (${i}).`;return new sr(i,l,r)}}function _y(n,e){return n.replace(vy,(t,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const vy=/\{\$([^}]+)}/g;function yy(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function fi(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const i of t){if(!r.includes(i))return!1;const s=n[i],a=e[i];if(Xh(s)&&Xh(a)){if(!fi(s,a))return!1}else if(s!==a)return!1}for(const i of r)if(!t.includes(i))return!1;return!0}function Xh(n){return n!==null&&typeof n=="object"}/**
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
 */function ko(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Hs(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function Ws(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function wy(n,e){const t=new Ey(n,e);return t.subscribe.bind(t)}class Ey{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");by(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=Wl),i.error===void 0&&(i.error=Wl),i.complete===void 0&&(i.complete=Wl);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function by(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Wl(){}/**
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
 */function Rt(n){return n&&n._delegate?n._delegate:n}class pi{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Kr="[DEFAULT]";/**
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
 */class Ty{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new ry;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(s){if(i)return null;throw s}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Ay(e))try{this.getOrInitializeService({instanceIdentifier:Kr})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Kr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Kr){return this.instances.has(e)}getOptions(e=Kr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[s,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&a.resolve(i)}return i}onInit(e,t){var r;const i=this.normalizeInstanceIdentifier(t),s=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;s.add(e),this.onInitCallbacks.set(i,s);const a=this.instances.get(i);return a&&e(a,i),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Iy(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Kr){return this.component?this.component.multipleInstances?e:Kr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Iy(n){return n===Kr?void 0:n}function Ay(n){return n.instantiationMode==="EAGER"}/**
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
 */var ue;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(ue||(ue={}));const Ry={debug:ue.DEBUG,verbose:ue.VERBOSE,info:ue.INFO,warn:ue.WARN,error:ue.ERROR,silent:ue.SILENT},ky=ue.INFO,Py={[ue.DEBUG]:"log",[ue.VERBOSE]:"log",[ue.INFO]:"info",[ue.WARN]:"warn",[ue.ERROR]:"error"},Cy=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),i=Py[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class ru{constructor(e){this.name=e,this._logLevel=ky,this._logHandler=Cy,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in ue))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ry[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,ue.DEBUG,...e),this._logHandler(this,ue.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,ue.VERBOSE,...e),this._logHandler(this,ue.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,ue.INFO,...e),this._logHandler(this,ue.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,ue.WARN,...e),this._logHandler(this,ue.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,ue.ERROR,...e),this._logHandler(this,ue.ERROR,...e)}}const xy=(n,e)=>e.some(t=>n instanceof t);let Zh,ed;function Dy(){return Zh||(Zh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Vy(){return ed||(ed=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Sp=new WeakMap,vc=new WeakMap,Rp=new WeakMap,Gl=new WeakMap,iu=new WeakMap;function Ny(n){const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",a)},s=()=>{t(Ar(n.result)),i()},a=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&Sp.set(t,n)}).catch(()=>{}),iu.set(e,n),e}function Oy(n){if(vc.has(n))return;const e=new Promise((t,r)=>{const i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",a),n.removeEventListener("abort",a)},s=()=>{t(),i()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",a),n.addEventListener("abort",a)});vc.set(n,e)}let yc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return vc.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Rp.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Ar(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ly(n){yc=n(yc)}function My(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Kl(this),e,...t);return Rp.set(r,e.sort?e.sort():[e]),Ar(r)}:Vy().includes(n)?function(...e){return n.apply(Kl(this),e),Ar(Sp.get(this))}:function(...e){return Ar(n.apply(Kl(this),e))}}function Fy(n){return typeof n=="function"?My(n):(n instanceof IDBTransaction&&Oy(n),xy(n,Dy())?new Proxy(n,yc):n)}function Ar(n){if(n instanceof IDBRequest)return Ny(n);if(Gl.has(n))return Gl.get(n);const e=Fy(n);return e!==n&&(Gl.set(n,e),iu.set(e,n)),e}const Kl=n=>iu.get(n);function Uy(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){const a=indexedDB.open(n,e),l=Ar(a);return r&&a.addEventListener("upgradeneeded",c=>{r(Ar(a.result),c.oldVersion,c.newVersion,Ar(a.transaction),c)}),t&&a.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),l.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",h=>i(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const jy=["get","getKey","getAll","getAllKeys","count"],By=["put","add","delete","clear"],Ql=new Map;function td(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ql.get(e))return Ql.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,i=By.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||jy.includes(t)))return;const s=async function(a,...l){const c=this.transaction(a,i?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[t](...l),i&&c.done]))[0]};return Ql.set(e,s),s}Ly(n=>({...n,get:(e,t,r)=>td(e,t)||n.get(e,t,r),has:(e,t)=>!!td(e,t)||n.has(e,t)}));/**
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
 */const Yn=new ru("@firebase/app"),zy="@firebase/app-compat",Hy="@firebase/analytics-compat",Wy="@firebase/analytics",Gy="@firebase/app-check-compat",Ky="@firebase/app-check",Qy="@firebase/auth",Jy="@firebase/auth-compat",Yy="@firebase/database",Xy="@firebase/data-connect",Zy="@firebase/database-compat",e0="@firebase/functions",t0="@firebase/functions-compat",n0="@firebase/installations",r0="@firebase/installations-compat",i0="@firebase/messaging",s0="@firebase/messaging-compat",o0="@firebase/performance",a0="@firebase/performance-compat",l0="@firebase/remote-config",c0="@firebase/remote-config-compat",u0="@firebase/storage",h0="@firebase/storage-compat",d0="@firebase/firestore",f0="@firebase/ai",p0="@firebase/firestore-compat",g0="firebase",m0="11.10.0";/**
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
 */const Ec="[DEFAULT]",_0={[wc]:"fire-core",[zy]:"fire-core-compat",[Wy]:"fire-analytics",[Hy]:"fire-analytics-compat",[Ky]:"fire-app-check",[Gy]:"fire-app-check-compat",[Qy]:"fire-auth",[Jy]:"fire-auth-compat",[Yy]:"fire-rtdb",[Xy]:"fire-data-connect",[Zy]:"fire-rtdb-compat",[e0]:"fire-fn",[t0]:"fire-fn-compat",[n0]:"fire-iid",[r0]:"fire-iid-compat",[i0]:"fire-fcm",[s0]:"fire-fcm-compat",[o0]:"fire-perf",[a0]:"fire-perf-compat",[l0]:"fire-rc",[c0]:"fire-rc-compat",[u0]:"fire-gcs",[h0]:"fire-gcs-compat",[d0]:"fire-fst",[p0]:"fire-fst-compat",[f0]:"fire-vertex","fire-js":"fire-js",[g0]:"fire-js-all"};/**
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
 */const lo=new Map,v0=new Map,bc=new Map;function rd(n,e){try{n.container.addComponent(e)}catch(t){Yn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function rs(n){const e=n.name;if(bc.has(e))return Yn.debug(`There were multiple attempts to register component ${e}.`),!1;bc.set(e,n);for(const t of lo.values())rd(t,n);for(const t of v0.values())rd(t,n);return!0}function su(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function an(n){return n==null?!1:n.settings!==void 0}/**
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
 */const y0={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Sr=new Ro("app","Firebase",y0);/**
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
 */class w0{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new pi("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Sr.create("app-deleted",{appName:this._name})}}/**
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
 */const vs=m0;function kp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ec,automaticDataCollectionEnabled:!0},e),i=r.name;if(typeof i!="string"||!i)throw Sr.create("bad-app-name",{appName:String(i)});if(t||(t=bp()),!t)throw Sr.create("no-options");const s=lo.get(i);if(s){if(fi(t,s.options)&&fi(r,s.config))return s;throw Sr.create("duplicate-app",{appName:i})}const a=new Sy(i);for(const c of bc.values())a.addComponent(c);const l=new w0(t,r,a);return lo.set(i,l),l}function Pp(n=Ec){const e=lo.get(n);if(!e&&n===Ec&&bp())return kp();if(!e)throw Sr.create("no-app",{appName:n});return e}function id(){return Array.from(lo.values())}function Rr(n,e,t){var r;let i=(r=_0[n])!==null&&r!==void 0?r:n;t&&(i+=`-${t}`);const s=i.match(/\s|\//),a=e.match(/\s|\//);if(s||a){const l=[`Unable to register library "${i}" with version "${e}":`];s&&l.push(`library name "${i}" contains illegal characters (whitespace or "/")`),s&&a&&l.push("and"),a&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Yn.warn(l.join(" "));return}rs(new pi(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const E0="firebase-heartbeat-database",b0=1,co="firebase-heartbeat-store";let Jl=null;function Cp(){return Jl||(Jl=Uy(E0,b0,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(co)}catch(t){console.warn(t)}}}}).catch(n=>{throw Sr.create("idb-open",{originalErrorMessage:n.message})})),Jl}async function T0(n){try{const t=(await Cp()).transaction(co),r=await t.objectStore(co).get(xp(n));return await t.done,r}catch(e){if(e instanceof sr)Yn.warn(e.message);else{const t=Sr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Yn.warn(t.message)}}}async function sd(n,e){try{const r=(await Cp()).transaction(co,"readwrite");await r.objectStore(co).put(e,xp(n)),await r.done}catch(t){if(t instanceof sr)Yn.warn(t.message);else{const r=Sr.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Yn.warn(r.message)}}}function xp(n){return`${n.name}!${n.options.appId}`}/**
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
 */const I0=1024,A0=30;class S0{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new k0(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=od();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(a=>a.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>A0){const a=P0(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Yn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=od(),{heartbeatsToSend:r,unsentEntries:i}=R0(this._heartbeatsCache.heartbeats),s=Na(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(t){return Yn.warn(t),""}}}function od(){return new Date().toISOString().substring(0,10)}function R0(n,e=I0){const t=[];let r=n.slice();for(const i of n){const s=t.find(a=>a.agent===i.agent);if(s){if(s.dates.push(i.date),ad(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),ad(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class k0{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return py()?gy().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await T0(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return sd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return sd(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function ad(n){return Na(JSON.stringify({version:2,heartbeats:n})).length}function P0(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
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
 */function C0(n){rs(new pi("platform-logger",e=>new $y(e),"PRIVATE")),rs(new pi("heartbeat",e=>new S0(e),"PRIVATE")),Rr(wc,nd,n),Rr(wc,nd,"esm2017"),Rr("fire-js","")}C0("");var x0="firebase",D0="11.10.0";/**
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
 */Rr(x0,D0,"app");var ld=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var kr,Dp;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(b,_){function y(){}y.prototype=_.prototype,b.D=_.prototype,b.prototype=new y,b.prototype.constructor=b,b.C=function(v,T,S){for(var E=Array(arguments.length-2),_e=2;_e<arguments.length;_e++)E[_e-2]=arguments[_e];return _.prototype[T].apply(v,E)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(b,_,y){y||(y=0);var v=Array(16);if(typeof _=="string")for(var T=0;16>T;++T)v[T]=_.charCodeAt(y++)|_.charCodeAt(y++)<<8|_.charCodeAt(y++)<<16|_.charCodeAt(y++)<<24;else for(T=0;16>T;++T)v[T]=_[y++]|_[y++]<<8|_[y++]<<16|_[y++]<<24;_=b.g[0],y=b.g[1],T=b.g[2];var S=b.g[3],E=_+(S^y&(T^S))+v[0]+3614090360&4294967295;_=y+(E<<7&4294967295|E>>>25),E=S+(T^_&(y^T))+v[1]+3905402710&4294967295,S=_+(E<<12&4294967295|E>>>20),E=T+(y^S&(_^y))+v[2]+606105819&4294967295,T=S+(E<<17&4294967295|E>>>15),E=y+(_^T&(S^_))+v[3]+3250441966&4294967295,y=T+(E<<22&4294967295|E>>>10),E=_+(S^y&(T^S))+v[4]+4118548399&4294967295,_=y+(E<<7&4294967295|E>>>25),E=S+(T^_&(y^T))+v[5]+1200080426&4294967295,S=_+(E<<12&4294967295|E>>>20),E=T+(y^S&(_^y))+v[6]+2821735955&4294967295,T=S+(E<<17&4294967295|E>>>15),E=y+(_^T&(S^_))+v[7]+4249261313&4294967295,y=T+(E<<22&4294967295|E>>>10),E=_+(S^y&(T^S))+v[8]+1770035416&4294967295,_=y+(E<<7&4294967295|E>>>25),E=S+(T^_&(y^T))+v[9]+2336552879&4294967295,S=_+(E<<12&4294967295|E>>>20),E=T+(y^S&(_^y))+v[10]+4294925233&4294967295,T=S+(E<<17&4294967295|E>>>15),E=y+(_^T&(S^_))+v[11]+2304563134&4294967295,y=T+(E<<22&4294967295|E>>>10),E=_+(S^y&(T^S))+v[12]+1804603682&4294967295,_=y+(E<<7&4294967295|E>>>25),E=S+(T^_&(y^T))+v[13]+4254626195&4294967295,S=_+(E<<12&4294967295|E>>>20),E=T+(y^S&(_^y))+v[14]+2792965006&4294967295,T=S+(E<<17&4294967295|E>>>15),E=y+(_^T&(S^_))+v[15]+1236535329&4294967295,y=T+(E<<22&4294967295|E>>>10),E=_+(T^S&(y^T))+v[1]+4129170786&4294967295,_=y+(E<<5&4294967295|E>>>27),E=S+(y^T&(_^y))+v[6]+3225465664&4294967295,S=_+(E<<9&4294967295|E>>>23),E=T+(_^y&(S^_))+v[11]+643717713&4294967295,T=S+(E<<14&4294967295|E>>>18),E=y+(S^_&(T^S))+v[0]+3921069994&4294967295,y=T+(E<<20&4294967295|E>>>12),E=_+(T^S&(y^T))+v[5]+3593408605&4294967295,_=y+(E<<5&4294967295|E>>>27),E=S+(y^T&(_^y))+v[10]+38016083&4294967295,S=_+(E<<9&4294967295|E>>>23),E=T+(_^y&(S^_))+v[15]+3634488961&4294967295,T=S+(E<<14&4294967295|E>>>18),E=y+(S^_&(T^S))+v[4]+3889429448&4294967295,y=T+(E<<20&4294967295|E>>>12),E=_+(T^S&(y^T))+v[9]+568446438&4294967295,_=y+(E<<5&4294967295|E>>>27),E=S+(y^T&(_^y))+v[14]+3275163606&4294967295,S=_+(E<<9&4294967295|E>>>23),E=T+(_^y&(S^_))+v[3]+4107603335&4294967295,T=S+(E<<14&4294967295|E>>>18),E=y+(S^_&(T^S))+v[8]+1163531501&4294967295,y=T+(E<<20&4294967295|E>>>12),E=_+(T^S&(y^T))+v[13]+2850285829&4294967295,_=y+(E<<5&4294967295|E>>>27),E=S+(y^T&(_^y))+v[2]+4243563512&4294967295,S=_+(E<<9&4294967295|E>>>23),E=T+(_^y&(S^_))+v[7]+1735328473&4294967295,T=S+(E<<14&4294967295|E>>>18),E=y+(S^_&(T^S))+v[12]+2368359562&4294967295,y=T+(E<<20&4294967295|E>>>12),E=_+(y^T^S)+v[5]+4294588738&4294967295,_=y+(E<<4&4294967295|E>>>28),E=S+(_^y^T)+v[8]+2272392833&4294967295,S=_+(E<<11&4294967295|E>>>21),E=T+(S^_^y)+v[11]+1839030562&4294967295,T=S+(E<<16&4294967295|E>>>16),E=y+(T^S^_)+v[14]+4259657740&4294967295,y=T+(E<<23&4294967295|E>>>9),E=_+(y^T^S)+v[1]+2763975236&4294967295,_=y+(E<<4&4294967295|E>>>28),E=S+(_^y^T)+v[4]+1272893353&4294967295,S=_+(E<<11&4294967295|E>>>21),E=T+(S^_^y)+v[7]+4139469664&4294967295,T=S+(E<<16&4294967295|E>>>16),E=y+(T^S^_)+v[10]+3200236656&4294967295,y=T+(E<<23&4294967295|E>>>9),E=_+(y^T^S)+v[13]+681279174&4294967295,_=y+(E<<4&4294967295|E>>>28),E=S+(_^y^T)+v[0]+3936430074&4294967295,S=_+(E<<11&4294967295|E>>>21),E=T+(S^_^y)+v[3]+3572445317&4294967295,T=S+(E<<16&4294967295|E>>>16),E=y+(T^S^_)+v[6]+76029189&4294967295,y=T+(E<<23&4294967295|E>>>9),E=_+(y^T^S)+v[9]+3654602809&4294967295,_=y+(E<<4&4294967295|E>>>28),E=S+(_^y^T)+v[12]+3873151461&4294967295,S=_+(E<<11&4294967295|E>>>21),E=T+(S^_^y)+v[15]+530742520&4294967295,T=S+(E<<16&4294967295|E>>>16),E=y+(T^S^_)+v[2]+3299628645&4294967295,y=T+(E<<23&4294967295|E>>>9),E=_+(T^(y|~S))+v[0]+4096336452&4294967295,_=y+(E<<6&4294967295|E>>>26),E=S+(y^(_|~T))+v[7]+1126891415&4294967295,S=_+(E<<10&4294967295|E>>>22),E=T+(_^(S|~y))+v[14]+2878612391&4294967295,T=S+(E<<15&4294967295|E>>>17),E=y+(S^(T|~_))+v[5]+4237533241&4294967295,y=T+(E<<21&4294967295|E>>>11),E=_+(T^(y|~S))+v[12]+1700485571&4294967295,_=y+(E<<6&4294967295|E>>>26),E=S+(y^(_|~T))+v[3]+2399980690&4294967295,S=_+(E<<10&4294967295|E>>>22),E=T+(_^(S|~y))+v[10]+4293915773&4294967295,T=S+(E<<15&4294967295|E>>>17),E=y+(S^(T|~_))+v[1]+2240044497&4294967295,y=T+(E<<21&4294967295|E>>>11),E=_+(T^(y|~S))+v[8]+1873313359&4294967295,_=y+(E<<6&4294967295|E>>>26),E=S+(y^(_|~T))+v[15]+4264355552&4294967295,S=_+(E<<10&4294967295|E>>>22),E=T+(_^(S|~y))+v[6]+2734768916&4294967295,T=S+(E<<15&4294967295|E>>>17),E=y+(S^(T|~_))+v[13]+1309151649&4294967295,y=T+(E<<21&4294967295|E>>>11),E=_+(T^(y|~S))+v[4]+4149444226&4294967295,_=y+(E<<6&4294967295|E>>>26),E=S+(y^(_|~T))+v[11]+3174756917&4294967295,S=_+(E<<10&4294967295|E>>>22),E=T+(_^(S|~y))+v[2]+718787259&4294967295,T=S+(E<<15&4294967295|E>>>17),E=y+(S^(T|~_))+v[9]+3951481745&4294967295,b.g[0]=b.g[0]+_&4294967295,b.g[1]=b.g[1]+(T+(E<<21&4294967295|E>>>11))&4294967295,b.g[2]=b.g[2]+T&4294967295,b.g[3]=b.g[3]+S&4294967295}r.prototype.u=function(b,_){_===void 0&&(_=b.length);for(var y=_-this.blockSize,v=this.B,T=this.h,S=0;S<_;){if(T==0)for(;S<=y;)i(this,b,S),S+=this.blockSize;if(typeof b=="string"){for(;S<_;)if(v[T++]=b.charCodeAt(S++),T==this.blockSize){i(this,v),T=0;break}}else for(;S<_;)if(v[T++]=b[S++],T==this.blockSize){i(this,v),T=0;break}}this.h=T,this.o+=_},r.prototype.v=function(){var b=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);b[0]=128;for(var _=1;_<b.length-8;++_)b[_]=0;var y=8*this.o;for(_=b.length-8;_<b.length;++_)b[_]=y&255,y/=256;for(this.u(b),b=Array(16),_=y=0;4>_;++_)for(var v=0;32>v;v+=8)b[y++]=this.g[_]>>>v&255;return b};function s(b,_){var y=l;return Object.prototype.hasOwnProperty.call(y,b)?y[b]:y[b]=_(b)}function a(b,_){this.h=_;for(var y=[],v=!0,T=b.length-1;0<=T;T--){var S=b[T]|0;v&&S==_||(y[T]=S,v=!1)}this.g=y}var l={};function c(b){return-128<=b&&128>b?s(b,function(_){return new a([_|0],0>_?-1:0)}):new a([b|0],0>b?-1:0)}function h(b){if(isNaN(b)||!isFinite(b))return g;if(0>b)return A(h(-b));for(var _=[],y=1,v=0;b>=y;v++)_[v]=b/y|0,y*=4294967296;return new a(_,0)}function f(b,_){if(b.length==0)throw Error("number format error: empty string");if(_=_||10,2>_||36<_)throw Error("radix out of range: "+_);if(b.charAt(0)=="-")return A(f(b.substring(1),_));if(0<=b.indexOf("-"))throw Error('number format error: interior "-" character');for(var y=h(Math.pow(_,8)),v=g,T=0;T<b.length;T+=8){var S=Math.min(8,b.length-T),E=parseInt(b.substring(T,T+S),_);8>S?(S=h(Math.pow(_,S)),v=v.j(S).add(h(E))):(v=v.j(y),v=v.add(h(E)))}return v}var g=c(0),m=c(1),I=c(16777216);n=a.prototype,n.m=function(){if(P(this))return-A(this).m();for(var b=0,_=1,y=0;y<this.g.length;y++){var v=this.i(y);b+=(0<=v?v:4294967296+v)*_,_*=4294967296}return b},n.toString=function(b){if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(k(this))return"0";if(P(this))return"-"+A(this).toString(b);for(var _=h(Math.pow(b,6)),y=this,v="";;){var T=U(y,_).g;y=x(y,T.j(_));var S=((0<y.g.length?y.g[0]:y.h)>>>0).toString(b);if(y=T,k(y))return S+v;for(;6>S.length;)S="0"+S;v=S+v}},n.i=function(b){return 0>b?0:b<this.g.length?this.g[b]:this.h};function k(b){if(b.h!=0)return!1;for(var _=0;_<b.g.length;_++)if(b.g[_]!=0)return!1;return!0}function P(b){return b.h==-1}n.l=function(b){return b=x(this,b),P(b)?-1:k(b)?0:1};function A(b){for(var _=b.g.length,y=[],v=0;v<_;v++)y[v]=~b.g[v];return new a(y,~b.h).add(m)}n.abs=function(){return P(this)?A(this):this},n.add=function(b){for(var _=Math.max(this.g.length,b.g.length),y=[],v=0,T=0;T<=_;T++){var S=v+(this.i(T)&65535)+(b.i(T)&65535),E=(S>>>16)+(this.i(T)>>>16)+(b.i(T)>>>16);v=E>>>16,S&=65535,E&=65535,y[T]=E<<16|S}return new a(y,y[y.length-1]&-2147483648?-1:0)};function x(b,_){return b.add(A(_))}n.j=function(b){if(k(this)||k(b))return g;if(P(this))return P(b)?A(this).j(A(b)):A(A(this).j(b));if(P(b))return A(this.j(A(b)));if(0>this.l(I)&&0>b.l(I))return h(this.m()*b.m());for(var _=this.g.length+b.g.length,y=[],v=0;v<2*_;v++)y[v]=0;for(v=0;v<this.g.length;v++)for(var T=0;T<b.g.length;T++){var S=this.i(v)>>>16,E=this.i(v)&65535,_e=b.i(T)>>>16,le=b.i(T)&65535;y[2*v+2*T]+=E*le,F(y,2*v+2*T),y[2*v+2*T+1]+=S*le,F(y,2*v+2*T+1),y[2*v+2*T+1]+=E*_e,F(y,2*v+2*T+1),y[2*v+2*T+2]+=S*_e,F(y,2*v+2*T+2)}for(v=0;v<_;v++)y[v]=y[2*v+1]<<16|y[2*v];for(v=_;v<2*_;v++)y[v]=0;return new a(y,0)};function F(b,_){for(;(b[_]&65535)!=b[_];)b[_+1]+=b[_]>>>16,b[_]&=65535,_++}function M(b,_){this.g=b,this.h=_}function U(b,_){if(k(_))throw Error("division by zero");if(k(b))return new M(g,g);if(P(b))return _=U(A(b),_),new M(A(_.g),A(_.h));if(P(_))return _=U(b,A(_)),new M(A(_.g),_.h);if(30<b.g.length){if(P(b)||P(_))throw Error("slowDivide_ only works with positive integers.");for(var y=m,v=_;0>=v.l(b);)y=H(y),v=H(v);var T=W(y,1),S=W(v,1);for(v=W(v,2),y=W(y,2);!k(v);){var E=S.add(v);0>=E.l(b)&&(T=T.add(y),S=E),v=W(v,1),y=W(y,1)}return _=x(b,T.j(_)),new M(T,_)}for(T=g;0<=b.l(_);){for(y=Math.max(1,Math.floor(b.m()/_.m())),v=Math.ceil(Math.log(y)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),S=h(y),E=S.j(_);P(E)||0<E.l(b);)y-=v,S=h(y),E=S.j(_);k(S)&&(S=m),T=T.add(S),b=x(b,E)}return new M(T,b)}n.A=function(b){return U(this,b).h},n.and=function(b){for(var _=Math.max(this.g.length,b.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)&b.i(v);return new a(y,this.h&b.h)},n.or=function(b){for(var _=Math.max(this.g.length,b.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)|b.i(v);return new a(y,this.h|b.h)},n.xor=function(b){for(var _=Math.max(this.g.length,b.g.length),y=[],v=0;v<_;v++)y[v]=this.i(v)^b.i(v);return new a(y,this.h^b.h)};function H(b){for(var _=b.g.length+1,y=[],v=0;v<_;v++)y[v]=b.i(v)<<1|b.i(v-1)>>>31;return new a(y,b.h)}function W(b,_){var y=_>>5;_%=32;for(var v=b.g.length-y,T=[],S=0;S<v;S++)T[S]=0<_?b.i(S+y)>>>_|b.i(S+y+1)<<32-_:b.i(S+y);return new a(T,b.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Dp=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,kr=a}).apply(typeof ld<"u"?ld:typeof self<"u"?self:typeof window<"u"?window:{});var la=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Vp,Gs,Np,va,Tc,Op,Lp,Mp;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(o,u,d){return o==Array.prototype||o==Object.prototype||(o[u]=d.value),o};function t(o){o=[typeof globalThis=="object"&&globalThis,o,typeof window=="object"&&window,typeof self=="object"&&self,typeof la=="object"&&la];for(var u=0;u<o.length;++u){var d=o[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function i(o,u){if(u)e:{var d=r;o=o.split(".");for(var p=0;p<o.length-1;p++){var R=o[p];if(!(R in d))break e;d=d[R]}o=o[o.length-1],p=d[o],u=u(p),u!=p&&u!=null&&e(d,o,{configurable:!0,writable:!0,value:u})}}function s(o,u){o instanceof String&&(o+="");var d=0,p=!1,R={next:function(){if(!p&&d<o.length){var D=d++;return{value:u(D,o[D]),done:!1}}return p=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}i("Array.prototype.values",function(o){return o||function(){return s(this,function(u,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},l=this||self;function c(o){var u=typeof o;return u=u!="object"?u:o?Array.isArray(o)?"array":u:"null",u=="array"||u=="object"&&typeof o.length=="number"}function h(o){var u=typeof o;return u=="object"&&o!=null||u=="function"}function f(o,u,d){return o.call.apply(o.bind,arguments)}function g(o,u,d){if(!o)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,p),o.apply(u,R)}}return function(){return o.apply(u,arguments)}}function m(o,u,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:g,m.apply(null,arguments)}function I(o,u){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),o.apply(this,p)}}function k(o,u){function d(){}d.prototype=u.prototype,o.aa=u.prototype,o.prototype=new d,o.prototype.constructor=o,o.Qb=function(p,R,D){for(var j=Array(arguments.length-2),ke=2;ke<arguments.length;ke++)j[ke-2]=arguments[ke];return u.prototype[R].apply(p,j)}}function P(o){const u=o.length;if(0<u){const d=Array(u);for(let p=0;p<u;p++)d[p]=o[p];return d}return[]}function A(o,u){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(c(p)){const R=o.length||0,D=p.length||0;o.length=R+D;for(let j=0;j<D;j++)o[R+j]=p[j]}else o.push(p)}}class x{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function F(o){return/^[\s\xa0]*$/.test(o)}function M(){var o=l.navigator;return o&&(o=o.userAgent)?o:""}function U(o){return U[" "](o),o}U[" "]=function(){};var H=M().indexOf("Gecko")!=-1&&!(M().toLowerCase().indexOf("webkit")!=-1&&M().indexOf("Edge")==-1)&&!(M().indexOf("Trident")!=-1||M().indexOf("MSIE")!=-1)&&M().indexOf("Edge")==-1;function W(o,u,d){for(const p in o)u.call(d,o[p],p,o)}function b(o,u){for(const d in o)u.call(void 0,o[d],d,o)}function _(o){const u={};for(const d in o)u[d]=o[d];return u}const y="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(o,u){let d,p;for(let R=1;R<arguments.length;R++){p=arguments[R];for(d in p)o[d]=p[d];for(let D=0;D<y.length;D++)d=y[D],Object.prototype.hasOwnProperty.call(p,d)&&(o[d]=p[d])}}function T(o){var u=1;o=o.split(":");const d=[];for(;0<u&&o.length;)d.push(o.shift()),u--;return o.length&&d.push(o.join(":")),d}function S(o){l.setTimeout(()=>{throw o},0)}function E(){var o=Re;let u=null;return o.g&&(u=o.g,o.g=o.g.next,o.g||(o.h=null),u.next=null),u}class _e{constructor(){this.h=this.g=null}add(u,d){const p=le.get();p.set(u,d),this.h?this.h.next=p:this.g=p,this.h=p}}var le=new x(()=>new ve,o=>o.reset());class ve{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let re,we=!1,Re=new _e,je=()=>{const o=l.Promise.resolve(void 0);re=()=>{o.then(et)}};var et=()=>{for(var o;o=E();){try{o.h.call(o.g)}catch(d){S(d)}var u=le;u.j(o),100>u.h&&(u.h++,o.next=u.g,u.g=o)}we=!1};function pe(){this.s=this.s,this.C=this.C}pe.prototype.s=!1,pe.prototype.ma=function(){this.s||(this.s=!0,this.N())},pe.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function X(o,u){this.type=o,this.g=this.target=u,this.defaultPrevented=!1}X.prototype.h=function(){this.defaultPrevented=!0};var Fe=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var o=!1,u=Object.defineProperty({},"passive",{get:function(){o=!0}});try{const d=()=>{};l.addEventListener("test",d,u),l.removeEventListener("test",d,u)}catch{}return o}();function Be(o,u){if(X.call(this,o?o.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,o){var d=this.type=o.type,p=o.changedTouches&&o.changedTouches.length?o.changedTouches[0]:null;if(this.target=o.target||o.srcElement,this.g=u,u=o.relatedTarget){if(H){e:{try{U(u.nodeName);var R=!0;break e}catch{}R=!1}R||(u=null)}}else d=="mouseover"?u=o.fromElement:d=="mouseout"&&(u=o.toElement);this.relatedTarget=u,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=o.clientX!==void 0?o.clientX:o.pageX,this.clientY=o.clientY!==void 0?o.clientY:o.pageY,this.screenX=o.screenX||0,this.screenY=o.screenY||0),this.button=o.button,this.key=o.key||"",this.ctrlKey=o.ctrlKey,this.altKey=o.altKey,this.shiftKey=o.shiftKey,this.metaKey=o.metaKey,this.pointerId=o.pointerId||0,this.pointerType=typeof o.pointerType=="string"?o.pointerType:ct[o.pointerType]||"",this.state=o.state,this.i=o,o.defaultPrevented&&Be.aa.h.call(this)}}k(Be,X);var ct={2:"touch",3:"pen",4:"mouse"};Be.prototype.h=function(){Be.aa.h.call(this);var o=this.i;o.preventDefault?o.preventDefault():o.returnValue=!1};var Ie="closure_listenable_"+(1e6*Math.random()|0),Z=0;function Ne(o,u,d,p,R){this.listener=o,this.proxy=null,this.src=u,this.type=d,this.capture=!!p,this.ha=R,this.key=++Z,this.da=this.fa=!1}function We(o){o.da=!0,o.listener=null,o.proxy=null,o.src=null,o.ha=null}function $e(o){this.src=o,this.g={},this.h=0}$e.prototype.add=function(o,u,d,p,R){var D=o.toString();o=this.g[D],o||(o=this.g[D]=[],this.h++);var j=On(o,u,p,R);return-1<j?(u=o[j],d||(u.fa=!1)):(u=new Ne(u,this.src,D,!!p,R),u.fa=d,o.push(u)),u};function Nn(o,u){var d=u.type;if(d in o.g){var p=o.g[d],R=Array.prototype.indexOf.call(p,u,void 0),D;(D=0<=R)&&Array.prototype.splice.call(p,R,1),D&&(We(u),o.g[d].length==0&&(delete o.g[d],o.h--))}}function On(o,u,d,p){for(var R=0;R<o.length;++R){var D=o[R];if(!D.da&&D.listener==u&&D.capture==!!d&&D.ha==p)return R}return-1}var jr="closure_lm_"+(1e6*Math.random()|0),ar={};function Br(o,u,d,p,R){if(Array.isArray(u)){for(var D=0;D<u.length;D++)Br(o,u[D],d,p,R);return null}return d=Bo(d),o&&o[Ie]?o.K(u,d,h(p)?!!p.capture:!1,R):ot(o,u,d,!1,p,R)}function ot(o,u,d,p,R,D){if(!u)throw Error("Invalid event type");var j=h(R)?!!R.capture:!!R,ke=Ss(o);if(ke||(o[jr]=ke=new $e(o)),d=ke.add(u,d,p,j,D),d.proxy)return d;if(p=Si(),d.proxy=p,p.src=o,p.listener=d,o.addEventListener)Fe||(R=j),R===void 0&&(R=!1),o.addEventListener(u.toString(),p,R);else if(o.attachEvent)o.attachEvent(Uo(u.toString()),p);else if(o.addListener&&o.removeListener)o.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Si(){function o(d){return u.call(o.src,o.listener,d)}const u=jo;return o}function Is(o,u,d,p,R){if(Array.isArray(u))for(var D=0;D<u.length;D++)Is(o,u[D],d,p,R);else p=h(p)?!!p.capture:!!p,d=Bo(d),o&&o[Ie]?(o=o.i,u=String(u).toString(),u in o.g&&(D=o.g[u],d=On(D,d,p,R),-1<d&&(We(D[d]),Array.prototype.splice.call(D,d,1),D.length==0&&(delete o.g[u],o.h--)))):o&&(o=Ss(o))&&(u=o.g[u.toString()],o=-1,u&&(o=On(u,d,p,R)),(d=-1<o?u[o]:null)&&As(d))}function As(o){if(typeof o!="number"&&o&&!o.da){var u=o.src;if(u&&u[Ie])Nn(u.i,o);else{var d=o.type,p=o.proxy;u.removeEventListener?u.removeEventListener(d,p,o.capture):u.detachEvent?u.detachEvent(Uo(d),p):u.addListener&&u.removeListener&&u.removeListener(p),(d=Ss(u))?(Nn(d,o),d.h==0&&(d.src=null,u[jr]=null)):We(o)}}}function Uo(o){return o in ar?ar[o]:ar[o]="on"+o}function jo(o,u){if(o.da)o=!0;else{u=new Be(u,this);var d=o.listener,p=o.ha||o.src;o.fa&&As(o),o=d.call(p,u)}return o}function Ss(o){return o=o[jr],o instanceof $e?o:null}var Ri="__closure_events_fn_"+(1e9*Math.random()>>>0);function Bo(o){return typeof o=="function"?o:(o[Ri]||(o[Ri]=function(u){return o.handleEvent(u)}),o[Ri])}function tt(){pe.call(this),this.i=new $e(this),this.M=this,this.F=null}k(tt,pe),tt.prototype[Ie]=!0,tt.prototype.removeEventListener=function(o,u,d,p){Is(this,o,u,d,p)};function ut(o,u){var d,p=o.F;if(p)for(d=[];p;p=p.F)d.push(p);if(o=o.M,p=u.type||u,typeof u=="string")u=new X(u,o);else if(u instanceof X)u.target=u.target||o;else{var R=u;u=new X(p,o),v(u,R)}if(R=!0,d)for(var D=d.length-1;0<=D;D--){var j=u.g=d[D];R=$r(j,p,!0,u)&&R}if(j=u.g=o,R=$r(j,p,!0,u)&&R,R=$r(j,p,!1,u)&&R,d)for(D=0;D<d.length;D++)j=u.g=d[D],R=$r(j,p,!1,u)&&R}tt.prototype.N=function(){if(tt.aa.N.call(this),this.i){var o=this.i,u;for(u in o.g){for(var d=o.g[u],p=0;p<d.length;p++)We(d[p]);delete o.g[u],o.h--}}this.F=null},tt.prototype.K=function(o,u,d,p){return this.i.add(String(o),u,!1,d,p)},tt.prototype.L=function(o,u,d,p){return this.i.add(String(o),u,!0,d,p)};function $r(o,u,d,p){if(u=o.i.g[String(u)],!u)return!0;u=u.concat();for(var R=!0,D=0;D<u.length;++D){var j=u[D];if(j&&!j.da&&j.capture==d){var ke=j.listener,dt=j.ha||j.src;j.fa&&Nn(o.i,j),R=ke.call(dt,p)!==!1&&R}}return R&&!p.defaultPrevented}function $o(o,u,d){if(typeof o=="function")d&&(o=m(o,d));else if(o&&typeof o.handleEvent=="function")o=m(o.handleEvent,o);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(o,u||0)}function Rs(o){o.g=$o(()=>{o.g=null,o.i&&(o.i=!1,Rs(o))},o.l);const u=o.h;o.h=null,o.m.apply(null,u)}class Cl extends pe{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:Rs(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function qr(o){pe.call(this),this.h=o,this.g={}}k(qr,pe);var ks=[];function qo(o){W(o.g,function(u,d){this.g.hasOwnProperty(d)&&As(u)},o),o.g={}}qr.prototype.N=function(){qr.aa.N.call(this),qo(this)},qr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Q=l.JSON.stringify,Ae=l.JSON.parse,Ce=class{stringify(o){return l.JSON.stringify(o,void 0)}parse(o){return l.JSON.parse(o,void 0)}};function Qe(){}Qe.prototype.h=null;function ht(o){return o.h||(o.h=o.i())}function Dt(){}var nt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ut(){X.call(this,"d")}k(Ut,X);function zr(){X.call(this,"c")}k(zr,X);var Vt={},nn=null;function ki(){return nn=nn||new tt}Vt.La="serverreachability";function Ku(o){X.call(this,Vt.La,o)}k(Ku,X);function Ps(o){const u=ki();ut(u,new Ku(u))}Vt.STAT_EVENT="statevent";function Qu(o,u){X.call(this,Vt.STAT_EVENT,o),this.stat=u}k(Qu,X);function kt(o){const u=ki();ut(u,new Qu(u,o))}Vt.Ma="timingevent";function Ju(o,u){X.call(this,Vt.Ma,o),this.size=u}k(Ju,X);function Cs(o,u){if(typeof o!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){o()},u)}function xs(){this.g=!0}xs.prototype.xa=function(){this.g=!1};function zm(o,u,d,p,R,D){o.info(function(){if(o.g)if(D)for(var j="",ke=D.split("&"),dt=0;dt<ke.length;dt++){var ye=ke[dt].split("=");if(1<ye.length){var wt=ye[0];ye=ye[1];var Et=wt.split("_");j=2<=Et.length&&Et[1]=="type"?j+(wt+"="+ye+"&"):j+(wt+"=redacted&")}}else j=null;else j=D;return"XMLHTTP REQ ("+p+") [attempt "+R+"]: "+u+`
`+d+`
`+j})}function Hm(o,u,d,p,R,D,j){o.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+R+"]: "+u+`
`+d+`
`+D+" "+j})}function Pi(o,u,d,p){o.info(function(){return"XMLHTTP TEXT ("+u+"): "+Gm(o,d)+(p?" "+p:"")})}function Wm(o,u){o.info(function(){return"TIMEOUT: "+u})}xs.prototype.info=function(){};function Gm(o,u){if(!o.g)return u;if(!u)return null;try{var d=JSON.parse(u);if(d){for(o=0;o<d.length;o++)if(Array.isArray(d[o])){var p=d[o];if(!(2>p.length)){var R=p[1];if(Array.isArray(R)&&!(1>R.length)){var D=R[0];if(D!="noop"&&D!="stop"&&D!="close")for(var j=1;j<R.length;j++)R[j]=""}}}}return Q(d)}catch{return u}}var zo={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Yu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},xl;function Ho(){}k(Ho,Qe),Ho.prototype.g=function(){return new XMLHttpRequest},Ho.prototype.i=function(){return{}},xl=new Ho;function lr(o,u,d,p){this.j=o,this.i=u,this.l=d,this.R=p||1,this.U=new qr(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Xu}function Xu(){this.i=null,this.g="",this.h=!1}var Zu={},Dl={};function Vl(o,u,d){o.L=1,o.v=Qo(Ln(u)),o.m=d,o.P=!0,eh(o,null)}function eh(o,u){o.F=Date.now(),Wo(o),o.A=Ln(o.v);var d=o.A,p=o.R;Array.isArray(p)||(p=[String(p)]),ph(d.i,"t",p),o.C=0,d=o.j.J,o.h=new Xu,o.g=Dh(o.j,d?u:null,!o.m),0<o.O&&(o.M=new Cl(m(o.Y,o,o.g),o.O)),u=o.U,d=o.g,p=o.ca;var R="readystatechange";Array.isArray(R)||(R&&(ks[0]=R.toString()),R=ks);for(var D=0;D<R.length;D++){var j=Br(d,R[D],p||u.handleEvent,!1,u.h||u);if(!j)break;u.g[j.key]=j}u=o.H?_(o.H):{},o.m?(o.u||(o.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",o.g.ea(o.A,o.u,o.m,u)):(o.u="GET",o.g.ea(o.A,o.u,null,u)),Ps(),zm(o.i,o.u,o.A,o.l,o.R,o.m)}lr.prototype.ca=function(o){o=o.target;const u=this.M;u&&Mn(o)==3?u.j():this.Y(o)},lr.prototype.Y=function(o){try{if(o==this.g)e:{const Et=Mn(this.g);var u=this.g.Ba();const Di=this.g.Z();if(!(3>Et)&&(Et!=3||this.g&&(this.h.h||this.g.oa()||Eh(this.g)))){this.J||Et!=4||u==7||(u==8||0>=Di?Ps(3):Ps(2)),Nl(this);var d=this.g.Z();this.X=d;t:if(th(this)){var p=Eh(this.g);o="";var R=p.length,D=Mn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Hr(this),Ds(this);var j="";break t}this.h.i=new l.TextDecoder}for(u=0;u<R;u++)this.h.h=!0,o+=this.h.i.decode(p[u],{stream:!(D&&u==R-1)});p.length=0,this.h.g+=o,this.C=0,j=this.h.g}else j=this.g.oa();if(this.o=d==200,Hm(this.i,this.u,this.A,this.l,this.R,Et,d),this.o){if(this.T&&!this.K){t:{if(this.g){var ke,dt=this.g;if((ke=dt.g?dt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!F(ke)){var ye=ke;break t}}ye=null}if(d=ye)Pi(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ol(this,d);else{this.o=!1,this.s=3,kt(12),Hr(this),Ds(this);break e}}if(this.P){d=!0;let rn;for(;!this.J&&this.C<j.length;)if(rn=Km(this,j),rn==Dl){Et==4&&(this.s=4,kt(14),d=!1),Pi(this.i,this.l,null,"[Incomplete Response]");break}else if(rn==Zu){this.s=4,kt(15),Pi(this.i,this.l,j,"[Invalid Chunk]"),d=!1;break}else Pi(this.i,this.l,rn,null),Ol(this,rn);if(th(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Et!=4||j.length!=0||this.h.h||(this.s=1,kt(16),d=!1),this.o=this.o&&d,!d)Pi(this.i,this.l,j,"[Invalid Chunked Response]"),Hr(this),Ds(this);else if(0<j.length&&!this.W){this.W=!0;var wt=this.j;wt.g==this&&wt.ba&&!wt.M&&(wt.j.info("Great, no buffering proxy detected. Bytes received: "+j.length),Bl(wt),wt.M=!0,kt(11))}}else Pi(this.i,this.l,j,null),Ol(this,j);Et==4&&Hr(this),this.o&&!this.J&&(Et==4?kh(this.j,this):(this.o=!1,Wo(this)))}else h_(this.g),d==400&&0<j.indexOf("Unknown SID")?(this.s=3,kt(12)):(this.s=0,kt(13)),Hr(this),Ds(this)}}}catch{}finally{}};function th(o){return o.g?o.u=="GET"&&o.L!=2&&o.j.Ca:!1}function Km(o,u){var d=o.C,p=u.indexOf(`
`,d);return p==-1?Dl:(d=Number(u.substring(d,p)),isNaN(d)?Zu:(p+=1,p+d>u.length?Dl:(u=u.slice(p,p+d),o.C=p+d,u)))}lr.prototype.cancel=function(){this.J=!0,Hr(this)};function Wo(o){o.S=Date.now()+o.I,nh(o,o.I)}function nh(o,u){if(o.B!=null)throw Error("WatchDog timer not null");o.B=Cs(m(o.ba,o),u)}function Nl(o){o.B&&(l.clearTimeout(o.B),o.B=null)}lr.prototype.ba=function(){this.B=null;const o=Date.now();0<=o-this.S?(Wm(this.i,this.A),this.L!=2&&(Ps(),kt(17)),Hr(this),this.s=2,Ds(this)):nh(this,this.S-o)};function Ds(o){o.j.G==0||o.J||kh(o.j,o)}function Hr(o){Nl(o);var u=o.M;u&&typeof u.ma=="function"&&u.ma(),o.M=null,qo(o.U),o.g&&(u=o.g,o.g=null,u.abort(),u.ma())}function Ol(o,u){try{var d=o.j;if(d.G!=0&&(d.g==o||Ll(d.h,o))){if(!o.K&&Ll(d.h,o)&&d.G==3){try{var p=d.Da.g.parse(u)}catch{p=null}if(Array.isArray(p)&&p.length==3){var R=p;if(R[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<o.F)ta(d),Zo(d);else break e;jl(d),kt(18)}}else d.za=R[1],0<d.za-d.T&&37500>R[2]&&d.F&&d.v==0&&!d.C&&(d.C=Cs(m(d.Za,d),6e3));if(1>=sh(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Gr(d,11)}else if((o.K||d.g==o)&&ta(d),!F(u))for(R=d.Da.g.parse(u),u=0;u<R.length;u++){let ye=R[u];if(d.T=ye[0],ye=ye[1],d.G==2)if(ye[0]=="c"){d.K=ye[1],d.ia=ye[2];const wt=ye[3];wt!=null&&(d.la=wt,d.j.info("VER="+d.la));const Et=ye[4];Et!=null&&(d.Aa=Et,d.j.info("SVER="+d.Aa));const Di=ye[5];Di!=null&&typeof Di=="number"&&0<Di&&(p=1.5*Di,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const rn=o.g;if(rn){const ra=rn.g?rn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ra){var D=p.h;D.g||ra.indexOf("spdy")==-1&&ra.indexOf("quic")==-1&&ra.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(Ml(D,D.h),D.h=null))}if(p.D){const $l=rn.g?rn.g.getResponseHeader("X-HTTP-Session-Id"):null;$l&&(p.ya=$l,xe(p.I,p.D,$l))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-o.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var j=o;if(p.qa=xh(p,p.J?p.ia:null,p.W),j.K){oh(p.h,j);var ke=j,dt=p.L;dt&&(ke.I=dt),ke.B&&(Nl(ke),Wo(ke)),p.g=j}else Sh(p);0<d.i.length&&ea(d)}else ye[0]!="stop"&&ye[0]!="close"||Gr(d,7);else d.G==3&&(ye[0]=="stop"||ye[0]=="close"?ye[0]=="stop"?Gr(d,7):Ul(d):ye[0]!="noop"&&d.l&&d.l.ta(ye),d.v=0)}}Ps(4)}catch{}}var Qm=class{constructor(o,u){this.g=o,this.map=u}};function rh(o){this.l=o||10,l.PerformanceNavigationTiming?(o=l.performance.getEntriesByType("navigation"),o=0<o.length&&(o[0].nextHopProtocol=="hq"||o[0].nextHopProtocol=="h2")):o=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=o?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ih(o){return o.h?!0:o.g?o.g.size>=o.j:!1}function sh(o){return o.h?1:o.g?o.g.size:0}function Ll(o,u){return o.h?o.h==u:o.g?o.g.has(u):!1}function Ml(o,u){o.g?o.g.add(u):o.h=u}function oh(o,u){o.h&&o.h==u?o.h=null:o.g&&o.g.has(u)&&o.g.delete(u)}rh.prototype.cancel=function(){if(this.i=ah(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const o of this.g.values())o.cancel();this.g.clear()}};function ah(o){if(o.h!=null)return o.i.concat(o.h.D);if(o.g!=null&&o.g.size!==0){let u=o.i;for(const d of o.g.values())u=u.concat(d.D);return u}return P(o.i)}function Jm(o){if(o.V&&typeof o.V=="function")return o.V();if(typeof Map<"u"&&o instanceof Map||typeof Set<"u"&&o instanceof Set)return Array.from(o.values());if(typeof o=="string")return o.split("");if(c(o)){for(var u=[],d=o.length,p=0;p<d;p++)u.push(o[p]);return u}u=[],d=0;for(p in o)u[d++]=o[p];return u}function Ym(o){if(o.na&&typeof o.na=="function")return o.na();if(!o.V||typeof o.V!="function"){if(typeof Map<"u"&&o instanceof Map)return Array.from(o.keys());if(!(typeof Set<"u"&&o instanceof Set)){if(c(o)||typeof o=="string"){var u=[];o=o.length;for(var d=0;d<o;d++)u.push(d);return u}u=[],d=0;for(const p in o)u[d++]=p;return u}}}function lh(o,u){if(o.forEach&&typeof o.forEach=="function")o.forEach(u,void 0);else if(c(o)||typeof o=="string")Array.prototype.forEach.call(o,u,void 0);else for(var d=Ym(o),p=Jm(o),R=p.length,D=0;D<R;D++)u.call(void 0,p[D],d&&d[D],o)}var ch=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Xm(o,u){if(o){o=o.split("&");for(var d=0;d<o.length;d++){var p=o[d].indexOf("="),R=null;if(0<=p){var D=o[d].substring(0,p);R=o[d].substring(p+1)}else D=o[d];u(D,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Wr(o){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,o instanceof Wr){this.h=o.h,Go(this,o.j),this.o=o.o,this.g=o.g,Ko(this,o.s),this.l=o.l;var u=o.i,d=new Os;d.i=u.i,u.g&&(d.g=new Map(u.g),d.h=u.h),uh(this,d),this.m=o.m}else o&&(u=String(o).match(ch))?(this.h=!1,Go(this,u[1]||"",!0),this.o=Vs(u[2]||""),this.g=Vs(u[3]||"",!0),Ko(this,u[4]),this.l=Vs(u[5]||"",!0),uh(this,u[6]||"",!0),this.m=Vs(u[7]||"")):(this.h=!1,this.i=new Os(null,this.h))}Wr.prototype.toString=function(){var o=[],u=this.j;u&&o.push(Ns(u,hh,!0),":");var d=this.g;return(d||u=="file")&&(o.push("//"),(u=this.o)&&o.push(Ns(u,hh,!0),"@"),o.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&o.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&o.push("/"),o.push(Ns(d,d.charAt(0)=="/"?t_:e_,!0))),(d=this.i.toString())&&o.push("?",d),(d=this.m)&&o.push("#",Ns(d,r_)),o.join("")};function Ln(o){return new Wr(o)}function Go(o,u,d){o.j=d?Vs(u,!0):u,o.j&&(o.j=o.j.replace(/:$/,""))}function Ko(o,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);o.s=u}else o.s=null}function uh(o,u,d){u instanceof Os?(o.i=u,i_(o.i,o.h)):(d||(u=Ns(u,n_)),o.i=new Os(u,o.h))}function xe(o,u,d){o.i.set(u,d)}function Qo(o){return xe(o,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),o}function Vs(o,u){return o?u?decodeURI(o.replace(/%25/g,"%2525")):decodeURIComponent(o):""}function Ns(o,u,d){return typeof o=="string"?(o=encodeURI(o).replace(u,Zm),d&&(o=o.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),o):null}function Zm(o){return o=o.charCodeAt(0),"%"+(o>>4&15).toString(16)+(o&15).toString(16)}var hh=/[#\/\?@]/g,e_=/[#\?:]/g,t_=/[#\?]/g,n_=/[#\?@]/g,r_=/#/g;function Os(o,u){this.h=this.g=null,this.i=o||null,this.j=!!u}function cr(o){o.g||(o.g=new Map,o.h=0,o.i&&Xm(o.i,function(u,d){o.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=Os.prototype,n.add=function(o,u){cr(this),this.i=null,o=Ci(this,o);var d=this.g.get(o);return d||this.g.set(o,d=[]),d.push(u),this.h+=1,this};function dh(o,u){cr(o),u=Ci(o,u),o.g.has(u)&&(o.i=null,o.h-=o.g.get(u).length,o.g.delete(u))}function fh(o,u){return cr(o),u=Ci(o,u),o.g.has(u)}n.forEach=function(o,u){cr(this),this.g.forEach(function(d,p){d.forEach(function(R){o.call(u,R,p,this)},this)},this)},n.na=function(){cr(this);const o=Array.from(this.g.values()),u=Array.from(this.g.keys()),d=[];for(let p=0;p<u.length;p++){const R=o[p];for(let D=0;D<R.length;D++)d.push(u[p])}return d},n.V=function(o){cr(this);let u=[];if(typeof o=="string")fh(this,o)&&(u=u.concat(this.g.get(Ci(this,o))));else{o=Array.from(this.g.values());for(let d=0;d<o.length;d++)u=u.concat(o[d])}return u},n.set=function(o,u){return cr(this),this.i=null,o=Ci(this,o),fh(this,o)&&(this.h-=this.g.get(o).length),this.g.set(o,[u]),this.h+=1,this},n.get=function(o,u){return o?(o=this.V(o),0<o.length?String(o[0]):u):u};function ph(o,u,d){dh(o,u),0<d.length&&(o.i=null,o.g.set(Ci(o,u),P(d)),o.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const o=[],u=Array.from(this.g.keys());for(var d=0;d<u.length;d++){var p=u[d];const D=encodeURIComponent(String(p)),j=this.V(p);for(p=0;p<j.length;p++){var R=D;j[p]!==""&&(R+="="+encodeURIComponent(String(j[p]))),o.push(R)}}return this.i=o.join("&")};function Ci(o,u){return u=String(u),o.j&&(u=u.toLowerCase()),u}function i_(o,u){u&&!o.j&&(cr(o),o.i=null,o.g.forEach(function(d,p){var R=p.toLowerCase();p!=R&&(dh(this,p),ph(this,R,d))},o)),o.j=u}function s_(o,u){const d=new xs;if(l.Image){const p=new Image;p.onload=I(ur,d,"TestLoadImage: loaded",!0,u,p),p.onerror=I(ur,d,"TestLoadImage: error",!1,u,p),p.onabort=I(ur,d,"TestLoadImage: abort",!1,u,p),p.ontimeout=I(ur,d,"TestLoadImage: timeout",!1,u,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=o}else u(!1)}function o_(o,u){const d=new xs,p=new AbortController,R=setTimeout(()=>{p.abort(),ur(d,"TestPingServer: timeout",!1,u)},1e4);fetch(o,{signal:p.signal}).then(D=>{clearTimeout(R),D.ok?ur(d,"TestPingServer: ok",!0,u):ur(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(R),ur(d,"TestPingServer: error",!1,u)})}function ur(o,u,d,p,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),p(d)}catch{}}function a_(){this.g=new Ce}function l_(o,u,d){const p=d||"";try{lh(o,function(R,D){let j=R;h(R)&&(j=Q(R)),u.push(p+D+"="+encodeURIComponent(j))})}catch(R){throw u.push(p+"type="+encodeURIComponent("_badmap")),R}}function Jo(o){this.l=o.Ub||null,this.j=o.eb||!1}k(Jo,Qe),Jo.prototype.g=function(){return new Yo(this.l,this.j)},Jo.prototype.i=function(o){return function(){return o}}({});function Yo(o,u){tt.call(this),this.D=o,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}k(Yo,tt),n=Yo.prototype,n.open=function(o,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=o,this.A=u,this.readyState=1,Ms(this)},n.send=function(o){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};o&&(u.body=o),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ls(this)),this.readyState=0},n.Sa=function(o){if(this.g&&(this.l=o,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=o.headers,this.readyState=2,Ms(this)),this.g&&(this.readyState=3,Ms(this),this.g)))if(this.responseType==="arraybuffer")o.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in o){if(this.j=o.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;gh(this)}else o.text().then(this.Ra.bind(this),this.ga.bind(this))};function gh(o){o.j.read().then(o.Pa.bind(o)).catch(o.ga.bind(o))}n.Pa=function(o){if(this.g){if(this.o&&o.value)this.response.push(o.value);else if(!this.o){var u=o.value?o.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!o.done}))&&(this.response=this.responseText+=u)}o.done?Ls(this):Ms(this),this.readyState==3&&gh(this)}},n.Ra=function(o){this.g&&(this.response=this.responseText=o,Ls(this))},n.Qa=function(o){this.g&&(this.response=o,Ls(this))},n.ga=function(){this.g&&Ls(this)};function Ls(o){o.readyState=4,o.l=null,o.j=null,o.v=null,Ms(o)}n.setRequestHeader=function(o,u){this.u.append(o,u)},n.getResponseHeader=function(o){return this.h&&this.h.get(o.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const o=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,o.push(d[0]+": "+d[1]),d=u.next();return o.join(`\r
`)};function Ms(o){o.onreadystatechange&&o.onreadystatechange.call(o)}Object.defineProperty(Yo.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(o){this.m=o?"include":"same-origin"}});function mh(o){let u="";return W(o,function(d,p){u+=p,u+=":",u+=d,u+=`\r
`}),u}function Fl(o,u,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=mh(d),typeof o=="string"?d!=null&&encodeURIComponent(String(d)):xe(o,u,d))}function qe(o){tt.call(this),this.headers=new Map,this.o=o||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}k(qe,tt);var c_=/^https?$/i,u_=["POST","PUT"];n=qe.prototype,n.Ha=function(o){this.J=o},n.ea=function(o,u,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+o);u=u?u.toUpperCase():"GET",this.D=o,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():xl.g(),this.v=this.o?ht(this.o):ht(xl),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(o),!0),this.B=!1}catch(D){_h(this,D);return}if(o=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var R in p)d.set(R,p[R]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const D of p.keys())d.set(D,p.get(D));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(D=>D.toLowerCase()=="content-type"),R=l.FormData&&o instanceof l.FormData,!(0<=Array.prototype.indexOf.call(u_,u,void 0))||p||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,j]of d)this.g.setRequestHeader(D,j);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{wh(this),this.u=!0,this.g.send(o),this.u=!1}catch(D){_h(this,D)}};function _h(o,u){o.h=!1,o.g&&(o.j=!0,o.g.abort(),o.j=!1),o.l=u,o.m=5,vh(o),Xo(o)}function vh(o){o.A||(o.A=!0,ut(o,"complete"),ut(o,"error"))}n.abort=function(o){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=o||7,ut(this,"complete"),ut(this,"abort"),Xo(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Xo(this,!0)),qe.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?yh(this):this.bb())},n.bb=function(){yh(this)};function yh(o){if(o.h&&typeof a<"u"&&(!o.v[1]||Mn(o)!=4||o.Z()!=2)){if(o.u&&Mn(o)==4)$o(o.Ea,0,o);else if(ut(o,"readystatechange"),Mn(o)==4){o.h=!1;try{const j=o.Z();e:switch(j){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var p;if(p=j===0){var R=String(o.D).match(ch)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),p=!c_.test(R?R.toLowerCase():"")}d=p}if(d)ut(o,"complete"),ut(o,"success");else{o.m=6;try{var D=2<Mn(o)?o.g.statusText:""}catch{D=""}o.l=D+" ["+o.Z()+"]",vh(o)}}finally{Xo(o)}}}}function Xo(o,u){if(o.g){wh(o);const d=o.g,p=o.v[0]?()=>{}:null;o.g=null,o.v=null,u||ut(o,"ready");try{d.onreadystatechange=p}catch{}}}function wh(o){o.I&&(l.clearTimeout(o.I),o.I=null)}n.isActive=function(){return!!this.g};function Mn(o){return o.g?o.g.readyState:0}n.Z=function(){try{return 2<Mn(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(o){if(this.g){var u=this.g.responseText;return o&&u.indexOf(o)==0&&(u=u.substring(o.length)),Ae(u)}};function Eh(o){try{if(!o.g)return null;if("response"in o.g)return o.g.response;switch(o.H){case"":case"text":return o.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in o.g)return o.g.mozResponseArrayBuffer}return null}catch{return null}}function h_(o){const u={};o=(o.g&&2<=Mn(o)&&o.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<o.length;p++){if(F(o[p]))continue;var d=T(o[p]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const D=u[R]||[];u[R]=D,D.push(d)}b(u,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Fs(o,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[o]||u}function bh(o){this.Aa=0,this.i=[],this.j=new xs,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Fs("failFast",!1,o),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Fs("baseRetryDelayMs",5e3,o),this.cb=Fs("retryDelaySeedMs",1e4,o),this.Wa=Fs("forwardChannelMaxRetries",2,o),this.wa=Fs("forwardChannelRequestTimeoutMs",2e4,o),this.pa=o&&o.xmlHttpFactory||void 0,this.Xa=o&&o.Tb||void 0,this.Ca=o&&o.useFetchStreams||!1,this.L=void 0,this.J=o&&o.supportsCrossDomainXhr||!1,this.K="",this.h=new rh(o&&o.concurrentRequestLimit),this.Da=new a_,this.P=o&&o.fastHandshake||!1,this.O=o&&o.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=o&&o.Rb||!1,o&&o.xa&&this.j.xa(),o&&o.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&o&&o.detectBufferingProxy||!1,this.ja=void 0,o&&o.longPollingTimeout&&0<o.longPollingTimeout&&(this.ja=o.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=bh.prototype,n.la=8,n.G=1,n.connect=function(o,u,d,p){kt(0),this.W=o,this.H=u||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=xh(this,null,this.W),ea(this)};function Ul(o){if(Th(o),o.G==3){var u=o.U++,d=Ln(o.I);if(xe(d,"SID",o.K),xe(d,"RID",u),xe(d,"TYPE","terminate"),Us(o,d),u=new lr(o,o.j,u),u.L=2,u.v=Qo(Ln(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=u.v,d=!0),d||(u.g=Dh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Wo(u)}Ch(o)}function Zo(o){o.g&&(Bl(o),o.g.cancel(),o.g=null)}function Th(o){Zo(o),o.u&&(l.clearTimeout(o.u),o.u=null),ta(o),o.h.cancel(),o.s&&(typeof o.s=="number"&&l.clearTimeout(o.s),o.s=null)}function ea(o){if(!ih(o.h)&&!o.s){o.s=!0;var u=o.Ga;re||je(),we||(re(),we=!0),Re.add(u,o),o.B=0}}function d_(o,u){return sh(o.h)>=o.h.j-(o.s?1:0)?!1:o.s?(o.i=u.D.concat(o.i),!0):o.G==1||o.G==2||o.B>=(o.Va?0:o.Wa)?!1:(o.s=Cs(m(o.Ga,o,u),Ph(o,o.B)),o.B++,!0)}n.Ga=function(o){if(this.s)if(this.s=null,this.G==1){if(!o){this.U=Math.floor(1e5*Math.random()),o=this.U++;const R=new lr(this,this.j,o);let D=this.o;if(this.S&&(D?(D=_(D),v(D,this.S)):D=this.S),this.m!==null||this.O||(R.H=D,D=null),this.P)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(u+=p,4096<u){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Ah(this,R,u),d=Ln(this.I),xe(d,"RID",o),xe(d,"CVER",22),this.D&&xe(d,"X-HTTP-Session-Id",this.D),Us(this,d),D&&(this.O?u="headers="+encodeURIComponent(String(mh(D)))+"&"+u:this.m&&Fl(d,this.m,D)),Ml(this.h,R),this.Ua&&xe(d,"TYPE","init"),this.P?(xe(d,"$req",u),xe(d,"SID","null"),R.T=!0,Vl(R,d,null)):Vl(R,d,u),this.G=2}}else this.G==3&&(o?Ih(this,o):this.i.length==0||ih(this.h)||Ih(this))};function Ih(o,u){var d;u?d=u.l:d=o.U++;const p=Ln(o.I);xe(p,"SID",o.K),xe(p,"RID",d),xe(p,"AID",o.T),Us(o,p),o.m&&o.o&&Fl(p,o.m,o.o),d=new lr(o,o.j,d,o.B+1),o.m===null&&(d.H=o.o),u&&(o.i=u.D.concat(o.i)),u=Ah(o,d,1e3),d.I=Math.round(.5*o.wa)+Math.round(.5*o.wa*Math.random()),Ml(o.h,d),Vl(d,p,u)}function Us(o,u){o.H&&W(o.H,function(d,p){xe(u,p,d)}),o.l&&lh({},function(d,p){xe(u,p,d)})}function Ah(o,u,d){d=Math.min(o.i.length,d);var p=o.l?m(o.l.Na,o.l,o):null;e:{var R=o.i;let D=-1;for(;;){const j=["count="+d];D==-1?0<d?(D=R[0].g,j.push("ofs="+D)):D=0:j.push("ofs="+D);let ke=!0;for(let dt=0;dt<d;dt++){let ye=R[dt].g;const wt=R[dt].map;if(ye-=D,0>ye)D=Math.max(0,R[dt].g-100),ke=!1;else try{l_(wt,j,"req"+ye+"_")}catch{p&&p(wt)}}if(ke){p=j.join("&");break e}}}return o=o.i.splice(0,d),u.D=o,p}function Sh(o){if(!o.g&&!o.u){o.Y=1;var u=o.Fa;re||je(),we||(re(),we=!0),Re.add(u,o),o.v=0}}function jl(o){return o.g||o.u||3<=o.v?!1:(o.Y++,o.u=Cs(m(o.Fa,o),Ph(o,o.v)),o.v++,!0)}n.Fa=function(){if(this.u=null,Rh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var o=2*this.R;this.j.info("BP detection timer enabled: "+o),this.A=Cs(m(this.ab,this),o)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,kt(10),Zo(this),Rh(this))};function Bl(o){o.A!=null&&(l.clearTimeout(o.A),o.A=null)}function Rh(o){o.g=new lr(o,o.j,"rpc",o.Y),o.m===null&&(o.g.H=o.o),o.g.O=0;var u=Ln(o.qa);xe(u,"RID","rpc"),xe(u,"SID",o.K),xe(u,"AID",o.T),xe(u,"CI",o.F?"0":"1"),!o.F&&o.ja&&xe(u,"TO",o.ja),xe(u,"TYPE","xmlhttp"),Us(o,u),o.m&&o.o&&Fl(u,o.m,o.o),o.L&&(o.g.I=o.L);var d=o.g;o=o.ia,d.L=1,d.v=Qo(Ln(u)),d.m=null,d.P=!0,eh(d,o)}n.Za=function(){this.C!=null&&(this.C=null,Zo(this),jl(this),kt(19))};function ta(o){o.C!=null&&(l.clearTimeout(o.C),o.C=null)}function kh(o,u){var d=null;if(o.g==u){ta(o),Bl(o),o.g=null;var p=2}else if(Ll(o.h,u))d=u.D,oh(o.h,u),p=1;else return;if(o.G!=0){if(u.o)if(p==1){d=u.m?u.m.length:0,u=Date.now()-u.F;var R=o.B;p=ki(),ut(p,new Ju(p,d)),ea(o)}else Sh(o);else if(R=u.s,R==3||R==0&&0<u.X||!(p==1&&d_(o,u)||p==2&&jl(o)))switch(d&&0<d.length&&(u=o.h,u.i=u.i.concat(d)),R){case 1:Gr(o,5);break;case 4:Gr(o,10);break;case 3:Gr(o,6);break;default:Gr(o,2)}}}function Ph(o,u){let d=o.Ta+Math.floor(Math.random()*o.cb);return o.isActive()||(d*=2),d*u}function Gr(o,u){if(o.j.info("Error code "+u),u==2){var d=m(o.fb,o),p=o.Xa;const R=!p;p=new Wr(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Go(p,"https"),Qo(p),R?s_(p.toString(),d):o_(p.toString(),d)}else kt(2);o.G=0,o.l&&o.l.sa(u),Ch(o),Th(o)}n.fb=function(o){o?(this.j.info("Successfully pinged google.com"),kt(2)):(this.j.info("Failed to ping google.com"),kt(1))};function Ch(o){if(o.G=0,o.ka=[],o.l){const u=ah(o.h);(u.length!=0||o.i.length!=0)&&(A(o.ka,u),A(o.ka,o.i),o.h.i.length=0,P(o.i),o.i.length=0),o.l.ra()}}function xh(o,u,d){var p=d instanceof Wr?Ln(d):new Wr(d);if(p.g!="")u&&(p.g=u+"."+p.g),Ko(p,p.s);else{var R=l.location;p=R.protocol,u=u?u+"."+R.hostname:R.hostname,R=+R.port;var D=new Wr(null);p&&Go(D,p),u&&(D.g=u),R&&Ko(D,R),d&&(D.l=d),p=D}return d=o.D,u=o.ya,d&&u&&xe(p,d,u),xe(p,"VER",o.la),Us(o,p),p}function Dh(o,u,d){if(u&&!o.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=o.Ca&&!o.pa?new qe(new Jo({eb:d})):new qe(o.pa),u.Ha(o.J),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Vh(){}n=Vh.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function na(){}na.prototype.g=function(o,u){return new jt(o,u)};function jt(o,u){tt.call(this),this.g=new bh(u),this.l=o,this.h=u&&u.messageUrlParams||null,o=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(o?o["X-Client-Protocol"]="webchannel":o={"X-Client-Protocol":"webchannel"}),this.g.o=o,o=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(o?o["X-WebChannel-Content-Type"]=u.messageContentType:o={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(o?o["X-WebChannel-Client-Profile"]=u.va:o={"X-WebChannel-Client-Profile":u.va}),this.g.S=o,(o=u&&u.Sb)&&!F(o)&&(this.g.m=o),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!F(u)&&(this.g.D=u,o=this.h,o!==null&&u in o&&(o=this.h,u in o&&delete o[u])),this.j=new xi(this)}k(jt,tt),jt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},jt.prototype.close=function(){Ul(this.g)},jt.prototype.o=function(o){var u=this.g;if(typeof o=="string"){var d={};d.__data__=o,o=d}else this.u&&(d={},d.__data__=Q(o),o=d);u.i.push(new Qm(u.Ya++,o)),u.G==3&&ea(u)},jt.prototype.N=function(){this.g.l=null,delete this.j,Ul(this.g),delete this.g,jt.aa.N.call(this)};function Nh(o){Ut.call(this),o.__headers__&&(this.headers=o.__headers__,this.statusCode=o.__status__,delete o.__headers__,delete o.__status__);var u=o.__sm__;if(u){e:{for(const d in u){o=d;break e}o=void 0}(this.i=o)&&(o=this.i,u=u!==null&&o in u?u[o]:void 0),this.data=u}else this.data=o}k(Nh,Ut);function Oh(){zr.call(this),this.status=1}k(Oh,zr);function xi(o){this.g=o}k(xi,Vh),xi.prototype.ua=function(){ut(this.g,"a")},xi.prototype.ta=function(o){ut(this.g,new Nh(o))},xi.prototype.sa=function(o){ut(this.g,new Oh)},xi.prototype.ra=function(){ut(this.g,"b")},na.prototype.createWebChannel=na.prototype.g,jt.prototype.send=jt.prototype.o,jt.prototype.open=jt.prototype.m,jt.prototype.close=jt.prototype.close,Mp=function(){return new na},Lp=function(){return ki()},Op=Vt,Tc={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},zo.NO_ERROR=0,zo.TIMEOUT=8,zo.HTTP_ERROR=6,va=zo,Yu.COMPLETE="complete",Np=Yu,Dt.EventType=nt,nt.OPEN="a",nt.CLOSE="b",nt.ERROR="c",nt.MESSAGE="d",tt.prototype.listen=tt.prototype.K,Gs=Dt,qe.prototype.listenOnce=qe.prototype.L,qe.prototype.getLastError=qe.prototype.Ka,qe.prototype.getLastErrorCode=qe.prototype.Ba,qe.prototype.getStatus=qe.prototype.Z,qe.prototype.getResponseJson=qe.prototype.Oa,qe.prototype.getResponseText=qe.prototype.oa,qe.prototype.send=qe.prototype.ea,qe.prototype.setWithCredentials=qe.prototype.Ha,Vp=qe}).apply(typeof la<"u"?la:typeof self<"u"?self:typeof window<"u"?window:{});const cd="@firebase/firestore",ud="4.8.0";/**
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
 */let ys="11.10.0";/**
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
 */const gi=new ru("@firebase/firestore");function Oi(){return gi.logLevel}function q(n,...e){if(gi.logLevel<=ue.DEBUG){const t=e.map(ou);gi.debug(`Firestore (${ys}): ${n}`,...t)}}function Xn(n,...e){if(gi.logLevel<=ue.ERROR){const t=e.map(ou);gi.error(`Firestore (${ys}): ${n}`,...t)}}function Dr(n,...e){if(gi.logLevel<=ue.WARN){const t=e.map(ou);gi.warn(`Firestore (${ys}): ${n}`,...t)}}function ou(n){if(typeof n=="string")return n;try{/**
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
 */function Y(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Fp(n,r,t)}function Fp(n,e,t){let r=`FIRESTORE (${ys}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Xn(r),new Error(r)}function Te(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||Fp(e,i,r)}function ne(n,e){return n}/**
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
 */const L={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class z extends sr{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class Qn{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Up{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class V0{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(It.UNAUTHENTICATED))}shutdown(){}}class N0{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class O0{constructor(e){this.t=e,this.currentUser=It.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Te(this.o===void 0,42304);let r=this.i;const i=c=>this.i!==r?(r=this.i,t(c)):Promise.resolve();let s=new Qn;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new Qn,e.enqueueRetryable(()=>i(this.currentUser))};const a=()=>{const c=s;e.enqueueRetryable(async()=>{await c.promise,await i(this.currentUser)})},l=c=>{q("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(q("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new Qn)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(q("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Te(typeof r.accessToken=="string",31837,{l:r}),new Up(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Te(e===null||typeof e=="string",2055,{h:e}),new It(e)}}class L0{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=It.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class M0{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new L0(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(It.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class hd{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class F0{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,an(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){Te(this.o===void 0,3512);const r=s=>{s.error!=null&&q("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const a=s.token!==this.m;return this.m=s.token,q("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{q("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):q("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new hd(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Te(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new hd(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */class au{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=U0(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}}function ae(n,e){return n<e?-1:n>e?1:0}function Ic(n,e){let t=0;for(;t<n.length&&t<e.length;){const r=n.codePointAt(t),i=e.codePointAt(t);if(r!==i){if(r<128&&i<128)return ae(r,i);{const s=jp(),a=j0(s.encode(dd(n,t)),s.encode(dd(e,t)));return a!==0?a:ae(r,i)}}t+=r>65535?2:1}return ae(n.length,e.length)}function dd(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function j0(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return ae(n[t],e[t]);return ae(n.length,e.length)}function is(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}/**
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
 */const fd="__name__";class mn{constructor(e,t,r){t===void 0?t=0:t>e.length&&Y(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&Y(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return mn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof mn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let i=0;i<r;i++){const s=mn.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return ae(e.length,t.length)}static compareSegments(e,t){const r=mn.isNumericId(e),i=mn.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?mn.extractNumericId(e).compare(mn.extractNumericId(t)):Ic(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return kr.fromString(e.substring(4,e.length-2))}}class De extends mn{construct(e,t,r){return new De(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new z(L.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new De(t)}static emptyPath(){return new De([])}}const B0=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class pt extends mn{construct(e,t,r){return new pt(e,t,r)}static isValidIdentifier(e){return B0.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),pt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===fd}static keyField(){return new pt([fd])}static fromServerFormat(e){const t=[];let r="",i=0;const s=()=>{if(r.length===0)throw new z(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new z(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new z(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else l==="`"?(a=!a,i++):l!=="."||a?(r+=l,i++):(s(),i++)}if(s(),a)throw new z(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new pt(t)}static emptyPath(){return new pt([])}}/**
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
 */function Bp(n,e,t){if(!t)throw new z(L.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function $0(n,e,t,r){if(e===!0&&r===!0)throw new z(L.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function pd(n){if(!G.isDocumentKey(n))throw new z(L.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function gd(n){if(G.isDocumentKey(n))throw new z(L.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function $p(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function lu(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":Y(12329,{type:typeof n})}function bn(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new z(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=lu(n);throw new z(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function Xe(n,e){const t={typeString:n};return e&&(t.value=e),t}function Po(n,e){if(!$p(n))throw new z(L.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new z(L.INVALID_ARGUMENT,t);return!0}/**
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
 */const md=-62135596800,_d=1e6;class Ve{static now(){return Ve.fromMillis(Date.now())}static fromDate(e){return Ve.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*_d);return new Ve(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new z(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new z(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<md)throw new z(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new z(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/_d}_compareTo(e){return this.seconds===e.seconds?ae(this.nanoseconds,e.nanoseconds):ae(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Ve._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Po(e,Ve._jsonSchema))return new Ve(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-md;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Ve._jsonSchemaVersion="firestore/timestamp/1.0",Ve._jsonSchema={type:Xe("string",Ve._jsonSchemaVersion),seconds:Xe("number"),nanoseconds:Xe("number")};/**
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
 */const uo=-1;function q0(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,i=te.fromTimestamp(r===1e9?new Ve(t+1,0):new Ve(t,r));return new Vr(i,G.empty(),e)}function z0(n){return new Vr(n.readTime,n.key,uo)}class Vr{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new Vr(te.min(),G.empty(),uo)}static max(){return new Vr(te.max(),G.empty(),uo)}}function H0(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=G.comparator(n.documentKey,e.documentKey),t!==0?t:ae(n.largestBatchId,e.largestBatchId))}/**
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
 */async function ws(n){if(n.code!==L.FAILED_PRECONDITION||n.message!==W0)throw n;q("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class O{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&Y(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new O((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(t,s).next(r,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof O?t:O.resolve(t)}catch(t){return O.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):O.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):O.reject(t)}static resolve(e){return new O((t,r)=>{t(e)})}static reject(e){return new O((t,r)=>{r(e)})}static waitFor(e){return new O((t,r)=>{let i=0,s=0,a=!1;e.forEach(l=>{++i,l.next(()=>{++s,a&&s===i&&t()},c=>r(c))}),a=!0,s===i&&t()})}static or(e){let t=O.resolve(!1);for(const r of e)t=t.next(i=>i?O.resolve(i):r());return t}static forEach(e,t){const r=[];return e.forEach((i,s)=>{r.push(t.call(this,i,s))}),this.waitFor(r)}static mapArray(e,t){return new O((r,i)=>{const s=e.length,a=new Array(s);let l=0;for(let c=0;c<s;c++){const h=c;t(e[h]).next(f=>{a[h]=f,++l,l===s&&r(a)},f=>i(f))}})}static doWhile(e,t){return new O((r,i)=>{const s=()=>{e()===!0?t().next(()=>{s()},i):r()};s()})}}function K0(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Es(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class ul{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this._e(r),this.ae=r=>t.writeSequenceNumber(r))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}ul.ue=-1;/**
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
 */const cu=-1;function hl(n){return n==null}function Oa(n){return n===0&&1/n==-1/0}function Q0(n){return typeof n=="number"&&Number.isInteger(n)&&!Oa(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function yd(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Ei(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function zp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Ue{constructor(e,t){this.comparator=e,this.root=t||ft.EMPTY}insert(e,t){return new Ue(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,ft.BLACK,null,null))}remove(e){return new Ue(this.comparator,this.root.remove(e,this.comparator).copy(null,null,ft.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ca(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ca(this.root,e,this.comparator,!1)}getReverseIterator(){return new ca(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ca(this.root,e,this.comparator,!0)}}class ca{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class ft{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??ft.RED,this.left=i??ft.EMPTY,this.right=s??ft.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new ft(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ft.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return ft.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,ft.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,ft.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw Y(43730,{key:this.key,value:this.value});if(this.right.isRed())throw Y(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw Y(27949);return e+(this.isRed()?0:1)}}ft.EMPTY=null,ft.RED=!0,ft.BLACK=!1;ft.EMPTY=new class{constructor(){this.size=0}get key(){throw Y(57766)}get value(){throw Y(16141)}get color(){throw Y(16727)}get left(){throw Y(29726)}get right(){throw Y(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new ft(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class st{constructor(e){this.comparator=e,this.data=new Ue(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new wd(this.data.getIterator())}getIteratorFrom(e){return new wd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof st)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new st(this.comparator);return t.data=e,t}}class wd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class ln{constructor(e){this.fields=e,e.sort(pt.comparator)}static empty(){return new ln([])}unionWith(e){let t=new st(pt.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new ln(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return is(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
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
 */class yt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new Hp("Invalid base64 string: "+s):s}}(e);return new yt(t)}static fromUint8Array(e){const t=function(i){let s="";for(let a=0;a<i.length;++a)s+=String.fromCharCode(i[a]);return s}(e);return new yt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ae(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}yt.EMPTY_BYTE_STRING=new yt("");const X0=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Nr(n){if(Te(!!n,39018),typeof n=="string"){let e=0;const t=X0.exec(n);if(Te(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Ke(n.seconds),nanos:Ke(n.nanos)}}function Ke(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Or(n){return typeof n=="string"?yt.fromBase64String(n):yt.fromUint8Array(n)}/**
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
 */const Wp="server_timestamp",Gp="__type__",Kp="__previous_value__",Qp="__local_write_time__";function uu(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Gp])===null||t===void 0?void 0:t.stringValue)===Wp}function dl(n){const e=n.mapValue.fields[Kp];return uu(e)?dl(e):e}function ho(n){const e=Nr(n.mapValue.fields[Qp].timestampValue);return new Ve(e.seconds,e.nanos)}/**
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
 */class Z0{constructor(e,t,r,i,s,a,l,c,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h,this.isUsingEmulator=f}}const La="(default)";class fo{constructor(e,t){this.projectId=e,this.database=t||La}static empty(){return new fo("","")}get isDefaultDatabase(){return this.database===La}isEqual(e){return e instanceof fo&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Jp="__type__",ew="__max__",ua={mapValue:{}},Yp="__vector__",Ma="value";function Lr(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?uu(n)?4:nw(n)?9007199254740991:tw(n)?10:11:Y(28295,{value:n})}function Cn(n,e){if(n===e)return!0;const t=Lr(n);if(t!==Lr(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ho(n).isEqual(ho(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const a=Nr(i.timestampValue),l=Nr(s.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,s){return Or(i.bytesValue).isEqual(Or(s.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,s){return Ke(i.geoPointValue.latitude)===Ke(s.geoPointValue.latitude)&&Ke(i.geoPointValue.longitude)===Ke(s.geoPointValue.longitude)}(n,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Ke(i.integerValue)===Ke(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const a=Ke(i.doubleValue),l=Ke(s.doubleValue);return a===l?Oa(a)===Oa(l):isNaN(a)&&isNaN(l)}return!1}(n,e);case 9:return is(n.arrayValue.values||[],e.arrayValue.values||[],Cn);case 10:case 11:return function(i,s){const a=i.mapValue.fields||{},l=s.mapValue.fields||{};if(yd(a)!==yd(l))return!1;for(const c in a)if(a.hasOwnProperty(c)&&(l[c]===void 0||!Cn(a[c],l[c])))return!1;return!0}(n,e);default:return Y(52216,{left:n})}}function po(n,e){return(n.values||[]).find(t=>Cn(t,e))!==void 0}function ss(n,e){if(n===e)return 0;const t=Lr(n),r=Lr(e);if(t!==r)return ae(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return ae(n.booleanValue,e.booleanValue);case 2:return function(s,a){const l=Ke(s.integerValue||s.doubleValue),c=Ke(a.integerValue||a.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(n,e);case 3:return Ed(n.timestampValue,e.timestampValue);case 4:return Ed(ho(n),ho(e));case 5:return Ic(n.stringValue,e.stringValue);case 6:return function(s,a){const l=Or(s),c=Or(a);return l.compareTo(c)}(n.bytesValue,e.bytesValue);case 7:return function(s,a){const l=s.split("/"),c=a.split("/");for(let h=0;h<l.length&&h<c.length;h++){const f=ae(l[h],c[h]);if(f!==0)return f}return ae(l.length,c.length)}(n.referenceValue,e.referenceValue);case 8:return function(s,a){const l=ae(Ke(s.latitude),Ke(a.latitude));return l!==0?l:ae(Ke(s.longitude),Ke(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return bd(n.arrayValue,e.arrayValue);case 10:return function(s,a){var l,c,h,f;const g=s.fields||{},m=a.fields||{},I=(l=g[Ma])===null||l===void 0?void 0:l.arrayValue,k=(c=m[Ma])===null||c===void 0?void 0:c.arrayValue,P=ae(((h=I==null?void 0:I.values)===null||h===void 0?void 0:h.length)||0,((f=k==null?void 0:k.values)===null||f===void 0?void 0:f.length)||0);return P!==0?P:bd(I,k)}(n.mapValue,e.mapValue);case 11:return function(s,a){if(s===ua.mapValue&&a===ua.mapValue)return 0;if(s===ua.mapValue)return 1;if(a===ua.mapValue)return-1;const l=s.fields||{},c=Object.keys(l),h=a.fields||{},f=Object.keys(h);c.sort(),f.sort();for(let g=0;g<c.length&&g<f.length;++g){const m=Ic(c[g],f[g]);if(m!==0)return m;const I=ss(l[c[g]],h[f[g]]);if(I!==0)return I}return ae(c.length,f.length)}(n.mapValue,e.mapValue);default:throw Y(23264,{le:t})}}function Ed(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ae(n,e);const t=Nr(n),r=Nr(e),i=ae(t.seconds,r.seconds);return i!==0?i:ae(t.nanos,r.nanos)}function bd(n,e){const t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){const s=ss(t[i],r[i]);if(s)return s}return ae(t.length,r.length)}function os(n){return Ac(n)}function Ac(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Nr(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Or(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return G.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",i=!0;for(const s of t.values||[])i?i=!1:r+=",",r+=Ac(s);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let i="{",s=!0;for(const a of r)s?s=!1:i+=",",i+=`${a}:${Ac(t.fields[a])}`;return i+"}"}(n.mapValue):Y(61005,{value:n})}function ya(n){switch(Lr(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=dl(n);return e?16+ya(e):16;case 5:return 2*n.stringValue.length;case 6:return Or(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+ya(s),0)}(n.arrayValue);case 10:case 11:return function(r){let i=0;return Ei(r.fields,(s,a)=>{i+=s.length+ya(a)}),i}(n.mapValue);default:throw Y(13486,{value:n})}}function Sc(n){return!!n&&"integerValue"in n}function hu(n){return!!n&&"arrayValue"in n}function Td(n){return!!n&&"nullValue"in n}function Id(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function wa(n){return!!n&&"mapValue"in n}function tw(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{})[Jp])===null||t===void 0?void 0:t.stringValue)===Yp}function eo(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Ei(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=eo(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=eo(n.arrayValue.values[t]);return e}return Object.assign({},n)}function nw(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===ew}/**
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
 */class Yt{constructor(e){this.value=e}static empty(){return new Yt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!wa(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=eo(t)}setAll(e){let t=pt.emptyPath(),r={},i=[];e.forEach((a,l)=>{if(!t.isImmediateParentOf(l)){const c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=l.popLast()}a?r[l.lastSegment()]=eo(a):i.push(l.lastSegment())});const s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){const t=this.field(e.popLast());wa(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Cn(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];wa(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){Ei(t,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new Yt(eo(this.value))}}function Xp(n){const e=[];return Ei(n.fields,(t,r)=>{const i=new pt([t]);if(wa(r)){const s=Xp(r.mapValue).fields;if(s.length===0)e.push(i);else for(const a of s)e.push(i.child(a))}else e.push(i)}),new ln(e)}/**
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
 */class Fa{constructor(e,t){this.position=e,this.inclusive=t}}function Ad(n,e,t){let r=0;for(let i=0;i<n.position.length;i++){const s=e[i],a=n.position[i];if(s.field.isKeyField()?r=G.comparator(G.fromName(a.referenceValue),t.key):r=ss(a,t.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function Sd(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Cn(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class Ua{constructor(e,t="asc"){this.field=e,this.dir=t}}function rw(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class Zp{}class it extends Zp{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new sw(e,t,r):t==="array-contains"?new lw(e,r):t==="in"?new cw(e,r):t==="not-in"?new uw(e,r):t==="array-contains-any"?new hw(e,r):new it(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new ow(e,r):new aw(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(ss(t,this.value)):t!==null&&Lr(this.value)===Lr(t)&&this.matchesComparison(ss(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return Y(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class xn extends Zp{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new xn(e,t)}matches(e){return eg(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function eg(n){return n.op==="and"}function tg(n){return iw(n)&&eg(n)}function iw(n){for(const e of n.filters)if(e instanceof xn)return!1;return!0}function Rc(n){if(n instanceof it)return n.field.canonicalString()+n.op.toString()+os(n.value);if(tg(n))return n.filters.map(e=>Rc(e)).join(",");{const e=n.filters.map(t=>Rc(t)).join(",");return`${n.op}(${e})`}}function ng(n,e){return n instanceof it?function(r,i){return i instanceof it&&r.op===i.op&&r.field.isEqual(i.field)&&Cn(r.value,i.value)}(n,e):n instanceof xn?function(r,i){return i instanceof xn&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,a,l)=>s&&ng(a,i.filters[l]),!0):!1}(n,e):void Y(19439)}function rg(n){return n instanceof it?function(t){return`${t.field.canonicalString()} ${t.op} ${os(t.value)}`}(n):n instanceof xn?function(t){return t.op.toString()+" {"+t.getFilters().map(rg).join(" ,")+"}"}(n):"Filter"}class sw extends it{constructor(e,t,r){super(e,t,r),this.key=G.fromName(r.referenceValue)}matches(e){const t=G.comparator(e.key,this.key);return this.matchesComparison(t)}}class ow extends it{constructor(e,t){super(e,"in",t),this.keys=ig("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class aw extends it{constructor(e,t){super(e,"not-in",t),this.keys=ig("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function ig(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>G.fromName(r.referenceValue))}class lw extends it{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return hu(t)&&po(t.arrayValue,this.value)}}class cw extends it{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&po(this.value.arrayValue,t)}}class uw extends it{constructor(e,t){super(e,"not-in",t)}matches(e){if(po(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!po(this.value.arrayValue,t)}}class hw extends it{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!hu(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>po(this.value.arrayValue,r))}}/**
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
 */class dw{constructor(e,t=null,r=[],i=[],s=null,a=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=a,this.endAt=l,this.Pe=null}}function Rd(n,e=null,t=[],r=[],i=null,s=null,a=null){return new dw(n,e,t,r,i,s,a)}function du(n){const e=ne(n);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Rc(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),hl(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>os(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>os(r)).join(",")),e.Pe=t}return e.Pe}function fu(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!rw(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!ng(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Sd(n.startAt,e.startAt)&&Sd(n.endAt,e.endAt)}function kc(n){return G.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class fl{constructor(e,t=null,r=[],i=[],s=null,a="F",l=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=a,this.startAt=l,this.endAt=c,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function fw(n,e,t,r,i,s,a,l){return new fl(n,e,t,r,i,s,a,l)}function pl(n){return new fl(n)}function kd(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function pw(n){return n.collectionGroup!==null}function to(n){const e=ne(n);if(e.Te===null){e.Te=[];const t=new Set;for(const s of e.explicitOrderBy)e.Te.push(s),t.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new st(pt.comparator);return a.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.Te.push(new Ua(s,r))}),t.has(pt.keyField().canonicalString())||e.Te.push(new Ua(pt.keyField(),r))}return e.Te}function Tn(n){const e=ne(n);return e.Ie||(e.Ie=gw(e,to(n))),e.Ie}function gw(n,e){if(n.limitType==="F")return Rd(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new Ua(i.field,s)});const t=n.endAt?new Fa(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Fa(n.startAt.position,n.startAt.inclusive):null;return Rd(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Pc(n,e,t){return new fl(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function gl(n,e){return fu(Tn(n),Tn(e))&&n.limitType===e.limitType}function sg(n){return`${du(Tn(n))}|lt:${n.limitType}`}function Li(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(i=>rg(i)).join(", ")}]`),hl(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(i=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(i)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(i=>os(i)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(i=>os(i)).join(",")),`Target(${r})`}(Tn(n))}; limitType=${n.limitType})`}function ml(n,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):G.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(n,e)&&function(r,i){for(const s of to(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(n,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(n,e)&&function(r,i){return!(r.startAt&&!function(a,l,c){const h=Ad(a,l,c);return a.inclusive?h<=0:h<0}(r.startAt,to(r),i)||r.endAt&&!function(a,l,c){const h=Ad(a,l,c);return a.inclusive?h>=0:h>0}(r.endAt,to(r),i))}(n,e)}function mw(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function og(n){return(e,t)=>{let r=!1;for(const i of to(n)){const s=_w(i,e,t);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function _w(n,e,t){const r=n.field.isKeyField()?G.comparator(e.key,t.key):function(s,a,l){const c=a.data.field(s),h=l.data.field(s);return c!==null&&h!==null?ss(c,h):Y(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return Y(19790,{direction:n.dir})}}/**
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
 */class bi{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[t]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Ei(this.inner,(t,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return zp(this.inner)}size(){return this.innerSize}}/**
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
 */const vw=new Ue(G.comparator);function Zn(){return vw}const ag=new Ue(G.comparator);function Ks(...n){let e=ag;for(const t of n)e=e.insert(t.key,t);return e}function lg(n){let e=ag;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Jr(){return no()}function cg(){return no()}function no(){return new bi(n=>n.toString(),(n,e)=>n.isEqual(e))}const yw=new Ue(G.comparator),ww=new st(G.comparator);function de(...n){let e=ww;for(const t of n)e=e.add(t);return e}const Ew=new st(ae);function bw(){return Ew}/**
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
 */function pu(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Oa(e)?"-0":e}}function ug(n){return{integerValue:""+n}}function Tw(n,e){return Q0(e)?ug(e):pu(n,e)}/**
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
 */class _l{constructor(){this._=void 0}}function Iw(n,e,t){return n instanceof ja?function(i,s){const a={fields:{[Gp]:{stringValue:Wp},[Qp]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&uu(s)&&(s=dl(s)),s&&(a.fields[Kp]=s),{mapValue:a}}(t,e):n instanceof go?dg(n,e):n instanceof mo?fg(n,e):function(i,s){const a=hg(i,s),l=Pd(a)+Pd(i.Ee);return Sc(a)&&Sc(i.Ee)?ug(l):pu(i.serializer,l)}(n,e)}function Aw(n,e,t){return n instanceof go?dg(n,e):n instanceof mo?fg(n,e):t}function hg(n,e){return n instanceof Ba?function(r){return Sc(r)||function(s){return!!s&&"doubleValue"in s}(r)}(e)?e:{integerValue:0}:null}class ja extends _l{}class go extends _l{constructor(e){super(),this.elements=e}}function dg(n,e){const t=pg(e);for(const r of n.elements)t.some(i=>Cn(i,r))||t.push(r);return{arrayValue:{values:t}}}class mo extends _l{constructor(e){super(),this.elements=e}}function fg(n,e){let t=pg(e);for(const r of n.elements)t=t.filter(i=>!Cn(i,r));return{arrayValue:{values:t}}}class Ba extends _l{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function Pd(n){return Ke(n.integerValue||n.doubleValue)}function pg(n){return hu(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Sw(n,e){return n.field.isEqual(e.field)&&function(r,i){return r instanceof go&&i instanceof go||r instanceof mo&&i instanceof mo?is(r.elements,i.elements,Cn):r instanceof Ba&&i instanceof Ba?Cn(r.Ee,i.Ee):r instanceof ja&&i instanceof ja}(n.transform,e.transform)}class Rw{constructor(e,t){this.version=e,this.transformResults=t}}class Jn{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Jn}static exists(e){return new Jn(void 0,e)}static updateTime(e){return new Jn(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ea(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class vl{}function gg(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new _g(n.key,Jn.none()):new Co(n.key,n.data,Jn.none());{const t=n.data,r=Yt.empty();let i=new st(pt.comparator);for(let s of e.fields)if(!i.has(s)){let a=t.field(s);a===null&&s.length>1&&(s=s.popLast(),a=t.field(s)),a===null?r.delete(s):r.set(s,a),i=i.add(s)}return new Ti(n.key,r,new ln(i.toArray()),Jn.none())}}function kw(n,e,t){n instanceof Co?function(i,s,a){const l=i.value.clone(),c=xd(i.fieldTransforms,s,a.transformResults);l.setAll(c),s.convertToFoundDocument(a.version,l).setHasCommittedMutations()}(n,e,t):n instanceof Ti?function(i,s,a){if(!Ea(i.precondition,s))return void s.convertToUnknownDocument(a.version);const l=xd(i.fieldTransforms,s,a.transformResults),c=s.data;c.setAll(mg(i)),c.setAll(l),s.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):function(i,s,a){s.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function ro(n,e,t,r){return n instanceof Co?function(s,a,l,c){if(!Ea(s.precondition,a))return l;const h=s.value.clone(),f=Dd(s.fieldTransforms,c,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ti?function(s,a,l,c){if(!Ea(s.precondition,a))return l;const h=Dd(s.fieldTransforms,c,a),f=a.data;return f.setAll(mg(s)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(s,a,l){return Ea(s.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l}(n,e,t)}function Pw(n,e){let t=null;for(const r of n.fieldTransforms){const i=e.data.field(r.field),s=hg(r.transform,i||null);s!=null&&(t===null&&(t=Yt.empty()),t.set(r.field,s))}return t||null}function Cd(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&is(r,i,(s,a)=>Sw(s,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Co extends vl{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Ti extends vl{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function mg(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function xd(n,e,t){const r=new Map;Te(n.length===t.length,32656,{Ae:t.length,Re:n.length});for(let i=0;i<t.length;i++){const s=n[i],a=s.transform,l=e.data.field(s.field);r.set(s.field,Aw(a,l,t[i]))}return r}function Dd(n,e,t){const r=new Map;for(const i of n){const s=i.transform,a=t.data.field(i.field);r.set(i.field,Iw(s,a,e))}return r}class _g extends vl{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Cw extends vl{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class xw{constructor(e,t,r,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&kw(s,e,r[i])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=ro(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=ro(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=cg();return this.mutations.forEach(i=>{const s=e.get(i.key),a=s.overlayedDocument;let l=this.applyToLocalView(a,s.mutatedFields);l=t.has(i.key)?null:l;const c=gg(a,l);c!==null&&r.set(i.key,c),a.isValidDocument()||a.convertToNoDocument(te.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),de())}isEqual(e){return this.batchId===e.batchId&&is(this.mutations,e.mutations,(t,r)=>Cd(t,r))&&is(this.baseMutations,e.baseMutations,(t,r)=>Cd(t,r))}}class gu{constructor(e,t,r,i){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=i}static from(e,t,r){Te(e.mutations.length===r.length,58842,{Ve:e.mutations.length,me:r.length});let i=function(){return yw}();const s=e.mutations;for(let a=0;a<s.length;a++)i=i.insert(s[a].key,r[a].version);return new gu(e,t,r,i)}}/**
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
 */var Je,ge;function Nw(n){switch(n){case L.OK:return Y(64938);case L.CANCELLED:case L.UNKNOWN:case L.DEADLINE_EXCEEDED:case L.RESOURCE_EXHAUSTED:case L.INTERNAL:case L.UNAVAILABLE:case L.UNAUTHENTICATED:return!1;case L.INVALID_ARGUMENT:case L.NOT_FOUND:case L.ALREADY_EXISTS:case L.PERMISSION_DENIED:case L.FAILED_PRECONDITION:case L.ABORTED:case L.OUT_OF_RANGE:case L.UNIMPLEMENTED:case L.DATA_LOSS:return!0;default:return Y(15467,{code:n})}}function vg(n){if(n===void 0)return Xn("GRPC error has no .code"),L.UNKNOWN;switch(n){case Je.OK:return L.OK;case Je.CANCELLED:return L.CANCELLED;case Je.UNKNOWN:return L.UNKNOWN;case Je.DEADLINE_EXCEEDED:return L.DEADLINE_EXCEEDED;case Je.RESOURCE_EXHAUSTED:return L.RESOURCE_EXHAUSTED;case Je.INTERNAL:return L.INTERNAL;case Je.UNAVAILABLE:return L.UNAVAILABLE;case Je.UNAUTHENTICATED:return L.UNAUTHENTICATED;case Je.INVALID_ARGUMENT:return L.INVALID_ARGUMENT;case Je.NOT_FOUND:return L.NOT_FOUND;case Je.ALREADY_EXISTS:return L.ALREADY_EXISTS;case Je.PERMISSION_DENIED:return L.PERMISSION_DENIED;case Je.FAILED_PRECONDITION:return L.FAILED_PRECONDITION;case Je.ABORTED:return L.ABORTED;case Je.OUT_OF_RANGE:return L.OUT_OF_RANGE;case Je.UNIMPLEMENTED:return L.UNIMPLEMENTED;case Je.DATA_LOSS:return L.DATA_LOSS;default:return Y(39323,{code:n})}}(ge=Je||(Je={}))[ge.OK=0]="OK",ge[ge.CANCELLED=1]="CANCELLED",ge[ge.UNKNOWN=2]="UNKNOWN",ge[ge.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ge[ge.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ge[ge.NOT_FOUND=5]="NOT_FOUND",ge[ge.ALREADY_EXISTS=6]="ALREADY_EXISTS",ge[ge.PERMISSION_DENIED=7]="PERMISSION_DENIED",ge[ge.UNAUTHENTICATED=16]="UNAUTHENTICATED",ge[ge.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ge[ge.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ge[ge.ABORTED=10]="ABORTED",ge[ge.OUT_OF_RANGE=11]="OUT_OF_RANGE",ge[ge.UNIMPLEMENTED=12]="UNIMPLEMENTED",ge[ge.INTERNAL=13]="INTERNAL",ge[ge.UNAVAILABLE=14]="UNAVAILABLE",ge[ge.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const Ow=new kr([4294967295,4294967295],0);function Vd(n){const e=jp().encode(n),t=new Dp;return t.update(e),new Uint8Array(t.digest())}function Nd(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new kr([t,r],0),new kr([i,s],0)]}class mu{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Qs(`Invalid padding: ${t}`);if(r<0)throw new Qs(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Qs(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Qs(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=kr.fromNumber(this.fe)}pe(e,t,r){let i=e.add(t.multiply(kr.fromNumber(r)));return i.compare(Ow)===1&&(i=new kr([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=Vd(e),[r,i]=Nd(t);for(let s=0;s<this.hashCount;s++){const a=this.pe(r,i,s);if(!this.ye(a))return!1}return!0}static create(e,t,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),a=new mu(s,i,t);return r.forEach(l=>a.insert(l)),a}insert(e){if(this.fe===0)return;const t=Vd(e),[r,i]=Nd(t);for(let s=0;s<this.hashCount;s++){const a=this.pe(r,i,s);this.we(a)}}we(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Qs extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class yl{constructor(e,t,r,i,s){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const i=new Map;return i.set(e,xo.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new yl(te.min(),i,new Ue(ae),Zn(),de())}}class xo{constructor(e,t,r,i,s){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new xo(r,t,de(),de(),de())}}/**
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
 */class ba{constructor(e,t,r,i){this.Se=e,this.removedTargetIds=t,this.key=r,this.be=i}}class yg{constructor(e,t){this.targetId=e,this.De=t}}class wg{constructor(e,t,r=yt.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=i}}class Od{constructor(){this.ve=0,this.Ce=Ld(),this.Fe=yt.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=de(),t=de(),r=de();return this.Ce.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:r=r.add(i);break;default:Y(38017,{changeType:s})}}),new xo(this.Fe,this.Me,e,t,r)}ke(){this.xe=!1,this.Ce=Ld()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,Te(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class Lw{constructor(e){this.We=e,this.Ge=new Map,this.ze=Zn(),this.je=ha(),this.Je=ha(),this.He=new Ue(ae)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const r=this.tt(t);switch(e.state){case 0:this.nt(t)&&r.Be(e.resumeToken);break;case 1:r.Ue(),r.Oe||r.ke(),r.Be(e.resumeToken);break;case 2:r.Ue(),r.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(r.Ke(),r.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),r.Be(e.resumeToken));break;default:Y(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((r,i)=>{this.nt(i)&&t(i)})}it(e){const t=e.targetId,r=e.De.count,i=this.st(t);if(i){const s=i.target;if(kc(s))if(r===0){const a=new G(s.path);this.Xe(t,a,At.newNoDocument(a,te.min()))}else Te(r===1,20013,{expectedCount:r});else{const a=this.ot(t);if(a!==r){const l=this._t(e),c=l?this.ut(l,e,a):1;if(c!==0){this.rt(t);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=t;let a,l;try{a=Or(r).toUint8Array()}catch(c){if(c instanceof Hp)return Dr("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new mu(a,i,s)}catch(c){return Dr(c instanceof Qs?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.fe===0?null:l}ut(e,t,r){return t.De.count===r-this.ht(e,t.targetId)?0:2}ht(e,t){const r=this.We.getRemoteKeysForTarget(t);let i=0;return r.forEach(s=>{const a=this.We.lt(),l=`projects/${a.projectId}/databases/${a.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,s,null),i++)}),i}Pt(e){const t=new Map;this.Ge.forEach((s,a)=>{const l=this.st(a);if(l){if(s.current&&kc(l.target)){const c=new G(l.target.path);this.Tt(c).has(a)||this.It(a,c)||this.Xe(a,c,At.newNoDocument(c,e))}s.Ne&&(t.set(a,s.Le()),s.ke())}});let r=de();this.Je.forEach((s,a)=>{let l=!0;a.forEachWhile(c=>{const h=this.st(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.ze.forEach((s,a)=>a.setReadTime(e));const i=new yl(e,t,this.He,this.ze,r);return this.ze=Zn(),this.je=ha(),this.Je=ha(),this.He=new Ue(ae),i}Ze(e,t){if(!this.nt(e))return;const r=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,r),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,r){if(!this.nt(e))return;const i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),r&&(this.ze=this.ze.insert(t,r))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Od,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new st(ae),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new st(ae),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||q("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Od),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function ha(){return new Ue(G.comparator)}function Ld(){return new Ue(G.comparator)}const Mw={asc:"ASCENDING",desc:"DESCENDING"},Fw={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Uw={and:"AND",or:"OR"};class jw{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Cc(n,e){return n.useProto3Json||hl(e)?e:{value:e}}function $a(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Eg(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Bw(n,e){return $a(n,e.toTimestamp())}function In(n){return Te(!!n,49232),te.fromTimestamp(function(t){const r=Nr(t);return new Ve(r.seconds,r.nanos)}(n))}function _u(n,e){return xc(n,e).canonicalString()}function xc(n,e){const t=function(i){return new De(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function bg(n){const e=De.fromString(n);return Te(Rg(e),10190,{key:e.toString()}),e}function Dc(n,e){return _u(n.databaseId,e.path)}function Yl(n,e){const t=bg(e);if(t.get(1)!==n.databaseId.projectId)throw new z(L.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new z(L.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new G(Ig(t))}function Tg(n,e){return _u(n.databaseId,e)}function $w(n){const e=bg(n);return e.length===4?De.emptyPath():Ig(e)}function Vc(n){return new De(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ig(n){return Te(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Md(n,e,t){return{name:Dc(n,e),fields:t.value.mapValue.fields}}function qw(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:Y(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(h,f){return h.useProto3Json?(Te(f===void 0||typeof f=="string",58123),yt.fromBase64String(f||"")):(Te(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),yt.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,l=a&&function(h){const f=h.code===void 0?L.UNKNOWN:vg(h.code);return new z(f,h.message||"")}(a);t=new wg(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=Yl(n,r.document.name),s=In(r.document.updateTime),a=r.document.createTime?In(r.document.createTime):te.min(),l=new Yt({mapValue:{fields:r.document.fields}}),c=At.newFoundDocument(i,s,a,l),h=r.targetIds||[],f=r.removedTargetIds||[];t=new ba(h,f,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=Yl(n,r.document),s=r.readTime?In(r.readTime):te.min(),a=At.newNoDocument(i,s),l=r.removedTargetIds||[];t=new ba([],l,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=Yl(n,r.document),s=r.removedTargetIds||[];t=new ba([],s,i,null)}else{if(!("filter"in e))return Y(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,a=new Vw(i,s),l=r.targetId;t=new yg(l,a)}}return t}function zw(n,e){let t;if(e instanceof Co)t={update:Md(n,e.key,e.value)};else if(e instanceof _g)t={delete:Dc(n,e.key)};else if(e instanceof Ti)t={update:Md(n,e.key,e.data),updateMask:Zw(e.fieldMask)};else{if(!(e instanceof Cw))return Y(16599,{Rt:e.type});t={verify:Dc(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,a){const l=a.transform;if(l instanceof ja)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof go)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof mo)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Ba)return{fieldPath:a.field.canonicalString(),increment:l.Ee};throw Y(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Bw(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:Y(27497)}(n,e.precondition)),t}function Hw(n,e){return n&&n.length>0?(Te(e!==void 0,14353),n.map(t=>function(i,s){let a=i.updateTime?In(i.updateTime):In(s);return a.isEqual(te.min())&&(a=In(s)),new Rw(a,i.transformResults||[])}(t,e))):[]}function Ww(n,e){return{documents:[Tg(n,e.path)]}}function Gw(n,e){const t={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=Tg(n,i);const s=function(h){if(h.length!==0)return Sg(xn.create(h,"and"))}(e.filters);s&&(t.structuredQuery.where=s);const a=function(h){if(h.length!==0)return h.map(f=>function(m){return{field:Mi(m.field),direction:Jw(m.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const l=Cc(n,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:i}}function Kw(n){let e=$w(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let i=null;if(r>0){Te(r===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];t.where&&(s=function(g){const m=Ag(g);return m instanceof xn&&tg(m)?m.getFilters():[m]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(m=>function(k){return new Ua(Fi(k.field),function(A){switch(A){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(k.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(g){let m;return m=typeof g=="object"?g.value:g,hl(m)?null:m}(t.limit));let c=null;t.startAt&&(c=function(g){const m=!!g.before,I=g.values||[];return new Fa(I,m)}(t.startAt));let h=null;return t.endAt&&(h=function(g){const m=!g.before,I=g.values||[];return new Fa(I,m)}(t.endAt)),fw(e,i,a,s,l,"F",c,h)}function Qw(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return Y(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Ag(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Fi(t.unaryFilter.field);return it.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Fi(t.unaryFilter.field);return it.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Fi(t.unaryFilter.field);return it.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Fi(t.unaryFilter.field);return it.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return Y(61313);default:return Y(60726)}}(n):n.fieldFilter!==void 0?function(t){return it.create(Fi(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return Y(58110);default:return Y(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return xn.create(t.compositeFilter.filters.map(r=>Ag(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return Y(1026)}}(t.compositeFilter.op))}(n):Y(30097,{filter:n})}function Jw(n){return Mw[n]}function Yw(n){return Fw[n]}function Xw(n){return Uw[n]}function Mi(n){return{fieldPath:n.canonicalString()}}function Fi(n){return pt.fromServerFormat(n.fieldPath)}function Sg(n){return n instanceof it?function(t){if(t.op==="=="){if(Id(t.value))return{unaryFilter:{field:Mi(t.field),op:"IS_NAN"}};if(Td(t.value))return{unaryFilter:{field:Mi(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Id(t.value))return{unaryFilter:{field:Mi(t.field),op:"IS_NOT_NAN"}};if(Td(t.value))return{unaryFilter:{field:Mi(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Mi(t.field),op:Yw(t.op),value:t.value}}}(n):n instanceof xn?function(t){const r=t.getFilters().map(i=>Sg(i));return r.length===1?r[0]:{compositeFilter:{op:Xw(t.op),filters:r}}}(n):Y(54877,{filter:n})}function Zw(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Rg(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class br{constructor(e,t,r,i,s=te.min(),a=te.min(),l=yt.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new br(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new br(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new br(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new br(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class eE{constructor(e){this.gt=e}}function tE(n){const e=Kw({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Pc(e,e.limit,"L"):e}/**
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
 */class nE{constructor(){this.Dn=new rE}addToCollectionParentIndex(e,t){return this.Dn.add(t),O.resolve()}getCollectionParents(e,t){return O.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return O.resolve()}deleteFieldIndex(e,t){return O.resolve()}deleteAllFieldIndexes(e){return O.resolve()}createTargetIndexes(e,t){return O.resolve()}getDocumentsMatchingTarget(e,t){return O.resolve(null)}getIndexType(e,t){return O.resolve(0)}getFieldIndexes(e,t){return O.resolve([])}getNextCollectionGroupToUpdate(e){return O.resolve(null)}getMinOffset(e,t){return O.resolve(Vr.min())}getMinOffsetFromCollectionGroup(e,t){return O.resolve(Vr.min())}updateCollectionGroup(e,t,r){return O.resolve()}updateIndexEntries(e,t){return O.resolve()}}class rE{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t]||new st(De.comparator),s=!i.has(r);return this.index[t]=i.add(r),s}has(e){const t=e.lastSegment(),r=e.popLast(),i=this.index[t];return i&&i.has(r)}getEntries(e){return(this.index[e]||new st(De.comparator)).toArray()}}/**
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
 */class as{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new as(0)}static ur(){return new as(-1)}}/**
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
 */const Ud="LruGarbageCollector",iE=1048576;function jd([n,e],[t,r]){const i=ae(n,t);return i===0?ae(e,r):i}class sE{constructor(e){this.Tr=e,this.buffer=new st(jd),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();jd(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class oE{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){q(Ud,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Es(t)?q(Ud,"Ignoring IndexedDB error during garbage collection: ",t):await ws(t)}await this.Rr(3e5)})}}class aE{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return O.resolve(ul.ue);const r=new sE(t);return this.Vr.forEachTarget(e,i=>r.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>r.Er(i))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.Vr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(q("LruGarbageCollector","Garbage collection skipped; disabled"),O.resolve(Fd)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(q("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Fd):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let r,i,s,a,l,c,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(q("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),i=this.params.maximumSequenceNumbersToCollect):i=g,a=Date.now(),this.nthSequenceNumber(e,i))).next(g=>(r=g,l=Date.now(),this.removeTargets(e,r,t))).next(g=>(s=g,c=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(h=Date.now(),Oi()<=ue.DEBUG&&q("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-f}ms
	Determined least recently used ${i} in `+(l-a)+`ms
	Removed ${s} targets in `+(c-l)+`ms
	Removed ${g} documents in `+(h-c)+`ms
Total Duration: ${h-f}ms`),O.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:g})))}}function lE(n,e){return new aE(n,e)}/**
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
 */class cE{constructor(){this.changes=new bi(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,At.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?O.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class uE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class hE{constructor(e,t,r,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(r!==null&&ro(r.mutation,i,ln.empty(),Ve.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,de()).next(()=>r))}getLocalViewOfDocuments(e,t,r=de()){const i=Jr();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,r).next(s=>{let a=Ks();return s.forEach((l,c)=>{a=a.insert(l,c.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Jr();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,de()))}populateOverlays(e,t,r){const i=[];return r.forEach(s=>{t.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((a,l)=>{t.set(a,l)})})}computeViews(e,t,r,i){let s=Zn();const a=no(),l=function(){return no()}();return t.forEach((c,h)=>{const f=r.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof Ti)?s=s.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),ro(f.mutation,h,f.mutation.getFieldMask(),Ve.now())):a.set(h.key,ln.empty())}),this.recalculateAndSaveOverlays(e,s).next(c=>(c.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var g;return l.set(h,new uE(f,(g=a.get(h))!==null&&g!==void 0?g:null))}),l))}recalculateAndSaveOverlays(e,t){const r=no();let i=new Ue((a,l)=>a-l),s=de();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const l of a)l.keys().forEach(c=>{const h=t.get(c);if(h===null)return;let f=r.get(c)||ln.empty();f=l.applyToLocalView(h,f),r.set(c,f);const g=(i.get(l.batchId)||de()).add(c);i=i.insert(l.batchId,g)})}).next(()=>{const a=[],l=i.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,f=c.value,g=cg();f.forEach(m=>{if(!s.has(m)){const I=gg(t.get(m),r.get(m));I!==null&&g.set(m,I),s=s.add(m)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,g))}return O.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,i){return function(a){return G.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):pw(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,i):this.getDocumentsMatchingCollectionQuery(e,t,r,i)}getNextDocuments(e,t,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,i).next(s=>{const a=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,i-s.size):O.resolve(Jr());let l=uo,c=s;return a.next(h=>O.forEach(h,(f,g)=>(l<g.largestBatchId&&(l=g.largestBatchId),s.get(f)?O.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{c=c.insert(f,m)}))).next(()=>this.populateOverlays(e,h,s)).next(()=>this.computeViews(e,c,h,de())).next(f=>({batchId:l,changes:lg(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new G(t)).next(r=>{let i=Ks();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,r,i){const s=t.collectionGroup;let a=Ks();return this.indexManager.getCollectionParents(e,s).next(l=>O.forEach(l,c=>{const h=function(g,m){return new fl(m,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,c.child(s));return this.getDocumentsMatchingCollectionQuery(e,h,r,i).next(f=>{f.forEach((g,m)=>{a=a.insert(g,m)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(s=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,s,i))).next(a=>{s.forEach((c,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,At.newInvalidDocument(f)))});let l=Ks();return a.forEach((c,h)=>{const f=s.get(c);f!==void 0&&ro(f.mutation,h,ln.empty(),Ve.now()),ml(t,h)&&(l=l.insert(c,h))}),l})}}/**
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
 */class dE{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return O.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:In(i.createTime)}}(t)),O.resolve()}getNamedQuery(e,t){return O.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:tE(i.bundledQuery),readTime:In(i.readTime)}}(t)),O.resolve()}}/**
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
 */class fE{constructor(){this.overlays=new Ue(G.comparator),this.kr=new Map}getOverlay(e,t){return O.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Jr();return O.forEach(t,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((i,s)=>{this.wt(e,t,s)}),O.resolve()}removeOverlaysForBatchId(e,t,r){const i=this.kr.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.kr.delete(r)),O.resolve()}getOverlaysForCollection(e,t,r){const i=Jr(),s=t.length+1,a=new G(t.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===s&&c.largestBatchId>r&&i.set(c.getKey(),c)}return O.resolve(i)}getOverlaysForCollectionGroup(e,t,r,i){let s=new Ue((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=s.get(h.largestBatchId);f===null&&(f=Jr(),s=s.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=Jr(),c=s.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=i)););return O.resolve(l)}wt(e,t,r){const i=this.overlays.get(r.key);if(i!==null){const a=this.kr.get(i.largestBatchId).delete(r.key);this.kr.set(i.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Dw(t,r));let s=this.kr.get(t);s===void 0&&(s=de(),this.kr.set(t,s)),this.kr.set(t,s.add(r.key))}}/**
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
 */class pE{constructor(){this.sessionToken=yt.EMPTY_BYTE_STRING}getSessionToken(e){return O.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,O.resolve()}}/**
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
 */class vu{constructor(){this.qr=new st(at.Qr),this.$r=new st(at.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const r=new at(e,t);this.qr=this.qr.add(r),this.$r=this.$r.add(r)}Kr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Wr(new at(e,t))}Gr(e,t){e.forEach(r=>this.removeReference(r,t))}zr(e){const t=new G(new De([])),r=new at(t,e),i=new at(t,e+1),s=[];return this.$r.forEachInRange([r,i],a=>{this.Wr(a),s.push(a.key)}),s}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new G(new De([])),r=new at(t,e),i=new at(t,e+1);let s=de();return this.$r.forEachInRange([r,i],a=>{s=s.add(a.key)}),s}containsKey(e){const t=new at(e,0),r=this.qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class at{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return G.comparator(e.key,t.key)||ae(e.Hr,t.Hr)}static Ur(e,t){return ae(e.Hr,t.Hr)||G.comparator(e.key,t.key)}}/**
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
 */class gE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new st(at.Qr)}checkEmpty(e){return O.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,i){const s=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new xw(s,t,r,i);this.mutationQueue.push(a);for(const l of i)this.Yr=this.Yr.add(new at(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return O.resolve(a)}lookupMutationBatch(e,t){return O.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,i=this.Xr(r),s=i<0?0:i;return O.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return O.resolve(this.mutationQueue.length===0?cu:this.er-1)}getAllMutationBatches(e){return O.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new at(t,0),i=new at(t,Number.POSITIVE_INFINITY),s=[];return this.Yr.forEachInRange([r,i],a=>{const l=this.Zr(a.Hr);s.push(l)}),O.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new st(ae);return t.forEach(i=>{const s=new at(i,0),a=new at(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([s,a],l=>{r=r.add(l.Hr)})}),O.resolve(this.ei(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,i=r.length+1;let s=r;G.isDocumentKey(s)||(s=s.child(""));const a=new at(new G(s),0);let l=new st(ae);return this.Yr.forEachWhile(c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===i&&(l=l.add(c.Hr)),!0)},a),O.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(r=>{const i=this.Zr(r);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){Te(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Yr;return O.forEach(t.mutations,i=>{const s=new at(i.key,t.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=r})}rr(e){}containsKey(e,t){const r=new at(t,0),i=this.Yr.firstAfterOrEqual(r);return O.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,O.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class mE{constructor(e){this.ni=e,this.docs=function(){return new Ue(G.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,i=this.docs.get(r),s=i?i.size:0,a=this.ni(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return O.resolve(r?r.document.mutableCopy():At.newInvalidDocument(t))}getEntries(e,t){let r=Zn();return t.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():At.newInvalidDocument(i))}),O.resolve(r)}getDocumentsMatchingQuery(e,t,r,i){let s=Zn();const a=t.path,l=new G(a.child("__id-9223372036854775808__")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:f}}=c.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||H0(z0(f),r)<=0||(i.has(f.key)||ml(t,f))&&(s=s.insert(f.key,f.mutableCopy()))}return O.resolve(s)}getAllFromCollectionGroup(e,t,r,i){Y(9500)}ri(e,t){return O.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new _E(this)}getSize(e){return O.resolve(this.size)}}class _E extends cE{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(r)}),O.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
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
 */class vE{constructor(e){this.persistence=e,this.ii=new bi(t=>du(t),fu),this.lastRemoteSnapshotVersion=te.min(),this.highestTargetId=0,this.si=0,this.oi=new vu,this.targetCount=0,this._i=as.ar()}forEachTarget(e,t){return this.ii.forEach((r,i)=>t(i)),O.resolve()}getLastRemoteSnapshotVersion(e){return O.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return O.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),O.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.si&&(this.si=t),O.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new as(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,O.resolve()}updateTargetData(e,t){return this.hr(t),O.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,O.resolve()}removeTargets(e,t,r){let i=0;const s=[];return this.ii.forEach((a,l)=>{l.sequenceNumber<=t&&r.get(l.targetId)===null&&(this.ii.delete(a),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),O.waitFor(s).next(()=>i)}getTargetCount(e){return O.resolve(this.targetCount)}getTargetData(e,t){const r=this.ii.get(t)||null;return O.resolve(r)}addMatchingKeys(e,t,r){return this.oi.Kr(t,r),O.resolve()}removeMatchingKeys(e,t,r){this.oi.Gr(t,r);const i=this.persistence.referenceDelegate,s=[];return i&&t.forEach(a=>{s.push(i.markPotentiallyOrphaned(e,a))}),O.waitFor(s)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),O.resolve()}getMatchingKeysForTargetId(e,t){const r=this.oi.Jr(t);return O.resolve(r)}containsKey(e,t){return O.resolve(this.oi.containsKey(t))}}/**
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
 */class Pg{constructor(e,t){this.ai={},this.overlays={},this.ui=new ul(0),this.ci=!1,this.ci=!0,this.li=new pE,this.referenceDelegate=e(this),this.hi=new vE(this),this.indexManager=new nE,this.remoteDocumentCache=function(i){return new mE(i)}(r=>this.referenceDelegate.Pi(r)),this.serializer=new eE(t),this.Ti=new dE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new fE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ai[e.toKey()];return r||(r=new gE(t,this.referenceDelegate),this.ai[e.toKey()]=r),r}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,r){q("MemoryPersistence","Starting transaction:",e);const i=new yE(this.ui.next());return this.referenceDelegate.Ii(),r(i).next(s=>this.referenceDelegate.di(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ei(e,t){return O.or(Object.values(this.ai).map(r=>()=>r.containsKey(e,t)))}}class yE extends G0{constructor(e){super(),this.currentSequenceNumber=e}}class yu{constructor(e){this.persistence=e,this.Ai=new vu,this.Ri=null}static Vi(e){return new yu(e)}get mi(){if(this.Ri)return this.Ri;throw Y(60996)}addReference(e,t,r){return this.Ai.addReference(r,t),this.mi.delete(r.toString()),O.resolve()}removeReference(e,t,r){return this.Ai.removeReference(r,t),this.mi.add(r.toString()),O.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),O.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(s=>this.mi.add(s.toString()))}).next(()=>r.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return O.forEach(this.mi,r=>{const i=G.fromPath(r);return this.fi(e,i).next(s=>{s||t.removeEntry(i,te.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(r=>{r?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return O.or([()=>O.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class qa{constructor(e,t){this.persistence=e,this.gi=new bi(r=>J0(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=lE(this,t)}static Vi(e,t){return new qa(e,t)}Ii(){}di(e){return O.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(i=>r+i))}yr(e){let t=0;return this.gr(e,r=>{t++}).next(()=>t)}gr(e,t){return O.forEach(this.gi,(r,i)=>this.Sr(e,r,i).next(s=>s?O.resolve():t(i)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ri(e,a=>this.Sr(e,a,t).next(l=>{l||(r++,s.removeEntry(a,te.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),O.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),O.resolve()}removeReference(e,t,r){return this.gi.set(r,e.currentSequenceNumber),O.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),O.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ya(e.data.value)),t}Sr(e,t,r){return O.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.gi.get(t);return O.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class wE{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class EE{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return fy()?8:K0(St())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,r,i){const s={result:null};return this.ps(e,t).next(a=>{s.result=a}).next(()=>{if(!s.result)return this.ys(e,t,i,r).next(a=>{s.result=a})}).next(()=>{if(s.result)return;const a=new wE;return this.ws(e,t,a).next(l=>{if(s.result=l,this.Rs)return this.Ss(e,t,a,l.size)})}).next(()=>s.result)}Ss(e,t,r,i){return r.documentReadCount<this.Vs?(Oi()<=ue.DEBUG&&q("QueryEngine","SDK will not create cache indexes for query:",Li(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),O.resolve()):(Oi()<=ue.DEBUG&&q("QueryEngine","Query:",Li(t),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.fs*i?(Oi()<=ue.DEBUG&&q("QueryEngine","The SDK decides to create cache indexes for query:",Li(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Tn(t))):O.resolve())}ps(e,t){if(kd(t))return O.resolve(null);let r=Tn(t);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Pc(t,null,"F"),r=Tn(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const a=de(...s);return this.gs.getDocuments(e,a).next(l=>this.indexManager.getMinOffset(e,r).next(c=>{const h=this.bs(t,l);return this.Ds(t,h,a,c.readTime)?this.ps(e,Pc(t,null,"F")):this.vs(e,h,t,c)}))})))}ys(e,t,r,i){return kd(t)||i.isEqual(te.min())?O.resolve(null):this.gs.getDocuments(e,r).next(s=>{const a=this.bs(t,s);return this.Ds(t,a,r,i)?O.resolve(null):(Oi()<=ue.DEBUG&&q("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Li(t)),this.vs(e,a,t,q0(i,uo)).next(l=>l))})}bs(e,t){let r=new st(og(e));return t.forEach((i,s)=>{ml(e,s)&&(r=r.add(s))}),r}Ds(e,t,r,i){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const s=e.limitType==="F"?t.last():t.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ws(e,t,r){return Oi()<=ue.DEBUG&&q("QueryEngine","Using full collection scan to execute query:",Li(t)),this.gs.getDocumentsMatchingQuery(e,t,Vr.min(),r)}vs(e,t,r,i){return this.gs.getDocumentsMatchingQuery(e,r,i).next(s=>(t.forEach(a=>{s=s.insert(a.key,a)}),s))}}/**
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
 */const Eu="LocalStore",bE=3e8;class TE{constructor(e,t,r,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new Ue(ae),this.Ms=new bi(s=>du(s),fu),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(r)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new hE(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function IE(n,e,t,r){return new TE(n,e,t,r)}async function Cg(n,e){const t=ne(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let i;return t.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,t.Ns(e),t.mutationQueue.getAllMutationBatches(r))).next(s=>{const a=[],l=[];let c=de();for(const h of i){a.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}for(const h of s){l.push(h.batchId);for(const f of h.mutations)c=c.add(f.key)}return t.localDocuments.getDocuments(r,c).next(h=>({Bs:h,removedBatchIds:a,addedBatchIds:l}))})})}function AE(n,e){const t=ne(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,c,h,f){const g=h.batch,m=g.keys();let I=O.resolve();return m.forEach(k=>{I=I.next(()=>f.getEntry(c,k)).next(P=>{const A=h.docVersions.get(k);Te(A!==null,48541),P.version.compareTo(A)<0&&(g.applyToRemoteDocument(P,h),P.isValidDocument()&&(P.setReadTime(h.commitVersion),f.addEntry(P)))})}),I.next(()=>l.mutationQueue.removeMutationBatch(c,g))}(t,r,e,s).next(()=>s.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let c=de();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c}(e))).next(()=>t.localDocuments.getDocuments(r,i))})}function xg(n){const e=ne(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function SE(n,e){const t=ne(n),r=e.snapshotVersion;let i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const a=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;const l=[];e.targetChanges.forEach((f,g)=>{const m=i.get(g);if(!m)return;l.push(t.hi.removeMatchingKeys(s,f.removedDocuments,g).next(()=>t.hi.addMatchingKeys(s,f.addedDocuments,g)));let I=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(g)!==null?I=I.withResumeToken(yt.EMPTY_BYTE_STRING,te.min()).withLastLimboFreeSnapshotVersion(te.min()):f.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(f.resumeToken,r)),i=i.insert(g,I),function(P,A,x){return P.resumeToken.approximateByteSize()===0||A.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=bE?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(m,I,f)&&l.push(t.hi.updateTargetData(s,I))});let c=Zn(),h=de();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(RE(s,a,e.documentUpdates).next(f=>{c=f.Ls,h=f.ks})),!r.isEqual(te.min())){const f=t.hi.getLastRemoteSnapshotVersion(s).next(g=>t.hi.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return O.waitFor(l).next(()=>a.apply(s)).next(()=>t.localDocuments.getLocalViewOfDocuments(s,c,h)).next(()=>c)}).then(s=>(t.Fs=i,s))}function RE(n,e,t){let r=de(),i=de();return t.forEach(s=>r=r.add(s)),e.getEntries(n,r).next(s=>{let a=Zn();return t.forEach((l,c)=>{const h=s.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(l)),c.isNoDocument()&&c.version.isEqual(te.min())?(e.removeEntry(l,c.readTime),a=a.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),a=a.insert(l,c)):q(Eu,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Ls:a,ks:i}})}function kE(n,e){const t=ne(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=cu),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function PE(n,e){const t=ne(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return t.hi.getTargetData(r,e).next(s=>s?(i=s,O.resolve(i)):t.hi.allocateTargetId(r).next(a=>(i=new br(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.hi.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=t.Fs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(r.targetId,r),t.Ms.set(e,r.targetId)),r})}async function Nc(n,e,t){const r=ne(n),i=r.Fs.get(e),s=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",s,a=>r.persistence.referenceDelegate.removeTarget(a,i))}catch(a){if(!Es(a))throw a;q(Eu,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Fs=r.Fs.remove(e),r.Ms.delete(i.target)}function Bd(n,e,t){const r=ne(n);let i=te.min(),s=de();return r.persistence.runTransaction("Execute query","readwrite",a=>function(c,h,f){const g=ne(c),m=g.Ms.get(f);return m!==void 0?O.resolve(g.Fs.get(m)):g.hi.getTargetData(h,f)}(r,a,Tn(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.hi.getMatchingKeysForTargetId(a,l.targetId).next(c=>{s=c})}).next(()=>r.Cs.getDocumentsMatchingQuery(a,e,t?i:te.min(),t?s:de())).next(l=>(CE(r,mw(e),l),{documents:l,qs:s})))}function CE(n,e,t){let r=n.xs.get(e)||te.min();t.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),n.xs.set(e,r)}class $d{constructor(){this.activeTargetIds=bw()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class xE{constructor(){this.Fo=new $d,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,r){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new $d,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class DE{xo(e){}shutdown(){}}/**
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
 */const qd="ConnectivityMonitor";class zd{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){q(qd,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){q(qd,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let da=null;function Oc(){return da===null?da=function(){return 268435456+Math.round(2147483648*Math.random())}():da++,"0x"+da.toString(16)}/**
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
 */const Xl="RestConnection",VE={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class NE{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${r}/databases/${i}`,this.Ko=this.databaseId.database===La?`project_id=${r}`:`project_id=${r}&database_id=${i}`}Wo(e,t,r,i,s){const a=Oc(),l=this.Go(e,t.toUriEncodedString());q(Xl,`Sending RPC '${e}' ${a}:`,l,r);const c={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(c,i,s);const{host:h}=new URL(l),f=_s(h);return this.jo(e,l,c,r,f).then(g=>(q(Xl,`Received RPC '${e}' ${a}: `,g),g),g=>{throw Dr(Xl,`RPC '${e}' ${a} failed with error: `,g,"url: ",l,"request:",r),g})}Jo(e,t,r,i,s,a){return this.Wo(e,t,r,i,s)}zo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+ys}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Go(e,t){const r=VE[e];return`${this.$o}/v1/${t}:${r}`}terminate(){}}/**
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
 */class OE{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
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
 */const bt="WebChannelConnection";class LE extends NE{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,r,i,s){const a=Oc();return new Promise((l,c)=>{const h=new Vp;h.setWithCredentials(!0),h.listenOnce(Np.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case va.NO_ERROR:const g=h.getResponseJson();q(bt,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(g)),l(g);break;case va.TIMEOUT:q(bt,`RPC '${e}' ${a} timed out`),c(new z(L.DEADLINE_EXCEEDED,"Request time out"));break;case va.HTTP_ERROR:const m=h.getStatus();if(q(bt,`RPC '${e}' ${a} failed with status:`,m,"response text:",h.getResponseText()),m>0){let I=h.getResponseJson();Array.isArray(I)&&(I=I[0]);const k=I==null?void 0:I.error;if(k&&k.status&&k.message){const P=function(x){const F=x.toLowerCase().replace(/_/g,"-");return Object.values(L).indexOf(F)>=0?F:L.UNKNOWN}(k.status);c(new z(P,k.message))}else c(new z(L.UNKNOWN,"Server responded with status "+h.getStatus()))}else c(new z(L.UNAVAILABLE,"Connection failed."));break;default:Y(9055,{c_:e,streamId:a,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{q(bt,`RPC '${e}' ${a} completed.`)}});const f=JSON.stringify(i);q(bt,`RPC '${e}' ${a} sending request:`,i),h.send(t,"POST",f,r,15)})}P_(e,t,r){const i=Oc(),s=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Mp(),l=Lp(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.zo(c.initMessageHeaders,t,r),c.encodeInitMessageHeaders=!0;const f=s.join("");q(bt,`Creating RPC '${e}' stream ${i}: ${f}`,c);const g=a.createWebChannel(f,c);this.T_(g);let m=!1,I=!1;const k=new OE({Ho:A=>{I?q(bt,`Not sending because RPC '${e}' stream ${i} is closed:`,A):(m||(q(bt,`Opening RPC '${e}' stream ${i} transport.`),g.open(),m=!0),q(bt,`RPC '${e}' stream ${i} sending:`,A),g.send(A))},Yo:()=>g.close()}),P=(A,x,F)=>{A.listen(x,M=>{try{F(M)}catch(U){setTimeout(()=>{throw U},0)}})};return P(g,Gs.EventType.OPEN,()=>{I||(q(bt,`RPC '${e}' stream ${i} transport opened.`),k.s_())}),P(g,Gs.EventType.CLOSE,()=>{I||(I=!0,q(bt,`RPC '${e}' stream ${i} transport closed`),k.__(),this.I_(g))}),P(g,Gs.EventType.ERROR,A=>{I||(I=!0,Dr(bt,`RPC '${e}' stream ${i} transport errored. Name:`,A.name,"Message:",A.message),k.__(new z(L.UNAVAILABLE,"The operation could not be completed")))}),P(g,Gs.EventType.MESSAGE,A=>{var x;if(!I){const F=A.data[0];Te(!!F,16349);const M=F,U=(M==null?void 0:M.error)||((x=M[0])===null||x===void 0?void 0:x.error);if(U){q(bt,`RPC '${e}' stream ${i} received error:`,U);const H=U.status;let W=function(y){const v=Je[y];if(v!==void 0)return vg(v)}(H),b=U.message;W===void 0&&(W=L.INTERNAL,b="Unknown error status: "+H+" with message "+U.message),I=!0,k.__(new z(W,b)),g.close()}else q(bt,`RPC '${e}' stream ${i} received:`,F),k.a_(F)}}),P(l,Op.STAT_EVENT,A=>{A.stat===Tc.PROXY?q(bt,`RPC '${e}' stream ${i} detected buffering proxy`):A.stat===Tc.NOPROXY&&q(bt,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{k.o_()},0),k}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}function Zl(){return typeof document<"u"?document:null}/**
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
 */function wl(n){return new jw(n,!0)}/**
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
 */class Dg{constructor(e,t,r=1e3,i=1.5,s=6e4){this.Fi=e,this.timerId=t,this.d_=r,this.E_=i,this.A_=s,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-r);i>0&&q("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
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
 */const Hd="PersistentStream";class Vg{constructor(e,t,r,i,s,a,l,c){this.Fi=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new Dg(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===L.RESOURCE_EXHAUSTED?(Xn(t.toString()),Xn("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===L.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===t&&this.W_(r,i)},r=>{e(()=>{const i=new z(L.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}W_(e,t){const r=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{r(()=>this.listener.Zo())}),this.stream.e_(()=>{r(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return q(Hd,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(q(Hd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class ME extends Vg{constructor(e,t,r,i,s,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=qw(this.serializer,e),r=function(s){if(!("targetChange"in s))return te.min();const a=s.targetChange;return a.targetIds&&a.targetIds.length?te.min():a.readTime?In(a.readTime):te.min()}(e);return this.listener.J_(t,r)}H_(e){const t={};t.database=Vc(this.serializer),t.addTarget=function(s,a){let l;const c=a.target;if(l=kc(c)?{documents:Ww(s,c)}:{query:Gw(s,c).Vt},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Eg(s,a.resumeToken);const h=Cc(s,a.expectedCount);h!==null&&(l.expectedCount=h)}else if(a.snapshotVersion.compareTo(te.min())>0){l.readTime=$a(s,a.snapshotVersion.toTimestamp());const h=Cc(s,a.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=Qw(this.serializer,e);r&&(t.labels=r),this.k_(t)}Y_(e){const t={};t.database=Vc(this.serializer),t.removeTarget=e,this.k_(t)}}class FE extends Vg{constructor(e,t,r,i,s,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,i,a),this.serializer=s}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return Te(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,Te(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){Te(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=Hw(e.writeResults,e.commitTime),r=In(e.commitTime);return this.listener.ta(r,t)}na(){const e={};e.database=Vc(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>zw(this.serializer,r))};this.k_(t)}}/**
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
 */class UE{}class jE extends UE{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new z(L.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,a])=>this.connection.Wo(e,xc(t,r),i,s,a)).catch(s=>{throw s.name==="FirebaseError"?(s.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new z(L.UNKNOWN,s.toString())})}Jo(e,t,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,l])=>this.connection.Jo(e,xc(t,r),i,a,l,s)).catch(a=>{throw a.name==="FirebaseError"?(a.code===L.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new z(L.UNKNOWN,a.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class BE{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Xn(t),this._a=!1):q("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const mi="RemoteStore";class $E{constructor(e,t,r,i,s){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=s,this.Ea.xo(a=>{r.enqueueAndForget(async()=>{Ii(this)&&(q(mi,"Restarting streams for network reachability change."),await async function(c){const h=ne(c);h.Ia.add(4),await Do(h),h.Aa.set("Unknown"),h.Ia.delete(4),await El(h)}(this))})}),this.Aa=new BE(r,i)}}async function El(n){if(Ii(n))for(const e of n.da)await e(!0)}async function Do(n){for(const e of n.da)await e(!1)}function Ng(n,e){const t=ne(n);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),Au(t)?Iu(t):bs(t).x_()&&Tu(t,e))}function bu(n,e){const t=ne(n),r=bs(t);t.Ta.delete(e),r.x_()&&Og(t,e),t.Ta.size===0&&(r.x_()?r.B_():Ii(t)&&t.Aa.set("Unknown"))}function Tu(n,e){if(n.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(te.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}bs(n).H_(e)}function Og(n,e){n.Ra.$e(e),bs(n).Y_(e)}function Iu(n){n.Ra=new Lw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>n.Ta.get(e)||null,lt:()=>n.datastore.serializer.databaseId}),bs(n).start(),n.Aa.aa()}function Au(n){return Ii(n)&&!bs(n).M_()&&n.Ta.size>0}function Ii(n){return ne(n).Ia.size===0}function Lg(n){n.Ra=void 0}async function qE(n){n.Aa.set("Online")}async function zE(n){n.Ta.forEach((e,t)=>{Tu(n,e)})}async function HE(n,e){Lg(n),Au(n)?(n.Aa.la(e),Iu(n)):n.Aa.set("Unknown")}async function WE(n,e,t){if(n.Aa.set("Online"),e instanceof wg&&e.state===2&&e.cause)try{await async function(i,s){const a=s.cause;for(const l of s.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,a),i.Ta.delete(l),i.Ra.removeTarget(l))}(n,e)}catch(r){q(mi,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await za(n,r)}else if(e instanceof ba?n.Ra.Ye(e):e instanceof yg?n.Ra.it(e):n.Ra.et(e),!t.isEqual(te.min()))try{const r=await xg(n.localStore);t.compareTo(r)>=0&&await function(s,a){const l=s.Ra.Pt(a);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const f=s.Ta.get(h);f&&s.Ta.set(h,f.withResumeToken(c.resumeToken,a))}}),l.targetMismatches.forEach((c,h)=>{const f=s.Ta.get(c);if(!f)return;s.Ta.set(c,f.withResumeToken(yt.EMPTY_BYTE_STRING,f.snapshotVersion)),Og(s,c);const g=new br(f.target,c,h,f.sequenceNumber);Tu(s,g)}),s.remoteSyncer.applyRemoteEvent(l)}(n,t)}catch(r){q(mi,"Failed to raise snapshot:",r),await za(n,r)}}async function za(n,e,t){if(!Es(e))throw e;n.Ia.add(1),await Do(n),n.Aa.set("Offline"),t||(t=()=>xg(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{q(mi,"Retrying IndexedDB access"),await t(),n.Ia.delete(1),await El(n)})}function Mg(n,e){return e().catch(t=>za(n,t,e))}async function bl(n){const e=ne(n),t=Mr(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:cu;for(;GE(e);)try{const i=await kE(e.localStore,r);if(i===null){e.Pa.length===0&&t.B_();break}r=i.batchId,KE(e,i)}catch(i){await za(e,i)}Fg(e)&&Ug(e)}function GE(n){return Ii(n)&&n.Pa.length<10}function KE(n,e){n.Pa.push(e);const t=Mr(n);t.x_()&&t.Z_&&t.X_(e.mutations)}function Fg(n){return Ii(n)&&!Mr(n).M_()&&n.Pa.length>0}function Ug(n){Mr(n).start()}async function QE(n){Mr(n).na()}async function JE(n){const e=Mr(n);for(const t of n.Pa)e.X_(t.mutations)}async function YE(n,e,t){const r=n.Pa.shift(),i=gu.from(r,e,t);await Mg(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await bl(n)}async function XE(n,e){e&&Mr(n).Z_&&await async function(r,i){if(function(a){return Nw(a)&&a!==L.ABORTED}(i.code)){const s=r.Pa.shift();Mr(r).N_(),await Mg(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await bl(r)}}(n,e),Fg(n)&&Ug(n)}async function Wd(n,e){const t=ne(n);t.asyncQueue.verifyOperationInProgress(),q(mi,"RemoteStore received new credentials");const r=Ii(t);t.Ia.add(3),await Do(t),r&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await El(t)}async function ZE(n,e){const t=ne(n);e?(t.Ia.delete(2),await El(t)):e||(t.Ia.add(2),await Do(t),t.Aa.set("Unknown"))}function bs(n){return n.Va||(n.Va=function(t,r,i){const s=ne(t);return s.ia(),new ME(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:qE.bind(null,n),e_:zE.bind(null,n),n_:HE.bind(null,n),J_:WE.bind(null,n)}),n.da.push(async e=>{e?(n.Va.N_(),Au(n)?Iu(n):n.Aa.set("Unknown")):(await n.Va.stop(),Lg(n))})),n.Va}function Mr(n){return n.ma||(n.ma=function(t,r,i){const s=ne(t);return s.ia(),new FE(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),e_:QE.bind(null,n),n_:XE.bind(null,n),ea:JE.bind(null,n),ta:YE.bind(null,n)}),n.da.push(async e=>{e?(n.ma.N_(),await bl(n)):(await n.ma.stop(),n.Pa.length>0&&(q(mi,`Stopping write stream with ${n.Pa.length} pending writes`),n.Pa=[]))})),n.ma}/**
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
 */class Su{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new Qn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){const a=Date.now()+r,l=new Su(e,t,a,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new z(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ru(n,e){if(Xn("AsyncQueue",`${e}: ${n}`),Es(n))return new z(L.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class Hi{static emptySet(e){return new Hi(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||G.comparator(t.key,r.key):(t,r)=>G.comparator(t.key,r.key),this.keyedMap=Ks(),this.sortedSet=new Ue(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Hi)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Hi;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
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
 */class Gd{constructor(){this.fa=new Ue(G.comparator)}track(e){const t=e.doc.key,r=this.fa.get(t);r?e.type!==0&&r.type===3?this.fa=this.fa.insert(t,e):e.type===3&&r.type!==1?this.fa=this.fa.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.fa=this.fa.remove(t):e.type===1&&r.type===2?this.fa=this.fa.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):Y(63341,{At:e,ga:r}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,r)=>{e.push(r)}),e}}class ls{constructor(e,t,r,i,s,a,l,c,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,i,s){const a=[];return t.forEach(l=>{a.push({type:0,doc:l})}),new ls(e,t,Hi.emptySet(t),a,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&gl(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==r[i].type||!t[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
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
 */class eb{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class tb{constructor(){this.queries=Kd(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,r){const i=ne(t),s=i.queries;i.queries=Kd(),s.forEach((a,l)=>{for(const c of l.wa)c.onError(r)})})(this,new z(L.ABORTED,"Firestore shutting down"))}}function Kd(){return new bi(n=>sg(n),gl)}async function ku(n,e){const t=ne(n);let r=3;const i=e.query;let s=t.queries.get(i);s?!s.Sa()&&e.ba()&&(r=2):(s=new eb,r=e.ba()?0:1);try{switch(r){case 0:s.ya=await t.onListen(i,!0);break;case 1:s.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(a){const l=Ru(a,`Initialization of query '${Li(e.query)}' failed`);return void e.onError(l)}t.queries.set(i,s),s.wa.push(e),e.va(t.onlineState),s.ya&&e.Ca(s.ya)&&Cu(t)}async function Pu(n,e){const t=ne(n),r=e.query;let i=3;const s=t.queries.get(r);if(s){const a=s.wa.indexOf(e);a>=0&&(s.wa.splice(a,1),s.wa.length===0?i=e.ba()?0:1:!s.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function nb(n,e){const t=ne(n);let r=!1;for(const i of e){const s=i.query,a=t.queries.get(s);if(a){for(const l of a.wa)l.Ca(i)&&(r=!0);a.ya=i}}r&&Cu(t)}function rb(n,e,t){const r=ne(n),i=r.queries.get(e);if(i)for(const s of i.wa)s.onError(t);r.queries.delete(e)}function Cu(n){n.Da.forEach(e=>{e.next()})}var Lc,Qd;(Qd=Lc||(Lc={})).Fa="default",Qd.Cache="cache";class xu{constructor(e,t,r){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=r||{}}Ca(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new ls(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const r=t!=="Offline";return(!this.options.ka||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=ls.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Lc.Cache}}/**
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
 */class jg{constructor(e){this.key=e}}class Bg{constructor(e){this.key=e}}class ib{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=de(),this.mutatedKeys=de(),this.Xa=og(e),this.eu=new Hi(this.Xa)}get tu(){return this.Ha}nu(e,t){const r=t?t.ru:new Gd,i=t?t.eu:this.eu;let s=t?t.mutatedKeys:this.mutatedKeys,a=i,l=!1;const c=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,g)=>{const m=i.get(f),I=ml(this.query,g)?g:null,k=!!m&&this.mutatedKeys.has(m.key),P=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let A=!1;m&&I?m.data.isEqual(I.data)?k!==P&&(r.track({type:3,doc:I}),A=!0):this.iu(m,I)||(r.track({type:2,doc:I}),A=!0,(c&&this.Xa(I,c)>0||h&&this.Xa(I,h)<0)&&(l=!0)):!m&&I?(r.track({type:0,doc:I}),A=!0):m&&!I&&(r.track({type:1,doc:m}),A=!0,(c||h)&&(l=!0)),A&&(I?(a=a.add(I),s=P?s.add(f):s.delete(f)):(a=a.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{eu:a,ru:r,Ds:l,mutatedKeys:s}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,i){const s=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const a=e.ru.pa();a.sort((f,g)=>function(I,k){const P=A=>{switch(A){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return Y(20277,{At:A})}};return P(I)-P(k)}(f.type,g.type)||this.Xa(f.doc,g.doc)),this.su(r),i=i!=null&&i;const l=t&&!i?this.ou():[],c=this.Za.size===0&&this.current&&!i?1:0,h=c!==this.Ya;return this.Ya=c,a.length!==0||h?{snapshot:new ls(this.query,e.eu,s,a,e.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Gd,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=de(),this.eu.forEach(r=>{this.au(r.key)&&(this.Za=this.Za.add(r.key))});const t=[];return e.forEach(r=>{this.Za.has(r)||t.push(new Bg(r))}),this.Za.forEach(r=>{e.has(r)||t.push(new jg(r))}),t}uu(e){this.Ha=e.qs,this.Za=de();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return ls.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Du="SyncEngine";class sb{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class ob{constructor(e){this.key=e,this.lu=!1}}class ab{constructor(e,t,r,i,s,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=a,this.hu={},this.Pu=new bi(l=>sg(l),gl),this.Tu=new Map,this.Iu=new Set,this.du=new Ue(G.comparator),this.Eu=new Map,this.Au=new vu,this.Ru={},this.Vu=new Map,this.mu=as.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function lb(n,e,t=!0){const r=Gg(n);let i;const s=r.Pu.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.cu()):i=await $g(r,e,t,!0),i}async function cb(n,e){const t=Gg(n);await $g(t,e,!0,!1)}async function $g(n,e,t,r){const i=await PE(n.localStore,Tn(e)),s=i.targetId,a=n.sharedClientState.addLocalQueryTarget(s,t);let l;return r&&(l=await ub(n,e,s,a==="current",i.resumeToken)),n.isPrimaryClient&&t&&Ng(n.remoteStore,i),l}async function ub(n,e,t,r,i){n.gu=(g,m,I)=>async function(P,A,x,F){let M=A.view.nu(x);M.Ds&&(M=await Bd(P.localStore,A.query,!1).then(({documents:b})=>A.view.nu(b,M)));const U=F&&F.targetChanges.get(A.targetId),H=F&&F.targetMismatches.get(A.targetId)!=null,W=A.view.applyChanges(M,P.isPrimaryClient,U,H);return Yd(P,A.targetId,W._u),W.snapshot}(n,g,m,I);const s=await Bd(n.localStore,e,!0),a=new ib(e,s.qs),l=a.nu(s.documents),c=xo.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",i),h=a.applyChanges(l,n.isPrimaryClient,c);Yd(n,t,h._u);const f=new sb(e,t,a);return n.Pu.set(e,f),n.Tu.has(t)?n.Tu.get(t).push(e):n.Tu.set(t,[e]),h.snapshot}async function hb(n,e,t){const r=ne(n),i=r.Pu.get(e),s=r.Tu.get(i.targetId);if(s.length>1)return r.Tu.set(i.targetId,s.filter(a=>!gl(a,e))),void r.Pu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Nc(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),t&&bu(r.remoteStore,i.targetId),Mc(r,i.targetId)}).catch(ws)):(Mc(r,i.targetId),await Nc(r.localStore,i.targetId,!0))}async function db(n,e){const t=ne(n),r=t.Pu.get(e),i=t.Tu.get(r.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),bu(t.remoteStore,r.targetId))}async function fb(n,e,t){const r=wb(n);try{const i=await function(a,l){const c=ne(a),h=Ve.now(),f=l.reduce((I,k)=>I.add(k.key),de());let g,m;return c.persistence.runTransaction("Locally write mutations","readwrite",I=>{let k=Zn(),P=de();return c.Os.getEntries(I,f).next(A=>{k=A,k.forEach((x,F)=>{F.isValidDocument()||(P=P.add(x))})}).next(()=>c.localDocuments.getOverlayedDocuments(I,k)).next(A=>{g=A;const x=[];for(const F of l){const M=Pw(F,g.get(F.key).overlayedDocument);M!=null&&x.push(new Ti(F.key,M,Xp(M.value.mapValue),Jn.exists(!0)))}return c.mutationQueue.addMutationBatch(I,h,x,l)}).next(A=>{m=A;const x=A.applyToLocalDocumentSet(g,P);return c.documentOverlayCache.saveOverlays(I,A.batchId,x)})}).then(()=>({batchId:m.batchId,changes:lg(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(a,l,c){let h=a.Ru[a.currentUser.toKey()];h||(h=new Ue(ae)),h=h.insert(l,c),a.Ru[a.currentUser.toKey()]=h}(r,i.batchId,t),await Vo(r,i.changes),await bl(r.remoteStore)}catch(i){const s=Ru(i,"Failed to persist write");t.reject(s)}}async function qg(n,e){const t=ne(n);try{const r=await SE(t.localStore,e);e.targetChanges.forEach((i,s)=>{const a=t.Eu.get(s);a&&(Te(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?a.lu=!0:i.modifiedDocuments.size>0?Te(a.lu,14607):i.removedDocuments.size>0&&(Te(a.lu,42227),a.lu=!1))}),await Vo(t,r,e)}catch(r){await ws(r)}}function Jd(n,e,t){const r=ne(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const i=[];r.Pu.forEach((s,a)=>{const l=a.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(a,l){const c=ne(a);c.onlineState=l;let h=!1;c.queries.forEach((f,g)=>{for(const m of g.wa)m.va(l)&&(h=!0)}),h&&Cu(c)}(r.eventManager,e),i.length&&r.hu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function pb(n,e,t){const r=ne(n);r.sharedClientState.updateQueryState(e,"rejected",t);const i=r.Eu.get(e),s=i&&i.key;if(s){let a=new Ue(G.comparator);a=a.insert(s,At.newNoDocument(s,te.min()));const l=de().add(s),c=new yl(te.min(),new Map,new Ue(ae),a,l);await qg(r,c),r.du=r.du.remove(s),r.Eu.delete(e),Vu(r)}else await Nc(r.localStore,e,!1).then(()=>Mc(r,e,t)).catch(ws)}async function gb(n,e){const t=ne(n),r=e.batch.batchId;try{const i=await AE(t.localStore,e);Hg(t,r,null),zg(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await Vo(t,i)}catch(i){await ws(i)}}async function mb(n,e,t){const r=ne(n);try{const i=await function(a,l){const c=ne(a);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return c.mutationQueue.lookupMutationBatch(h,l).next(g=>(Te(g!==null,37113),f=g.keys(),c.mutationQueue.removeMutationBatch(h,g))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>c.localDocuments.getDocuments(h,f))})}(r.localStore,e);Hg(r,e,t),zg(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await Vo(r,i)}catch(i){await ws(i)}}function zg(n,e){(n.Vu.get(e)||[]).forEach(t=>{t.resolve()}),n.Vu.delete(e)}function Hg(n,e,t){const r=ne(n);let i=r.Ru[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(t?s.reject(t):s.resolve(),i=i.remove(e)),r.Ru[r.currentUser.toKey()]=i}}function Mc(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Tu.get(e))n.Pu.delete(r),t&&n.hu.pu(r,t);n.Tu.delete(e),n.isPrimaryClient&&n.Au.zr(e).forEach(r=>{n.Au.containsKey(r)||Wg(n,r)})}function Wg(n,e){n.Iu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(bu(n.remoteStore,t),n.du=n.du.remove(e),n.Eu.delete(t),Vu(n))}function Yd(n,e,t){for(const r of t)r instanceof jg?(n.Au.addReference(r.key,e),_b(n,r)):r instanceof Bg?(q(Du,"Document no longer in limbo: "+r.key),n.Au.removeReference(r.key,e),n.Au.containsKey(r.key)||Wg(n,r.key)):Y(19791,{yu:r})}function _b(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Iu.has(r)||(q(Du,"New document in limbo: "+t),n.Iu.add(r),Vu(n))}function Vu(n){for(;n.Iu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Iu.values().next().value;n.Iu.delete(e);const t=new G(De.fromString(e)),r=n.mu.next();n.Eu.set(r,new ob(t)),n.du=n.du.insert(t,r),Ng(n.remoteStore,new br(Tn(pl(t.path)),r,"TargetPurposeLimboResolution",ul.ue))}}async function Vo(n,e,t){const r=ne(n),i=[],s=[],a=[];r.Pu.isEmpty()||(r.Pu.forEach((l,c)=>{a.push(r.gu(c,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const g=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(c.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(c.targetId,g?"current":"not-current")}if(h){i.push(h);const g=wu.Es(c.targetId,h);s.push(g)}}))}),await Promise.all(a),r.hu.J_(i),await async function(c,h){const f=ne(c);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>O.forEach(h,m=>O.forEach(m.Is,I=>f.persistence.referenceDelegate.addReference(g,m.targetId,I)).next(()=>O.forEach(m.ds,I=>f.persistence.referenceDelegate.removeReference(g,m.targetId,I)))))}catch(g){if(!Es(g))throw g;q(Eu,"Failed to update sequence numbers: "+g)}for(const g of h){const m=g.targetId;if(!g.fromCache){const I=f.Fs.get(m),k=I.snapshotVersion,P=I.withLastLimboFreeSnapshotVersion(k);f.Fs=f.Fs.insert(m,P)}}}(r.localStore,s))}async function vb(n,e){const t=ne(n);if(!t.currentUser.isEqual(e)){q(Du,"User change. New user:",e.toKey());const r=await Cg(t.localStore,e);t.currentUser=e,function(s,a){s.Vu.forEach(l=>{l.forEach(c=>{c.reject(new z(L.CANCELLED,a))})}),s.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Vo(t,r.Bs)}}function yb(n,e){const t=ne(n),r=t.Eu.get(e);if(r&&r.lu)return de().add(r.key);{let i=de();const s=t.Tu.get(e);if(!s)return i;for(const a of s){const l=t.Pu.get(a);i=i.unionWith(l.view.tu)}return i}}function Gg(n){const e=ne(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=qg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=yb.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=pb.bind(null,e),e.hu.J_=nb.bind(null,e.eventManager),e.hu.pu=rb.bind(null,e.eventManager),e}function wb(n){const e=ne(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=gb.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=mb.bind(null,e),e}class Ha{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=wl(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return IE(this.persistence,new EE,e.initialUser,this.serializer)}Du(e){return new Pg(yu.Vi,this.serializer)}bu(e){return new xE}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ha.provider={build:()=>new Ha};class Eb extends Ha{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){Te(this.persistence.referenceDelegate instanceof qa,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new oE(r,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?Ot.withCacheSize(this.cacheSizeBytes):Ot.DEFAULT;return new Pg(r=>qa.Vi(r,t),this.serializer)}}class Fc{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Jd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=vb.bind(null,this.syncEngine),await ZE(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new tb}()}createDatastore(e){const t=wl(e.databaseInfo.databaseId),r=function(s){return new LE(s)}(e.databaseInfo);return function(s,a,l,c){return new jE(s,a,l,c)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,i,s,a,l){return new $E(r,i,s,a,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Jd(this.syncEngine,t,0),function(){return zd.C()?new zd:new DE}())}createSyncEngine(e,t){return function(i,s,a,l,c,h,f){const g=new ab(i,s,a,l,c,h);return f&&(g.fu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const s=ne(i);q(mi,"RemoteStore shutting down."),s.Ia.add(5),await Do(s),s.Ea.shutdown(),s.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Fc.provider={build:()=>new Fc};/**
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
 */class Nu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):Xn("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Fr="FirestoreClient";class bb{constructor(e,t,r,i,s){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=i,this.user=It.UNAUTHENTICATED,this.clientId=au.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async a=>{q(Fr,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(q(Fr,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Qn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Ru(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function ec(n,e){n.asyncQueue.verifyOperationInProgress(),q(Fr,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async i=>{r.isEqual(i)||(await Cg(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>{Dr("Terminating Firestore due to IndexedDb database deletion"),n.terminate().then(()=>{q("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{Dr("Terminating Firestore due to IndexedDb database deletion failed",i)})}),n._offlineComponents=e}async function Xd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Tb(n);q(Fr,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Wd(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,i)=>Wd(e.remoteStore,i)),n._onlineComponents=e}async function Tb(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){q(Fr,"Using user provided OfflineComponentProvider");try{await ec(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===L.FAILED_PRECONDITION||i.code===L.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Dr("Error using user provided cache. Falling back to memory cache: "+t),await ec(n,new Ha)}}else q(Fr,"Using default OfflineComponentProvider"),await ec(n,new Eb(void 0));return n._offlineComponents}async function Kg(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(q(Fr,"Using user provided OnlineComponentProvider"),await Xd(n,n._uninitializedComponentsProvider._online)):(q(Fr,"Using default OnlineComponentProvider"),await Xd(n,new Fc))),n._onlineComponents}function Ib(n){return Kg(n).then(e=>e.syncEngine)}async function Wa(n){const e=await Kg(n),t=e.eventManager;return t.onListen=lb.bind(null,e.syncEngine),t.onUnlisten=hb.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=cb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=db.bind(null,e.syncEngine),t}function Ab(n,e,t={}){const r=new Qn;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,l,c,h){const f=new Nu({next:m=>{f.Ou(),a.enqueueAndForget(()=>Pu(s,g));const I=m.docs.has(l);!I&&m.fromCache?h.reject(new z(L.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&m.fromCache&&c&&c.source==="server"?h.reject(new z(L.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),g=new xu(pl(l.path),f,{includeMetadataChanges:!0,ka:!0});return ku(s,g)}(await Wa(n),n.asyncQueue,e,t,r)),r.promise}function Sb(n,e,t={}){const r=new Qn;return n.asyncQueue.enqueueAndForget(async()=>function(s,a,l,c,h){const f=new Nu({next:m=>{f.Ou(),a.enqueueAndForget(()=>Pu(s,g)),m.fromCache&&c.source==="server"?h.reject(new z(L.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(m)},error:m=>h.reject(m)}),g=new xu(l,f,{includeMetadataChanges:!0,ka:!0});return ku(s,g)}(await Wa(n),n.asyncQueue,e,t,r)),r.promise}/**
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
 */const Jg="firestore.googleapis.com",ef=!0;class tf{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new z(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Jg,this.ssl=ef}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:ef;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=kg;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<iE)throw new z(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}$0("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Qg((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new z(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new z(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new z(L.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Tl{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new tf({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new z(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new z(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new tf(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new V0;switch(r.type){case"firstParty":return new M0(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new z(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Zd.get(t);r&&(q("ComponentProvider","Removing Datastore"),Zd.delete(t),r.terminate())}(this),Promise.resolve()}}function Rb(n,e,t,r={}){var i;n=bn(n,Tl);const s=_s(e),a=n._getSettings(),l=Object.assign(Object.assign({},a),{emulatorOptions:n._getEmulatorOptions()}),c=`${e}:${t}`;s&&(Ip(`https://${c}`),Ap("Firestore",!0)),a.host!==Jg&&a.host!==c&&Dr("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h=Object.assign(Object.assign({},a),{host:c,ssl:s,emulatorOptions:r});if(!fi(h,l)&&(n._setSettings(h),r.mockUserToken)){let f,g;if(typeof r.mockUserToken=="string")f=r.mockUserToken,g=It.MOCK_USER;else{f=iy(r.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new z(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new It(m)}n._authCredentials=new N0(new Up(f,g))}}/**
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
 */class No{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new No(this.firestore,e,this._query)}}class Ze{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Pr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ze(this.firestore,e,this._key)}toJSON(){return{type:Ze._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Po(t,Ze._jsonSchema))return new Ze(e,r||null,new G(De.fromString(t.referencePath)))}}Ze._jsonSchemaVersion="firestore/documentReference/1.0",Ze._jsonSchema={type:Xe("string",Ze._jsonSchemaVersion),referencePath:Xe("string")};class Pr extends No{constructor(e,t,r){super(e,t,pl(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ze(this.firestore,null,new G(e))}withConverter(e){return new Pr(this.firestore,e,this._path)}}function _o(n,e,...t){if(n=Rt(n),Bp("collection","path",e),n instanceof Tl){const r=De.fromString(e,...t);return gd(r),new Pr(n,null,r)}{if(!(n instanceof Ze||n instanceof Pr))throw new z(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(De.fromString(e,...t));return gd(r),new Pr(n.firestore,null,r)}}function un(n,e,...t){if(n=Rt(n),arguments.length===1&&(e=au.newId()),Bp("doc","path",e),n instanceof Tl){const r=De.fromString(e,...t);return pd(r),new Ze(n,null,new G(r))}{if(!(n instanceof Ze||n instanceof Pr))throw new z(L.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(De.fromString(e,...t));return pd(r),new Ze(n.firestore,n instanceof Pr?n.converter:null,new G(r))}}/**
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
 */const nf="AsyncQueue";class rf{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Dg(this,"async_queue_retry"),this.oc=()=>{const r=Zl();r&&q(nf,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const t=Zl();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Zl();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new Qn;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!Es(e))throw e;q(nf,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,Xn("INTERNAL UNHANDLED ERROR: ",sf(r)),r}).then(r=>(this.nc=!1,r))));return this._c=t,t}enqueueAfterDelay(e,t,r){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const i=Su.createAndSchedule(this,e,t,r,s=>this.lc(s));return this.ec.push(i),i}ac(){this.tc&&Y(47125,{hc:sf(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function sf(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
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
 */function of(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const i=t;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(n,["next","error","complete"])}class cs extends Tl{constructor(e,t,r,i){super(e,t,r,i),this.type="firestore",this._queue=new rf,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new rf(e),this._firestoreClient=void 0,await e}}}function Yg(n,e){const t=typeof n=="object"?n:Pp(),r=typeof n=="string"?n:La,i=su(t,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=ny("firestore");s&&Rb(i,...s)}return i}function Il(n){if(n._terminated)throw new z(L.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||kb(n),n._firestoreClient}function kb(n){var e,t,r;const i=n._freezeSettings(),s=function(l,c,h,f){return new Z0(l,c,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Qg(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=i.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new bb(n._authCredentials,n._appCheckCredentials,n._queue,s,n._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(n._componentsProvider))}/**
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
 */class Xt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Xt(yt.fromBase64String(e))}catch(t){throw new z(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Xt(yt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Xt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Po(e,Xt._jsonSchema))return Xt.fromBase64String(e.bytes)}}Xt._jsonSchemaVersion="firestore/bytes/1.0",Xt._jsonSchema={type:Xe("string",Xt._jsonSchemaVersion),bytes:Xe("string")};/**
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
 */class Ou{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new z(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new pt(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class An{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new z(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new z(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ae(this._lat,e._lat)||ae(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:An._jsonSchemaVersion}}static fromJSON(e){if(Po(e,An._jsonSchema))return new An(e.latitude,e.longitude)}}An._jsonSchemaVersion="firestore/geoPoint/1.0",An._jsonSchema={type:Xe("string",An._jsonSchemaVersion),latitude:Xe("number"),longitude:Xe("number")};/**
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
 */class Sn{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:Sn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Po(e,Sn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new Sn(e.vectorValues);throw new z(L.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Sn._jsonSchemaVersion="firestore/vectorValue/1.0",Sn._jsonSchema={type:Xe("string",Sn._jsonSchemaVersion),vectorValues:Xe("object")};/**
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
 */const Pb=/^__.*__$/;class Cb{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ti(e,this.data,this.fieldMask,t,this.fieldTransforms):new Co(e,this.data,t,this.fieldTransforms)}}function Zg(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw Y(40011,{Ec:n})}}class Lu{constructor(e,t,r,i,s,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.Ac(),this.fieldTransforms=s||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new Lu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.fc(e),i}gc(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:r,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Ga(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Zg(this.Ec)&&Pb.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class xb{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||wl(e)}Dc(e,t,r,i=!1){return new Lu({Ec:e,methodName:t,bc:r,path:pt.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Db(n){const e=n._freezeSettings(),t=wl(n._databaseId);return new xb(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Vb(n,e,t,r,i,s={}){const a=n.Dc(s.merge||s.mergeFields?2:0,e,t,i);rm("Data must be an object, but it was:",a,r);const l=tm(r,a);let c,h;if(s.merge)c=new ln(a.fieldMask),h=a.fieldTransforms;else if(s.mergeFields){const f=[];for(const g of s.mergeFields){const m=Nb(e,g,t);if(!a.contains(m))throw new z(L.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Lb(f,m)||f.push(m)}c=new ln(f),h=a.fieldTransforms.filter(g=>c.covers(g.field))}else c=null,h=a.fieldTransforms;return new Cb(new Yt(l),c,h)}function em(n,e){if(nm(n=Rt(n)))return rm("Unsupported field value:",e,n),tm(n,e);if(n instanceof Xg)return function(r,i){if(!Zg(i.Ec))throw i.wc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(r,i){const s=[];let a=0;for(const l of r){let c=em(l,i.yc(a));c==null&&(c={nullValue:"NULL_VALUE"}),s.push(c),a++}return{arrayValue:{values:s}}}(n,e)}return function(r,i){if((r=Rt(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Tw(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=Ve.fromDate(r);return{timestampValue:$a(i.serializer,s)}}if(r instanceof Ve){const s=new Ve(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:$a(i.serializer,s)}}if(r instanceof An)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Xt)return{bytesValue:Eg(i.serializer,r._byteString)};if(r instanceof Ze){const s=i.databaseId,a=r.firestore._databaseId;if(!a.isEqual(s))throw i.wc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:_u(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Sn)return function(a,l){return{mapValue:{fields:{[Jp]:{stringValue:Yp},[Ma]:{arrayValue:{values:a.toArray().map(h=>{if(typeof h!="number")throw l.wc("VectorValues must only contain numeric values.");return pu(l.serializer,h)})}}}}}}(r,i);throw i.wc(`Unsupported field value: ${lu(r)}`)}(n,e)}function tm(n,e){const t={};return zp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Ei(n,(r,i)=>{const s=em(i,e.Vc(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function nm(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Ve||n instanceof An||n instanceof Xt||n instanceof Ze||n instanceof Xg||n instanceof Sn)}function rm(n,e,t){if(!nm(t)||!$p(t)){const r=lu(t);throw r==="an object"?e.wc(n+" a custom object"):e.wc(n+" "+r)}}function Nb(n,e,t){if((e=Rt(e))instanceof Ou)return e._internalPath;if(typeof e=="string")return im(n,e);throw Ga("Field path arguments must be of type string or ",n,!1,void 0,t)}const Ob=new RegExp("[~\\*/\\[\\]]");function im(n,e,t){if(e.search(Ob)>=0)throw Ga(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ou(...e.split("."))._internalPath}catch{throw Ga(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ga(n,e,t,r,i){const s=r&&!r.isEmpty(),a=i!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(s||a)&&(c+=" (found",s&&(c+=` in field ${r}`),a&&(c+=` in document ${i}`),c+=")"),new z(L.INVALID_ARGUMENT,l+n+c)}function Lb(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class sm{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ze(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Mb(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(om("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Mb extends sm{data(){return super.data()}}function om(n,e){return typeof e=="string"?im(n,e):e instanceof Ou?e._internalPath:e._delegate._internalPath}/**
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
 */function am(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new z(L.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Fb{convertValue(e,t="none"){switch(Lr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Ke(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Or(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw Y(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Ei(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){var t,r,i;const s=(i=(r=(t=e.fields)===null||t===void 0?void 0:t[Ma].arrayValue)===null||r===void 0?void 0:r.values)===null||i===void 0?void 0:i.map(a=>Ke(a.doubleValue));return new Sn(s)}convertGeoPoint(e){return new An(Ke(e.latitude),Ke(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=dl(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(ho(e));default:return null}}convertTimestamp(e){const t=Nr(e);return new Ve(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=De.fromString(e);Te(Rg(r),9688,{name:e});const i=new fo(r.get(1),r.get(3)),s=new G(r.popFirst(5));return i.isEqual(t)||Xn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}}/**
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
 */function Ub(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Js{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ai extends sm{constructor(e,t,r,i,s,a){super(e,t,r,i,a),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Ta(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(om("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new z(L.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ai._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}ai._jsonSchemaVersion="firestore/documentSnapshot/1.0",ai._jsonSchema={type:Xe("string",ai._jsonSchemaVersion),bundleSource:Xe("string","DocumentSnapshot"),bundleName:Xe("string"),bundle:Xe("string")};class Ta extends ai{data(e={}){return super.data(e)}}class li{constructor(e,t,r,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Js(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Ta(this._firestore,this._userDataWriter,r.key,r,new Js(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new z(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let a=0;return i._snapshot.docChanges.map(l=>{const c=new Ta(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Js(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:a++}})}{let a=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const c=new Ta(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Js(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return l.type!==0&&(h=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),f=a.indexOf(l.doc.key)),{type:jb(l.type),doc:c,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new z(L.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=li._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=au.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(t.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function jb(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Y(61501,{type:n})}}/**
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
 */function af(n){n=bn(n,Ze);const e=bn(n.firestore,cs);return Ab(Il(e),n._key).then(t=>lm(e,n,t))}li._jsonSchemaVersion="firestore/querySnapshot/1.0",li._jsonSchema={type:Xe("string",li._jsonSchemaVersion),bundleSource:Xe("string","QuerySnapshot"),bundleName:Xe("string"),bundle:Xe("string")};class Mu extends Fb{constructor(e){super(),this.firestore=e}convertBytes(e){return new Xt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ze(this.firestore,null,t)}}function vo(n){n=bn(n,No);const e=bn(n.firestore,cs),t=Il(e),r=new Mu(e);return am(n._query),Sb(t,n._query).then(i=>new li(e,r,n,i))}function Oo(n,e,t){n=bn(n,Ze);const r=bn(n.firestore,cs),i=Ub(n.converter,e);return Bb(r,[Vb(Db(r),"setDoc",n._key,i,n.converter!==null,t).toMutation(n._key,Jn.none())])}function Al(n,...e){var t,r,i;n=Rt(n);let s={includeMetadataChanges:!1,source:"default"},a=0;typeof e[a]!="object"||of(e[a])||(s=e[a++]);const l={includeMetadataChanges:s.includeMetadataChanges,source:s.source};if(of(e[a])){const g=e[a];e[a]=(t=g.next)===null||t===void 0?void 0:t.bind(g),e[a+1]=(r=g.error)===null||r===void 0?void 0:r.bind(g),e[a+2]=(i=g.complete)===null||i===void 0?void 0:i.bind(g)}let c,h,f;if(n instanceof Ze)h=bn(n.firestore,cs),f=pl(n._key.path),c={next:g=>{e[a]&&e[a](lm(h,n,g))},error:e[a+1],complete:e[a+2]};else{const g=bn(n,No);h=bn(g.firestore,cs),f=g._query;const m=new Mu(h);c={next:I=>{e[a]&&e[a](new li(h,m,g,I))},error:e[a+1],complete:e[a+2]},am(n._query)}return function(m,I,k,P){const A=new Nu(P),x=new xu(I,A,k);return m.asyncQueue.enqueueAndForget(async()=>ku(await Wa(m),x)),()=>{A.Ou(),m.asyncQueue.enqueueAndForget(async()=>Pu(await Wa(m),x))}}(Il(h),f,l,c)}function Bb(n,e){return function(r,i){const s=new Qn;return r.asyncQueue.enqueueAndForget(async()=>fb(await Ib(r),i,s)),s.promise}(Il(n),e)}function lm(n,e,t){const r=t.docs.get(e._key),i=new Mu(n);return new ai(n,i,e._key,r,new Js(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(i){ys=i})(vs),rs(new pi("firestore",(r,{instanceIdentifier:i,options:s})=>{const a=r.getProvider("app").getImmediate(),l=new cs(new O0(r.getProvider("auth-internal")),new F0(a,r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new z(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new fo(h.options.projectId,f)}(a,i),a);return s=Object.assign({useFetchStreams:t},s),l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),Rr(cd,ud,e),Rr(cd,ud,"esm2017")})();function Fu(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,r=Object.getOwnPropertySymbols(n);i<r.length;i++)e.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(n,r[i])&&(t[r[i]]=n[r[i]]);return t}function cm(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const $b=cm,um=new Ro("auth","Firebase",cm());/**
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
 */const Ka=new ru("@firebase/auth");function qb(n,...e){Ka.logLevel<=ue.WARN&&Ka.warn(`Auth (${vs}): ${n}`,...e)}function Ia(n,...e){Ka.logLevel<=ue.ERROR&&Ka.error(`Auth (${vs}): ${n}`,...e)}/**
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
 */function fn(n,...e){throw Uu(n,...e)}function Rn(n,...e){return Uu(n,...e)}function hm(n,e,t){const r=Object.assign(Object.assign({},$b()),{[e]:t});return new Ro("auth","Firebase",r).create(e,{appName:n.name})}function Cr(n){return hm(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Uu(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return um.create(n,...e)}function J(n,e,...t){if(!n)throw Uu(e,...t)}function qn(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Ia(e),new Error(e)}function er(n,e){n||qn(e)}/**
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
 */function Uc(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function zb(){return lf()==="http:"||lf()==="https:"}function lf(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Hb(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(zb()||uy()||"connection"in navigator)?navigator.onLine:!0}function Wb(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class Lo{constructor(e,t){this.shortDelay=e,this.longDelay=t,er(t>e,"Short delay should be less than long delay!"),this.isMobile=ay()||hy()}get(){return Hb()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function ju(n,e){er(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class dm{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;qn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;qn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;qn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Gb={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Kb=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Qb=new Lo(3e4,6e4);function Ur(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function or(n,e,t,r,i={}){return fm(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const l=ko(Object.assign({key:n.config.apiKey},a)).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:c},s);return cy()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&_s(n.emulatorConfig.host)&&(h.credentials="include"),dm.fetch()(await pm(n,n.config.apiHost,t,l),h)})}async function fm(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},Gb),e);try{const i=new Yb(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw fa(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const l=s.ok?a.errorMessage:a.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw fa(n,"credential-already-in-use",a);if(c==="EMAIL_EXISTS")throw fa(n,"email-already-in-use",a);if(c==="USER_DISABLED")throw fa(n,"user-disabled",a);const f=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw hm(n,f,h);fn(n,f)}}catch(i){if(i instanceof sr)throw i;fn(n,"network-request-failed",{message:String(i)})}}async function Sl(n,e,t,r,i={}){const s=await or(n,e,t,r,i);return"mfaPendingCredential"in s&&fn(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function pm(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?ju(n.config,i):`${n.config.apiScheme}://${i}`;return Kb.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function Jb(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Yb{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(Rn(this.auth,"network-request-failed")),Qb.get())})}}function fa(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=Rn(n,e,r);return i.customData._tokenResponse=t,i}function cf(n){return n!==void 0&&n.enterprise!==void 0}class Xb{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Jb(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Zb(n,e){return or(n,"GET","/v2/recaptchaConfig",Ur(n,e))}/**
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
 */async function eT(n,e){return or(n,"POST","/v1/accounts:delete",e)}async function Qa(n,e){return or(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function io(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function tT(n,e=!1){const t=Rt(n),r=await t.getIdToken(e),i=Bu(r);J(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:io(tc(i.auth_time)),issuedAtTime:io(tc(i.iat)),expirationTime:io(tc(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function tc(n){return Number(n)*1e3}function Bu(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ia("JWT malformed, contained fewer than 3 sections"),null;try{const i=wp(t);return i?JSON.parse(i):(Ia("Failed to decode base64 JWT payload"),null)}catch(i){return Ia("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function uf(n){const e=Bu(n);return J(e,"internal-error"),J(typeof e.exp<"u","internal-error"),J(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function yo(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof sr&&nT(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function nT({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class jc{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=io(this.lastLoginAt),this.creationTime=io(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Ja(n){var e;const t=n.auth,r=await n.getIdToken(),i=await yo(n,Qa(t,{idToken:r}));J(i==null?void 0:i.users.length,t,"internal-error");const s=i.users[0];n._notifyReloadListener(s);const a=!((e=s.providerUserInfo)===null||e===void 0)&&e.length?gm(s.providerUserInfo):[],l=sT(n.providerData,a),c=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!(l!=null&&l.length),f=c?h:!1,g={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:l,metadata:new jc(s.createdAt,s.lastLoginAt),isAnonymous:f};Object.assign(n,g)}async function iT(n){const e=Rt(n);await Ja(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function sT(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function gm(n){return n.map(e=>{var{providerId:t}=e,r=Fu(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function oT(n,e){const t=await fm(n,{},async()=>{const r=ko({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await pm(n,i,"/v1/token",`key=${s}`),l=await n._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:r};return n.emulatorConfig&&_s(n.emulatorConfig.host)&&(c.credentials="include"),dm.fetch()(a,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function aT(n,e){return or(n,"POST","/v2/accounts:revokeToken",Ur(n,e))}/**
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
 */class Wi{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){J(e.idToken,"internal-error"),J(typeof e.idToken<"u","internal-error"),J(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):uf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){J(e.length!==0,"internal-error");const t=uf(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(J(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await oT(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new Wi;return r&&(J(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(J(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(J(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Wi,this.toJSON())}_performRefresh(){return qn("not implemented")}}/**
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
 */function fr(n,e){J(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class cn{constructor(e){var{uid:t,auth:r,stsTokenManager:i}=e,s=Fu(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new rT(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=i,this.accessToken=i.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new jc(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await yo(this,this.stsTokenManager.getToken(this.auth,e));return J(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return tT(this,e)}reload(){return iT(this)}_assign(e){this!==e&&(J(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new cn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){J(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Ja(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(an(this.auth.app))return Promise.reject(Cr(this.auth));const e=await this.getIdToken();return await yo(this,eT(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,i,s,a,l,c,h,f;const g=(r=t.displayName)!==null&&r!==void 0?r:void 0,m=(i=t.email)!==null&&i!==void 0?i:void 0,I=(s=t.phoneNumber)!==null&&s!==void 0?s:void 0,k=(a=t.photoURL)!==null&&a!==void 0?a:void 0,P=(l=t.tenantId)!==null&&l!==void 0?l:void 0,A=(c=t._redirectEventId)!==null&&c!==void 0?c:void 0,x=(h=t.createdAt)!==null&&h!==void 0?h:void 0,F=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:M,emailVerified:U,isAnonymous:H,providerData:W,stsTokenManager:b}=t;J(M&&b,e,"internal-error");const _=Wi.fromJSON(this.name,b);J(typeof M=="string",e,"internal-error"),fr(g,e.name),fr(m,e.name),J(typeof U=="boolean",e,"internal-error"),J(typeof H=="boolean",e,"internal-error"),fr(I,e.name),fr(k,e.name),fr(P,e.name),fr(A,e.name),fr(x,e.name),fr(F,e.name);const y=new cn({uid:M,auth:e,email:m,emailVerified:U,displayName:g,isAnonymous:H,photoURL:k,phoneNumber:I,tenantId:P,stsTokenManager:_,createdAt:x,lastLoginAt:F});return W&&Array.isArray(W)&&(y.providerData=W.map(v=>Object.assign({},v))),A&&(y._redirectEventId=A),y}static async _fromIdTokenResponse(e,t,r=!1){const i=new Wi;i.updateFromServerResponse(t);const s=new cn({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ja(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];J(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?gm(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new Wi;l.updateFromIdToken(r);const c=new cn({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:a}),h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new jc(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(c,h),c}}/**
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
 */const hf=new Map;function zn(n){er(n instanceof Function,"Expected a class definition");let e=hf.get(n);return e?(er(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,hf.set(n,e),e)}/**
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
 */function Aa(n,e,t){return`firebase:${n}:${e}:${t}`}class Gi{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Aa(this.userKey,i.apiKey,s),this.fullPersistenceKey=Aa("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Qa(this.auth,{idToken:e}).catch(()=>{});return t?cn._fromGetAccountInfoResponse(this.auth,t,e):null}return cn._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Gi(zn(df),e,r);const i=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let s=i[0]||zn(df);const a=Aa(r,e.config.apiKey,e.name);let l=null;for(const h of t)try{const f=await h._get(a);if(f){let g;if(typeof f=="string"){const m=await Qa(e,{idToken:f}).catch(()=>{});if(!m)break;g=await cn._fromGetAccountInfoResponse(e,m,f)}else g=cn._fromJSON(e,f);h!==s&&(l=g),s=h;break}}catch{}const c=i.filter(h=>h._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new Gi(s,e,r):(s=c[0],l&&await s._set(a,l.toJSON()),await Promise.all(t.map(async h=>{if(h!==s)try{await h._remove(a)}catch{}})),new Gi(s,e,r))}}/**
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
 */function ff(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(wm(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(_m(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(bm(e))return"Blackberry";if(Tm(e))return"Webos";if(vm(e))return"Safari";if((e.includes("chrome/")||ym(e))&&!e.includes("edge/"))return"Chrome";if(Em(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function _m(n=St()){return/firefox\//i.test(n)}function vm(n=St()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ym(n=St()){return/crios\//i.test(n)}function wm(n=St()){return/iemobile/i.test(n)}function Em(n=St()){return/android/i.test(n)}function bm(n=St()){return/blackberry/i.test(n)}function Tm(n=St()){return/webos/i.test(n)}function $u(n=St()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function lT(n=St()){var e;return $u(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function cT(){return dy()&&document.documentMode===10}function Im(n=St()){return $u(n)||Em(n)||Tm(n)||bm(n)||/windows phone/i.test(n)||wm(n)}/**
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
 */function Am(n,e=[]){let t;switch(n){case"Browser":t=ff(St());break;case"Worker":t=`${ff(St())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${vs}/${r}`}/**
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
 */async function hT(n,e={}){return or(n,"GET","/v2/passwordPolicy",Ur(n,e))}/**
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
 */class pT{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new pf(this),this.idTokenSubscription=new pf(this),this.beforeStateQueue=new uT(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=um,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=zn(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Gi.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((i=this._popupRedirectResolver)===null||i===void 0)&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Qa(this,{idToken:e}),r=await cn._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(an(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let i=r,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,l=i==null?void 0:i._redirectEventId,c=await this.tryRedirectSignIn(e);(!a||a===l)&&(c!=null&&c.user)&&(i=c.user,s=!0)}if(!i)return this.directlySetCurrentUser(null);if(!i._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(i)}catch(a){i=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return i?this.reloadAndSetCurrentUserOrClear(i):this.directlySetCurrentUser(null)}return J(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===i._redirectEventId?this.directlySetCurrentUser(i):this.reloadAndSetCurrentUserOrClear(i)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Ja(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Wb()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(an(this.app))return Promise.reject(Cr(this));const t=e?Rt(e):null;return t&&J(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&J(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return an(this.app)?Promise.reject(Cr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return an(this.app)?Promise.reject(Cr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(zn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await hT(this),t=new fT(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ro("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await aT(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&zn(e)||this._popupRedirectResolver;J(t,this,"argument-error"),this.redirectPersistenceManager=await Gi.create(this,[zn(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(J(l,this,"internal-error"),l.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const c=e.addObserver(t,r,i);return()=>{a=!0,c()}}else{const c=e.addObserver(t);return()=>{a=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return J(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Am(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const i=await this._getAppCheckToken();return i&&(t["X-Firebase-AppCheck"]=i),t}async _getAppCheckToken(){var e;if(an(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&qb(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Ai(n){return Rt(n)}class pf{constructor(e){this.auth=e,this.observer=null,this.addObserver=wy(t=>this.observer=t)}get next(){return J(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let Rl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function gT(n){Rl=n}function Sm(n){return Rl.loadJS(n)}function mT(){return Rl.recaptchaEnterpriseScript}function _T(){return Rl.gapiScript}function vT(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class yT{constructor(){this.enterprise=new wT}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class wT{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const ET="recaptcha-enterprise",Rm="NO_RECAPTCHA";class bT{constructor(e){this.type=ET,this.auth=Ai(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,l)=>{Zb(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)l(new Error("recaptcha Enterprise site key undefined"));else{const h=new Xb(c);return s.tenantId==null?s._agentRecaptchaConfig=h:s._tenantRecaptchaConfigs[s.tenantId]=h,a(h.siteKey)}}).catch(c=>{l(c)})})}function i(s,a,l){const c=window.grecaptcha;cf(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(h=>{a(h)}).catch(()=>{a(Rm)})}):l(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new yT().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(l=>{if(!t&&cf(window.grecaptcha))i(l,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let c=mT();c.length!==0&&(c+=l),Sm(c).then(()=>{i(l,s,a)}).catch(h=>{a(h)})}}).catch(l=>{a(l)})})}}async function gf(n,e,t,r=!1,i=!1){const s=new bT(n);let a;if(i)a=Rm;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const l=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in l){const c=l.phoneEnrollmentInfo.phoneNumber,h=l.phoneEnrollmentInfo.recaptchaToken;Object.assign(l,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:h,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in l){const c=l.phoneSignInInfo.recaptchaToken;Object.assign(l,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return l}return r?Object.assign(l,{captchaResp:a}):Object.assign(l,{captchaResponse:a}),Object.assign(l,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(l,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),l}async function Bc(n,e,t,r,i){var s;if(!((s=n._getRecaptchaConfig())===null||s===void 0)&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await gf(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const l=await gf(n,e,t,t==="getOobCode");return r(n,l)}else return Promise.reject(a)})}/**
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
 */function TT(n,e){const t=su(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(fi(s,e??{}))return i;fn(i,"already-initialized")}return t.initialize({options:e})}function IT(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(zn);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function AT(n,e,t){const r=Ai(n);J(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=km(e),{host:a,port:l}=ST(e),c=l===null?"":`:${l}`,h={url:`${s}//${a}${c}/`},f=Object.freeze({host:a,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){J(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),J(fi(h,r.config.emulator)&&fi(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,_s(a)?(Ip(`${s}//${a}${c}`),Ap("Auth",!0)):RT()}function km(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function ST(n){const e=km(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:mf(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:mf(a)}}}function mf(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function RT(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class qu{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return qn("not implemented")}_getIdTokenResponse(e){return qn("not implemented")}_linkToIdToken(e,t){return qn("not implemented")}_getReauthenticationResolver(e){return qn("not implemented")}}async function kT(n,e){return or(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function PT(n,e){return Sl(n,"POST","/v1/accounts:signInWithPassword",Ur(n,e))}async function CT(n,e){return or(n,"POST","/v1/accounts:sendOobCode",Ur(n,e))}async function xT(n,e){return CT(n,e)}/**
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
 */async function DT(n,e){return Sl(n,"POST","/v1/accounts:signInWithEmailLink",Ur(n,e))}async function VT(n,e){return Sl(n,"POST","/v1/accounts:signInWithEmailLink",Ur(n,e))}/**
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
 */class wo extends qu{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new wo(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new wo(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Bc(e,t,"signInWithPassword",PT);case"emailLink":return DT(e,{email:this._email,oobCode:this._password});default:fn(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Bc(e,r,"signUpPassword",kT);case"emailLink":return VT(e,{idToken:t,email:this._email,oobCode:this._password});default:fn(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function Ki(n,e){return Sl(n,"POST","/v1/accounts:signInWithIdp",Ur(n,e))}/**
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
 */const NT="http://localhost";class _i extends qu{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new _i(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):fn("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i}=t,s=Fu(t,["providerId","signInMethod"]);if(!r||!i)return null;const a=new _i(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return Ki(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Ki(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ki(e,t)}buildRequest(){const e={requestUri:NT,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=ko(t)}return e}}/**
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
 */function OT(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function LT(n){const e=Hs(Ws(n)).link,t=e?Hs(Ws(e)).deep_link_id:null,r=Hs(Ws(n)).deep_link_id;return(r?Hs(Ws(r)).link:null)||r||t||e||n}class zu{constructor(e){var t,r,i,s,a,l;const c=Hs(Ws(e)),h=(t=c.apiKey)!==null&&t!==void 0?t:null,f=(r=c.oobCode)!==null&&r!==void 0?r:null,g=OT((i=c.mode)!==null&&i!==void 0?i:null);J(h&&f&&g,"argument-error"),this.apiKey=h,this.operation=g,this.code=f,this.continueUrl=(s=c.continueUrl)!==null&&s!==void 0?s:null,this.languageCode=(a=c.lang)!==null&&a!==void 0?a:null,this.tenantId=(l=c.tenantId)!==null&&l!==void 0?l:null}static parseLink(e){const t=LT(e);try{return new zu(t)}catch{return null}}}/**
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
 */class Ts{constructor(){this.providerId=Ts.PROVIDER_ID}static credential(e,t){return wo._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=zu.parseLink(t);return J(r,"argument-error"),wo._fromEmailAndCode(e,r.code,r.tenantId)}}Ts.PROVIDER_ID="password";Ts.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ts.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Mo extends Pm{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class gr extends Mo{constructor(){super("facebook.com")}static credential(e){return _i._fromParams({providerId:gr.PROVIDER_ID,signInMethod:gr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return gr.credentialFromTaggedObject(e)}static credentialFromError(e){return gr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return gr.credential(e.oauthAccessToken)}catch{return null}}}gr.FACEBOOK_SIGN_IN_METHOD="facebook.com";gr.PROVIDER_ID="facebook.com";/**
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
 */class mr extends Mo{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return _i._fromParams({providerId:mr.PROVIDER_ID,signInMethod:mr.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return mr.credentialFromTaggedObject(e)}static credentialFromError(e){return mr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return mr.credential(t,r)}catch{return null}}}mr.GOOGLE_SIGN_IN_METHOD="google.com";mr.PROVIDER_ID="google.com";/**
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
 */class _r extends Mo{constructor(){super("github.com")}static credential(e){return _i._fromParams({providerId:_r.PROVIDER_ID,signInMethod:_r.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _r.credentialFromTaggedObject(e)}static credentialFromError(e){return _r.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _r.credential(e.oauthAccessToken)}catch{return null}}}_r.GITHUB_SIGN_IN_METHOD="github.com";_r.PROVIDER_ID="github.com";/**
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
 */class vr extends Mo{constructor(){super("twitter.com")}static credential(e,t){return _i._fromParams({providerId:vr.PROVIDER_ID,signInMethod:vr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return vr.credentialFromTaggedObject(e)}static credentialFromError(e){return vr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return vr.credential(t,r)}catch{return null}}}vr.TWITTER_SIGN_IN_METHOD="twitter.com";vr.PROVIDER_ID="twitter.com";/**
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
 */class us{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await cn._fromIdTokenResponse(e,r,i),a=_f(r);return new us({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=_f(r);return new us({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function _f(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class Ya extends sr{constructor(e,t,r,i){var s;super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Ya.prototype),this.customData={appName:e.name,tenantId:(s=e.tenantId)!==null&&s!==void 0?s:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Ya(e,t,r,i)}}function Cm(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ya._fromErrorAndOperation(n,s,e,r):s})}async function MT(n,e,t=!1){const r=await yo(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return us._forOperation(n,"link",r)}/**
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
 */async function FT(n,e,t=!1){const{auth:r}=n;if(an(r.app))return Promise.reject(Cr(r));const i="reauthenticate";try{const s=await yo(n,Cm(r,i,e,n),t);J(s.idToken,r,"internal-error");const a=Bu(s.idToken);J(a,r,"internal-error");const{sub:l}=a;return J(n.uid===l,r,"user-mismatch"),us._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&fn(r,"user-mismatch"),s}}/**
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
 */async function xm(n,e,t=!1){if(an(n.app))return Promise.reject(Cr(n));const r="signIn",i=await Cm(n,r,e),s=await us._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function UT(n,e){return xm(Ai(n),e)}/**
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
 */async function jT(n){const e=Ai(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function BT(n,e,t){const r=Ai(n);await Bc(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",xT)}function Hu(n,e,t){return an(n.app)?Promise.reject(Cr(n)):UT(Rt(n),Ts.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&jT(n),r})}/**
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
 */function $T(n,e){return Rt(n).setPersistence(e)}function qT(n,e,t,r){return Rt(n).onIdTokenChanged(e,t,r)}function zT(n,e,t){return Rt(n).beforeAuthStateChanged(e,t)}function HT(n,e,t,r){return Rt(n).onAuthStateChanged(e,t,r)}function WT(n){return Rt(n).signOut()}const Xa="__sak";/**
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
 */class Dm{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Xa,"1"),this.storage.removeItem(Xa),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */class kl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new kl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(a).map(async h=>h(t.origin,s)),c=await QT(l);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}kl.receivers=[];/**
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
 */function kn(){return window}function YT(n){kn().location.href=n}/**
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
 */function Mm(){return typeof kn().WorkerGlobalScope<"u"&&typeof kn().importScripts=="function"}async function XT(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function ZT(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function eI(){return Mm()?self:null}/**
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
 */const Fm="firebaseLocalStorageDb",tI=1,Za="firebaseLocalStorage",Um="fbase_key";class Fo{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Pl(n,e){return n.transaction([Za],e?"readwrite":"readonly").objectStore(Za)}function nI(){const n=indexedDB.deleteDatabase(Fm);return new Fo(n).toPromise()}function $c(){const n=indexedDB.open(Fm,tI);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Za,{keyPath:Um})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Za)?e(r):(r.close(),await nI(),e(await $c()))})})}async function vf(n,e,t){const r=Pl(n,!0).put({[Um]:e,value:t});return new Fo(r).toPromise()}async function rI(n,e){const t=Pl(n,!1).get(e),r=await new Fo(t).toPromise();return r===void 0?null:r.value}function yf(n,e){const t=Pl(n,!0).delete(e);return new Fo(t).toPromise()}const iI=800,sI=3;class jm{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await $c(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>sI)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Mm()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=kl._getInstance(eI()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await XT(),!this.activeServiceWorker)return;this.sender=new JT(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||ZT()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await $c();return await vf(e,Xa,"1"),await yf(e,Xa),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>vf(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>rI(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>yf(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Pl(i,!1).getAll();return new Fo(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),iI)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}jm.type="LOCAL";const oI=jm;new Lo(3e4,6e4);/**
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
 */function aI(n,e){return e?zn(e):(J(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Gu extends qu{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ki(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ki(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ki(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function lI(n){return xm(n.auth,new Gu(n),n.bypassAuthState)}function cI(n){const{auth:e,user:t}=n;return J(t,e,"internal-error"),FT(t,new Gu(n),n.bypassAuthState)}async function uI(n){const{auth:e,user:t}=n;return J(t,e,"internal-error"),MT(t,new Gu(n),n.bypassAuthState)}/**
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
 */class Bm{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:l}=e;if(a){this.reject(a);return}const c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return lI;case"linkViaPopup":case"linkViaRedirect":return uI;case"reauthViaPopup":case"reauthViaRedirect":return cI;default:fn(this.auth,"internal-error")}}resolve(e){er(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){er(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const hI=new Lo(2e3,1e4);class Bi extends Bm{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Bi.currentPopupAction&&Bi.currentPopupAction.cancel(),Bi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return J(e,this.auth,"internal-error"),e}async onExecution(){er(this.filter.length===1,"Popup operations only handle one event");const e=Wu();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Rn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(Rn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Bi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Rn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,hI.get())};e()}}Bi.currentPopupAction=null;/**
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
 */const dI="pendingRedirect",Sa=new Map;class fI extends Bm{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Sa.get(this.auth._key());if(!e){try{const r=await pI(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Sa.set(this.auth._key(),e)}return this.bypassAuthState||Sa.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function pI(n,e){const t=_I(e),r=mI(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function gI(n,e){Sa.set(n._key(),e)}function mI(n){return zn(n._redirectPersistence)}function _I(n){return Aa(dI,n.config.apiKey,n.name)}async function vI(n,e,t=!1){if(an(n.app))return Promise.reject(Cr(n));const r=Ai(n),i=aI(r,e),a=await new fI(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
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
 */const yI=10*60*1e3;class wI{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!EI(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!$m(e)){const i=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(Rn(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=yI&&this.cachedEventUids.clear(),this.cachedEventUids.has(wf(e))}saveEventToCache(e){this.cachedEventUids.add(wf(e)),this.lastProcessedEventTime=Date.now()}}function wf(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function $m({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function EI(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return $m(n);default:return!1}}/**
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
 */async function bI(n,e={}){return or(n,"GET","/v1/projects",e)}/**
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
 */const TI=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,II=/^https?/;async function AI(n){if(n.config.emulator)return;const{authorizedDomains:e}=await bI(n);for(const t of e)try{if(SI(t))return}catch{}fn(n,"unauthorized-domain")}function SI(n){const e=Uc(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!II.test(t))return!1;if(TI.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
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
 */const RI=new Lo(3e4,6e4);function Ef(){const n=kn().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function kI(n){return new Promise((e,t)=>{var r,i,s;function a(){Ef(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Ef(),t(Rn(n,"network-request-failed"))},timeout:RI.get()})}if(!((i=(r=kn().gapi)===null||r===void 0?void 0:r.iframes)===null||i===void 0)&&i.Iframe)e(gapi.iframes.getContext());else if(!((s=kn().gapi)===null||s===void 0)&&s.load)a();else{const l=vT("iframefcb");return kn()[l]=()=>{gapi.load?a():t(Rn(n,"network-request-failed"))},Sm(`${_T()}?onload=${l}`).catch(c=>t(c))}}).catch(e=>{throw Ra=null,e})}let Ra=null;function PI(n){return Ra=Ra||kI(n),Ra}/**
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
 */const CI=new Lo(5e3,15e3),xI="__/auth/iframe",DI="emulator/auth/iframe",VI={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},NI=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function OI(n){const e=n.config;J(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ju(e,DI):`https://${n.config.authDomain}/${xI}`,r={apiKey:e.apiKey,appName:n.name,v:vs},i=NI.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${ko(r).slice(1)}`}async function LI(n){const e=await PI(n),t=kn().gapi;return J(t,n,"internal-error"),e.open({where:document.body,url:OI(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:VI,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=Rn(n,"network-request-failed"),l=kn().setTimeout(()=>{s(a)},CI.get());function c(){kn().clearTimeout(l),i(r)}r.ping(c).then(c,()=>{s(a)})}))}/**
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
 */const MI={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},FI=500,UI=600,jI="_blank",BI="http://localhost";class bf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function $I(n,e,t,r=FI,i=UI){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c=Object.assign(Object.assign({},MI),{width:r.toString(),height:i.toString(),top:s,left:a}),h=St().toLowerCase();t&&(l=ym(h)?jI:t),_m(h)&&(e=e||BI,c.scrollbars="yes");const f=Object.entries(c).reduce((m,[I,k])=>`${m}${I}=${k},`,"");if(lT(h)&&l!=="_self")return qI(e||"",l),new bf(null);const g=window.open(e||"",l,f);J(g,n,"popup-blocked");try{g.focus()}catch{}return new bf(g)}function qI(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
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
 */const zI="__/auth/handler",HI="emulator/auth/handler",WI=encodeURIComponent("fac");async function Tf(n,e,t,r,i,s){J(n.config.authDomain,n,"auth-domain-config-required"),J(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:vs,eventId:i};if(e instanceof Pm){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",yy(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,g]of Object.entries({}))a[f]=g}if(e instanceof Mo){const f=e.getScopes().filter(g=>g!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const l=a;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const c=await n._getAppCheckToken(),h=c?`#${WI}=${encodeURIComponent(c)}`:"";return`${GI(n)}?${ko(l).slice(1)}${h}`}function GI({config:n}){return n.emulator?ju(n,HI):`https://${n.authDomain}/${zI}`}/**
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
 */const nc="webStorageSupport";class KI{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Lm,this._completeRedirectFn=vI,this._overrideRedirectResult=gI}async _openPopup(e,t,r,i){var s;er((s=this.eventManagers[e._key()])===null||s===void 0?void 0:s.manager,"_initialize() not called before _openPopup()");const a=await Tf(e,t,r,Uc(),i);return $I(e,a,Wu())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await Tf(e,t,r,Uc(),i);return YT(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(er(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await LI(e),r=new wI(e);return t.register("authEvent",i=>(J(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(nc,{type:nc},i=>{var s;const a=(s=i==null?void 0:i[0])===null||s===void 0?void 0:s[nc];a!==void 0&&t(!!a),fn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=AI(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Im()||vm()||$u()}}const QI=KI;var If="@firebase/auth",Af="1.10.8";/**
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
 */class JI{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){J(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function YI(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function XI(n){rs(new pi("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:l}=r.options;J(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:a,authDomain:l,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Am(n)},h=new pT(r,i,s,c);return IT(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),rs(new pi("auth-internal",e=>{const t=Ai(e.getProvider("auth").getImmediate());return(r=>new JI(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Rr(If,Af,YI(n)),Rr(If,Af,"esm2017")}/**
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
 */const ZI=5*60,eA=Tp("authIdTokenMaxAge")||ZI;let Sf=null;const tA=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>eA)return;const i=t==null?void 0:t.token;Sf!==i&&(Sf=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function nA(n=Pp()){const e=su(n,"auth");if(e.isInitialized())return e.getImmediate();const t=TT(n,{popupRedirectResolver:QI,persistence:[oI,Nm,Lm]}),r=Tp("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=tA(s.toString());zT(t,a,()=>a(t.currentUser)),qT(t,l=>a(l))}}const i=Ep("auth");return i&&AT(t,`http://${i}`),t}function rA(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}gT({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=Rn("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",rA().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});XI("Browser");const iA={apiKey:"AIzaSyDYl7I27PHWm8o-1j0JQbiN21GqofATtMk",authDomain:"shrishesha-n.firebaseapp.com",projectId:"shrishesha-n",storageBucket:"shrishesha-n.firebasestorage.app",messagingSenderId:"947201474466",appId:"1:947201474466:web:81e4d49ef5bd00c4047cfb",measurementId:"G-R4WJP4HS1D"},qm=id().length===0?kp(iA):id()[0],zt=Yg(qm),Ee=nA(qm),sA=typeof window<"u"?localStorage.getItem("isAuthenticated")==="true":!1,hs=wi(sA);$T(Ee,Nm);hs.subscribe(n=>{typeof window<"u"&&localStorage.setItem("isAuthenticated",n.toString())});HT(Ee,n=>{const e=!!n;hs.set(e)});async function oA(n,e){try{await Hu(Ee,n,e),hs.set(!0)}catch(t){throw console.error("Firebase auth error:",t),new Error("Invalid credentials")}}async function aA(n){try{return await BT(Ee,n),{success:!0,message:"Password reset email sent successfully"}}catch(e){throw console.error("Password reset error:",e),new Error("Failed to send password reset email")}}function He(n,e){e!=null&&e.replace?window.history.replaceState({},"",n):window.history.pushState({},"",n),window.dispatchEvent(new Event("popstate"))}function lA(){const{subscribe:n,set:e}=wi(!1);return{subscribe:n,show:()=>e(!0),hide:()=>e(!1)}}const qc=lA();var cA=K('<div class="fixed inset-0 flex justify-center items-center backdrop-blur-sm bg-white/30 dark:bg-neutral-900/30 z-50"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-neutral-900 dark:border-white"></div></div>');function $i(n){const e=()=>rr(qc,"$loading",t),[t,r]=ir();var i=rt(),s=ze(i);{var a=l=>{var c=cA();B(l,c)};oe(s,l=>{e()&&l(a)})}B(n,i),r()}function uA(){const{subscribe:n,set:e}=wi([]);let t=null;return{subscribe:n,set:async r=>{try{if(!Ee.currentUser)throw new Error("Authentication required to save projects");await Oo(un(zt,"projects",Ee.currentUser.uid),{projects:r}),e(r)}catch(i){throw console.error("Error saving projects:",i),i}},load:async()=>{try{if(t&&t(),Ee.currentUser)t=Al(un(zt,"projects",Ee.currentUser.uid),r=>{if(r.exists()){const i=r.data().projects||[];e(i)}else e([])},r=>{console.error("Projects listener error:",r),e([])});else try{const r=_o(zt,"projects"),i=await vo(r);if(i.empty)e([]);else{const a=i.docs[0].data().projects||[];e(a)}}catch(r){console.error("Error fetching public projects:",r),e([])}}catch(r){console.error("Error loading projects:",r),e([])}},cleanup:()=>{t&&t()}}}const Zt=uA();function hA(){const{subscribe:n,set:e}=wi(null);return{subscribe:n,show:(t,r)=>{e({message:t,type:r}),setTimeout(()=>e(null),3e3)}}}const xt=hA();var dA=K('<div class="text-red-500 text-center p-4"> </div>'),fA=K('<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>'),pA=K('<div class="w-full h-full flex items-center justify-center text-neutral-300 dark:text-neutral-700"><i class="fas fa-image text-4xl"></i></div>'),gA=K('<span class="px-2 py-1 rounded-md bg-neutral-100 dark:bg-white/5 text-xs font-medium text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-white/5"> </span>'),mA=K('<span class="px-2 py-1 text-xs text-neutral-400"> </span>'),_A=K('<div class="glass-card group relative overflow-hidden hover:border-orange-500/30 transition-all duration-300"><div class="aspect-video w-full bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden"><!> <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 backdrop-blur-[2px]"><button class="w-10 h-10 rounded-full bg-white text-neutral-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors shadow-lg" title="Edit"><i class="fas fa-pen"></i></button> <button class="w-10 h-10 rounded-full bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg" title="Delete"><i class="fas fa-trash"></i></button></div></div> <div class="p-5"><h3 class="text-lg font-bold text-neutral-900 dark:text-white mb-2 line-clamp-1"> </h3> <p class="text-neutral-500 dark:text-neutral-400 text-sm mb-4 line-clamp-2 min-h-[2.5rem]"> </p> <div class="flex flex-wrap gap-2"><!> <!></div></div></div>'),vA=K('<div class="space-y-6 pb-20 md:pb-0"><div class="flex justify-between items-center mb-6"><div><h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Projects</h1> <p class="text-neutral-500 dark:text-neutral-400 text-sm">Manage your portfolio showcase</p></div> <button class="glass-button glass-button-primary px-4 py-2 flex items-center gap-2 shadow-lg shadow-orange-500/20"><i class="fas fa-plus"></i> <span class="hidden sm:inline">New Project</span></button></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"></div></div>');function yA(n,e){en(e,!1);const t=()=>rr(Zt,"$projects",r),[r,i]=ir();let s=he([]),a=he(!0),l=he("");Vn(()=>{const P=Ee.onAuthStateChanged(async A=>{try{if(!A){He("/login",{replace:!0});return}await Zt.load(),$(s,[...t()]),$(a,!1)}catch{$(l,"Failed to load projects data"),$(a,!1)}});return()=>P()});function c(){He("/projects/new")}function h(P){He(`/projects/edit/${P.id}`)}async function f(P){if(confirm("Are you sure you want to delete this project?"))try{const A=w(s).filter(x=>x.id!==P.id);await Zt.set(A),xt.show("Project deleted successfully!","success")}catch{xt.show("Failed to delete project","error")}}Zc(()=>t(),()=>{t()&&$(s,[...t()])}),eu(),pn();var g=rt(),m=ze(g);{var I=P=>{$i(P)},k=P=>{var A=rt(),x=ze(A);{var F=U=>{var H=dA(),W=C(H);Oe(()=>Le(W,w(l))),B(U,H)},M=U=>{var H=vA(),W=C(H),b=V(C(W),2),_=V(W,2);jn(_,5,()=>w(s),Un,(y,v)=>{var T=_A(),S=C(T),E=C(S);{var _e=Z=>{var Ne=fA();Oe(()=>{ao(Ne,"src",(w(v),Se(()=>w(v).image))),ao(Ne,"alt",(w(v),Se(()=>w(v).title)))}),B(Z,Ne)},le=Z=>{var Ne=pA();B(Z,Ne)};oe(E,Z=>{w(v),Se(()=>w(v).image)?Z(_e):Z(le,!1)})}var ve=V(E,2),re=C(ve),we=V(re,2),Re=V(S,2),je=C(Re),et=C(je),pe=V(je,2),X=C(pe),Fe=V(pe,2),Be=C(Fe);jn(Be,1,()=>(w(v),Se(()=>w(v).technologies.slice(0,3))),Un,(Z,Ne)=>{var We=gA(),$e=C(We);Oe(()=>Le($e,w(Ne))),B(Z,We)});var ct=V(Be,2);{var Ie=Z=>{var Ne=mA(),We=C(Ne);Oe(()=>Le(We,`+${w(v),Se(()=>w(v).technologies.length-3)??""}`)),B(Z,Ne)};oe(ct,Z=>{w(v),Se(()=>w(v).technologies.length>3)&&Z(Ie)})}Oe(()=>{Le(et,(w(v),Se(()=>w(v).title))),Le(X,(w(v),Se(()=>w(v).description)))}),ee("click",re,()=>h(w(v))),ee("click",we,()=>f(w(v))),B(y,T)}),ee("click",b,c),B(U,H)};oe(x,U=>{w(l)?U(F):U(M,!1)},!0)}B(P,A)};oe(m,P=>{w(a)?P(I):P(k,!1)})}B(n,g),tn(),i()}async function wA(n,e){try{return await Oo(un(zt,"profiles",n),e),!0}catch(t){throw console.error("Error saving profile:",t),t}}async function rc(){var n,e;try{console.log("Testing Firestore connection..."),console.log("Current user:",(n=Ee.currentUser)==null?void 0:n.uid);const t=_o(zt,"profiles"),r=_o(zt,"projects"),i=await vo(t),s=await vo(r);return{success:!0,userId:(e=Ee.currentUser)==null?void 0:e.uid,isConnected:!0,collections:{profiles:!i.empty,projects:!s.empty}}}catch(t){return console.error("Firestore debug error:",t),{success:!1,error:t instanceof Error?t.message:"Unknown error",isConnected:!1}}}const js={name:"",title:"",sub_title:[""],bio:"",location:"",skills:[],experience:[],education:[],typingStrings:[""],favicon:"",profileImage:"",techStack:[],particlesQuantity:1e3,badges:[]};function EA(){const{subscribe:n,set:e}=wi(js);let t=null;return{subscribe:n,set:async r=>{try{if(!Ee.currentUser)throw new Error("Authentication required to save profile");await wA(Ee.currentUser.uid,r),e(r)}catch(i){throw console.error("Error saving profile:",i),i}},load:async()=>{try{t&&t();const r=_o(zt,"profiles"),i=await vo(r);if(i.empty)e(js);else{const s=i.docs[0];t=Al(un(zt,"profiles",s.id),a=>{a.exists()?e(a.data()):e(js)},a=>{console.error("Profile snapshot error:",a),e(js)})}}catch(r){console.error("Error loading profile:",r),e(js)}},cleanup:()=>{t&&t()}}}const Hn=EA(),bA="optimage",TA="portfolio-images";async function IA(n){try{const e=new FormData;e.append("file",n),e.append("upload_preset",TA);const t=await fetch(`https://api.cloudinary.com/v1_1/${bA}/image/upload`,{method:"POST",body:e});if(!t.ok)throw new Error("Upload failed");return(await t.json()).secure_url}catch(e){throw console.error("Error uploading image:",e),new Error("Failed to upload image")}}var AA=K('<div class="relative group glass-card-hover"><img alt="Preview" class="w-full h-48 object-cover rounded-lg"/> <button type="button" class="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">Change Image</button></div>'),SA=K('<button type="button" class="w-full h-48 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg flex items-center justify-center hover:border-primary-500 transition-colors"><div class="text-center"><i class="fas fa-cloud-upload-alt text-white text-2xl mb-2"></i> <p class="text-white">Click to upload image</p> <p class="text-sm text-neutral-100">Max size: 10MB</p></div></button>'),RA=K('<p class="text-red-500 text-sm"> </p>'),kA=K('<div class="flex flex-col items-center gap-4"><!> <input type="file" accept="image/*" class="hidden"/> <!></div>');function el(n,e){en(e,!1);let t=_c(e,"currentImage",8,""),r=_c(e,"onImageUploaded",8),i=he(),s=he(t()),a=he("");async function l(P){var F;const x=(F=P.target.files)==null?void 0:F[0];if(x){if(!x.type.startsWith("image/")){$(a,"Please select an image file");return}if(x.size>10*1024*1024){$(a,"Image size should be less than 10MB");return}try{$(a,""),qc.show(),$(s,URL.createObjectURL(x));const M=await IA(x);r()(M)}catch(M){$(a,"Failed to upload image"),console.error("Upload error:",M)}finally{qc.hide()}}}pn();var c=kA(),h=C(c);{var f=P=>{var A=AA(),x=C(A),F=V(x,2);Oe(()=>ao(x,"src",w(s))),ee("click",F,()=>w(i).click()),B(P,A)},g=P=>{var A=SA();ee("click",A,()=>w(i).click()),B(P,A)};oe(h,P=>{w(s)?P(f):P(g,!1)})}var m=V(h,2);qv(m,P=>$(i,P),()=>w(i));var I=V(m,2);{var k=P=>{var A=RA(),x=C(A);Oe(()=>Le(x,w(a))),B(P,A)};oe(I,P=>{w(a)&&P(k)})}ee("change",m,l),B(n,c),tn()}var PA=K('<div class="text-red-500 text-center p-4"> </div>'),CA=K('<div class="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm z-10"><!></div>'),xA=K('<div class="flex gap-2 w-min"><input type="text" class="flex-1 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/> <button type="button" class="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><i class="fas fa-trash"></i></button></div>'),DA=K('<div class="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm z-10"><!></div>'),VA=K('<div class="flex flex-col sm:flex-row items-center gap-2 mb-4"><div class="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full"><input type="text" placeholder="Year" class="w-[calc(100%-2rem)] px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/> <div class="relative flex items-center"><input type="text" placeholder="Degree" class="w-[calc(100%-2rem)] px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <input type="text" placeholder="Institution" class="w-[calc(100%-2rem)] px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <button type="button" class="absolute right-0 py-2 sm:mt-0 mt-14 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><i class="fas fa-trash"></i></button></div>'),NA=K('<div class="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm z-10"><!></div>'),OA=K('<div class="flex gap-2 w-min"><input type="text" class="flex-1 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/> <button type="button" class="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><i class="fas fa-trash"></i></button></div>'),LA=K('<div class="flex gap-2"><input type="text" class="flex-1 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500" placeholder="e.g., React, Node.js, etc."/> <button type="button" class="px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><i class="fas fa-trash"></i></button></div>'),MA=K('<div class="glass-card p-4 space-y-3"><div class="flex justify-between items-start"><input type="text" class="flex-1 px-3 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500" placeholder="Badge title (e.g., Oracle Certified Professional)"/> <button type="button" class="ml-2 px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"><i class="fas fa-trash"></i></button></div> <div class="max-w-xs"><!></div></div>'),FA=K('<div><form class="space-y-6"><div class="relative"><!> <div class="mb-6"><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Profile Image</label> <div class="max-w-auto"><!></div> <p class="mt-2 text-sm text-neutral-500 dark:text-neutral-400">Recommended size: 256x256 pixels (Square format)</p></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Particle Quantity</label> <input type="text" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Name</label> <input type="text" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Title</label> <input type="text" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Subtitle</label> <div class="space-y-2 mb-3"><!> <button type="button" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">+ Add More</button></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Bio</label> <textarea class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500" rows="4"></textarea></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Location</label> <input class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Skills (comma-separated)</label> <input type="text" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Experience (one per line)</label> <textarea class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500" rows="4"></textarea></div></div> <div><div class="relative"><!> <label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Education</label> <!> <button type="button" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mt-2 border-black dark:border-white">+ Add Education</button></div></div> <div><div class="relative"><!> <label class="block mb-2 font-bold text-neutral-700 dark:text-neutral-300">Typing Animation Strings</label> <div class="space-y-2"><!> <button type="button" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">+ Add String</button></div></div> <div class="relative"><label class="block mb-2 mt-6 font-bold text-neutral-700 dark:text-neutral-300">Tech Stack</label> <div class="space-y-2"><!> <button type="button" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">+ Add Technology</button></div></div> <div class="relative"><label class="block mb-2 mt-6 font-bold text-neutral-700 dark:text-neutral-300">Certification Badges</label> <div class="space-y-4"><!> <button type="button" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">+ Add Badge</button></div></div> <div class="flex justify-center mt-6"><button type="submit" class="glass-button hover:scale-105 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"> </button></div></div></form></div>');function UA(n,e){en(e,!1);const t=()=>rr(Hn,"$profile",r),[r,i]=ir(),s=Yg();let a=he({...t()}),l=he(!0),c=he(""),h=he({profile:!1,education:!1,typing:!1});async function f(){try{if(!Ee.currentUser){He("/login",{replace:!0});return}const A=await af(un(s,"profiles","default"));let x=A.exists()?A.data():{};const F=await af(un(s,"profiles",Ee.currentUser.uid));if(F.exists()){const M=F.data();x={...x,...M}}$(a,{name:x.name||"",title:x.title||"",sub_title:x.sub_title||"",bio:x.bio||"",location:x.location||"",skills:x.skills||[],experience:x.experience||[],education:x.education||[],typingStrings:x.typingStrings||"",favicon:x.favicon||"",profileImage:x.profileImage||"",techStack:x.techStack||"",particlesQuantity:x.particlesQuantity||100,badges:x.badges||[]}),await Hn.set(w(a)),$(l,!1)}catch(A){console.error("Error loading profile:",A),$(c,"Failed to load profile data"),$(l,!1)}}async function g(){try{if(!Ee.currentUser)throw new Error("Not authenticated");se(h,w(h).profile=!0),await Oo(un(s,"profiles",Ee.currentUser.uid),w(a)),await Hn.set(w(a)),xt.show("Profile updated successfully!","success")}catch(A){console.error("Error updating profile:",A),xt.show("Failed to update profile","error")}finally{se(h,w(h).profile=!1)}}Vn(()=>{const A=Ee.onAuthStateChanged(x=>{x&&f()});return()=>{A()}}),pn();var m=rt(),I=ze(m);{var k=A=>{$i(A)},P=A=>{var x=rt(),F=ze(x);{var M=H=>{var W=PA(),b=C(W);Oe(()=>Le(b,w(c))),B(H,W)},U=H=>{var W=FA(),b=C(W),_=C(b),y=C(_);{var v=Q=>{var Ae=CA(),Ce=C(Ae);$i(Ce),B(Q,Ae)};oe(y,Q=>{w(h).profile&&Q(v)})}var T=V(y,2),S=V(C(T),2),E=C(S);el(E,{get currentImage(){return w(a).profileImage},onImageUploaded:Q=>se(a,w(a).profileImage=Q)});var _e=V(T,2),le=V(C(_e),2),ve=V(_e,2),re=V(C(ve),2),we=V(ve,2),Re=V(C(we),2),je=V(we,4),et=C(je);jn(et,1,()=>w(a).sub_title,Un,(Q,Ae,Ce)=>{var Qe=xA(),ht=C(Qe),Dt=V(ht,2);Pe(ht,()=>w(a).sub_title[Ce],nt=>se(a,w(a).sub_title[Ce]=nt)),ee("click",Dt,()=>{se(a,w(a).sub_title=w(a).sub_title.filter((nt,Ut)=>Ut!==Ce))}),B(Q,Qe)});var pe=V(et,2),X=V(je,2),Fe=V(C(X),2),Be=V(X,2),ct=V(C(Be),2),Ie=V(Be,2),Z=V(C(Ie),2),Ne=V(Ie,2),We=V(C(Ne),2),$e=V(_,2),Nn=C($e),On=C(Nn);{var jr=Q=>{var Ae=DA(),Ce=C(Ae);$i(Ce),B(Q,Ae)};oe(On,Q=>{w(h).education&&Q(jr)})}var ar=V(On,4);jn(ar,1,()=>w(a).education,Un,(Q,Ae,Ce)=>{var Qe=VA(),ht=C(Qe),Dt=C(ht),nt=V(Dt,2),Ut=C(nt),zr=V(nt,2),Vt=V(ht,2);Pe(Dt,()=>w(Ae).year,nn=>(w(Ae).year=nn,sa(()=>w(a)))),Pe(Ut,()=>w(Ae).degree,nn=>(w(Ae).degree=nn,sa(()=>w(a)))),Pe(zr,()=>w(Ae).institution,nn=>(w(Ae).institution=nn,sa(()=>w(a)))),ee("click",Vt,()=>{se(a,w(a).education=w(a).education.filter((nn,ki)=>ki!==Ce))}),B(Q,Qe)});var Br=V(ar,2),ot=V($e,2),Si=C(ot),Is=C(Si);{var As=Q=>{var Ae=NA(),Ce=C(Ae);$i(Ce),B(Q,Ae)};oe(Is,Q=>{w(h).typing&&Q(As)})}var Uo=V(Is,4),jo=C(Uo);jn(jo,1,()=>w(a).typingStrings,Un,(Q,Ae,Ce)=>{var Qe=OA(),ht=C(Qe),Dt=V(ht,2);Pe(ht,()=>w(a).typingStrings[Ce],nt=>se(a,w(a).typingStrings[Ce]=nt)),ee("click",Dt,()=>{se(a,w(a).typingStrings=w(a).typingStrings.filter((nt,Ut)=>Ut!==Ce))}),B(Q,Qe)});var Ss=V(jo,2),Ri=V(Si,2),Bo=V(C(Ri),2),tt=C(Bo);jn(tt,1,()=>w(a).techStack,Un,(Q,Ae,Ce)=>{var Qe=LA(),ht=C(Qe),Dt=V(ht,2);Pe(ht,()=>w(a).techStack[Ce],nt=>se(a,w(a).techStack[Ce]=nt)),ee("click",Dt,()=>{se(a,w(a).techStack=w(a).techStack.filter((nt,Ut)=>Ut!==Ce))}),B(Q,Qe)});var ut=V(tt,2),$r=V(Ri,2),$o=V(C($r),2),Rs=C($o);jn(Rs,1,()=>w(a).badges,Un,(Q,Ae,Ce)=>{var Qe=MA(),ht=C(Qe),Dt=C(ht),nt=V(Dt,2),Ut=V(ht,2),zr=C(Ut);el(zr,{get currentImage(){return w(Ae).imageUrl},onImageUploaded:Vt=>{se(a,w(a).badges[Ce].imageUrl=Vt),se(a,w(a).badges=w(a).badges)}}),Pe(Dt,()=>w(Ae).title,Vt=>(w(Ae).title=Vt,sa(()=>w(a)))),ee("click",nt,()=>{se(a,w(a).badges=w(a).badges.filter((Vt,nn)=>nn!==Ce))}),B(Q,Qe)});var Cl=V(Rs,2),qr=V($r,2),ks=C(qr),qo=C(ks);Oe((Q,Ae,Ce,Qe)=>{Va(Z,Q),Va(We,Ae),ks.disabled=Ce,Le(qo,Qe)},[()=>w(a).skills.join(", "),()=>w(a).experience.join(`
`),()=>Object.values(w(h)).some(Q=>Q),()=>Object.values(w(h)).some(Q=>Q)?"Saving...":"Save Changes"]),Pe(le,()=>t().particlesQuantity,Q=>Wv(Hn,Se(t).particlesQuantity=Q,Se(t))),Pe(re,()=>w(a).name,Q=>se(a,w(a).name=Q)),Pe(Re,()=>w(a).title,Q=>se(a,w(a).title=Q)),ee("click",pe,()=>{se(a,w(a).sub_title=[...w(a).sub_title,""])}),Pe(Fe,()=>w(a).bio,Q=>se(a,w(a).bio=Q)),Pe(ct,()=>w(a).location,Q=>se(a,w(a).location=Q)),ee("input",Z,Q=>{Q.target&&se(a,w(a).skills=Q.target.value.split(",").map(Ae=>Ae.trim()))}),ee("input",We,Q=>{Q.target&&Q.target instanceof HTMLTextAreaElement&&se(a,w(a).experience=Q.target.value.split(`
`).filter(Boolean))}),ee("click",Br,()=>se(a,w(a).education=[...w(a).education,{year:"",degree:"",institution:""}])),ee("click",Ss,()=>{se(a,w(a).typingStrings=[...w(a).typingStrings,""])}),ee("click",ut,()=>{se(a,w(a).techStack=[...w(a).techStack,""])}),ee("click",Cl,()=>{se(a,w(a).badges=[...w(a).badges,{title:"",imageUrl:""}])}),ee("submit",b,So(g)),B(H,W)};oe(F,H=>{w(c)?H(M):H(U,!1)},!0)}B(A,x)};oe(I,A=>{w(l)?A(k):A(P,!1)})}B(n,m),tn(),i()}function jA(){const{subscribe:n,set:e}=wi([]);let t=null;return{subscribe:n,set:async r=>{try{if(!Ee.currentUser)throw new Error("Authentication required to save blogs");await Oo(un(zt,"blogs",Ee.currentUser.uid),{blogs:r}),e(r)}catch(i){throw console.error("Error saving blogs:",i),i}},load:async()=>{try{if(t&&t(),Ee.currentUser)t=Al(un(zt,"blogs",Ee.currentUser.uid),r=>{if(r.exists()){const i=r.data().blogs||[];e(i)}else e([])},r=>{console.error("Blogs listener error:",r),e([])});else try{const r=_o(zt,"blogs"),i=await vo(r);if(i.empty)e([]);else{const a=i.docs[0].data().blogs||[];e(a)}}catch(r){console.error("Error fetching public blogs:",r),e([])}}catch(r){console.error("Error loading blogs:",r),e([])}},cleanup:()=>{t&&t()}}}const Wn=jA();var BA=K('<img class="w-full h-full object-cover"/>'),$A=K('<div class="w-full h-full flex items-center justify-center text-neutral-300 dark:text-neutral-700"><i class="fas fa-newspaper"></i></div>'),qA=K('<span class="text-xs text-neutral-400">•</span> <span class="text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[150px]"> </span>',1),zA=K('<div class="glass-card p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center group hover:border-orange-500/30 transition-all duration-300"><div class="w-full sm:w-24 h-24 sm:h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800 overflow-hidden shrink-0"><!></div> <div class="flex-1 min-w-0"><h3 class="text-lg font-bold text-neutral-900 dark:text-white truncate"> </h3> <p class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1"> </p> <div class="flex items-center gap-2 mt-2"><span class="text-xs font-medium px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300"> </span> <!></div></div> <div class="flex sm:flex-col gap-2 w-full sm:w-auto mt-2 sm:mt-0"><button class="flex-1 sm:flex-none glass-button-outline px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-2 hover:text-orange-600 dark:hover:text-orange-400"><i class="fas fa-pen"></i> <span class="sm:hidden">Edit</span></button> <button class="flex-1 sm:flex-none glass-button-outline px-3 py-1.5 rounded-lg text-sm flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 border-red-200 dark:border-red-900/30"><i class="fas fa-trash"></i> <span class="sm:hidden">Delete</span></button></div></div>'),HA=K('<div class="space-y-6 pb-20 md:pb-0"><div class="flex justify-between items-center mb-6"><div><h1 class="text-2xl font-bold text-neutral-900 dark:text-white">Blog Posts</h1> <p class="text-neutral-500 dark:text-neutral-400 text-sm">Manage your editorial content</p></div> <button class="glass-button glass-button-primary px-4 py-2 flex items-center gap-2 shadow-lg shadow-orange-500/20"><i class="fas fa-plus"></i> <span class="hidden sm:inline">New Post</span></button></div> <div class="grid grid-cols-1 gap-4"></div></div>');function WA(n,e){en(e,!1);const t=()=>rr(Wn,"$blogs",r),[r,i]=ir();_c(e,"editingBlog",8,null);let s=he([]),a=he(!0);Vn(()=>{const k=Ee.onAuthStateChanged(async P=>{try{if(!P){He("/login");return}await Wn.load(),$(s,[...t()]),$(a,!1)}catch{xt.show("Failed to load blogs data","error"),$(a,!1)}});return()=>k()});function l(){He("/blogs/new")}function c(k){He(`/blogs/edit/${k.id}`)}async function h(k){if(confirm("Are you sure you want to delete this post?"))try{const P=w(s).filter(A=>A.id!==k);await Wn.set(P),xt.show("Blog post deleted successfully!","success")}catch{xt.show("Failed to delete blog post","error")}}Zc(()=>t(),()=>{t()&&$(s,[...t()])}),eu(),pn();var f=rt(),g=ze(f);{var m=k=>{$i(k)},I=k=>{var P=HA(),A=C(P),x=V(C(A),2),F=V(A,2);jn(F,5,()=>w(s),Un,(M,U)=>{var H=zA(),W=C(H),b=C(W);{var _=X=>{var Fe=BA();Oe(()=>{ao(Fe,"src",(w(U),Se(()=>w(U).image))),ao(Fe,"alt",(w(U),Se(()=>w(U).title)))}),B(X,Fe)},y=X=>{var Fe=$A();B(X,Fe)};oe(b,X=>{w(U),Se(()=>w(U).image)?X(_):X(y,!1)})}var v=V(W,2),T=C(v),S=C(T),E=V(T,2),_e=C(E),le=V(E,2),ve=C(le),re=C(ve),we=V(ve,2);{var Re=X=>{var Fe=qA(),Be=V(ze(Fe),2),ct=C(Be);Oe(Ie=>Le(ct,Ie),[()=>(w(U),Se(()=>w(U).tags.join(", ")))]),B(X,Fe)};oe(we,X=>{w(U),Se(()=>w(U).tags&&w(U).tags.length>0)&&X(Re)})}var je=V(v,2),et=C(je),pe=V(et,2);Oe(X=>{Le(S,(w(U),Se(()=>w(U).title))),Le(_e,(w(U),Se(()=>w(U).description))),Le(re,X)},[()=>(w(U),Se(()=>new Date(w(U).date).toLocaleDateString()))]),ee("click",et,()=>c(w(U))),ee("click",pe,()=>h(w(U).id)),B(M,H)}),ee("click",x,l),B(k,P)};oe(g,k=>{w(a)?k(m):k(I,!1)})}B(n,f),tn(),i()}const pa={spreadsheetUrl:"",email:"",phone:"",location:""};function GA(){const{subscribe:n,set:e}=wi(pa);let t=null;return{subscribe:n,set:async r=>{try{await Oo(un(zt,"config","contact"),r),e(r)}catch(i){throw console.error("Error saving contact config:",i),i}},load:async()=>{try{t&&t(),t=Al(un(zt,"config","contact"),r=>{r.exists()?e(r.data()):e(pa)},r=>{console.error("Contact config listener error:",r),e(pa)})}catch(r){console.error("Error loading contact config:",r),e(pa)}},cleanup:()=>{t&&t()}}}const xr=GA();var KA=K('<div class="flex justify-center"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500"></div></div>'),QA=K('<div class="text-red-500 text-center p-4"> </div>'),JA=K('<form class="space-y-6"><div><label class="block mb-2 text-neutral-700 dark:text-neutral-300">Google Apps Script Link</label> <input type="url" required class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500" placeholder=""/></div> <div><label class="block mb-2 text-neutral-700 dark:text-neutral-300">Email</label> <input type="email" required class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 text-neutral-700 dark:text-neutral-300">Phone (optional)</label> <input type="tel" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div><label class="block mb-2 text-neutral-700 dark:text-neutral-300">Location (optional)</label> <input type="text" class="glass-card-hover w-full px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500"/></div> <div class="flex justify-center"><button type="submit" class="glass-button hover:scale-105 px-3 mt-2 py-2 rounded-lg bg-gray-200/10 dark:bg-black/10 backdrop-blur-md border border-gray-800/20 dark:border-neutral-700/30 text-neutral-900 dark:text-white focus:ring-2 focus:ring-primary-500">Save Changes</button></div></form>'),YA=K("<div><!></div>");function XA(n,e){en(e,!1);const t=()=>rr(xr,"$contact",r),[r,i]=ir();let s=he({spreadsheetUrl:"",email:"",phone:"",location:""}),a=he(!0),l=he("");Vn(()=>{const I=Ee.onAuthStateChanged(async k=>{try{if(!k){He("/login");return}await xr.load(),$(s,{...t()}),$(a,!1)}catch{$(l,"Failed to load contact configuration"),$(a,!1)}});return()=>I()});async function c(){try{await xr.set(w(s)),xt.show("Contact information updated successfully!","success")}catch{xt.show("Failed to update contact information","error")}}pn();var h=YA(),f=C(h);{var g=I=>{var k=KA();B(I,k)},m=I=>{var k=rt(),P=ze(k);{var A=F=>{var M=QA(),U=C(M);Oe(()=>Le(U,w(l))),B(F,M)},x=F=>{var M=JA(),U=C(M),H=V(C(U),2),W=V(U,2),b=V(C(W),2),_=V(W,2),y=V(C(_),2),v=V(_,2),T=V(C(v),2);Pe(H,()=>w(s).spreadsheetUrl,S=>se(s,w(s).spreadsheetUrl=S)),Pe(b,()=>w(s).email,S=>se(s,w(s).email=S)),Pe(y,()=>w(s).phone,S=>se(s,w(s).phone=S)),Pe(T,()=>w(s).location,S=>se(s,w(s).location=S)),ee("submit",M,So(c)),B(F,M)};oe(P,F=>{w(l)?F(A):F(x,!1)},!0)}B(I,k)};oe(f,I=>{w(a)?I(g):I(m,!1)})}B(n,h),tn(),i()}var ZA=K('<div class="h-screen w-screen overflow-hidden flex flex-col-reverse md:flex-row p-4 gap-4 bg-neutral-100 dark:bg-neutral-950 transition-colors duration-500"><nav class="md:h-full md:w-24 w-full h-20 glass-card flex md:flex-col justify-between items-center py-2 md:py-6 px-4 md:px-2 z-50 shrink-0 border-neutral-200 dark:border-white/5 shadow-2xl md:shadow-none"><div class="hidden md:flex w-12 h-12 rounded-2xl bg-neutral-900 dark:bg-white items-center justify-center text-white dark:text-black font-black text-xl mb-8 shadow-2xl">A</div> <div class="flex-1 md:flex-none flex md:flex-col gap-6 items-center justify-around md:justify-center w-full"><button><div class="icon-container"><i class="fas fa-user"></i></div></button> <button><div class="icon-container"><i class="fas fa-cubes"></i></div></button> <button><div class="icon-container"><i class="fas fa-edit"></i></div></button> <button><div class="icon-container"><i class="fas fa-address-book"></i></div></button> <button class="dock-item group"><div class="icon-container bg-red-500/5 dark:bg-red-500/10 border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"><i class="fas fa-power-off"></i></div></button></div></nav> <main class="flex-1 glass-card overflow-hidden flex flex-col border-neutral-200 dark:border-white/5"><div class="h-14 border-b border-neutral-200/50 dark:border-white/5 flex items-center justify-between px-6 bg-white/20 dark:bg-white/5 backdrop-blur-xl shrink-0"><div class="flex items-center gap-3"><h2 class="text-sm font-semibold text-neutral-800 dark:text-white/90"><!></h2></div></div> <div class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar svelte-1thed0a"><div class="max-w-5xl mx-auto animate-workspace-in svelte-1thed0a"><!></div></div></main></div>');function eS(n,e){en(e,!1);const t=()=>rr(hs,"$isAuthenticated",r),[r,i]=ir();let s=he("profile"),a=he(null);function l(m){$(s,m),He(`/?tab=${m}`,{replace:!0})}Vn(async()=>{if(!t()){He("/login");return}const I=new URLSearchParams(window.location.search).get("tab");I&&["profile","projects","blogs","contact"].includes(I)&&$(s,I),await Promise.all([Wn.load(),Zt.load(),Hn.load(),xr.load()])});async function c(){try{await WT(Ee),He("/login")}catch(m){console.error("Error signing out:",m)}}pp(()=>{Wn.cleanup(),Zt.cleanup(),Hn.cleanup(),xr.cleanup()}),Zc(()=>w(s),()=>{w(s)!=="blogs"&&$(a,null)}),eu(),pn();var h=rt(),f=ze(h);{var g=m=>{var I=ZA(),k=C(I),P=V(C(k),2),A=C(P),x=V(A,2),F=V(x,2),M=V(F,2),U=V(M,2),H=V(k,2),W=C(H),b=C(W),_=C(b),y=C(_);{var v=re=>{var we=oa("Manage Profile");B(re,we)},T=re=>{var we=rt(),Re=ze(we);{var je=pe=>{var X=oa("Project Portfolio");B(pe,X)},et=pe=>{var X=rt(),Fe=ze(X);{var Be=Ie=>{var Z=oa("Editorial Studio");B(Ie,Z)},ct=Ie=>{var Z=rt(),Ne=ze(Z);{var We=$e=>{var Nn=oa("Communication Hub");B($e,Nn)};oe(Ne,$e=>{w(s)==="contact"&&$e(We)},!0)}B(Ie,Z)};oe(Fe,Ie=>{w(s)==="blogs"?Ie(Be):Ie(ct,!1)},!0)}B(pe,X)};oe(Re,pe=>{w(s)==="projects"?pe(je):pe(et,!1)},!0)}B(re,we)};oe(y,re=>{w(s)==="profile"?re(v):re(T,!1)})}var S=V(W,2),E=C(S),_e=C(E);{var le=re=>{UA(re,{})},ve=re=>{var we=rt(),Re=ze(we);{var je=pe=>{yA(pe,{})},et=pe=>{var X=rt(),Fe=ze(X);{var Be=Ie=>{WA(Ie,{get editingBlog(){return w(a)},set editingBlog(Z){$(a,Z)},$$legacy:!0})},ct=Ie=>{var Z=rt(),Ne=ze(Z);{var We=$e=>{XA($e,{})};oe(Ne,$e=>{w(s)==="contact"&&$e(We)},!0)}B(Ie,Z)};oe(Fe,Ie=>{w(s)==="blogs"?Ie(Be):Ie(ct,!1)},!0)}B(pe,X)};oe(Re,pe=>{w(s)==="projects"?pe(je):pe(et,!1)},!0)}B(re,we)};oe(_e,re=>{w(s)==="profile"?re(le):re(ve,!1)})}Oe(()=>{zs(A,1,`dock-item group ${w(s)==="profile"?"active":""}`),zs(x,1,`dock-item group ${w(s)==="projects"?"active":""}`),zs(F,1,`dock-item group ${w(s)==="blogs"?"active":""}`),zs(M,1,`dock-item group ${w(s)==="contact"?"active":""}`)}),ee("click",A,()=>l("profile")),ee("click",x,()=>l("projects")),ee("click",F,()=>l("blogs")),ee("click",M,()=>l("contact")),ee("click",U,c),B(m,I)};oe(f,m=>{t()&&m(g)})}B(n,h),tn(),i()}var tS=K('<div class="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold p-4 rounded-2xl text-center backdrop-blur-md uppercase tracking-widest"> </div>'),nS=K('<div class="bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold p-4 rounded-2xl text-center backdrop-blur-md uppercase tracking-widest"> </div>'),rS=K('<div class="group"><label for="password" class="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Access Key</label> <input id="password" name="password" type="password" required autocomplete="current-password" class="glass-input w-full" placeholder="••••••••"/></div>'),iS=K('<button disabled class="w-full glass-button opacity-50 cursor-wait"><i class="fas fa-circle-notch animate-spin"></i></button>'),sS=K('<button type="button" class="w-full glass-button glass-button-primary">Authorize Reset</button> <button type="button" class="w-full text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white uppercase tracking-widest transition-all">Back to Access</button>',1),oS=K('<button type="submit" class="w-full glass-button glass-button-primary">Gain Access</button> <button type="button" class="w-full text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white uppercase tracking-widest transition-all">Lost Access Key?</button>',1),aS=K('<div class="min-h-screen flex items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-950 transition-colors duration-500"><div class="glass-card w-full max-w-md p-10 border-neutral-200 dark:border-white/5 relative overflow-hidden"><div class="text-center mb-10"><div class="w-16 h-16 bg-neutral-900 dark:bg-white rounded-[1.5rem] mx-auto flex items-center justify-center mb-6 shadow-2xl"><span class="text-white dark:text-black font-black text-2xl tracking-tighter">S4</span></div> <h2 class="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">Admin</h2> <p class="text-sm text-neutral-500 dark:text-neutral-400 mt-2 font-medium">System Authentication Required</p></div> <form class="space-y-6"><!> <!> <div class="space-y-4"><div class="group"><label for="username" class="block text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2 ml-1">Identity</label> <input id="username" name="username" type="email" required autocomplete="email" class="glass-input w-full" placeholder="admin@mail.com"/></div> <!></div> <div class="pt-4 flex flex-col gap-4"><!></div></form></div></div>');function lS(n,e){en(e,!1);let t=he(""),r=he(""),i=he(""),s=he(""),a=he(!1),l=he(!1);async function c(){try{$(a,!0),await Hu(Ee,w(t),w(r)),await oA(w(t),w(r)),He("/")}catch(v){$(i,v instanceof Error?v.message:"Invalid credentials")}finally{$(a,!1)}}async function h(){try{$(a,!0),$(i,""),await aA(w(t)),$(s,"Password reset email sent. Please check your inbox.")}catch(v){$(i,v instanceof Error?v.message:"Failed to send reset email"),$(s,"")}finally{$(a,!1)}}pn();var f=aS(),g=C(f),m=V(C(g),2),I=C(m);{var k=v=>{var T=tS(),S=C(T);Oe(()=>Le(S,w(i))),B(v,T)};oe(I,v=>{w(i)&&v(k)})}var P=V(I,2);{var A=v=>{var T=nS(),S=C(T);Oe(()=>Le(S,w(s))),B(v,T)};oe(P,v=>{w(s)&&v(A)})}var x=V(P,2),F=C(x),M=V(C(F),2),U=V(F,2);{var H=v=>{var T=rS(),S=V(C(T),2);Pe(S,()=>w(r),E=>$(r,E)),B(v,T)};oe(U,v=>{w(l)||v(H)})}var W=V(x,2),b=C(W);{var _=v=>{var T=iS();B(v,T)},y=v=>{var T=rt(),S=ze(T);{var E=le=>{var ve=sS(),re=ze(ve),we=V(re,2);ee("click",re,h),ee("click",we,()=>{$(l,!1),$(i,""),$(s,"")}),B(le,ve)},_e=le=>{var ve=oS(),re=V(ze(ve),2);ee("click",re,()=>{$(l,!0),$(i,""),$(s,"")}),B(le,ve)};oe(S,le=>{w(l)?le(E):le(_e,!1)})}B(v,T)};oe(b,v=>{w(a)?v(_):v(y,!1)})}Pe(M,()=>w(t),v=>$(t,v)),ee("submit",m,So(c)),B(n,f),tn()}var cS=K('<p class="text-red-500 text-sm"> </p>'),uS=K('<div class="mb-6 space-y-4"><div><label class="block text-sm mb-1">Email</label> <input type="email" class="w-full p-2 border rounded dark:bg-neutral-700" placeholder="Enter your email"/></div> <div><label class="block text-sm mb-1">Password</label> <input type="password" class="w-full p-2 border rounded dark:bg-neutral-700" placeholder="Enter your password"/></div> <button class="w-full bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">Login</button> <!></div>'),hS=K("<span> </span>"),dS=K('<div class="p-4 pb-32 md:pb-4"><h1 class="text-2xl mb-4">Firebase Debug</h1> <!> <div class="mb-4"><strong>Auth Status:</strong> </div> <div class="mb-4"><button class="bg-primary-600 text-white px-4 py-2 rounded mr-2">Initialize Firestore Data</button> <!></div> <pre class="bg-neutral-100 dark:bg-neutral-800 p-4 rounded"> </pre> <button class="mt-4 bg-primary-600 text-white px-4 py-2 rounded">Retry Test</button></div>');function fS(n,e){en(e,!1);let t=he("Testing..."),r=he(!1),i=he(""),s=he(""),a=he(""),l=he("");async function c(){try{$(l,""),await Hu(Ee,w(s),w(a)),$(r,!0),await h();const b=await rc();$(t,JSON.stringify(b,null,2))}catch(b){$(l,b.message),console.error("Login error:",b)}}async function h(){await Promise.all([Zt.load(),Hn.load(),xr.load()])}async function f(){if(!Ee.currentUser){$(i,"Error: Not logged in");return}try{$(i,"Initializing data..."),await Promise.all([Zt.set([]),Hn.set({name:"",title:"",bio:"",skills:[],experience:[],education:[],typingStrings:[],favicon:"",profileImage:"",sub_title:[],location:"",techStack:[],particlesQuantity:0,badges:[]}),xr.set({spreadsheetUrl:"",email:"",phone:"",location:""})]),$(i,"Initialization completed successfully!");const b=await rc();$(t,JSON.stringify(b,null,2))}catch(b){$(i,`Initialization failed: ${b.message}`),console.error("Initialization error:",b)}}Vn(async()=>{$(r,!!Ee.currentUser),w(r)&&await h();const b=await rc();$(t,JSON.stringify(b,null,2))}),pp(()=>{Zt.cleanup(),Hn.cleanup(),xr.cleanup()}),pn();var g=dS(),m=V(C(g),2);{var I=b=>{var _=uS(),y=C(_),v=V(C(y),2),T=V(y,2),S=V(C(T),2),E=V(T,2),_e=V(E,2);{var le=ve=>{var re=cS(),we=C(re);Oe(()=>Le(we,w(l))),B(ve,re)};oe(_e,ve=>{w(l)&&ve(le)})}Pe(v,()=>w(s),ve=>$(s,ve)),Pe(S,()=>w(a),ve=>$(a,ve)),ee("click",E,c),B(b,_)};oe(m,b=>{w(r)||b(I)})}var k=V(m,2),P=V(C(k)),A=V(k,2),x=C(A),F=V(x,2);{var M=b=>{var _=hS(),y=C(_);Oe(v=>{zs(_,1,v),Le(y,w(i))},[()=>Fv(w(i).includes("Error")?"text-red-500":w(i).includes("completed")?"text-green-500":"text-blue-500")]),B(b,_)};oe(F,b=>{w(i)&&b(M)})}var U=V(A,2),H=C(U),W=V(U,2);Oe(()=>{Le(P,` ${w(r)?"Logged In":"Not Logged In"}`),x.disabled=!w(r),Le(H,`
        ${w(t)??""}
    `)}),ee("click",x,f),ee("click",W,()=>location.reload()),B(n,g),tn()}var pS=K('<div class="flex-1 flex items-center justify-center"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div></div>'),gS=K('<span class="px-4 py-1.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-tighter"> </span>'),mS=K('<div class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar svelte-kjhwy2"><div class="max-w-3xl mx-auto animate-workspace-in"><form id="projectForm" class="space-y-8"><div class="space-y-6"><div><label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Project Identity</label> <input type="text" required class="glass-input w-full text-2xl font-black tracking-tight" placeholder="Project Name"/></div> <div><label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">The Story</label> <textarea required class="glass-input w-full" rows="4" placeholder="Tell the story of this project..."></textarea></div> <div><label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Visual Asset</label> <div class="glass-card p-6 bg-neutral-50/50 dark:bg-white/5 border-neutral-200/50"><!></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Live Endpoint</label> <input type="url" class="glass-input w-full" placeholder="https://..."/></div> <div><label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Source Control</label> <input type="url" class="glass-input w-full" placeholder="https://github.com/..."/></div></div> <div><label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Stack Components</label> <input type="text" class="glass-input w-full" placeholder="e.g., Svelte, Node.js..."/> <div class="flex flex-wrap gap-2 mt-4"></div></div></div></form></div></div>'),_S=K('<div class="h-screen w-screen overflow-hidden flex flex-col-reverse bg-neutral-100 dark:bg-neutral-950 p-4 gap-4"><header class="glass-card h-20 px-6 flex items-center justify-between border-neutral-200 dark:border-white/5 shrink-0 shadow-2xl"><div class="flex items-center gap-4"><button class="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm active:scale-95"><i class="fas fa-arrow-left"></i></button> <div class="hidden sm:block"><h1 class="text-lg font-bold text-neutral-900 dark:text-white leading-tight"> </h1> <p class="text-xs text-neutral-500">Workspace / Projects</p></div></div> <button type="submit" form="projectForm" class="glass-button glass-button-primary px-8 py-3 rounded-2xl font-bold shadow-lg shadow-orange-500/30"> </button></header> <main class="flex-1 glass-card overflow-hidden flex flex-col border-neutral-200 dark:border-white/5 bg-white/50 dark:bg-neutral-900/50"><!></main></div>');function vS(n,e){en(e,!1);const t=()=>rr(Zt,"$projects",r),[r,i]=ir(),s=window.location.pathname,a=s.includes("/edit/"),l=a?s.split("/edit/")[1]:null;let c=he({id:crypto.randomUUID(),title:"",description:"",image:"",technologies:[],url:"",github:""}),h=he(!0);Vn(async()=>{if(!Ee.currentUser){He("/login");return}if(a&&l){await Zt.load();const _=t().find(y=>y.id===l);_?$(c,JSON.parse(JSON.stringify(_))):(xt.show("Project not found","error"),He("/"))}$(h,!1)});async function f(){try{let _=t();_.length===0&&(await Zt.load(),_=t());let y=[..._];if(a){const v=y.findIndex(T=>T.id===w(c).id);v!==-1&&(y[v]=w(c))}else y.push(w(c));await Zt.set(y),xt.show(`Project ${a?"updated":"created"} successfully!`,"success"),He("/?tab=projects")}catch(_){console.error(_),xt.show("Failed to save project","error")}}pn();var g=_S(),m=C(g),I=C(m),k=C(I),P=V(k,2),A=C(P),x=C(A),F=V(I,2),M=C(F),U=V(m,2),H=C(U);{var W=_=>{var y=pS();B(_,y)},b=_=>{var y=mS(),v=C(y),T=C(v),S=C(T),E=C(S),_e=V(C(E),2),le=V(E,2),ve=V(C(le),2),re=V(le,2),we=V(C(re),2),Re=C(we);el(Re,{get currentImage(){return w(c).image},onImageUploaded:Z=>se(c,w(c).image=Z)});var je=V(re,2),et=C(je),pe=V(C(et),2),X=V(et,2),Fe=V(C(X),2),Be=V(je,2),ct=V(C(Be),2),Ie=V(ct,2);jn(Ie,5,()=>w(c).technologies,Un,(Z,Ne)=>{var We=gS(),$e=C(We);Oe(()=>Le($e,w(Ne))),B(Z,We)}),Oe(Z=>Va(ct,Z),[()=>w(c).technologies.join(", ")]),Pe(_e,()=>w(c).title,Z=>se(c,w(c).title=Z)),Pe(ve,()=>w(c).description,Z=>se(c,w(c).description=Z)),Pe(pe,()=>w(c).url,Z=>se(c,w(c).url=Z)),Pe(Fe,()=>w(c).github,Z=>se(c,w(c).github=Z)),ee("input",ct,Z=>{Z.target&&se(c,w(c).technologies=Z.target.value.split(",").map(Ne=>Ne.trim()).filter(Boolean))}),ee("submit",T,So(f)),B(_,y)};oe(H,_=>{w(h)?_(W):_(b,!1)})}Oe(()=>{Le(x,a?"Edit Project":"New Project"),Le(M,a?"Save Changes":"Create Project")}),ee("click",k,()=>He("/?tab=projects")),B(n,g),tn(),i()}var yS=K('<div class="flex-1 flex items-center justify-center"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div></div>'),wS=K('<div class="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar svelte-1011lp5"><div class="max-w-4xl mx-auto space-y-8 animate-workspace-in"><form id="blogForm" class="space-y-8"><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div class="md:col-span-2 space-y-6"><div><label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Article Title</label> <input type="text" required class="glass-input w-full text-2xl font-black tracking-tight" placeholder="Title goes here..."/></div> <div><label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Summary</label> <textarea required class="glass-input w-full" rows="3" placeholder="Brief summary..."></textarea></div> <div><label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2 ml-1">Content Editor</label> <div class="border border-neutral-200 dark:border-white/10 rounded-[2rem] overflow-hidden bg-white dark:bg-neutral-950 shadow-inner"><div class="bg-neutral-50 dark:bg-white/5 border-b border-neutral-200 dark:border-white/10 p-3 flex flex-wrap gap-1 sticky top-0 z-10"><button type="button" class="w-10 h-10 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl text-neutral-600 dark:text-neutral-300 transition-colors" title="Bold"><i class="fas fa-bold"></i></button> <button type="button" class="w-10 h-10 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl text-neutral-600 dark:text-neutral-300 transition-colors" title="Italic"><i class="fas fa-italic"></i></button> <div class="w-px h-6 bg-neutral-300 dark:bg-white/10 mx-2 my-auto"></div> <button type="button" class="px-3 h-10 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl text-sm font-black text-neutral-600 dark:text-neutral-300 transition-colors">H2</button> <button type="button" class="px-3 h-10 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl text-sm font-black text-neutral-600 dark:text-neutral-300 transition-colors">H3</button> <div class="w-px h-6 bg-neutral-300 dark:bg-white/10 mx-2 my-auto"></div> <button type="button" class="w-10 h-10 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-white/10 rounded-xl text-neutral-600 dark:text-neutral-300 transition-colors"><i class="fas fa-list-ul"></i></button></div> <div contenteditable="true" class="min-h-[400px] p-8 focus:outline-none prose dark:prose-invert max-w-none prose-headings:tracking-tighter"></div></div></div></div> <div class="space-y-6"><div class="glass-card p-6 bg-neutral-50/50 dark:bg-white/5 border-neutral-200/50"><label class="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-3">Settings</label> <div class="space-y-4"><div><span class="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Date</span> <input type="date" class="glass-input w-full text-sm"/></div> <div><span class="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Image</span> <!></div> <div><span class="block text-[10px] font-bold text-neutral-400 uppercase mb-1">Tags</span> <input type="text" class="glass-input w-full text-sm" placeholder="tag1, tag2..."/></div></div></div></div></div></form></div></div>'),ES=K('<div class="h-screen w-screen overflow-hidden flex flex-col-reverse bg-neutral-100 dark:bg-neutral-950 p-4 gap-4"><header class="glass-card h-20 px-6 flex items-center justify-between border-neutral-200 dark:border-white/5 shrink-0 shadow-2xl"><div class="flex items-center gap-4"><button class="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-all shadow-sm active:scale-95"><i class="fas fa-arrow-left"></i></button> <div class="hidden sm:block"><h1 class="text-lg font-bold text-neutral-900 dark:text-white leading-tight"> </h1> <p class="text-xs text-neutral-500">Workspace / Blogs</p></div></div> <button type="submit" form="blogForm" class="glass-button glass-button-primary px-8 py-3 rounded-2xl font-bold shadow-lg shadow-orange-500/30"> </button></header> <main class="flex-1 glass-card overflow-hidden flex flex-col border-neutral-200 dark:border-white/5 bg-white/50 dark:bg-neutral-900/50"><!></main></div>');function bS(n,e){en(e,!1);const t=()=>rr(Wn,"$blogs",r),[r,i]=ir(),s=window.location.pathname,a=s.includes("/edit/"),l=a?s.split("/edit/")[1]:null;let c=he({id:crypto.randomUUID(),title:"",content:"",description:"",image:"",date:new Date().toISOString().split("T")[0],tags:[],slug:""}),h=he(!0);Vn(async()=>{if(!Ee.currentUser){He("/login");return}if(a&&l){await Wn.load();const y=t().find(v=>v.id===l);y?$(c,JSON.parse(JSON.stringify(y))):(xt.show("Blog post not found","error"),He("/"))}$(h,!1)});async function f(){try{w(c).slug||se(c,w(c).slug=w(c).title.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,""));let y=t();y.length===0&&(await Wn.load(),y=t());let v=[...y];if(a){const T=v.findIndex(S=>S.id===w(c).id);T!==-1&&(v[T]=w(c))}else v.push(w(c));await Wn.set(v),xt.show(`Blog post ${a?"updated":"created"} successfully!`,"success"),He("/?tab=blogs")}catch(y){console.error(y),xt.show("Failed to save blog post","error")}}function g(y,v=null){document.execCommand(y,!1,v)}pn();var m=ES(),I=C(m),k=C(I),P=C(k),A=V(P,2),x=C(A),F=C(x),M=V(k,2),U=C(M),H=V(I,2),W=C(H);{var b=y=>{var v=yS();B(y,v)},_=y=>{var v=wS(),T=C(v),S=C(T),E=C(S),_e=C(E),le=C(_e),ve=V(C(le),2),re=V(le,2),we=V(C(re),2),Re=V(re,2),je=V(C(Re),2),et=C(je),pe=C(et),X=V(pe,2),Fe=V(X,4),Be=V(Fe,2),ct=V(Be,4),Ie=V(et,2),Z=V(_e,2),Ne=C(Z),We=V(C(Ne),2),$e=C(We),Nn=V(C($e),2),On=V($e,2),jr=V(C(On),2);el(jr,{get currentImage(){return w(c).image},onImageUploaded:ot=>se(c,w(c).image=ot)});var ar=V(On,2),Br=V(C(ar),2);Oe(ot=>Va(Br,ot),[()=>w(c).tags?w(c).tags.join(", "):""]),Pe(ve,()=>w(c).title,ot=>se(c,w(c).title=ot)),Pe(we,()=>w(c).description,ot=>se(c,w(c).description=ot)),ee("click",pe,()=>g("bold")),ee("click",X,()=>g("italic")),ee("click",Fe,()=>g("formatBlock","<h2>")),ee("click",Be,()=>g("formatBlock","<h3>")),ee("click",ct,()=>g("insertUnorderedList")),zv("innerHTML",Ie,()=>w(c).content,ot=>se(c,w(c).content=ot)),Pe(Nn,()=>w(c).date,ot=>se(c,w(c).date=ot)),ee("input",Br,ot=>{ot.target&&se(c,w(c).tags=ot.target.value.split(",").map(Si=>Si.trim()).filter(Boolean))}),ee("submit",S,So(f)),B(y,v)};oe(W,y=>{w(h)?y(b):y(_,!1)})}Oe(()=>{Le(F,a?"Edit Article":"New Article"),Le(U,a?"Save":"Publish")}),ee("click",P,()=>He("/?tab=blogs")),B(n,m),tn(),i()}var TS=K('<div class="flex items-center justify-center h-screen"><div class="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div></div>'),IS=K('<div class="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white transition-colors duration-300"><!></div>');function AS(n,e){en(e,!1);const t=()=>rr(hs,"$isAuthenticated",r),[r,i]=ir();let s=he(window.location.pathname);function a(){$(s,window.location.pathname),w(s)!=="/login"&&!t()&&w(s)!=="/login"&&He("/login",{replace:!0})}Vn(()=>{window.addEventListener("popstate",a),a();const g=hs.subscribe(m=>{!m&&window.location.pathname!=="/login"&&He("/login")});return()=>{window.removeEventListener("popstate",a),g()}}),pn();var l=IS(),c=C(l);{var h=g=>{lS(g,{})},f=g=>{var m=rt(),I=ze(m);{var k=A=>{var x=TS();B(A,x)},P=A=>{var x=rt(),F=ze(x);{var M=H=>{fS(H,{})},U=H=>{var W=rt(),b=ze(W);{var _=v=>{vS(v,{})},y=v=>{var T=rt(),S=ze(T);{var E=le=>{bS(le,{})},_e=le=>{eS(le,{})};oe(S,le=>{w(s)==="/blogs/new"||w(s).startsWith("/blogs/edit/")?le(E):le(_e,!1)},!0)}B(v,T)};oe(b,v=>{w(s)==="/projects/new"||w(s).startsWith("/projects/edit/")?v(_):v(y,!1)},!0)}B(H,W)};oe(F,H=>{w(s)==="/debug"?H(M):H(U,!1)},!0)}B(A,x)};oe(I,A=>{t()?A(P,!1):A(k)},!0)}B(g,m)};oe(c,g=>{w(s)==="/login"?g(h):g(f,!1)})}B(n,l),tn(),i()}Pv(AS,{target:document.getElementById("app")});

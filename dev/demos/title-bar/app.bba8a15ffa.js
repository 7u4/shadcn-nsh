import{append as e,bindProp as t,component as n,cond as r,element as i,insert as a,prop as o,setup as s,spread as c,text as l}from"./facades/nsh-rt.fb73842f95.js";import{Canvas as u,Easing as d,Path2D as f,Storage as p,colorScheme as ee,computed as m,mount as te,platform as h,setTheme as ne,signal as g,split as re,token as _,windowSize as ie}from"./facades/nsh.f9b54ac3e6.js";import{titleBar as v,windowState as ae}from"./facades/nsh-desktop.8a886713f4.js";s(null,null,null,null,`{"id":"dev.shadcn-nsh.docs-demos","name":"title-bar","version":"0.0.0","build":1,"development":false}`);const oe={glass:{glassEffect:`regular`,props:{ios:{backdropMaterial:`regular`}},fallback:{blur:30,minOpacity:.72}},acrylic:{props:{windows:{backdrop:{material:`blur`}}},fallback:{blur:30,minOpacity:.85}}};var se={typography:{caption:{fontSize:{pointer:11,touch:12},lineHeight:{pointer:16,touch:16},fontWeight:400,letterSpacing:0},detail:{fontSize:{pointer:12,touch:13},lineHeight:{pointer:16,touch:20},fontWeight:400,letterSpacing:0},body:{fontSize:{pointer:13,touch:15},lineHeight:{pointer:20,touch:20},fontWeight:400,letterSpacing:0},label:{fontSize:{pointer:14,touch:15},lineHeight:{pointer:20,touch:20},fontWeight:500,letterSpacing:0},title:{fontSize:{pointer:16,touch:16},lineHeight:{pointer:24,touch:24},fontWeight:600,letterSpacing:0},headline:{fontSize:{pointer:20,touch:22},lineHeight:{pointer:28,touch:28},fontWeight:600,letterSpacing:0},display:{fontSize:{pointer:26,touch:28},lineHeight:{pointer:32,touch:36},fontWeight:600,letterSpacing:0}},dimension:{shape:{control:`{radius-control}`,container:`{radius-container}`,modal:`{radius-modal}`},size:{hit:{pointer:0,touch:44},density:{pointer:{pad:12,gap:12},touch:{pad:12,gap:12}},item:{pointer:{inset:4,pad:8},touch:{inset:8,pad:8}},control:{pointer:{padding:8,gap:8,dot:6,switch:`small`},touch:{padding:8,gap:8,dot:8,switch:`regular`}},height:{pointer:{sm:24,md:28,lg:32},touch:{sm:32,md:40,lg:48}}},stroke:{hairline:1,control:1},focus:{style:`halo`,width:3,offset:0},icon:{pointer:{sm:12,md:16,lg:20},touch:{sm:16,md:20,lg:24}},control:{field:`box`,choice:`well`,track:`sunk`,handle:`circle`}},shape:{curve:`continuous`,corners:{button:`radius`}},state:{"press-scale":.97,overlay:{hover:0,focus:0,pressed:0,dragged:0},"pressed-opacity":.7,"rest-opacity":.5,disabled:{content:.5,fill:!1}},transition:{enter:{duration:420,timingFunction:`out-cubic`}},motion:{fast:{duration:150,timingFunction:`out-cubic`},default:{duration:250,timingFunction:`out-cubic`},slow:{duration:350,timingFunction:`out-cubic`},state:{duration:120,timingFunction:`out-cubic`}},finishes:{shared:{card:{background:`{card}`,foreground:`{foreground}`,"border-color":`{border}`,elevation:null},inset:{foreground:`{foreground}`,"border-color":`{border}`},channel:{background:`{inset}`,foreground:`{foreground}`,"border-color":`{border}`},raised:{background:`{raised}`,foreground:`{foreground}`,backdropFilter:`none`,material:null},plate:{foreground:`{foreground}`,elevation:null},overlay:{background:`{popover}`,foreground:`{foreground}`,"border-color":`{border}`,backdropFilter:`none`,material:null,elevation:null},modal:{background:`{card}`,foreground:`{foreground}`,"border-color":`{border}`,elevation:null},inverse:{background:`{inverse}`,foreground:`{inverse-foreground}`,"border-color":`{border}`,backdropFilter:`none`,material:null,elevation:null},glass:{foreground:`{foreground}`,"border-color":`{border}`,backdropFilter:`blur(20px)`,material:null,elevation:null},accent:{background:`{primary}`,foreground:`{primary-foreground}`,"border-color":`{brand-edge}`,"border-bottom-color":`{brand-edge}`,"pressed-opacity":.88,"pressed-background":null,"pressed-foreground":null},fill:{foreground:`{primary-foreground}`},knob:{foreground:`{foreground}`,"checked-gradient":null},hover:{foreground:`{foreground}`,elevation:null},pressed:{foreground:`{foreground}`,elevation:null},disabled:{background:`{raised}`,foreground:`{foreground}`,"border-color":`{border}`}},light:{card:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04)`},inset:{shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`},channel:{shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`},raised:{shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`,"border-top-color":`{border}`,"border-bottom-color":`{border}`},plate:{background:`{card}`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`},overlay:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},modal:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},inverse:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},glass:{background:`oklch(from {popover} l c h / 0.8)`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`},accent:{shadow:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`},fill:{background:`oklch(0.75073 0.18465 126.794)`,gradient:`linear-gradient(180deg, oklch(0.80472 0.1815 126.061) 0%, oklch(0.75073 0.18465 126.794) 100%)`,shadow:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`,"border-color":`oklch(0.69169 0.17204 126.956)`},knob:{background:`oklch(1 0 0)`,gradient:`linear-gradient(180deg, oklch(1 0 0) 0%, {raised} 100%)`,shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{input}`,"checked-border-color":`oklch(0.72099 0.15728 124.776)`},hover:{background:`{popover}`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`,"border-top-color":`{border}`,"border-bottom-color":`{border}`},pressed:{background:`{muted}`,shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`,"border-color":`{input}`},disabled:{shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`}},dark:{card:{shadow:`0 1px 0 oklch(0 0 0 / 0.35)`},inset:{shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`},channel:{shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`},raised:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`,"border-top-color":`oklch(0 0 0 / 0.5)`,"border-bottom-color":`oklch(0 0 0 / 0.5)`},plate:{background:`{raised}`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`},overlay:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},modal:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},inverse:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},glass:{background:`oklch(from {card} l c h / 0.78)`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`},accent:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`},fill:{background:`oklch(0.83973 0.16469 124.137)`,gradient:`linear-gradient(180deg, oklch(0.88348 0.15928 123.937) 0%, oklch(0.83973 0.16469 124.137) 100%)`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0.71963 0.15821 125.456)`},knob:{background:`{knob}`,gradient:`linear-gradient(180deg, {foreground} 0%, oklch(0.88185 0.00589 264.53) 100%)`,shadow:`0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0.8324 0.00597 264.528)`,"checked-border-color":`oklch(0.71963 0.15821 125.456)`,"checked-background":`oklch(1 0 0)`},hover:{background:`{input}`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`,"border-top-color":`oklch(0 0 0 / 0.5)`,"border-bottom-color":`oklch(0 0 0 / 0.5)`},pressed:{background:`{line}`,shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`,"border-color":`oklch(0 0 0 / 0.5)`},disabled:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`}}},elevation:{light:{sm:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,md:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04)`,lg:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`,xl:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`,inset:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`,edge:{surface:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6)`,accent:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`}},dark:{sm:`0 1px 1px oklch(0 0 0 / 0.12)`,md:`0 1px 0 oklch(0 0 0 / 0.35)`,lg:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`,xl:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`,inset:`inset 0 1px 1px oklch(0 0 0 / 0.2)`,edge:{surface:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08)`,accent:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`}}}};const y=h.idiom===`terminal`,ce=()=>ee()!==`light`,le=[`field`,`choice`,`track`,`handle`],b=se,x=g(null),S=()=>x()?.semantics??b,C=()=>S();function w(e,t){let n={};for(let r of e){let e=m(()=>t()[r]);Object.defineProperty(n,r,{enumerable:!0,get:()=>e()})}return n}const T=h.desktop?`pointer`:`touch`,ue=/^\{([a-z0-9-]+)\}$/,de=/oklch\(from \{([a-z0-9-]+)\} l c h \/ ([\d.]+)\)/g,fe=(e,t)=>`${e.slice(0,7)}${Math.round(t*255).toString(16).padStart(2,`0`)}`,E=e=>{let t=ue.exec(e);if(t){let e=_(t[1]);if(typeof e==`number`)return e}return Number(e)},D=e=>e.replace(de,(e,t,n)=>{let r=_(t);return typeof r==`string`?fe(r,Number(n)):e}).replace(/\{([a-z0-9-]+)\}/g,(e,t)=>{let n=_(t);return typeof n==`string`?n:e}),pe=e=>{let{finishes:t}=S(),n=ce()?t.dark:t.light;return{...t.shared[e],...n[e]}},O=e=>pe(e),me=(e,t)=>O(e)[t],he=e=>O(e).material??null,k=e=>{let t=he(e);return t===null?void 0:oe[t]},A=e=>k(e)?.glassEffect===void 0?[]:[`glassEffect`,`glassTintColor`],ge={background:`backgroundColor`,gradient:`backgroundImage`,shadow:`boxShadow`,"border-color":`borderColor`,"border-top-color":`borderTopColor`,"border-bottom-color":`borderBottomColor`,backdropFilter:`backdropFilter`};function j(e){let t={},n={...b.finishes.shared[e],...b.finishes.dark[e],...b.finishes.light[e]};for(let[r,i]of Object.entries(ge))r in n&&Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>{let t=O(e)[r];if(r===`backdropFilter`){let n=k(e);if(n!==void 0&&(t===void 0||t===`none`))return`blur(${n.fallback.blur}px)`}return typeof t==`string`?D(t):void 0}});Object.defineProperty(t,"foreground",{enumerable:!1,configurable:!0,get:()=>D(me(e,`foreground`))}),Object.defineProperty(t,"pressedBackground",{enumerable:!1,configurable:!0,get:()=>{let t=O(e)[`pressed-background`];return typeof t==`string`?D(t):void 0}}),Object.defineProperty(t,"pressedForeground",{enumerable:!1,configurable:!0,get:()=>{let t=O(e)[`pressed-foreground`];return typeof t==`string`?D(t):void 0}}),Object.defineProperty(t,"pressedOpacity",{enumerable:!1,configurable:!0,get:()=>O(e)[`pressed-opacity`]}),Object.defineProperty(t,"checkedBackground",{enumerable:!1,configurable:!0,get:()=>{let t=O(e)[`checked-background`];return typeof t==`string`?D(t):void 0}}),Object.defineProperty(t,"checkedBorderColor",{enumerable:!1,configurable:!0,get:()=>{let t=O(e)[`checked-border-color`];return typeof t==`string`?D(t):void 0}}),Object.defineProperty(t,"checkedGradient",{enumerable:!1,configurable:!0,get:()=>{let t=O(e)[`checked-gradient`];return t===null?null:typeof t==`string`?D(t):void 0}});let r=t=>{let n=k(e);if(n?.glassEffect===void 0)return;if(t===`glassEffect`)return n.glassEffect;let r=O(e).background;return r===void 0?void 0:D(r)};return new Proxy(t,{ownKeys:t=>[...Reflect.ownKeys(t),...A(e)],getOwnPropertyDescriptor:(t,n)=>typeof n==`string`&&A(e).includes(n)?{value:r(n),enumerable:!0,configurable:!0,writable:!1}:Reflect.getOwnPropertyDescriptor(t,n),has:(t,n)=>Reflect.has(t,n)||typeof n==`string`&&A(e).includes(n),get:(e,t,n)=>typeof t==`string`&&(t===`glassEffect`||t===`glassTintColor`)?r(t):Reflect.get(e,t,n)})}function M(e){let t={};for(let n of Object.keys(e))Object.defineProperty(t,n,{enumerable:!0,get:()=>_(e[n])});return t}const N=M({background:`background`,card:`card`,inset:`inset`,raised:`raised`,muted:`muted`,field:`field`,input:`input`,border:`border`,line:`line`,brandEdge:`brand-edge`,foreground:`foreground`,mutedForeground:`muted-foreground`,faint:`faint`,brand:`brand`,primary:`primary`,primaryForeground:`primary-foreground`,sidebar:`sidebar`,sidebarAccent:`sidebar-accent`,sidebarBorder:`sidebar-border`,track:`track`,knob:`knob`,info:`info`,warn:`warn`,destructive:`destructive`,up:`up`,media:`media`,onMedia:`on-media`,inverse:`inverse`,inverseForeground:`inverse-foreground`,inverseBrand:`inverse-brand`});function P(e,t){return`color-mix(in srgb, ${e} ${Math.min(Math.max(t,0),1)*100}%, transparent)`}M({chart1:`chart-1`,chart2:`chart-2`,chart3:`chart-3`,chart4:`chart-4`,chart5:`chart-5`});const _e=M({brand:`brand-tint`,info:`info-tint`,warn:`warn-tint`,destructive:`destructive-tint`,up:`up-tint`,down:`down-tint`}),F={card:j(`card`),inset:j(`inset`),channel:j(`channel`),raised:j(`raised`),plate:j(`plate`),overlay:j(`overlay`),modal:j(`modal`),inverse:j(`inverse`),glass:j(`glass`),accent:j(`accent`),fill:j(`fill`),knob:j(`knob`),hover:j(`hover`),pressed:j(`pressed`),disabled:j(`disabled`)};function ve(e){ne(e?e.theme:null),x.set(e)}const I={get control(){return E(C().dimension.shape.control)},get container(){return E(C().dimension.shape.container)},get modal(){return E(C().dimension.shape.modal)},get button(){return C().shape.corners.button===`full`?999:I.control}},L={get hairline(){return C().dimension.stroke.hairline},get control(){return C().dimension.stroke.control}};w(le,()=>C().dimension.control);const ye={get borderCurve(){return C().shape.curve===`circular`?`circular`:`continuous`}};function be(e,t=0){return{borderRadius:Math.max(e-t,0),...ye}}const xe={"out-cubic":d.out(d.cubic),"in-cubic":d.in(d.cubic),"in-out-cubic":d.inOut(d.cubic),standard:d.bezier(.2,0,0,1),"emphasized-decelerate":d.bezier(.05,.7,.1,1),"emphasized-accelerate":d.bezier(.3,0,.8,.15),decelerate:d.bezier(0,0,0,1),accelerate:d.bezier(1,0,1,1),"point-to-point":d.bezier(.55,.55,0,1)},Se=e=>({duration:e.duration,timingFunction:xe[e.timingFunction]}),R=e=>{let t=m(()=>Se(e()));return new Proxy({},{get:(e,n)=>Reflect.get(t(),n),has:(e,n)=>n in t(),ownKeys:()=>Reflect.ownKeys(t()),getOwnPropertyDescriptor:(e,n)=>{let r=t();if(n in r)return{enumerable:!0,configurable:!0,value:Reflect.get(r,n)}}})};R(()=>C().motion.fast),R(()=>C().motion.default),R(()=>C().motion.slow),R(()=>C().motion.state);
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const Ce=[[`path`,{d:`m12 19-7-7 7-7`}],[`path`,{d:`M19 12H5`}]],we=[[`path`,{d:`M5 12h14`}],[`path`,{d:`m12 5 7 7-7 7`}]],Te=[[`path`,{d:`M20 6 9 17l-5-5`}]],Ee=[[`path`,{d:`m15 18-6-6 6-6`}]],De=[[`path`,{d:`m9 18 6-6-6-6`}]],Oe=[[`path`,{d:`M5 12h14`}],[`path`,{d:`M12 5v14`}]],z=[[`path`,{d:`M18 6 6 18`}],[`path`,{d:`m6 6 12 12`}]],B=Math.PI*2,ke=/* @__PURE__ */ new Set([`circle`,`ellipse`,`rect`,`line`]),V=(e,t,n=0)=>{
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
let r=e[t];return r==null?n:Number(r)},Ae=e=>{let t=String(e.points??``).trim();return t===``?[]:t.split(/[\s,]+/).map(Number)};function je(e,t,n,r){let i=()=>r.fill?n.fill():n.stroke();if(e===`path`){let e=String(t.d??``);if(e===``)return;let i=r.path(e);r.fill?n.fill(i):n.stroke(i)}else if(e===`polyline`||e===`polygon`){let r=Ae(t);if(r.length<4)return;n.beginPath(),n.moveTo(r[0],r[1]);for(let e=2;e+1<r.length;e+=2)n.lineTo(r[e],r[e+1]);e===`polygon`&&n.closePath(),i()}else if(ke.has(e)){switch(n.beginPath(),e){case`circle`:n.arc(V(t,`cx`),V(t,`cy`),V(t,`r`),0,B);break;case`ellipse`:n.ellipse(V(t,`cx`),V(t,`cy`),V(t,`rx`),V(t,`ry`),0,0,B);break;case`rect`:n.roundRect(V(t,`x`),V(t,`y`),V(t,`width`),V(t,`height`),V(t,`rx`,V(t,`ry`)));break;case`line`:n.moveTo(V(t,`x1`),V(t,`y1`)),n.lineTo(V(t,`x2`),V(t,`y2`))}i()}}function Me(e,t,n){let r=n.fill===!0;for(let[i,a]of e)je(i,a,t,{fill:r,path:n.path})}const H=/* @__PURE__ */ new Map;function Ne(e){let t=H.get(e);return t||(t=new f(e),H.set(e,t)),t}const Pe=/* @__PURE__ */ new Set([De,Ee,Ce,we]);function U(r){let a=r.size??20;return y&&r.icon===Te?(()=>{let n=i(`text`);t(n,`style`,()=>({color:r.tint}));let a=l(`✓`);return e(n,a),n})():n(u,{get class(){return Pe.has(r.icon)?`rtl:-scale-x-100`:void 0},style:{pointerEvents:`none`,width:a,height:a},draw:(e,{width:t})=>{e.scale(t/24,t/24),e.strokeStyle=r.tint,e.fillStyle=r.tint,e.lineWidth=r.weight??2,e.lineCap=`round`,e.lineJoin=`round`,Me(r.icon,e,{fill:r.fill,path:Ne})}})}const Fe=e=>typeof e==`function`?e():e,Ie={top:{top:0,left:12,right:12,height:5},bottom:{bottom:0,left:12,right:12,height:5},left:{left:0,top:12,bottom:12,width:5},right:{right:0,top:12,bottom:12,width:5},topLeft:{top:0,left:0,width:12,height:12},topRight:{top:0,right:0,width:12,height:12},bottomLeft:{bottom:0,left:0,width:12,height:12},bottomRight:{bottom:0,right:0,width:12,height:12}},Le={close:`Close`,minimize:`Minimize`,maximize:`Zoom`},Re={close:`Close`,minimize:`Minimize`,maximize:`Maximize`},ze={close:`#FF5F57`,minimize:`#FEBC2E`,maximize:`#28C840`},Be=P(`#000000`,.5),Ve=P(`#000000`,.12);function W(){return{root:()=>({height:v().height||40,flexShrink:0,flexDirection:`row`,alignItems:`center`,gap:8,paddingStart:v().left+12,paddingEnd:v().right+12,backgroundColor:N.inset,borderBottomWidth:L.hairline,borderBottomColor:N.line}),controls:e=>e===`caption`?{flexDirection:`row`,alignSelf:`stretch`}:{flexDirection:`row`,alignItems:`center`,gap:8},light:(e,t)=>({width:12,height:12,borderRadius:6,alignItems:`center`,justifyContent:`center`,backgroundColor:t?ze[e]:P(N.foreground,.14),borderWidth:L.hairline,borderColor:Ve,transitionProperty:`colors`,transitionDuration:120}),glyph:e=>({alignItems:`center`,justifyContent:`center`,opacity:+!!e,transitionProperty:`opacity`,transitionDuration:120}),cell:()=>({width:46,alignSelf:`stretch`,alignItems:`center`,justifyContent:`center`,transitionProperty:`background-color`,transitionDuration:120}),resize:e=>({position:`absolute`,...Ie[e]})}}function G(e){let[,r]=re(e,[`variant`,`style`]),s=g(!1);return(e.variant??`traffic-lights`)===`caption`?(()=>{let o=i(`view`);return c(o,r),t(o,`style`,()=>[W().controls(`caption`),e.style??null]),a(o,[n(q,{control:`minimize`}),n(q,{control:`maximize`}),n(q,{control:`close`})]),o})():(()=>{let l=i(`view`);return c(l,r),o(l,`onMouseEnter`,()=>s.set(!0)),o(l,`onMouseLeave`,()=>s.set(!1)),t(l,`style`,()=>[W().controls(`traffic-lights`),e.style??null]),a(l,[n(K,{control:`close`,shown:s}),n(K,{control:`minimize`,shown:s}),n(K,{control:`maximize`,shown:s})]),l})()}function K(n){let r=W();return(()=>{let s=i(`view`);t(s,`desktop`,()=>({windowControl:n.control})),o(s,`role`,`button`),t(s,`accessibilityLabel`,()=>Le[n.control]),t(s,`style`,()=>[r.light(n.control,ae()?.focused??!0)]);let c=i(`view`);return t(c,`style`,()=>[r.glyph(Fe(n.shown)===!0)]),a(c,()=>He(n.control)),e(s,c),s})()}function q(e){let n=W();return(()=>{let r=i(`view`);return t(r,`desktop`,()=>({windowControl:e.control})),o(r,`role`,`button`),t(r,`accessibilityLabel`,()=>Re[e.control]),t(r,`hoverStyle`,()=>({backgroundColor:e.control===`close`?_e.destructive:P(N.foreground,.06)})),t(r,`style`,()=>[n.cell()]),a(r,()=>Ue(e.control)),r})()}function He(e){let t=Be;switch(e){case`close`:return n(U,{icon:z,size:8,tint:t,weight:2});case`minimize`:return(()=>{let e=i(`view`);return o(e,`style`,{width:6,height:1.5,borderRadius:1,backgroundColor:t}),e})();case`maximize`:return n(U,{icon:Oe,size:8,tint:t,weight:2})}}function Ue(e){switch(e){case`close`:return n(U,{icon:z,size:12,get tint(){return N.foreground},weight:1.25});case`minimize`:return(()=>{let e=i(`view`);return t(e,`style`,()=>({width:10,height:1,backgroundColor:N.foreground})),e})();case`maximize`:return(()=>{let e=i(`view`);return t(e,`style`,()=>({width:10,height:10,borderRadius:1.5,borderWidth:L.hairline,borderColor:N.foreground})),e})()}}const We={"nsh-gallery":()=>__nsh_import(`nsh-gallery.js`,[]),shadcn:()=>__nsh_import(`shadcn.js`,[]),"solid-glass":()=>__nsh_import(`solid-glass.js`,[]),apple:()=>__nsh_import(`apple.js`,[]),material:()=>__nsh_import(`material.js`,[]),winui:()=>__nsh_import(`winui.js`,[])};function Ge(e){return We[e]().then(e=>e.default)}const Ke=[{id:`nsh-gallery`,label:`NSH Gallery`,description:`The library's own: graphite surfaces, one citrus accent, 8-point controls and 14-point cards.`},{id:`shadcn`,label:`shadcn/ui`,description:`shadcn/ui's neutral palette: near-black and near-white fills, flat finishes, 8-point controls and 14-point cards.`},{id:`solid-glass`,label:`Solid Glass`,description:`Panes of thick smoky glass: a rim of light on each top edge, a hairline round it, a shadow underneath, 11-point controls and 20-point cards.`},{id:`apple`,label:`Apple`,description:`Apple's system colors and Liquid Glass: capsule controls, 20-point cards, hairline edges, and glass on the overlays that float.`},{id:`material`,label:`Material`,description:`Material 3 Expressive: tonal surfaces, capsule controls, circular corners, 8/10/10% state layers, and expressive shapes.`},{id:`winui`,label:`WinUI 3`,description:`WinUI 3 (Windows 11): WinUI fill and stroke tokens, 4/8-point circular corners, Segoe UI Variable, Consolas, double focus rings, and timing motion.`}],J=globalThis,Y=(()=>{for(let e of[J.parent?.document,J.document]){let t=e?.getElementById(`app`);if(t)return t}return null})();Y&&(Y.style.visibility=`hidden`),qe();async function qe(){let e=null;try{let t=await p.getItem(`palette`),n=Ke.find(e=>e.id===t);n&&(ve(await Ge(n.id)),await Je(),e=n.id)}finally{Y&&(Y.style.visibility=``)}e&&await p.setItem(`palette-drawn`,e)}function Je(){return new Promise(e=>{requestAnimationFrame(()=>requestAnimationFrame(()=>e()))})}h.desktop;const X=w([`title`,`note`,`body`,`row`,`pad`,`gap`],()=>{let{typography:e,dimension:t}=C();return{title:e.title.fontSize[T],note:e.detail.fontSize[T],body:e.body.fontSize[T],row:t.size.height[T].lg,...t.size.density[T]}}),Ye={row:16,padding:0,gap:8,label:14,detail:12,control:24,check:12,dot:6,tabs:16,line:16,clear:16,switch:`small`};w([`row`,`padding`,`gap`,`label`,`detail`,`control`,`check`,`dot`,`tabs`,`line`,`clear`,`switch`],()=>{if(y)return Ye;let{typography:e,dimension:t}=C(),{height:n}=t.size,r=t.icon;return{row:n[T].lg,line:n[T].lg,tabs:n[T].lg,control:r[T].md,clear:r[T].md,check:r[T].sm,...t.size.control[T],label:e.label.fontSize[T],detail:e.detail.fontSize[T]}});function Xe(e){return y?{borderWidth:L.hairline,borderColor:N.border,paddingVertical:15,paddingHorizontal:15}:{backgroundColor:F.card.backgroundColor,...be(I.container),borderWidth:L.hairline,borderColor:F.card.borderColor,boxShadow:F.card.boxShadow,...e?.padded?{padding:X.pad}:{}}}m(()=>!y&&ie().width<600);function Ze(n){return(()=>{let o=i(`scroll`);t(o,`style`,()=>({flex:1,backgroundColor:N.background})),t(o,`contentStyle`,()=>({flexGrow:1,padding:20,gap:X.gap+2}));let s=i(`view`);t(s,`style`,()=>n.width===void 0?{flex:1,gap:X.gap+2}:{flex:1,width:`100%`,maxWidth:n.width,alignSelf:`center`,gap:X.gap+2});let c=i(`text`);return t(c,`style`,()=>({fontSize:22,fontWeight:`700`,color:N.foreground})),a(c,()=>n.title),e(s,c),a(s,[()=>n.children,r(()=>n.note,()=>(()=>{let e=i(`text`);return t(e,`style`,()=>({fontSize:13,color:N.mutedForeground})),a(e,()=>typeof n.note==`function`?n.note():n.note),e})())]),e(o,s),o})()}function Z(e){return(()=>{let n=i(`view`);return t(n,`style`,()=>[Xe({padded:e.padded??!0}),{gap:X.gap+4},e.style??null]),a(n,()=>e.children),n})()}function Q(n){return(()=>{let r=i(`view`);o(r,`style`,{gap:8});let s=i(`text`);t(s,`style`,()=>({fontSize:X.note,color:N.mutedForeground})),a(s,()=>n.title);let c=i(`view`);return t(c,`style`,()=>n.axis===`block`?{flexDirection:`column`,alignItems:`stretch`,gap:8}:{flexDirection:`row`,flexWrap:`wrap`,alignItems:`center`,gap:8}),a(c,()=>n.children),e(r,s),e(r,c),r})()}s(null,`{
  "name": "NSH Gallery",
  "cssVars": {
    "theme": {
      "radius": "8px",
      "radius-control": "8px",
      "radius-container": "12px",
      "radius-modal": "14px",
      "scrim": "oklch(0 0 0 / 0.45)",
      "media": "oklch(0.1869 0.0151 266.766)",
      "on-media": "oklch(1 0 0)"
    },
    "light": {
      "background": "oklch(0.97399 0.00397 286.326)",
      "foreground": "oklch(0.18636 0.01318 264.182)",
      "card": "oklch(1 0 0)",
      "card-foreground": "var(--foreground)",
      "popover": "oklch(0.97997 0.00397 286.326)",
      "popover-foreground": "var(--foreground)",
      "primary": "oklch(0.89637 0.16627 124.031)",
      "primary-foreground": "oklch(0.19339 0.0197 121.819)",
      "secondary": "var(--raised)",
      "secondary-foreground": "var(--foreground)",
      "muted": "oklch(0.95222 0.00415 271.369)",
      "muted-foreground": "oklch(0.49859 0.01219 261.766)",
      "accent": "oklch(0.93609 0.00346 247.86)",
      "accent-foreground": "var(--foreground)",
      "destructive": "oklch(0.58301 0.18974 19.874)",
      "border": "oklch(0.84192 0.00298 264.54)",
      "input": "oklch(0.81386 0.003 264.54)",
      "ring": "oklch(0.7307 0.01549 264.473)",
      "chart-1": "oklch(0.75073 0.18465 126.794)",
      "chart-2": "oklch(0.35944 0.01112 264.426)",
      "chart-3": "oklch(0.60539 0.01485 262.354)",
      "chart-4": "oklch(0.78155 0.01087 261.785)",
      "chart-5": "oklch(0.90374 0.00421 271.366)",
      "sidebar": "oklch(0.94619 0.00416 271.368)",
      "sidebar-foreground": "var(--foreground)",
      "sidebar-primary": "var(--primary)",
      "sidebar-primary-foreground": "var(--primary-foreground)",
      "sidebar-accent": "var(--field)",
      "sidebar-accent-foreground": "var(--foreground)",
      "sidebar-border": "oklch(0.90146 0.00405 286.318)",
      "sidebar-ring": "var(--ring)",
      "inset": "oklch(0.96124 0.00414 271.369)",
      "raised": "oklch(0.96724 0.00414 271.369)",
      "field": "oklch(1 0 0)",
      "line": "oklch(0.91973 0.00403 286.32)",
      "hover": "color-mix(in srgb, var(--foreground) 5%, transparent)",
      "faint": "oklch(0.69542 0.00939 264.505)",
      "brand": "oklch(0.55192 0.15368 133.676)",
      "brand-edge": "var(--border)",
      "track": "oklch(0.93714 0.00417 271.368)",
      "knob": "oklch(1 0 0)",
      "info": "oklch(0.53418 0.17531 266.181)",
      "warn": "oklch(0.5909 0.13245 65.117)",
      "up": "oklch(0.56078 0.1232 159.355)",
      "brand-tint": "oklch(0.74395 0.18452 127.154 / 0.16)",
      "inverse": "var(--card)",
      "inverse-foreground": "var(--foreground)",
      "inverse-brand": "var(--primary-foreground)",
      "info-tint": "color-mix(in srgb, var(--info) 10%, transparent)",
      "warn-tint": "color-mix(in srgb, var(--warn) 11%, transparent)",
      "destructive-tint": "color-mix(in srgb, var(--destructive) 10%, transparent)",
      "up-tint": "color-mix(in srgb, var(--up) 10%, transparent)",
      "down-tint": "oklch(0.58301 0.18974 19.874 / 0.1)"
    },
    "dark": {
      "background": "oklch(0.21297 0.01273 264.257)",
      "foreground": "oklch(0.95193 0.00289 264.542)",
      "card": "oklch(0.25145 0.01219 264.328)",
      "popover": "oklch(0.25145 0.01219 264.328)",
      "primary": "oklch(0.88837 0.16324 123.959)",
      "primary-foreground": "oklch(0.19339 0.0197 121.819)",
      "muted": "oklch(0.29661 0.01168 264.381)",
      "muted-foreground": "oklch(0.69819 0.01118 261.782)",
      "accent": "oklch(0.32053 0.01145 264.401)",
      "destructive": "oklch(0.70034 0.19197 18.007)",
      "border": "oklch(0.32447 0.01141 264.404)",
      "input": "oklch(0.3556 0.01115 264.424)",
      "inset": "oklch(0.23027 0.01247 264.293)",
      "raised": "oklch(0.32935 0.01092 271.072)",
      "field": "oklch(0.21297 0.01273 264.257)",
      "line": "oklch(0.30863 0.01156 264.391)",
      "hover": "color-mix(in srgb, var(--foreground) 5%, transparent)",
      "faint": "oklch(0.54061 0.01194 261.771)",
      "brand": "oklch(0.90469 0.16668 124.297)",
      "brand-edge": "var(--border)",
      "track": "oklch(0.33232 0.01134 264.409)",
      "knob": "oklch(0.92199 0.00419 271.367)",
      "info": "oklch(0.7377 0.13479 263.817)",
      "warn": "oklch(0.82449 0.14865 73.346)",
      "up": "oklch(0.77932 0.14805 162.141)",
      "brand-tint": "color-mix(in srgb, var(--brand) 14%, transparent)",
      "inverse": "var(--card)",
      "inverse-foreground": "var(--foreground)",
      "inverse-brand": "var(--primary-foreground)",
      "info-tint": "color-mix(in srgb, var(--info) 16%, transparent)",
      "warn-tint": "color-mix(in srgb, var(--warn) 16%, transparent)",
      "destructive-tint": "color-mix(in srgb, var(--destructive) 16%, transparent)",
      "up-tint": "color-mix(in srgb, var(--up) 16%, transparent)",
      "down-tint": "oklch(0.70034 0.19197 18.007 / 0.16)",
      "card-foreground": "var(--foreground)",
      "popover-foreground": "var(--foreground)",
      "accent-foreground": "var(--foreground)",
      "secondary": "var(--raised)",
      "secondary-foreground": "var(--foreground)",
      "chart-1": "oklch(0.90469 0.16668 124.297)",
      "chart-2": "oklch(0.92503 0.00418 271.367)",
      "chart-3": "oklch(0.71149 0.01246 264.489)",
      "chart-4": "oklch(0.53054 0.01343 264.454)",
      "chart-5": "oklch(0.39359 0.01086 264.443)",
      "ring": "oklch(0.49837 0.01905 262.684)",
      "sidebar": "oklch(0.18636 0.01318 264.182)",
      "sidebar-foreground": "var(--foreground)",
      "sidebar-accent": "oklch(0.27631 0.0119 264.36)",
      "sidebar-accent-foreground": "var(--foreground)",
      "sidebar-border": "oklch(0.27221 0.01194 264.355)",
      "sidebar-primary": "var(--primary)",
      "sidebar-primary-foreground": "var(--primary-foreground)",
      "sidebar-ring": "var(--ring)"
    }
  }
}
`,null,null);function $(s){return(()=>{let c=i(`view`);t(c,`style`,()=>({borderWidth:L.hairline,borderColor:N.border,borderRadius:10,overflow:`hidden`,backgroundColor:N.card}));let l=i(`view`);t(l,`style`,()=>({height:40,flexShrink:0,flexDirection:`row`,alignItems:`center`,gap:8,paddingStart:12,paddingEnd:s.variant===`caption`?0:12,backgroundColor:N.inset,borderBottomWidth:L.hairline,borderBottomColor:N.line}));let u=i(`text`);t(u,`style`,()=>({flex:1,minWidth:0,numberOfLines:1,fontSize:13,fontWeight:`600`,color:N.foreground})),a(u,()=>s.title),e(l,u),a(l,r(()=>s.variant===`traffic-lights`,()=>n(G,{})),u),a(l,r(()=>s.variant===`caption`,()=>n(G,{variant:`caption`})));let d=i(`view`);o(d,`style`,{padding:12,gap:4});let f=i(`text`);t(f,`style`,()=>({fontSize:13,color:N.foreground})),a(f,()=>s.lines[0]);let p=i(`text`);return t(p,`style`,()=>({fontSize:12,color:N.mutedForeground})),a(p,()=>s.lines[1]),e(d,f),e(d,p),e(c,l),e(c,d),c})()}function Qe(){return n(Ze,{title:`TitleBar`,note:`A title bar belongs to a window: TitleBar draws nothing in this preview, which has no window of the app's own. Run the page in an app (nsh run) and the bar is above the sections; the window controls below are parts, in windows this page draws.`,get children(){return[n(Z,{get children(){return n(Q,{title:`Traffic lights`,axis:`block`,get children(){return n($,{variant:`traffic-lights`,title:`Time sheet.nsh`,lines:[`Two days, 14 entries`,`Saved a minute ago`]})}})}}),n(Z,{get children(){return n(Q,{title:`Caption buttons`,axis:`block`,get children(){return n($,{variant:`caption`,title:`Notes.nsh`,lines:[`Three notes`,`Edited today`]})}})}})]}})}te(Qe);
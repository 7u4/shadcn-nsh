import{append as e,bindProp as t,component as n,cond as r,each as i,element as a,insert as o,merge as s,prop as c,setup as l,spread as ee,text as te}from"./facades/nsh-rt.547514bb2f.js";import{Canvas as ne,Easing as u,Path2D as re,Storage as ie,Text as ae,View as d,colorScheme as oe,computed as f,context as p,keymap as se,mount as ce,platform as m,setTheme as le,signal as h,split as ue,token as g,windowSize as _}from"./facades/nsh.6a7d3c4e81.js";import{Command as de}from"./facades/nsh-base.ae49c3c842.js";l(null,null,null,null,`{"id":"dev.shadcn-nsh.docs-demos","name":"command","version":"0.0.0","build":1,"development":false}`);
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const fe=[[`path`,{d:`m12 19-7-7 7-7`}],[`path`,{d:`M19 12H5`}]],pe=[[`path`,{d:`M5 12h14`}],[`path`,{d:`m12 5 7 7-7 7`}]],me=[[`path`,{d:`M20 6 9 17l-5-5`}]],he=[[`path`,{d:`m15 18-6-6 6-6`}]],ge=[[`path`,{d:`m9 18 6-6-6-6`}]],_e=[[`path`,{d:`M12 15V3`}],[`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`}],[`path`,{d:`m7 10 5 5 5-5`}]],ve=[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`}],[`path`,{d:`M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1`}],[`path`,{d:`M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1`}]],ye=[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`}],[`path`,{d:`M10 12.5 8 15l2 2.5`}],[`path`,{d:`m14 12.5 2 2.5-2 2.5`}]],be=[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`}],[`path`,{d:`M10 9H8`}],[`path`,{d:`M16 13H8`}],[`path`,{d:`M16 17H8`}]],xe=[[`path`,{d:`M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z`}]],Se=[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,ry:`2`}],[`circle`,{cx:`9`,cy:`9`,r:`2`}],[`path`,{d:`m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21`}]],Ce=[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`}]],we=[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`}]],Te=[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`}],[`path`,{d:`M9 3v18`}]],Ee=[[`path`,{d:`M5 12h14`}],[`path`,{d:`M12 5v14`}]],De=[[`path`,{d:`M14 4a1 1 0 0 1 1-1`}],[`path`,{d:`M15 10a1 1 0 0 1-1-1`}],[`path`,{d:`M21 4a1 1 0 0 0-1-1`}],[`path`,{d:`M21 9a1 1 0 0 1-1 1`}],[`path`,{d:`m3 7 3 3 3-3`}],[`path`,{d:`M6 10V5a2 2 0 0 1 2-2h2`}],[`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1`}]],v=[[`path`,{d:`m21 21-4.34-4.34`}],[`circle`,{cx:`11`,cy:`11`,r:`8`}]],Oe=[[`path`,{d:`M12 2v13`}],[`path`,{d:`m16 6-4-4-4 4`}],[`path`,{d:`M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8`}]],ke=[[`circle`,{cx:`12`,cy:`12`,r:`4`}],[`path`,{d:`M12 2v2`}],[`path`,{d:`M12 20v2`}],[`path`,{d:`m4.93 4.93 1.41 1.41`}],[`path`,{d:`m17.66 17.66 1.41 1.41`}],[`path`,{d:`M2 12h2`}],[`path`,{d:`M20 12h2`}],[`path`,{d:`m6.34 17.66-1.41 1.41`}],[`path`,{d:`m19.07 4.93-1.41 1.41`}]],Ae=[[`path`,{d:`M12 19h8`}],[`path`,{d:`m4 17 6-6-6-6`}]],je={glass:{glassEffect:`regular`,props:{ios:{backdropMaterial:`regular`}},fallback:{blur:30,minOpacity:.72}},acrylic:{props:{windows:{backdrop:{material:`blur`}}},fallback:{blur:30,minOpacity:.85}}}
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
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
;var Me={typography:{caption:{fontSize:{pointer:11,touch:12},lineHeight:{pointer:16,touch:16},fontWeight:400,letterSpacing:0},detail:{fontSize:{pointer:12,touch:13},lineHeight:{pointer:16,touch:20},fontWeight:400,letterSpacing:0},body:{fontSize:{pointer:13,touch:15},lineHeight:{pointer:20,touch:20},fontWeight:400,letterSpacing:0},label:{fontSize:{pointer:14,touch:15},lineHeight:{pointer:20,touch:20},fontWeight:500,letterSpacing:0},title:{fontSize:{pointer:16,touch:16},lineHeight:{pointer:24,touch:24},fontWeight:600,letterSpacing:0},headline:{fontSize:{pointer:20,touch:22},lineHeight:{pointer:28,touch:28},fontWeight:600,letterSpacing:0},display:{fontSize:{pointer:26,touch:28},lineHeight:{pointer:32,touch:36},fontWeight:600,letterSpacing:0}},dimension:{shape:{control:`{radius-control}`,container:`{radius-container}`,modal:`{radius-modal}`},size:{hit:{pointer:0,touch:44},density:{pointer:{pad:12,gap:12},touch:{pad:12,gap:12}},item:{pointer:{inset:4,pad:8},touch:{inset:8,pad:8}},control:{pointer:{padding:8,gap:8,dot:6,switch:`small`},touch:{padding:8,gap:8,dot:8,switch:`regular`}},height:{pointer:{sm:24,md:28,lg:32},touch:{sm:32,md:40,lg:48}}},stroke:{hairline:1,control:1},focus:{style:`halo`,width:3,offset:0},icon:{pointer:{sm:12,md:16,lg:20},touch:{sm:16,md:20,lg:24}},control:{field:`box`,choice:`well`,track:`sunk`,handle:`circle`}},shape:{curve:`continuous`,corners:{button:`radius`}},state:{"press-scale":.97,overlay:{hover:0,focus:0,pressed:0,dragged:0},ripple:!1,"pressed-opacity":.7,"rest-opacity":.5,disabled:{content:.5,fill:!1}},transition:{enter:{duration:420,timingFunction:`out-cubic`}},motion:{fast:{stiffness:1218,damping:70},default:{stiffness:520,damping:34},slow:{stiffness:320,damping:30},state:{duration:120,timingFunction:`out-cubic`}},finishes:{shared:{card:{background:`{card}`,foreground:`{foreground}`,"border-color":`{border}`,elevation:null},inset:{foreground:`{foreground}`,"border-color":`{border}`},channel:{background:`{inset}`,foreground:`{foreground}`,"border-color":`{border}`},raised:{background:`{raised}`,foreground:`{foreground}`,backdropFilter:`none`,material:null},plate:{foreground:`{foreground}`,elevation:null},overlay:{background:`{popover}`,foreground:`{foreground}`,"border-color":`{border}`,backdropFilter:`none`,material:null,elevation:null},modal:{background:`{card}`,foreground:`{foreground}`,"border-color":`{border}`,elevation:null},inverse:{background:`{inverse}`,foreground:`{inverse-foreground}`,"border-color":`{border}`,backdropFilter:`none`,material:null,elevation:null},glass:{foreground:`{foreground}`,"border-color":`{border}`,backdropFilter:`blur(20px)`,material:null,elevation:null},accent:{background:`{primary}`,foreground:`{primary-foreground}`,"border-color":`{brand-edge}`,"border-bottom-color":`{brand-edge}`,"pressed-opacity":.88,"pressed-background":null,"pressed-foreground":null},fill:{foreground:`{primary-foreground}`},knob:{foreground:`{foreground}`,"checked-gradient":null},hover:{foreground:`{foreground}`,elevation:null},pressed:{foreground:`{foreground}`,elevation:null},disabled:{background:`{raised}`,foreground:`{foreground}`,"border-color":`{border}`}},light:{card:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04)`},inset:{shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`},channel:{shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`},raised:{shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`,"border-top-color":`{border}`,"border-bottom-color":`{border}`},plate:{background:`{card}`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`},overlay:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},modal:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},inverse:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},glass:{background:`oklch(from {popover} l c h / 0.8)`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`},accent:{shadow:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`},fill:{background:`oklch(0.75073 0.18465 126.794)`,gradient:`linear-gradient(180deg, oklch(0.80472 0.1815 126.061) 0%, oklch(0.75073 0.18465 126.794) 100%)`,shadow:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`,"border-color":`oklch(0.69169 0.17204 126.956)`},knob:{background:`oklch(1 0 0)`,gradient:`linear-gradient(180deg, oklch(1 0 0) 0%, {raised} 100%)`,shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{input}`,"checked-border-color":`oklch(0.72099 0.15728 124.776)`},hover:{background:`{popover}`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`,"border-top-color":`{border}`,"border-bottom-color":`{border}`},pressed:{background:`{muted}`,shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`,"border-color":`{input}`},disabled:{shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`}},dark:{card:{shadow:`0 1px 0 oklch(0 0 0 / 0.35)`},inset:{shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`},channel:{shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`},raised:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`,"border-top-color":`oklch(0 0 0 / 0.5)`,"border-bottom-color":`oklch(0 0 0 / 0.5)`},plate:{background:`{raised}`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`},overlay:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},modal:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},inverse:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},glass:{background:`oklch(from {card} l c h / 0.78)`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`},accent:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`},fill:{background:`oklch(0.83973 0.16469 124.137)`,gradient:`linear-gradient(180deg, oklch(0.88348 0.15928 123.937) 0%, oklch(0.83973 0.16469 124.137) 100%)`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0.71963 0.15821 125.456)`},knob:{background:`{knob}`,gradient:`linear-gradient(180deg, {foreground} 0%, oklch(0.88185 0.00589 264.53) 100%)`,shadow:`0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0.8324 0.00597 264.528)`,"checked-border-color":`oklch(0.71963 0.15821 125.456)`,"checked-background":`oklch(1 0 0)`},hover:{background:`{input}`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`,"border-top-color":`oklch(0 0 0 / 0.5)`,"border-bottom-color":`oklch(0 0 0 / 0.5)`},pressed:{background:`{line}`,shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`,"border-color":`oklch(0 0 0 / 0.5)`},disabled:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`}}},elevation:{light:{sm:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,md:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04)`,lg:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`,xl:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`,inset:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`,edge:{surface:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6)`,accent:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`}},dark:{sm:`0 1px 1px oklch(0 0 0 / 0.12)`,md:`0 1px 0 oklch(0 0 0 / 0.35)`,lg:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`,xl:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`,inset:`inset 0 1px 1px oklch(0 0 0 / 0.2)`,edge:{surface:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08)`,accent:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`}}}};const y=m.idiom===`terminal`,Ne=()=>oe()!==`light`,Pe=[`field`,`choice`,`track`,`handle`],b=Me,Fe=h(null),Ie=()=>Fe()?.semantics??b,x=()=>Ie();function S(e,t){let n={};for(let r of e){let e=f(()=>t()[r]);Object.defineProperty(n,r,{enumerable:!0,get:()=>e()})}return n}const C=m.desktop?`pointer`:`touch`,Le=/^\{([a-z0-9-]+)\}$/,Re=/oklch\(from \{([a-z0-9-]+)\} l c h \/ ([\d.]+)\)/g,ze=(e,t)=>`${e.slice(0,7)}${Math.round(t*255).toString(16).padStart(2,`0`)}`,Be=e=>{let t=Le.exec(e);if(t){let e=g(t[1]);if(typeof e==`number`)return e}return Number(e)},w=e=>e.replace(Re,(e,t,n)=>{let r=g(t);return typeof r==`string`?ze(r,Number(n)):e}).replace(/\{([a-z0-9-]+)\}/g,(e,t)=>{let n=g(t);return typeof n==`string`?n:e}),Ve=e=>{let{finishes:t}=Ie(),n=Ne()?t.dark:t.light;return{...t.shared[e],...n[e]}},T=e=>Ve(e),He=(e,t)=>T(e)[t],Ue=e=>T(e).material??null,E=e=>{let t=Ue(e);return t===null?void 0:je[t]},D=e=>E(e)?.glassEffect===void 0?[]:[`glassEffect`,`glassTintColor`],We={background:`backgroundColor`,gradient:`backgroundImage`,shadow:`boxShadow`,"border-color":`borderColor`,"border-top-color":`borderTopColor`,"border-bottom-color":`borderBottomColor`,backdropFilter:`backdropFilter`};function O(e){let t={},n={...b.finishes.shared[e],...b.finishes.dark[e],...b.finishes.light[e]};for(let[r,i]of Object.entries(We))r in n&&Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>{let t=T(e)[r];if(r===`backdropFilter`){let n=E(e);if(n!==void 0&&(t===void 0||t===`none`))return`blur(${n.fallback.blur}px)`}return typeof t==`string`?w(t):void 0}});Object.defineProperty(t,"foreground",{enumerable:!1,configurable:!0,get:()=>w(He(e,`foreground`))}),Object.defineProperty(t,"pressedBackground",{enumerable:!1,configurable:!0,get:()=>{let t=T(e)[`pressed-background`];return typeof t==`string`?w(t):void 0}}),Object.defineProperty(t,"pressedForeground",{enumerable:!1,configurable:!0,get:()=>{let t=T(e)[`pressed-foreground`];return typeof t==`string`?w(t):void 0}}),Object.defineProperty(t,"pressedOpacity",{enumerable:!1,configurable:!0,get:()=>T(e)[`pressed-opacity`]}),Object.defineProperty(t,"checkedBackground",{enumerable:!1,configurable:!0,get:()=>{let t=T(e)[`checked-background`];return typeof t==`string`?w(t):void 0}}),Object.defineProperty(t,"checkedBorderColor",{enumerable:!1,configurable:!0,get:()=>{let t=T(e)[`checked-border-color`];return typeof t==`string`?w(t):void 0}}),Object.defineProperty(t,"checkedGradient",{enumerable:!1,configurable:!0,get:()=>{let t=T(e)[`checked-gradient`];return t===null?null:typeof t==`string`?w(t):void 0}});let r=t=>{let n=E(e);if(n?.glassEffect===void 0)return;if(t===`glassEffect`)return n.glassEffect;let r=T(e).background;return r===void 0?void 0:w(r)};return new Proxy(t,{ownKeys:t=>[...Reflect.ownKeys(t),...D(e)],getOwnPropertyDescriptor:(t,n)=>typeof n==`string`&&D(e).includes(n)?{value:r(n),enumerable:!0,configurable:!0,writable:!1}:Reflect.getOwnPropertyDescriptor(t,n),has:(t,n)=>Reflect.has(t,n)||typeof n==`string`&&D(e).includes(n),get:(e,t,n)=>typeof t==`string`&&(t===`glassEffect`||t===`glassTintColor`)?r(t):Reflect.get(e,t,n)})}function k(e){let t={};for(let n of Object.keys(e))Object.defineProperty(t,n,{enumerable:!0,get:()=>g(e[n])});return t}const A=k({background:`background`,card:`card`,inset:`inset`,raised:`raised`,muted:`muted`,field:`field`,input:`input`,border:`border`,line:`line`,brandEdge:`brand-edge`,foreground:`foreground`,mutedForeground:`muted-foreground`,faint:`faint`,brand:`brand`,primary:`primary`,primaryForeground:`primary-foreground`,sidebar:`sidebar`,sidebarAccent:`sidebar-accent`,sidebarBorder:`sidebar-border`,track:`track`,knob:`knob`,info:`info`,warn:`warn`,destructive:`destructive`,up:`up`,media:`media`,onMedia:`on-media`,inverse:`inverse`,inverseForeground:`inverse-foreground`,inverseBrand:`inverse-brand`});function Ge(e,t){return`color-mix(in srgb, ${e} ${Math.min(Math.max(t,0),1)*100}%, transparent)`}k({chart1:`chart-1`,chart2:`chart-2`,chart3:`chart-3`,chart4:`chart-4`,chart5:`chart-5`}),k({brand:`brand-tint`,info:`info-tint`,warn:`warn-tint`,destructive:`destructive-tint`,up:`up-tint`,down:`down-tint`});const j={card:O(`card`),inset:O(`inset`),channel:O(`channel`),raised:O(`raised`),plate:O(`plate`),overlay:O(`overlay`),modal:O(`modal`),inverse:O(`inverse`),glass:O(`glass`),accent:O(`accent`),fill:O(`fill`),knob:O(`knob`),hover:O(`hover`),pressed:O(`pressed`),disabled:O(`disabled`)};function M(e){le(e?e.theme:null),Fe.set(e)}const N={size:e=>x().typography[e].fontSize[C],lineHeight:e=>x().typography[e].lineHeight[C],weight:e=>x().typography[e].fontWeight,letterSpacing:e=>x().typography[e].letterSpacing},P={get control(){return Be(x().dimension.shape.control)},get container(){return Be(x().dimension.shape.container)},get modal(){return Be(x().dimension.shape.modal)},get button(){return x().shape.corners.button===`full`?999:P.control}},F={get hairline(){return x().dimension.stroke.hairline},get control(){return x().dimension.stroke.control}};S(Pe,()=>x().dimension.control);const Ke={get borderCurve(){return x().shape.curve===`circular`?`circular`:`continuous`}};function I(e,t=0){return{borderRadius:Math.max(e-t,0),...Ke}}const qe={"out-cubic":u.out(u.cubic),"in-cubic":u.in(u.cubic),"in-out-cubic":u.inOut(u.cubic),standard:u.bezier(.2,0,0,1),"emphasized-decelerate":u.bezier(.05,.7,.1,1),"emphasized-accelerate":u.bezier(.3,0,.8,.15),decelerate:u.bezier(0,0,0,1),accelerate:u.bezier(1,0,1,1),"point-to-point":u.bezier(.55,.55,0,1)},Je=e=>`duration`in e?{duration:e.duration,timingFunction:qe[e.timingFunction]}:e,L=e=>{let t=f(()=>Je(e()));return new Proxy({},{get:(e,n)=>Reflect.get(t(),n),has:(e,n)=>n in t(),ownKeys:()=>Reflect.ownKeys(t()),getOwnPropertyDescriptor:(e,n)=>{let r=t();if(n in r)return{enumerable:!0,configurable:!0,value:Reflect.get(r,n)}}})};L(()=>x().motion.fast),L(()=>x().motion.default),L(()=>x().motion.slow),L(()=>x().motion.state);function R(e,t,n){if(typeof e==`string`||typeof e==`number`)return(()=>{let r=a(`text`);return c(r,`class`,t),c(r,`style`,n),o(r,e),r})();if(Array.isArray(e))return e.map(e=>R(e,t,n));if(typeof e==`function`){let r=e;return()=>R(r(),t,n)}return e}function Ye(e){return[()=>R(e.children,e.class,e.style)]}function Xe(){return{get kbd(){return{height:y?16:20,minWidth:y?void 0:20,paddingHorizontal:y?0:4,flexDirection:`row`,alignItems:`center`,justifyContent:`center`,flexShrink:0,...y?{}:I(P.control),borderWidth:y?0:F.control,borderColor:A.line,backgroundColor:y?`transparent`:g(`muted`)}},get text(){return{fontSize:y?14:12,fontWeight:N.weight(`label`),color:A.mutedForeground,...y?{fontFamily:`monospace`}:{},numberOfLines:1}},get group(){return{flexDirection:`row`,alignItems:`center`,gap:y?0:4,flexShrink:0}}}}function Ze(e){let[,r]=ue(e,[`children`,`style`]);return(()=>{let i=a(`view`);return ee(i,r),t(i,`style`,()=>[Xe().kbd,e.style??null]),o(i,n(Ye,{get style(){return Xe().text},get children(){return e.children}})),i})()}function z(e,t){let n=e??void 0,r=t??void 0;return n&&r?`${n} ${r}`:r??n}const Qe=Math.PI*2,$e=/* @__PURE__ */ new Set([`circle`,`ellipse`,`rect`,`line`]),B=(e,t,n=0)=>{let r=e[t];return r==null?n:Number(r)},et=e=>{let t=String(e.points??``).trim();return t===``?[]:t.split(/[\s,]+/).map(Number)};function tt(e,t,n,r){let i=()=>r.fill?n.fill():n.stroke();if(e===`path`){let e=String(t.d??``);if(e===``)return;let i=r.path(e);r.fill?n.fill(i):n.stroke(i)}else if(e===`polyline`||e===`polygon`){let r=et(t);if(r.length<4)return;n.beginPath(),n.moveTo(r[0],r[1]);for(let e=2;e+1<r.length;e+=2)n.lineTo(r[e],r[e+1]);e===`polygon`&&n.closePath(),i()}else if($e.has(e)){switch(n.beginPath(),e){case`circle`:n.arc(B(t,`cx`),B(t,`cy`),B(t,`r`),0,Qe);break;case`ellipse`:n.ellipse(B(t,`cx`),B(t,`cy`),B(t,`rx`),B(t,`ry`),0,0,Qe);break;case`rect`:n.roundRect(B(t,`x`),B(t,`y`),B(t,`width`),B(t,`height`),B(t,`rx`,B(t,`ry`)));break;case`line`:n.moveTo(B(t,`x1`),B(t,`y1`)),n.lineTo(B(t,`x2`),B(t,`y2`))}i()}}function nt(e,t,n){let r=n.fill===!0;for(let[i,a]of e)tt(i,a,t,{fill:r,path:n.path})}const rt=/* @__PURE__ */ new Map;function it(e){let t=rt.get(e);return t||(t=new re(e),rt.set(e,t)),t}const at=/* @__PURE__ */ new Set([ge,he,fe,pe]);function V(r){let i=r.size??20;return y&&r.icon===me?(()=>{let n=a(`text`);t(n,`style`,()=>({color:r.tint}));let i=te(`✓`);return e(n,i),n})():n(ne,{get class(){return at.has(r.icon)?`rtl:-scale-x-100`:void 0},style:{pointerEvents:`none`,width:i,height:i},draw:(e,{width:t})=>{e.scale(t/24,t/24),e.strokeStyle=r.tint,e.fillStyle=r.tint,e.lineWidth=r.weight??2,e.lineCap=`round`,e.lineJoin=`round`,nt(r.icon,e,{fill:r.fill,path:it})}})}const H=S([`inset`,`pad`],()=>y?{inset:0,pad:8}:x().dimension.size.item[C]);function ot(){return Math.max(H.inset,4)}function st(){let{inset:e}=H;return{paddingHorizontal:e,paddingVertical:e===0&&!y?8:e}}function ct(){let{inset:e}=H;return e===0||P.container===0?0:Math.max(2,P.container-e)}const lt={transitionDuration:150,transitionTimingFunction:`ease-out`};function ut(e){return{transitionProperty:e?`${e}, transform`:`transform`,...lt}}m.desktop;const U=S([`title`,`note`,`body`,`row`,`pad`,`gap`],()=>{let{typography:e,dimension:t}=x();return{title:e.title.fontSize[C],note:e.detail.fontSize[C],body:e.body.fontSize[C],row:t.size.height[C].lg,...t.size.density[C]}}),dt={row:16,padding:0,gap:8,label:14,detail:12,control:24,check:12,dot:6,tabs:16,line:16,clear:16,switch:`small`},W=S([`row`,`padding`,`gap`,`label`,`detail`,`control`,`check`,`dot`,`tabs`,`line`,`clear`,`switch`],()=>{if(y)return dt;let{typography:e,dimension:t}=x(),{height:n}=t.size,r=t.icon;return{row:n[C].lg,line:n[C].lg,tabs:n[C].lg,control:r[C].md,clear:r[C].md,check:r[C].sm,...t.size.control[C],label:e.label.fontSize[C],detail:e.detail.fontSize[C]}});function G(e){return y?{borderWidth:F.hairline,borderColor:A.border,paddingVertical:15,paddingHorizontal:15}:{backgroundColor:j.card.backgroundColor,...I(P.container),borderWidth:F.hairline,borderColor:j.card.borderColor,boxShadow:j.card.boxShadow,...e?.padded?{padding:U.pad}:{}}}function ft(){return{backgroundColor:A.inset,borderWidth:F.hairline,borderColor:A.line,...I(P.control),...j.inset}}f(()=>!y&&_().width<600);const K=m.desktop,q={get row(){return W.row},get rowSm(){return K?32:W.row},get detail(){return W.detail}},J={root:`overflow-hidden rounded-(--radius-container) border border-border bg-card`,searchBar:`flex-row flex-nowrap items-center gap-2 border-b border-border ${y?``:`px-3`}`,search:`min-w-0 flex-1 ${y?`px-2 `:``}${K?`h-11 text-sm`:`h-12 text-base`} text-foreground placeholder:text-muted-foreground`,group:`pt-2.5 pb-1`,separator:`my-1 h-px bg-border`,item:`group transition-colors duration-100 motion-reduce:transition-none hover:bg-hover focus:bg-brand-tint active:opacity-70 disabled:opacity-50`},Y={get list(){return st()},get item(){return I(ct())},get group(){return{paddingHorizontal:H.pad}},get separator(){return{marginHorizontal:-H.inset}}};function pt(e){return n(Ze,{get children(){return e.label}})}function mt(e){return(()=>{let n=a(`text`);return t(n,`style`,()=>({fontSize:11,fontWeight:N.weight(`title`),letterSpacing:.6,color:A.faint})),o(n,()=>e.group.heading.toLocaleUpperCase()),n})()}function ht(r){return(()=>{let i=a(`view`);t(i,`style`,()=>({minHeight:r.detail?q.row:q.rowSm,paddingVertical:ot(),flexDirection:`row`,alignItems:`center`,gap:10,paddingHorizontal:H.pad}));let s=a(`view`);c(s,`style`,{flex:1,minWidth:0,gap:1});let l=a(`text`);return t(l,`style`,()=>({fontSize:N.size(`body`),color:A.foreground,numberOfLines:1})),o(l,()=>r.entry.label),e(s,l),o(s,()=>r.detail?(()=>{let e=a(`text`);return t(e,`style`,()=>({fontSize:q.detail,color:A.mutedForeground,numberOfLines:1})),o(e,()=>r.detail),e})():null),e(i,s),o(i,()=>r.icon?n(V,{get icon(){return r.icon},size:16,get tint(){return A.mutedForeground}}):null,s),o(i,[()=>r.note?(()=>{let e=a(`text`);return t(e,`style`,()=>({fontSize:q.detail,color:A.faint,fontVariant:[`tabular-nums`]})),o(e,()=>r.note),e})():null,()=>K&&r.entry.shortcutLabel?n(pt,{get label(){return r.entry.shortcutLabel}}):null,()=>r.entry.checked?n(V,{icon:me,size:14,get tint(){return A.foreground}}):null]),i})()}function gt(e){return(()=>{let n=a(`text`);return t(n,`style`,()=>({paddingVertical:24,textAlign:`center`,fontSize:13,color:A.mutedForeground})),o(n,()=>e.label),n})()}function _t(){return{flexDirection:`row`,alignItems:`center`,flexWrap:`nowrap`,gap:8}}function vt(){return{flexGrow:1,flexShrink:1,flexBasis:0,minWidth:0,color:A.foreground,placeholderColor:A.mutedForeground}}function X(e,t){return t==null?e:[e,t]}function yt(e){let[,t]=ue(e,[`class`,`searchBarClass`,`searchBarStyle`,`searchClass`,`searchStyle`,`listClass`,`listStyle`,`itemClass`,`itemStyle`,`groupClass`,`groupStyle`,`separatorClass`,`separatorStyle`,`renderItem`,`renderGroup`,`empty`,`placeholder`,`searchPrefix`,`style`]);return n(de,s(t,{get class(){return z(J.root,e.class)},get searchBarClass(){return z(J.searchBar,e.searchBarClass)},get searchBarStyle(){return X(_t(),e.searchBarStyle)},get searchClass(){return z(J.search,e.searchClass)},get searchStyle(){return X(vt(),e.searchStyle)},get listClass(){return e.listClass},get listStyle(){return X(Y.list,e.listStyle)},get itemClass(){return z(J.item,e.itemClass)},get itemStyle(){return X(Y.item,e.itemStyle)},get groupClass(){return z(J.group,e.groupClass)},get groupStyle(){return X(Y.group,e.groupStyle)},get separatorClass(){return z(J.separator,e.separatorClass)},get separatorStyle(){return X(Y.separator,e.separatorStyle)},get placeholder(){return e.placeholder??`Type a command or search…`},get searchPrefix(){return e.searchPrefix===void 0?n(V,{icon:v,size:16,get tint(){return A.mutedForeground}}):e.searchPrefix},get renderItem(){return e.renderItem===void 0?e=>n(ht,{entry:e}):e.renderItem},get renderGroup(){return e.renderGroup===void 0?e=>n(mt,{group:e}):e.renderGroup},get empty(){return e.empty===void 0?n(gt,{label:`No results.`}):e.empty},get style(){return e.style}}))}const bt={default:()=>__nsh_import(`default.js`,[]),shadcn:()=>__nsh_import(`shadcn.js`,[]),"solid-glass":()=>__nsh_import(`solid-glass.js`,[]),apple:()=>__nsh_import(`apple.js`,[]),material:()=>__nsh_import(`material.js`,[]),winui:()=>__nsh_import(`winui.js`,[])};function xt(e){return bt[e]().then(e=>e.default)}const St=[{id:`default`,label:`NSH Gallery`,description:`The library's own: graphite surfaces, one citrus accent, 8-point controls and 14-point cards.`},{id:`shadcn`,label:`shadcn/ui`,description:`shadcn/ui's neutral palette: near-black and near-white fills, flat finishes, 8-point controls and 14-point cards.`},{id:`solid-glass`,label:`Solid Glass`,description:`Panes of thick smoky glass: a rim of light on each top edge, a hairline round it, a shadow underneath, 11-point controls and 20-point cards.`},{id:`apple`,label:`Apple`,description:`Apple's system colors and Liquid Glass: capsule controls, 20-point cards, hairline edges, and glass on the overlays that float.`},{id:`material`,label:`Material`,description:`Material 3 Expressive: tonal surfaces, capsule controls, circular corners, 8/10/10% state layers, and expressive springs.`},{id:`winui`,label:`WinUI 3`,description:`WinUI 3 (Windows 11): WinUI fill and stroke tokens, 4/8-point circular corners, Segoe UI Variable, Consolas, double focus rings, and timing motion.`}],Ct=globalThis,wt=await ie.getItem(`palette`),Tt=St.find(e=>e.id===wt);if(Tt){let e=await xt(Tt.id),t=(Ct.parent?.document??Ct.document)?.getElementById(`app`)??null;t&&(t.style.visibility=`hidden`),M(e),t&&requestAnimationFrame(()=>{M(null),M(e),requestAnimationFrame(()=>{requestAnimationFrame(()=>{t.style.visibility=``})})})}function Et(n){return(()=>{let i=a(`scroll`);t(i,`style`,()=>({flex:1,backgroundColor:A.background})),t(i,`contentStyle`,()=>({flexGrow:1,padding:20,gap:U.gap+2}));let s=a(`view`);t(s,`style`,()=>n.width===void 0?{flex:1,gap:U.gap+2}:{flex:1,width:`100%`,maxWidth:n.width,alignSelf:`center`,gap:U.gap+2});let c=a(`text`);return t(c,`style`,()=>({fontSize:22,fontWeight:`700`,color:A.foreground})),o(c,()=>n.title),e(s,c),o(s,[()=>n.children,r(()=>n.note,()=>(()=>{let e=a(`text`);return t(e,`style`,()=>({fontSize:13,color:A.mutedForeground})),o(e,()=>typeof n.note==`function`?n.note():n.note),e})())]),e(i,s),i})()}function Dt(e){return(()=>{let n=a(`view`);return t(n,`style`,()=>[G({padded:e.padded??!0}),{gap:U.gap+4},e.style??null]),o(n,()=>e.children),n})()}function Ot(n){return(()=>{let r=a(`view`);c(r,`style`,{gap:8});let i=a(`text`);t(i,`style`,()=>({fontSize:U.note,color:A.mutedForeground})),o(i,()=>n.title);let s=a(`view`);return t(s,`style`,()=>n.axis===`block`?{flexDirection:`column`,alignItems:`stretch`,gap:8}:{flexDirection:`row`,flexWrap:`wrap`,alignItems:`center`,gap:8}),o(s,()=>n.children),e(r,i),e(r,s),r})()}m.desktop,p(null),p(`default`),m.desktop,p(null),p(null),ut(`background-color, border-color, box-shadow, opacity`);const kt=m.desktop,At=()=>_().width>=700,Z=()=>_().width>=900;function jt(e){let t=()=>e.gap??14,n=()=>({gap:t()}),r=d({get style(){return Z()?{width:`100%`,maxWidth:e.width??440,gap:t()}:n()},get children(){return e.children}}),i=d({get style(){return Z()?{flex:1,minWidth:0,borderRadius:P.container,borderWidth:1,borderColor:Q().line,backgroundColor:Ge(Q().text,.02),padding:24,alignItems:`center`,justifyContent:`center`}:n()},children:r}),a=d({get style(){return Z()?{width:300,gap:12}:{flex:e.grow?1:void 0,gap:t()}},get children(){return e.inspector}});return d({get style(){return Z()?{flex:1,flexDirection:`row`,gap:16}:{flex:e.grow?1:void 0,gap:t()}},children:[i,a]})}function Mt(e){let t=ae({get style(){return{fontSize:12,color:Q().muted}},get children(){return e.title}});return d({get style(){return{...ft(),padding:12,gap:4,minHeight:e.minHeight,flex:e.grow?1:void 0}},get children(){return[t,e.children]}})}function Nt(e){return Mt({get title(){return e.title},get minHeight(){return e.minHeight},get grow(){return e.grow??Z()},get children(){return i(()=>e.lines,(e,t)=>ae({get style(){return{fontSize:12,color:t()===0?Q().text:Q().faint}},get children(){return e()}}),`index`)}})}const Q=()=>({page:A.background,text:A.foreground,muted:A.mutedForeground,faint:A.faint,border:A.border,line:A.line,accent:A.brand,onAccent:A.primaryForeground,onPrimary:A.primaryForeground,up:A.up,down:A.destructive,info:A.info,warn:A.warn,danger:A.destructive,onMedia:A.onMedia,card:{...G(),backgroundColor:A.card},row:{...G(),backgroundColor:A.card},inset:{backgroundColor:A.inset,borderWidth:1,borderColor:A.line,...j.inset},raised:{backgroundColor:A.raised,borderWidth:1,borderColor:A.border,...j.raised},primary:{backgroundColor:A.primary,borderWidth:1,...j.accent},accentFill:{backgroundColor:A.primary,borderWidth:1,borderColor:A.brand,...j.accent}});l(null,`{
  "name": "NSH Gallery UI",
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
      "popover": "var(--card)",
      "popover-foreground": "var(--foreground)",
      "primary": "oklch(0.89637 0.16627 124.031)",
      "primary-foreground": "oklch(0.19339 0.0197 121.819)",
      "secondary": "oklch(0.96724 0.00414 271.369)",
      "secondary-foreground": "var(--foreground)",
      "muted": "oklch(0.95222 0.00415 271.369)",
      "muted-foreground": "oklch(0.49859 0.01219 261.766)",
      "accent": "var(--muted)",
      "accent-foreground": "var(--foreground)",
      "destructive": "oklch(0.58301 0.18974 19.874)",
      "border": "oklch(0.84192 0.00298 264.54)",
      "input": "var(--border)",
      "ring": "var(--muted-foreground)",
      "chart-1": "var(--primary)",
      "chart-2": "var(--info)",
      "chart-3": "var(--up)",
      "chart-4": "var(--warn)",
      "chart-5": "var(--destructive)",
      "sidebar": "var(--background)",
      "sidebar-foreground": "var(--foreground)",
      "sidebar-primary": "var(--primary)",
      "sidebar-primary-foreground": "var(--primary-foreground)",
      "sidebar-accent": "var(--muted)",
      "sidebar-accent-foreground": "var(--foreground)",
      "sidebar-border": "var(--line)",
      "sidebar-ring": "var(--muted-foreground)",
      "inset": "var(--muted)",
      "raised": "var(--secondary)",
      "field": "var(--card)",
      "line": "oklch(0.91973 0.00403 286.32)",
      "hover": "var(--muted)",
      "faint": "oklch(0.69542 0.00939 264.505)",
      "brand": "var(--primary)",
      "brand-edge": "var(--border)",
      "track": "var(--muted)",
      "knob": "var(--card)",
      "info": "oklch(0.53418 0.17531 266.181)",
      "warn": "oklch(0.5909 0.13245 65.117)",
      "up": "oklch(0.56078 0.1232 159.355)",
      "brand-tint": "color-mix(in srgb, var(--primary) 10%, transparent)",
      "inverse": "var(--card)",
      "inverse-foreground": "var(--foreground)",
      "inverse-brand": "var(--primary-foreground)",
      "info-tint": "color-mix(in srgb, var(--info) 10%, transparent)",
      "warn-tint": "color-mix(in srgb, var(--warn) 10%, transparent)",
      "destructive-tint": "color-mix(in srgb, var(--destructive) 10%, transparent)",
      "up-tint": "color-mix(in srgb, var(--up) 10%, transparent)",
      "down-tint": "color-mix(in srgb, var(--destructive) 10%, transparent)"
    },
    "dark": {
      "background": "oklch(0.21297 0.01273 264.257)",
      "foreground": "oklch(0.95193 0.00289 264.542)",
      "card": "oklch(0.25145 0.01219 264.328)",
      "popover": "var(--card)",
      "primary": "oklch(0.88837 0.16324 123.959)",
      "primary-foreground": "oklch(0.19339 0.0197 121.819)",
      "muted": "oklch(0.29661 0.01168 264.381)",
      "muted-foreground": "oklch(0.69819 0.01118 261.782)",
      "accent": "var(--muted)",
      "destructive": "oklch(0.70034 0.19197 18.007)",
      "border": "oklch(0.32447 0.01141 264.404)",
      "input": "var(--border)",
      "inset": "var(--muted)",
      "raised": "var(--secondary)",
      "field": "var(--card)",
      "line": "oklch(0.30863 0.01156 264.391)",
      "hover": "var(--muted)",
      "faint": "oklch(0.54061 0.01194 261.771)",
      "brand": "var(--primary)",
      "brand-edge": "var(--border)",
      "track": "var(--muted)",
      "knob": "var(--foreground)",
      "info": "oklch(0.7377 0.13479 263.817)",
      "warn": "oklch(0.82449 0.14865 73.346)",
      "up": "oklch(0.77932 0.14805 162.141)",
      "brand-tint": "color-mix(in srgb, var(--primary) 10%, transparent)",
      "inverse": "var(--card)",
      "inverse-foreground": "var(--foreground)",
      "inverse-brand": "var(--primary-foreground)",
      "info-tint": "color-mix(in srgb, var(--info) 10%, transparent)",
      "warn-tint": "color-mix(in srgb, var(--warn) 10%, transparent)",
      "destructive-tint": "color-mix(in srgb, var(--destructive) 10%, transparent)",
      "up-tint": "color-mix(in srgb, var(--up) 10%, transparent)",
      "down-tint": "color-mix(in srgb, var(--destructive) 10%, transparent)",
      "card-foreground": "var(--foreground)",
      "popover-foreground": "var(--foreground)",
      "accent-foreground": "var(--foreground)",
      "secondary": "oklch(0.32935 0.01092 271.072)",
      "secondary-foreground": "var(--foreground)",
      "chart-1": "var(--primary)",
      "chart-2": "var(--info)",
      "chart-3": "var(--up)",
      "chart-4": "var(--warn)",
      "chart-5": "var(--destructive)",
      "ring": "var(--muted-foreground)",
      "sidebar": "var(--background)",
      "sidebar-foreground": "var(--foreground)",
      "sidebar-accent": "var(--muted)",
      "sidebar-accent-foreground": "var(--foreground)",
      "sidebar-border": "var(--line)",
      "sidebar-primary": "var(--primary)",
      "sidebar-primary-foreground": "var(--primary-foreground)",
      "sidebar-ring": "var(--muted-foreground)"
    }
  }
}
`,null,null);const Pt={new:Ee,open:xe,save:_e,share:Oe,find:v,replace:De,terminal:Ae,sidebar:Te,dark:we,light:ke,docs:be,feedback:Ce},Ft=h(`dark`),It=h(null),$=h(``),Lt=h([]),Rt=e=>Lt.set([e,...Lt()].slice(0,4));let zt;const Bt=()=>[{id:`new`,label:`New File`,group:`File`,shortcut:`mod+n`},{id:`open`,label:`Open Folder…`,group:`File`,shortcut:`mod+o`},{id:`save`,label:`Save All`,group:`File`,shortcut:`mod+alt+s`},{id:`share`,label:`Share Project`,group:`File`,disabled:!0},{id:`find`,label:`Find in Files`,group:`Edit`,shortcut:`mod+shift+f`,keywords:[`search`,`grep`]},{id:`replace`,label:`Replace in Files`,group:`Edit`,shortcut:`mod+shift+h`},{id:`terminal`,label:`Toggle Terminal`,group:`View`,shortcut:`ctrl+j`,keywords:[`console`,`shell`]},{id:`sidebar`,label:`Toggle Sidebar`,group:`View`,shortcut:`mod+b`},{id:`dark`,label:`Dark Appearance`,group:`View`,keywords:[`theme`],checked:Ft()===`dark`},{id:`light`,label:`Light Appearance`,group:`View`,keywords:[`theme`],checked:Ft()===`light`},{id:`docs`,label:`Open Documentation`,group:`Help`,keywords:[`guide`,`manual`]},{id:`feedback`,label:`Send Feedback`,group:`Help`}],Vt=[`rs`,`tsx`,`md`,`json`,`png`],Ht=Array.from({length:5e3},(e,t)=>{let n=Vt[t%Vt.length],r=`module-${String(Math.floor(t/100)+1).padStart(2,`0`)}`;return{id:`file-${t}`,label:`${r}/file-${t+1}.${n}`,group:r,keywords:[n]}}),Ut={rs:ye,tsx:ye,md:be,json:ve,png:Se},Wt=h(Ht.length);let Gt;const Kt=e=>e.slice(e.lastIndexOf(`.`)+1);function qt(){return se.bind(`mod+k`,()=>zt?.focus()),n(Et,{title:`Command`,get children(){return[(()=>{let e=a(`text`);return t(e,`style`,()=>({color:Q().muted})),o(e,()=>kt?`Type to filter, the arrows to move, Return to run, Escape to clear; ${se.label(`mod+k`)} focuses it`:`Type to filter, tap a command to run it`),e})(),n(jt,{gap:14,get inspector(){return[n(Mt,{title:`highlighted`,get children(){return(()=>{let e=a(`text`);return c(e,`class`,`text-foreground`),c(e,`style`,{fontSize:13}),o(e,()=>It()??`none`),e})()}}),n(Mt,{title:`query`,get children(){return(()=>{let e=a(`text`);return c(e,`class`,`text-foreground`),c(e,`style`,{fontSize:13}),o(e,()=>$()?`“${$()}”`:`empty`),e})()}}),n(Nt,{title:`events`,get lines(){return Lt()},minHeight:92})]},get children(){return(()=>{let e=a(`view`);return t(e,`style`,()=>({width:At()?380:void 0,alignSelf:At()?`center`:`stretch`})),o(e,n(yt,{ref:e=>zt=e,get items(){return Bt()},get query(){return $()},onQueryChange:({query:e})=>$.set(e),onHighlightChange:({highlighted:e})=>It.set(e),onCancel:()=>Rt(`onCancel()`),onSelect:({id:e})=>{(e===`dark`||e===`light`)&&Ft.set(e),Rt(`onSelect({ id: "${e}" })`)},accessibilityLabel:`Commands`,searchAccessibilityLabel:`Search commands`,style:{height:kt?360:400},get searchPrefix(){return n(V,{icon:v,size:16,get tint(){return Q().muted}})},get empty(){return n(gt,{label:`No commands match`})},renderGroup:e=>n(mt,{group:e}),renderItem:e=>n(ht,{entry:e,get icon(){return Pt[e.id]},get detail(){return e.id===`open`?`A folder on this Mac`:void 0},get note(){return e.disabled?`Pro`:void 0}})})),e})()}}),n(Dt,{get children(){return n(Ot,{title:`A long list`,axis:`block`,get children(){return[(()=>{let n=a(`text`);t(n,`style`,()=>({color:Q().muted}));let r=te(`Five thousand files in fifty folders: the field finds one by name or by extension, and the count under it is the palette's own, from its ref.`);return e(n,r),n})(),(()=>{let r=a(`view`);t(r,`style`,()=>({width:At()?380:void 0,alignSelf:`flex-start`}));let i=a(`text`);return t(i,`style`,()=>({paddingTop:8,fontSize:12,color:Q().muted,fontVariant:[`tabular-nums`]})),o(i,()=>`${Wt().toLocaleString(`en-US`)} of ${Ht.length.toLocaleString(`en-US`)} files, 50 folders`),e(r,i),o(r,n(yt,{ref:e=>Gt=e,items:Ht,accessibilityLabel:`Files`,searchAccessibilityLabel:`Search files`,placeholder:`Search files by name or extension…`,listClass:`h-60`,onQueryChange:()=>void Gt?.matchedCount().then(e=>Wt.set(e)),get empty(){return n(gt,{label:`No file matches`})},renderItem:e=>n(ht,{entry:e,get icon(){return Ut[Kt(e.label)]}})}),i),r})()]}})}})]}})}ce(qt);
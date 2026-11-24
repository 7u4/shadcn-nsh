import{append as e,bindProp as t,component as n,cond as r,each as i,element as a,insert as o,merge as s,prop as c,setup as l,spread as ee,text as te}from"./facades/nsh-rt.547514bb2f.js";import{Canvas as ne,Easing as u,Path2D as re,Storage as ie,Text as ae,View as d,colorScheme as oe,computed as se,context as f,keymap as ce,mount as le,platform as p,setTheme as ue,signal as m,split as de,token as h,windowSize as fe}from"./facades/nsh.6a7d3c4e81.js";import{Command as pe}from"./facades/nsh-base.ae49c3c842.js";l(null,null,null,null,`{"id":"dev.shadcn-nsh.docs-demos","name":"command","version":"0.0.0","build":1,"development":false}`);
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const me=[[`path`,{d:`m12 19-7-7 7-7`}],[`path`,{d:`M19 12H5`}]],he=[[`path`,{d:`M5 12h14`}],[`path`,{d:`m12 5 7 7-7 7`}]],ge=[[`path`,{d:`M20 6 9 17l-5-5`}]],_e=[[`path`,{d:`m15 18-6-6 6-6`}]],ve=[[`path`,{d:`m9 18 6-6-6-6`}]],ye=[[`path`,{d:`M12 15V3`}],[`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`}],[`path`,{d:`m7 10 5 5 5-5`}]],be=[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`}],[`path`,{d:`M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1`}],[`path`,{d:`M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1`}]],xe=[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`}],[`path`,{d:`M10 12.5 8 15l2 2.5`}],[`path`,{d:`m14 12.5 2 2.5-2 2.5`}]],Se=[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`}],[`path`,{d:`M10 9H8`}],[`path`,{d:`M16 13H8`}],[`path`,{d:`M16 17H8`}]],Ce=[[`path`,{d:`M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z`}]],we=[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,ry:`2`}],[`circle`,{cx:`9`,cy:`9`,r:`2`}],[`path`,{d:`m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21`}]],Te=[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`}]],Ee=[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`}]],De=[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`}],[`path`,{d:`M9 3v18`}]],Oe=[[`path`,{d:`M5 12h14`}],[`path`,{d:`M12 5v14`}]],ke=[[`path`,{d:`M14 4a1 1 0 0 1 1-1`}],[`path`,{d:`M15 10a1 1 0 0 1-1-1`}],[`path`,{d:`M21 4a1 1 0 0 0-1-1`}],[`path`,{d:`M21 9a1 1 0 0 1-1 1`}],[`path`,{d:`m3 7 3 3 3-3`}],[`path`,{d:`M6 10V5a2 2 0 0 1 2-2h2`}],[`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1`}]],g=[[`path`,{d:`m21 21-4.34-4.34`}],[`circle`,{cx:`11`,cy:`11`,r:`8`}]],Ae=[[`path`,{d:`M12 2v13`}],[`path`,{d:`m16 6-4-4-4 4`}],[`path`,{d:`M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8`}]],je=[[`circle`,{cx:`12`,cy:`12`,r:`4`}],[`path`,{d:`M12 2v2`}],[`path`,{d:`M12 20v2`}],[`path`,{d:`m4.93 4.93 1.41 1.41`}],[`path`,{d:`m17.66 17.66 1.41 1.41`}],[`path`,{d:`M2 12h2`}],[`path`,{d:`M20 12h2`}],[`path`,{d:`m6.34 17.66-1.41 1.41`}],[`path`,{d:`m19.07 4.93-1.41 1.41`}]],Me=[[`path`,{d:`M12 19h8`}],[`path`,{d:`m4 17 6-6-6-6`}]],Ne={glass:{glassEffect:`regular`,props:{ios:{backdropMaterial:`regular`}},fallback:{blur:30,minOpacity:.72}},acrylic:{props:{windows:{backdrop:{material:`blur`}}},fallback:{blur:30,minOpacity:.85}}}
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
;var Pe={typography:{caption:{fontSize:{pointer:11,touch:12},lineHeight:{pointer:16,touch:16},fontWeight:400,letterSpacing:0},detail:{fontSize:{pointer:12,touch:13},lineHeight:{pointer:16,touch:20},fontWeight:400,letterSpacing:0},body:{fontSize:{pointer:13,touch:15},lineHeight:{pointer:20,touch:20},fontWeight:400,letterSpacing:0},label:{fontSize:{pointer:14,touch:15},lineHeight:{pointer:20,touch:20},fontWeight:500,letterSpacing:0},title:{fontSize:{pointer:16,touch:16},lineHeight:{pointer:24,touch:24},fontWeight:600,letterSpacing:0},headline:{fontSize:{pointer:20,touch:22},lineHeight:{pointer:28,touch:28},fontWeight:600,letterSpacing:0},display:{fontSize:{pointer:26,touch:28},lineHeight:{pointer:32,touch:36},fontWeight:600,letterSpacing:0}},dimension:{shape:{control:`{radius-control}`,container:`{radius-container}`,modal:`{radius-modal}`},size:{hit:{pointer:0,touch:44},density:{pointer:{pad:12,gap:12},touch:{pad:12,gap:12}},item:{pointer:{inset:4,pad:8},touch:{inset:8,pad:8}},control:{pointer:{padding:8,gap:8,dot:6,switch:`small`},touch:{padding:8,gap:8,dot:8,switch:`regular`}},height:{pointer:{sm:24,md:28,lg:32},touch:{sm:32,md:40,lg:48}}},stroke:{hairline:1,control:1},focus:{style:`halo`,width:3,offset:0},icon:{pointer:{sm:12,md:16,lg:20},touch:{sm:16,md:20,lg:24}},control:{field:`box`,choice:`well`,track:`sunk`,handle:`circle`}},shape:{curve:`continuous`,corners:{button:`radius`}},state:{"press-scale":.97,overlay:{hover:0,focus:0,pressed:0,dragged:0},"pressed-opacity":.7,"rest-opacity":.5,disabled:{content:.5,fill:!1}},transition:{enter:{duration:420,timingFunction:`out-cubic`}},motion:{fast:{duration:150,timingFunction:`out-cubic`},default:{duration:250,timingFunction:`out-cubic`},slow:{duration:350,timingFunction:`out-cubic`},state:{duration:120,timingFunction:`out-cubic`}},finishes:{shared:{card:{background:`{card}`,foreground:`{foreground}`,"border-color":`{border}`,elevation:null},inset:{foreground:`{foreground}`,"border-color":`{border}`},channel:{background:`{inset}`,foreground:`{foreground}`,"border-color":`{border}`},raised:{background:`{raised}`,foreground:`{foreground}`,backdropFilter:`none`,material:null},plate:{foreground:`{foreground}`,elevation:null},overlay:{background:`{popover}`,foreground:`{foreground}`,"border-color":`{border}`,backdropFilter:`none`,material:null,elevation:null},modal:{background:`{card}`,foreground:`{foreground}`,"border-color":`{border}`,elevation:null},inverse:{background:`{inverse}`,foreground:`{inverse-foreground}`,"border-color":`{border}`,backdropFilter:`none`,material:null,elevation:null},glass:{foreground:`{foreground}`,"border-color":`{border}`,backdropFilter:`blur(20px)`,material:null,elevation:null},accent:{background:`{primary}`,foreground:`{primary-foreground}`,"border-color":`{brand-edge}`,"border-bottom-color":`{brand-edge}`,"pressed-opacity":.88,"pressed-background":null,"pressed-foreground":null},fill:{foreground:`{primary-foreground}`},knob:{foreground:`{foreground}`,"checked-gradient":null},hover:{foreground:`{foreground}`,elevation:null},pressed:{foreground:`{foreground}`,elevation:null},disabled:{background:`{raised}`,foreground:`{foreground}`,"border-color":`{border}`}},light:{card:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04)`},inset:{shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`},channel:{shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`},raised:{shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`,"border-top-color":`{border}`,"border-bottom-color":`{border}`},plate:{background:`{card}`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`},overlay:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},modal:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},inverse:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},glass:{background:`oklch(from {popover} l c h / 0.8)`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`},accent:{shadow:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`},fill:{background:`oklch(0.75073 0.18465 126.794)`,gradient:`linear-gradient(180deg, oklch(0.80472 0.1815 126.061) 0%, oklch(0.75073 0.18465 126.794) 100%)`,shadow:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`,"border-color":`oklch(0.69169 0.17204 126.956)`},knob:{background:`oklch(1 0 0)`,gradient:`linear-gradient(180deg, oklch(1 0 0) 0%, {raised} 100%)`,shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{input}`,"checked-border-color":`oklch(0.72099 0.15728 124.776)`},hover:{background:`{popover}`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`,"border-top-color":`{border}`,"border-bottom-color":`{border}`},pressed:{background:`{muted}`,shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`,"border-color":`{input}`},disabled:{shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`}},dark:{card:{shadow:`0 1px 0 oklch(0 0 0 / 0.35)`},inset:{shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`},channel:{shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`},raised:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`,"border-top-color":`oklch(0 0 0 / 0.5)`,"border-bottom-color":`oklch(0 0 0 / 0.5)`},plate:{background:`{raised}`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`},overlay:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},modal:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},inverse:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},glass:{background:`oklch(from {card} l c h / 0.78)`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`},accent:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`},fill:{background:`oklch(0.83973 0.16469 124.137)`,gradient:`linear-gradient(180deg, oklch(0.88348 0.15928 123.937) 0%, oklch(0.83973 0.16469 124.137) 100%)`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0.71963 0.15821 125.456)`},knob:{background:`{knob}`,gradient:`linear-gradient(180deg, {foreground} 0%, oklch(0.88185 0.00589 264.53) 100%)`,shadow:`0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0.8324 0.00597 264.528)`,"checked-border-color":`oklch(0.71963 0.15821 125.456)`,"checked-background":`oklch(1 0 0)`},hover:{background:`{input}`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`,"border-top-color":`oklch(0 0 0 / 0.5)`,"border-bottom-color":`oklch(0 0 0 / 0.5)`},pressed:{background:`{line}`,shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`,"border-color":`oklch(0 0 0 / 0.5)`},disabled:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`}}},elevation:{light:{sm:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,md:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04)`,lg:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`,xl:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`,inset:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`,edge:{surface:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6)`,accent:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`}},dark:{sm:`0 1px 1px oklch(0 0 0 / 0.12)`,md:`0 1px 0 oklch(0 0 0 / 0.35)`,lg:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`,xl:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`,inset:`inset 0 1px 1px oklch(0 0 0 / 0.2)`,edge:{surface:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08)`,accent:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`}}}};const _=p.idiom===`terminal`,Fe=()=>oe()!==`light`,Ie=[`field`,`choice`,`track`,`handle`],v=Pe,Le=m(null),Re=()=>Le()?.semantics??v,y=()=>Re();function b(e,t){let n={};for(let r of e){let e=se(()=>t()[r]);Object.defineProperty(n,r,{enumerable:!0,get:()=>e()})}return n}const x=p.desktop?`pointer`:`touch`,ze=/^\{([a-z0-9-]+)\}$/,Be=/oklch\(from \{([a-z0-9-]+)\} l c h \/ ([\d.]+)\)/g,Ve=(e,t)=>`${e.slice(0,7)}${Math.round(t*255).toString(16).padStart(2,`0`)}`,S=e=>{let t=ze.exec(e);if(t){let e=h(t[1]);if(typeof e==`number`)return e}return Number(e)},C=e=>e.replace(Be,(e,t,n)=>{let r=h(t);return typeof r==`string`?Ve(r,Number(n)):e}).replace(/\{([a-z0-9-]+)\}/g,(e,t)=>{let n=h(t);return typeof n==`string`?n:e}),He=e=>{let{finishes:t}=Re(),n=Fe()?t.dark:t.light;return{...t.shared[e],...n[e]}},w=e=>He(e),Ue=(e,t)=>w(e)[t],We=e=>w(e).material??null,Ge=e=>{let t=We(e);return t===null?void 0:Ne[t]},T=e=>Ge(e)?.glassEffect===void 0?[]:[`glassEffect`,`glassTintColor`],Ke={background:`backgroundColor`,gradient:`backgroundImage`,shadow:`boxShadow`,"border-color":`borderColor`,"border-top-color":`borderTopColor`,"border-bottom-color":`borderBottomColor`,backdropFilter:`backdropFilter`};function E(e){let t={},n={...v.finishes.shared[e],...v.finishes.dark[e],...v.finishes.light[e]};for(let[r,i]of Object.entries(Ke))r in n&&Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>{let t=w(e)[r];if(r===`backdropFilter`){let n=Ge(e);if(n!==void 0&&(t===void 0||t===`none`))return`blur(${n.fallback.blur}px)`}return typeof t==`string`?C(t):void 0}});Object.defineProperty(t,"foreground",{enumerable:!1,configurable:!0,get:()=>C(Ue(e,`foreground`))}),Object.defineProperty(t,"pressedBackground",{enumerable:!1,configurable:!0,get:()=>{let t=w(e)[`pressed-background`];return typeof t==`string`?C(t):void 0}}),Object.defineProperty(t,"pressedForeground",{enumerable:!1,configurable:!0,get:()=>{let t=w(e)[`pressed-foreground`];return typeof t==`string`?C(t):void 0}}),Object.defineProperty(t,"pressedOpacity",{enumerable:!1,configurable:!0,get:()=>w(e)[`pressed-opacity`]}),Object.defineProperty(t,"checkedBackground",{enumerable:!1,configurable:!0,get:()=>{let t=w(e)[`checked-background`];return typeof t==`string`?C(t):void 0}}),Object.defineProperty(t,"checkedBorderColor",{enumerable:!1,configurable:!0,get:()=>{let t=w(e)[`checked-border-color`];return typeof t==`string`?C(t):void 0}}),Object.defineProperty(t,"checkedGradient",{enumerable:!1,configurable:!0,get:()=>{let t=w(e)[`checked-gradient`];return t===null?null:typeof t==`string`?C(t):void 0}});let r=t=>{let n=Ge(e);if(n?.glassEffect===void 0)return;if(t===`glassEffect`)return n.glassEffect;let r=w(e).background;return r===void 0?void 0:C(r)};return new Proxy(t,{ownKeys:t=>[...Reflect.ownKeys(t),...T(e)],getOwnPropertyDescriptor:(t,n)=>typeof n==`string`&&T(e).includes(n)?{value:r(n),enumerable:!0,configurable:!0,writable:!1}:Reflect.getOwnPropertyDescriptor(t,n),has:(t,n)=>Reflect.has(t,n)||typeof n==`string`&&T(e).includes(n),get:(e,t,n)=>typeof t==`string`&&(t===`glassEffect`||t===`glassTintColor`)?r(t):Reflect.get(e,t,n)})}function D(e){let t={};for(let n of Object.keys(e))Object.defineProperty(t,n,{enumerable:!0,get:()=>h(e[n])});return t}const O=D({background:`background`,card:`card`,inset:`inset`,raised:`raised`,muted:`muted`,field:`field`,input:`input`,border:`border`,line:`line`,brandEdge:`brand-edge`,foreground:`foreground`,mutedForeground:`muted-foreground`,faint:`faint`,brand:`brand`,primary:`primary`,primaryForeground:`primary-foreground`,sidebar:`sidebar`,sidebarAccent:`sidebar-accent`,sidebarBorder:`sidebar-border`,track:`track`,knob:`knob`,info:`info`,warn:`warn`,destructive:`destructive`,up:`up`,media:`media`,onMedia:`on-media`,inverse:`inverse`,inverseForeground:`inverse-foreground`,inverseBrand:`inverse-brand`});function qe(e,t){return`color-mix(in srgb, ${e} ${Math.min(Math.max(t,0),1)*100}%, transparent)`}D({chart1:`chart-1`,chart2:`chart-2`,chart3:`chart-3`,chart4:`chart-4`,chart5:`chart-5`}),D({brand:`brand-tint`,info:`info-tint`,warn:`warn-tint`,destructive:`destructive-tint`,up:`up-tint`,down:`down-tint`});const k={card:E(`card`),inset:E(`inset`),channel:E(`channel`),raised:E(`raised`),plate:E(`plate`),overlay:E(`overlay`),modal:E(`modal`),inverse:E(`inverse`),glass:E(`glass`),accent:E(`accent`),fill:E(`fill`),knob:E(`knob`),hover:E(`hover`),pressed:E(`pressed`),disabled:E(`disabled`)};function Je(e){ue(e?e.theme:null),Le.set(e)}const Ye={size:e=>y().typography[e].fontSize[x],lineHeight:e=>y().typography[e].lineHeight[x],weight:e=>y().typography[e].fontWeight,letterSpacing:e=>y().typography[e].letterSpacing},A={get control(){return S(y().dimension.shape.control)},get container(){return S(y().dimension.shape.container)},get modal(){return S(y().dimension.shape.modal)},get button(){return y().shape.corners.button===`full`?999:A.control}},j={get hairline(){return y().dimension.stroke.hairline},get control(){return y().dimension.stroke.control}};b(Ie,()=>y().dimension.control);const Xe={get borderCurve(){return y().shape.curve===`circular`?`circular`:`continuous`}};function M(e,t=0){return{borderRadius:Math.max(e-t,0),...Xe}}const Ze={"out-cubic":u.out(u.cubic),"in-cubic":u.in(u.cubic),"in-out-cubic":u.inOut(u.cubic),standard:u.bezier(.2,0,0,1),"emphasized-decelerate":u.bezier(.05,.7,.1,1),"emphasized-accelerate":u.bezier(.3,0,.8,.15),decelerate:u.bezier(0,0,0,1),accelerate:u.bezier(1,0,1,1),"point-to-point":u.bezier(.55,.55,0,1)},Qe=e=>({duration:e.duration,timingFunction:Ze[e.timingFunction]}),N=e=>{let t=se(()=>Qe(e()));return new Proxy({},{get:(e,n)=>Reflect.get(t(),n),has:(e,n)=>n in t(),ownKeys:()=>Reflect.ownKeys(t()),getOwnPropertyDescriptor:(e,n)=>{let r=t();if(n in r)return{enumerable:!0,configurable:!0,value:Reflect.get(r,n)}}})};N(()=>y().motion.fast),N(()=>y().motion.default),N(()=>y().motion.slow),N(()=>y().motion.state);function P(e,t,n){if(typeof e==`string`||typeof e==`number`)return(()=>{let r=a(`text`);return c(r,`class`,t),c(r,`style`,n),o(r,e),r})();if(Array.isArray(e))return e.map(e=>P(e,t,n));if(typeof e==`function`){let r=e;return()=>P(r(),t,n)}return e}function $e(e){return[()=>P(e.children,e.class,e.style)]}function et(){return{get kbd(){return{height:_?16:20,minWidth:_?void 0:20,paddingHorizontal:_?0:4,flexDirection:`row`,alignItems:`center`,justifyContent:`center`,flexShrink:0,..._?{}:M(A.control),borderWidth:_?0:j.control,borderColor:O.line,backgroundColor:_?`transparent`:h(`muted`)}},get text(){return{fontSize:_?14:12,fontWeight:Ye.weight(`label`),color:O.mutedForeground,..._?{fontFamily:`monospace`}:{},numberOfLines:1}},get group(){return{flexDirection:`row`,alignItems:`center`,gap:_?0:4,flexShrink:0}}}}function tt(e){let[,r]=de(e,[`children`,`style`]);return(()=>{let i=a(`view`);return ee(i,r),t(i,`style`,()=>[et().kbd,e.style??null]),o(i,n($e,{get style(){return et().text},get children(){return e.children}})),i})()}function F(e,t){let n=e??void 0,r=t??void 0;return n&&r?`${n} ${r}`:r??n}const nt=Math.PI*2,rt=/* @__PURE__ */ new Set([`circle`,`ellipse`,`rect`,`line`]),I=(e,t,n=0)=>{let r=e[t];return r==null?n:Number(r)},it=e=>{let t=String(e.points??``).trim();return t===``?[]:t.split(/[\s,]+/).map(Number)};function at(e,t,n,r){let i=()=>r.fill?n.fill():n.stroke();if(e===`path`){let e=String(t.d??``);if(e===``)return;let i=r.path(e);r.fill?n.fill(i):n.stroke(i)}else if(e===`polyline`||e===`polygon`){let r=it(t);if(r.length<4)return;n.beginPath(),n.moveTo(r[0],r[1]);for(let e=2;e+1<r.length;e+=2)n.lineTo(r[e],r[e+1]);e===`polygon`&&n.closePath(),i()}else if(rt.has(e)){switch(n.beginPath(),e){case`circle`:n.arc(I(t,`cx`),I(t,`cy`),I(t,`r`),0,nt);break;case`ellipse`:n.ellipse(I(t,`cx`),I(t,`cy`),I(t,`rx`),I(t,`ry`),0,0,nt);break;case`rect`:n.roundRect(I(t,`x`),I(t,`y`),I(t,`width`),I(t,`height`),I(t,`rx`,I(t,`ry`)));break;case`line`:n.moveTo(I(t,`x1`),I(t,`y1`)),n.lineTo(I(t,`x2`),I(t,`y2`))}i()}}function ot(e,t,n){let r=n.fill===!0;for(let[i,a]of e)at(i,a,t,{fill:r,path:n.path})}const st=/* @__PURE__ */ new Map;function ct(e){let t=st.get(e);return t||(t=new re(e),st.set(e,t)),t}const lt=/* @__PURE__ */ new Set([ve,_e,me,he]);function L(r){let i=r.size??20;return _&&r.icon===ge?(()=>{let n=a(`text`);t(n,`style`,()=>({color:r.tint}));let i=te(`✓`);return e(n,i),n})():n(ne,{get class(){return lt.has(r.icon)?`rtl:-scale-x-100`:void 0},style:{pointerEvents:`none`,width:i,height:i},draw:(e,{width:t})=>{e.scale(t/24,t/24),e.strokeStyle=r.tint,e.fillStyle=r.tint,e.lineWidth=r.weight??2,e.lineCap=`round`,e.lineJoin=`round`,ot(r.icon,e,{fill:r.fill,path:ct})}})}const R=b([`inset`,`pad`],()=>_?{inset:0,pad:8}:y().dimension.size.item[x]);function ut(){return Math.max(R.inset,4)}function dt(){let{inset:e}=R;return{paddingHorizontal:e,paddingVertical:e===0&&!_?8:e}}function ft(){let{inset:e}=R;return e===0||A.container===0?0:Math.max(2,A.container-e)}p.desktop;const z=b([`title`,`note`,`body`,`row`,`pad`,`gap`],()=>{let{typography:e,dimension:t}=y();return{title:e.title.fontSize[x],note:e.detail.fontSize[x],body:e.body.fontSize[x],row:t.size.height[x].lg,...t.size.density[x]}}),pt={row:16,padding:0,gap:8,label:14,detail:12,control:24,check:12,dot:6,tabs:16,line:16,clear:16,switch:`small`},mt=b([`row`,`padding`,`gap`,`label`,`detail`,`control`,`check`,`dot`,`tabs`,`line`,`clear`,`switch`],()=>{if(_)return pt;let{typography:e,dimension:t}=y(),{height:n}=t.size,r=t.icon;return{row:n[x].lg,line:n[x].lg,tabs:n[x].lg,control:r[x].md,clear:r[x].md,check:r[x].sm,...t.size.control[x],label:e.label.fontSize[x],detail:e.detail.fontSize[x]}});function B(e){return _?{borderWidth:j.hairline,borderColor:O.border,paddingVertical:15,paddingHorizontal:15}:{backgroundColor:k.card.backgroundColor,...M(A.container),borderWidth:j.hairline,borderColor:k.card.borderColor,boxShadow:k.card.boxShadow,...e?.padded?{padding:z.pad}:{}}}function ht(){return{backgroundColor:O.inset,borderWidth:j.hairline,borderColor:O.line,...M(A.control),...k.inset}}se(()=>!_&&fe().width<600);const V=p.desktop,H={get row(){return mt.row},get rowSm(){return V?32:mt.row},get detail(){return mt.detail}},U={root:`overflow-hidden rounded-(--radius-container) border border-border bg-card`,searchBar:`flex-row flex-nowrap items-center gap-2 border-b border-border ${_?``:`px-3`}`,search:`min-w-0 flex-1 ${_?`px-2 `:``}${V?`h-11 text-sm`:`h-12 text-base`} text-foreground placeholder:text-muted-foreground`,group:`pt-2.5 pb-1`,separator:`my-1 h-px bg-border`,item:`group transition-colors duration-100 motion-reduce:transition-none hover:bg-hover focus:bg-brand-tint active:opacity-70 disabled:opacity-50`},W={get list(){return dt()},get item(){return M(ft())},get group(){return{paddingHorizontal:R.pad}},get separator(){return{marginHorizontal:-R.inset}}};function gt(e){return n(tt,{get children(){return e.label}})}function _t(e){return(()=>{let n=a(`text`);return t(n,`style`,()=>({fontSize:11,fontWeight:Ye.weight(`title`),letterSpacing:.6,color:O.faint})),o(n,()=>e.group.heading.toLocaleUpperCase()),n})()}function G(r){return(()=>{let i=a(`view`);t(i,`style`,()=>({minHeight:r.detail?H.row:H.rowSm,paddingVertical:ut(),flexDirection:`row`,alignItems:`center`,gap:10,paddingHorizontal:R.pad}));let s=a(`view`);c(s,`style`,{flex:1,minWidth:0,gap:1});let l=a(`text`);return t(l,`style`,()=>({fontSize:Ye.size(`body`),color:O.foreground,numberOfLines:1})),o(l,()=>r.entry.label),e(s,l),o(s,()=>r.detail?(()=>{let e=a(`text`);return t(e,`style`,()=>({fontSize:H.detail,color:O.mutedForeground,numberOfLines:1})),o(e,()=>r.detail),e})():null),e(i,s),o(i,()=>r.icon?n(L,{get icon(){return r.icon},size:16,get tint(){return O.mutedForeground}}):null,s),o(i,[()=>r.note?(()=>{let e=a(`text`);return t(e,`style`,()=>({fontSize:H.detail,color:O.faint,fontVariant:[`tabular-nums`]})),o(e,()=>r.note),e})():null,()=>V&&r.entry.shortcutLabel?n(gt,{get label(){return r.entry.shortcutLabel}}):null,()=>r.entry.checked?n(L,{icon:ge,size:14,get tint(){return O.foreground}}):null]),i})()}function K(e){return(()=>{let n=a(`text`);return t(n,`style`,()=>({paddingVertical:24,textAlign:`center`,fontSize:13,color:O.mutedForeground})),o(n,()=>e.label),n})()}function vt(){return{flexDirection:`row`,alignItems:`center`,flexWrap:`nowrap`,gap:8}}function yt(){return{flexGrow:1,flexShrink:1,flexBasis:0,minWidth:0,color:O.foreground,placeholderColor:O.mutedForeground}}function q(e,t){return t==null?e:[e,t]}function bt(e){let[,t]=de(e,[`class`,`searchBarClass`,`searchBarStyle`,`searchClass`,`searchStyle`,`listClass`,`listStyle`,`itemClass`,`itemStyle`,`groupClass`,`groupStyle`,`separatorClass`,`separatorStyle`,`renderItem`,`renderGroup`,`empty`,`placeholder`,`searchPrefix`,`style`]);return n(pe,s(t,{get class(){return F(U.root,e.class)},get searchBarClass(){return F(U.searchBar,e.searchBarClass)},get searchBarStyle(){return q(vt(),e.searchBarStyle)},get searchClass(){return F(U.search,e.searchClass)},get searchStyle(){return q(yt(),e.searchStyle)},get listClass(){return e.listClass},get listStyle(){return q(W.list,e.listStyle)},get itemClass(){return F(U.item,e.itemClass)},get itemStyle(){return q(W.item,e.itemStyle)},get groupClass(){return F(U.group,e.groupClass)},get groupStyle(){return q(W.group,e.groupStyle)},get separatorClass(){return F(U.separator,e.separatorClass)},get separatorStyle(){return q(W.separator,e.separatorStyle)},get placeholder(){return e.placeholder??`Type a command or search…`},get searchPrefix(){return e.searchPrefix===void 0?n(L,{icon:g,size:16,get tint(){return O.mutedForeground}}):e.searchPrefix},get renderItem(){return e.renderItem===void 0?e=>n(G,{entry:e}):e.renderItem},get renderGroup(){return e.renderGroup===void 0?e=>n(_t,{group:e}):e.renderGroup},get empty(){return e.empty===void 0?n(K,{label:`No results.`}):e.empty},get style(){return e.style}}))}const xt={"nsh-gallery":()=>__nsh_import(`nsh-gallery.js`,[]),shadcn:()=>__nsh_import(`shadcn.js`,[]),"solid-glass":()=>__nsh_import(`solid-glass.js`,[]),apple:()=>__nsh_import(`apple.js`,[]),material:()=>__nsh_import(`material.js`,[]),winui:()=>__nsh_import(`winui.js`,[])};function St(e){return xt[e]().then(e=>e.default)}const Ct=[{id:`nsh-gallery`,label:`NSH Gallery`,description:`The library's own: graphite surfaces, one citrus accent, 8-point controls and 14-point cards.`},{id:`shadcn`,label:`shadcn/ui`,description:`shadcn/ui's neutral palette: near-black and near-white fills, flat finishes, 8-point controls and 14-point cards.`},{id:`solid-glass`,label:`Solid Glass`,description:`Panes of thick smoky glass: a rim of light on each top edge, a hairline round it, a shadow underneath, 11-point controls and 20-point cards.`},{id:`apple`,label:`Apple`,description:`Apple's system colors and Liquid Glass: capsule controls, 20-point cards, hairline edges, and glass on the overlays that float.`},{id:`material`,label:`Material`,description:`Material 3 Expressive: tonal surfaces, capsule controls, circular corners, 8/10/10% state layers, and expressive shapes.`},{id:`winui`,label:`WinUI 3`,description:`WinUI 3 (Windows 11): WinUI fill and stroke tokens, 4/8-point circular corners, Segoe UI Variable, Consolas, double focus rings, and timing motion.`}],wt=globalThis,J=(()=>{for(let e of[wt.parent?.document,wt.document]){let t=e?.getElementById(`app`);if(t)return t}return null})();J&&(J.style.visibility=`hidden`),Tt();async function Tt(){let e=null;try{let t=await ie.getItem(`palette`),n=Ct.find(e=>e.id===t);n&&(Je(await St(n.id)),await Et(),e=n.id)}finally{J&&(J.style.visibility=``)}e&&await ie.setItem(`palette-drawn`,e)}function Et(){return new Promise(e=>{requestAnimationFrame(()=>requestAnimationFrame(()=>e()))})}function Dt(n){return(()=>{let i=a(`scroll`);t(i,`style`,()=>({flex:1,backgroundColor:O.background})),t(i,`contentStyle`,()=>({flexGrow:1,padding:20,gap:z.gap+2}));let s=a(`view`);t(s,`style`,()=>n.width===void 0?{flex:1,gap:z.gap+2}:{flex:1,width:`100%`,maxWidth:n.width,alignSelf:`center`,gap:z.gap+2});let c=a(`text`);return t(c,`style`,()=>({fontSize:22,fontWeight:`700`,color:O.foreground})),o(c,()=>n.title),e(s,c),o(s,[()=>n.children,r(()=>n.note,()=>(()=>{let e=a(`text`);return t(e,`style`,()=>({fontSize:13,color:O.mutedForeground})),o(e,()=>typeof n.note==`function`?n.note():n.note),e})())]),e(i,s),i})()}function Ot(e){return(()=>{let n=a(`view`);return t(n,`style`,()=>[B({padded:e.padded??!0}),{gap:z.gap+4},e.style??null]),o(n,()=>e.children),n})()}function kt(n){return(()=>{let r=a(`view`);c(r,`style`,{gap:8});let i=a(`text`);t(i,`style`,()=>({fontSize:z.note,color:O.mutedForeground})),o(i,()=>n.title);let s=a(`view`);return t(s,`style`,()=>n.axis===`block`?{flexDirection:`column`,alignItems:`stretch`,gap:8}:{flexDirection:`row`,flexWrap:`wrap`,alignItems:`center`,gap:8}),o(s,()=>n.children),e(r,i),e(r,s),r})()}p.desktop,f(null),f(`default`),p.desktop,f(null),f(null);const At={transitionDuration:150,transitionTimingFunction:`ease-out`};function jt(e){return{transitionProperty:e?`${e}, transform`:`transform`,...At}}jt(`background-color, border-color, box-shadow, opacity`);const Mt=p.desktop,Y=()=>fe().width>=700,X=()=>fe().width>=900;function Nt(e){let t=()=>e.gap??14,n=()=>({gap:t()}),r=d({get style(){return X()?{width:`100%`,maxWidth:e.width??440,gap:t()}:n()},get children(){return e.children}}),i=d({get style(){return X()?{flex:1,minWidth:0,borderRadius:A.container,borderWidth:1,borderColor:Q().line,backgroundColor:qe(Q().text,.02),padding:24,alignItems:`center`,justifyContent:`center`}:n()},children:r}),a=d({get style(){return X()?{width:300,gap:12}:{flex:e.grow?1:void 0,gap:t()}},get children(){return e.inspector}});return d({get style(){return X()?{flex:1,flexDirection:`row`,gap:16}:{flex:e.grow?1:void 0,gap:t()}},children:[i,a]})}function Z(e){let t=ae({get style(){return{fontSize:12,color:Q().muted}},get children(){return e.title}});return d({get style(){return{...ht(),padding:12,gap:4,minHeight:e.minHeight,flex:e.grow?1:void 0}},get children(){return[t,e.children]}})}function Pt(e){return Z({get title(){return e.title},get minHeight(){return e.minHeight},get grow(){return e.grow??X()},get children(){return i(()=>e.lines,(e,t)=>ae({get style(){return{fontSize:12,color:t()===0?Q().text:Q().faint}},get children(){return e()}}),`index`)}})}const Q=()=>({page:O.background,text:O.foreground,muted:O.mutedForeground,faint:O.faint,border:O.border,line:O.line,accent:O.brand,onAccent:O.primaryForeground,onPrimary:O.primaryForeground,up:O.up,down:O.destructive,info:O.info,warn:O.warn,danger:O.destructive,onMedia:O.onMedia,card:{...B(),backgroundColor:O.card},row:{...B(),backgroundColor:O.card},inset:{backgroundColor:O.inset,borderWidth:1,borderColor:O.line,...k.inset},raised:{backgroundColor:O.raised,borderWidth:1,borderColor:O.border,...k.raised},primary:{backgroundColor:O.primary,borderWidth:1,...k.accent},accentFill:{backgroundColor:O.primary,borderWidth:1,borderColor:O.brand,...k.accent}});l(null,`{
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
`,null,null);const Ft={new:Oe,open:Ce,save:ye,share:Ae,find:g,replace:ke,terminal:Me,sidebar:De,dark:Ee,light:je,docs:Se,feedback:Te},It=m(`dark`),Lt=m(null),$=m(``),Rt=m([]),zt=e=>Rt.set([e,...Rt()].slice(0,4));let Bt;const Vt=()=>[{id:`new`,label:`New File`,group:`File`,shortcut:`mod+n`},{id:`open`,label:`Open Folder…`,group:`File`,shortcut:`mod+o`},{id:`save`,label:`Save All`,group:`File`,shortcut:`mod+alt+s`},{id:`share`,label:`Share Project`,group:`File`,disabled:!0},{id:`find`,label:`Find in Files`,group:`Edit`,shortcut:`mod+shift+f`,keywords:[`search`,`grep`]},{id:`replace`,label:`Replace in Files`,group:`Edit`,shortcut:`mod+shift+h`},{id:`terminal`,label:`Toggle Terminal`,group:`View`,shortcut:`ctrl+j`,keywords:[`console`,`shell`]},{id:`sidebar`,label:`Toggle Sidebar`,group:`View`,shortcut:`mod+b`},{id:`dark`,label:`Dark Appearance`,group:`View`,keywords:[`theme`],checked:It()===`dark`},{id:`light`,label:`Light Appearance`,group:`View`,keywords:[`theme`],checked:It()===`light`},{id:`docs`,label:`Open Documentation`,group:`Help`,keywords:[`guide`,`manual`]},{id:`feedback`,label:`Send Feedback`,group:`Help`}],Ht=[`rs`,`tsx`,`md`,`json`,`png`],Ut=Array.from({length:5e3},(e,t)=>{let n=Ht[t%Ht.length],r=`module-${String(Math.floor(t/100)+1).padStart(2,`0`)}`;return{id:`file-${t}`,label:`${r}/file-${t+1}.${n}`,group:r,keywords:[n]}}),Wt={rs:xe,tsx:xe,md:Se,json:be,png:we},Gt=m(Ut.length);let Kt;const qt=e=>e.slice(e.lastIndexOf(`.`)+1);function Jt(){return ce.bind(`mod+k`,()=>Bt?.focus()),n(Dt,{title:`Command`,get children(){return[(()=>{let e=a(`text`);return t(e,`style`,()=>({color:Q().muted})),o(e,()=>Mt?`Type to filter, the arrows to move, Return to run, Escape to clear; ${ce.label(`mod+k`)} focuses it`:`Type to filter, tap a command to run it`),e})(),n(Nt,{gap:14,get inspector(){return[n(Z,{title:`highlighted`,get children(){return(()=>{let e=a(`text`);return c(e,`class`,`text-foreground`),c(e,`style`,{fontSize:13}),o(e,()=>Lt()??`none`),e})()}}),n(Z,{title:`query`,get children(){return(()=>{let e=a(`text`);return c(e,`class`,`text-foreground`),c(e,`style`,{fontSize:13}),o(e,()=>$()?`“${$()}”`:`empty`),e})()}}),n(Pt,{title:`events`,get lines(){return Rt()},minHeight:92})]},get children(){return(()=>{let e=a(`view`);return t(e,`style`,()=>({width:Y()?380:void 0,alignSelf:Y()?`center`:`stretch`})),o(e,n(bt,{ref:e=>Bt=e,get items(){return Vt()},get query(){return $()},onQueryChange:({query:e})=>$.set(e),onHighlightChange:({highlighted:e})=>Lt.set(e),onCancel:()=>zt(`onCancel()`),onSelect:({id:e})=>{(e===`dark`||e===`light`)&&It.set(e),zt(`onSelect({ id: "${e}" })`)},accessibilityLabel:`Commands`,searchAccessibilityLabel:`Search commands`,style:{height:Mt?360:400},get searchPrefix(){return n(L,{icon:g,size:16,get tint(){return Q().muted}})},get empty(){return n(K,{label:`No commands match`})},renderGroup:e=>n(_t,{group:e}),renderItem:e=>n(G,{entry:e,get icon(){return Ft[e.id]},get detail(){return e.id===`open`?`A folder on this Mac`:void 0},get note(){return e.disabled?`Pro`:void 0}})})),e})()}}),n(Ot,{get children(){return n(kt,{title:`A long list`,axis:`block`,get children(){return[(()=>{let n=a(`text`);t(n,`style`,()=>({color:Q().muted}));let r=te(`Five thousand files in fifty folders: the field finds one by name or by extension, and the count under it is the palette's own, from its ref.`);return e(n,r),n})(),(()=>{let r=a(`view`);t(r,`style`,()=>({width:Y()?380:void 0,alignSelf:`flex-start`}));let i=a(`text`);return t(i,`style`,()=>({paddingTop:8,fontSize:12,color:Q().muted,fontVariant:[`tabular-nums`]})),o(i,()=>`${Gt().toLocaleString(`en-US`)} of ${Ut.length.toLocaleString(`en-US`)} files, 50 folders`),e(r,i),o(r,n(bt,{ref:e=>Kt=e,items:Ut,accessibilityLabel:`Files`,searchAccessibilityLabel:`Search files`,placeholder:`Search files by name or extension…`,listClass:`h-60`,onQueryChange:()=>void Kt?.matchedCount().then(e=>Gt.set(e)),get empty(){return n(K,{label:`No file matches`})},renderItem:e=>n(G,{entry:e,get icon(){return Wt[qt(e.label)]}})}),i),r})()]}})}})]}})}le(Jt);
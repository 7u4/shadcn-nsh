import{append as e,bindProp as t,component as n,cond as r,each as i,element as a,insert as o,merge as s,prop as c,setup as l,spread as ee,text as te}from"./facades/nsh-rt.547514bb2f.js";import{Canvas as ne,Easing as u,Path2D as re,Storage as ie,Text as ae,View as d,colorScheme as oe,computed as f,context as p,keymap as se,mount as ce,platform as m,setTheme as le,signal as h,split as ue,token as g,windowSize as de}from"./facades/nsh.6a7d3c4e81.js";import{Command as fe}from"./facades/nsh-base.ae49c3c842.js";l(null,null,null,null,`{"id":"dev.shadcn-nsh.docs-demos","name":"command","version":"0.0.0","build":1,"development":false}`);
/**
* @license lucide v1.75.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
const pe=[[`path`,{d:`m12 19-7-7 7-7`}],[`path`,{d:`M19 12H5`}]],me=[[`path`,{d:`M5 12h14`}],[`path`,{d:`m12 5 7 7-7 7`}]],he=[[`path`,{d:`M20 6 9 17l-5-5`}]],ge=[[`path`,{d:`m15 18-6-6 6-6`}]],_e=[[`path`,{d:`m9 18 6-6-6-6`}]],ve=[[`path`,{d:`M12 15V3`}],[`path`,{d:`M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4`}],[`path`,{d:`m7 10 5 5 5-5`}]],ye=[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`}],[`path`,{d:`M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1`}],[`path`,{d:`M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1`}]],be=[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`}],[`path`,{d:`M10 12.5 8 15l2 2.5`}],[`path`,{d:`m14 12.5 2 2.5-2 2.5`}]],xe=[[`path`,{d:`M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z`}],[`path`,{d:`M14 2v5a1 1 0 0 0 1 1h5`}],[`path`,{d:`M10 9H8`}],[`path`,{d:`M16 13H8`}],[`path`,{d:`M16 17H8`}]],Se=[[`path`,{d:`M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z`}]],Ce=[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`,ry:`2`}],[`circle`,{cx:`9`,cy:`9`,r:`2`}],[`path`,{d:`m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21`}]],we=[[`path`,{d:`M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z`}]],Te=[[`path`,{d:`M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401`}]],Ee=[[`rect`,{width:`18`,height:`18`,x:`3`,y:`3`,rx:`2`}],[`path`,{d:`M9 3v18`}]],De=[[`path`,{d:`M5 12h14`}],[`path`,{d:`M12 5v14`}]],Oe=[[`path`,{d:`M14 4a1 1 0 0 1 1-1`}],[`path`,{d:`M15 10a1 1 0 0 1-1-1`}],[`path`,{d:`M21 4a1 1 0 0 0-1-1`}],[`path`,{d:`M21 9a1 1 0 0 1-1 1`}],[`path`,{d:`m3 7 3 3 3-3`}],[`path`,{d:`M6 10V5a2 2 0 0 1 2-2h2`}],[`rect`,{x:`3`,y:`14`,width:`7`,height:`7`,rx:`1`}]],_=[[`path`,{d:`m21 21-4.34-4.34`}],[`circle`,{cx:`11`,cy:`11`,r:`8`}]],ke=[[`path`,{d:`M12 2v13`}],[`path`,{d:`m16 6-4-4-4 4`}],[`path`,{d:`M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8`}]],Ae=[[`circle`,{cx:`12`,cy:`12`,r:`4`}],[`path`,{d:`M12 2v2`}],[`path`,{d:`M12 20v2`}],[`path`,{d:`m4.93 4.93 1.41 1.41`}],[`path`,{d:`m17.66 17.66 1.41 1.41`}],[`path`,{d:`M2 12h2`}],[`path`,{d:`M20 12h2`}],[`path`,{d:`m6.34 17.66-1.41 1.41`}],[`path`,{d:`m19.07 4.93-1.41 1.41`}]],je=[[`path`,{d:`M12 19h8`}],[`path`,{d:`m4 17 6-6-6-6`}]],Me={glass:{glassEffect:`regular`,props:{ios:{backdropMaterial:`regular`}},fallback:{blur:30,minOpacity:.72}},acrylic:{props:{windows:{backdrop:{material:`blur`}}},fallback:{blur:30,minOpacity:.85}}}
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
;var Ne={typography:{caption:{fontSize:{pointer:11,touch:12},lineHeight:{pointer:16,touch:16},fontWeight:400,letterSpacing:0},detail:{fontSize:{pointer:12,touch:13},lineHeight:{pointer:16,touch:20},fontWeight:400,letterSpacing:0},body:{fontSize:{pointer:13,touch:15},lineHeight:{pointer:20,touch:20},fontWeight:400,letterSpacing:0},label:{fontSize:{pointer:14,touch:15},lineHeight:{pointer:20,touch:20},fontWeight:500,letterSpacing:0},title:{fontSize:{pointer:16,touch:16},lineHeight:{pointer:24,touch:24},fontWeight:600,letterSpacing:0},headline:{fontSize:{pointer:20,touch:22},lineHeight:{pointer:28,touch:28},fontWeight:600,letterSpacing:0},display:{fontSize:{pointer:26,touch:28},lineHeight:{pointer:32,touch:36},fontWeight:600,letterSpacing:0}},dimension:{shape:{control:`{radius-control}`,container:`{radius-container}`,modal:`{radius-modal}`},size:{hit:{pointer:0,touch:44},density:{pointer:{pad:12,gap:12},touch:{pad:12,gap:12}},item:{pointer:{inset:4,pad:8},touch:{inset:8,pad:8}},control:{pointer:{padding:8,gap:8,dot:6,switch:`small`},touch:{padding:8,gap:8,dot:8,switch:`regular`}},height:{pointer:{sm:24,md:28,lg:32},touch:{sm:32,md:40,lg:48}}},stroke:{hairline:1,control:1},focus:{style:`halo`,width:3,offset:0},icon:{pointer:{sm:12,md:16,lg:20},touch:{sm:16,md:20,lg:24}}},slots:{"field.face":{colour:`field`},"field.shade":`inset`,"field.edge.width":`control`,"field.edge.sides":!0,"field.edge.colour":{colour:`input`},"field.edge.bottom":{colour:`input`},"field.corner.top":`control`,"field.corner.bottom":`control`,"field.focus.line":!1,"field.focus.width":3,"choice.size":{pointer:16,touch:22},"choice.box":{pointer:16,touch:20},"choice.corner":{pointer:5,touch:7},"choice.face":{light:{colour:`field`},dark:{colour:`input`,alpha:.3}},"choice.shade":`inset`,"choice.edge.width":1,"choice.edge.colour":{light:{colour:`input`},dark:{colour:`foreground`,alpha:.2}},"choice.edge.disabled":{light:{colour:`input`},dark:{colour:`foreground`,alpha:.4}},"choice.checked.face":{finish:`accent`},"choice.mark.size":{pointer:6,touch:8},"choice.mark.hover":`none`,"choice.mark.pressed":`none`,"choice.halo":`none`,"switch.width":{pointer:36,touch:44},"switch.height":{pointer:20,touch:24},"switch.small.width":{pointer:28,touch:36},"switch.small.height":{pointer:16,touch:20},"switch.small.knob.width":{pointer:12,touch:16},"switch.small.knob.height":{pointer:12,touch:16},"switch.edge.off":1,"switch.edge.on":1,"switch.knob.width":{pointer:16,touch:20},"switch.knob.height":{pointer:16,touch:20},"switch.knob.on.width":{pointer:16,touch:20},"switch.knob.on.height":{pointer:16,touch:20},"switch.knob.hover":{pointer:16,touch:20},"switch.knob.pressed.width":{pointer:16,touch:20},"switch.knob.pressed.height":{pointer:16,touch:20},"switch.feedback":`none`,"slider.rail":{pointer:6,touch:8},"slider.band":{pointer:20,touch:32},"slider.vertical":{pointer:128,touch:144},"slider.face":{colour:`track`},"slider.shade":`inset`,"slider.edge.colour":{colour:`border`},"slider.edge.width":`control`,"slider.knob.size":{pointer:14,touch:20},"slider.knob.pressed.size":{pointer:14,touch:32},"slider.knob.face":{finish:`knob`},"slider.mark.size":0,"slider.mark.hover":0,"slider.mark.pressed":0,"slider.brightens":!0,"progress.height":6,"progress.line":0,"progress.face":{colour:`track`},"progress.shade":`inset`,"progress.edge.colour":{colour:`border`},"progress.edge.width":`control`,"spinner.opacity":.25,"popup.corner":`container`,"tabs.track.face":{colour:`inset`},"well.edge":{colour:`border`},"state.disabled.face":`keep`,"state.disabled.ink":`keep`,"state.disabled.edge":`keep`},shape:{curve:`continuous`,corners:{button:`{radius-control}`}},state:{"press-scale":.97,overlay:{hover:0,focus:0,pressed:0,dragged:0},"pressed-opacity":.7,"rest-opacity":.5,disabled:{content:.5}},transition:{enter:{duration:420,timingFunction:`out-cubic`}},motion:{fast:{duration:150,timingFunction:`out-cubic`},default:{duration:250,timingFunction:`out-cubic`},slow:{duration:350,timingFunction:`out-cubic`},state:{duration:120,timingFunction:`out-cubic`}},finishes:{shared:{card:{background:`{card}`,foreground:`{foreground}`,"border-color":`{border}`,elevation:null},inset:{foreground:`{foreground}`,"border-color":`{border}`},channel:{background:`{inset}`,foreground:`{foreground}`,"border-color":`{border}`},raised:{background:`{raised}`,foreground:`{foreground}`,backdropFilter:`none`,material:null},plate:{foreground:`{foreground}`,elevation:null},overlay:{background:`{popover}`,foreground:`{foreground}`,"border-color":`{border}`,backdropFilter:`none`,material:null,elevation:null},modal:{background:`{card}`,foreground:`{foreground}`,"border-color":`{border}`,elevation:null},inverse:{background:`{inverse}`,foreground:`{inverse-foreground}`,"border-color":`{border}`,backdropFilter:`none`,material:null,elevation:null},glass:{foreground:`{foreground}`,"border-color":`{border}`,backdropFilter:`blur(20px)`,material:null,elevation:null},accent:{background:`{primary}`,foreground:`{primary-foreground}`,"border-color":`{brand-edge}`,"border-bottom-color":`{brand-edge}`,"pressed-opacity":.88,"pressed-background":null,"pressed-foreground":null},fill:{foreground:`{primary-foreground}`},knob:{foreground:`{foreground}`,"checked-gradient":null},hover:{foreground:`{foreground}`,elevation:null},pressed:{foreground:`{foreground}`,elevation:null},disabled:{background:`{raised}`,foreground:`{foreground}`,"border-color":`{border}`}},light:{card:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04)`},inset:{shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`},channel:{shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`},raised:{shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`,"border-top-color":`{border}`,"border-bottom-color":`{border}`},plate:{background:`{card}`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`},overlay:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},modal:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},inverse:{shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`},glass:{background:`oklch(from {popover} l c h / 0.8)`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`},accent:{shadow:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`},fill:{background:`oklch(0.75073 0.18465 126.794)`,gradient:`linear-gradient(180deg, oklch(0.80472 0.1815 126.061) 0%, oklch(0.75073 0.18465 126.794) 100%)`,shadow:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`,"border-color":`oklch(0.69169 0.17204 126.956)`},knob:{background:`oklch(1 0 0)`,gradient:`linear-gradient(180deg, oklch(1 0 0) 0%, {raised} 100%)`,shadow:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{input}`,"checked-border-color":`oklch(0.72099 0.15728 124.776)`},hover:{background:`{popover}`,shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,"border-color":`{border}`,"border-top-color":`{border}`,"border-bottom-color":`{border}`},pressed:{background:`{muted}`,shadow:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`,"border-color":`{input}`},disabled:{shadow:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6), 0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`}},dark:{card:{shadow:`0 1px 0 oklch(0 0 0 / 0.35)`},inset:{shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`},channel:{shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`},raised:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`,"border-top-color":`oklch(0 0 0 / 0.5)`,"border-bottom-color":`oklch(0 0 0 / 0.5)`},plate:{background:`{raised}`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`},overlay:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},modal:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},inverse:{shadow:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`},glass:{background:`oklch(from {card} l c h / 0.78)`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`},accent:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`},fill:{background:`oklch(0.83973 0.16469 124.137)`,gradient:`linear-gradient(180deg, oklch(0.88348 0.15928 123.937) 0%, oklch(0.83973 0.16469 124.137) 100%)`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0.71963 0.15821 125.456)`},knob:{background:`{knob}`,gradient:`linear-gradient(180deg, {foreground} 0%, oklch(0.88185 0.00589 264.53) 100%)`,shadow:`0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0.8324 0.00597 264.528)`,"checked-border-color":`oklch(0.71963 0.15821 125.456)`,"checked-background":`oklch(1 0 0)`},hover:{background:`{input}`,shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`,"border-color":`oklch(0 0 0 / 0.5)`,"border-top-color":`oklch(0 0 0 / 0.5)`,"border-bottom-color":`oklch(0 0 0 / 0.5)`},pressed:{background:`{line}`,shadow:`inset 0 1px 1px oklch(0 0 0 / 0.2)`,"border-color":`oklch(0 0 0 / 0.5)`},disabled:{shadow:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08), 0 1px 1px oklch(0 0 0 / 0.12)`}}},elevation:{light:{sm:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.05)`,md:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04)`,lg:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`,xl:`0 1px 0 oklch(0.1686 0.02256 263.693 / 0.04), 0 12px 28px -10px oklch(0.1686 0.02256 263.693 / 0.22)`,inset:`inset 0 1px 1px oklch(0.1686 0.02256 263.693 / 0.06)`,edge:{surface:`inset 0 1px 0 oklch(1 0 0), inset 0 2px 0 oklch(1 0 0 / 0.6)`,accent:`inset 0 1px 0 oklch(1 0 0 / 0.55), inset 0 -1px 0 oklch(0.42761 0.11265 128.534 / 0.12), 0 1px 0 oklch(0.42761 0.11265 128.534 / 0.14)`}},dark:{sm:`0 1px 1px oklch(0 0 0 / 0.12)`,md:`0 1px 0 oklch(0 0 0 / 0.35)`,lg:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`,xl:`0 1px 0 oklch(0 0 0 / 0.4), 0 16px 32px -10px oklch(0 0 0 / 0.6)`,inset:`inset 0 1px 1px oklch(0 0 0 / 0.2)`,edge:{surface:`inset 0 0 0 1px oklch(1 0 0 / 0.06), inset 0 1px 1px oklch(1 0 0 / 0.08)`,accent:`inset 0 0 0 1px oklch(1 0 0 / 0.22), inset 0 1px 1px oklch(1 0 0 / 0.35), 0 1px 1px oklch(0 0 0 / 0.12)`}}}};const v=m.idiom===`terminal`,Pe=()=>oe()!==`light`,y=Ne,Fe=h(null),Ie=()=>Fe()?.semantics??y,b=()=>Ie();function x(e,t){let n={};for(let r of e){let e=f(()=>t()[r]);Object.defineProperty(n,r,{enumerable:!0,get:()=>e()})}return n}const S=m.desktop?`pointer`:`touch`,Le=/^\{([a-z0-9-]+)\}$/,Re=/oklch\(from \{([a-z0-9-]+)\} l c h \/ ([\d.]+)\)/g,ze=(e,t)=>`${e.slice(0,7)}${Math.round(t*255).toString(16).padStart(2,`0`)}`,C=e=>{let t=Le.exec(e);if(t){let e=g(t[1]);if(typeof e==`number`)return e}return Number(e)},w=e=>e.replace(Re,(e,t,n)=>{let r=g(t);return typeof r==`string`?ze(r,Number(n)):e}).replace(/\{([a-z0-9-]+)\}/g,(e,t)=>{let n=g(t);return typeof n==`string`?n:e}),Be=e=>{let{finishes:t}=Ie(),n=Pe()?t.dark:t.light;return{...t.shared[e],...n[e]}},T=e=>Be(e),Ve=(e,t)=>T(e)[t],He=e=>T(e).material??null,E=e=>{let t=He(e);return t===null?void 0:Me[t]},D=e=>E(e)?.glassEffect===void 0?[]:[`glassEffect`,`glassTintColor`],Ue={background:`backgroundColor`,gradient:`backgroundImage`,shadow:`boxShadow`,"border-color":`borderColor`,"border-top-color":`borderTopColor`,"border-bottom-color":`borderBottomColor`,backdropFilter:`backdropFilter`};function O(e){let t={},n={...y.finishes.shared[e],...y.finishes.dark[e],...y.finishes.light[e]};for(let[r,i]of Object.entries(Ue))r in n&&Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>{let t=T(e)[r];if(r===`backdropFilter`){let n=E(e);if(n!==void 0&&(t===void 0||t===`none`))return`blur(${n.fallback.blur}px)`}return typeof t==`string`?w(t):void 0}});Object.defineProperty(t,"foreground",{enumerable:!1,configurable:!0,get:()=>w(Ve(e,`foreground`))}),Object.defineProperty(t,"pressedBackground",{enumerable:!1,configurable:!0,get:()=>{let t=T(e)[`pressed-background`];return typeof t==`string`?w(t):void 0}}),Object.defineProperty(t,"pressedForeground",{enumerable:!1,configurable:!0,get:()=>{let t=T(e)[`pressed-foreground`];return typeof t==`string`?w(t):void 0}}),Object.defineProperty(t,"pressedOpacity",{enumerable:!1,configurable:!0,get:()=>T(e)[`pressed-opacity`]}),Object.defineProperty(t,"checkedBackground",{enumerable:!1,configurable:!0,get:()=>{let t=T(e)[`checked-background`];return typeof t==`string`?w(t):void 0}}),Object.defineProperty(t,"checkedBorderColor",{enumerable:!1,configurable:!0,get:()=>{let t=T(e)[`checked-border-color`];return typeof t==`string`?w(t):void 0}}),Object.defineProperty(t,"checkedGradient",{enumerable:!1,configurable:!0,get:()=>{let t=T(e)[`checked-gradient`];return t===null?null:typeof t==`string`?w(t):void 0}});let r=t=>{let n=E(e);if(n?.glassEffect===void 0)return;if(t===`glassEffect`)return n.glassEffect;let r=T(e).background;return r===void 0?void 0:w(r)};return new Proxy(t,{ownKeys:t=>[...Reflect.ownKeys(t),...D(e)],getOwnPropertyDescriptor:(t,n)=>typeof n==`string`&&D(e).includes(n)?{value:r(n),enumerable:!0,configurable:!0,writable:!1}:Reflect.getOwnPropertyDescriptor(t,n),has:(t,n)=>Reflect.has(t,n)||typeof n==`string`&&D(e).includes(n),get:(e,t,n)=>typeof t==`string`&&(t===`glassEffect`||t===`glassTintColor`)?r(t):Reflect.get(e,t,n)})}function k(e){let t={};for(let n of Object.keys(e))Object.defineProperty(t,n,{enumerable:!0,get:()=>g(e[n])});return t}const A=k({background:`background`,card:`card`,inset:`inset`,raised:`raised`,muted:`muted`,field:`field`,input:`input`,border:`border`,line:`line`,brandEdge:`brand-edge`,foreground:`foreground`,mutedForeground:`muted-foreground`,faint:`faint`,brand:`brand`,primary:`primary`,primaryForeground:`primary-foreground`,secondary:`secondary`,secondaryForeground:`secondary-foreground`,sidebar:`sidebar`,sidebarAccent:`sidebar-accent`,sidebarBorder:`sidebar-border`,track:`track`,knob:`knob`,info:`info`,warn:`warn`,destructive:`destructive`,up:`up`,media:`media`,onMedia:`on-media`,inverse:`inverse`,inverseForeground:`inverse-foreground`,inverseBrand:`inverse-brand`});function We(e,t){return`color-mix(in srgb, ${e} ${Math.min(Math.max(t,0),1)*100}%, transparent)`}k({chart1:`chart-1`,chart2:`chart-2`,chart3:`chart-3`,chart4:`chart-4`,chart5:`chart-5`});const Ge=k({brand:`brand-tint`,info:`info-tint`,warn:`warn-tint`,destructive:`destructive-tint`,up:`up-tint`,down:`down-tint`}),j={card:O(`card`),inset:O(`inset`),channel:O(`channel`),raised:O(`raised`),plate:O(`plate`),overlay:O(`overlay`),modal:O(`modal`),inverse:O(`inverse`),glass:O(`glass`),accent:O(`accent`),fill:O(`fill`),knob:O(`knob`),hover:O(`hover`),pressed:O(`pressed`),disabled:O(`disabled`)};function Ke(e){le(e?e.theme:null),Fe.set(e)}const M={size:e=>b().typography[e].fontSize[S],lineHeight:e=>b().typography[e].lineHeight[S],weight:e=>b().typography[e].fontWeight,letterSpacing:e=>b().typography[e].letterSpacing},N={get control(){return C(b().dimension.shape.control)},get container(){return C(b().dimension.shape.container)},get modal(){return C(b().dimension.shape.modal)},get button(){let e=b().shape.corners.button;return e===`full`?999:C(e)}},P={get hairline(){return b().dimension.stroke.hairline},get control(){return b().dimension.stroke.control}},qe=f(()=>b().slots),Je=()=>qe(),Ye={get borderCurve(){return b().shape.curve===`circular`?`circular`:`continuous`}};function F(e,t=0){return{borderRadius:Math.max(e-t,0),...Ye}}const Xe={"out-cubic":u.out(u.cubic),"in-cubic":u.in(u.cubic),"in-out-cubic":u.inOut(u.cubic),standard:u.bezier(.2,0,0,1),"emphasized-decelerate":u.bezier(.05,.7,.1,1),"emphasized-accelerate":u.bezier(.3,0,.8,.15),decelerate:u.bezier(0,0,0,1),accelerate:u.bezier(1,0,1,1),"point-to-point":u.bezier(.55,.55,0,1)},Ze=e=>({duration:e.duration,timingFunction:Xe[e.timingFunction]}),I=e=>{let t=f(()=>Ze(e()));return new Proxy({},{get:(e,n)=>Reflect.get(t(),n),has:(e,n)=>n in t(),ownKeys:()=>Reflect.ownKeys(t()),getOwnPropertyDescriptor:(e,n)=>{let r=t();if(n in r)return{enumerable:!0,configurable:!0,value:Reflect.get(r,n)}}})};I(()=>b().motion.fast),I(()=>b().motion.default),I(()=>b().motion.slow),I(()=>b().motion.state);function L(e,t,n){if(typeof e==`string`||typeof e==`number`)return(()=>{let r=a(`text`);return c(r,`class`,t),c(r,`style`,n),o(r,e),r})();if(Array.isArray(e))return e.map(e=>L(e,t,n));if(typeof e==`function`){let r=e;return()=>L(r(),t,n)}return e}function Qe(e){return[()=>L(e.children,e.class,e.style)]}function $e(){return{get kbd(){return{height:v?16:20,minWidth:v?void 0:20,paddingHorizontal:v?0:4,flexDirection:`row`,alignItems:`center`,justifyContent:`center`,flexShrink:0,...v?{}:F(N.control),borderWidth:v?0:P.control,borderColor:A.line,backgroundColor:v?`transparent`:g(`muted`)}},get text(){return{fontSize:v?14:12,fontWeight:M.weight(`label`),color:A.mutedForeground,...v?{fontFamily:`monospace`}:{},numberOfLines:1}},get group(){return{flexDirection:`row`,alignItems:`center`,gap:v?0:4,flexShrink:0}}}}function et(e){let[,r]=ue(e,[`children`,`style`]);return(()=>{let i=a(`view`);return ee(i,r),t(i,`style`,()=>[$e().kbd,e.style??null]),o(i,n(Qe,{get style(){return $e().text},get children(){return e.children}})),i})()}function R(e,t){let n=e??void 0,r=t??void 0;return n&&r?`${n} ${r}`:r??n}const tt=Math.PI*2,nt=/* @__PURE__ */ new Set([`circle`,`ellipse`,`rect`,`line`]),z=(e,t,n=0)=>{let r=e[t];return r==null?n:Number(r)},rt=e=>{let t=String(e.points??``).trim();return t===``?[]:t.split(/[\s,]+/).map(Number)};function it(e,t,n,r){let i=()=>r.fill?n.fill():n.stroke();if(e===`path`){let e=String(t.d??``);if(e===``)return;let i=r.path(e);r.fill?n.fill(i):n.stroke(i)}else if(e===`polyline`||e===`polygon`){let r=rt(t);if(r.length<4)return;n.beginPath(),n.moveTo(r[0],r[1]);for(let e=2;e+1<r.length;e+=2)n.lineTo(r[e],r[e+1]);e===`polygon`&&n.closePath(),i()}else if(nt.has(e)){switch(n.beginPath(),e){case`circle`:n.arc(z(t,`cx`),z(t,`cy`),z(t,`r`),0,tt);break;case`ellipse`:n.ellipse(z(t,`cx`),z(t,`cy`),z(t,`rx`),z(t,`ry`),0,0,tt);break;case`rect`:n.roundRect(z(t,`x`),z(t,`y`),z(t,`width`),z(t,`height`),z(t,`rx`,z(t,`ry`)));break;case`line`:n.moveTo(z(t,`x1`),z(t,`y1`)),n.lineTo(z(t,`x2`),z(t,`y2`))}i()}}function at(e,t,n){let r=n.fill===!0;for(let[i,a]of e)it(i,a,t,{fill:r,path:n.path})}const ot=/* @__PURE__ */ new Map;function st(e){let t=ot.get(e);return t||(t=new re(e),ot.set(e,t)),t}const ct=/* @__PURE__ */ new Set([_e,ge,pe,me]);function B(r){let i=r.size??20;return v&&r.icon===he?(()=>{let n=a(`text`);t(n,`style`,()=>({color:r.tint}));let i=te(`✓`);return e(n,i),n})():n(ne,{get class(){return ct.has(r.icon)?`rtl:-scale-x-100`:void 0},style:{pointerEvents:`none`,width:i,height:i},draw:(e,{width:t})=>{e.scale(t/24,t/24),e.strokeStyle=r.tint,e.fillStyle=r.tint,e.lineWidth=r.weight??2,e.lineCap=`round`,e.lineJoin=`round`,at(r.icon,e,{fill:r.fill,path:st})}})}const lt=e=>({...j[e]});function ut(e){if(e===null)return`transparent`;switch(e.kind){case`finish`:return lt(e.role)[e.field??`borderColor`]??(e.field===void 0?A.border:`transparent`);case`colour`:return e.alpha===void 0?A[e.role]:We(A[e.role],e.alpha);case`tint`:return e.alpha===void 0?Ge[e.role]:We(Ge[e.role],e.alpha)}}const dt=e=>typeof e==`object`&&!!e;function ft(e){let t=Je()[e];if(t===void 0)throw Error(`the theme states no \`${e}\` slot`);return t}function pt(e){if(e===`full`)return 999;if(e===`container`)return N.container;if(e===`control`)return N.control;if(typeof e==`number`)return e;throw Error(`the theme states no corner: ${JSON.stringify(e)}`)}function mt(e){return pt(ft(e))}function ht(e){return e===`none`||e===`keep`?null:`finish`in e?{kind:`finish`,role:e.finish}:`tint`in e?{kind:`tint`,role:e.tint,alpha:e.alpha}:{kind:`colour`,role:e.colour,alpha:e.alpha}}function gt(e){let t=ft(e);if(dt(t)&&(`light`in t||`dark`in t)){let e=t;return ht(Pe()?e.dark:e.light)}return ht(t)}function _t(){return gt(`well.edge`)}function vt(){return mt(`popup.corner`)}const V=x([`inset`,`pad`],()=>v?{inset:0,pad:8}:b().dimension.size.item[S]);function yt(){return Math.max(V.inset,4)}function bt(){let{inset:e}=V;return{paddingHorizontal:e,paddingVertical:e===0&&!v?8:e}}function xt(){let{inset:e}=V,t=vt();return e===0||t===0?0:Math.max(2,t-e)}m.desktop;const H=x([`title`,`note`,`body`,`row`,`pad`,`gap`],()=>{let{typography:e,dimension:t}=b();return{title:e.title.fontSize[S],note:e.detail.fontSize[S],body:e.body.fontSize[S],row:t.size.height[S].lg,...t.size.density[S]}}),St={row:16,padding:0,gap:8,label:14,detail:12,control:24,check:12,dot:6,tabs:16,line:16,clear:16,switch:`small`},U=x([`row`,`padding`,`gap`,`label`,`detail`,`control`,`check`,`dot`,`tabs`,`line`,`clear`,`switch`],()=>{if(v)return St;let{typography:e,dimension:t}=b(),{height:n}=t.size,r=t.icon;return{row:n[S].lg,line:n[S].lg,tabs:n[S].lg,control:r[S].md,clear:r[S].md,check:r[S].sm,...t.size.control[S],label:e.label.fontSize[S],detail:e.detail.fontSize[S]}});function W(e){return v?{borderWidth:P.hairline,borderColor:A.border,paddingVertical:15,paddingHorizontal:15}:{backgroundColor:j.card.backgroundColor,...F(N.container),borderWidth:P.hairline,borderColor:j.card.borderColor,boxShadow:j.card.boxShadow,...e?.padded?{padding:H.pad}:{}}}function Ct(){return{backgroundColor:A.inset,borderWidth:P.hairline,...F(N.control),...j.inset,borderColor:ut(_t())}}f(()=>!v&&de().width<600);const G=m.desktop,K={get row(){return U.row},get rowSm(){return G?32:U.row},get detail(){return U.detail}},q={root:`overflow-hidden rounded-(--radius-container) border border-border bg-card`,searchBar:`flex-row flex-nowrap items-center gap-2 border-b border-border ${v?``:`px-3`}`,search:`min-w-0 flex-1 ${v?`px-2 `:``}${G?`h-11 text-sm`:`h-12 text-base`} text-foreground placeholder:text-muted-foreground`,group:`pt-2.5 pb-1`,separator:`my-1 h-px bg-border`,item:`group transition-colors duration-100 motion-reduce:transition-none hover:bg-hover focus:bg-brand-tint active:opacity-70 disabled:opacity-50`},J={get list(){return bt()},get item(){return F(xt())},get group(){return{paddingHorizontal:V.pad}},get separator(){return{marginHorizontal:-V.inset}}};function wt(e){return n(et,{get children(){return e.label}})}function Tt(e){return(()=>{let n=a(`text`);return t(n,`style`,()=>({fontSize:11,fontWeight:M.weight(`title`),letterSpacing:.6,color:A.faint})),o(n,()=>e.group.heading.toLocaleUpperCase()),n})()}function Et(r){return(()=>{let i=a(`view`);t(i,`style`,()=>({minHeight:r.detail?K.row:K.rowSm,paddingVertical:yt(),flexDirection:`row`,alignItems:`center`,gap:10,paddingHorizontal:V.pad}));let s=a(`view`);c(s,`style`,{flex:1,minWidth:0,gap:1});let l=a(`text`);return t(l,`style`,()=>({fontSize:M.size(`body`),color:A.foreground,numberOfLines:1})),o(l,()=>r.entry.label),e(s,l),o(s,()=>r.detail?(()=>{let e=a(`text`);return t(e,`style`,()=>({fontSize:K.detail,color:A.mutedForeground,numberOfLines:1})),o(e,()=>r.detail),e})():null),e(i,s),o(i,()=>r.icon?n(B,{get icon(){return r.icon},size:16,get tint(){return A.mutedForeground}}):null,s),o(i,[()=>r.note?(()=>{let e=a(`text`);return t(e,`style`,()=>({fontSize:K.detail,color:A.faint,fontVariant:[`tabular-nums`]})),o(e,()=>r.note),e})():null,()=>G&&r.entry.shortcutLabel?n(wt,{get label(){return r.entry.shortcutLabel}}):null,()=>r.entry.checked?n(B,{icon:he,size:14,get tint(){return A.foreground}}):null]),i})()}function Dt(e){return(()=>{let n=a(`text`);return t(n,`style`,()=>({paddingVertical:24,textAlign:`center`,fontSize:13,color:A.mutedForeground})),o(n,()=>e.label),n})()}function Ot(){return{flexDirection:`row`,alignItems:`center`,flexWrap:`nowrap`,gap:8}}function kt(){return{flexGrow:1,flexShrink:1,flexBasis:0,minWidth:0,color:A.foreground,placeholderColor:A.mutedForeground}}function Y(e,t){return t==null?e:[e,t]}function At(e){let[,t]=ue(e,[`class`,`searchBarClass`,`searchBarStyle`,`searchClass`,`searchStyle`,`listClass`,`listStyle`,`itemClass`,`itemStyle`,`groupClass`,`groupStyle`,`separatorClass`,`separatorStyle`,`renderItem`,`renderGroup`,`empty`,`placeholder`,`searchPrefix`,`style`]);return n(fe,s(t,{get class(){return R(q.root,e.class)},get searchBarClass(){return R(q.searchBar,e.searchBarClass)},get searchBarStyle(){return Y(Ot(),e.searchBarStyle)},get searchClass(){return R(q.search,e.searchClass)},get searchStyle(){return Y(kt(),e.searchStyle)},get listClass(){return e.listClass},get listStyle(){return Y(J.list,e.listStyle)},get itemClass(){return R(q.item,e.itemClass)},get itemStyle(){return Y(J.item,e.itemStyle)},get groupClass(){return R(q.group,e.groupClass)},get groupStyle(){return Y(J.group,e.groupStyle)},get separatorClass(){return R(q.separator,e.separatorClass)},get separatorStyle(){return Y(J.separator,e.separatorStyle)},get placeholder(){return e.placeholder??`Type a command or search…`},get searchPrefix(){return e.searchPrefix===void 0?n(B,{icon:_,size:16,get tint(){return A.mutedForeground}}):e.searchPrefix},get renderItem(){return e.renderItem===void 0?e=>n(Et,{entry:e}):e.renderItem},get renderGroup(){return e.renderGroup===void 0?e=>n(Tt,{group:e}):e.renderGroup},get empty(){return e.empty===void 0?n(Dt,{label:`No results.`}):e.empty},get style(){return e.style}}))}const jt={"nsh-gallery":()=>__nsh_import(`nsh-gallery.js`,[]),shadcn:()=>__nsh_import(`shadcn.js`,[]),"solid-glass":()=>__nsh_import(`solid-glass.js`,[]),apple:()=>__nsh_import(`apple.js`,[]),material:()=>__nsh_import(`material.js`,[]),winui:()=>__nsh_import(`winui.js`,[])};function Mt(e){return jt[e]().then(e=>e.default)}const Nt=[{id:`nsh-gallery`,label:`NSH Gallery`,description:`The library's own: graphite surfaces, one citrus accent, 8-point controls and 14-point cards.`},{id:`shadcn`,label:`shadcn/ui`,description:`shadcn/ui's neutral palette: near-black and near-white fills, flat finishes, 8-point controls and 14-point cards.`},{id:`solid-glass`,label:`Solid Glass`,description:`Panes of thick smoky glass: a rim of light on each top edge, a hairline round it, a shadow underneath, 11-point controls and 20-point cards.`},{id:`apple`,label:`Apple`,description:`Apple's system colors and Liquid Glass: capsule controls, 20-point cards, hairline edges, and glass on the overlays that float.`},{id:`material`,label:`Material`,description:`Material 3 Expressive: tonal surfaces, capsule controls, circular corners, 8/10/10% state layers, and expressive shapes.`},{id:`winui`,label:`WinUI 3`,description:`WinUI 3 (Windows 11): WinUI fill and stroke tokens, 4/8-point circular corners, Segoe UI Variable, Consolas, double focus rings, and timing motion.`}],Pt=globalThis,X=(()=>{for(let e of[Pt.parent?.document,Pt.document]){let t=e?.getElementById(`app`);if(t)return t}return null})();X&&(X.style.visibility=`hidden`),Ft();async function Ft(){let e=null;try{let t=await ie.getItem(`palette`),n=Nt.find(e=>e.id===t);n&&(Ke(await Mt(n.id)),await It(),e=n.id)}finally{X&&(X.style.visibility=``)}e&&await ie.setItem(`palette-drawn`,e)}function It(){return new Promise(e=>{requestAnimationFrame(()=>requestAnimationFrame(()=>e()))})}function Lt(n){return(()=>{let i=a(`scroll`);t(i,`style`,()=>({flex:1,backgroundColor:A.background})),t(i,`contentStyle`,()=>({flexGrow:1,padding:20,gap:H.gap+2}));let s=a(`view`);t(s,`style`,()=>n.width===void 0?{flex:1,gap:H.gap+2}:{flex:1,width:`100%`,maxWidth:n.width,alignSelf:`center`,gap:H.gap+2});let c=a(`text`);return t(c,`style`,()=>({fontSize:22,fontWeight:`700`,color:A.foreground})),o(c,()=>n.title),e(s,c),o(s,[()=>n.children,r(()=>n.note,()=>(()=>{let e=a(`text`);return t(e,`style`,()=>({fontSize:13,color:A.mutedForeground})),o(e,()=>typeof n.note==`function`?n.note():n.note),e})())]),e(i,s),i})()}function Rt(e){return(()=>{let n=a(`view`);return t(n,`style`,()=>[W({padded:e.padded??!0}),{gap:H.gap+4},e.style??null]),o(n,()=>e.children),n})()}function zt(n){return(()=>{let r=a(`view`);c(r,`style`,{gap:8});let i=a(`text`);t(i,`style`,()=>({fontSize:H.note,color:A.mutedForeground})),o(i,()=>n.title);let s=a(`view`);return t(s,`style`,()=>n.axis===`block`?{flexDirection:`column`,alignItems:`stretch`,gap:8}:{flexDirection:`row`,flexWrap:`wrap`,alignItems:`center`,gap:8}),o(s,()=>n.children),e(r,i),e(r,s),r})()}m.desktop,p(null),p(`default`),m.desktop,p(null),p(null);const Bt={transitionDuration:150,transitionTimingFunction:`ease-out`};function Vt(e){return{transitionProperty:e?`${e}, transform`:`transform`,...Bt}}Vt(`background-color, border-color, box-shadow, opacity`);const Ht=m.desktop,Ut=()=>de().width>=700,Z=()=>de().width>=900;function Wt(e){let t=()=>e.gap??14,n=()=>({gap:t()}),r=d({get style(){return Z()?{width:`100%`,maxWidth:e.width??440,gap:t()}:n()},get children(){return e.children}}),i=d({get style(){return Z()?{flex:1,minWidth:0,borderRadius:N.container,borderWidth:1,borderColor:Q().line,backgroundColor:We(Q().text,.02),padding:24,alignItems:`center`,justifyContent:`center`}:n()},children:r}),a=d({get style(){return Z()?{width:300,gap:12}:{flex:e.grow?1:void 0,gap:t()}},get children(){return e.inspector}});return d({get style(){return Z()?{flex:1,flexDirection:`row`,gap:16}:{flex:e.grow?1:void 0,gap:t()}},children:[i,a]})}function Gt(e){let t=ae({get style(){return{fontSize:12,color:Q().muted}},get children(){return e.title}});return d({get style(){return{...Ct(),padding:12,gap:4,minHeight:e.minHeight,flex:e.grow?1:void 0}},get children(){return[t,e.children]}})}function Kt(e){return Gt({get title(){return e.title},get minHeight(){return e.minHeight},get grow(){return e.grow??Z()},get children(){return i(()=>e.lines,(e,t)=>ae({get style(){return{fontSize:12,color:t()===0?Q().text:Q().faint}},get children(){return e()}}),`index`)}})}const Q=()=>({page:A.background,text:A.foreground,muted:A.mutedForeground,faint:A.faint,border:A.border,line:A.line,accent:A.brand,onAccent:A.primaryForeground,onPrimary:A.primaryForeground,up:A.up,down:A.destructive,info:A.info,warn:A.warn,danger:A.destructive,onMedia:A.onMedia,card:{...W(),backgroundColor:A.card},row:{...W(),backgroundColor:A.card},inset:{backgroundColor:A.inset,borderWidth:1,borderColor:A.line,...j.inset},raised:{backgroundColor:A.raised,borderWidth:1,borderColor:A.border,...j.raised},primary:{backgroundColor:A.primary,borderWidth:1,...j.accent},accentFill:{backgroundColor:A.primary,borderWidth:1,borderColor:A.brand,...j.accent}});l(null,`{
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
`,null,null);const qt={new:De,open:Se,save:ve,share:ke,find:_,replace:Oe,terminal:je,sidebar:Ee,dark:Te,light:Ae,docs:xe,feedback:we},Jt=h(`dark`),Yt=h(null),$=h(``),Xt=h([]),Zt=e=>Xt.set([e,...Xt()].slice(0,4));let Qt;const $t=()=>[{id:`new`,label:`New File`,group:`File`,shortcut:`mod+n`},{id:`open`,label:`Open Folder…`,group:`File`,shortcut:`mod+o`},{id:`save`,label:`Save All`,group:`File`,shortcut:`mod+alt+s`},{id:`share`,label:`Share Project`,group:`File`,disabled:!0},{id:`find`,label:`Find in Files`,group:`Edit`,shortcut:`mod+shift+f`,keywords:[`search`,`grep`]},{id:`replace`,label:`Replace in Files`,group:`Edit`,shortcut:`mod+shift+h`},{id:`terminal`,label:`Toggle Terminal`,group:`View`,shortcut:`ctrl+j`,keywords:[`console`,`shell`]},{id:`sidebar`,label:`Toggle Sidebar`,group:`View`,shortcut:`mod+b`},{id:`dark`,label:`Dark Appearance`,group:`View`,keywords:[`theme`],checked:Jt()===`dark`},{id:`light`,label:`Light Appearance`,group:`View`,keywords:[`theme`],checked:Jt()===`light`},{id:`docs`,label:`Open Documentation`,group:`Help`,keywords:[`guide`,`manual`]},{id:`feedback`,label:`Send Feedback`,group:`Help`}],en=[`rs`,`tsx`,`md`,`json`,`png`],tn=Array.from({length:5e3},(e,t)=>{let n=en[t%en.length],r=`module-${String(Math.floor(t/100)+1).padStart(2,`0`)}`;return{id:`file-${t}`,label:`${r}/file-${t+1}.${n}`,group:r,keywords:[n]}}),nn={rs:be,tsx:be,md:xe,json:ye,png:Ce},rn=h(tn.length);let an;const on=e=>e.slice(e.lastIndexOf(`.`)+1);function sn(){return se.bind(`mod+k`,()=>Qt?.focus()),n(Lt,{title:`Command`,get children(){return[(()=>{let e=a(`text`);return t(e,`style`,()=>({color:Q().muted})),o(e,()=>Ht?`Type to filter, the arrows to move, Return to run, Escape to clear; ${se.label(`mod+k`)} focuses it`:`Type to filter, tap a command to run it`),e})(),n(Wt,{gap:14,get inspector(){return[n(Gt,{title:`highlighted`,get children(){return(()=>{let e=a(`text`);return c(e,`class`,`text-foreground`),c(e,`style`,{fontSize:13}),o(e,()=>Yt()??`none`),e})()}}),n(Gt,{title:`query`,get children(){return(()=>{let e=a(`text`);return c(e,`class`,`text-foreground`),c(e,`style`,{fontSize:13}),o(e,()=>$()?`“${$()}”`:`empty`),e})()}}),n(Kt,{title:`events`,get lines(){return Xt()},minHeight:92})]},get children(){return(()=>{let e=a(`view`);return t(e,`style`,()=>({width:Ut()?380:void 0,alignSelf:Ut()?`center`:`stretch`})),o(e,n(At,{ref:e=>Qt=e,get items(){return $t()},get query(){return $()},onQueryChange:({query:e})=>$.set(e),onHighlightChange:({highlighted:e})=>Yt.set(e),onCancel:()=>Zt(`onCancel()`),onSelect:({id:e})=>{(e===`dark`||e===`light`)&&Jt.set(e),Zt(`onSelect({ id: "${e}" })`)},accessibilityLabel:`Commands`,searchAccessibilityLabel:`Search commands`,style:{height:Ht?360:400},get searchPrefix(){return n(B,{icon:_,size:16,get tint(){return Q().muted}})},get empty(){return n(Dt,{label:`No commands match`})},renderGroup:e=>n(Tt,{group:e}),renderItem:e=>n(Et,{entry:e,get icon(){return qt[e.id]},get detail(){return e.id===`open`?`A folder on this Mac`:void 0},get note(){return e.disabled?`Pro`:void 0}})})),e})()}}),n(Rt,{get children(){return n(zt,{title:`A long list`,axis:`block`,get children(){return[(()=>{let n=a(`text`);t(n,`style`,()=>({color:Q().muted}));let r=te(`Five thousand files in fifty folders: the field finds one by name or by extension, and the count under it is the palette's own, from its ref.`);return e(n,r),n})(),(()=>{let r=a(`view`);t(r,`style`,()=>({width:Ut()?380:void 0,alignSelf:`flex-start`}));let i=a(`text`);return t(i,`style`,()=>({paddingTop:8,fontSize:12,color:Q().muted,fontVariant:[`tabular-nums`]})),o(i,()=>`${rn().toLocaleString(`en-US`)} of ${tn.length.toLocaleString(`en-US`)} files, 50 folders`),e(r,i),o(r,n(At,{ref:e=>an=e,items:tn,accessibilityLabel:`Files`,searchAccessibilityLabel:`Search files`,placeholder:`Search files by name or extension…`,listClass:`h-60`,onQueryChange:()=>void an?.matchedCount().then(e=>rn.set(e)),get empty(){return n(Dt,{label:`No file matches`})},renderItem:e=>n(Et,{entry:e,get icon(){return nn[on(e.label)]}})}),i),r})()]}})}})]}})}ce(sn);
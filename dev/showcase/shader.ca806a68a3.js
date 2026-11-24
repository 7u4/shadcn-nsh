import{O as e,a as t,f as n,n as r}from"./live-value.f269b9e61a.js";import{t as i}from"./press.d2a678712d.js";import{n as a}from"./button.5f20e6fdf1.js";import{J as o,d as s,f as c,q as l,u}from"./app.957630ee66.js";import{t as d}from"./switch.a9ba7c6a9b.js";import{a as f,c as p,i as m,t as h}from"./graphics-shared.b87803355e.js";import{append as g,bindProp as _,component as v,cond as y,each as b,element as x,insert as S,prop as C,spread as w,text as T}from"./facades/nsh-rt.3f8ba2bc28.js";import{Animated as E,Easing as D,cleanup as O,createAnimatedValue as k,signal as A,token as j}from"./facades/nsh.40a708e4ce.js";import{NavPage as M}from"./facades/nsh-base.2d7ed6498e.js";var N={url:`asset:/assets/logo-dark.svg`,size:{width:128,height:128}};const P=`
fn hash(p: vec2f) -> f32 {
  let q = bitcast<vec2u>(vec2i(floor(p)));
  var h = (q.x * 1597334677u) ^ (q.y * 3812015801u);
  h = h * 1664525u + 1013904223u;
  h = (h ^ (h >> 16u)) * 2246822519u;
  h = h ^ (h >> 13u);
  return f32(h >> 8u) / 16777216.0;
}
fn noise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2f(1.0, 0.0)), u.x),
             mix(hash(i + vec2f(0.0, 1.0)), hash(i + vec2f(1.0, 1.0)), u.x), u.y);
}
fn fbm(p0: vec2f) -> f32 {
  var p = p0;
  var v = 0.0;
  var a = 0.5;
  for (var i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2f(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}
`,F=`${P}
struct Uniforms { a: vec4f, b: vec4f, c: vec4f, base: vec4f, pointer: vec2f }
fn orb(p: vec2f, center: vec2f, size: f32) -> f32 {
  let d = p - center;
  return exp(-dot(d, d) / (size * size));
}
fn shade(uv: vec2f) -> vec4f {
  let aspect = vec2f(nsh.size.x / max(nsh.size.y, 1.0), 1.0);
  let p = uv * aspect;
  let t = nsh.time * 0.35;
  var light = vec3f(0.0);
  light += uniforms.a.rgb * orb(p, vec2f(0.3 + 0.15 * sin(t * 0.8), 0.35 + 0.2 * cos(t * 0.6)) * aspect, 0.38) * 1.1;
  light += uniforms.b.rgb * orb(p, vec2f(0.65 + 0.2 * cos(t * 0.5), 0.55 + 0.25 * sin(t * 0.7 + 1.0)) * aspect, 0.45) * 1.2;
  light += uniforms.c.rgb * orb(p, vec2f(0.85 + 0.1 * sin(t * 0.9 + 2.0), 0.25 + 0.15 * cos(t * 0.4)) * aspect, 0.32);
  light += uniforms.b.rgb * orb(p, vec2f(0.15 + 0.1 * cos(t * 0.6 + 3.0), 0.85) * aspect, 0.3) * 0.6;
  light += uniforms.c.rgb * orb(p, uniforms.pointer * aspect, 0.25) * 0.9;
  var color = uniforms.base.rgb + (vec3f(1.0) - exp(-light * 1.4)) * 0.95;
  color += vec3f((hash(uv * nsh.size * nsh.scale) - 0.5) * 0.04);
  return vec4f(color, 1.0);
}`,I=`${P}
struct Uniforms { a: vec4f, b: vec4f, c: vec4f, base: vec4f, tilt: f32 }
fn glow(p: vec2f, center: vec2f, size: f32) -> f32 {
  let d = p - center;
  return exp(-dot(d, d) / (size * size));
}
fn shade(uv: vec2f) -> vec4f {
  let aspect = vec2f(nsh.size.x / max(nsh.size.y, 1.0), 1.0);
  let p = uv * aspect;
  let px = 1.0 / max(nsh.size.y, 1.0);
  let t = nsh.time * 0.25;
  let shift = uniforms.tilt * 0.12;
  var light = vec3f(0.0);
  light += uniforms.a.rgb * glow(p, vec2f(0.82 + shift + 0.04 * sin(t), 0.2 + 0.06 * cos(t * 0.8)) * aspect, 0.34) * 0.9;
  light += uniforms.b.rgb * glow(p, vec2f(0.62 - shift * 0.5 + 0.05 * cos(t * 0.7), 0.85) * aspect, 0.42) * 0.8;
  light += uniforms.c.rgb * glow(p, vec2f(1.0 + 0.04 * sin(t * 0.6 + 1.0), 0.75) * aspect, 0.3) * 0.7;
  light *= smoothstep(0.0, 0.75, uv.x);
  var color = uniforms.base.rgb + (vec3f(1.0) - exp(-light * 1.3)) * 0.9;
  let cell = fract(p / (8.0 * px)) - 0.5;
  let dots = smoothstep(0.14, 0.06, length(cell));
  color += vec3f(1.0) * dots * (0.015 + 0.06 * length(light));
  let s = uv.x * 0.7 + uv.y * 0.3 - 0.55 - uniforms.tilt * 0.5;
  color += vec3f(exp(-s * s * 30.0) * 0.05);
  color += vec3f((hash(uv * nsh.size * nsh.scale + 7.0) - 0.5) * 0.03);
  return vec4f(color, 1.0);
}`,L=`
fn shade(uv: vec2f) -> vec4f {
  let aspect = vec2f(nsh.size.x / max(nsh.size.y, 1.0), 1.0);
  let d = length((uv - 0.5) * aspect);
  let t = smoothstep(nsh.progress * 1.2 - 0.04, nsh.progress * 1.2, d);
  return mix(sample_to(uv), sample_from(uv), t);
}`;function R(e){let t=A({width:1,height:1}),n=n=>e(Math.min(Math.max(n.locationX/t().width,0),1),Math.min(Math.max(n.locationY/t().height,0),1));return{onLayout:({bounds:e})=>{t.set(e.size)},onStartShouldSetResponder:()=>!0,onResponderTerminationRequest:()=>!1,onResponderGrant:e=>(n(e),!0),onResponderMove:n}}function z(){let e=k(.5),n=k(.5),r=(t,r)=>{e.set(t),n.set(r)};return v(m,{title:`Glow`,subtitle:`Soft orbs of light that blend`,get children(){return(()=>{let i=x(`view`);C(i,`style`,{gap:12});let a=x(`shader`);return C(a,`source`,F),_(a,`uniforms`,()=>({a:t.destructive,b:t.up,c:t.info,base:t.media,pointer:[e,n]})),C(a,`style`,{height:200,borderRadius:14}),w(a,R(r)),g(i,a),S(i,v(h,{label:`Drag to lead a blue orb; the light rolls off as it adds up.`})),i})()}})}function B(){let e=k(.5),n=k(.5);return v(m,{title:`Plasma`,subtitle:`Sums of sines through a cosine palette`,get children(){return(()=>{let r=x(`view`);C(r,`style`,{gap:10});let i=x(`shader`);return C(i,`source`,`
struct Uniforms { pointer: vec2f, a: vec4f, b: vec4f, c: vec4f }
fn shade(uv: vec2f) -> vec4f {
  let aspect = vec2f(nsh.size.x / max(nsh.size.y, 1.0), 1.0);
  let p = (uv - 0.5) * aspect * 4.0;
  let m = (uniforms.pointer - 0.5) * aspect * 4.0;
  let t = nsh.time * 0.5;
  var v = sin(p.x + t) + sin((p.y + t) * 0.7) + sin((p.x + p.y + t) * 0.6);
  v += sin(length(p - m) * 2.5 - t * 2.0) * 1.2;
  let wave = 0.5 + 0.5 * sin(6.2831853 * (v * 0.18 + vec3f(0.0, 0.33, 0.66)));
  let palette = mix(uniforms.a.rgb, uniforms.b.rgb, wave.x);
  let color = mix(palette, uniforms.c.rgb, wave.z * 0.5);
  let vignette = 1.0 - 0.5 * dot(uv - 0.5, uv - 0.5) * 2.0;
  return vec4f(color * vignette, 1.0);
}`),_(i,`uniforms`,()=>({pointer:[e,n],a:t.info,b:t.up,c:t.warn})),C(i,`style`,{height:200,borderRadius:14}),w(i,R((t,r)=>{e.set(t),n.set(r)})),g(r,i),S(r,v(h,{label:`Drag across it: the pointer is a second wave source.`})),r})()}})}function V(){let e=A(1),a=k(0),o={x:k(.5),y:k(.5)},s=E.loop(E.timing(a,{toValue:1,duration:2200,easing:D.out(D.quad)}));s.start(),O(()=>s.stop());let c=(e,t)=>{s.stop(),o.x.set(e),o.y.set(t),a.set(0),s.start()},l=A({width:1,height:1});return v(m,{title:`Code rain`,subtitle:`Animated values as uniforms`,get children(){return(()=>{let s=x(`view`);C(s,`style`,{gap:10});let u=x(`shader`);C(u,`source`,`
fn hash(p: vec2f) -> f32 {
  let q = bitcast<vec2u>(vec2i(floor(p)));
  var h = (q.x * 1597334677u) ^ (q.y * 3812015801u);
  h = h * 1664525u + 1013904223u;
  h = (h ^ (h >> 16u)) * 2246822519u;
  h = h ^ (h >> 13u);
  return f32(h >> 8u) / 16777216.0;
}
struct Uniforms { center: vec2f, wave: f32, tintA: vec4f, tintB: vec4f, head: vec4f, ground: vec4f, speed: f32 }
fn shade(uv: vec2f) -> vec4f {
  let g = uv * nsh.size / vec2f(12.0, 16.0);
  let cell = floor(g);
  let t = nsh.time * uniforms.speed;
  let live = step(0.45, hash(vec2f(cell.x, 3.0)));
  let speed = 3.0 + hash(vec2f(cell.x, 1.0)) * 5.0;
  let head = t * speed + hash(vec2f(cell.x, 2.0)) * 60.0;
  let phase = fract((head - cell.y) / 40.0);
  let trail = pow(clamp(1.0 - phase * 2.5, 0.0, 1.0), 2.0) * live;
  let lead = step(phase, 0.025) * live;
  let tap = floor(uniforms.center * nsh.size / vec2f(12.0, 16.0));
  let d = length((cell - tap) * vec2f(1.0, 1.4));
  let front = uniforms.wave * 14.0;
  let fade = 1.0 - uniforms.wave;
  let ring = step(abs(d - front), 0.8) * fade;
  let inside = step(d, front - 0.8) * step(front - 4.0, d) * fade;
  let rate = 0.8 + hash(cell) * 1.2 + ring * 20.0;
  let id = hash(cell + vec2f(floor(t * rate) * 13.0, 0.0)) * 4096.0;
  let f = (fract(g) - vec2f(0.2, 0.15)) / vec2f(0.6, 0.7);
  let bit = floor(f * vec2f(3.0, 5.0));
  let column = min(bit.x, 2.0 - bit.x);
  let on = step(0.5, hash(vec2f(id + column * 7.0, bit.y * 31.0 + id)))
    * step(0.0, f.x) * step(f.x, 1.0) * step(0.0, f.y) * step(f.y, 1.0);
  let tint = mix(uniforms.tintA.rgb, uniforms.tintB.rgb, uniforms.wave);
  let level = max(trail, inside * 0.5) + ring * 1.2;
  var color = tint * on * level;
  color += uniforms.head.rgb * on * (lead + ring * 0.6);
  color += tint * ring * 0.18;
  color += uniforms.ground.rgb;
  return vec4f(color, 1.0);
}`),_(u,`uniforms`,()=>({center:[o.x,o.y],wave:a,tintA:t.up,tintB:t.brand,head:t.onMedia,ground:t.media,speed:e()})),C(u,`style`,{height:200,borderRadius:14,padding:16,justifyContent:`flex-end`}),C(u,`onLayout`,({bounds:e})=>{l.set(e.size)}),C(u,`onStartShouldSetResponder`,()=>!0),C(u,`onResponderGrant`,e=>c(e.locationX/l().width,e.locationY/l().height));let d=x(`view`);return _(d,`style`,()=>({flexDirection:`row`,alignItems:`center`,alignSelf:`flex-start`,paddingHorizontal:6,paddingVertical:4,borderRadius:2,borderWidth:1,borderColor:r(t.up,.5),backgroundColor:r(t.media,.85)})),C(d,`onStartShouldSetResponder`,()=>!0),C(d,`onResponderTerminationRequest`,()=>!1),S(d,b(()=>[1,2,4],r=>(()=>{let a=x(`view`);C(a,`onPress`,()=>e.set(r())),C(a,`role`,`button`),_(a,`accessibilityLabel`,()=>`${r()}×`),_(a,`accessibilityState`,()=>({selected:e()===r()})),C(a,`hoverStyle`,{opacity:.86}),_(a,`activeStyle`,()=>i().activeStyle),_(a,`focusVisibleStyle`,()=>n()),C(a,`style`,{paddingHorizontal:6,paddingVertical:2});let o=x(`text`);return _(o,`style`,()=>({color:e()===r()?t.onMedia:t.up,fontFamily:`monospace`,fontSize:12,fontWeight:e()===r()?`700`:`400`,opacity:e()===r()?1:.7})),S(o,()=>`${r()}×`),g(a,o),a})())),g(u,d),g(s,u),S(s,v(h,{label:`Tap the rain to send a wave; pick how fast it falls.`})),s})()}})}function H(){let e=k(0),n=E.loop(E.sequence([E.timing(e,{toValue:1,duration:2600,easing:D.inOut(D.sin)}),E.timing(e,{toValue:-1,duration:2600,easing:D.inOut(D.sin)})]));n.start(),O(()=>n.stop());let i=()=>{n.stop(),e.set(-1),E.timing(e,{toValue:1,duration:1200,easing:D.inOut(D.cubic)}).start()};return v(m,{title:`Hero banner`,subtitle:`Children drawn over the shader`,get children(){return(()=>{let o=x(`view`);C(o,`style`,{gap:10});let s=x(`shader`);C(s,`source`,I),_(s,`uniforms`,()=>({a:t.brand,b:t.up,c:t.info,base:t.media,tilt:e})),C(s,`style`,{height:200,borderRadius:14,paddingHorizontal:20,paddingVertical:16,justifyContent:`space-between`}),w(s,R(t=>{n.stop(),e.set(t*2-1)}));let c=x(`view`);C(c,`style`,{flexDirection:`row`,alignItems:`center`,gap:10});let l=x(`image`);C(l,`src`,N),C(l,`style`,{width:26,height:26});let u=x(`text`);_(u,`style`,()=>({flex:1,color:t.onMedia,fontSize:15,fontWeight:`700`}));let d=T(`Native Shell`);g(u,d);let f=x(`view`);_(f,`style`,()=>({flexDirection:`row`,alignItems:`center`,gap:6,paddingHorizontal:9,paddingVertical:4,borderRadius:999,borderWidth:.5,borderColor:r(t.brand,.3),backgroundColor:r(t.brand,.1)}));let p=x(`view`);_(p,`style`,()=>({width:5,height:5,borderRadius:999,backgroundColor:t.brand,boxShadow:`0 0 6px ${r(t.brand,.8)}`}));let m=x(`text`);_(m,`style`,()=>({color:t.brand,fontSize:10,fontWeight:`600`,letterSpacing:1.2}));let y=T(`SHADERS`);g(m,y),g(f,p),g(f,m),g(c,l),g(c,u),g(c,f);let b=x(`view`);C(b,`style`,{gap:12});let E=x(`view`);C(E,`style`,{gap:4});let D=x(`text`);_(D,`style`,()=>({color:t.onMedia,fontSize:20,fontWeight:`700`}));let O=T(`Native UI, delivered at run time`);g(D,O);let k=x(`text`);_(k,`style`,()=>({color:t.onMedia,fontSize:13,opacity:.65}));let A=T(`Light swept by a looping animated uniform`);g(k,A),g(E,D),g(E,k);let j=x(`view`);return C(j,`style`,{flexDirection:`row`,gap:8}),S(j,[v(a,{size:`sm`,onPress:i,get children(){return`Sweep light`}}),v(a,{size:`sm`,variant:`secondary`,onPress:()=>n.start(),get children(){return`Loop`}})]),g(b,E),g(b,j),g(s,c),g(s,b),g(o,s),S(o,v(h,{label:`Drag sideways to move the light; the buttons sit over the shader.`})),o})()}})}function U(e){return(()=>{let n=x(`view`);_(n,`style`,()=>({flex:1,borderRadius:14,overflow:`hidden`,backgroundColor:t.media}));let r=x(`image`);_(r,`src`,()=>e.photo),C(r,`style`,{position:`absolute`,top:0,start:0,end:0,bottom:0,objectFit:`cover`});let i=x(`view`);_(i,`style`,()=>({flex:1,padding:16,justifyContent:`flex-end`,gap:2,backgroundImage:`linear-gradient(180deg, transparent 55%, ${j(`scrim`)} 100%)`}));let a=x(`text`);_(a,`style`,()=>({color:t.onMedia,fontSize:17,fontWeight:`600`})),S(a,()=>e.title);let o=x(`text`);return _(o,`style`,()=>({color:t.onMedia,fontSize:13,opacity:.82})),S(o,()=>e.note),g(i,a),g(i,o),g(n,r),g(n,i),n})()}function W(){let e=k(0),t=t=>E.timing(e,{toValue:t,duration:600,easing:D.inOut(D.cubic)}).start();return v(m,{title:`Shader effect`,subtitle:`Children drawn through a shader`,get children(){return(()=>{let n=x(`view`);C(n,`style`,{gap:10});let r=x(`shadereffect`);C(r,`source`,`
fn shade(uv: vec2f) -> vec4f {
  let cell = max(nsh.progress * 14.0, 1.0 / nsh.scale) / nsh.size;
  return sample_content(min((floor(uv / cell) + 0.5) * cell, vec2f(0.999)));
}`),C(r,`progress`,e),C(r,`style`,{height:160}),w(r,R(t=>e.set(t))),S(r,v(U,{title:`Pixelated`,note:`sample_content reads what the children draw`,get photo(){return p(`arc`)}}));let i=x(`view`);return C(i,`style`,{flexDirection:`row`,gap:8}),S(i,[v(a,{style:{flex:1},size:`sm`,variant:`secondary`,onPress:()=>t(1),get children(){return`Pixelate`}}),v(a,{style:{flex:1},size:`sm`,variant:`secondary`,onPress:()=>t(0),get children(){return`Sharpen`}})]),g(n,r),g(n,i),S(n,v(h,{label:`Drag across it to set nsh.progress; the buttons animate it.`})),n})()}})}const G=[{title:`Morning`,note:`A wipe from the top left`,photo:p(`sunrise`)},{title:`Noon`,note:`sample_from: what showed`,photo:p(`day`)},{title:`Night`,note:`sample_to: what shows now`,photo:p(`rollout`)}];function K(){let e=A(0),t=()=>G[e()];return v(m,{title:`Shader transition`,subtitle:`A change drawn through a shader`,get children(){return(()=>{let n=x(`view`);C(n,`style`,{gap:10});let r=x(`shadertransition`);return C(r,`source`,`
fn shade(uv: vec2f) -> vec4f {
  let edge = nsh.progress * 1.4 - 0.2;
  let t = smoothstep(edge - 0.2, edge + 0.2, (uv.x + uv.y) * 0.5);
  return mix(sample_to(uv), sample_from(uv), t);
}`),_(r,`value`,()=>e()),C(r,`duration`,700),C(r,`style`,{height:160}),S(r,v(U,{get title(){return t().title},get note(){return t().note},get photo(){return t().photo}})),g(n,r),S(n,[v(a,{size:`sm`,variant:`secondary`,onPress:()=>e.set((e()+1)%G.length),get children(){return`Next`}}),v(h,{label:`Each change wipes from the old picture to the new one.`})]),n})()}})}function q(){let e=A(!1);return v(m,{title:`Screen effect`,subtitle:`The whole surface through a shader`,get children(){return(()=>{let n=x(`view`);return C(n,`style`,{gap:10}),S(n,[y(()=>e(),()=>(()=>{let e=x(`screeneffect`);return C(e,`source`,`
struct Uniforms { a: vec4f, b: vec4f }
fn shade(uv: vec2f) -> vec4f {
  let c = sample_content(uv);
  let l = dot(c.rgb, vec3f(0.299, 0.587, 0.114));
  let ink = mix(uniforms.a.rgb, uniforms.b.rgb, l);
  let vignette = 1.0 - 0.6 * dot(uv - 0.5, uv - 0.5);
  return vec4f(ink * vignette, c.a);
}`),_(e,`uniforms`,()=>({a:t.up,b:t.warn})),e})()),v(d,{get checked(){return e()},onChange:({checked:t})=>e.set(t),class:`flex-row items-center gap-2`,get children(){return(()=>{let e=x(`text`);_(e,`style`,()=>({fontSize:13,color:t.foreground}));let n=T(`Duotone`);return g(e,n),e})()}}),v(h,{label:`A ScreenEffect draws everything, dialogs included, in two inks.`})]),n})()}})}const J=o([`Home`]);function Y(){let n=A(!1),r=e=>e===`Iris`?v(M,{title:`Iris`,transitionShader:{source:L,duration:600},get children(){return(()=>{let e=x(`view`);return _(e,`style`,()=>({flex:1,padding:24,gap:16,backgroundColor:t.background})),S(e,[v(U,{title:`Iris`,note:`This page came, and goes, through transitionShader`,get photo(){return p(`moon`)}}),v(a,{size:`sm`,onPress:()=>J.pop(),get children(){return`Leave the page`}})]),e})()}}):v(M,{title:`Home`,get children(){return(()=>{let e=x(`view`);_(e,`style`,()=>({flex:1,alignItems:`center`,justifyContent:`center`,backgroundColor:t.background}));let n=x(`text`);_(n,`style`,()=>({fontSize:13,color:t.mutedForeground}));let r=T(`The iris pages open over this stack`);return g(n,r),g(e,n),e})()}});return v(m,{title:`Pages and dialogs`,subtitle:`transitionShader`,get children(){return(()=>{let i=x(`view`);C(i,`style`,{gap:10});let o=x(`view`);return C(o,`style`,{flexDirection:`row`,gap:8}),S(o,[v(a,{style:{flex:1},size:`sm`,onPress:()=>J.push(`Iris`),get children(){return`Push a page`}}),v(a,{style:{flex:1},size:`sm`,variant:`secondary`,onPress:()=>n.set(!0),get children(){return`Open a dialog`}})]),g(i,o),S(i,[v(h,{label:`They come and go through an iris instead of the platform's animation.`}),v(l,{state:J,get style(){return{height:260,borderRadius:e.container,borderWidth:1,borderColor:t.line,overflow:`hidden`}},get children(){return r}}),v(u,{get open(){return n()},onOpenChange:({open:e})=>n.set(e),get children(){return v(c,{width:300,scroll:!1,transitionShader:{source:L,duration:600},get children(){return(()=>{let e=x(`view`);return C(e,`style`,{height:200,gap:12}),S(e,[v(U,{title:`Dialog`,note:`Presented through the iris`,get photo(){return p(`liftoff`)}}),v(s,{get children(){return`Close`}})]),e})()}})}})]),i})()}})}const X=[z,V,H,B,W,K,q,Y];function Z(){return v(f,{detail:`WGSL shaders on the GPU: noise, gradients, animated uniforms`,max:2,cards:X})}export{Z as ShaderDemo};
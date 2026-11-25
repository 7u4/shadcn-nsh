import{I as e,N as t,a as n,n as r,t as i,y as a}from"./live-value.24b9afef93.js";import{n as o,s}from"./icons.b35ce0f8b4.js";import{t as c}from"./undo-2.bcb6309b65.js";import{c as l,l as u,n as d,u as f}from"./button.29e894443d.js";import{n as p}from"./data-shared.b5fe08302a.js";import{append as m,bindProp as h,component as g,cond as _,element as v,insert as y,merge as b,prop as x}from"./facades/nsh-rt.3f8ba2bc28.js";import{fontScale as S,platform as C,signal as w,split as T}from"./facades/nsh.40a708e4ce.js";import{Button as E,DiffView as D}from"./facades/nsh-base.2d7ed6498e.js";const O={light:10,dark:16},k=(t,r=n.card)=>t===`neutral`?n.raised:`color-mix(in srgb, ${e(t)} ${a()?O.dark:O.light}%, ${r})`;function A(e){let n=f(e.variant,{size:`sm`,style:()=>t?void 0:{height:20,minWidth:20,borderRadius:5,paddingHorizontal:e.iconOnly?0:6}});return g(E,b({get onPress(){return e.onPress},get accessibilityLabel(){return`${e.label} change ${e.index+1}`}},n,{get children(){return e.iconOnly&&!t?g(o,b(l(e.variant,{size:`sm`}),{get icon(){return e.icon},size:11})):(()=>{let n=v(`text`);return x(n,`class`,`font-sans`),h(n,`style`,()=>({...u(e.variant,{size:`sm`}),fontSize:t?void 0:11})),y(n,()=>e.label),n})()}}))}function j(){return{get lineAdded(){return{backgroundColor:k(`up`)}},get lineDeleted(){return{backgroundColor:k(`down`)}},get wordAdded(){return{backgroundColor:r(n.up,.28)}},get wordDeleted(){return{backgroundColor:r(n.destructive,.28)}},get indicatorAdded(){return{color:n.up}},get indicatorDeleted(){return{color:n.destructive}}}}function M(e,t){return t===`unified`?e.oldLines>0?`down`:`up`:e.newLines>0?`up`:void 0}function N(e){let a=()=>{let t=i(e.tone);return t?k(t):n.card};return(()=>{let n=v(`view`);return h(n,`style`,()=>t?{flexDirection:`row`,gap:4}:{flexDirection:`row`,gap:4,paddingLeft:16,paddingRight:12,marginRight:-8,backgroundImage:`linear-gradient(90deg, ${r(a(),0)} 0%, ${a()} 12px)`}),y(n,[g(A,{variant:`secondary`,label:`Revert`,icon:c,get index(){return e.index},get iconOnly(){return e.iconOnly},get onPress(){return e.onRevert}}),g(A,{variant:`default`,label:`Keep`,icon:s,get index(){return e.index},get iconOnly(){return e.iconOnly},get onPress(){return e.onKeep}})]),n})()}function P(e,t){if(t==null)return e;let n={};for(let r of Object.keys(e))Object.defineProperty(n,r,{enumerable:!0,get:()=>t[r]??e[r]});return n}function F(e){let[,t]=T(e,[`styles`,`class`,`style`]);return g(D,b(t,{get class(){return e.class},get style(){return e.style},get styles(){return P(j(),e.styles)}}))}const I=`import { signal, Text, View } from "nsh";

/** A counter that starts at zero. */
export function Counter() {
  const count = signal(0);
  const label = () => "Count: " + count();
  return (
    <View onPress={() => count.set(count() + 1)}>
      <Text>{label()}</Text>
    </View>
  );
}

/** Formats a number for the badge. */
function badge(n: number) {
  return n > 99 ? "99+" : String(n);
}

/** The step of each press. */
const STEP = 1;

export default Counter;
`,L=`import { computed, signal, Text, View } from "nsh";

/** A counter that starts at \`initial\`. */
export function Counter(props: { initial?: number }) {
  const count = signal(props.initial ?? 0);
  const label = computed(() => \`Count: \${count()}\`);
  return (
    <View onPress={() => count.set(count() + STEP)} class="p-4">
      <Text>{label()}</Text>
    </View>
  );
}

/** Formats a number for the badge. */
function badge(n: number) {
  return n > 999 ? "999+" : String(n);
}

/** The step of each press. */
const STEP = 2;

export default Counter;
`,R=e=>e.split(`
`).length,z=Array.from({length:24},(e,t)=>`export const value${t} = ${t}; // a long unwrapped filler line number ${t}`).join(`
`),B=z.replace(`value9 = 9;`,`value9 = 9090;`),V=`diff --git a/src/layout.rs b/src/layout.rs
--- a/src/layout.rs
+++ b/src/layout.rs
@@ -12,6 +12,7 @@ impl Layout {
     pub fn measure(&mut self, node: NodeId, available: Size) -> Size {
         let style = self.style(node);
-        let size = taffy::compute(style, available);
+        let size = taffy::compute(style, available)
+            .max(style.min_size);
         self.cache.insert(node, size);
         size
     }
@@ -40,5 +41,5 @@ impl Layout {
     fn invalidate(&mut self, node: NodeId) {
-        self.cache.remove(&node);
+        self.cache.retain(|id, _| *id != node);
         for child in self.children(node) {
             self.invalidate(child);
         }
`;function H(e){return g(d,{get accessibilityLabel(){return e.label},variant:`secondary`,size:`sm`,get disabled(){return e.disabled},get onPress(){return e.onPress},get children(){return e.name}})}function U(){let e=w(`texts`),r=w(C.desktop?`split`:`unified`),i=w(I),a=w(L),o=w({added:0,deleted:0,hunks:0}),s=w(0),c=w(``),l=w(void 0),u=({stats:e})=>{o.set(e),s.set(Math.min(s(),Math.max(0,e.hunks-1)))},d=e=>{s.set(e),l()?.goToHunk(e)};return(()=>{let f=v(`view`);x(f,`class`,`flex-1 gap-3 p-4`);let b=v(`view`);x(b,`class`,`flex-row flex-wrap items-center gap-3`),y(b,[g(p,{options:[{value:`texts`,label:`Texts`},{value:`long`,label:`Long lines`},{value:`patch`,label:`Patch`}],get value(){return e()},onChange:t=>e.set(t),size:`small`}),g(p,{options:[{value:`split`,label:`Split`},{value:`unified`,label:`Unified`}],get value(){return r()},onChange:e=>r.set(e),size:`small`})]);let w=v(`view`);return x(w,`class`,`border-border bg-card flex-1 overflow-hidden rounded-lg border`),h(w,`style`,()=>t?void 0:{maxHeight:2+20*S()*(e()===`long`?R(B):e()===`patch`?R(V):r()===`split`?Math.max(R(i()),R(a())):R(a())+o().deleted)}),y(w,()=>e()===`long`?g(F,{oldValue:z,newValue:B,language:`util.ts`,get layout(){return r()},get styles(){return j()},onStatsChange:u,expandAll:!0,class:`flex-1`}):e()===`texts`?g(F,{ref:e=>l.set(e),onStatsChange:u,get oldValue(){return i()},get newValue(){return a()},language:`tsx`,get layout(){return r()},get styles(){return j()},renderHunkActions:e=>g(N,{get index(){return e.index},get iconOnly(){return!C.desktop},get tone(){return M(e,r())},onRevert:()=>l()?.revertHunk(e.index),onKeep:()=>l()?.acceptHunk(e.index)}),onChange:({change:e})=>{i.set(e.oldValue),a.set(e.newValue),c.set(`Changed`)},onLineNumberPress:({line:e})=>c.set(`Comment on ${e.side} line ${e.line+1}`),class:`flex-1`}):g(F,{patch:V,onStatsChange:u,get layout(){return r()},get styles(){return j()},indicators:`classic`,renderSeparator:e=>(()=>{let t=v(`view`);x(t,`class`,`bg-muted flex-1 flex-row items-center gap-2 px-3`);let n=v(`text`);return x(n,`class`,`text-muted-foreground font-mono text-[11px]`),y(n,()=>e.header?`@@ ${e.header.trim()}`:`${e.lines} lines`),m(t,n),t})(),onLineNumberPress:({line:e})=>c.set(`Comment on ${e.side} line ${e.line+1}`),class:`flex-1`})),m(f,b),m(f,w),y(f,_(()=>e()===`texts`,()=>(()=>{let e=v(`view`);x(e,`class`,`flex-row flex-wrap items-center gap-2`);let t=v(`text`);x(t,`class`,`text-muted-foreground text-xs tabular-nums`);let r=v(`text`);h(r,`style`,()=>({color:n.up})),y(r,()=>`+${o().added}`);let u=v(`text`);h(u,`style`,()=>({color:n.destructive})),y(u,()=>`−${o().deleted}`),m(t,r),m(t,u),y(t,` `,u),y(t,()=>` · ${o().hunks===0?`No changes`:`Change ${s()+1} of ${o().hunks}`}`);let f=v(`view`);return x(f,`class`,`flex-1`),m(e,t),m(e,f),y(e,[g(H,{label:`Previous change`,name:`↑`,get disabled(){return s()<=0},onPress:()=>d(s()-1)}),g(H,{label:`Next change`,name:`↓`,get disabled(){return s()>=o().hunks-1},onPress:()=>d(s()+1)}),g(H,{label:`Expand all`,name:`Expand`,onPress:()=>l()?.expandAll()}),g(H,{label:`Collapse all`,name:`Collapse`,onPress:()=>l()?.collapseAll()}),g(H,{label:`Reset`,name:`Reset`,onPress:()=>{i.set(I),a.set(L),c.set(`Reset`)}})]),e})()),w),y(f,[_(()=>e()===`long`,()=>(()=>{let e=v(`text`);return x(e,`class`,`text-muted-foreground text-xs`),y(e,()=>`Text size ${S().toFixed(2)}× · raise the system text size: every line stays on its own row`),e})()),_(()=>c(),()=>(()=>{let e=v(`text`);return x(e,`class`,`text-muted-foreground text-xs`),y(e,()=>c()),e})())]),f})()}export{U as DiffViewDemo};
const host=globalThis.__nsh_browser_realm.modules;
let e0=host.get("crypto")["createHash"];export{e0 as "createHash"};
let e1=host.get("crypto")["randomUUID"];export{e1 as "randomUUID"};
globalThis.__nsh_browser_realm.watch(()=>{e0=host.get("crypto")["createHash"];e1=host.get("crypto")["randomUUID"];});

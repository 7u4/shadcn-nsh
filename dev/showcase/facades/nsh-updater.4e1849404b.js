const host=globalThis.__nsh_browser_realm.modules;
let e0=host.get("nsh/updater")["checkForUpdate"];export{e0 as "checkForUpdate"};
let e1=host.get("nsh/updater")["downloadUpdate"];export{e1 as "downloadUpdate"};
let e2=host.get("nsh/updater")["installAndRestart"];export{e2 as "installAndRestart"};
globalThis.__nsh_browser_realm.watch(()=>{e0=host.get("nsh/updater")["checkForUpdate"];e1=host.get("nsh/updater")["downloadUpdate"];e2=host.get("nsh/updater")["installAndRestart"];});

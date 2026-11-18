/**
 * The frame recorder the docs checks share: a packaged demo (`public/demos/<id>/`, `bun run
 * docs:demos`) in headless Chrome over the DevTools protocol, with a script of the caller's
 * installed before any page script runs, and a poll that reads what that script recorded.
 *
 * `check-palette.ts` asks which colors the first frame paints; `check-first-frame.ts` asks how long
 * the first frame takes. Both need the same server, the same window, and the same way of reading a
 * page back, so it lives here once.
 *
 * Chrome: `NSH_BROWSER` or `CHROME_PATH` names it, else the usual install paths are tried.
 * Nothing here compiles NSH or needs the site built: it reads a packaged demo.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const docsRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
/** The repository root: Chrome's throwaway profile is made under it, and removed again. */
export const repo = path.resolve(docsRoot, "../..");
export const publicRoot = path.join(docsRoot, "public");

/** A packaged demo's `index.html` is built, or the check cannot read it. */
export function packagedDemo(label: string, demo: string): void {
  if (fs.existsSync(path.join(publicRoot, "demos", demo, "index.html"))) return;
  console.error(`${label}: public/demos/${demo}/ is not built — run \`bun run docs:demos\``);
  process.exit(1);
}

/** The packaged demos as a static site: what a demo's page fetches, off a port of its own. */
export function servePackagedDemos(): { origin: string; stop: () => void } {
  const server = Bun.serve({
    port: 0,
    fetch(request) {
      const url = new URL(request.url);
      let file = path.join(publicRoot, decodeURIComponent(url.pathname));
      if (url.pathname.endsWith("/")) file = path.join(file, "index.html");
      if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
        return new Response("not found", { status: 404 });
      }
      return new Response(Bun.file(file), { headers: { "cache-control": "no-store" } });
    },
  });
  return { origin: `http://127.0.0.1:${server.port}`, stop: () => server.stop(true) };
}

/** A DevTools client: one command at a time, replies matched by id, events passed on. */
type Reply = {
  id?: number;
  result?: Record<string, unknown>;
  error?: { message: string };
  method?: string;
  params?: unknown;
  sessionId?: string;
};

export type DevTools = {
  send: (method: string, params?: unknown, session?: { sessionId: string }) => Promise<Reply>;
  on: (handler: (message: Reply) => void) => void;
  close: () => void;
};

export type WatchOptions = {
  /** How the check names itself in what it prints and in what it throws. */
  label: string;
  url: string;
  /** The recorder, installed before the page's own scripts run. */
  source: string;
  /** How long to keep polling after the navigation, in milliseconds. */
  deadlineMs: number;
  /** Also keep the compositor's frames (a screencast), as PNG bytes. */
  screencast?: (png: Buffer, frameSessionId: number) => void;
  /** Read the page back; `true` stops the watch (the caller has what it came for). */
  poll: (read: (expression: string) => Promise<string>) => Promise<boolean>;
};

/**
 * A demo's page, open in its own Chrome (a throwaway profile, the window every check measures in),
 * recorded by `source`, polled until `poll` is done or `deadlineMs` passes — whichever comes first.
 */
export async function watchDemo(options: WatchOptions): Promise<void> {
  const { label, url, source, deadlineMs, screencast, poll } = options;
  const chrome = findChrome();
  if (!chrome) {
    console.error(`${label}: no Chrome found — set CHROME_PATH`);
    process.exit(1);
  }
  const profile = fs.mkdtempSync(path.join(repo, ".demo-frames-"));
  const port = freePort();
  const browser = Bun.spawn(
    [
      chrome,
      // The window every check measures in, at `?idiom=desktop` sizes.
      "--headless",
      "--disable-gpu",
      "--force-prefers-reduced-motion",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      "--force-device-scale-factor=1",
      "--window-size=1024,700",
      `--user-data-dir=${profile}`,
      `--remote-debugging-port=${port}`,
      "about:blank",
    ],
    { stdout: "ignore", stderr: "ignore" },
  );
  try {
    const devtools = await connect(port, label);
    try {
      const created = await devtools.send("Target.createTarget", { url: "about:blank" });
      const { targetId } = created.result as { targetId: string };
      const attached = await devtools.send("Target.attachToTarget", { targetId, flatten: true });
      const { sessionId } = attached.result as { sessionId: string };
      const session = { sessionId };
      await devtools.send("Page.enable", {}, session);
      await devtools.send("Runtime.enable", {}, session);
      await devtools.send("Page.addScriptToEvaluateOnNewDocument", { source }, session);
      if (screencast) {
        devtools.on((message) => {
          if (message.method !== "Page.screencastFrame" || message.sessionId !== sessionId) return;
          const { data, sessionId: frame } = message.params as { data: string; sessionId: number };
          screencast(Buffer.from(data, "base64"), frame);
          void devtools.send("Page.screencastFrameAck", { sessionId: frame }, session);
        });
        await devtools.send(
          "Page.startScreencast",
          { format: "png", maxWidth: 1024, maxHeight: 700, everyNthFrame: 1 },
          session,
        );
      }
      await devtools.send("Page.navigate", { url }, session);
      const read = async (expression: string) => {
        const evaluated = await devtools.send(
          "Runtime.evaluate",
          { expression, returnByValue: true },
          session,
        );
        return (evaluated.result as { result: { value?: string } }).result.value ?? "";
      };
      const deadline = Date.now() + deadlineMs;
      try {
        while (Date.now() < deadline) {
          await Bun.sleep(100);
          // Out of time: a check that cannot see the page fails rather than waits forever.
          if ((await poll(read)) || Date.now() > deadline) break;
        }
      } finally {
        if (screencast) await devtools.send("Page.stopScreencast", {}, session);
      }
    } finally {
      devtools.close();
    }
  } finally {
    browser.kill();
    // Chrome writes to its profile while it shuts down: remove the profile once it has exited.
    await browser.exited;
    fs.rmSync(profile, { recursive: true, force: true });
  }
}

/** A port nothing listens on: Chrome's debugger, a moment from now. */
export function freePort(): number {
  const probe = Bun.serve({ port: 0, fetch: () => new Response("") });
  const port = probe.port;
  probe.stop(true);
  if (port === undefined) throw new Error("no free port");
  return port;
}

async function connect(port: number, label: string): Promise<DevTools> {
  const deadline = Date.now() + 8000;
  let target: string | undefined;
  while (Date.now() < deadline && !target) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      target = ((await response.json()) as { webSocketDebuggerUrl?: string }).webSocketDebuggerUrl;
    } catch {
      await Bun.sleep(100);
    }
  }
  if (!target) throw new Error(`${label}: Chrome's debugger did not come up`);
  const socket = new WebSocket(target);
  await new Promise<void>((resolve, reject) => {
    socket.addEventListener("open", () => resolve(), { once: true });
    socket.addEventListener("error", () => reject(new Error(`${label}: debugger socket`)), {
      once: true,
    });
  });
  let next = 0;
  const waiting = new Map<
    number,
    { method: string; resolve: (value: Reply) => void; reject: (e: Error) => void }
  >();
  const handlers: ((message: Reply) => void)[] = [];
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data)) as Reply;
    if (message.id !== undefined) {
      const slot = waiting.get(message.id);
      if (!slot) return;
      waiting.delete(message.id);
      if (message.error)
        slot.reject(new Error(`${label}: ${slot.method}: ${message.error.message}`));
      else slot.resolve(message);
    } else {
      for (const handler of handlers) handler(message);
    }
  });
  return {
    send(method: string, params: unknown = {}, session?: { sessionId: string }) {
      const id = ++next;
      socket.send(JSON.stringify({ id, method, params, ...session }));
      return new Promise<Reply>((resolve, reject) => waiting.set(id, { method, resolve, reject }));
    },
    on(handler: (message: Reply) => void) {
      handlers.push(handler);
    },
    close() {
      socket.close();
    },
  };
}

/** Chrome's path: `NSH_BROWSER`, `CHROME_PATH`, then the usual installs. */
export function findChrome(): string | undefined {
  const named = process.env.NSH_BROWSER ?? process.env.CHROME_PATH;
  if (named) return fs.existsSync(named) ? named : undefined;
  if (process.platform === "darwin") {
    for (const app of [
      "Google Chrome.app/Contents/MacOS/Google Chrome",
      "Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
      "Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
      "Chromium.app/Contents/MacOS/Chromium",
    ]) {
      for (const root of ["/Applications", path.join(process.env.HOME ?? "", "Applications")]) {
        const exe = path.join(root, app);
        if (fs.existsSync(exe)) return exe;
      }
    }
    return undefined;
  }
  if (process.platform === "win32") {
    for (const app of [
      "Google\\Chrome\\Application\\chrome.exe",
      "Microsoft\\Edge\\Application\\msedge.exe",
      "Chromium\\Application\\chrome.exe",
    ]) {
      for (const root of ["ProgramFiles", "ProgramFiles(x86)", "LOCALAPPDATA"]) {
        const exe = path.join(process.env[root] ?? "", app);
        if (fs.existsSync(exe)) return exe;
      }
    }
    return undefined;
  }
  for (const name of ["google-chrome", "google-chrome-stable", "microsoft-edge", "chromium"]) {
    for (const dir of (process.env.PATH ?? "").split(path.delimiter)) {
      const exe = path.join(dir, name);
      if (fs.existsSync(exe)) return exe;
    }
  }
  return undefined;
}

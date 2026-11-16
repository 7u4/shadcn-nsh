/// <reference types="bun" />

/**
 * The docs' page contract, checked:
 *
 * - a page has Installation, Usage, Examples and API, and none of the old
 *   Install / Composition / Differences / Not forwarded sections;
 * - a `demo:` names the page's own demo;
 * - every name a fenced snippet imports from `@/components/ui/<id>` is
 *   exported by that component's file;
 * - every component page has a kind, and the kinds table names nothing that
 *   is neither a page nor a planned one;
 * - the official tables in `src/lib/official.ts` cover every file of
 *   `references/shadcn-ui`'s ui directory and every `references/nsh` element,
 *   name only pages that exist, and say why when they serve nothing;
 * - `components.generated.ts` is what `bun run docs:components` would write.
 *
 * The component set itself (page, demo and reference page exist, no orphans) is
 * `bun run catalog --check`.
 *
 *   bun run check:pages
 */
import fs from "node:fs";
import path from "node:path";

import { catalog } from "../../../scripts/catalog";
import { components } from "../src/lib/components.generated";
import { KIND_OF, KINDS, type ComponentKindId } from "../src/lib/kinds";
import { NSH_ELEMENTS, SHADCN_UI, type OfficialEntry } from "../src/lib/official";
import { componentPlan, isCurrent, readPageMeta } from "./build-components";

const cat = catalog();
const repo = cat.root;

type Fence = { lang: string; body: string; line: number };

const problems: string[] = [];
const fail = (message: string) => problems.push(message);

/** The fences of a Markdown page, with the line their content starts on. */
function fences(source: string): Fence[] {
  const out: Fence[] = [];
  const lines = source.split(/\r?\n/);
  let open: { marker: string; lang: string; body: string[]; line: number } | null = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]!;
    const fence = /^(`{3,}|~{3,})(.*)$/.exec(line);
    if (open) {
      if (fence && fence[1]!.startsWith(open.marker) && fence[2]!.trim() === "") {
        out.push({ lang: open.lang, body: open.body.join("\n"), line: open.line });
        open = null;
      } else {
        open.body.push(line);
      }
      continue;
    }
    if (fence) {
      const info = fence[2]!.trim();
      open = {
        marker: fence[1]!,
        lang: info.split(/\s+/)[0] ?? "",
        body: [],
        line: i + 2,
      };
    }
  }
  return out;
}

/** The `##` headings outside fences, exactly as written. */
function headings(source: string): string[] {
  const out: string[] = [];
  const lines = source.split(/\r?\n/);
  let marker: string | null = null;
  for (const line of lines) {
    const fence = /^(`{3,}|~{3,})/.exec(line);
    if (marker) {
      if (fence && fence[1]!.startsWith(marker)) marker = null;
      continue;
    }
    if (fence) {
      marker = fence[1]!;
      continue;
    }
    const heading = /^##\s+(.+?)\s*$/.exec(line);
    if (heading) out.push(heading[1]!);
  }
  return out;
}

/** Every name `packages/ui` exports from a module: declarations and re-exports. */
function exportsOf(file: string): Set<string> {
  const source = fs.readFileSync(file, "utf8");
  const names = new Set<string>();
  const declaration =
    /^export\s+(?:declare\s+)?(?:async\s+)?(?:function|const|let|var|class|interface|type|enum)\s+([A-Za-z_$][\w$]*)/gm;
  for (const match of source.matchAll(declaration)) names.add(match[1]!);
  const named = /^export\s+(?:type\s+)?\{([\s\S]*?)\}\s*(?:from\s*["'][^"']*["'])?;?\s*$/gm;
  for (const match of source.matchAll(named)) {
    for (const raw of match[1]!.split(",")) {
      const part = raw.trim().replace(/^type\s+/, "");
      const alias = /\bas\s+([A-Za-z_$][\w$]*)$/.exec(part);
      if (alias) {
        names.add(alias[1]!);
      } else if (/^[A-Za-z_$][\w$]*$/.test(part)) {
        names.add(part);
      }
    }
  }
  if (/^export\s+default\b/m.test(source)) names.add("default");
  return names;
}

// Generated list. A page with no kind throws the plan away: `check:pages` reports that below.
try {
  if (!isCurrent(componentPlan(), components)) {
    fail("components.generated.ts is stale; run `bun run docs:components`");
  }
} catch (error) {
  fail((error as Error).message);
}

const byId = new Map(cat.components.map((component) => [component.id, component]));

// Kinds: exactly one per page, and nothing in the table that is neither a page nor planned.
const plannedSlugs = new Set(
  [...SHADCN_UI, ...NSH_ELEMENTS]
    .filter((entry) => entry.status === "planned")
    .flatMap((entry) => entry.ours),
);

for (const component of cat.components) {
  const kind = KIND_OF[component.id];
  if (!kind) {
    fail(`apps/docs/src/pages/docs/components/${component.id}.md: no kind in src/lib/kinds.ts`);
  }
}

for (const [slug, kind] of Object.entries(KIND_OF)) {
  if (!KINDS.includes(kind)) fail(`src/lib/kinds.ts: "${slug}" is "${kind}", which is not a kind`);
  if (byId.has(slug) || plannedSlugs.has(slug)) continue;
  fail(`src/lib/kinds.ts: "${slug}" is not a component page and not a planned one`);
}

// The official tables: every row names pages that exist, and says why when it serves none.
const tables: { label: string; entries: readonly OfficialEntry[] }[] = [
  { label: "src/lib/official.ts SHADCN_UI", entries: SHADCN_UI },
  { label: "src/lib/official.ts NSH_ELEMENTS", entries: NSH_ELEMENTS },
];

for (const { label, entries } of tables) {
  const ids = new Set<string>();
  const servedBy = new Map<string, string>();
  for (const entry of entries) {
    if (ids.has(entry.id)) fail(`${label}: "${entry.id}" is listed twice`);
    ids.add(entry.id);
    for (const slug of entry.ours) {
      const owner = servedBy.get(slug);
      if (owner) fail(`${label}: "${slug}" is served by "${owner}" and by "${entry.id}"`);
      servedBy.set(slug, entry.id);
      if (!KIND_OF[slug]) {
        fail(`${label} "${entry.id}": "${slug}" has no kind in src/lib/kinds.ts`);
      }
      if (!byId.has(slug) && entry.status !== "planned") {
        fail(`${label} "${entry.id}": no docs page "${slug}"`);
      }
    }
    if (entry.ours.some((slug) => byId.has(slug))) continue;
    if (!entry.status) {
      fail(`${label} "${entry.id}": nothing serves it; give it a status and a note`);
    } else if (!entry.note) {
      fail(`${label} "${entry.id}": say why in a note`);
    }
  }
}

// The official sets themselves: a component added upstream with no row here fails.
const references = path.join(repo, "references");
const names = (dir: string, extension: string): string[] | undefined => {
  if (!fs.existsSync(dir)) return undefined;
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(extension) && file !== "index.md")
    .map((file) => file.slice(0, -extension.length))
    .sort();
};

const shadcnDir = path.join(references, "shadcn-ui/apps/v4/registry/new-york-v4/ui");
const shadcnFiles = names(shadcnDir, ".tsx");
if (shadcnFiles) {
  const rows = new Set(SHADCN_UI.map((entry) => entry.id));
  for (const id of shadcnFiles) {
    if (!rows.has(id)) {
      fail(`references/shadcn-ui …/ui/${id}.tsx: no row in SHADCN_UI (src/lib/official.ts)`);
    }
  }
  for (const id of rows) {
    if (!shadcnFiles.includes(id))
      fail(`SHADCN_UI: "${id}" is no file in references/shadcn-ui …/ui`);
  }
}

const nshDir = path.join(references, "nsh/website/elements");
const nshFiles = names(nshDir, ".md");
if (nshFiles) {
  const rows = new Map(NSH_ELEMENTS.map((entry) => [entry.id, entry]));
  for (const id of nshFiles) {
    if (!rows.has(id)) {
      fail(
        `references/nsh/website/elements/${id}.md: no row in NSH_ELEMENTS (src/lib/official.ts)`,
      );
    }
  }
  for (const [id, entry] of rows) {
    if (!nshFiles.includes(id)) {
      fail(`NSH_ELEMENTS: "${id}" is no element in references/nsh/website/elements`);
      continue;
    }
    const source = fs.readFileSync(path.join(nshDir, `${id}.md`), "utf8");
    const group = /^group:\s*(\S+)\s*$/m.exec(source)?.[1];
    if (group && group !== entry.group) {
      fail(`NSH_ELEMENTS: "${id}" is "${group}" in references/nsh, not "${entry.group}"`);
    }
  }
}

let importCount = 0;
const required = ["Installation", "Usage", "Examples", "API"];
const old = new Set(["Install", "Composition", "Differences", "Not forwarded"]);

for (const component of cat.components) {
  const file = component.page;
  const source = fs.readFileSync(file, "utf8");
  const where = path.relative(repo, file);
  const meta = readPageMeta(source);
  const found = headings(source);

  // Astro parses the frontmatter as YAML, and a value it cannot read fails the site's build.
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1];
  try {
    if (frontmatter !== undefined) Bun.YAML.parse(frontmatter);
  } catch (error) {
    fail(
      `${where}: frontmatter is not YAML (${(error as Error).message}); quote a value with ": "`,
    );
  }

  for (const section of required) {
    if (!found.includes(section)) fail(`${where}: missing "## ${section}"`);
  }
  for (const section of found) {
    if (old.has(section)) fail(`${where}: old section "## ${section}"`);
  }

  if (meta.demo && meta.demo !== component.id) {
    fail(`${where}: demo "${meta.demo}" is not "${component.id}"`);
  }

  const modules = new Map<string, Set<string>>();
  for (const fence of fences(source)) {
    if (!["tsx", "ts", "jsx", "js"].includes(fence.lang)) continue;
    const importBlock = /import\s+(?:type\s+)?\{([\s\S]*?)\}\s+from\s+["']([^"']+)["']/g;
    for (const match of fence.body.matchAll(importBlock)) {
      const spec = match[2]!;
      if (!spec.startsWith("@/components/ui/")) continue;
      const id = spec.slice("@/components/ui/".length);
      const owner = byId.get(id);
      if (!owner) {
        fail(`${where}:${fence.line}: no component "${id}" to import from`);
        modules.set(id, new Set());
        continue;
      }
      if (!modules.has(id)) modules.set(id, exportsOf(owner.uiFile));
      const exported = modules.get(id)!;
      const names = match[1]!
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/\/\/.*$/gm, "")
        .split(",")
        .map((raw) => raw.trim().replace(/^type\s+/, ""))
        .filter(Boolean);
      for (const raw of names) {
        const name = /\bas\s+([A-Za-z_$][\w$]*)$/.exec(raw)
          ? raw.split(/\s+as\s+/)[0]!.trim()
          : raw;
        importCount += 1;
        if (!exported.has(name)) {
          fail(`${where}:${fence.line}: ${id} does not export "${name}"`);
        }
      }
    }
  }
}

if (problems.length > 0) {
  for (const problem of problems) console.error(`✗ ${problem}`);
  console.error(`\ncheck:pages: ${problems.length} problem(s)`);
  process.exit(1);
}

const official = [
  shadcnFiles ? `${SHADCN_UI.length} shadcn/ui` : "shadcn/ui (references/ empty)",
  nshFiles ? `${NSH_ELEMENTS.length} NSH` : "NSH (references/ empty)",
];
console.log(
  `check:pages ok — ${cat.components.length} components, ${importCount} imported names; ${official.join(", ")} answered for`,
);

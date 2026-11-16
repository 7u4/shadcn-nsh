// The official code editor scene (`references/nsh/website/demos/el-editor.tsx`) with this
// library's `CodeEditor`: a file per language, a linter's marks, the caret moved, the text
// reported, and an inspector beside it that follows both.
import { mount, signal, Text, View } from "nsh";
import type { EditorDiagnostic } from "nsh/base";

import { CodeEditor } from "@/packages/ui/code-editor";

import { DemoPage } from "./kit";
import { desktop, Log, Panel, Segmented, Split, ui, wide } from "./stage";

const SAMPLES = {
  typescript: `type Shape = { kind: "circle"; r: number } | { kind: "square"; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.r ** 2;
    case "square":
      return shape.side ** 2;
  }
}

const unused = "never read";
console.log(area({ kind: "circle", r: 2 }));
`,
  json: `{
  "name": "my-app",
  "entry": "App.tsx",
  "capabilities": ["network"]
}
`,
  css: `.card {
  display: grid;
  gap: 12px;
  padding: 16px;
  colour: red;
}
`,
} as const;

type Language = keyof typeof SAMPLES;

// What a linter would report: an unused variable in the TypeScript file and a misspelled
// property in the stylesheet.
const PROBLEMS: Record<Language, EditorDiagnostic[]> = {
  typescript: [
    {
      range: { start: { line: 12, column: 6 }, end: { line: 12, column: 12 } },
      severity: "warning",
      message: "'unused' is declared but its value is never read.",
    },
  ],
  json: [],
  css: [
    {
      range: { start: { line: 4, column: 2 }, end: { line: 4, column: 8 } },
      severity: "error",
      message: "Unknown property 'colour'.",
    },
  ],
};

function App() {
  const language = signal<Language>("typescript");
  const sources = signal<Record<Language, string>>({ ...SAMPLES });
  const caret = signal("1:1");
  const events = signal<string[]>([]);
  const log = (line: string) => events.set([line, ...events()].slice(0, 4));

  return (
    <DemoPage title="Code editor">
      <Text style={{ color: ui().muted }}>
        {desktop
          ? "Click into the code and type; switching the language keeps each file's text"
          : "Tap into the code and type; switching the language keeps each file's text"}
      </Text>

      <Split
        grow
        width={640}
        inspector={
          <>
            <Segmented
              label="language"
              options={["typescript", "json", "css"] as const}
              value={language()}
              onChange={(value) => language.set(value)}
            />
            <Panel title="caret">
              <Text style={{ fontSize: 13, fontVariant: ["tabular-nums"], color: ui().text }}>
                {`${caret()} · ${sources()[language()].length} characters`}
              </Text>
            </Panel>
            <Panel title="diagnostics">
              <Text style={{ fontSize: 13, color: ui().text }}>
                {PROBLEMS[language()].length === 0
                  ? "none"
                  : PROBLEMS[language()]
                      .map((problem) => `${problem.severity}: ${problem.message}`)
                      .join("\n")}
              </Text>
            </Panel>
            <Log title="events" lines={events()} minHeight={96} />
          </>
        }
      >
        <View style={{ height: wide() ? 380 : 300, overflow: "hidden" }}>
          {() => {
            const lang = language();
            return (
              <CodeEditor
                value={sources()[lang]}
                onChange={({ value }) => {
                  sources.set({ ...sources(), [lang]: value });
                  log(`onChange: ${value.length} characters`);
                }}
                language={lang}
                diagnostics={PROBLEMS[lang]}
                accessibilityLabel="Code"
                onSelectionChange={({ selections }) => {
                  const head = selections[selections.length - 1].head;
                  caret.set(`${head.line + 1}:${head.column + 1}`);
                }}
                onFocus={() => log("onFocus")}
                onBlur={() => log("onBlur")}
                style={{ flex: 1 }}
              />
            );
          }}
        </View>
      </Split>
    </DemoPage>
  );
}

mount(App);

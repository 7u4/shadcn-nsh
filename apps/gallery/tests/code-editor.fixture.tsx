import { mount, signal, Text, View } from "nsh";

import { CodeEditor } from "../../../packages/ui";

const TYPESCRIPT = `const answer = 42;
`;
const JSON_SOURCE = `{ "answer": 42 }
`;

type Language = "typescript" | "json";

function App() {
  const language = signal<Language>("typescript");
  const typescript = signal(TYPESCRIPT);
  const json = signal(JSON_SOURCE);
  const value = () => (language() === "typescript" ? typescript() : json());
  const focus = signal("none");
  const locked = signal("keep");
  return (
    <View style={{ padding: 12, gap: 8 }}>
      <CodeEditor
        testID="code"
        accessibilityLabel="Code sample"
        value={value()}
        language={language()}
        onChange={({ value: next }) => (language() === "typescript" ? typescript : json).set(next)}
        onFocus={() => focus.set(language())}
        style={{ width: 320, height: 120 }}
      />
      <Text>{`value=${value()}`}</Text>
      <Text>{`typescript=${typescript()}`}</Text>
      <Text>{`json=${json()}`}</Text>
      <Text>{`focus=${focus()}`}</Text>
      <CodeEditor
        testID="locked"
        accessibilityLabel="Locked source"
        readOnly
        value={locked()}
        onChange={({ value: next }) => locked.set(next)}
        style={{ width: 320, height: 64 }}
      />
      <Text>{`locked=${locked()}`}</Text>
      <Text
        accessibilityLabel="Switch language"
        onPress={() => language.set(language() === "typescript" ? "json" : "typescript")}
      >
        Switch language
      </Text>
      <Text accessibilityLabel="Load a file" onPress={() => typescript.set("const answer = 43;\n")}>
        Load a file
      </Text>
    </View>
  );
}

mount(App);

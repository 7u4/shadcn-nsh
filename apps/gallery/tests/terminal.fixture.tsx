import { mount, signal, Text, View } from "nsh";

import { Button, Terminal, type TerminalRef } from "../../../packages/ui";

/**
 * One terminal, a program's writes and a reset from buttons beside it, and what its ref reports:
 * `data` is what `onData` carried, `screen` the text of the lines `term.text()` gave back.
 */
function App() {
  const term = signal<TerminalRef | undefined>(undefined);
  const data = signal("");
  const screen = signal("none");

  const read = async () => {
    const text = await term()?.text();
    if (text === undefined) return;
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    screen.set(lines.length === 0 ? "empty" : lines.join("|"));
  };

  return (
    <View style={{ padding: 12, gap: 8 }}>
      <Terminal
        ref={(r) => term.set(r)}
        accessibilityLabel="Session"
        style={{ width: 320, height: 120 }}
        onData={({ data: chunk }) => data.update((prior) => prior + chunk)}
      />
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button onPress={() => term()?.write("alpha\r\n\x1b[32mgreen\x1b[0m\r\n")}>Write</Button>
        <Button onPress={() => term()?.reset()}>Clear</Button>
        <Button onPress={read}>Read</Button>
      </View>
      <Text>{`data=${data()}`}</Text>
      <Text>{`screen=${screen()}`}</Text>
    </View>
  );
}

mount(App);

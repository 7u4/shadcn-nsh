var e=`// A terminal running a program this page writes itself: a colored welcome and prompt, the keys
// typed back into it, and a few built-in commands. The program is the app's — a real app connects
// the ref's \`write\` and \`onData\` to a pseudo-terminal, a WebSocket or an SSH channel — so nothing
// here touches the network. The inspector reports the size in cells the terminal asks the program
// to keep. The card below is the \`ghost\` variant: the same output with no surface of its own.
import { mount, signal, Text, View } from "nsh";

import { Terminal, type TerminalRef } from "@/packages/ui/terminal";

import { DemoCard, DemoPage } from "./kit";
import { Log, Panel, Split, ui } from "./stage";

const PROMPT = "\\x1b[32mnsh\\x1b[0m:\\x1b[34m~\\x1b[0m$ ";

const HELP = [
  "Commands:",
  "  \\x1b[1mhelp\\x1b[0m    this list",
  "  \\x1b[1mls\\x1b[0m      the files here",
  "  \\x1b[1mecho\\x1b[0m …  prints what follows",
  "  \\x1b[1mclear\\x1b[0m   clears the screen",
].join("\\r\\n");

const LS =
  "\\x1b[1;34mpackages\\x1b[0m  \\x1b[1;34mapps\\x1b[0m  registry.json  README.md  \\x1b[1;32minstall.sh\\x1b[0m";

const WELCOME = \`Welcome to the \\x1b[1mshadcn-nsh\\x1b[0m terminal.\\r\\n\\r\\n\${HELP}\\r\\n\\r\\n\${PROMPT}\`;

/** What the \`ghost\` terminal holds: the sample session, without a box of its own. */
const SAMPLE = \`\\x1b[2m$ whoami\\x1b[0m\\r\\nnsh\\r\\n\${PROMPT}\`;

function App() {
  let term: TerminalRef | undefined;
  let ghost: TerminalRef | undefined;
  let line = "";
  let welcomed = false;
  let ghosted = false;
  const size = signal("— × —");
  const ran = signal<string[]>([]);

  const say = (text: string) => term?.write(text);

  const run = (command: string) => {
    const [name, ...rest] = command.trim().split(/\\s+/);
    switch (name) {
      case "":
        break;
      case "help":
        say(\`\${HELP}\\r\\n\`);
        break;
      case "ls":
        say(\`\${LS}\\r\\n\`);
        break;
      case "echo":
        say(\`\${rest.join(" ")}\\r\\n\`);
        break;
      case "clear":
        // A screen and a scrollback gone, as the program's own \`ESC c\` would leave them.
        term?.reset();
        break;
      default:
        say(\`\\x1b[31m\${name}: command not found\\x1b[0m\\r\\n\`);
    }
    const entry = command.trim();
    if (entry) ran.set([entry, ...ran()].slice(0, 4));
    say(PROMPT);
  };

  const input = ({ data }: { data: string }) => {
    for (const ch of data) {
      if (ch === "\\r") {
        say("\\r\\n");
        const command = line;
        line = "";
        run(command);
      } else if (ch === "\\x7f") {
        if (line.length > 0) {
          line = line.slice(0, -1);
          say("\\b \\b");
        }
      } else if (ch === "\\x03") {
        line = "";
        say(\`^C\\r\\n\${PROMPT}\`);
      } else if (ch >= " ") {
        line += ch;
        say(ch);
      }
    }
  };

  return (
    <DemoPage title="Terminal">
      <Text style={{ color: ui().muted }}>
        {"Type help and press Return. A program of the page's own answers; nothing leaves the app."}
      </Text>

      <Split
        width={420}
        inspector={
          <>
            <Panel title="size in cells">
              <Text style={{ fontSize: 13, color: ui().text }}>{size()}</Text>
            </Panel>
            <Log title="commands" lines={ran()} minHeight={92} />
          </>
        }
      >
        <Terminal
          ref={(r) => (term = r)}
          variant="default"
          style={{ height: 300 }}
          accessibilityLabel="Terminal"
          onResize={({ cols, rows }) => {
            // The welcome waits for the first size, so its lines wrap at the terminal's width.
            size.set(\`\${cols} × \${rows}\`);
            if (welcomed) return;
            welcomed = true;
            say(WELCOME);
          }}
          onData={input}
        />
      </Split>

      <DemoCard>
        <View style={{ gap: 4 }}>
          <Text style={{ fontSize: 13, fontWeight: "600", color: ui().text }}>
            {"ghost, on the card itself"}
          </Text>
          <Text style={{ fontSize: 12, color: ui().muted }}>
            {
              "No fill, no edge, no padding: an app whose window is the terminal gives the surface, and colors as the program asks."
            }
          </Text>
        </View>
        <Terminal
          ref={(r) => (ghost = r)}
          variant="ghost"
          style={{ height: 72 }}
          accessibilityLabel="Sample session"
          onResize={() => {
            if (ghosted) return;
            ghosted = true;
            ghost?.write(SAMPLE);
          }}
        />
      </DemoCard>
    </DemoPage>
  );
}

mount(App);
`;export{e as default};
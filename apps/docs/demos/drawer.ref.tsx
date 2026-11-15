// The reference of `drawer.tsx`: the same page with the parts written out — `sheetPanel` and
// `backdrop` on `nsh/base`'s Sheet, its grabber view, and the look's header, footer, title and text.
// The render check requires the two to draw the same pixels.
import { mount, signal, Text, View } from "nsh";
import { Button, Sheet } from "nsh/base";

import { buttonLabel, buttonLook } from "@/packages/ui/button";
import { dialogText, dialogTitle } from "@/packages/ui/dialog";
import { drawerFooter, drawerGrabber, drawerHeader } from "@/packages/ui/drawer";
import { Input } from "@/packages/ui/input";
import { backdrop } from "@/packages/ui/lib/overlay";
import { sheetPanel } from "@/packages/ui/sheet";

import { DemoPage } from "./kit";
import { desktop, Log, Panel, Split, ui } from "./stage";

/** Where the photo goes: a row per destination, and who it reaches. */
const DESTINATIONS = [
  { name: "Messages", detail: "2 people" },
  { name: "Mail", detail: "your own address" },
];

function App() {
  const which = signal("closed");
  const events = signal<string[]>([]);
  const shareOpen = signal(false);
  const renameOpen = signal(false);
  const log = (line: string) => events.set([line, ...events()].slice(0, 6));
  const changed = (name: string) => (event: { open: boolean; reason: string }) => {
    which.set(event.open ? name : "closed");
    log(`${name} · ${event.open ? "opened" : "closed"} · ${event.reason}`);
  };
  // The app owns the state here, so it reports the press the way a root would.
  const open = (name: string, set: (next: boolean) => void) => () => {
    set(true);
    changed(name)({ open: true, reason: "triggerPress" });
  };
  const close = (name: string, set: (next: boolean) => void) => (line?: string) => () => {
    if (line) log(line);
    set(false);
    changed(name)({ open: false, reason: "closePress" });
  };

  return (
    <DemoPage title="Drawer">
      <Text style={{ color: ui().muted }}>
        {desktop
          ? "Open Share; drag its top edge down past a third of its height, or click the scrim"
          : "Open Share; drag it down past a third of its height, tap the scrim or press back"}
      </Text>

      <Split
        gap={14}
        inspector={
          <>
            <Panel title="open">
              <Text style={{ fontSize: 13, color: ui().text }}>{which()}</Text>
            </Panel>
            <Log
              title="onOpenChange({ open, reason }) · onCancel"
              lines={events()}
              minHeight={130}
            />
          </>
        }
      >
        <View style={{ flexDirection: "row", gap: 8, flexWrap: "wrap" }}>
          <Button onPress={open("Share", (next) => shareOpen.set(next))} {...buttonLook("default")}>
            <Text style={buttonLabel("default")}>Share…</Text>
          </Button>
          <Button onPress={open("Rename", (next) => renameOpen.set(next))} {...buttonLook()}>
            <Text style={buttonLabel()}>Rename…</Text>
          </Button>
        </View>
      </Split>

      <Sheet
        open={shareOpen()}
        closeOnSwipe
        popupStyle={sheetPanel("bottom")}
        backdropStyle={backdrop()}
        onOpenChange={({ open: next, reason }) => {
          shareOpen.set(next);
          changed("Share")({ open: next, reason });
        }}
        onCancel={() => log("Share · onCancel")}
      >
        <View style={drawerGrabber()} />
        <View style={drawerHeader()}>
          <Text style={dialogTitle()}>Share this photo</Text>
          <Text style={dialogText()}>
            Anyone with the link can view it, and the photo leaves the app now.
          </Text>
        </View>
        <View style={{ gap: 8 }}>
          {DESTINATIONS.map((to) => (
            <Button
              onPress={close("Share", (next) => shareOpen.set(next))(`shared · ${to.name}`)}
              {...buttonLook()}
            >
              <Text style={buttonLabel()}>{`${to.name} — ${to.detail}`}</Text>
            </Button>
          ))}
        </View>
        <View style={drawerFooter()}>
          <Button
            onPress={close("Share", (next) => shareOpen.set(next))("copied the link")}
            {...buttonLook("default")}
          >
            <Text style={buttonLabel("default")}>Copy link</Text>
          </Button>
          <Button onPress={close("Share", (next) => shareOpen.set(next))()} {...buttonLook()}>
            <Text style={buttonLabel()}>Cancel</Text>
          </Button>
        </View>
      </Sheet>

      <Sheet
        open={renameOpen()}
        side="right"
        closeOnSwipe
        popupStyle={sheetPanel("right")}
        backdropStyle={backdrop()}
        onOpenChange={({ open: next, reason }) => {
          renameOpen.set(next);
          changed("Rename")({ open: next, reason });
        }}
        onCancel={() => log("Rename · onCancel")}
      >
        <View style={drawerHeader()}>
          <Text style={dialogTitle()}>Rename the photo</Text>
          <Text style={dialogText()}>
            {`A name is what the list shows and what screen readers say.`}
          </Text>
        </View>
        <Input defaultValue="Harbour at dusk" accessibilityLabel="Photo name" />
        <View style={drawerFooter()}>
          <Button
            onPress={close("Rename", (next) => renameOpen.set(next))("renamed")}
            {...buttonLook("default")}
          >
            <Text style={buttonLabel("default")}>Save</Text>
          </Button>
          <Button onPress={close("Rename", (next) => renameOpen.set(next))()} {...buttonLook()}>
            <Text style={buttonLabel()}>Cancel</Text>
          </Button>
        </View>
      </Sheet>
    </DemoPage>
  );
}

mount(App);

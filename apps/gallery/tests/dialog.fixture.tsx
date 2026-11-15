import { mount, signal, Text, View } from "nsh";
import { Button as BaseButton } from "nsh/base";

import {
  Dialog,
  DialogClose,
  DialogContent,
  dialogBare,
  dialogCard,
  DialogTrigger,
} from "../../../packages/ui";

function App() {
  const changes = signal(0);
  const last = signal("–");
  const off = signal(false);
  // The two presentations' looks, as numbers: the card's chrome, and the window a bare dialog takes.
  const card = dialogCard(360);
  const bare = dialogBare();
  return (
    <View>
      <Text>changes {() => changes()}</Text>
      <Text>{`last: ${last()}`}</Text>
      <Text>{`card=${card.margin}|${card.maxWidth}|${card.width}|${card.borderRadius}|${card.padding}|${card.gap}|${card.borderWidth}`}</Text>
      <Text>{`bare=${bare.width}|${bare.height}|${Object.keys(bare).sort().join(",")}`}</Text>
      <BaseButton onPress={() => off.set(true)}>
        <Text>Flip</Text>
      </BaseButton>
      <Dialog
        onOpenChange={({ open, reason }) => {
          changes.set(changes() + 1);
          last.set(`${String(open)}/${reason}`);
        }}
      >
        <DialogTrigger>Open A</DialogTrigger>
        <DialogContent animation="none">
          <Text>Body A</Text>
          <DialogClose>Close A</DialogClose>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger>
          <Text>Open B</Text>
        </DialogTrigger>
        <DialogContent animation="none">
          <Text>Body B</Text>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger disabled={off()}>Open C</DialogTrigger>
        <DialogContent animation="none">
          <Text>Body C</Text>
        </DialogContent>
      </Dialog>
      <Dialog
        onOpenChange={({ open, reason }) => {
          changes.set(changes() + 1);
          last.set(`${String(open)}/${reason}`);
        }}
        onCancel={() => last.set(`${last()} · onCancel`)}
      >
        <DialogTrigger>Open D</DialogTrigger>
        <DialogContent variant="bare" animation="none" backdropTestID="bare-backdrop">
          <Text>Body D</Text>
          <DialogClose>Close D</DialogClose>
        </DialogContent>
      </Dialog>
      {/* A bare dialog whose content keeps the top of the window: the rest of the window is the
          base's own backdrop, so a press there is the base's too. */}
      <Dialog
        onOpenChange={({ open, reason }) => {
          changes.set(changes() + 1);
          last.set(`${String(open)}/${reason}`);
        }}
      >
        <DialogTrigger>Open E</DialogTrigger>
        <DialogContent
          variant="bare"
          animation="none"
          backdropTestID="bare-backdrop"
          style={{ height: 80 }}
        >
          <Text>Body E</Text>
        </DialogContent>
      </Dialog>
    </View>
  );
}

mount(App);

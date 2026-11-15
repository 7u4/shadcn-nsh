import { mount, signal, Text, View, windowSize, type ViewRef, type ViewStyle } from "nsh";
import { Button as BaseButton } from "nsh/base";

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../../../packages/ui";

/**
 * A lightbox, over the card `DialogContent` draws: the card's chrome undone (no surface, edge,
 * corner, padding, gap or shadow), and its place the window's rather than 360 points, or 90 % of
 * the window, in the middle. `maxWidth` takes a length and never `none`, so it is `"100%"`.
 */
const lightbox: ViewStyle = {
  margin: 0,
  width: "100%",
  maxWidth: "100%",
  height: "100%",
  borderRadius: 0,
  borderWidth: 0,
  padding: 0,
  gap: 0,
  backgroundColor: "transparent",
  boxShadow: "none",
};

function App() {
  const changes = signal(0);
  const off = signal(false);
  const lit = signal(false);
  // Where the lightbox's scrim is, once the popup has laid it out: `x,y widthxheight`.
  const drawn = signal("-");
  // eslint-disable-next-line no-unassigned-vars
  let scrim: ViewRef | undefined;
  const measure = async () => {
    const box = await scrim?.measure();
    if (box) {
      const { pagePosition: at, bounds } = box;
      drawn.set(
        `${Math.round(at.x)},${Math.round(at.y)} ${Math.round(bounds.size.width)}x${Math.round(bounds.size.height)}`,
      );
    }
  };
  const size = () => `${Math.round(windowSize().width)}x${Math.round(windowSize().height)}`;
  return (
    <View>
      <Text>changes {() => changes()}</Text>
      <Text>{() => `window=${size()}`}</Text>
      <Text>lightbox {() => drawn()}</Text>
      <BaseButton onPress={() => off.set(true)}>
        <Text>Flip</Text>
      </BaseButton>
      <Dialog onOpenChange={() => changes.set(changes() + 1)}>
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
      {/* The lightbox: its scrim fills the window, so a press anywhere off the picture shuts it. */}
      <Dialog
        open={lit()}
        onOpenChange={({ open }) => {
          lit.set(open);
          void measure();
        }}
      >
        <DialogTrigger>Open D</DialogTrigger>
        <DialogContent animation="none" style={lightbox} accessibilityLabel="A photo">
          <View
            ref={scrim}
            testID="scrim"
            style={{ width: "100%", height: "100%" }}
            onLayout={measure}
            onPress={() => {
              drawn.set("-closed");
              lit.set(false);
            }}
          >
            <View style={{ position: "absolute", top: 12, left: 20, gap: 2 }}>
              <Text>Liftoff</Text>
              <Text>Clear of the tower</Text>
            </View>
            <DialogClose>Close D</DialogClose>
          </View>
        </DialogContent>
      </Dialog>
    </View>
  );
}

mount(App);

// The reference of `dialog.tsx`: the same scene with the dialog's looks (`dialogCard`, `dialogBare`,
// `dialogTitle`, `dialogText`, `backdrop`) spread on `nsh/base`'s Dialog, the way the official
// example (`references/nsh/website/demos/el-dialog.tsx`) writes it. It differs from the component
// page only in the parts it names.
import { alpha, colors } from "@shadcn-nsh/theme";
import { Image, mount, safeArea, signal, Text, token, View, type ViewStyle } from "nsh";
import { Dialog } from "nsh/base";

import { Button } from "@/packages/ui/button";
import { dialogBare, dialogCard, dialogText, dialogTitle } from "@/packages/ui/dialog";
import { backdrop } from "@/packages/ui/lib/overlay";
import { listRow, RowLabel } from "@/packages/ui/lib/surface";
import { Switch } from "@/packages/ui/switch";

import { DemoPage } from "./kit";
import { photoUrl } from "./photos";
import { desktop, Panel, Split, wide } from "./stage";

/** The lightbox's photo, and what its caption says. */
const lightboxPhoto = { photo: "liftoff" as const, name: "Liftoff", detail: "Clear of the tower" };

/** The photo, fetched once at load: a lightbox opened later paints its frame in the frame that
 * places it. A download that fails leaves the image's empty frame, as the photo pages do. */
const warmed = signal(false);
Promise.allSettled([Image.prefetch(photoUrl(lightboxPhoto.photo, "large"))]).then(() =>
  warmed.set(true),
);

/** The page sheet's own panel: a card in the middle with a pointer, a sheet along the bottom edge
 * on a touch screen (the look is a card, so the app gives this one its place). */
const sheetPanel = (): ViewStyle =>
  desktop
    ? { margin: "auto", width: 480, maxWidth: "90%", maxHeight: "90%" }
    : {
        marginTop: "auto",
        marginBottom: 0,
        width: "100%",
        maxWidth: 560,
        maxHeight: "90%",
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        paddingBottom: 24,
      };

/** The row of a card's actions, as `DialogFooter` lays it. */
const footer = {
  flexDirection: "row" as const,
  gap: 8,
  paddingTop: 4,
  justifyContent: desktop ? ("flex-end" as const) : undefined,
};

function App() {
  const card = signal(false);
  const sheet = signal(false);
  const lightbox = signal(false);
  const backdropCloses = signal(true);
  const cancels = signal(0);
  const log = signal("–");
  const hint = desktop
    ? "Close with Escape or a click on the backdrop."
    : "Close with a tap on the backdrop, a swipe down or the back button. On iOS the sheet is a system pageSheet.";
  const state = () =>
    `open: card ${String(card())} · sheet ${String(sheet())} · lightbox ${String(lightbox())} · onCancel ${cancels()}×`;
  // The app's own close: the base reports it as the user's, so the app's line stays.
  const closedByApp = (what: string) => () => {
    log.set(`closed by the app: ${what}`);
  };
  const heard = (open: boolean, reason: string) => {
    if (!open && reason === "closePress") return;
    log.set(`onOpenChange({ open: ${String(open)}, reason: "${reason}" })`);
  };

  return (
    <DemoPage title="Dialog">
      <Text style={{ color: colors.muted }}>{hint}</Text>

      <Split
        gap={14}
        inspector={
          <>
            <Panel title="open · onCancel">
              <Text style={{ fontSize: 13, color: colors.text }}>{state()}</Text>
            </Panel>
            <Panel title="onOpenChange({ open, reason }) · onOpen" grow>
              <Text style={{ fontSize: 13, fontWeight: "600", color: colors.accent }}>{log()}</Text>
            </Panel>
          </>
        }
      >
        <View
          style={{
            flexDirection: wide() ? "row" : "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <Button
            variant="default"
            onPress={() => card.set(true)}
            style={wide() ? undefined : { flex: 1, alignSelf: "stretch" }}
          >
            Open a card
          </Button>
          <Button
            variant="secondary"
            onPress={() => sheet.set(true)}
            style={wide() ? undefined : { flex: 1, alignSelf: "stretch" }}
          >
            Open as a page sheet
          </Button>
          <Button
            variant="default"
            onPress={() => lightbox.set(true)}
            style={wide() ? undefined : { flex: 1, alignSelf: "stretch" }}
          >
            Open as a lightbox
          </Button>
        </View>

        <Switch
          checked={backdropCloses()}
          onChange={({ checked }) => backdropCloses.set(checked)}
          {...listRow({
            style: { alignSelf: wide() ? "center" : undefined },
          })}
        >
          <RowLabel label={`closeOnBackdropPress ${String(backdropCloses())}`} />
        </Switch>

        <Dialog
          open={card()}
          animation="fade"
          closeOnBackdropPress={backdropCloses()}
          backdropStyle={backdrop()}
          style={dialogCard(desktop ? 360 : 320)}
          onOpenChange={({ open, reason }) => {
            card.set(open);
            heard(open, reason);
          }}
          onOpen={() => log.set("onOpen: card")}
          onCancel={() => cancels.update((n) => n + 1)}
        >
          <Text style={dialogTitle()}>Delete this item?</Text>
          <Text style={dialogText()}>
            {backdropCloses()
              ? "A press on the dimmed backdrop closes it."
              : "The backdrop only calls onCancel: close with a button."}
          </Text>
          <View style={footer}>
            <Button
              variant="secondary"
              onPress={() => {
                card.set(false);
                closedByApp("Keep")();
              }}
              style={desktop ? undefined : { flex: 1 }}
            >
              Keep
            </Button>
            <Button
              variant="destructive"
              onPress={() => {
                card.set(false);
                closedByApp("Delete")();
              }}
              style={desktop ? undefined : { flex: 1 }}
            >
              Delete
            </Button>
          </View>
        </Dialog>

        <Dialog
          open={sheet()}
          presentation="pageSheet"
          animation="fade"
          backdropStyle={backdrop()}
          style={{ ...dialogCard(), ...sheetPanel() }}
          onOpenChange={({ open, reason }) => {
            sheet.set(open);
            heard(open, reason);
          }}
          onOpen={() => log.set("onOpen: sheet")}
          onCancel={() => cancels.update((n) => n + 1)}
        >
          <Text style={dialogTitle()}>A sheet</Text>
          <Text style={dialogText()}>
            presentation="pageSheet": a system sheet on iOS that follows the finger when swiped
            down. Elsewhere the dialog is a layer over the window, and this panel is the app's own
            style.
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Button variant="default" onPress={() => sheet.set(false)}>
              Close
            </Button>
          </View>
        </Dialog>

        {/* The window filling one: the look is `dialogBare` alone, and the photo, its caption and
            the close button are the page's own, laid over the popup. */}
        <Dialog
          open={lightbox()}
          animation="fade"
          backdropStyle={backdrop()}
          backdropTestID="lightbox-backdrop"
          accessibilityLabel={lightboxPhoto.name}
          style={dialogBare()}
          onOpenChange={({ open, reason }) => {
            lightbox.set(open);
            heard(open, reason);
          }}
          onOpen={() => log.set("onOpen: lightbox")}
        >
          <Image
            src={warmed() ? photoUrl(lightboxPhoto.photo, "large") : undefined}
            fadeDuration={0}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              objectFit: "cover",
            }}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `linear-gradient(180deg, transparent 55%, ${token("scrim")} 100%)`,
            }}
          />
          <View
            style={{
              position: "absolute",
              top: safeArea().top + 12,
              right: 12,
              flexDirection: "row",
            }}
          >
            <Button variant="secondary" onPress={() => lightbox.set(false)}>
              Close
            </Button>
          </View>
          <View
            style={{
              position: "absolute",
              left: 20,
              right: 20,
              bottom: safeArea().bottom + 20,
              gap: 2,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700", color: colors.knob }}>
              {lightboxPhoto.name}
            </Text>
            <Text style={{ fontSize: 13, color: alpha(colors.knob, 0.82) }}>
              {lightboxPhoto.detail}
            </Text>
          </View>
        </Dialog>
      </Split>
    </DemoPage>
  );
}

mount(App);

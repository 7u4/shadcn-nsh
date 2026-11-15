// The official dialog scene (`references/nsh/website/demos/el-dialog.tsx`) with this library's
// parts: a card opened from a button, a page sheet opened from another and a lightbox
// (`variant="bare"`) opened from a third, a switch for whether the backdrop closes the card, and
// an inspector holding both open flags, the cancel count and the last lifecycle line.
//
// The lightbox's photo is the gallery's URL (`photos.ts`); the page fetches it at load, so a press
// on its trigger draws the frame at once.
import { alpha } from "@shadcn-nsh/theme";
import { Image, mount, safeArea, signal, Text, token, View, type ViewStyle } from "nsh";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/packages/ui/dialog";
import { listRow, RowLabel } from "@/packages/ui/lib/surface";
import { Switch } from "@/packages/ui/switch";

import { DemoPage } from "./kit";
import { photoUrl } from "./photos";
import { desktop, Panel, Split, ui, wide } from "./stage";

/** The lightbox's photo, and what its caption says. */
const lightboxPhoto = { photo: "liftoff" as const, name: "Liftoff", detail: "Clear of the tower" };

/** The photo, fetched once at load: a lightbox opened later paints its frame in the frame that
 * places it. A download that fails leaves the image's empty frame, as the photo pages do. */
const warmed = signal(false);
Promise.allSettled([Image.prefetch(photoUrl(lightboxPhoto.photo, "large"))]).then(() =>
  warmed.set(true),
);

/** The page sheet's own panel: a card in the middle with a pointer, a sheet along the bottom edge
 * on a touch screen (the dialog's look is a card, so the app gives this one its place). */
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
  const closedByApp = (what: string) => () => log.set(`closed by the app: ${what}`);
  const heard = (open: boolean, reason: string) => {
    if (!open && reason === "closePress") return;
    log.set(`onOpenChange({ open: ${String(open)}, reason: "${reason}" })`);
  };

  return (
    <DemoPage title="Dialog">
      <Text style={{ color: ui().muted }}>{hint}</Text>

      <Split
        gap={14}
        inspector={
          <>
            <Panel title="open · onCancel">
              <Text style={{ fontSize: 13, color: ui().text }}>{state()}</Text>
            </Panel>
            <Panel title="onOpenChange({ open, reason }) · onOpen" grow>
              <Text style={{ fontSize: 13, fontWeight: "600", color: ui().accent }}>{log()}</Text>
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
          <Dialog
            open={card()}
            onOpenChange={({ open, reason }) => {
              card.set(open);
              heard(open, reason);
            }}
            onOpen={() => log.set("onOpen: card")}
            onCancel={() => cancels.update((n) => n + 1)}
          >
            <DialogTrigger
              variant="default"
              style={wide() ? undefined : { flex: 1, alignSelf: "stretch" }}
            >
              Open a card
            </DialogTrigger>
            <DialogContent width={desktop ? 360 : 320} closeOnBackdropPress={backdropCloses()}>
              <DialogTitle>Delete this item?</DialogTitle>
              <DialogDescription>
                {backdropCloses()
                  ? "A press on the dimmed backdrop closes it."
                  : "The backdrop only calls onCancel: close with a button."}
              </DialogDescription>
              <DialogFooter>
                <DialogClose
                  onPress={closedByApp("Keep")}
                  style={desktop ? undefined : { flex: 1 }}
                >
                  Keep
                </DialogClose>
                <DialogClose
                  variant="destructive"
                  onPress={closedByApp("Delete")}
                  style={desktop ? undefined : { flex: 1 }}
                >
                  Delete
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog
            open={sheet()}
            onOpenChange={({ open, reason }) => {
              sheet.set(open);
              heard(open, reason);
            }}
            onOpen={() => log.set("onOpen: sheet")}
            onCancel={() => cancels.update((n) => n + 1)}
          >
            <DialogTrigger style={wide() ? undefined : { flex: 1, alignSelf: "stretch" }}>
              Open as a page sheet
            </DialogTrigger>
            <DialogContent presentation="pageSheet" style={sheetPanel()}>
              <DialogTitle>A sheet</DialogTitle>
              <DialogDescription>
                presentation="pageSheet": a system sheet on iOS that follows the finger when swiped
                down. Elsewhere the dialog is a layer over the window, and this panel is the app's
                own style.
              </DialogDescription>
              <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <DialogClose variant="default">Close</DialogClose>
              </View>
            </DialogContent>
          </Dialog>

          {/* The window filling one: no card, so the photo, its caption and the close button are
              the app's own, laid over the whole popup. */}
          <Dialog
            open={lightbox()}
            onOpenChange={({ open, reason }) => {
              lightbox.set(open);
              heard(open, reason);
            }}
            onOpen={() => log.set("onOpen: lightbox")}
            onCancel={() => cancels.update((n) => n + 1)}
          >
            <DialogTrigger style={wide() ? undefined : { flex: 1, alignSelf: "stretch" }}>
              Open as a lightbox
            </DialogTrigger>
            <DialogContent
              variant="bare"
              backdropTestID="lightbox-backdrop"
              accessibilityLabel={lightboxPhoto.name}
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
                  // The theme's scrim at the foot, so the caption reads on the photo.
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
                <DialogClose variant="secondary">Close</DialogClose>
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
                <Text style={{ fontSize: 20, fontWeight: "700", color: ui().caption }}>
                  {lightboxPhoto.name}
                </Text>
                <Text style={{ fontSize: 13, color: alpha(ui().caption, 0.82) }}>
                  {lightboxPhoto.detail}
                </Text>
              </View>
            </DialogContent>
          </Dialog>
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
      </Split>
    </DemoPage>
  );
}

mount(App);

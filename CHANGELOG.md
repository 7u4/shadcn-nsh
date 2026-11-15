# Changelog

## Unreleased

What the shadcn theme still had to work around, worked around in the library instead, so a theme
says what it draws and nothing more.

- **A press sinks as far as the theme says.** `finishes.json` gains a top-level `press.scale`
  (`0.97` here; `1` draws no press at all). `pressSink` reads it when a control is pressed, so
  `selectTheme` turns every sink off and back on — a flat theme's buttons now change color on
  press and nothing else.
- **A fill can be one color.** `finish.fill` is readable as `backgroundColor` as well as
  `backgroundImage`; `slider` and `progress` draw the theme's gradient where it gives one and its
  color alone where it does not. `themes/shadcn/finishes.json`'s runs and bars are a single color
  now, not a two-stop gradient of it.
- **A rail's edge no longer depends on the theme's shade.** `insetEdge()` joins a rail's 1-point
  line to its `boxShadow`, skipping either where the theme gives none; shadcn's `track` says
  `boxShadow: none` instead of `inset 0 0 0 1px transparent`.
- **Corners come from the theme.** A dialog takes the new `radius-popover` token (16 here, 14 in
  shadcn); the toolbar, badge, plot tooltip, popup surface, toast's close button, a tab's count and
  a combobox's toggle take `radius.inset` / `radius.card` / `radius.control`. The build-time theme
  draws the same pixels as before.
- **This library's own theme installs as one more theme.** `add theme-default` writes
  `themes/default/{theme.json,finishes.json,index.ts}`, the `AppTheme` exported as `defaultTheme`:
  an app built with `init --theme shadcn` lists both and switches between them. The `theme` item
  (the build-time theme) and `init --theme default` are unchanged, and no old id is aliased.
- `bun run port:render:theme` is the shadcn theme's render check: every demo and its reference
  page drawn with `selectTheme(shadcn)`, compared pair by pair, 112 of 112 identical, and not part
  of the committed baseline. `port:sheet` shows the pictures as two more columns.
- `scripts/theme/generate-shadcn.ts` may leave a finish role's keys out (the default file's order
  first), which is how this theme's `fill` is one color and its `track` has no shade.

## 0.5.0 — themes at run time

An app can carry more than one theme and switch between them while it runs, without a relaunch;
the appearance (light / dark / system) stays the app's own and applies to whichever theme is in use.

- `@shadcn-nsh/theme` exports `AppTheme` (`{ id, label, theme, finishes }`), `selectTheme(theme)`
  and `currentTheme()`. `selectTheme` sets the tokens first (`nsh`'s `setTheme`), then the finishes,
  which are now read through a signal instead of the module's import, so every component on screen
  redraws with both on the next frame. `selectTheme(null)` goes back to the build-time theme; a
  theme `setTheme` refuses throws `TypeError` and leaves the app as it was. `packages/theme/README.md`
  has the list-and-persist example.
- `theme-shadcn` now installs **one more theme**: `themes/shadcn/{theme.json,finishes.json,index.ts}`,
  the last exporting the `AppTheme` the app lists. It no longer replaces the build-time `theme.json`
  and `lib/finishes.json`. `init --theme shadcn` still makes shadcn the build-time theme (and writes
  `themes/shadcn/` beside it).

**To migrate**: an app that switched themes with `add theme-shadcn` now gets a second theme instead.
To make one the theme the app is built with, re-run `init --theme shadcn --overwrite` (the same
semantics as 0.4.0, colours the app changed included); to keep switching at run time, list
`themes/shadcn/index.ts` and call `selectTheme`, as `packages/theme/README.md` shows. Nothing needs
deleting: an app installed before this release keeps its files as they are, and gains
`themes/shadcn/` the next time it takes the item.

## 0.4.1

Fixed:

- `InputGroupInput` and `InputGroupTextarea` take a `ref`, the control's `InputRef`, as shadcn's
  forward theirs: `ref.focus()` puts the keys in the control from code (MyAid #14). The group still
  holds the control too, for an addon's press.

## 0.4.0 — seven components shadcn has, input groups, base types

Seven components, each the library's own: none comes from upstream's gallery, so none carries a
port region, and each is one file the registry copies into the app.

| Item           | What it is                                                                                                       |
| -------------- | ---------------------------------------------------------------------------------------------------------------- |
| `separator`    | A hairline across the content or down a row, hidden from a reader unless `decorative={false}`.                   |
| `skeleton`     | The shape of content that is still coming: an `accent` block that breathes.                                      |
| `kbd`          | A key of a shortcut (`Kbd`, one cap; `KbdGroup`, a row of them).                                                 |
| `label`        | The visible name of a control — text, not its accessible name.                                                   |
| `alert`        | A notice of the page or form (`Alert`, `AlertTitle`, `AlertDescription`), in `default` or `destructive`.         |
| `empty`        | A centered empty state (`Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`). |
| `button-group` | Buttons joined into one control (`ButtonGroup`, `ButtonGroupText`, `ButtonGroupSeparator`).                      |

For them the scaffolding grew a flag, `bun run port:new <id> --view`, which starts a component from
nsh's own `View` and `Text` instead of from a `nsh/base` symbol.

Two names moved to make room for shadcn's:

- the registry's `label` library item is now `label-of` (its file stays `lib/label.ts`), so `label`
  is the name of the component, as in shadcn; `add label` copies the component, not the rule. **To
  migrate**: nothing to delete. The components that use the rule depend on `label-of`, so
  `add <id> --overwrite` writes the same `lib/label.ts` again; `add label` now adds `label.tsx`
  beside it. There is no `label` alias for the old item;
- `packages/ui/index.ts` names `command`'s exports one by one, since the palette's own keycap is also
  called `Kbd`: the package's `Kbd` is the component's, and the palette's stays inside the module.

Where nsh has no selector to copy shadcn's CSS, the deviation is in the component's page: `alert`
keeps the icon's column when there is no icon (`has-[>svg]`), `button-group` joins its buttons with a
style each one wears (a child selector), and `label` takes `disabled` itself (a `peer-disabled`).
Also new:

- `InputGroup` (`input-group`), a field's frame around a control and what sits beside it, after
  shadcn's InputGroup: `InputGroup`, `InputGroupInput`, `InputGroupTextarea`, `InputGroupAddon`
  (`align`: `inline-start` / `inline-end` / `block-start` / `block-end`), `InputGroupText`, and
  `InputGroupButton` (`size`: `xs` / `sm` / `icon-xs` / `icon-sm`, taken from this library's scale;
  `variant` is a button's, `ghost` unless set). The group draws the field — its fill, its edge, the
  focus edge and ring while a control in it has the keys, the danger tone while `invalid`, flat on
  the quieter edge and dimmed while `disabled` — and the control in it draws none of that, so a
  group has one frame. The radius you write on it (`style={{ borderRadius: 22 }}`) is the radius its
  focus ring follows, which a `variant="ghost"` `Input` in a `View` of your own cannot do: the ghost
  input keeps its own focus edge and ring, and a group is what replaces it.
- The `input` page says as much under its ghost variant and points at `InputGroup`; both pages are
  in the docs with the examples above.
- The `switch` page writes a settings row both ways — the switch as the whole row (`listRow`), and
  shadcn's `Field` in a row with the switch at the end — and says what each is read as; its demo
  shows a list of them and the same row in a right-to-left app. The `pressable` page says where a
  region's role and its state come from (`role`, not React Native's `accessibilityRole`; a region
  is not an on / off control — that is `Switch`). No component code changed.

Base types, from each component's own file:

- Every type the shells' props, refs and callbacks name comes from `nsh/base`, and each component
  file now re-exports the ones it uses — `dialog` alone keeps its own to `nsh/base` — so a call site
  imports them from its own copy: `command` exports `CommandItem`, `CommandEntry`, `CommandGroup`
  and `CommandRef`, `text-view` exports
  `TextViewImage`, `TextViewClasses` and `TextViewRef`, `dock-area` exports `DockAreaRef`,
  `DockAreaLayout`, `DockRegion`, `DockNode`, `DockPlacement`, `DockPanel`, `DockPanelOptions`,
  `DockTarget`, `DockDropIndicator` and `DockInfo` (a tab is `DockTabValue`, since `DockTab` is the
  component), and the rest of the library the same (`CalendarEntry`, `DataTableClasses`,
  `DiffViewStyles`, `EmojiEntry` and its neighbours, `PaginationItemState`, `ScrollbarTheme`,
  `TreeEntry`, `AlertDialogRole`, `ColorChannel` / `ColorFormat` / `ColorSpace`). Where `nsh/base`'s
  name is taken here, the export is prefixed by the component: `MenuOpenChangeReason`,
  `SheetOpenChangeReason`, `PopoverOpenChangeReason`, `HoverCardOpenChangeReason`,
  `ContextMenuOpenChangeReason`, `ComboboxOpenChangeReason`, `TooltipOpenChangeReason`,
  `DatePickerOpenChangeReason`, `AlertDialogChangeReason`, `ComboboxSelectItem`, `DatePickerEntry`.

Fixed:

- Text is upper- and lower-cased for its locale (`toLocaleUpperCase` / `toLocaleLowerCase`) rather
  than the language-neutral way, so a heading keeps its letters where they have a locale of their
  own (a command palette's headings, a popup's placement words, an emoji section's name, a color
  picker's labels read aloud).
- **`SelectTrigger`'s `style` now places the trigger where the app puts it.** The properties that lay
  a view out — `flex`, `flexGrow`, `flexShrink`, `flexBasis`, `width`, `minWidth`, `maxWidth`,
  `alignSelf` and the margins — go on the view around the trigger, so a trigger grows and shrinks
  like a view of the app's own: in a row, `style={{ flex: 1 }}` takes the room left, and
  `minWidth: 0` lets a narrow row squeeze it under the least the look asks for (180 points with a
  pointer), its title ending in an ellipsis instead of overflowing. The rest of the style (the fill,
  the edge, the padding) stays on the trigger as before, and a trigger with no `style` draws exactly
  what it always did. The field scene drops the view it wrapped around each select.
- **`Item variant="muted"` sits on a muted fill.** It was the inset surface, which in a dark
  appearance is all but the card's colour; it is now `colors.mutedFill`, the theme's `muted` token
  (shadcn's `bg-muted`), which reads on a card and on the page in either appearance and stays
  lighter than an edge. `colors` gains that one role; no theme data changed, since both themes
  already declare `muted`. `default` and `outline` draw what they always did.

## 0.3.0 — the unified API

`variant`, `size` and `tone` are now written the way shadcn writes them, and `kind` is gone. **This
is a breaking change**: the old values are out of the unions they were in, so `nsh check` points at
every call site. There are no aliases — a migration is a type error, not a warning.

| Old                                                | New                                                       |
| -------------------------------------------------- | --------------------------------------------------------- |
| `variant="primary"`, `variant="accent"`            | `variant="default"` (or omit it)                          |
| `variant="danger"`                                 | `variant="destructive"`                                   |
| `size="small"` / `"regular"` / `"large"`           | `size="sm"` / `"default"` / `"lg"`                        |
| `<Toggle variant="ghost" />`                       | `<Toggle />` (`default` is the transparent one)           |
| `<SelectTrigger kind="outline" />`                 | `<SelectTrigger variant="outline" />`                     |
| `<IconButton tone="danger" />`                     | `<IconButton variant="destructive" />`                    |
| `<IconButton on={x} />`                            | `<IconButton selected={x} />`                             |
| `<RoundButton size={24} />`                        | `<RoundButton size="sm" />`, or `side={24}` for 24 points |
| `<Badge outline />`                                | `<Badge variant="outline" />`                             |
| `<Badge label="12" />`                             | `<Badge>12</Badge>`                                       |
| `<Pagination outlined />`                          | `<Pagination variant="outline" />`                        |
| `<MenuItem danger />` `<ContextMenuItem danger />` | `variant="destructive"`                                   |
| `<Checkbox scale={0.8} />`                         | `<Checkbox size="sm" />`                                  |
| `<Radio variant="ring" />`                         | `<Radio />` (`default` is the ring)                       |
| `<Switch size="small" />`                          | `<Switch size="sm" />`                                    |
| `<SegmentedList size="regular" />`                 | `<SegmentedList size="default" />`                        |
| `<IconButton>` / `<RoundButton>` with no name      | pass `accessibilityLabel`, now required on both           |
| `<Icon name="chevron" />`                          | `<Icon icon={ChevronRight} />`, an import from `lucide`   |

Icons come from [`lucide`](https://lucide.dev): a component imports the icon it draws
(`import { ChevronDown } from "lucide"`) and hands it over as `icon={ChevronDown}`, so the app bundles
only the icons it uses. `IconName` and the glyphs in `lib/icons.tsx` are gone; a public prop that took
`IconName` takes lucide's `IconNode` (`tabs`, `tree`, `select`, `command`, `diff-view`,
`emojiGroups`). `shadcn-nsh init` and `add` install the packages an item declares, `lucide` among them, with the
package manager the nearest lock file names (a workspace member's is its workspace's).

The looks follow their components: `menuItemLabel`, `menuItemNote` and `menuItemGlyph` take
`{ variant: "default" | "destructive" }`, `paginationItemClass` takes `{ variant: "default" |
"outline" }`, and `segmentedLook` / `switchLook` take `sm` / `default`.

New, and only added:

- Three composite components with every part shadcn has: `card` (`Card`, `CardHeader`, `CardTitle`,
  `CardDescription`, `CardAction`, `CardContent`, `CardFooter`), `field` (`FieldSet`, `FieldLegend`,
  `FieldGroup`, `Field`, `FieldContent`, `FieldLabel`, `FieldTitle`, `FieldDescription`,
  `FieldSeparator`, `FieldError`; `orientation` vertical / horizontal / responsive) and `item`
  (`ItemGroup`, `ItemSeparator`, `Item`, `ItemMedia`, `ItemContent`, `ItemTitle`, `ItemDescription`,
  `ItemActions`, `ItemHeader`, `ItemFooter`; `variant` default / outline / muted, `size` default / sm).
- `Radio` takes `size` (`sm` / `default` / `lg`) as `Checkbox` does, from one table of scales: 0.8,
  1, 1.25 (`ChoiceSize`).
- `IconButton` and `RoundButton` take `size` (`sm` / `default` / `lg`); its default is the size they
  already had, so nothing moves on its own. `RoundButton`'s `side` still sets an exact diameter.
- Every `tone` prop is one type, `Tone | (() => Tone)`: a value, or a function read where the control
  draws (`Badge`, `Meter`, `Stat`, `Status`, `Progress`, `DiffHunkActions`).
- `Button`, `Link`, `Toggle`, `Checkbox`, `Radio`, `MenuItem` and `SplitButtonSegment` take the text of a string child as the control's name for screen readers, unless `accessibilityLabel` says otherwise; children drawn as given derive nothing.
- `Input` takes `variant`: `default` is the sunk field it always was, `ghost` is the same text
  and placeholder with no fill and no edge at rest, keeping the focus ring, the invalid edge and
  the disabled look. `inputLook` takes the same option (`InputVariant`).
- `Pressable` (`pressable`), a region that takes presses and adds only their feedback: the
  lightest hover fill, the press's sink, the keyboard's ring. No fill, padding, height or radius
  of its own, so a whole row, a picture or a paragraph can be the target; `pressableLook` is the
  look on its own, and a string child names the region as a button's does.
- Each control exports its own axis union (`ButtonVariant`, `BadgeVariant`, `ChoiceSize`, …), and a
  test holds them all to the vocabulary.
- `shadcn-nsh init --theme shadcn` installs shadcn's neutral palette and its flat finishes, the
  registry item `theme-shadcn`. `nsh-ui.json` records which theme an app has (`"theme"`; a file
  without it is on the default one) and `add` resolves a component's `theme` dependency to it, so
  `--overwrite` never writes the default theme back. No component API changes.

Behaviour, appearance and the `nsh/base` props underneath are unchanged: every component still draws
the same pixels as its look spread on the base control, which the render check compares.

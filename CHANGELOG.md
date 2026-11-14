# Changelog

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
- Each control exports its own axis union (`ButtonVariant`, `BadgeVariant`, `ChoiceSize`, …), and a
  test holds them all to the vocabulary.
- `shadcn-nsh init --theme shadcn` installs shadcn's neutral palette and its flat finishes, the
  registry item `theme-shadcn`. `nsh-ui.json` records which theme an app has (`"theme"`; a file
  without it is on the default one) and `add` resolves a component's `theme` dependency to it, so
  `--overwrite` never writes the default theme back. No component API changes.

Behaviour, appearance and the `nsh/base` props underneath are unchanged: every component still draws
the same pixels as its look spread on the base control, which the render check compares.

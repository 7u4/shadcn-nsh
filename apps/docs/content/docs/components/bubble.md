---
title: Bubble
description: "The framed surface of one turn of a conversation, and the reactions that hang off it."
component: true
demo: bubble
---

## Installation

```npm
npx shadcn-nsh@latest add bubble
```

## Usage

```tsx
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble";
```

```tsx
<Bubble variant="muted">
  <BubbleContent>I checked the registry output and removed the stale route.</BubbleContent>
  <BubbleReactions accessibilityLabel="Reaction: thumbs up">👍</BubbleReactions>
</Bubble>
```

## Examples

### Fills

`variant` changes the frame. `default` is the accent's fill and ink — what you send; `secondary`
the raised neutral; `muted` a quieter fill; `tinted` the accent as a soft wash; `outline` a
hairline around the page's fill; `ghost` no frame at all, for assistant text that takes the whole
width; `destructive` for a turn that failed. Every fill keeps a 1-point edge, transparent where it
has no color, so the box is the same size.

```tsx
<Bubble variant="tinted" align="end">
  <BubbleContent>Tinted: the accent as a soft wash.</BubbleContent>
</Bubble>
```

### Alignment

`align="end"` puts the bubble on the side of what you sent; `align="start"` (the default) on the
side of what came in. A bubble is as wide as what it holds, up to 80% of its column; a `ghost` one
uses the whole width.

```tsx
<Bubble align="end">
  <BubbleContent>Sure. Hit me with your best demo.</BubbleContent>
</Bubble>
```

### Group

`BubbleGroup` stacks consecutive bubbles from one sender 8 points apart. Each `Bubble` keeps its
own `align`.

```tsx
<BubbleGroup>
  <Bubble variant="muted">
    <BubbleContent>Hey! Want to see chat bubbles?</BubbleContent>
  </Bubble>
  <Bubble variant="muted">
    <BubbleContent>I can group messages too.</BubbleContent>
  </Bubble>
</BubbleGroup>
```

### Reactions

`BubbleReactions` is a pill in the muted fill that hangs three quarters of its height off the
bubble's `side` edge (`bottom` by default, or `top`), 12 points in from its `align` end. It
overlaps the bubble, so leave room between rows. Name the row for screen readers: NSH reads each
glyph without context otherwise.

```tsx
<Bubble variant="muted" align="end">
  <BubbleContent>I don't need tests, I know my code works.</BubbleContent>
  <BubbleReactions
    side="top"
    align="start"
    role="image"
    accessibilityLabel="Reactions: thumbs up, surprised"
  >
    👍 😮
  </BubbleReactions>
</Bubble>
```

### A turn that acts

Give `BubbleContent` `onPress` for a quick reply or a suggestion: the pointer over it is a hand.
The frame itself takes the press.

```tsx
<Bubble variant="muted" align="end">
  <BubbleContent onPress={() => reply("I forgot my password")}>I forgot my password</BubbleContent>
</Bubble>
```

## Differences from shadcn/ui

- **`asChild` on `BubbleContent`.** shadcn renders the content as a link or a button; NSH has no
  `Slot`, so a frame that acts takes `onPress` on itself.
- **The hover fill of an interactive content**, picked by the bubble's variant (`hover:bg-primary/80`
  and its siblings). A pressable frame keeps its fill under the pointer; the hand is the cue.
- **`has-[button]:p-0` on the reaction row.** NSH has no `:has()`; a row that holds a button keeps
  the pill's padding.

## API

Every prop of [`nsh` View](https://nsh.dev/elements/view) passes through on `BubbleGroup`,
`Bubble` and `BubbleContent`; `BubbleContent` draws a string child as
[`nsh` Text](https://nsh.dev/elements/text). Style props go over the look's.

| Part              | Props              | Description                                                                                  |
| ----------------- | ------------------ | -------------------------------------------------------------------------------------------- |
| `BubbleGroup`     | —                  | Consecutive bubbles from one sender, 8 points apart: `bubbleLook().group`.                   |
| `Bubble`          | `variant`, `align` | One turn's frame, as wide as what it holds up to 80% of its column: `.root(variant, align)`. |
| `BubbleContent`   | `children`         | The words, a string drawn as `Text`: `bubbleLook().content(variant)`.                        |
| `BubbleReactions` | `side`, `align`    | The pill hung three quarters of its height off the bubble's edge: `.reactions(side, align)`. |

| Prop       | On                | Type                                                                                       | Default   |
| ---------- | ----------------- | ------------------------------------------------------------------------------------------ | --------- |
| `variant`  | `Bubble`          | `"default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` | `default` |
| `align`    | `Bubble`          | `"start" \| "end"`                                                                         | `start`   |
| `side`     | `BubbleReactions` | `"top" \| "bottom"`                                                                        | `bottom`  |
| `align`    | `BubbleReactions` | `"start" \| "end"`                                                                         | `end`     |
| `children` | `BubbleContent`   | `string \| JSX.Element`                                                                    |           |

The frame is `radius.card` (12 points) with 12 points of room either side and 8 above and below;
the turn's type is the body's size (13 points with a pointer, 15 on a touch screen) with a step of
leading, in the ink the fill carries — `primary-foreground` on `default`, the page's text color on
the neutral fills, `destructive` on `destructive`. Reactions are 6 points either side, 3 above and
below, 4 apart, ringed 3 points in the card's color. `bubbleLook()` is exported for a frame an app
draws itself.

---
title: TextView
description: Brand-colored links and a pulsing streaming caret.
component: true
demo: text-view
---

## Installation

```sh
npx shadcn-nsh@latest add text-view
```

## Usage

```tsx
import { TextView, textViewCaretClass, textViewLinkClasses } from "@/components/ui/text-view";
```

```tsx
<TextView markdown={doc} />

<TextView
  markdown={streamingDoc}
  streamingCaret={<View class={textViewCaretClass} />}
/>
```

`TextView` merges `textViewLinkClasses` into `classes` by default.

## Examples

### Markdown

```tsx
<TextView markdown={"See the [guide](https://example.com).\n\n> A short note."} />
```

### Streaming

`streamingCaret` marks the end of text still arriving; `textViewCaretClass` is the caret's look.

```tsx
<TextView markdown={streamingDoc} streamingCaret={<View class={textViewCaretClass} />} />
```

## API

`TextView.parse`, `parseHtml`, and `plainText` are re-exported from base. Every prop of [`nsh/base` TextView](https://nsh.dev/elements/text-view) passes through.

| Part                                       | Props                                     | Description                                                                     |
| ------------------------------------------ | ----------------------------------------- | ------------------------------------------------------------------------------- |
| `TextView`                                 | every `nsh/base` TextView prop; `classes` | A Markdown, HTML or block document; `classes` merges over `textViewLinkClasses` |
| `TextView.parse`, `parseHtml`, `plainText` | base's parsers                            | A document, parsed ahead of drawing                                             |
| `textViewLinkClasses`                      | `{ link }`                                | The link classes the view merges in: the brand color over a faint underline     |
| `textViewCaretClass`                       | —                                         | The streaming caret: a brand block a line high, pulsing                         |

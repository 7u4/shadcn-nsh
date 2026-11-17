---
title: Editor
description: Rich document typography for nsh/base's RichEditor.
component: true
demo: editor
---

## Installation

```sh
npx shadcn-nsh@latest add editor
```

## Usage

```tsx
import { createRichEditor, StarterKit } from "nsh/base";

import { RichEditor, richEditorClasses } from "@/components/ui/editor";
```

```tsx
const session = createRichEditor({ extensions: [StarterKit], content: doc, format: "markdown" });

<RichEditor editor={session} style={{ height: 240 }} />;
```

`RichEditor` defaults `classes` to `richEditorClasses`. Every prop of [`nsh/base` RichEditor](https://nsh.dev/elements/rich-editor) passes through; `classes` goes over the default.

## Examples

### Rich document

`RichEditor` wears `richEditorClasses`; the session comes from `createRichEditor`.

```tsx
const session = createRichEditor({ extensions: [StarterKit], content: doc, format: "markdown" });

<RichEditor editor={session} accessibilityLabel="Notes" style={{ height: 180 }} />;
```

## API

| Export              | Role                                      |
| ------------------- | ----------------------------------------- |
| `richEditorClasses` | `RichEditor` document chrome              |
| `RichEditor`        | Themed `nsh/base` RichEditor              |
| `RichEditorProps`   | `nsh/base`'s `RichEditorProps`, unchanged |

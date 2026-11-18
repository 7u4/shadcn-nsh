---
title: Tree
description: A virtualized tree with chevrons and folder icons.
component: true
demo: tree
---

## Installation

```npm
npx shadcn-nsh@latest add tree
```

## Usage

```tsx
import { Tree } from "@/components/ui/tree";
```

```tsx
<Tree items={items} defaultExpanded={["src"]} />
```

## Examples

### Folders

`items` nest; a folder opens with a press or its chevron.

```tsx
const items: TreeItem[] = [
  {
    id: "src",
    label: "src",
    children: [
      { id: "app", label: "App.tsx" },
      { id: "kit", label: "kit.tsx" },
    ],
  },
  { id: "readme", label: "README.md" },
];

<Tree items={items} style={{ width: 280, maxHeight: 220 }} />;
```

### Expanded

`defaultExpanded` opens folders at first.

```tsx
<Tree items={items} defaultExpanded={["src"]} />
```

## API

Uses `treeItemClass` and `TreeRow` by default. Every prop of [`nsh/base` Tree](https://nsh.dev/elements/tree) passes through.

| Part            | Props                                                                                | Description                                                     |
| --------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| `Tree`          | `items`, `defaultExpanded`, `renderItem`, `onSelect`, and every `nsh/base` Tree prop | The virtualized list of rows, in a card, `TreeRow` by default   |
| `TreeRow`       | `entry`, `icon`, `tint`, `detail`                                                    | A row: its chevron, its icon, its label and a detail at the end |
| `treeItemClass` | —                                                                                    | The row's look, for a row you draw yourself                     |

---
title: Collapsible
description: A disclosure row that reveals a panel beneath it.
component: true
demo: collapsible
---

## Installation

```npm
npx shadcn-nsh@latest add collapsible
```

## Usage

```tsx
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
```

```tsx
<Collapsible defaultOpen>
  <CollapsibleTrigger first>Title</CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>
```

## Examples

### Open by default

```tsx
<Collapsible defaultOpen>
  <CollapsibleTrigger first>Shipping details</CollapsibleTrigger>
  <CollapsibleContent>Orders leave within a day.</CollapsibleContent>
</Collapsible>
```

### Closed

```tsx
<Collapsible>
  <CollapsibleTrigger>Returns</CollapsibleTrigger>
  <CollapsibleContent>Within 30 days, unused and in its box.</CollapsibleContent>
</Collapsible>
```

`first` drops the row's top divider; `start` lines the trigger and the panel up past a leading icon.

## API

Uses `disclosureTriggerLook`, `DisclosureChevron`, and `disclosurePanel` from accordion. Composition: `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent`.

| Part                 | Props                                                               | Description                                                                         |
| -------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `Collapsible`        | `open`, `defaultOpen`, `onOpenChange({ open, reason })`, `children` | A disclosure row that reveals a panel beneath it.                                   |
| `CollapsibleTrigger` | `children`, `first`, `start`                                        | The title row; `first` drops its top divider, `start` lines it past a leading icon. |
| `CollapsibleContent` | `children`                                                          | The panel beneath, in `disclosurePanel` padding.                                    |

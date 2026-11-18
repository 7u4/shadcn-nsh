---
title: Select
description: A list of choices from a field trigger, on the shared listbox look.
component: true
demo: select
---

## Installation

```npm
npx shadcn-nsh@latest add select
```

## Usage

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
```

```tsx
<Select value={value} onChange={({ value }) => setValue(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Language" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="en">English</SelectItem>
    <SelectItem value="de">Deutsch</SelectItem>
  </SelectContent>
</Select>
```

## Examples

### Disabled choice, disabled select

```tsx
<SelectItem value="svelte" disabled>
  Svelte
</SelectItem>
<Select disabled>…</Select>
```

### Invalid

The trigger's edge takes the danger tone.

```tsx
<SelectTrigger invalid>
  <SelectValue placeholder="Country" />
</SelectTrigger>
```

### Grouped choices

`SelectLabel` names the section; the list draws its header.

```tsx
<SelectContent>
  <SelectGroup>
    <SelectLabel>Europe</SelectLabel>
    <SelectItem value="de">Deutsch</SelectItem>
    <SelectItem value="fr">Français</SelectItem>
  </SelectGroup>
  <SelectGroup>
    <SelectLabel>Asia</SelectLabel>
    <SelectItem value="ja">日本語</SelectItem>
  </SelectGroup>
</SelectContent>
```

### Outline trigger, and a width

`variant="outline"` is a trigger that is not a form's field: the raised finish instead of the
field's well.

```tsx
<SelectTrigger variant="outline" style={{ width: 260 }}>
  <SelectValue placeholder="Filter" />
</SelectTrigger>
```

### A trigger that takes the room of a row

`style` on `SelectTrigger` is the trigger's box in the app's layout: the properties that place it
where the app puts it — `flex`, `flexGrow`, `flexShrink`, `flexBasis`, `width`, `minWidth`,
`maxWidth`, `alignSelf` and the margins — go on the view around the trigger, so it grows, shrinks
and keeps its distances like any other view. The rest of the style (the fill, the edge, the
padding) stays on the trigger itself.

```tsx
<View style={{ flexDirection: "row", gap: 8 }}>
  <Select placeholder="MM">
    <SelectTrigger style={{ flex: 1, minWidth: 0 }} />
    <SelectContent accessibilityLabel="Month">
      <SelectItem value="01">01</SelectItem>
    </SelectContent>
  </Select>
  <Select placeholder="YYYY">
    <SelectTrigger style={{ flex: 1, minWidth: 0 }} />
    <SelectContent accessibilityLabel="Year">
      <SelectItem value="2026">2026</SelectItem>
    </SelectContent>
  </Select>
</View>
```

With a pointer the trigger asks for 180 points at least (room for the list's rows); `minWidth: 0`
lets a narrow row squeeze it, and its title ends in an ellipsis instead of overflowing.

### Uncontrolled

```tsx
<Select defaultValue="en" onChange={({ value }) => save(value)}>
  …
</Select>
```

## API

The root owns the open flag and the value; `SelectContent` mounts [`nsh/base` Select](https://nsh.dev/elements/select) and every base prop passes through except those. `listboxProps` and `OptionRow` fill the popup, the scrim and the rows by default.

| Part              | Props                                                                                                                                               | Description                                                           |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `Select`          | `value`, `defaultValue`, `open`, `defaultOpen`, `disabled`, `cleanable`, `placeholder`, `onChange`, `onOpenChange`, `onOpen`, `onClose`, `onCancel` | The root owns the open flag and the value                             |
| `SelectTrigger`   | `icon`, `lead`, `invalid`, `variant`, `chevron`, `style`                                                                                            | A `Picker`; the layout keys on `style` place it where the app puts it |
| `SelectValue`     | `placeholder`                                                                                                                                       | The placeholder while nothing is chosen                               |
| `SelectContent`   | `items`, `minWidth`                                                                                                                                 | The list; `items` instead of `SelectItem` children                    |
| `SelectItem`      | `value`, `disabled`, `group`                                                                                                                        | A string child is its title                                           |
| `SelectGroup`     |                                                                                                                                                     | A section                                                             |
| `SelectLabel`     |                                                                                                                                                     | The section's name                                                    |
| `SelectSeparator` |                                                                                                                                                     | Nothing: base's list separates sections by their headers              |

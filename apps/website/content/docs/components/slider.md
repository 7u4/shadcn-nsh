---
title: Slider
description: A sunk rail, citrus fill, and round thumb with a focus ring.
component: true
demo: slider
---

## Installation

```npm
npx shadcn-nsh@latest add slider
```

## Usage

```tsx
import { Slider } from "nsh/base";

import { sliderFill, sliderLook } from "@/components/ui/slider";
```

```tsx
const look = sliderLook();

<Slider
  value={volume()}
  onChange={({ value }) => volume.set(value as number)}
  rangeStyle={sliderFill(0, volume() / 100)}
  {...look}
/>;
```

## Examples

### Disabled

Opacity on the track comes from the look's `disabled:opacity-50` class on `trackClass`.

### Value column

```tsx
import { sliderValueClass, sliderValueStyle } from "@/components/ui/slider";

<Slider {...sliderLook({ value: true })}>
  <Text class={sliderValueClass} style={sliderValueStyle()}>
    64%
  </Text>
</Slider>;
```

### Vertical

```tsx
sliderLook({ vertical: true });
sliderFill(0, level / 100, true);
```

## API

`Slider` is [`nsh/base` Slider](https://nsh.dev/elements/slider) wearing `sliderLook` and `sliderFill`: every base prop passes through, and the look's classes and styles are defaults the caller can override.

| Part                                     | Props                                                                                                                                         | Description                                                                                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Slider`                                 | `axis`, `showValue`, and every `nsh/base` Slider prop (`value`, `min`, `max`, `step`, `onChange`, `onChangeEnd`, `disabled`, `rangeStyle`, …) | The rail, the thumb and the fill; `showValue` lays a 42-point value column after the track                                                         |
| `sliderLook()`                           | `vertical`, `value`                                                                                                                           | The parts to spread on a slider of your own: `class`, `trackClass`, `indicatorClass` / `indicatorStyle`, `rangeClass`, `thumbClass` / `thumbStyle` |
| `sliderFill()`                           | `from`, `to`, `vertical`                                                                                                                      | The accent's run along the rail, as `rangeStyle`                                                                                                   |
| `sliderValueClass`, `sliderValueStyle()` | —                                                                                                                                             | The value column's label: 42 points, right aligned, monospaced                                                                                     |

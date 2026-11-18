---
title: Pagination
description: Page numbers and chevrons with the current page lit primary.
component: true
demo: pagination
---

## Installation

```npm
npx shadcn-nsh@latest add pagination
```

## Usage

```tsx
import { Pagination } from "@/components/ui/pagination";
```

```tsx
<Pagination page={page()} totalPages={pages()} onChange={({ page }) => page.set(page)} />
```

## Examples

### Compact

A `compact` pager keeps Previous, a child label, and Next on one row.

```tsx
<Pagination compact variant="outline" page={chapter()} totalPages={12}>
  <Text>Chapter {chapter()} of 12</Text>
</Pagination>
```

### Custom items

```tsx
import { paginationArrows, paginationItemClass } from "@/components/ui/pagination";

<Pagination
  itemClass={paginationItemClass({ variant: "outline" })}
  renderItem={paginationArrows}
/>;
```

## API

Uses `paginationItemClass` and `paginationArrows` by default. Every prop of [`nsh/base` Pagination](https://nsh.dev/elements/pagination) passes through.

| Part         | Props                                                                                                                                                          | Description                                                  |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `Pagination` | `variant` (`PaginationVariant`; `default`, or `outline` on the ends), `compact` (`boolean`; label slot between ends), `page` (`number`; current page, 1-based) | Uses `paginationItemClass` and `paginationArrows` by default |

`PaginationVariant` is `"default" | "outline"`; `paginationItemClass` takes the same word, as
`PaginationItemClassOptions`' `variant`.

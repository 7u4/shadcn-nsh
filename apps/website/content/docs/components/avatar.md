---
title: Avatar
description: A round picture or name-colored initials on the identity ring.
component: true
demo: avatar
---

## Installation

```npm
npx shadcn-nsh@latest add avatar
```

## Usage

```tsx
import { Avatar } from "@/components/ui/avatar";
```

```tsx
<Avatar name="Ada Lovelace" style={{ width: 36, height: 36 }} />
```

## Examples

### Initials

`name` picks a stable hue via `avatarIdentity`.

```tsx
<Avatar name="Alan Turing" style={{ width: 40, height: 40 }} />
```

### Picture

`src` is the picture; `name`'s initials cover it while it loads, and stay if it never arrives.

```tsx
const portraits = { ada: "https://example.com/ada.png" };

<Avatar name="Ada Lovelace" src={portraits.ada} style={{ width: 40, height: 40 }} />;
```

### Broken image

A picture that fails to load leaves the initials on the ring, as a gone picture should.

```tsx
<Avatar name="Ada Lovelace" src="/missing.png" />
```

### Group

Overlap and `limit` use `nsh/base` `AvatarGroup`; size each `Avatar` the same.

## API

Uses `avatarIdentity` and `avatarHue`. Every prop of [`nsh/base` Avatar](https://nsh.dev/elements/avatar) passes through.

| Part     | Props         | Description                                                    |
| -------- | ------------- | -------------------------------------------------------------- |
| `Avatar` | `name`, `src` | A round picture or name-colored initials on the identity ring. |

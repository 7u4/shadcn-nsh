# @shadcn-nsh/ui

[中文](./README.zh.md)

Styled copy-into-app components on [`nsh/base`](https://nsh.dev/elements): behavior and a11y stay in base; the look started from the upstream gallery UI (`// @port` regions, ours to change) and comes from [`@shadcn-nsh/theme`](../theme).

- Rules and port flow: [`docs/ARCHITECTURE.md`](../../docs/ARCHITECTURE.md), [`docs/port.md`](../../docs/port.md), [`AGENTS.md`](../../AGENTS.md)
- Routing: [`port-map.json`](../../port-map.json)
- Demos / render check: [`apps/website/demos`](../../apps/website/demos)
- Docs: [`apps/website`](../../apps/website)
- Native smoke: [`apps/gallery`](../../apps/gallery)

## Layers

| Layer        | Home                | Role                                       |
| ------------ | ------------------- | ------------------------------------------ |
| Primitives   | `nsh`               | Layout / draw / host                       |
| Base         | `nsh/base`          | Unstyled controls                          |
| Theme        | `@shadcn-nsh/theme` | Colors, finishes, radii from upstream      |
| This package | `@shadcn-nsh/ui`    | One file per component; registry for `add` |

Each file is a look plus a thin shell. The look started from the upstream gallery UI where the component has one (`// @port … // @port end`, ours to change, `port:check` lists upstream's changes to the declarations we route, and `bun run port:review` marks them read); where it has none the component is this library's own from the first line (`pressable`).

## Toolchain

Develop against **NSH nightly** aligned with the pinned upstream commit in `port-map.json` (see [`docs/toolchain.md`](../../docs/toolchain.md)).

```sh
bun run port:check
nsh check apps/website/demos
bun run port:render
bun run registry:build
```

Install into an app with `npx shadcn-nsh@latest add <id>`. Component list: the docs site and root `registry.json`.

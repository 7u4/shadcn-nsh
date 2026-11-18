# 组件代码规范

`packages/ui` 和 `packages/theme` 的文件会被 `shadcn-nsh add` 原样复制进别人的仓库，复制之后就归别人所有。读者是第一次打开这个文件的应用开发者，他没读过本仓的文档，也没见过上游 gallery。目标是让他觉得代码**规范、优雅、好改**。

写新组件、改组件、审阅组件时都按这份规范。架构规则（P1–P6、分层、归属）见 [`ARCHITECTURE.md`](ARCHITECTURE.md)，组件流程见 [`port.md`](port.md)。

## A. 从读者的角度

1. **文件头**：
   - 头两三行说清这个文件是什么、从哪来（来源与许可证行保留），以及从哪里改外观（look）、从哪里改结构（外壳）；
   - 不写本仓内部的流程词，比如 `port:render`、baseline、批次、`docs/specs/…` 路径，也不写上游的行号。
2. **注释说"为什么"**：
   - 名字和结构已经说清的"做什么"不再叙述；
   - 保留约束、陷阱、取舍；
   - 删掉过时的注释、与代码对不上的注释、只对维护者有意义的历史（"原来是 X，后来改成 Y"）；
   - 注释的密度与语气，在同一个文件里一致，在同类组件之间也一致。
3. **导出面**：
   - 只导出使用者需要的东西，每个导出都有一行 JSDoc；
   - 导出顺序是 look → 类型 → 部件，或者照同类组件的顺序；
   - 类型紧挨着用到它的 props；
   - 写在公开签名上的类型（look 的参数或返回值、部件的 props）属于导出面，不算"没人用"。
4. **命名**：
   - 部件、props 与 shadcn 和 `nsh/base` 一致；
   - 局部变量名要表达含义，不用 `x`、`tmp`、`d`；
   - 一个概念在全文件只用一个词；
   - 模块常量用小驼峰，不用 `SCREAMING_CASE`；本库已有的少数全大写常量（如 `TOUCH_TARGET`）除外；
   - 不要遮蔽从 `nsh` 导入的名字，比如局部变量叫 `context`。

## B. 代码异味

5. **死代码**：没人用的导出、参数、分支、类型；被注释掉的代码；`console.log`；`debugger`。导出有没有人用，用 `rg` 在 `packages/`、`apps/`、`docs/`、`registry.json`、`port-map.json` 里查。
6. **重复**：
   - 同一文件内的复制粘贴，抽成局部函数；
   - 跨文件、没有所属控件的共享部分，放进 `packages/ui/lib/`（如 `lib/live.ts` 的 `Live` / `read`、`lib/classes.ts` 的 `joinClass`）；
   - `lib/` 不 import 组件，需要用到组件的共享件放进被依赖的那个组件（如 `button.tsx` 的 `Action`）；
   - 新增的 lib 文件在 `registry.json` 里要有条目，用到它的组件在 `registryDependencies` 里加上它；从上游抽取的声明搬家后，同时改 `port-map.json` 里的去向。
7. **过长或过深**：超过约 60 行的函数，或者嵌套超过 3 层的条件，考虑拆开。拆开后读起来必须更清楚，不为拆而拆。
8. **魔法数**：没有名字的尺寸、时长、透明度，要么起名常量，要么用一句注释说明来由。上游原值可以保留，但要说清它是什么。
9. **有限状态**：用字面量联合类型，不用布尔组合或魔法字符串。
10. **外观随外观模式变化**：
    - 颜色和依赖 props 的 look，在 JSX 里读，不在组件体里读一次存下；
    - `finish` 的 getter 读的是当前主题和当前外观，把它的值存进模块级常量，或者读进变量后不再读，运行时切换主题就不会跟着变；
    - **不要把 look 的样式 props 收进一个对象再 `{...}` 展开**：展开只在那一刻读一次，外观会冻住。每个样式 prop 单独写一个属性。
11. **外壳不缩减能力**（P5）：样式类 props 叠在 look 之上，使用者的值优先（`[look.style, props.style ?? null]`）；使用者只覆盖一部分时，look 的其余部分保留。
12. **颜色只来自主题**（P3）：组件、lib 与演示适配层的代码里不出现颜色字面量。

## C. TypeScript

- Types at the boundaries. Public APIs and cross-module interfaces are fully typed; nothing untyped (`any`) crosses a module boundary.
- Make illegal states unrepresentable. Use enums or literal unions for finite states, not combinations of booleans or magic strings.
- Errors. Catch only what this layer can handle. Never swallow one silently. Throw `Error` objects, never strings. Don't catch only to rethrow.
- `unknown` over `any`. Narrow with type guards instead of asserting with `as`. `as const` for literal values.
- `const` by default, `let` only when reassigned, never `var`. `?.` and `??` over manual null checks.
- Every promise is awaited or explicitly handled; no floating promises.
- Accessibility. Labels on inputs, alt text on images, keyboard handlers alongside pointer handlers.

本库特有的几点：

- 不用 `!` 非空断言，改用 `?.` / `??` 或收窄；
- `as` 的常见来源是类型没写全（例如 `createSlot<T>()` 的类型参数），应该补全类型，而不是在下游断言；
- 能用 `satisfies` 时不用 `as ViewStyle`。

## D. 组件不带演示内容

组件文件里不放真人姓名、登录名、`data:` 图片、示例数据集。演示用的数据放在 `apps/docs/demos/`（如 `avatar-data.ts`、`photos.ts`），文档页的示例自带数据。

## E. 审阅时改与不改的边界

- **当场改**：不改变外部行为、也不改变公开 API（导出名、props 名与类型、部件结构）的改动。包括：
  - 注释；
  - 非导出的命名；
  - 死代码（非导出，或者确认全仓没人用的导出）；
  - 文件内的重复；
  - 类型收紧、惯用法；
  - 违反 P3 / P5 或外观读取规则的地方。
- **先记下，再定**：
  - 改公开 API（导出名、props、默认值、部件）；
  - 跨文件抽取；
  - 改 `lib/` 导出的签名；
  - 会改变像素的改动；
  - 拿不准的。
- 改公开 API 时不留旧名的别名，演示、`.ref.tsx`、文档页、gallery 测试里的用法一并改掉。
- `// @port` 区域可以改（它是来源标注，不是只读区），但改完必须仍与 `.ref.tsx` 逐像素一致。
- 每次改动后，`port:render`、`port:render:theme`、`test:install`、`bun run check` 都要通过。`port:render:theme` 看不出主题值本身的回归：组件和参照页读的是同一个 finish，一起错也照样一致。

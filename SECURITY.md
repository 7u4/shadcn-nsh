# 安全问题

## 上报

**不要用公开 issue 报安全问题。** 用 GitHub 的私密上报：本仓库的 **Security** 标签页 → **Report a vulnerability**
（<https://github.com/aningdev/shadcn-nsh/security/advisories/new>）。只有仓库维护者能看到这条上报。

请写清：受影响的版本或提交、你的 NSH / 平台版本、复现步骤、看到的结果，以及你认为的影响。有最小复现最好。

## 我们会做什么

- 一周内确认收到，并说明下一步。
- 修好之后在这里（或 GitHub Security Advisory）写一条说明，署名由你决定。
- 在修好并发布之前，不会公开细节。

## 范围

这个库分发的是**复制进应用的源码**：组件、主题与 registry 条目，外加 `shadcn-nsh` 这个 CLI。所以算安全问题的，例如：

- CLI 在 `add` 时写入应用目录之外的文件、跟随恶意的 registry 响应做不该做的事；
- registry 条目声明的内容与仓库里的文件不一致（供应链问题）；
- 组件里有能把应用数据发出去、或执行外部输入的东西。

不算的：**外观与设计上的不同意见**（那用普通 issue 就行）、上游 `nsh` / `nsh/base` 自身的问题（报给
<https://github.com/longbridge/nsh>）、已复制进应用的代码被你自己改坏。

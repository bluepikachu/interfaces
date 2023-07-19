# Web Interface Guidelines

本文档翻译自 [Web Interface Guideline](https://interfaces.rauno.me/)，更新至 6 月 3 日版本。

---
这份文档了总结一些构建一个良好(Web)界面的细节，但它不是完整和全面的。这是一份动态文档，根据经验定期更新。部分内容可能是主观的，但大部分网站依然适用。
---
在这个文档里特意不重复提及 [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/) 中的规范。但是可能会指出一些无障碍指南。 欢迎一起贡献。编辑[这个文件](https://github.com/raunofreiberg/interfaces/blob/main/README.md) 并提交请求。

## 交互

- 单击输入框的 Label 后应该聚焦输入框
- 输入框应该用 `<form>` 包裹，可以按 Enter 键提交
- 输入框应该有一个适当的 `type` ，如 `password`，`email` 等
- 输入框大部分时候应该禁用 `spellcheck` 和 `autocomplete` 属性
- 输入框在适当时使用 `required` 属性来利用 HTML 表单验证
- 输入框的前缀和后缀装饰，例如图标，应该绝对定位在带有填充的文本输入内容的顶部，而不是旁边，并需要触发输入聚焦
- Toggles 应该立即生效，不需要确认
- 提交后按钮需要更变为禁用状态来避免重复网络请求
- 可交互元素的内部内容应禁用 `user-select` 
- 装饰元素（发光、渐变） 应该禁用 `pointer-events` 来避免劫持事件
- 垂直或水平列表中的交互元素，它们之间不应该有 Dead areas, 相反，应该增加他们的 `padding`

## 排版

- 字体应该应用 `-webkit-font-smoothing: antialiased` 以获得更好的易读性
- 字体应该应用 `text-rendering: optimizeLegibility` 以获得更好的易读性
- Fonts should be subset based on the content, alphabet or relevant language(s)
- 字体的字重不应在 hover 或 Selected 时发生变化，以防止布局发生变化
- 不应该使用 400 以下的字重
- 通常来说，中等大小的标题用 500-600 之间的字重看起来效果最好
- 用 CSS [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) 流畅地调整值，例如用 `clamp(48px, 5vw, 72px)` 来表示标题的 `font-size` 
- 如果可用, 表格数字应与 `font-variant-numeric: tabular-nums`一起使用，特别是在表格或不希望布局发生变化时，比如计时器
- 使用 `-webkit-text-size-adjust: 100%` 来避免 iOS 在横屏时意外地调整文本大小


## 动效

- 切换主题不应触发元素上的过渡和动画 [^1]
- 为了感受交互的即时性，动画的时间不应超过 200ms，
- 动画的值应该与触发器大小成正比:
  -  Dialog 的动画不要从 0 → 1 缩放, fade opacity and scale from ~0.8
  - Don't scale buttons on press from 1 → 0.8, but ~0.96, ~0.9, or so
- 频繁而且新颖性较低的操作应该避免无关的动画 [^2]
  - 打开右键菜单
  - 从列表中删除或增加项目
  - Hovering trivial buttons
- 循环动画在屏幕上不可见时，应该暂停以减轻 CPU 和 GPU 的使用
- 使用 `scroll-behavior: smooth` 来导航到页内的锚点, 并添加适当的偏移量

## 触摸

- Hover 状态在触摸按下时不可见, 请使用 `@media (hover: hover)` [^3]
- 输入框的字体大小不应该小于 16px，以防止 iOS 在 focus 状态下自动缩放
- 在可触控设备上输入框不应该自动聚焦，因为他会打开键盘并覆盖在屏幕上
- 在 `<video />` 上使用 `muted` 和 `playsinline` 来实现在 iOS 中自动播放视频
- 对实现平移和缩放手势的自定义组件禁用 `touch-action` ，以防缩放和滚动等本机行为的干扰
- 用 `-webkit-tap-highlight-color: rgba(0,0,0,0)` 禁用 iOS 默认的点击高亮显示，但始终将其替换为适当的替代方案

## 优化

- `filter` 和 `backdrop-filter` 的 `blur()` 数值太大时可能会影响运行速度
- 填充矩形的缩放和模糊效果会产生条带，请用径向渐变代替
- 对于性能不佳的动画，使用 `transform: translateZ(0)` 少量启用 GPU 渲染
- 在动画持续时间内切换 `will-change` 在表现不佳的滚动动画 [^4]
- 在 iOS 上自动播放过多视频会导致设备卡顿，应暂停或停止播放屏幕外的视频
- 使用可以直接提交到 DOM 的实时值的引用来绕过 React 的渲染生命周期 [^5]
- [检测并适应](https://github.com/GoogleChromeLabs/react-adaptive-hooks) 用户设备的硬件和网络能力

## 无障碍

- 禁用的按钮不应该有 Tootips，它们是不可用的 [^6]
- Box shadow 应用于聚焦环, 而不是不考虑半径的轮廓 [^7]
- 顺序列表中的可聚焦元素应可以通过 <kbd>↑</kbd> <kbd>↓</kbd> 导航
- 顺序列表中的可聚焦元素应可以通过 <kbd>⌘</kbd> <kbd>Backspace</kbd> 删除
- 要在按下时立即打开, 下拉菜单应该在 `mousedown` 时触发而不是 `click`
- 使用带有样式标签的 SVG favicon，这样可以使用 `prefers-color-scheme` 贴近系统主题
- 仅图标的交互元素应定义显式 `aria-label`
- Hover 触发的 Tooltips 不应该包含交互式内容
- 图像应使用使用 `<img>` 渲染，以便于屏幕阅读器和使用右键菜单复制
- 图像应始终使用呈现，以便屏幕阅读器并易于从右键单击菜单进行复制
- 使用 HTML 构建的插图应该有一个明确的 `aria-label` 而不是向使用屏幕阅读器的人宣布原始 DOM 树
- 渐变文本应在 `::selection` 状态取消渐变
- 使用嵌套菜单时, 使用 "prediction cone" 来防止指针在其他元素上移动时意外关闭菜单

## 设计

- 乐观地在本地更新数据并通过反馈回滚服务器错误
- 身份验证重定向应在客户端加载之前在服务器上进行，以避免 URL 发生变化
- 使用 `::selection` 设置文档选择状态的样式
- 显示与其触发器相关的反馈：
  - 在成功复制上显示临时内联复选标记，而不是通知
  - 突出显示表单中与错误相关的输入框
- 空状态应该提示创建一个新项目，并带有可选模板

[^1]: 在深色模式或浅色模式之间切换将触发用于显式交互（例如悬停）的元素的转换。我们可以[暂时禁用转换](https://paco.me/writing/disable-theme-transitions)来防止这种情况。对于 Next.js，使用 [next-themes](https://github.com/pacocoursey/next-themes) 可以防止开箱即用的转换。
[^2]: 这是一个品味问题，但有些交互在没有动效的时候感觉更好。例如macOS 原生的右键菜单，因为需要频繁使用，它只有消失动画，而没有出现动画。
[^3]: 大多数触摸设备在按下时都会暂时闪烁悬停状态，除非仅针对具有 [`@media (hover: hover)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)的指针设备明确定义。
[^4]: 使用 [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) 作为提高性能的最后手段。先发制人地将其扔到元素上以获得更好的性能可能会产生相反的效果。
[^5]: 这可能会引起争议，但有时直接操作 DOM 是有益的。例如，我们可以跟踪 ref 中的增量并直接在回调中更新相关元素，而不是依赖于每个轮子事件上的 React 重新渲染。
[^6]: 禁用的按钮不会按 Tab 键顺序出现在 DOM 中，因此永远不会向键盘用户公布工具提示，他们也不知道为什么该按钮被禁用。
[^7]: 自 2023 年起，Safari 在自定义 outline 样式时，不会再把元素的圆角列入考虑。[Safari 16.4](https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes) 增加了 `outline` 对描边圆角的跟随支持。但是，请记住，并非每个人都会立即更新操作系统。

# Web Interface Guidelines

本文档翻译自 [Web Interface Guideline](https://interfaces.rauno.me/)，更新至 2023 年 6 月 6 日版本。

---

这份文档了总结一些构建一个良好(Web)界面的细节，但它不是完整和全面的。这是一份动态文档，根据经验定期更新。部分内容可能是主观的，但大部分网站依然适用。

本文档特意不重复提及 [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.1/) 规范的内容。但是会指出一些无障碍访问指南，欢迎贡献。编辑[这个文件](https://github.com/raunofreiberg/interfaces/blob/main/README.md) 并提交 Pull Request。

## 交互性

- 点击输入框标签应该聚焦到输入框
- 输入框应该用 `<form>` 包裹，以便按 Enter 键提交
- 输入框应该有适当的 `type` 属性，如 `password`、`email` 等
- 输入框大多数情况下应该禁用 `spellcheck` 和 `autocomplete` 属性
- 输入框应该在适当时使用 `required` 属性来利用 HTML 表单验证
- 输入框的前缀和后缀装饰（如图标）应该使用绝对定位覆盖在文本输入框上并设置内边距，而不是放在旁边，并且应该触发输入框聚焦
- Toggles（切换开关）应该立即生效，不需要确认
- 按钮在提交后应该被禁用，以避免重复的网络请求
- 可交互元素的内部内容应禁用 `user-select` 
- 装饰性元素（光晕、渐变）应该禁用 `pointer-events` 以免劫持事件
- 垂直或水平列表中的交互元素之间不应该有死区，而应该增加它们的 `padding`

## 排版

- 字体应该应用 `-webkit-font-smoothing: antialiased` 以获得更好的易读性
- 字体应该应用 `text-rendering: optimizeLegibility` 以获得更好的易读性
- 字体应该根据内容、字母表或相关语言进行子集化
- 字体粗细不应该在悬停或选中状态时改变，以防止布局偏移
- 不应该使用低于 400 的字体粗细
- 中等大小的标题通常在字体粗细为 500-600 之间时看起来最好
- 使用 CSS [`clamp()`](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) 流畅地调整数值，例如标题的 `font-size` 使用 `clamp(48px, 5vw, 72px)`
- 在可用的情况下，应该使用 `font-variant-numeric: tabular-nums` 应用表格数字，特别是在表格中或当不希望布局偏移时，如计时器中
- 使用 `-webkit-text-size-adjust: 100%` 来避免 iOS 在横屏时意外地调整文本大小

## 动效

- 切换主题不应触发元素上的过渡和动画 [^1]
- 为了感受交互的即时性，动画的时间不应超过 200ms
- 动画数值应该与触发器大小成比例：
  - 不要让对话框从 0 → 1 缩放进入，而是淡入透明度并从 ~0.8 开始缩放
  - 不要让按钮在按下时从 1 → 0.8 缩放，而是 ~0.96、~0.9 左右
- 频繁且新颖性低的操作应该避免多余的动画： [^2]
  - 打开右键菜单
  - 从列表中删除或添加项目
  - 悬停普通按钮
- 循环动画在屏幕上不可见时应该暂停，以减轻 CPU 和 GPU 使用
- 使用 `scroll-behavior: smooth` 导航到页面内锚点，并设置适当的偏移量

## 触摸

- 触摸按下时不应该显示悬停状态，使用 `@media (hover: hover)` [^3]
- 输入框的字体大小不应该小于 16px，以防止 iOS 在聚焦时缩放
- 输入框在触摸设备上不应该自动聚焦，因为这会打开键盘并覆盖屏幕
- 在 `<video />` 标签上应用 `muted` 和 `playsinline` 以在 iOS 上自动播放
- 对于实现平移和缩放手势的自定义组件，禁用 `touch-action` 以防止原生行为（如缩放和滚动）的干扰
- 使用 `-webkit-tap-highlight-color: rgba(0,0,0,0)` 禁用默认的 iOS 点击高亮，但始终用适当的替代方案替换它

## 性能优化

- `filter` 和 `backdrop-filter` 的 `blur()` 数值太大时可能会影响运行速度
- 缩放和模糊填充矩形会导致条带化，使用径向渐变代替
- 对于性能不佳的动画，谨慎使用 `transform: translateZ(0)` 启用 GPU 渲染
- 对于性能不佳的滚动动画，在动画持续期间切换 `will-change` [^4]
- 在 iOS 上自动播放过多视频会导致设备卡顿，应暂停或停止播放屏幕外的视频
- 对于可以直接提交到 DOM 的实时值，使用 refs 绕过 React 的渲染生命周期 [^5]
- [检测并适应](https://github.com/GoogleChromeLabs/react-adaptive-hooks)用户设备的硬件和网络能力

## 无障碍访问

- 禁用的按钮不应该有工具提示，它们不可访问 [^6]
- Box shadow 应用于聚焦环, 而不是不考虑半径的轮廓 [^7]
- 顺序列表中的可聚焦元素应该可以用 <kbd>↑</kbd> <kbd>↓</kbd> 导航
- 顺序列表中的可聚焦元素应该可以用 <kbd>⌘</kbd> <kbd>Backspace</kbd> 删除
- 为了在按下时立即打开，下拉菜单应该在 `mousedown` 时触发，而不是 `click`
- 使用带有样式标签的 SVG favicon，根据 `prefers-color-scheme` 遵循系统主题
- 仅图标的交互元素应该定义明确的 `aria-label`
- 由悬停触发的工具提示不应该包含交互内容
- 图像应该始终用 `<img>` 渲染，以便屏幕阅读器使用和从右键菜单复制
- 用 HTML 构建的插图应该有明确的 `aria-label`，而不是向使用屏幕阅读器的人宣布原始 DOM 树
- 渐变文本应该在 `::selection` 状态下取消渐变
- 使用嵌套菜单时，使用"预测锥"来防止指针在移动到其他元素时意外关闭菜单。

## 设计

- 乐观地在本地更新数据，并在服务器错误时回滚并提供反馈
- 身份验证重定向应该在客户端加载之前在服务器上进行，以避免生硬的 URL 变化
- 使用 `::selection` 样式化文档选择状态
- 相对于其触发器显示反馈：
  - 在成功复制时显示临时内联复选标记，而不是通知
  - 在表单错误时高亮相关的输入框
- 空状态应该提示创建新项目，并带有可选的模板

[^1]: 在深色模式和浅色模式之间切换会触发元素上的过渡，这些过渡本来是为悬停等明确交互而设计的。我们可以[临时禁用过渡](https://paco.me/writing/disable-theme-transitions)来防止这种情况。对于 Next.js，使用 [next-themes](https://github.com/pacocoursey/next-themes)，它可以开箱即用地防止这个过渡。
[^2]: 这是一个品味问题，但有些交互在没有动效时感觉更好。例如，原生 macOS 右键菜单由于频繁使用，只有退出动画，没有进入动画。
[^3]: 大多数触摸设备在按下时会临时闪现悬停状态，除非明确只为指针设备定义 [`@media (hover: hover)`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover)。
[^4]: 使用 [`will-change`](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change) 作为提高性能的最后手段。预先在元素上使用它来获得更好的性能可能会产生相反的效果。
[^5]: 这可能有争议，但有时直接操作 DOM 是有益的。例如，不依赖 React 在每个滚轮事件上重新渲染，我们可以在 ref 中跟踪增量并在回调中直接更新相关元素。
[^6]: 禁用的按钮不会出现在 DOM 的 tab 顺序中，因此工具提示永远不会向键盘用户宣布，他们不会知道按钮为什么被禁用。
[^7]: 截至 2023 年，Safari 在定义自定义 outline 样式时不会考虑元素的边框圆角。[Safari 16.4](https://developer.apple.com/documentation/safari-release-notes/safari-16_4-release-notes) 已添加对 `outline` 跟随边框圆角曲线的支持。但是，请记住并非每个人都会立即更新他们的操作系统。
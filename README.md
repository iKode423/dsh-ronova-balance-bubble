# 若娜瓦余额气泡 · Ronova Balance Bubble

[![License: MIT](https://img.shields.io/badge/license-MIT-yellow.svg)](LICENSE)

在若娜瓦主题侧栏头像上方挂一朵冒泡对话框，随时告诉你还剩多少充值余额和赠金余额。余额低于可配置阈值时提醒「记得及时充值~」，否则显示「余额充足，放心蹬~」。

这是一个纯客户端插件 Bundle，Host 半边只声明一个持久化的阈值字段；不改动 Harness 的任何宿主逻辑，卸载后气泡与设置项立即消失。

> A DeepSeek Harness Web Client plugin that shows Ronova recharge and bonus balances in a thought bubble above the sidebar avatar, with a configurable low-balance reminder threshold.

---

## 功能

- **余额一眼可见**：对话气泡里同时列出充值余额与赠金余额，金额保留两位小数并使用等宽数字，两行数字纵向对齐。
- **低余额提醒**：充值余额与赠金余额之和低于阈值时，气泡底部显示「记得及时充值~」；达到阈值则显示「余额充足，放心蹬~」，颜色也更柔和。
- **阈值可调**：设置 → 通用里新增「低余额提醒阈值」一行，输入框失焦或按回车即保存，范围 `0`–`10000`，默认 `10` 元。
- **自动刷新**：首次挂载立即读取余额；页面窗口重新获得焦点、标签页重新可见时各刷新一次，并每 5 分钟兜底刷新；账户流提示凭证已保存时也会立刻刷新。
- **登录状态联动**：账户流报告已退出登录时立即隐藏气泡，不会残留上一位用户的余额。
- **浅色 / 深色两套气泡**：深色主题下云朵描边换成暗金，并加一层暖色外发光。
- **窄侧栏自动让位**：侧栏收窄到放不下气泡时隐藏，展开后自动恢复；侧栏本身不支持宽布局时也不显示。
- **尊重动态效果偏好**：开启「减少动态效果」后关闭气泡的入场缩放动画。
- **不打扰操作**：气泡不接收指针事件，不遮挡头像点击，也不会进入键盘 Tab 序列；余额更新通过 `role="status"` 播报。

## 气泡内容

气泡固定在侧栏底部头像区块的上方、略偏左，用三层圆形组成的气泡尾巴指向头像，文案格式为：

```text
喂，你还有
¥12.34 充值余额，
¥5.67 赠金余额。
记得及时充值~
```

- 金额优先取**人民币**钱包合计，没有人民币钱包时退回**美元**，符号相应显示为 `¥` / `$`。
- 正数金额按分**截断**而不是四舍五入，与平台 Web 的展示保持一致；小于 `0.01` 的正数显示为 `<¥0.01`，负数保留负号。
- 低余额判定使用「充值余额 + 赠金余额」，与气泡里展示的两个数字一致。

## 阈值设置

设置页「通用」分区里会增加一行「低余额提醒阈值」：

| 项目 | 说明 |
| --- | --- |
| 位置 | 设置 → 通用 → 低余额提醒阈值 |
| 取值 | `0`–`10000` 的整数，单位元；留空按 `0` 保存，非数字会恢复为已保存的值 |
| 默认值 | `10` |
| 保存时机 | 输入框失焦，或在输入框内按回车 |
| 生效时机 | 保存成功即更新当前气泡，无需刷新页面 |
| 失败处理 | 输入框恢复为已保存的值，并在行内显示错误提示 |

阈值通过 Harness 的设置服务写入当前 profile 的持久配置（Host 半边的 `Config`），重启后仍然有效。设置项文案跟随界面语言切换中文 / English；气泡正文为固定中文文案。

## 安装

本包通过 `package.json` 里的 `dsh.bundle.patch` 声明自己是一个 Bundle，安装时由插件管理器把下面这条插入 Harness 的插件树：

```yaml
- insert:
    - id: ronova-balance-bubble
      name: '@local/ronova-balance-bubble'
```

推荐流程：

1. 先安装 [若娜瓦主题](https://github.com/iKode423/dsh-ronova-theme)：本插件在依赖里声明了它，气泡会挂在它打理的侧栏头像区域上方。
2. 打开 Harness 的「插件」页，从本地目录安装本包。
3. 确认插件列表里出现「若娜瓦余额气泡 / Ronova Balance Bubble」。
4. 刷新页面，侧栏底部头像上方即可看到气泡。

手动方式（开发时常用）：

1. 把仓库目录 link 进当前 profile 的 `node_modules`（`pnpm link` 或 `pnpm add file:../ronova-balance-bubble`）。
2. 在 profile 的 Cordis 配置里加入上面的 `insert` 片段。
3. 重启 Harness 或刷新 Web UI。

插件声明了两个客户端依赖：`@local/ronova` 与 `@deepseek-ai/dsh-client-ui-sidebar`，它们写在 `package.json` 的 `dsh.client.inject` 中；任意一个缺失，插件都不会加载。

## 工作原理

| 半边 | 职责 |
| --- | --- |
| Host（`index.js`） | 声明 `threshold` 配置：类型、默认值、`0`–`10000` 范围与校验；没有运行时逻辑 |
| Client（`client.js`） | 读取账户余额、渲染气泡、刷新调度、注册设置行 |

客户端插件在 `sidebar.footer.action` 槽位注册 `ronova.balance`（`order: -19`），因此气泡与头像在同一行布局中；它通过 `remote.account.getBalance()` 取得账户投影，用 `remote.$stream()` 订阅账户状态，并用 `remote.settings.mutate()` 写入阈值。所有金额与账户数据都来自 Harness 自身的 account 服务。

刷新失败时保留上一次成功读取的余额，等待下一次焦点、可见性或定时刷新重试，不会把气泡闪烁成空状态。

## 目录结构

```text
ronova-balance-bubble/
├── package.json        # 包信息与 dsh.bundle / dsh.client 声明
├── cordis.patch.yml    # Bundle 的插入补丁
├── index.js            # Host 半边：阈值 Config 声明
├── client.js           # 全部实现：余额读取、气泡、样式、设置行
├── icon.svg            # 插件列表图标
├── locale/{zh,en}.json # 插件元信息文案
├── README.md
└── LICENSE             # MIT
```

## 开发

- 没有构建步骤：`client.js` 是手写的模块，直接通过 `window.__ModuleLoader__.load` 注册。
- 运行时只依赖 Harness 提供的 `react`，没有其他第三方依赖。
- 以 link 方式装进 profile 后，修改 `client.js` 会触发热重载，通常无需刷新页面；其他情况下重启 Harness 或刷新 Web UI 即可。
- 气泡样式集中在 `client.js` 的 `STYLES` 模板字符串里，云朵图形由内联 SVG 生成（浅色 / 深色两套，编码为 `data:` URL），不依赖静态资源路由。
- 设置行样式在 `THRESHOLD_STYLES` 中，文案在 `THRESHOLD_TEXT` 里，按 `zh` / `en` 各存一份。
- 阈值在 Host 与 Client 各有一份范围常量（`0`–`10000`）；调整取值上限时需要同时修改两边。
- 新增语言时，在 `THRESHOLD_TEXT` 中加一份词典，并补充 `locale/` 下的元信息文件即可。

## 兼容性与限制

- 面向 DeepSeek Harness Web UI，依赖 `remote.account`、`remote.settings`、`slots`、`configForms` 与 `locale` 服务；Harness 升级若改动这些接口，插件需要同步适配。
- 气泡正文为固定中文文案，不随界面语言切换；仅插件元信息与设置行提供中英文。
- 只展示当前账户投影里的余额，不提供账单、消费明细或历史趋势。
- 只识别人民币与美元钱包；其他币种会退回人民币展示口径，金额可能显示为 `0`。
- 气泡宽度固定为 210px，侧栏可用宽度不足 228px 时会自动隐藏。
- 气泡是只读展示，不支持点击、跳转充值页或手动刷新。

## 隐私

插件仅通过 Harness 的 account 服务读取当前账户余额，不访问任何第三方接口，不收集、不上传余额或其他数据；除 Harness 自己持久化的阈值设置外，不额外写入任何存储。

## 许可证

[MIT](LICENSE) © 2026 [iKode423](https://github.com/iKode423)

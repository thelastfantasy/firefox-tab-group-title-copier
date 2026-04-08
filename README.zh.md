# Firefox 标签页组标题复制器

一个 Firefox 扩展，让你一键复制标签页组中所有标签的标题。

[English](README.md)

## 功能

- **显示标签页组**：按窗口分组，清晰展示所有标签页组
- **复制标题**：将任意标签页组的所有标题复制到剪贴板（纯文本或 JSON 格式）
- **多语言支持**：支持中文、英文、日文，自动检测浏览器语言
- **快捷访问**：点击工具栏按钮即可使用

## 安装

### 从 Firefox 附加组件商店安装

直接从 [Firefox 附加组件（AMO）](https://addons.mozilla.org/) 安装。

### 开发版安装

1. 克隆仓库并安装依赖：
   ```bash
   git clone https://github.com/thelastfantasy/firefox-tab-group-title-copier.git
   cd firefox-tab-group-title-copier
   npm install
   npm run build
   ```
2. 打开 Firefox，访问 `about:debugging`
3. 点击「此 Firefox」→「临时载入附加组件」
4. 选择 `dist/manifest.json`

## 使用方法

1. 点击工具栏中的扩展图标
2. 弹出窗口按窗口分组显示所有标签页组
3. 点击组标题展开/折叠标签页列表
4. 点击复制按钮：
   - **文本按钮**（`📄`）：将所有标签页标题复制为纯文本，每行一个
   - **JSON 按钮**（`</>`）：将标题和 URL 复制为 JSON 数组格式

## 支持的语言

- English（英文）
- 中文
- 日本語（日文）

## 开发

### 环境要求

- Node.js 20+
- npm

### 项目结构

```
firefox_copy_tabgroup_titles/
├── src/                    # TypeScript 源文件
│   ├── popup.ts            # 弹出窗口逻辑
│   ├── i18n.ts             # 国际化模块
│   └── globals.d.ts        # WebExtension API 类型声明
├── static/                 # 静态资源（原样复制到 dist/）
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.css
│   ├── icon.svg / icon.png
│   └── _locales/           # 语言文件
│       ├── en/messages.json
│       ├── zh/messages.json
│       └── ja/messages.json
├── dist/                   # 构建输出（已 gitignore），Firefox 加载此目录
├── build.mjs               # esbuild 构建脚本
├── tsconfig.json
└── package.json
```

### npm 脚本

| 命令 | 说明 |
|---|---|
| `npm run build` | 编译 TypeScript 并将静态资源复制到 `dist/` |
| `npm run watch` | 开发模式监视文件变化 |
| `npm run typecheck` | 仅运行 TypeScript 类型检查 |
| `npm run package` | 构建并打包为 `.xpi` 文件 |
| `npm run dev` | 构建并启动 Firefox 加载扩展 |

### 关于构建（AMO 审查说明）

本扩展使用 TypeScript，通过 [esbuild](https://esbuild.github.io/) 编译。构建产物**未经 minify（压缩）或混淆**，esbuild 仅做 TypeScript 到 JavaScript 的转译。

从源码复现构建：
```bash
npm ci
npm run build
# dist/ 中的内容即为提交到 AMO 的文件
```

## 权限说明

- `tabs`：访问标签页信息和标题
- `tabGroups`：访问标签页组信息

## 支持开发

如果你觉得这个扩展有用，欢迎支持开发：

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/jade913)

## 许可证

MIT License

## 贡献

欢迎提交 Pull Request！

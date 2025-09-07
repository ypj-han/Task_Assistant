# 任务拆解助手 (Task Decomposition Assistant)

一个专为 ADHD（注意力缺陷多动障碍）用户设计的 Web 应用，帮助将复杂目标拆解为可执行的小步骤任务清单。

## ✨ 核心功能

- 🧠 **自然语言理解**：支持文本和语音输入目标
- ✅ **智能任务拆解**：将目标拆解为 3-12 个短时、可执行的步骤
- 🔄 **动态编辑**：支持修改任务时间、标记完成状态
- 🔔 **温和提醒**：基于时间间隔的智能提醒机制
- 🔒 **隐私保护**：本地存储，支持一键数据清除
- 📱 **响应式设计**：支持桌面和移动设备

## 🚀 快速开始

### 环境要求

- Node.js 16.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
npm run build
```

构建文件将生成在 `dist` 目录中。

## 🛠️ 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式框架**：TailwindCSS
- **路由**：React Router DOM
- **图标**：Lucide React
- **通知**：React Hot Toast
- **日期处理**：date-fns

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── Header.tsx      # 头部导航
│   ├── GoalInput.tsx   # 目标输入组件
│   ├── GoalCard.tsx    # 目标卡片组件
│   └── TaskItem.tsx    # 任务项组件
├── pages/              # 页面组件
│   ├── HomePage.tsx    # 首页
│   ├── GoalDetailPage.tsx # 目标详情页
│   └── SettingsPage.tsx   # 设置页
├── types/              # TypeScript 类型定义
│   └── index.ts
├── utils/              # 工具函数
│   ├── api.ts          # API 客户端
│   ├── storage.ts      # 本地存储管理
│   └── helpers.ts      # 辅助函数
├── App.tsx             # 主应用组件
├── main.tsx           # 应用入口
└── index.css          # 全局样式
```

## 🔧 配置

### API 配置

在 `src/utils/api.ts` 中配置后端 API 地址：

```typescript
const API_BASE_URL = '/api'; // 开发环境代理到 localhost:8000
```

### 主题配置

在 `tailwind.config.js` 中自定义主题颜色和样式。

## 📱 使用指南

### 创建目标

1. 在首页点击"新建目标"
2. 输入或语音描述你的目标
3. 系统自动拆解为可执行的小步骤
4. 每个子任务控制在 30 分钟以内

### 管理任务

- 点击任务前的圆圈标记完成状态
- 点击编辑图标修改任务标题和时间
- 在目标详情页添加新任务

### 数据管理

- 支持数据导入/导出
- 一键清除所有数据
- 本地存储，保护隐私

## 🎨 设计特色

- **ADHD 友好**：简洁界面，减少干扰
- **渐进式披露**：信息分层展示
- **视觉反馈**：完成状态、进度条等
- **无障碍设计**：支持键盘导航和屏幕阅读器

## 🔒 隐私保护

- 所有数据仅存储在本地浏览器
- 不收集用户个人信息
- 支持 24 小时内一键数据清除
- 无第三方追踪

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户。 
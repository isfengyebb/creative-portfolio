# Creative Portfolio

一个现代化的个人作品集网站，用于展示个人简历、技能和项目作品。

---

## ✨ 功能特性

- **国际化支持** - 中英文自动检测，支持手动切换语言
- **响应式设计** - 完美适配桌面端和移动端
- **流畅动画** - 基于 Framer Motion 的页面过渡和交互动画
- **暗色主题** - 极简黑白灰风格，护眼舒适
- **Tailwind CSS** - 现代化原子化 CSS 框架
- **懒加载路由** - 优化首屏加载性能

## 🛠️ 技术栈

### 前端
- **React 19** - UI 框架
- **Vite 7** - 构建工具
- **Tailwind CSS 3** - 样式框架
- **Framer Motion** - 动画库
- **React Router 7** - 路由管理
- **i18next** - 国际化
- **Lucide Icons** - 图标库

### 后端
- **Express** - Node.js 服务端框架（本地开发）
- **Vercel Serverless** - 生产环境 API

---

## 🚀 快速开始

确保已安装 [Node.js](https://nodejs.org/) (推荐 LTS 版本)。

### 1. 克隆项目

```bash
git clone https://github.com/isfengyebb/creative-portfolio.git
cd creative-portfolio
```

### 2. 启动后端服务

```bash
cd backend
npm install
node index.js
```

后端服务将启动在 `http://localhost:3001`。

### 3. 启动前端应用

新开一个终端窗口：

```bash
cd frontend
npm install
npm run dev
```

前端开发服务器将启动在 `http://localhost:5174`。

---

## 📁 项目结构

```
creative-portfolio/
├── frontend/                # React 前端
│   ├── src/
│   │   ├── components/      # 组件
│   │   │   └── ui/          # UI 组件库
│   │   ├── pages/           # 页面
│   │   ├── hooks/           # 自定义 Hooks
│   │   ├── services/        # API 服务层
│   │   ├── models/          # 数据模型层
│   │   ├── locales/         # 国际化文件
│   │   ├── constants/       # 常量配置
│   │   ├── styles/          # 全局样式
│   │   └── lib/             # 工具函数
│   └── dist/                # 构建产物
├── backend/                 # Express 后端（本地开发）
│   ├── data/                # JSON 数据文件
│   └── index.js             # 服务入口
├── api/                     # Vercel Serverless 函数
└── vercel.json              # Vercel 部署配置
```

---

## 🌐 部署

本项目使用 Vercel 部署：

```bash
npm i -g vercel
vercel --prod
```

---

## 📄 License

MIT

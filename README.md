# React User Profile 360 项目

本项目是一个包含现代化前后端技术栈的Web应用框架，旨在演示如何构建一个用户资料管理（“用户360视图”）系统。

## 项目结构

本项目采用前后端分离的单体仓库（Monorepo）结构：

- **/frontend**: 前端应用，基于 Vite + React 构建。
- **/backend**: 后端服务，基于 Node.js + Express 构建。

## 技术栈

- **前端**:
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/) - 下一代前端构建工具
- **后端**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/) - Node.js Web 应用框架

## 如何开始

请确保您已安装 [Node.js](https://nodejs.org/) (推荐LTS版本)。

### 1. 启动后端服务

在您的命令行中执行：

```bash
# 进入后端目录
cd backend

# 安装依赖 (只需首次运行)
npm install

# 启动服务器
npm start
```
后端服务将启动在 `http://localhost:3001`。

### 2. 启动前端应用

打开一个新的命令行窗口，执行：

```bash
# 进入前端目录
cd frontend

# 安装依赖 (只需首次运行)
npm install

# 启动开发服务器
npm run dev
```
前端开发服务器将启动在 `http://localhost:3000` (或其他可用端口)。

## 可用脚本

- `frontend`:
  - `npm run dev`: 启动开发服务器。
  - `npm run build`: 构建生产版本的应用。
- `backend`:
  - `npm start`: 启动后端服务。

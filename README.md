# Teambition MCP Server

Teambition MCP (Model Context Protocol) 服务器是一个基于 MCP 协议实现的 AI 服务端，为 Teambition 应用提供 AI 能力支持。

## 项目简介

本项目是基于 MCP (Model Context Protocol) 协议开发的服务端，旨在为 Teambition 应用提供智能 AI 能力支持。MCP 协议是一种用于构建 AI 应用的通信协议，使得 AI 模型可以更方便地与应用进行交互。

## 功能特点

- 基于 MCP 协议实现的服务端
- 提供各种 AI 工具集成
- 支持浏览器工具集成
- 支持时间转换和获取功能
- 易于扩展的工具架构

## 已实现功能

### 用户相关功能

- ✅ `get-uid` - 根据邮箱获取用户uid
- ✅ `get-user-info-by-uid` - 根据用户uid获取用户信息
- ✅ `get-user-info-by-email` - 根据邮箱获取用户信息

### 组织相关功能

- ✅ `get-org-info` - 获取组织信息
- ✅ `update-org-info` - 更新组织信息

## 待实现功能 (TODO)

以下是计划通过MCP工具实现的Teambition API功能:

### 身份验证

### 用户与组织

- 📋 用户API - 用户信息管理、权限控制等
- 📋 企业API - 企业账户管理、企业设置等
- 📋 通讯录API - 联系人管理、分组管理等
- 📋 群组API - 团队群组创建、成员管理等

### 项目管理

- 📋 任务API - 任务创建、更新、删除和查询等
- 📋 工时API - 工时记录、统计和报表等
- 📋 项目API - 项目创建、配置和管理等
- 📋 项目分组API - 项目分类和分组管理
- 📋 名额API - 项目成员名额管理
- 📋 统计API - 项目和任务数据统计
- 📋 项目集API - 多项目集合管理
- 📋 项目集项目API - 项目集内项目管理
- 📋 项目成员API - 项目成员管理

### 协作工具

- 📋 群聊API - 团队聊天功能
- 📋 webhook API - 外部系统集成接口
- 📋 持续集成API - CI/CD工具集成

### 文件管理

- 📋 文件系统API - 文件上传、下载和管理
- 📋 文件库API - 文件存储和共享
- 📋 甘特图API - 项目进度可视化

### 自定义字段

- 📋 自定义字段分类API - 字段分类管理
- 📋 自定义字段API - 自定义字段创建和配置

### 其他功能

- 📋 轻任务API - 简化的任务管理
- 📋 项目应用API - 项目插件和应用管理
- 📋 Delivery API - 交付管理工具

## 技术栈

- TypeScript
- Node.js
- fastmcp - MCP 协议实现库
- dotenv - 环境变量管理
- zod - 数据验证
- tws-auth - 认证库
- Vitest - 测试框架

## 安装指南

### 前置条件

- Node.js 20.x 或更高版本
- pnpm 8.x 或更高版本

### 安装步骤

1. 克隆代码库

```bash
git clone https://github.com/your-username/teambition-mcp.git
cd teambition-mcp
```

2. 安装依赖

```bash
pnpm install
```

3. 配置环境变量

创建 `.env` 文件并配置必要的环境变量：

```
# MCP 配置
MCP_PORT=3000
# 其他必要的环境变量
```

## 使用指南

### 开发模式

启动开发服务器：

```bash
pnpm dev
```

服务器将在 `http://localhost:3000` 启动（或者您在环境变量中配置的端口）。

### 工具检查

检查 MCP 工具配置：

```bash
pnpm mcp:inspector
```

### 测试

运行测试：

```bash
pnpm test
```

运行测试并查看覆盖率：

```bash
pnpm test:coverage
```

使用 UI 界面运行测试：

```bash
pnpm test:ui
```

## 项目结构

```
teambition-mcp/
├── dist/            # 编译输出目录
├── src/             # 源代码
│   ├── apis/        # API 实现
│   ├── constants/   # 常量定义
│   ├── mcp-server/  # MCP 服务器实现
│   │   └── tools/   # MCP 工具集
│   ├── types/       # TypeScript 类型定义
│   └── __tests__/   # 测试文件
├── .taskmaster/     # Taskmaster 配置
└── .vscode/         # VS Code 配置
```

## 许可证

ISC

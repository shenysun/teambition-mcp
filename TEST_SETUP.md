# 测试设置指南

## 安装测试依赖

首先需要安装测试相关的依赖包：

```bash
pnpm add -D vitest @vitest/ui @vitest/coverage-v8 jsdom @types/jsdom
```

## 测试文件结构

已为以下 API 文件创建了对应的单元测试：

```
src/__tests__/apis/
├── request.test.ts                    # 测试 request.ts
├── user/
│   ├── get-user-info.test.ts         # 测试 user/get-user-info.ts
│   └── get-uid.test.ts               # 测试 user/get-uid.ts
└── org/
    ├── get-org-info.test.ts          # 测试 org/get-org-info.ts
    └── update-org-info.test.ts       # 测试 org/update-org-info.ts
```

## 运行测试

### 基本测试命令

```bash
# 运行所有测试（监听模式）
npm run test

# 运行一次测试
npm run test:run

# 运行测试并生成覆盖率报告
npm run test:coverage

# 启动测试 UI 界面
npm run test:ui
```

### 运行特定测试

```bash
# 运行特定文件的测试
npx vitest src/__tests__/apis/request.test.ts

# 运行特定目录的测试
npx vitest src/__tests__/apis/user/

# 运行匹配模式的测试
npx vitest --grep "Schema 验证"
```

## 测试覆盖范围

每个 API 文件的测试都包含以下方面：

### 1. Schema 验证测试
- 验证 Zod schema 的正确性
- 测试有效数据的验证
- 测试无效数据的拒绝
- 测试边界条件

### 2. 函数功能测试
- API 调用的正确性
- 参数传递的准确性
- 返回值的正确处理
- 错误处理机制

### 3. Mock 和依赖注入
- Mock `tbServer` 实例
- Mock 环境变量
- Mock 外部依赖

## 测试配置

项目使用 Vitest 作为测试框架，配置在 `vitest.config.ts` 中：

- 全局测试 API（无需导入 `describe`, `it`, `expect` 等）
- Node.js 环境
- 包含 `src/**/*.test.ts` 和 `src/**/*.spec.ts` 文件
- 覆盖率报告支持

## 注意事项

1. **依赖 Mock**: 所有外部依赖都已正确 mock，包括：
   - `tws-auth` 库
   - `../request` 模块
   - 环境变量常量

2. **类型安全**: 测试文件保持 TypeScript 类型检查

3. **测试数据**: 使用模拟数据确保测试的独立性和可重复性

4. **错误处理**: 每个测试都包含错误场景的验证

## 扩展测试

如果添加新的 API 文件，请按照相同的模式创建对应的测试文件：

1. 在 `src/__tests__/apis/` 对应目录下创建 `.test.ts` 文件
2. Mock 所有外部依赖
3. 测试 Schema 验证
4. 测试函数功能
5. 测试错误处理

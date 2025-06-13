# MCP 工具开发规范

## 命名规范

MCP 工具应使用 camelCase（小驼峰）命名方式：

- **正确示例**：`getUid`, `getUserInfo`, `updateOrgInfo`
- **错误示例**：`get-uid`, `get_user_info`, `UpdateOrgInfo`

## 工具结构

每个 MCP 工具应遵循以下结构：

```typescript
import type { TbMCPServer } from '../../server'
import { someApi, SomeApiSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

export function registerSomeTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'someTool', // 使用 camelCase 命名
    description: '工具描述',
    parameters: SomeApiSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      // 添加日志
      logger.info(`执行 someTool 工具，参数: ${JSON.stringify(args)}`)

      // 调用 API 并处理结果
      return promise2ExecContent(
        someApi(args),
        'someTool' // 上下文信息，用于日志
      )
    },
  })
}
```

## 注册工具

所有工具必须在 `register.ts` 中注册：

```typescript
import { registerSomeTool } from './some-folder/some-file'

export function registerAllTools(tbMCPServer: TbMCPServer) {
  // 注册工具
  registerSomeTool(tbMCPServer)
}
```

## 错误处理

工具应使用项目的错误处理和日志系统：

```typescript
import { handleError, logger } from '../../../utils'

// 记录日志
logger.info('执行操作')
logger.debug('调试信息')

// 处理错误
try {
  // 操作
}
catch (error) {
  const handledError = handleError(error, '上下文')
  // 处理错误
}
```

## 测试

为每个工具创建测试文件：

```typescript
import { describe, expect, it, vi } from 'vitest'
import { registerSomeTool } from './some-file'

describe('someTool', () => {
  it('应该正确处理请求', async () => {
    // 测试代码
  })
})
```

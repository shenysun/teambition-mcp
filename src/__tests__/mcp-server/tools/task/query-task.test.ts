import type { TbMCPServer } from '../../../../mcp-server/server'
import { describe, expect, it, vi } from 'vitest'
import * as taskApi from '../../../../apis/task/query-task'
import { registerQueryTaskTool } from '../../../../mcp-server/tools/task/query-task'

// 模拟 queryTask API
vi.mock('../../../../apis/task/query-task', () => ({
  queryTask: vi.fn().mockResolvedValue({
    code: 200,
    errorMessage: '',
    requestId: 'test-request-id',
    result: [
      {
        id: 'task-id-1',
        content: '测试任务1',
        note: '测试备注',
        projectId: 'project-id-1',
      },
    ],
  }),
  queryTaskParamsSchema: {
    parse: vi.fn().mockImplementation(data => data),
  },
}))

// 模拟 promise2ExecContent
vi.mock('../../../../mcp-server/tools/promise-exec', () => ({
  promise2ExecContent: vi.fn().mockImplementation(async (promise) => {
    try {
      const result = await promise
      return {
        success: true,
        data: result,
      }
    }
    catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      }
    }
  }),
}))

// 模拟 logger
vi.mock('../../../../utils', () => ({
  logger: {
    info: vi.fn(),
    error: vi.fn(),
    debug: vi.fn(),
    warn: vi.fn(),
  },
}))

describe('registerQueryTaskTool', () => {
  it('should register task_query tool correctly', () => {
    // 创建模拟的 MCP 服务器
    const mockServer = {
      addTool: vi.fn(),
    }
    const tbMCPServer = { server: mockServer } as unknown as TbMCPServer

    // 注册工具
    registerQueryTaskTool(tbMCPServer)

    // 验证工具注册
    expect(mockServer.addTool).toHaveBeenCalledTimes(1)
    expect(mockServer.addTool.mock.calls[0][0].name).toBe('task_query')
    expect(mockServer.addTool.mock.calls[0][0].description).toBe('查询任务详情')
    expect(mockServer.addTool.mock.calls[0][0].timeoutMs).toBe(10000)
  })

  it('should execute task_query tool correctly', async () => {
    // 创建模拟的 MCP 服务器
    const mockServer = {
      addTool: vi.fn(),
    }
    const tbMCPServer = { server: mockServer } as unknown as TbMCPServer

    // 注册工具
    registerQueryTaskTool(tbMCPServer)

    // 获取执行函数
    const executeFunc = mockServer.addTool.mock.calls[0][0].execute

    // 执行工具
    const args = {
      taskId: 'task-id-1',
      orgId: 'org-id-1',
      operatorId: 'operator-id-1',
    }
    const result = await executeFunc(args)

    // 验证 API 调用
    expect(taskApi.queryTask).toHaveBeenCalledWith(args)

    // 验证结果
    expect(result).toEqual({
      success: true,
      data: {
        code: 200,
        errorMessage: '',
        requestId: 'test-request-id',
        result: [
          {
            id: 'task-id-1',
            content: '测试任务1',
            note: '测试备注',
            projectId: 'project-id-1',
          },
        ],
      },
    })
  })
})

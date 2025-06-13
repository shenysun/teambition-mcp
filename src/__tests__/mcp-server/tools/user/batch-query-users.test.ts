import type { TbMCPServer } from '../../../../mcp-server/server'
import { describe, expect, it, vi } from 'vitest'
import * as api from '../../../../apis/user/batch-query-users'
import { registerBatchQueryUsersTool } from '../../../../mcp-server/tools/user/batch-query-users'

// 模拟API模块
vi.mock('../../../../apis/user/batch-query-users', () => {
  return {
    batchQueryUsers: vi.fn(),
    BatchQueryUsersSchema: {
      parse: vi.fn(),
    },
  }
})

describe('batchQueryUsers MCP工具', () => {
  it('应该正确注册工具并处理请求', async () => {
    // 1. 模拟MCP服务器
    const mockServer = {
      addTool: vi.fn(),
    }
    const tbMCPServer = { server: mockServer } as unknown as TbMCPServer

    // 2. 注册工具
    registerBatchQueryUsersTool(tbMCPServer)

    // 3. 验证工具注册
    expect(mockServer.addTool).toHaveBeenCalledWith({
      name: 'batchQueryUsers',
      description: '批量查询用户信息',
      parameters: api.BatchQueryUsersSchema,
      timeoutMs: 10000,
      execute: expect.any(Function),
    })

    // 4. 获取执行函数
    const executeFunction = mockServer.addTool.mock.calls[0][0].execute

    // 5. 模拟API响应
    const mockApiResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: [
        {
          userId: 'user1',
          avatarUrl: 'http://example.com/avatar1.jpg',
          name: '用户1',
        },
      ],
    }
    vi.mocked(api.batchQueryUsers).mockResolvedValue(mockApiResponse)

    // 6. 调用执行函数
    const args = { ids: ['user1', 'user2'] }
    const result = await executeFunction(args)

    // 7. 验证结果
    expect(api.batchQueryUsers).toHaveBeenCalledWith(args)
    expect(result.isError).toBe(false)
    expect(result.content[0].text).toBe(JSON.stringify(mockApiResponse.result))
  })

  it('应该正确处理API错误', async () => {
    // 1. 模拟MCP服务器
    const mockServer = {
      addTool: vi.fn(),
    }
    const tbMCPServer = { server: mockServer } as unknown as TbMCPServer

    // 2. 注册工具
    registerBatchQueryUsersTool(tbMCPServer)

    // 3. 获取执行函数
    const executeFunction = mockServer.addTool.mock.calls[0][0].execute

    // 4. 模拟API错误响应
    const mockErrorResponse = {
      code: 400,
      errorMessage: '参数错误',
      requestId: 'test-request-id',
      result: [] as api.UserDetail[],
    }
    vi.mocked(api.batchQueryUsers).mockResolvedValue(mockErrorResponse as any)

    // 5. 调用执行函数
    const args = { ids: ['invalid-id'] }
    const result = await executeFunction(args)

    // 6. 验证错误处理
    expect(result.isError).toBe(true)
    expect(result.content[0].text).toBe(JSON.stringify(mockErrorResponse))
  })

  it('应该正确处理异常', async () => {
    // 1. 模拟MCP服务器
    const mockServer = {
      addTool: vi.fn(),
    }
    const tbMCPServer = { server: mockServer } as unknown as TbMCPServer

    // 2. 注册工具
    registerBatchQueryUsersTool(tbMCPServer)

    // 3. 获取执行函数
    const executeFunction = mockServer.addTool.mock.calls[0][0].execute

    // 4. 模拟API抛出异常
    const mockError = new Error('API调用失败')
    vi.mocked(api.batchQueryUsers).mockRejectedValue(mockError)

    // 5. 调用执行函数
    const args = { ids: ['user1'] }
    const result = await executeFunction(args)

    // 6. 验证异常处理
    expect(result.isError).toBe(true)
    expect(result.content[0].text).toContain('API调用失败')
  })
})

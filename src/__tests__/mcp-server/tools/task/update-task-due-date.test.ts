import type { ContentResult } from 'fastmcp'
import type { UpdateTaskDueDateResponse } from '../../../../apis/task'
import type { TbMCPServer } from '../../../../mcp-server/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as taskApi from '../../../../apis/task'
import * as promiseExec from '../../../../mcp-server/tools/promise-exec'
import { registerUpdateTaskDueDateTool } from '../../../../mcp-server/tools/task'

describe('task_update_due_date 工具', () => {
  // 模拟MCP服务器
  const mockServer = {
    addTool: vi.fn(),
  }
  const tbMCPServer = { server: mockServer } as unknown as TbMCPServer

  // 模拟参数
  const mockParams = {
    taskId: 'task-123',
    operatorId: 'user-123',
    dueDate: '2023-12-31T12:00:00Z',
  }

  // 模拟API响应
  const mockApiResponse: UpdateTaskDueDateResponse = {
    code: 200,
    result: {
      dueDate: '2023-12-31T12:00:00Z',
      updated: '2023-11-15T08:30:00Z',
    },
    errorMessage: '',
    requestId: 'test-request-id',
  }

  // 模拟ContentResult成功响应
  const mockContentResult: ContentResult = {
    isError: false,
    content: [
      {
        text: JSON.stringify(mockApiResponse.result),
        type: 'text',
      },
    ],
  }

  // 模拟ContentResult错误响应
  const mockErrorContentResult: ContentResult = {
    isError: true,
    content: [
      {
        text: JSON.stringify({ message: 'API错误' }),
        type: 'text',
      },
    ],
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('应正确注册工具', () => {
    // 注册工具
    registerUpdateTaskDueDateTool(tbMCPServer)

    // 验证工具注册
    expect(mockServer.addTool).toHaveBeenCalledTimes(1)
    expect(mockServer.addTool.mock.calls[0][0].name).toBe('task_update_due_date')
    expect(mockServer.addTool.mock.calls[0][0].description).toBe('更新任务截止时间')
  })

  it('应正确执行工具并返回结果', async () => {
    // 模拟API调用
    vi.spyOn(taskApi, 'updateTaskDueDate').mockResolvedValueOnce(mockApiResponse)

    // 模拟promise2ExecContent
    vi.spyOn(promiseExec, 'promise2ExecContent').mockResolvedValueOnce(mockContentResult)

    // 注册工具
    registerUpdateTaskDueDateTool(tbMCPServer)

    // 获取执行函数
    const executeFunc = mockServer.addTool.mock.calls[0][0].execute

    // 执行工具
    const result = await executeFunc(mockParams)

    // 验证结果
    expect(result).toEqual(mockContentResult)

    // 验证API调用
    expect(taskApi.updateTaskDueDate).toHaveBeenCalledWith(mockParams)
  })

  it('应正确处理错误', async () => {
    // 模拟API错误
    const mockError = new Error('API错误')
    vi.spyOn(taskApi, 'updateTaskDueDate').mockRejectedValueOnce(mockError)

    // 模拟promise2ExecContent处理错误
    vi.spyOn(promiseExec, 'promise2ExecContent').mockRejectedValueOnce(mockErrorContentResult)

    // 注册工具
    registerUpdateTaskDueDateTool(tbMCPServer)

    // 获取执行函数
    const executeFunc = mockServer.addTool.mock.calls[0][0].execute

    // 执行工具
    try {
      await executeFunc(mockParams)
    }
    catch (error) {
      // 验证错误处理
      expect(error).toEqual(mockErrorContentResult)
    }
  })
})

import type { ContentResult } from 'fastmcp'
import type { TbMCPServer } from '../../../../mcp-server/server'
import { describe, expect, it, vi } from 'vitest'
import * as taskApi from '../../../../apis/task/query-all-task'
import * as promiseExec from '../../../../mcp-server/tools/promise-exec'
import { registerQueryAllTaskTool } from '../../../../mcp-server/tools/task/query-all-task'
import { logger } from '../../../../utils'

// 模拟依赖
vi.mock('../../../../apis/task/query-all-task')
vi.mock('../../../../utils')
vi.mock('../../../../mcp-server/tools/promise-exec')

describe('task_query_all 工具', () => {
  it('应正确注册工具并返回结果', async () => {
    // 模拟服务器
    const mockServer = {
      addTool: vi.fn(),
    }
    const tbMCPServer = { server: mockServer } as unknown as TbMCPServer

    // 模拟API响应
    const mockTaskResponse = {
      result: [
        {
          id: 'task-123',
          taskId: 'task-123',
          content: '测试任务',
          note: '任务备注',
          projectId: 'project-123',
          ancestorIds: [],
          parentTaskId: '',
          tfsId: 'tfs-123',
          tasklistId: 'tasklist-123',
          stageId: 'stage-123',
          tagIds: ['tag-1', 'tag-2'],
          creatorId: 'user-123',
          executorId: 'user-456',
          involveMembers: ['user-123', 'user-456'],
          priority: 1,
          storyPoint: '3',
          recurrence: [],
          isDone: false,
          isArchived: false,
          visible: 'members',
          uniqueId: '123',
          startDate: '2023-01-01T00:00:00Z',
          dueDate: '2023-01-31T00:00:00Z',
          accomplishTime: '',
          created: '2023-01-01T00:00:00Z',
          updated: '2023-01-01T00:00:00Z',
          sfcId: 'sfc-123',
          sprintId: 'sprint-123',
          sourceId: '',
          progress: 0,
          customfields: [],
        },
      ],
      code: 200,
      errorMessage: '',
      requestId: 'req-123',
    }

    // 设置API模拟返回
    vi.mocked(taskApi.queryAllTask).mockResolvedValue(mockTaskResponse)

    // 模拟promise2ExecContent函数
    const mockExecResult: ContentResult = {
      isError: false,
      content: [
        {
          text: JSON.stringify(mockTaskResponse.result),
          type: 'text',
        },
      ],
    }
    vi.mocked(promiseExec.promise2ExecContent).mockResolvedValue(mockExecResult)

    // 注册工具
    registerQueryAllTaskTool(tbMCPServer)

    // 验证工具注册
    expect(mockServer.addTool).toHaveBeenCalledTimes(1)
    const toolConfig = mockServer.addTool.mock.calls[0][0]
    expect(toolConfig.name).toBe('task_query_all')
    expect(toolConfig.description).toBe('查询自由任务和项目任务详情')

    // 执行工具处理函数
    const params = { taskId: 'task-123', operatorId: 'user-123' }
    const result = await toolConfig.execute(params)

    // 验证API调用
    expect(taskApi.queryAllTask).toHaveBeenCalledWith(params)
    expect(logger.info).toHaveBeenCalled()
    expect(promiseExec.promise2ExecContent).toHaveBeenCalledWith(
      expect.any(Promise),
      'task_query_all',
    )

    // 验证结果
    expect(result).toEqual(mockExecResult)
  })

  it('应正确处理错误', async () => {
    // 模拟服务器
    const mockServer = {
      addTool: vi.fn(),
    }
    const tbMCPServer = { server: mockServer } as unknown as TbMCPServer

    // 设置API模拟返回错误
    vi.mocked(taskApi.queryAllTask).mockRejectedValue(new Error('API错误'))

    // 模拟promise2ExecContent函数处理错误
    const mockErrorResult: ContentResult = {
      isError: true,
      content: [
        {
          text: JSON.stringify({ message: 'API错误' }),
          type: 'text',
        },
      ],
    }
    vi.mocked(promiseExec.promise2ExecContent).mockResolvedValue(mockErrorResult)

    // 注册工具
    registerQueryAllTaskTool(tbMCPServer)

    // 获取处理函数
    const toolConfig = mockServer.addTool.mock.calls[0][0]

    // 执行工具处理函数
    const params = { taskId: 'task-123', operatorId: 'user-123' }
    const result = await toolConfig.execute(params)

    // 验证结果
    expect(result).toEqual(mockErrorResult)
  })
})

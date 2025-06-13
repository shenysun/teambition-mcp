import { describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { queryAllTask } from '../../../apis/task/query-all-task'

// 模拟getOrgId函数
vi.mock('../../../constants/env', () => {
  return {
    getOrgId: vi.fn().mockReturnValue('default-org-id'),
  }
})

vi.mock('../../../apis/request', () => {
  return {
    tbServer: {
      withTenant: vi.fn().mockReturnThis(),
      withOperator: vi.fn().mockReturnThis(),
      withQuery: vi.fn().mockReturnThis(),
      get: vi.fn(),
    },
  }
})

describe('queryAllTask', () => {
  it('应该正确调用API并返回任务详情列表', async () => {
    // 模拟API响应
    const mockResponse = {
      result: [
        {
          id: 'task-123',
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

    // 设置模拟返回值
    vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

    // 调用API
    const result = await queryAllTask({
      taskId: 'task-123',
      operatorId: 'user-123',
    })

    // 验证API调用
    expect(tbServer.withTenant).toHaveBeenCalledWith('default-org-id', 'organization')
    expect(tbServer.withOperator).toHaveBeenCalledWith('user-123')
    expect(tbServer.withQuery).toHaveBeenCalledWith({ taskId: 'task-123' })
    expect(tbServer.get).toHaveBeenCalledWith('/all-task/query')

    // 验证返回结果
    expect(result).toEqual(mockResponse)
    expect(result.result[0].id).toBe('task-123')
    expect(result.result[0].content).toBe('测试任务')
  })
})

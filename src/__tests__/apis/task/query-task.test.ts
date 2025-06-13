import { describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { queryTask } from '../../../apis/task/query-task'

vi.mock('../../../apis/request', () => ({
  tbServer: {
    withTenant: vi.fn().mockReturnThis(),
    withHeaders: vi.fn().mockReturnThis(),
    withQuery: vi.fn().mockReturnThis(),
    withOperator: vi.fn().mockReturnThis(),
    get: vi.fn().mockResolvedValue({
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
            ancestorIds: [],
            parentTaskId: '',
            tfsId: 'tfs-id-1',
            tasklistId: 'tasklist-id-1',
            stageId: 'stage-id-1',
            tagIds: ['tag-id-1'],
            creatorId: 'creator-id-1',
            executorId: 'executor-id-1',
            involveMembers: ['user-id-1'],
            priority: 1,
            storyPoint: '',
            recurrence: [],
            isDone: false,
            isArchived: false,
            visible: 'members',
            uniqueId: '1',
            startDate: '2023-01-01T00:00:00Z',
            dueDate: '2023-01-10T00:00:00Z',
            accomplishTime: '',
            created: '2023-01-01T00:00:00Z',
            updated: '2023-01-01T00:00:00Z',
            sfcId: '',
            sprintId: '',
            sourceId: '',
            progress: 0,
            customfields: [],
          },
        ],
      },
    }),
  },
}))

describe('queryTask', () => {
  it('should query tasks with correct parameters', async () => {
    const result = await queryTask({
      taskId: 'task-id-1',
      orgId: 'org-id-1',
      operatorId: 'operator-id-1',
    })

    expect(tbServer.withTenant).toHaveBeenCalledWith('org-id-1', 'organization')
    expect(tbServer.withOperator).toHaveBeenCalledWith('operator-id-1')
    expect(tbServer.withQuery).toHaveBeenCalledWith({ taskId: 'task-id-1' })
    expect(tbServer.get).toHaveBeenCalledWith('/gateway/v3/task/query')

    expect(result).toEqual({
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
            ancestorIds: [],
            parentTaskId: '',
            tfsId: 'tfs-id-1',
            tasklistId: 'tasklist-id-1',
            stageId: 'stage-id-1',
            tagIds: ['tag-id-1'],
            creatorId: 'creator-id-1',
            executorId: 'executor-id-1',
            involveMembers: ['user-id-1'],
            priority: 1,
            storyPoint: '',
            recurrence: [],
            isDone: false,
            isArchived: false,
            visible: 'members',
            uniqueId: '1',
            startDate: '2023-01-01T00:00:00Z',
            dueDate: '2023-01-10T00:00:00Z',
            accomplishTime: '',
            created: '2023-01-01T00:00:00Z',
            updated: '2023-01-01T00:00:00Z',
            sfcId: '',
            sprintId: '',
            sourceId: '',
            progress: 0,
            customfields: [],
          },
        ],
      },
    })
  })
})

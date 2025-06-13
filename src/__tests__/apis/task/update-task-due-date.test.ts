import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { updateTaskDueDate } from '../../../apis/task'
import { getOrgId } from '../../../constants/env'

describe('updateTaskDueDate', () => {
  const mockResponse = {
    code: 200,
    result: {
      dueDate: '2023-12-31T12:00:00Z',
      updated: '2023-11-15T08:30:00Z',
    },
    errorMessage: '',
    requestId: 'test-request-id',
  }

  const mockParams = {
    taskId: 'task-123',
    orgId: getOrgId(),
    operatorId: 'user-123',
    dueDate: '2023-12-31T12:00:00Z',
  }

  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('应正确调用API并返回结果', async () => {
    // 模拟API响应
    const putSpy = vi.spyOn(tbServer, 'put').mockResolvedValueOnce(mockResponse)

    // 调用函数
    const result = await updateTaskDueDate(mockParams)

    // 验证结果
    expect(result).toEqual(mockResponse)

    // 验证API调用
    expect(putSpy).toHaveBeenCalledWith(
      `/gateway/v3/task/${mockParams.taskId}/dueDate`,
      {
        dueDate: mockParams.dueDate,
      },
    )
  })

  it('应正确处理可选参数', async () => {
    // 模拟API响应
    const putSpy = vi.spyOn(tbServer, 'put').mockResolvedValueOnce({
      data: mockResponse,
    } as any)

    // 调用函数，包含可选参数
    const paramsWithOptional = {
      ...mockParams,
      disableActivity: true,
      disableNotification: true,
    }
    await updateTaskDueDate(paramsWithOptional)

    // 验证API调用，包含可选参数
    expect(putSpy).toHaveBeenCalledWith(
      `/gateway/v3/task/${mockParams.taskId}/dueDate`,
      {
        dueDate: mockParams.dueDate,
        disableActivity: true,
        disableNotification: true,
      },
    )
  })
})

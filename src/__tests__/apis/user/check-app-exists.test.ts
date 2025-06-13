import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { checkAppExists } from '../../../apis/user/check-app-exists'

vi.mock('../../../apis/request', () => {
  return {
    tbServer: {
      withTenant: vi.fn().mockReturnThis(),
      post: vi.fn(),
    },
  }
})

describe('checkAppExists', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该正确调用API并返回用户应用可见性', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: {
        user1: true,
        user2: false,
      },
    }

    vi.mocked(tbServer.post).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await checkAppExists({
      userIds: ['user1', 'user2'],
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withTenant).toHaveBeenCalledWith('test-org-id', 'organization')
    expect(tbServer.post).toHaveBeenCalledWith('user/app/exists', {
      userIds: ['user1', 'user2'],
    })
  })

  it('应该使用提供的组织ID', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: {
        user1: true,
      },
    }

    vi.mocked(tbServer.post).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await checkAppExists({
      userIds: ['user1'],
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withTenant).toHaveBeenCalledWith('test-org-id', 'organization')
  })
})

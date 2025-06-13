import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { getUserPreferences } from '../../../apis/user/get-user-preferences'

vi.mock('../../../apis/request', () => {
  return {
    tbServer: {
      withTenant: vi.fn().mockReturnThis(),
      withQuery: vi.fn().mockReturnThis(),
      get: vi.fn(),
    },
  }
})

describe('getUserPreferences', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该正确调用API并返回用户设置', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: {
        userId: 'user1',
        language: 'zh-CN',
        lastWorkspace: 'workspace1',
      },
    }

    vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await getUserPreferences({
      userId: 'user1',
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withTenant).toHaveBeenCalledWith('test-org-id', 'organization')
    expect(tbServer.withQuery).toHaveBeenCalledWith({
      userId: 'user1',
    })
    expect(tbServer.get).toHaveBeenCalledWith('user/preferences')
  })

  it('应该使用提供的组织ID', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: {
        userId: 'user1',
        language: 'zh-CN',
        lastWorkspace: 'workspace1',
      },
    }

    vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await getUserPreferences({
      userId: 'user1',
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withTenant).toHaveBeenCalledWith('test-org-id', 'organization')
  })
})

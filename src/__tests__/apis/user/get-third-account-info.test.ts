import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { getThirdAccountInfo } from '../../../apis/user/get-third-account-info'

vi.mock('../../../apis/request', () => {
  return {
    tbServer: {
      withTenant: vi.fn().mockReturnThis(),
      withQuery: vi.fn().mockReturnThis(),
      get: vi.fn(),
    },
  }
})

describe('getThirdAccountInfo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该正确调用API并返回三方账号信息', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: {
        id: 'binding-id',
        userId: 'user1',
        openId: 'open1',
        refer: 'wechat',
        showname: '用户1',
        created: '2023-01-01T00:00:00Z',
        updated: '2023-01-01T00:00:00Z',
      },
    }

    vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await getThirdAccountInfo({
      openId: 'open1',
      refer: 'wechat',
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withTenant).toHaveBeenCalledWith('test-org-id', 'organization')
    expect(tbServer.withQuery).toHaveBeenCalledWith({
      openId: 'open1',
      refer: 'wechat',
    })
    expect(tbServer.get).toHaveBeenCalledWith('user/thirdAccount/info')
  })

  it('应该使用提供的组织ID', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: {
        id: 'binding-id',
        userId: 'user1',
        openId: 'open1',
        refer: 'wechat',
        showname: '用户1',
        created: '2023-01-01T00:00:00Z',
        updated: '2023-01-01T00:00:00Z',
      },
    }

    vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await getThirdAccountInfo({
      openId: 'open1',
      refer: 'wechat',
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withTenant).toHaveBeenCalledWith('test-org-id', 'organization')
  })
})

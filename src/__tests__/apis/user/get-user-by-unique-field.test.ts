import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { getUserByUniqueField } from '../../../apis/user/get-user-by-unique-field'

vi.mock('../../../apis/request', () => {
  return {
    tbServer: {
      withQuery: vi.fn().mockReturnThis(),
      get: vi.fn(),
    },
  }
})

describe('getUserByUniqueField', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该正确调用API并返回用户基本信息', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: {
        id: 'user1',
        avatarUrl: 'http://example.com/avatar1.jpg',
        name: '用户1',
        email: 'user1@example.com',
      },
    }

    vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await getUserByUniqueField({
      selectBy: 'email',
      value: 'user1@example.com',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withQuery).toHaveBeenCalledWith({
      selectBy: 'email',
      value: 'user1@example.com',
    })
    expect(tbServer.get).toHaveBeenCalledWith('user/info/byUniqueField')
  })

  it('应该支持不同的查询参数类型', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: {
        id: 'user1',
        avatarUrl: 'http://example.com/avatar1.jpg',
        name: '用户1',
        phone: '13800138000',
      },
    }

    vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await getUserByUniqueField({
      selectBy: 'phone',
      value: '13800138000',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withQuery).toHaveBeenCalledWith({
      selectBy: 'phone',
      value: '13800138000',
    })
  })
})

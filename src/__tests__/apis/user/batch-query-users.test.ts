import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { batchQueryUsers } from '../../../apis/user/batch-query-users'

vi.mock('../../../apis/request', () => {
  return {
    tbServer: {
      withTenant: vi.fn().mockReturnThis(),
      post: vi.fn(),
    },
  }
})

describe('batchQueryUsers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该正确调用API并返回用户信息', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: [
        {
          userId: 'user1',
          avatarUrl: 'http://example.com/avatar1.jpg',
          name: '用户1',
          email: 'user1@example.com',
        },
        {
          userId: 'user2',
          avatarUrl: 'http://example.com/avatar2.jpg',
          name: '用户2',
          email: 'user2@example.com',
        },
      ],
    }

    vi.mocked(tbServer.post).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await batchQueryUsers({
      ids: ['user1', 'user2'],
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withTenant).toHaveBeenCalledWith('test-org-id', 'organization')
    expect(tbServer.post).toHaveBeenCalledWith('user/batchQuery', {
      ids: ['user1', 'user2'],
      openIds: undefined,
      pageSize: undefined,
      pageToken: undefined,
    })
  })

  it('应该在没有提供ids或openIds时抛出错误', () => {
    // 调用函数并验证错误
    expect(() => batchQueryUsers({ orgId: 'test-org-id' } as any)).toThrow('必须提供 ids 或 openIds 参数')
  })

  it('应该正确处理openIds参数', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: [
        {
          userId: 'user1',
          avatarUrl: 'http://example.com/avatar1.jpg',
          name: '用户1',
          openId: 'open1',
        },
      ],
    }

    vi.mocked(tbServer.post).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await batchQueryUsers({
      openIds: ['open1'],
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.post).toHaveBeenCalledWith('user/batchQuery', {
      ids: undefined,
      openIds: ['open1'],
      pageSize: undefined,
      pageToken: undefined,
    })
  })

  it('应该正确处理分页参数', async () => {
    // 模拟API响应
    const mockResponse = {
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

    vi.mocked(tbServer.post).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await batchQueryUsers({
      ids: ['user1'],
      pageSize: 10,
      pageToken: 'next-page',
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.post).toHaveBeenCalledWith('user/batchQuery', {
      ids: ['user1'],
      openIds: undefined,
      pageSize: 10,
      pageToken: 'next-page',
    })
  })
})

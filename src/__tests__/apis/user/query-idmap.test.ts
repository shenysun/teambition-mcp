import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { queryIdMap } from '../../../apis/user/query-idmap'

vi.mock('../../../apis/request', () => {
  return {
    tbServer: {
      withTenant: vi.fn().mockReturnThis(),
      withQuery: vi.fn().mockReturnThis(),
      get: vi.fn(),
    },
  }
})

describe('queryIdMap', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('应该正确调用API并返回IDMap信息', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: [
        {
          id: 'idmap1',
          tbId: 'user1',
          refId: 'ref1',
          refer: 'dingTalk-user',
          extra: {
            userId: 'staff1',
          },
        },
      ],
    }

    vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await queryIdMap({
      refer: 'dingTalk-user',
      tbId: 'user1',
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withTenant).toHaveBeenCalledWith('test-org-id', 'organization')
    expect(tbServer.withQuery).toHaveBeenCalledWith({
      refer: 'dingTalk-user',
      tbId: 'user1',
      refId: undefined,
      extraUserId: undefined,
    })
    expect(tbServer.get).toHaveBeenCalledWith('idmap/query')
  })

  it('应该使用提供的组织ID', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: [
        {
          id: 'idmap1',
          tbId: 'user1',
          refId: 'ref1',
          refer: 'dingTalk-user',
          extra: {
            userId: 'staff1',
          },
        },
      ],
    }

    vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await queryIdMap({
      refer: 'dingTalk-user',
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withTenant).toHaveBeenCalledWith('test-org-id', 'organization')
  })

  it('应该支持所有查询参数', async () => {
    // 模拟API响应
    const mockResponse = {
      code: 200,
      errorMessage: '',
      requestId: 'test-request-id',
      result: [
        {
          id: 'idmap1',
          tbId: 'user1',
          refId: 'ref1',
          refer: 'dingTalk-user',
          extra: {
            userId: 'staff1',
          },
        },
      ],
    }

    vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

    // 调用函数
    const result = await queryIdMap({
      refer: 'dingTalk-user',
      tbId: 'user1',
      refId: 'ref1',
      extraUserId: 'staff1',
      orgId: 'test-org-id',
    })

    // 验证结果
    expect(result).toEqual(mockResponse)
    expect(tbServer.withQuery).toHaveBeenCalledWith({
      refer: 'dingTalk-user',
      tbId: 'user1',
      refId: 'ref1',
      extraUserId: 'staff1',
    })
  })
})

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { getUserInfo, type GetUserInfo, getUserInfoSchema, userInfoSchema } from '../../../apis/user/get-user-info'

// Mock tbServer
vi.mock('../../../apis/request', () => ({
  tbServer: {
    withTenant: vi.fn().mockReturnThis(),
    withQuery: vi.fn().mockReturnThis(),
    get: vi.fn(),
  },
}))

describe('get-user-info.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('schema 验证', () => {
    it('getUserInfoSchema 应该验证通过 userId 方式的数据', () => {
      const data = { orgId: 'org123', userId: 'user123' }
      const result = getUserInfoSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('getUserInfoSchema 应该验证通过邮箱方式的数据', () => {
      const data = { orgId: 'org123', email: 'test@example.com' }
      const result = getUserInfoSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('getUserInfoSchema 应该拒绝无效数据', () => {
      const data = { orgId: 'org123' }
      const result = getUserInfoSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('userInfoSchema 应该验证用户信息结构', () => {
      const userInfo = {
        avatarUrl: 'https://example.com/avatar.jpg',
        id: 'user123',
        name: '测试用户',
      }
      const result = userInfoSchema.safeParse(userInfo)
      expect(result.success).toBe(true)
    })
  })

  describe('getUserInfo 函数', () => {
    it('应该通过 userId 获取用户信息', async () => {
      const mockResponse = {
        success: true,
        result: {
          avatarUrl: 'https://example.com/avatar.jpg',
          id: 'user123',
          name: '测试用户',
        },
      }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      const data: GetUserInfo = { orgId: 'org123', userId: 'user123' }
      await getUserInfo(data)

      expect(tbServer.withTenant).toHaveBeenCalledWith('org123', 'organization')
      expect(tbServer.withQuery).toHaveBeenCalledWith({ userId: 'user123' })
      expect(tbServer.get).toHaveBeenCalledWith('user/info')
    })

    it('应该通过 email 获取用户信息', async () => {
      const mockResponse = {
        success: true,
        result: {
          avatarUrl: 'https://example.com/avatar.jpg',
          id: 'user123',
          name: '测试用户',
        },
      }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      const data: GetUserInfo = { orgId: 'org123', email: 'test@example.com' }
      await getUserInfo(data)

      expect(tbServer.withTenant).toHaveBeenCalledWith('org123', 'organization')
      expect(tbServer.withQuery).toHaveBeenCalledWith({ email: 'test@example.com' })
      expect(tbServer.get).toHaveBeenCalledWith('user/query')
    })

    it('应该在数据无效时抛出错误', () => {
      const invalidData = { orgId: 'org123' } as GetUserInfo
      expect(() => getUserInfo(invalidData)).toThrow('Invalid user info data')
    })

    it('应该正确处理 API 响应', async () => {
      const mockResponse = {
        success: true,
        result: {
          avatarUrl: 'https://example.com/avatar.jpg',
          id: 'user123',
          name: '测试用户',
        },
      }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      const data: GetUserInfo = { orgId: 'org123', userId: 'user123' }
      const result = await getUserInfo(data)

      expect(result).toEqual(mockResponse)
    })
  })
})

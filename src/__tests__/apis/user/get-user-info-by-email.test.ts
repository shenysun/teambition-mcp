import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import { getUserInfoByEmail, type GetUserInfoByEmail, getUserInfoByEmailSchema } from '../../../apis/user/get-user-info-by-email'
import { userInfoSchema } from '../../../apis/user/get-user-info-by-uid'

// Mock tbServer
vi.mock('../../../apis/request', () => ({
  tbServer: {
    withTenant: vi.fn().mockReturnThis(),
    withQuery: vi.fn().mockReturnThis(),
    get: vi.fn(),
  },
}))

describe('get-user-info-by-email.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('schema 验证', () => {
    it('getUserInfoByEmailSchema 应该验证通过 email 方式的数据', () => {
      const data = { orgId: 'org123', email: 'test@example.com' }
      const result = getUserInfoByEmailSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('getUserInfoByEmailSchema 应该拒绝无效数据', () => {
      const data = { orgId: 'org123' }
      const result = getUserInfoByEmailSchema.safeParse(data)
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

  describe('getUserInfoByEmail 函数', () => {
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

      const data: GetUserInfoByEmail = { orgId: 'org123', email: 'test@example.com' }
      await getUserInfoByEmail(data)

      expect(tbServer.withTenant).toHaveBeenCalledWith('org123', 'organization')
      expect(tbServer.withQuery).toHaveBeenCalledWith({ email: 'test@example.com' })
      expect(tbServer.get).toHaveBeenCalledWith('user/query')
    })

    it('应该使用默认的企业ID', async () => {
      const mockResponse = {
        success: true,
        result: {
          avatarUrl: 'https://example.com/avatar.jpg',
          id: 'user123',
          name: '测试用户',
        },
      }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      const data: GetUserInfoByEmail = { email: 'test@example.com' }
      await getUserInfoByEmail(data)

      // 这里假设 getOrgId() 返回的是一个默认值，实际测试中可能需要模拟 getOrgId
      expect(tbServer.withTenant).toHaveBeenCalled()
      expect(tbServer.withQuery).toHaveBeenCalledWith({ email: 'test@example.com' })
      expect(tbServer.get).toHaveBeenCalledWith('user/query')
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

      const data: GetUserInfoByEmail = { orgId: 'org123', email: 'test@example.com' }
      const result = await getUserInfoByEmail(data)

      expect(result).toEqual(mockResponse)
    })
  })
})

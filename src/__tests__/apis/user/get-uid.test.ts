import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../../apis/request'
import {
  getUserIdByEmail,
  type GetUserIdByEmail,
  getUserIdByEmailSchema,
  userIdSchema,
} from '../../../apis/user/get-uid'

// Mock tbServer
vi.mock('../../../apis/request', () => ({
  tbServer: {
    withTenant: vi.fn().mockReturnThis(),
    withQuery: vi.fn().mockReturnThis(),
    get: vi.fn(),
  },
}))

describe('get-uid.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('schema 验证', () => {
    it('getUserIdByEmailSchema 应该验证有效的邮箱数据', () => {
      const data = { email: 'test@example.com', orgId: 'org123' }
      const result = getUserIdByEmailSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('getUserIdByEmailSchema 应该拒绝缺少必填字段的数据', () => {
      const data = { email: 'test@example.com' }
      const result = getUserIdByEmailSchema.safeParse(data)
      expect(result.success).toBe(false)
    })

    it('getUserIdByEmailSchema 应该接受任何字符串作为邮箱', () => {
      const data = { email: 'invalid-email', orgId: 'org123' }
      const result = getUserIdByEmailSchema.safeParse(data)
      expect(result.success).toBe(true)
    })

    it('userIdSchema 应该验证用户ID结构', () => {
      const userId = { id: 'user123' }
      const result = userIdSchema.safeParse(userId)
      expect(result.success).toBe(true)
    })
  })

  describe('getUserIdByEmail 函数', () => {
    it('应该正确调用 API 获取用户ID', async () => {
      const mockResponse = {
        success: true,
        result: { id: 'user123' },
      }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      const data: GetUserIdByEmail = { email: 'test@example.com', orgId: 'org123' }
      await getUserIdByEmail(data)

      expect(tbServer.withTenant).toHaveBeenCalledWith('org123', 'organization')
      expect(tbServer.withQuery).toHaveBeenCalledWith({ email: 'test@example.com' })
      expect(tbServer.get).toHaveBeenCalledWith('user/getid')
    })

    it('应该返回正确的响应数据', async () => {
      const mockResponse = {
        success: true,
        result: { id: 'user123' },
        message: '获取成功',
      }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      const data: GetUserIdByEmail = { email: 'test@example.com', orgId: 'org123' }
      const result = await getUserIdByEmail(data)

      expect(result).toEqual(mockResponse)
    })

    it('应该处理 API 错误响应', async () => {
      const mockError = new Error('API Error')
      vi.mocked(tbServer.get).mockRejectedValue(mockError)

      const data: GetUserIdByEmail = { email: 'test@example.com', orgId: 'org123' }

      await expect(getUserIdByEmail(data)).rejects.toThrow('API Error')
    })

    it('应该使用正确的参数调用 withTenant 和 withQuery', async () => {
      const mockResponse = { success: true, result: { id: 'user123' } }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      const testData = { email: 'john.doe@company.com', orgId: 'company123' }
      await getUserIdByEmail(testData)

      expect(tbServer.withTenant).toHaveBeenCalledTimes(1)
      expect(tbServer.withTenant).toHaveBeenCalledWith('company123', 'organization')
      expect(tbServer.withQuery).toHaveBeenCalledTimes(1)
      expect(tbServer.withQuery).toHaveBeenCalledWith({ email: 'john.doe@company.com' })
    })
  })
})

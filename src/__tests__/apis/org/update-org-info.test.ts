import { beforeEach, describe, expect, it, vi } from 'vitest'
import { type UpdateOrgInfo, updateOrgInfo, updateOrgInfoSchema } from '../../../apis/org/update-org-info'
import { tbServer } from '../../../apis/request'

// Mock tbServer
vi.mock('../../../apis/request', () => ({
  tbServer: {
    withTenant: vi.fn().mockReturnThis(),
    post: vi.fn(),
  },
}))

describe('update-org-info.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('schema 验证', () => {
    it('orgInfoUpdateSchema 应该验证完整的更新数据', () => {
      const updateData = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '新的组织描述',
        isPublic: false,
        logo: 'https://example.com/new-logo.png',
        name: '新的组织名称',
        pinyin: 'xinzuzhi',
        py: 'xzz',
      }
      const result = updateOrgInfoSchema.safeParse(updateData)
      expect(result.success).toBe(true)
    })

    it('orgInfoUpdateSchema 应该验证部分更新数据', () => {
      const updateData = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '只更新描述',
      }
      const result = updateOrgInfoSchema.safeParse(updateData)
      expect(result.success).toBe(true)
    })

    it('orgInfoUpdateSchema 应该要求必填字段 operatorId 和 orgId', () => {
      const updateData = {
        description: '缺少必填字段',
      }
      const result = updateOrgInfoSchema.safeParse(updateData)
      expect(result.success).toBe(false)
    })

    it('orgInfoUpdateSchema 应该验证只有 orgId 的数据', () => {
      const updateData = {
        operatorId: 'operator123',
        orgId: 'org123',
      }
      const result = updateOrgInfoSchema.safeParse(updateData)
      expect(result.success).toBe(true)
    })

    it('orgInfoUpdateSchema 应该验证布尔值类型', () => {
      const updateData = {
        operatorId: 'operator123',
        orgId: 'org123',
        isPublic: 'not-boolean', // 错误的类型
      }
      const result = updateOrgInfoSchema.safeParse(updateData)
      expect(result.success).toBe(false)
    })
  })

  describe('updateOrgInfo 函数', () => {
    it('应该正确调用 API 更新组织信息', async () => {
      const mockResponse = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '更新后的描述',
        isPublic: true,
        logo: 'https://example.com/updated-logo.png',
        name: '更新后的名称',
        pinyin: 'gengxin',
        py: 'gx',
      }
      vi.mocked(tbServer.post).mockResolvedValue(mockResponse)

      const updateData: UpdateOrgInfo = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '更新后的描述',
        name: '更新后的名称',
      }

      await updateOrgInfo(updateData)

      expect(tbServer.withTenant).toHaveBeenCalledWith('org123', 'organization')
      expect(tbServer.post).toHaveBeenCalledWith('org/update', updateData)
    })

    it('应该返回更新后的组织信息', async () => {
      const mockResponse = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '更新后的描述',
        isPublic: false,
        logo: 'https://example.com/logo.png',
        name: '更新后的名称',
        pinyin: 'gengxin',
        py: 'gx',
      }
      vi.mocked(tbServer.post).mockResolvedValue(mockResponse)

      const updateData: UpdateOrgInfo = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '更新后的描述',
      }

      const result = await updateOrgInfo(updateData)

      expect(result).toEqual(mockResponse)
    })

    it('应该处理部分字段更新', async () => {
      const mockResponse = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '原描述',
        isPublic: false, // 只更新这个字段
        logo: 'https://example.com/original-logo.png',
        name: '原名称',
        pinyin: 'yuan',
        py: 'y',
      }
      vi.mocked(tbServer.post).mockResolvedValue(mockResponse)

      const updateData: UpdateOrgInfo = {
        operatorId: 'operator123',
        orgId: 'org123',
        isPublic: false,
      }

      await updateOrgInfo(updateData)

      expect(tbServer.withTenant).toHaveBeenCalledWith('org123', 'organization')
      expect(tbServer.post).toHaveBeenCalledWith('org/update', updateData)
    })

    it('应该处理 API 错误响应', async () => {
      const mockError = new Error('更新组织信息失败')
      vi.mocked(tbServer.post).mockRejectedValue(mockError)

      const updateData: UpdateOrgInfo = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '更新失败的描述',
      }

      await expect(updateOrgInfo(updateData)).rejects.toThrow('更新组织信息失败')
    })

    it('应该使用正确的组织ID设置租户', async () => {
      const mockResponse = {}
      vi.mocked(tbServer.post).mockResolvedValue(mockResponse)

      const updateData: UpdateOrgInfo = {
        operatorId: 'operator123',
        orgId: 'specific-org-id',
        name: '测试更新',
      }

      await updateOrgInfo(updateData)

      expect(tbServer.withTenant).toHaveBeenCalledTimes(1)
      expect(tbServer.withTenant).toHaveBeenCalledWith('specific-org-id', 'organization')
    })

    it('应该传递所有更新字段到 API', async () => {
      const mockResponse = {}
      vi.mocked(tbServer.post).mockResolvedValue(mockResponse)

      const updateData: UpdateOrgInfo = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '新描述',
        isPublic: true,
        logo: 'https://example.com/new-logo.png',
        name: '新名称',
        pinyin: 'xinmingcheng',
        py: 'xmc',
      }

      await updateOrgInfo(updateData)

      expect(tbServer.post).toHaveBeenCalledWith('org/update', updateData)
    })
  })
})

import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getOrgInfo, type OrgInfo, OrgInfoSchema } from '../../../apis/org/get-org-info'
import { tbServer } from '../../../apis/request'

// Mock tbServer
vi.mock('../../../apis/request', () => ({
  tbServer: {
    withTenant: vi.fn().mockReturnThis(),
    get: vi.fn(),
  },
}))

// Mock getOrgId 函数
vi.mock('../../../constants/env', () => ({
  getOrgId: vi.fn(() => 'default-org-id'),
}))

describe('get-org-info.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('schema 验证', () => {
    it('orgInfoSchema 应该验证有效的组织信息', () => {
      const orgInfo = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '测试组织',
        isPublic: true,
        logo: 'https://example.com/logo.png',
        name: '测试组织名称',
        pinyin: 'ceshi',
        py: 'cs',
      }
      const result = OrgInfoSchema.safeParse(orgInfo)
      expect(result.success).toBe(true)
    })

    it('orgInfoSchema 应该拒绝缺少必填字段的数据', () => {
      const orgInfo = {
        operatorId: 'operator123',
        orgId: 'org123',
        // 缺少其他必填字段
      }
      const result = OrgInfoSchema.safeParse(orgInfo)
      expect(result.success).toBe(false)
    })

    it('orgInfoSchema 应该验证布尔值字段', () => {
      const orgInfo = {
        operatorId: 'operator123',
        orgId: 'org123',
        description: '测试组织',
        isPublic: 'not-boolean', // 错误的类型
        logo: 'https://example.com/logo.png',
        name: '测试组织名称',
        pinyin: 'ceshi',
        py: 'cs',
      }
      const result = OrgInfoSchema.safeParse(orgInfo)
      expect(result.success).toBe(false)
    })
  })

  describe('getOrgInfo 函数', () => {
    it('应该使用提供的组织ID获取组织信息', async () => {
      const mockResponse = {
        success: true,
        result: {
          operatorId: 'operator123',
          orgId: 'org123',
          description: '测试组织',
          isPublic: true,
          logo: 'https://example.com/logo.png',
          name: '测试组织名称',
          pinyin: 'ceshi',
          py: 'cs',
        },
      }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      const orgId = 'custom-org-id'
      await getOrgInfo(orgId)

      expect(tbServer.withTenant).toHaveBeenCalledWith('custom-org-id', 'organization')
      expect(tbServer.get).toHaveBeenCalledWith('org/info')
    })

    it('应该使用默认组织ID获取组织信息', async () => {
      const mockResponse = {
        success: true,
        result: {
          operatorId: 'operator123',
          orgId: 'default-org-id',
          description: '默认组织',
          isPublic: false,
          logo: 'https://example.com/default-logo.png',
          name: '默认组织名称',
          pinyin: 'moren',
          py: 'mr',
        },
      }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      await getOrgInfo() // 不传参数，使用默认值

      expect(tbServer.withTenant).toHaveBeenCalledWith('default-org-id', 'organization')
      expect(tbServer.get).toHaveBeenCalledWith('org/info')
    })

    it('应该返回正确的响应数据', async () => {
      const mockResponse = {
        success: true,
        result: {
          operatorId: 'operator123',
          orgId: 'org123',
          description: '测试组织',
          isPublic: true,
          logo: 'https://example.com/logo.png',
          name: '测试组织名称',
          pinyin: 'ceshi',
          py: 'cs',
        },
      }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      const result = await getOrgInfo('org123')

      expect(result).toEqual(mockResponse)
    })

    it('应该处理 API 错误响应', async () => {
      const mockError = new Error('获取组织信息失败')
      vi.mocked(tbServer.get).mockRejectedValue(mockError)

      await expect(getOrgInfo('org123')).rejects.toThrow('获取组织信息失败')
    })

    it('应该正确设置租户信息', async () => {
      const mockResponse = { success: true, result: {} }
      vi.mocked(tbServer.get).mockResolvedValue(mockResponse)

      await getOrgInfo('test-org-123')

      expect(tbServer.withTenant).toHaveBeenCalledTimes(1)
      expect(tbServer.withTenant).toHaveBeenCalledWith('test-org-123', 'organization')
    })
  })
})

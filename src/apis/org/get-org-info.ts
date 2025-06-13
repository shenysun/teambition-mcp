import z from 'zod'
import { getOrgId } from '../../constants/env'
import { type TBResponse, TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

/**
 * 组织信息
 */
export const orgInfoSchema = z.object({
  operatorId: z.string().describe('操作用户ID'),
  orgId: z.string().describe('组织ID'),
  description: z.string().describe('组织描述'),
  isPublic: z.boolean().describe('是否公开'),
  logo: z.string().describe('组织logo'),
  name: z.string().describe('组织名称'),
  pinyin: z.string().describe('拼音'),
  py: z.string().describe('拼音缩写'),
})

export const orgInfoResponseSchema = TBResponseSchema(orgInfoSchema)
export type OrgInfo = z.infer<typeof orgInfoSchema>
export type OrgInfoResponse = TBResponse<OrgInfo>

export const getOrgInfoSchema = z.object({
  orgId: z.string().optional().describe('组织ID'),
})

export type GetOrgInfo = z.infer<typeof getOrgInfoSchema>

/**
 * 获取组织信息
 * @param data 请求参数
 * @returns 组织信息
 */
export function getOrgInfo(data: GetOrgInfo) {
  return tbServer
    .withTenant(data.orgId ?? getOrgId(), 'organization')
    .get<OrgInfoResponse>('org/info')
}

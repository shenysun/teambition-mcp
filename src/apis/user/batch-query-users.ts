import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { tbServer } from '../request'

export const batchQueryUsersSchema = z.object({
  ids: z.array(z.string()).optional().describe('用户 ID 数组，根据用户 ID 查询时必填'),
  openIds: z.array(z.string()).optional().describe('用户 openId 数组，根据 openId 查询时必填'),
  pageSize: z.number().optional().describe('分页大小，默认为 30， 最大为 1000'),
  pageToken: z.string().optional().describe('分页 token, 用于获取下一页数据'),
  orgId: z.string().optional().describe('组织ID'),
})

export const userDetailSchema = z.object({
  userId: z.string().describe('用户ID'),
  avatarUrl: z.string().describe('用户头像URL'),
  name: z.string().describe('用户昵称'),
  birthday: z.string().optional().describe('用户生日，需要用户授权'),
  email: z.string().optional().describe('用户email，需要用户授权'),
  location: z.string().optional().describe('用户位置，需要用户授权'),
  phone: z.string().optional().describe('用户手机号，需要用户授权'),
  title: z.string().optional().describe('用户职位'),
  openId: z.string().optional().describe('openId'),
})

export type BatchQueryUsers = z.infer<typeof batchQueryUsersSchema>
export type UserDetail = z.infer<typeof userDetailSchema>
export type BatchQueryUsersResponse = TBResponse<UserDetail[]>

export function batchQueryUsers(data: BatchQueryUsers) {
  // 至少需要提供ids或openIds中的一个
  if (!data.ids && !data.openIds) {
    throw new Error('必须提供 ids 或 openIds 参数')
  }

  const requestBody = {
    ids: data.ids,
    openIds: data.openIds,
    pageSize: data.pageSize,
    pageToken: data.pageToken,
  }

  return tbServer
    .withTenant(data.orgId ?? getOrgId(), 'organization')
    .post<BatchQueryUsersResponse>('user/batchQuery', requestBody)
}

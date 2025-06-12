import type { Data } from '../../types/common'
import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants'
import { tbServer } from '../request'

export const GetUserInfoByUidSchema = z.object({
  userId: z.string().describe('用户ID'),
  orgId: z.string().optional().describe('组织ID'),
})

export const GetUserInfoByEmailSchema = z.object({
  email: z.string().describe('用户邮箱'),
  orgId: z.string().optional().describe('组织ID'),
})

export const GetUserInfoSchema = z.union([GetUserInfoByUidSchema, GetUserInfoByEmailSchema])

export const UserInfoSchema = z.object({
  avatarUrl: z.string().describe('头像URL'),
  id: z.string().describe('用户ID'),
  name: z.string().describe('用户名'),
})

export type GetUserInfoByUid = z.infer<typeof GetUserInfoByUidSchema>
export type GetUserInfoByEmail = z.infer<typeof GetUserInfoByEmailSchema>
export type GetUserInfo = z.infer<typeof GetUserInfoSchema>
export type UserInfo = z.infer<typeof UserInfoSchema>
export type UserInfoResponse = TBResponse<UserInfo>

export function getUserInfo(data: GetUserInfo) {
  const query: Data = {}
  let path = ''
  const parseResult = GetUserInfoSchema.safeParse(data)
  if (!parseResult.success) {
    throw new Error('Invalid user info data')
  }

  const validData = parseResult.data
  // 通过属性检查判断类型
  if ('userId' in validData) {
    query.userId = validData.userId
    path = 'user/info'
  }
  else {
    query.email = validData.email
    path = 'user/query'
  }

  return tbServer
    .withTenant(data.orgId ?? getOrgId(), 'organization')
    .withQuery(query)
    .get<UserInfoResponse>(path)
}

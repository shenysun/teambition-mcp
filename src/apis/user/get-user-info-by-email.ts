import type { TBResponse } from '../../types/response'
import type { userInfoSchema } from './get-user-info-by-uid'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { tbServer } from '../request'

// 通过邮箱获取用户信息的请求参数模式
export const getUserInfoByEmailSchema = z.object({
  email: z.string().describe('用户邮箱'),
  orgId: z.string().optional().describe('企业ID'),
})

export type GetUserInfoByEmail = z.infer<typeof getUserInfoByEmailSchema>
export type UserInfo = z.infer<typeof userInfoSchema>
export type UserInfoResponse = TBResponse<UserInfo>

/**
 * 通过用户邮箱获取用户信息
 * @param data 请求参数
 * @returns 用户信息
 */
export function getUserInfoByEmail(data: GetUserInfoByEmail) {
  return tbServer
    .withTenant(data.orgId ?? getOrgId(), 'organization')
    .withQuery({ email: data.email })
    .get<UserInfoResponse>('user/query')
}

import type { UserInfoResponse } from './get-user-info-by-email'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { tbServer } from '../request'

// 通过用户ID获取用户信息的请求参数模式
export const getUserInfoByUidSchema = z.object({
  userId: z.string().describe('用户ID'),
  orgId: z.string().optional().describe('企业ID'),
})

// 用户信息模式
export const userInfoSchema = z.object({
  avatarUrl: z.string().describe('头像URL'),
  id: z.string().describe('用户ID'),
  name: z.string().describe('用户名'),
})

export type GetUserInfoByUid = z.infer<typeof getUserInfoByUidSchema>

/**
 * 通过用户ID获取用户信息
 * @param data 请求参数
 * @returns 用户信息
 */
export function getUserInfoByUid(data: GetUserInfoByUid) {
  return tbServer
    .withTenant(data.orgId ?? getOrgId(), 'organization')
    .withQuery({ userId: data.userId })
    .get<UserInfoResponse>('user/info')
}

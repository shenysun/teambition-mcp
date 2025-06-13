import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { tbServer } from '../request'

export const GetUserPreferencesSchema = z.object({
  userId: z.string().describe('用户ID'),
  orgId: z.string().optional().describe('组织ID'),
})

export const UserPreferencesSchema = z.object({
  userId: z.string().describe('用户ID'),
  language: z.string().describe('用户所选展示语言'),
  lastWorkspace: z.string().describe('用户最后使用的工作空间'),
})

export type GetUserPreferences = z.infer<typeof GetUserPreferencesSchema>
export type UserPreferences = z.infer<typeof UserPreferencesSchema>
export type UserPreferencesResponse = TBResponse<UserPreferences>

export function getUserPreferences(data: GetUserPreferences) {
  return tbServer
    .withTenant(data.orgId ?? getOrgId(), 'organization')
    .withQuery({
      userId: data.userId,
    })
    .get<UserPreferencesResponse>('user/preferences')
}

import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { tbServer } from '../request'

export const GetUserIdByEmailSchema = z.object({
  email: z.string().describe('查询用户邮箱'),
  orgId: z.string().describe('组织ID'),
})

export const UserIdSchema = z.object({
  id: z.string().describe('用户ID'),
})

export type GetUserIdByEmail = z.infer<typeof GetUserIdByEmailSchema>
export type UserId = z.infer<typeof UserIdSchema>
export type UserIdResponse = TBResponse<UserId>

export function getUserIdByEmail(data: GetUserIdByEmail) {
  return tbServer
    .withTenant(data.orgId ?? getOrgId(), 'organization')
    .withQuery({ email: data.email })
    .get<UserIdResponse>(`user/getid`)
}

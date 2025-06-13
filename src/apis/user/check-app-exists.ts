import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { tbServer } from '../request'

export const checkAppExistsSchema = z.object({
  userIds: z.array(z.string()).describe('用户 ID 数组'),
  orgId: z.string().optional().describe('企业ID'),
})

export type CheckAppExists = z.infer<typeof checkAppExistsSchema>
export type AppExistsResult = Record<string, boolean>
export type AppExistsResponse = TBResponse<AppExistsResult>

export function checkAppExists(data: CheckAppExists) {
  return tbServer
    .withTenant(data.orgId ?? getOrgId(), 'organization')
    .post<AppExistsResponse>('user/app/exists', {
      userIds: data.userIds,
    })
}

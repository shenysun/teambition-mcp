import type { z } from 'zod'
import type { OrgInfo, OrgInfoResponse } from './get-org-info'
import { getOrgId } from '../../constants'
import { tbServer } from '../request'
import { OrgInfoSchema } from './get-org-info'

/**
 * 更新组织信息
 */
export const UpdateOrgInfoSchema = OrgInfoSchema.partial({
  orgId: true,
  description: true,
  isPublic: true,
  logo: true,
  name: true,
  pinyin: true,
  py: true,
})

export type UpdateOrgInfo = z.infer<typeof UpdateOrgInfoSchema>

/**
 * 更新组织信息
 * @param data 更新数据
 * @returns 更新后的组织信息
 */
export function updateOrgInfo(data: UpdateOrgInfo) {
  if (!data.orgId) {
    data.orgId = getOrgId()
  }

  return tbServer
    .withTenant(data.orgId, 'organization')
    .post<OrgInfoResponse>('org/update', data)
}

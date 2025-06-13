import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { tbServer } from '../request'

export const QueryIdMapSchema = z.object({
  refer: z.string().describe('绑定的类型，如 dingTalk-corp, dingTalk-team, dingTalk-user'),
  tbId: z.string().optional().describe('用户在 Teambition 中的用户 ID'),
  refId: z.string().optional().describe('绑定关系标识符，比如钉钉企业的 corpId'),
  extraUserId: z.string().optional().describe('tb 方绑定的 id，比如钉钉平台返回的用户 staffId'),
  orgId: z.string().optional().describe('组织ID'),
})

export const IdMapExtraSchema = z.object({
  userId: z.string().optional().describe('tb 方绑定的 id，比如钉钉平台返回的用户 staffId'),
}).passthrough()

export const IdMapItemSchema = z.object({
  id: z.string().describe('IDMap ID'),
  tbId: z.string().describe('绑定的 tbId'),
  refId: z.string().describe('绑定关系 ID'),
  refer: z.string().describe('绑定关系'),
  extra: IdMapExtraSchema.describe('第三方信息，返回对象内参数不统一'),
})

export type QueryIdMap = z.infer<typeof QueryIdMapSchema>
export type IdMapExtra = z.infer<typeof IdMapExtraSchema>
export type IdMapItem = z.infer<typeof IdMapItemSchema>
export type QueryIdMapResponse = TBResponse<IdMapItem[]>

export function queryIdMap(data: QueryIdMap) {
  return tbServer
    .withTenant(data.orgId ?? getOrgId(), 'organization')
    .withQuery({
      refer: data.refer,
      tbId: data.tbId,
      refId: data.refId,
      extraUserId: data.extraUserId,
    })
    .get<QueryIdMapResponse>('idmap/query')
}

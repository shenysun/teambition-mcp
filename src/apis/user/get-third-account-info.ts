import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { tbServer } from '../request'

export const getThirdAccountInfoSchema = z.object({
  openId: z.string().describe('三方账号 ID'),
  refer: z.string().describe('三方账号来源'),
  orgId: z.string().optional().describe('组织ID'),
})

export const thirdAccountInfoSchema = z.object({
  id: z.string().describe('绑定关系存储模型 ID'),
  userId: z.string().describe('用户 ID'),
  openId: z.string().describe('三方账号 ID'),
  refer: z.string().describe('绑定关系'),
  extra: z.record(z.any()).optional().describe('其他信息'),
  showname: z.string().describe('用户名称'),
  created: z.string().describe('创建时间'),
  updated: z.string().describe('更新时间'),
})

export type GetThirdAccountInfo = z.infer<typeof getThirdAccountInfoSchema>
export type ThirdAccountInfo = z.infer<typeof thirdAccountInfoSchema>
export type ThirdAccountInfoResponse = TBResponse<ThirdAccountInfo>

export function getThirdAccountInfo(data: GetThirdAccountInfo) {
  return tbServer
    .withTenant(data.orgId ?? getOrgId(), 'organization')
    .withQuery({
      openId: data.openId,
      refer: data.refer,
    })
    .get<ThirdAccountInfoResponse>('user/thirdAccount/info')
}

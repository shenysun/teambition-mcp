import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { tbServer } from '../request'

export const getUserByUniqueFieldSchema = z.object({
  selectBy: z.enum(['_id', 'openId', 'username', 'email', 'phone']).describe('查询参数类型'),
  value: z.string().describe('查询参数值'),
})

export const userEmailSchema = z.object({
  id: z.string().describe('用户ID'),
  email: z.string().describe('用户邮箱'),
  openId: z.string().describe('用户OpenId'),
  state: z.number().describe('邮箱认证状态'),
})

export const userByUniqueFieldSchema = z.object({
  id: z.string().optional().describe('用户ID'),
  avatarUrl: z.string().optional().describe('用户头像URL'),
  dingUid: z.number().optional().describe('钉钉UID'),
  email: z.string().optional().describe('用户邮箱'),
  emails: z.array(userEmailSchema).optional().describe('邮箱列表'),
  employeeId: z.string().optional().describe('员工ID'),
  isBlock: z.number().optional().describe('是否冻结'),
  name: z.string().optional().describe('用户昵称'),
  openId: z.string().optional().describe('OpenID'),
  phone: z.string().optional().describe('用户手机号'),
  username: z.string().optional().describe('用户名'),
})

export type GetUserByUniqueField = z.infer<typeof getUserByUniqueFieldSchema>
export type UserEmail = z.infer<typeof userEmailSchema>
export type UserByUniqueField = z.infer<typeof userByUniqueFieldSchema>
export type UserByUniqueFieldResponse = TBResponse<UserByUniqueField>

export function getUserByUniqueField(data: GetUserByUniqueField) {
  return tbServer
    .withQuery({
      selectBy: data.selectBy,
      value: data.value,
    })
    .get<UserByUniqueFieldResponse>('user/info/byUniqueField')
}

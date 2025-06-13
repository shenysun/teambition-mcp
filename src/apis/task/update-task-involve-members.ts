import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务参与者的请求参数模式
export const updateTaskInvolveMembersParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  involveMembers: z.array(z.string()).optional().describe('更新任务参与者列表'),
  addInvolvers: z.array(z.string()).optional().describe('新增参与者列表'),
  delInvolvers: z.array(z.string()).optional().describe('移除参与者列表'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知'),
})

// 更新任务参与者响应模式
export const updateTaskInvolveMembersResponseSchema = TBResponseSchema(
  z.object({
    involveMembers: z.array(z.string()).describe('参与者列表'),
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskInvolveMembersParams = z.infer<typeof updateTaskInvolveMembersParamsSchema>
export type UpdateTaskInvolveMembersResponse = TBResponse<{
  involveMembers: string[]
  updated: string
}>

/**
 * 更新任务参与者
 * @param params 更新任务参与者参数
 * @returns 更新结果
 */
export async function updateTaskInvolveMembers(params: UpdateTaskInvolveMembersParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskInvolveMembersResponse>(`/gateway/v3/task/${taskId}/involveMembers`, bodyParams)
}

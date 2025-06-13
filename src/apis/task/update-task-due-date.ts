import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务截止时间的请求参数模式
export const updateTaskDueDateParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  dueDate: z.string().optional().describe('截止时间'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知'),
})

// 更新任务截止时间响应模式
export const updateTaskDueDateResponseSchema = TBResponseSchema(
  z.object({
    dueDate: z.string().optional().describe('截止时间'),
    updated: z.string().optional().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskDueDateParams = z.infer<typeof updateTaskDueDateParamsSchema>
export type UpdateTaskDueDateResponse = TBResponse<{
  dueDate?: string
  updated?: string
}>

/**
 * 更新任务截止时间
 * @param params 更新任务截止时间参数
 * @returns 更新结果
 */
export async function updateTaskDueDate(params: UpdateTaskDueDateParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskDueDateResponse>(`/gateway/v3/task/${taskId}/dueDate`, bodyParams)
}

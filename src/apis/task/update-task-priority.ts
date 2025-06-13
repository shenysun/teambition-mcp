import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务优先级的请求参数模式
export const updateTaskPriorityParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  priority: z.number().int().optional().describe('优先级'),
})

// 更新任务优先级响应模式
export const updateTaskPriorityResponseSchema = TBResponseSchema(
  z.object({
    priority: z.number().int().describe('优先级'),
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskPriorityParams = z.infer<typeof updateTaskPriorityParamsSchema>
export type UpdateTaskPriorityResponse = TBResponse<{
  priority: number
  updated: string
}>

/**
 * 更新任务优先级
 * @param params 更新任务优先级参数
 * @returns 更新结果
 */
export async function updateTaskPriority(params: UpdateTaskPriorityParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskPriorityResponse>(`/v3/task/${taskId}/priority`, bodyParams)
}

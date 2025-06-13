import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务开始时间的请求参数模式
export const updateTaskStartDateParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  startDate: z.string().optional().describe('开始时间'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知'),
})

// 更新任务开始时间响应模式
export const updateTaskStartDateResponseSchema = TBResponseSchema(
  z.object({
    startDate: z.string().optional().describe('开始时间'),
    updated: z.string().optional().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskStartDateParams = z.infer<typeof updateTaskStartDateParamsSchema>
export type UpdateTaskStartDateResponse = TBResponse<{
  startDate?: string
  updated?: string
}>

/**
 * 更新任务开始时间
 * @param params 更新任务开始时间参数
 * @returns 更新结果
 */
export async function updateTaskStartDate(params: UpdateTaskStartDateParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskStartDateResponse>(`/gateway/v3/task/${taskId}/startDate`, bodyParams)
}

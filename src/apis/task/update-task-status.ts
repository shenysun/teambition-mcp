import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务状态的请求参数模式
export const updateTaskStatusParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  taskflowstatusId: z.string().optional().describe('任务状态ID'),
  tfsUpdateNote: z.string().optional().describe('任务流转说明'),
  orgId: z.string().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
})

// 更新任务状态响应模式
export const updateTaskStatusResponseSchema = TBResponseSchema(
  z.object({
    taskflowstatusId: z.string().describe('任务状态ID'),
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskStatusParams = z.infer<typeof updateTaskStatusParamsSchema>
export type UpdateTaskStatusResponse = TBResponse<{
  taskflowstatusId: string
  updated: string
}>

/**
 * 更新任务状态
 * @param params 更新任务状态参数
 * @returns 更新结果
 */
export async function updateTaskStatus(params: UpdateTaskStatusParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskStatusResponse>(`/gateway/v3/task/${taskId}/taskflowstatus`, bodyParams)
}

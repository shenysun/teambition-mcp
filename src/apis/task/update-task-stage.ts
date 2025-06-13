import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务列表的请求参数模式
export const updateTaskStageParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  stageId: z.string().describe('任务列表ID'),
})

// 更新任务列表响应模式
export const updateTaskStageResponseSchema = TBResponseSchema(
  z.object({
    id: z.string().describe('任务ID'),
    stageId: z.string().describe('任务列ID'),
    updated: z.string().describe('更新时间(UTC)'),
  }),
)

// 响应类型
export type UpdateTaskStageResponse = TBResponse<{
  id: string
  stageId: string
  updated: string
}>

/**
 * 更新任务列表
 * @param params 更新任务列表参数
 * @returns 更新结果
 */
export async function updateTaskStage(params: z.infer<typeof updateTaskStageParamsSchema>) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskStageResponse>(`/v3/task/${taskId}/stage/update`, bodyParams)
}

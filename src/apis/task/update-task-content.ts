import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务标题的请求参数模式
export const updateTaskContentParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  content: z.string().optional().describe('任务标题'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
})

// 更新任务标题响应模式
export const updateTaskContentResponseSchema = TBResponseSchema(
  z.object({
    content: z.string().describe('任务标题'),
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskContentParams = z.infer<typeof updateTaskContentParamsSchema>
export type UpdateTaskContentResponse = TBResponse<{
  content: string
  updated: string
}>

/**
 * 更新任务标题
 * @param params 更新任务标题参数
 * @returns 更新结果
 */
export async function updateTaskContent(params: UpdateTaskContentParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskContentResponse>(`/gateway/v3/task/${taskId}/content`, bodyParams)
}

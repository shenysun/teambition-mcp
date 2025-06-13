import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务进度的请求参数模式
export const updateTaskProgressParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  progress: z.number().int().optional().describe('进度'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知'),
})

// 更新任务进度响应模式
export const updateTaskProgressResponseSchema = TBResponseSchema(
  z.object({
    progress: z.number().int().describe('进度'),
    updated: z.string().optional().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskProgressParams = z.infer<typeof updateTaskProgressParamsSchema>
export type UpdateTaskProgressResponse = TBResponse<{
  progress: number
  updated?: string
}>

/**
 * 更新任务进度
 * @param params 更新任务进度参数
 * @returns 更新结果
 */
export async function updateTaskProgress(params: UpdateTaskProgressParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskProgressResponse>(`/gateway/v3/task/${taskId}/progress`, bodyParams)
}

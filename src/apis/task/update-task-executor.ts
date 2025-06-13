import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务执行者的请求参数模式
export const updateTaskExecutorParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  executorId: z.string().optional().describe('执行者用户ID'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者用户ID'),
})

// 更新任务执行者响应模式
export const updateTaskExecutorResponseSchema = TBResponseSchema(
  z.object({
    executorId: z.string().describe('执行者用户ID'),
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskExecutorParams = z.infer<typeof updateTaskExecutorParamsSchema>
export type UpdateTaskExecutorResponse = TBResponse<{
  executorId: string
  updated: string
}>

/**
 * 更新任务执行者
 * @param params 更新任务执行者参数
 * @returns 更新结果
 */
export async function updateTaskExecutor(params: UpdateTaskExecutorParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskExecutorResponse>(`/gateway/v3/task/${taskId}/executor`, bodyParams)
}

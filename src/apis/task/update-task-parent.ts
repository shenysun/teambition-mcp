import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务父任务的请求参数模式
export const updateTaskParentParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  targetId: z.string().optional().describe('目标任务ID'),
})

// 更新任务父任务响应模式
export const updateTaskParentResponseSchema = TBResponseSchema(
  z.object({
    id: z.string().describe('任务 ID'),
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskParentResponse = TBResponse<{
  id: string
  updated: string
}>

/**
 * 改变任务的父任务
 * @param params 更新任务父任务参数
 * @returns 更新结果
 */
export async function updateTaskParent(params: z.infer<typeof updateTaskParentParamsSchema>) {
  const { taskId, orgId = getOrgId(), ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .put<UpdateTaskParentResponse>(`/v3/task/${taskId}/parent`, bodyParams)
}

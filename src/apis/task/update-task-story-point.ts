import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务StoryPoint的请求参数模式
export const updateTaskStoryPointParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  storyPoint: z.string().optional().describe('StoryPoint'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知'),
})

// 更新任务StoryPoint响应模式
export const updateTaskStoryPointResponseSchema = TBResponseSchema(
  z.object({
    storyPoint: z.string().describe('StoryPoint'),
    updated: z.string().optional().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskStoryPointResponse = TBResponse<{
  storyPoint: string
  updated?: string
}>

/**
 * 更新任务StoryPoint
 * @param params 更新任务StoryPoint参数
 * @returns 更新结果
 */
export async function updateTaskStoryPoint(params: z.infer<typeof updateTaskStoryPointParamsSchema>) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskStoryPointResponse>(`/v3/task/${taskId}/storyPoint`, bodyParams)
}

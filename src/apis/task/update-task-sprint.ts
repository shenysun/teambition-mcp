import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务迭代的请求参数模式
export const updateTaskSprintParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  sprintId: z.string().optional().describe('任务迭代ID'),
})

// 更新任务迭代响应模式
export const updateTaskSprintResponseSchema = TBResponseSchema(
  z.object({
    id: z.string().describe('任务ID'),
    sprintId: z.string().describe('任务SprintId'),
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskSprintResponse = TBResponse<{
  id: string
  sprintId: string
  updated: string
}>

/**
 * 更新任务迭代
 * @param params 更新任务迭代参数
 * @returns 更新结果
 */
export async function updateTaskSprint(params: z.infer<typeof updateTaskSprintParamsSchema>) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskSprintResponse>(`/v3/task/${taskId}/sprint`, bodyParams)
}

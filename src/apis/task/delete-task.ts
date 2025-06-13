import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 删除任务的请求参数模式
export const deleteTaskParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
})

// 删除任务响应模式
export const deleteTaskResponseSchema = TBResponseSchema(
  z.object({}),
)

// 响应类型
export type DeleteTaskParams = z.infer<typeof deleteTaskParamsSchema>
export type DeleteTaskResponse = TBResponse<Record<string, never>>

/**
 * 删除任务
 * @param params 删除任务参数
 * @returns 删除结果
 */
export async function deleteTask(params: DeleteTaskParams) {
  const { taskId, orgId = getOrgId(), operatorId } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .post<DeleteTaskResponse>(`/v3/task/${taskId}/delete`, {})
}

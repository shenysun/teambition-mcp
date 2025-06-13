import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'
import { taskSchema } from './query-task'

// 移动任务的请求参数模式
export const moveTaskParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  projectId: z.string().describe('项目ID'),
  tfsId: z.string().optional().describe('任务状态ID'),
  sfcId: z.string().optional().describe('任务类型ID'),
  stageId: z.string().optional().describe('任务列表ID'),
  tasklistId: z.string().optional().describe('任务分组ID'),
})

// 移动任务响应模式
export const moveTaskResponseSchema = TBResponseSchema(taskSchema)

// 响应类型
export type MoveTaskResponse = TBResponse<z.infer<typeof taskSchema>>

/**
 * 跨项目移动任务
 * @param params 移动任务参数
 * @returns 移动后的任务数据
 */
export async function moveTask(params: z.infer<typeof moveTaskParamsSchema>) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<MoveTaskResponse>(`/v3/task/${taskId}/move`, bodyParams)
}

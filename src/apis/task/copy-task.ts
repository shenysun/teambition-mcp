import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'
import { taskSchema } from './query-task'

// 复制任务的请求参数模式
export const copyTaskParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  tfsId: z.string().optional().describe('任务状态ID'),
  projectId: z.string().optional().describe('项目ID'),
  copyFields: z.array(z.string()).optional().describe('复制后保留的数据'),
})

// 复制任务响应模式
export const copyTaskResponseSchema = TBResponseSchema(taskSchema)

// 响应类型
export type CopyTaskResponse = TBResponse<z.infer<typeof taskSchema>>

/**
 * 复制任务（仅支持工作流项目）
 * @param params 复制任务参数
 * @returns 复制后的任务数据
 */
export async function copyTask(params: z.infer<typeof copyTaskParamsSchema>) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<CopyTaskResponse>(`/v3/task/${taskId}/copy`, bodyParams)
}

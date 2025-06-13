import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 获取任务状态列表的请求参数模式
export const getTaskFlowStatusParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().optional().describe('操作者ID'),
})

// 任务状态模式
export const taskStatusSchema = z.object({
  id: z.string().describe('状态ID'),
  name: z.string().describe('状态名称'),
  kind: z.string().describe('状态阶段'),
  pos: z.string().describe('自定义排序'),
  rejectStatusIds: z.array(z.string()).optional(),
  isDeleted: z.boolean().describe('是否删除'),
  isTaskflowstatusruleexector: z.boolean().optional(),
  taskflowId: z.string().describe('工作流ID'),
  creatorId: z.string().describe('创建人ID'),
})

// 获取任务状态列表响应模式
export const getTaskFlowStatusResponseSchema = TBResponseSchema(z.array(taskStatusSchema))

// 响应类型
export type TaskStatusSchema = z.infer<typeof taskStatusSchema>
export type GetTaskFlowStatusResponse = TBResponse<TaskStatusSchema[]>

/**
 * 查询任务所在工作流的任务状态列表
 * @param params 查询参数
 * @returns 任务状态列表
 */
export async function getTaskFlowStatus(params: z.infer<typeof getTaskFlowStatusParamsSchema>) {
  const { taskId, orgId = getOrgId(), operatorId } = params

  let request = tbServer.withTenant(orgId, 'organization')

  if (operatorId) {
    request = request.withOperator(operatorId)
  }

  return request
    .get<GetTaskFlowStatusResponse>(`/v3/task/${taskId}/flow-tfs`)
}

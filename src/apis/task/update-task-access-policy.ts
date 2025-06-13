import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务锁定动作的请求参数模式
export const updateTaskAccessPolicyParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  accessPolicy: z.object({
    visible: z.boolean().optional().describe('是否锁定可见性'),
    involveMembers: z.boolean().optional().describe('是否锁定参与者'),
    executor: z.boolean().optional().describe('是否锁定执行者'),
    dueDate: z.boolean().optional().describe('是否锁定截止时间'),
    startDate: z.boolean().optional().describe('是否锁定开始时间'),
    priority: z.boolean().optional().describe('是否锁定优先级'),
    tag: z.boolean().optional().describe('是否锁定标签'),
    content: z.boolean().optional().describe('是否锁定标题'),
    note: z.boolean().optional().describe('是否锁定备注'),
    storyPoint: z.boolean().optional().describe('是否锁定StoryPoint'),
    sprint: z.boolean().optional().describe('是否锁定迭代'),
    taskflowstatus: z.boolean().optional().describe('是否锁定任务状态'),
    customfield: z.boolean().optional().describe('是否锁定自定义字段'),
  }).describe('锁定动作策略'),
})

// 更新任务锁定动作响应模式
export const updateTaskAccessPolicyResponseSchema = TBResponseSchema(
  z.object({}),
)

// 响应类型
export type UpdateTaskAccessPolicyResponse = TBResponse<Record<string, never>>

/**
 * 更新任务锁定动作
 * @param params 更新任务锁定动作参数
 * @returns 更新结果
 */
export async function updateTaskAccessPolicy(params: z.infer<typeof updateTaskAccessPolicyParamsSchema>) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskAccessPolicyResponse>(`/v3/task/${taskId}/access-policy/update`, bodyParams)
}

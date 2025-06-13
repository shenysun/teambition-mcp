import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务可见性的请求参数模式
export const updateTaskVisibleParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  visible: z.string().optional().describe('任务可见性 involves = 隐私任务 members = 公开任务'),
  disableActivity: z.boolean().optional().describe('是否忽略触发动态'),
  disableNotification: z.boolean().optional().describe('是否忽略触发通知'),
})

// 更新任务可见性响应模式
export const updateTaskVisibleResponseSchema = TBResponseSchema(
  z.object({
    visible: z.string().describe('可见性'),
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskVisibleResponse = TBResponse<{
  visible: string
  updated: string
}>

/**
 * 更新任务可见性
 * @param params 更新任务可见性参数
 * @returns 更新结果
 */
export async function updateTaskVisible(params: z.infer<typeof updateTaskVisibleParamsSchema>) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .post<UpdateTaskVisibleResponse>(`/v3/task/${taskId}/visible/update`, bodyParams)
}

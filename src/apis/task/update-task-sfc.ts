import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务类型的请求参数模式
export const updateTaskSfcParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  sfcId: z.string().describe('目标任务类型ID，更新类型时会同时改变状态到目标任务类型绑定的工作流状态'),
  tfsId: z.string().optional().describe('指定目标工作流状态ID（可选）'),
})

// 更新任务类型响应模式
export const updateTaskSfcResponseSchema = TBResponseSchema(
  z.object({
    id: z.string().describe('任务ID'),
    scenariofieldconfigId: z.string().describe('任务类型ID'),
    taskflowstatusId: z.string().describe('任务状态ID'),
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskSfcResponse = TBResponse<{
  id: string
  scenariofieldconfigId: string
  taskflowstatusId: string
  updated: string
}>

/**
 * 更新任务的任务类型
 * @param params 更新任务类型参数
 * @returns 更新结果
 */
export async function updateTaskSfc(params: z.infer<typeof updateTaskSfcParamsSchema>) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskSfcResponse>(`/v3/task/${taskId}/sfc/update`, bodyParams)
}

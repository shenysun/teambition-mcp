import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务备注的请求参数模式
export const updateTaskNoteParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  note: z.string().optional().describe('任务备注'),
})

// 更新任务备注响应模式
export const updateTaskNoteResponseSchema = TBResponseSchema(
  z.object({
    note: z.string().describe('任务备注'),
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskNoteParams = z.infer<typeof updateTaskNoteParamsSchema>
export type UpdateTaskNoteResponse = TBResponse<{
  note: string
  updated: string
}>

/**
 * 更新任务备注
 * @param params 更新任务备注参数
 * @returns 更新结果
 */
export async function updateTaskNote(params: UpdateTaskNoteParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskNoteResponse>(`/gateway/v3/task/${taskId}/note`, bodyParams)
}

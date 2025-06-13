import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 归档任务的请求参数模式
export const archiveTaskParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
})

// 归档任务响应模式
export const archiveTaskResponseSchema = TBResponseSchema(
  z.object({
    updated: z.string().describe('更新时间'),
  }),
)

// 响应类型
export type ArchiveTaskParams = z.infer<typeof archiveTaskParamsSchema>
export type ArchiveTaskResponse = TBResponse<{
  updated: string
}>

/**
 * 归档任务(移入回收站)
 * @param params 归档任务参数
 * @returns 归档结果
 */
export async function archiveTask(params: ArchiveTaskParams) {
  const { taskId, orgId = getOrgId(), operatorId } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<ArchiveTaskResponse>(`/gateway/v3/task/${taskId}/archive`, {})
}

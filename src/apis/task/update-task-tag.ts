import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 更新任务标签的请求参数模式
export const updateTaskTagParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('操作者ID'),
  tagIds: z.array(z.string()).optional().describe('替换的标签ID集合'),
  delTagIds: z.array(z.string()).optional().describe('删除的标签ID集合'),
  addTagIds: z.array(z.string()).optional().describe('新增的标签ID集合'),
})

// 更新任务标签响应模式
export const updateTaskTagResponseSchema = TBResponseSchema(
  z.object({
    tagIds: z.array(z.string()).describe('标签ID集合'),
    updated: z.string().optional().describe('更新时间'),
  }),
)

// 响应类型
export type UpdateTaskTagParams = z.infer<typeof updateTaskTagParamsSchema>
export type UpdateTaskTagResponse = TBResponse<{
  tagIds: string[]
  updated?: string
}>

/**
 * 更新任务标签
 * @param params 更新任务标签参数
 * @returns 更新结果
 */
export async function updateTaskTag(params: UpdateTaskTagParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .put<UpdateTaskTagResponse>(`/v3/task/${taskId}/tag`, bodyParams)
}

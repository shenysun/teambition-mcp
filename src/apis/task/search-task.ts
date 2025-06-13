import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 搜索任务的请求参数模式
export const searchTaskParamsSchema = z.object({
  tql: z.string().optional().describe('企业下任务搜索TQL语句 参考 TQL查询文档'),
  pageSize: z.number().int().optional().describe('分页长度'),
  pageToken: z.string().optional().describe('分页标'),
  orgId: z.string().optional().describe('企业ID'),
})

// 搜索任务响应模式
export const searchTaskResponseSchema = TBResponseSchema(z.array(z.string()))
  .extend({
    totalSize: z.number().int().describe('任务总数'),
    nextPageToken: z.string().describe('分页标'),
  })

// 响应类型
export type SearchTaskParams = z.infer<typeof searchTaskParamsSchema>
export type SearchTaskResponse = TBResponse<string[]> & {
  totalSize: number
  nextPageToken: string
}

/**
 * 通过TQL搜索任务ID
 * @param params 搜索任务参数
 * @returns 任务ID列表
 */
export async function searchTask(params: SearchTaskParams) {
  const { orgId = getOrgId(), ...queryParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withQuery(queryParams)
    .get<SearchTaskResponse>('/all-task/search')
}

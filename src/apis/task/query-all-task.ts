import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'
import { taskSchema } from './query-task'

// 查询自由任务和项目任务的请求参数模式
export const queryAllTaskParamsSchema = z.object({
  taskId: z.string().describe('任务ID集合,使用逗号分隔'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().optional().describe('查询人ID, 如果存在会检查该成员可见的任务'),
})

// 查询自由任务和项目任务响应模式
export const queryAllTaskResponseSchema = TBResponseSchema(z.array(taskSchema))

// 响应类型
export type QueryAllTaskResponse = TBResponse<z.infer<typeof taskSchema>[]>

/**
 * 查询自由任务和项目任务详情
 * @param params 查询参数
 * @returns 任务详情列表
 */
export async function queryAllTask(params: z.infer<typeof queryAllTaskParamsSchema>) {
  const { orgId = getOrgId(), operatorId, ...queryParams } = params

  let request = tbServer.withTenant(orgId, 'organization')

  if (operatorId) {
    request = request.withOperator(operatorId)
  }

  return request
    .withQuery(queryParams)
    .get<QueryAllTaskResponse>('/all-task/query')
}

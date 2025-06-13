import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 渲染任务富文本的请求参数模式
export const renderTaskRtfParamsSchema = z.object({
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().optional().describe('操作者ID'),
  taskIds: z.array(z.string()).describe('任务ID列表'),
  rtfField: z.string().describe('富文本字段标识'),
})

// 渲染任务富文本响应模式
export const renderTaskRtfResponseSchema = TBResponseSchema(
  z.array(z.object({
    taskId: z.string().describe('任务ID'),
    rtfField: z.string().describe('富文本字段标识'),
    html: z.string().describe('任务富文本 Html 格式内容'),
  })),
)

// 响应类型
export type RenderTaskRtfResponse = TBResponse<Array<{
  taskId: string
  rtfField: string
  html: string
}>>

/**
 * 渲染任务富文本
 * @param params 渲染任务富文本参数
 * @returns 渲染结果
 */
export async function renderTaskRtf(params: z.infer<typeof renderTaskRtfParamsSchema>) {
  const { orgId = getOrgId(), operatorId, ...bodyParams } = params

  let request = tbServer.withTenant(orgId, 'organization')

  if (operatorId) {
    request = request.withOperator(operatorId)
  }

  return request
    .post<RenderTaskRtfResponse>('/v3/task/rtf/render', bodyParams)
}

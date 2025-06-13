import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 评论任务的请求参数模式
export const commentTaskParamsSchema = z.object({
  taskId: z.string().describe('任务ID'),
  content: z.string().optional().describe('评论内容'),
  renderMode: z.string().optional().describe('评论内容 原文 还是以 markdown 等格式. 默认是原文输出'),
  mentionUserIds: z.array(z.string()).optional().describe('评论 at 成员列表, 单次 at 上限30'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().describe('评论人ID'),
})

// 评论任务响应模式
export const commentTaskResponseSchema = TBResponseSchema(
  z.object({
    id: z.string().describe('动态ID'),
    creatorId: z.string().describe('创建人ID'),
    boundToObjectId: z.string().describe('绑定的对象ID'),
    boundToObjectType: z.string().describe('绑定对象类型，默认是task'),
    createTime: z.string().describe('创建时间(UTC)'),
    updateTime: z.string().describe('更新时间(UTC)'),
    content: z.object({
      title: z.string().describe('标题'),
      comment: z.string().describe('评论内容'),
    }).describe('动态内容'),
  }),
)

// 响应类型
export type CommentTaskParams = z.infer<typeof commentTaskParamsSchema>
export type CommentTaskResponse = TBResponse<{
  id: string
  creatorId: string
  boundToObjectId: string
  boundToObjectType: string
  createTime: string
  updateTime: string
  content: {
    title: string
    comment: string
  }
}>

/**
 * 评论任务
 * @param params 评论任务参数
 * @returns 评论结果
 */
export async function commentTask(params: CommentTaskParams) {
  const { taskId, orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withOperator(operatorId)
    .post<CommentTaskResponse>(`/v3/task/${taskId}/comment`, bodyParams)
}

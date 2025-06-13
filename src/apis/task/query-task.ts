import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'

// 查询任务的请求参数模式
export const queryTaskParamsSchema = z.object({
  taskId: z.string().optional().describe('任务ID集合,使用逗号分隔,和parentTaskId冲突(选其一)'),
  shortIds: z.string().optional().describe('任务短ID集合,使用逗号分隔'),
  parentTaskId: z.string().optional().describe('父任务ID,和taskIds冲突(选其一)'),
  orgId: z.string().optional().describe('企业ID'),
  operatorId: z.string().optional().describe('查询人ID, 如果存在会检查该成员可见的任务'),
})

// 任务详情模式
export const taskSchema = z.object({
  id: z.string().describe('任务ID'),
  taskId: z.string().optional().describe('任务ID (已弃用)'),
  content: z.string().describe('任务标题'),
  note: z.string().describe('任务备注'),
  projectId: z.string().describe('项目ID'),
  ancestorIds: z.array(z.string()).describe('祖先任务ID列表'),
  parentTaskId: z.string().describe('父任务ID'),
  tfsId: z.string().describe('任务状态ID'),
  tasklistId: z.string().describe('任务分组ID'),
  stageId: z.string().describe('任务列ID'),
  tagIds: z.array(z.string()).describe('标签ID集合'),
  creatorId: z.string().describe('创建人ID'),
  executorId: z.string().describe('执行人ID'),
  involveMembers: z.array(z.string()).describe('参与者ID集合'),
  priority: z.number().int().describe('任务优先级'),
  storyPoint: z.string().describe('StoryPoint'),
  recurrence: z.array(z.string()).describe('重复规则列表'),
  isDone: z.boolean().describe('是否任务已完成'),
  isArchived: z.boolean().describe('是否任务放入回收站'),
  visible: z.string().describe('任务隐私性，\'involves\'表达仅参与者可见; \'members\'表达项目成员可见'),
  uniqueId: z.string().describe('任务数字ID'),
  startDate: z.string().describe('任务开始时间(UTC)'),
  dueDate: z.string().describe('任务截止时间(UTC)'),
  accomplishTime: z.string().describe('任务完成时间(UTC)'),
  created: z.string().describe('创建时间(UTC)'),
  updated: z.string().describe('更新时间(UTC)'),
  sfcId: z.string().describe('任务类型ID'),
  sprintId: z.string().describe('迭代ID'),
  sourceId: z.string().describe('复制任务时，原任务的ID'),
  progress: z.number().int().describe('任务进度'),
  customfields: z.array(z.object({
    cfId: z.string().describe('自定义字段ID'),
    type: z.string().describe('自定义字段类型'),
    value: z.array(z.object({
      id: z.string().describe('字段值ID'),
      title: z.string().describe('字段值内容'),
      metaString: z.string().describe('字段值元属性'),
    })).describe('字段值集合'),
  })).describe('自定义字段值集合'),
})

// 查询任务响应模式
export const queryTaskResponseSchema = TBResponseSchema(z.array(taskSchema))

// 响应类型
export type TaskSchema = z.infer<typeof taskSchema>
export type QueryTaskResponse = TBResponse<TaskSchema[]>

/**
 * 查询任务详情
 * @param params 查询参数
 * @returns 任务详情列表
 */
export async function queryTask(params: z.infer<typeof queryTaskParamsSchema>) {
  const { orgId = getOrgId(), operatorId, ...queryParams } = params

  let request = tbServer.withTenant(orgId, 'organization')

  if (operatorId) {
    request = request.withOperator(operatorId)
  }

  return request
    .withQuery(queryParams)
    .get<QueryTaskResponse>('/gateway/v3/task/query')
}

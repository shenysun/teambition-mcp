import type { TBResponse } from '../../types/response'
import { z } from 'zod'
import { getOrgId } from '../../constants/env'
import { TBResponseSchema } from '../../types/response'
import { tbServer } from '../request'
import { taskSchema } from './query-task'

// 创建任务的请求参数模式
export const createTaskParamsSchema = z.object({
  projectId: z.string().describe('项目id'),
  content: z.string().describe('任务标题'),
  executorId: z.string().optional().describe('执行者id'),
  involveMembers: z.array(z.string()).optional().describe('参与者用户ID列表'),
  stageId: z.string().optional().describe('任务列id'),
  tasklistId: z.string().optional().describe('任务组id'),
  taskflowstatusId: z.string().optional().describe('任务状态id'),
  startDate: z.string().optional().describe('开始日期'),
  dueDate: z.string().optional().describe('截止日期'),
  note: z.string().optional().describe('任务备注'),
  priority: z.number().int().optional().describe('执行优先级'),
  parentTaskId: z.string().optional().describe('父任务id'),
  progress: z.number().int().optional().describe('进度'),
  visible: z.string().optional().describe('任务的可见性规则 involves | members'),
  sprintId: z.string().optional().describe('迭代id'),
  tagIds: z.array(z.string()).optional().describe('标签id列表'),
  storyPoint: z.string().optional(),
  scenariofieldconfigId: z.string().optional().describe('任务类型id'),
  reminders: z.array(z.object({
    labels: z.array(z.string()).optional(),
    receivers: z.array(z.string()).optional(),
    rule: z.string().optional().describe('提醒规则 [custom/具体时间, dueDate/P0D, startDate/-PT5M, circle/DTSTART:20220209T173500Z\nRRULE:FREQ=DAILY;COUNT=30;INTERVAL=1;WKST=MO]，注意：循环提醒 rrule 规则 join(\'\\n\')'),
  })).optional(),
  customfields: z.array(z.object({
    cfId: z.string().optional().describe('自定义字段值ID'),
    customfieldName: z.string().optional().describe('自定义字段名字'),
    value: z.array(z.object({
      id: z.string().optional().describe('字段值ID。用于统计, 自动化触发条件作用; 对于成员类型的字段这个值需要填写用户ID, 可以利用通讯录接口响应中的 userId 字段'),
      title: z.string().optional().describe('自定义字段值内容, 用于字段渲染'),
      description: z.string().optional(),
      thumbUrl: z.string().optional(),
      url: z.string().optional(),
      meta: z.string().optional().describe('字段值元信息(json格式) (已弃用)'),
      metaString: z.string().optional().describe('字段值元信息(json格式)；若要添加任务附件到文件字段，则需要在 metaString 中填写 "fileToken":"xxx" ，可调用创建文件上传凭证接口获得'),
    })).optional().describe('自定义字段值列表'),
  })).optional().describe('自定义字段值列表'),
  orgId: z.string().describe('企业ID'),
  operatorId: z.string().describe('任务创建人'),
})

// 创建任务响应模式
export const createTaskResponseSchema = TBResponseSchema(taskSchema)

// 响应类型
export type CreateTaskParams = z.infer<typeof createTaskParamsSchema>
export type CreateTaskResponse = TBResponse<z.infer<typeof taskSchema>>

/**
 * 创建任务
 * @param params 创建任务参数
 * @returns 创建的任务详情
 */
export async function createTask(params: CreateTaskParams) {
  const { orgId = getOrgId(), operatorId, ...bodyParams } = params

  return tbServer
    .withTenant(orgId, 'organization')
    .withHeaders({ 'x-operator-id': operatorId })
    .post<CreateTaskResponse>('/gateway/v3/task/create', bodyParams)
}

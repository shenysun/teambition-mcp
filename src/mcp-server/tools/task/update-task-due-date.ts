import type { TbMCPServer } from '../../server'
import { updateTaskDueDate, updateTaskDueDateParamsSchema } from '../../../apis/task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务截止时间MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskDueDateTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_due_date',
    description: '更新任务截止时间',
    parameters: updateTaskDueDateParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_due_date 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskDueDate(args),
        'task_update_due_date',
      )
    },
  })
}

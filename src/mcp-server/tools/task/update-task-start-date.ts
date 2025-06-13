import type { TbMCPServer } from '../../server'
import { updateTaskStartDate, updateTaskStartDateParamsSchema } from '../../../apis/task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务开始时间MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskStartDateTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_start_date',
    description: '更新任务开始时间',
    parameters: updateTaskStartDateParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_start_date 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskStartDate(args),
        'task_update_start_date',
      )
    },
  })
}

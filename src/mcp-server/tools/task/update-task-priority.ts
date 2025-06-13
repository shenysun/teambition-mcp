import type { TbMCPServer } from '../../server'
import { updateTaskPriority, updateTaskPriorityParamsSchema } from '../../../apis/task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务优先级MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskPriorityTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_priority',
    description: '更新任务优先级',
    parameters: updateTaskPriorityParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_priority 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskPriority(args),
        'task_update_priority',
      )
    },
  })
}

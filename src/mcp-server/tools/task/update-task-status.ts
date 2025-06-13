import type { TbMCPServer } from '../../server'
import { updateTaskStatus, updateTaskStatusParamsSchema } from '../../../apis/task/update-task-status'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务状态MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskStatusTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_status',
    description: '更新任务状态',
    parameters: updateTaskStatusParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_status 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskStatus(args),
        'task_update_status',
      )
    },
  })
}

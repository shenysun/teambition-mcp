import type { TbMCPServer } from '../../server'
import { updateTaskExecutor, updateTaskExecutorParamsSchema } from '../../../apis/task/update-task-executor'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务执行者MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskExecutorTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_executor',
    description: '更新任务执行者',
    parameters: updateTaskExecutorParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_executor 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskExecutor(args),
        'task_update_executor',
      )
    },
  })
}

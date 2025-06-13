import type { TbMCPServer } from '../../server'
import { updateTaskProgress, updateTaskProgressParamsSchema } from '../../../apis/task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务进度MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskProgressTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_progress',
    description: '更新任务进度',
    parameters: updateTaskProgressParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_progress 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskProgress(args),
        'task_update_progress',
      )
    },
  })
}

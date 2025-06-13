import type { TbMCPServer } from '../../server'
import { archiveTask, archiveTaskParamsSchema } from '../../../apis/task/archive-task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册归档任务MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerArchiveTaskTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_archive',
    description: '归档任务(移入回收站)',
    parameters: archiveTaskParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_archive 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        archiveTask(args),
        'task_archive',
      )
    },
  })
}

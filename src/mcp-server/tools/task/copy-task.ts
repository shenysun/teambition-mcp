import type { TbMCPServer } from '../../server'
import { copyTask, copyTaskParamsSchema } from '../../../apis/task/copy-task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册复制任务MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerCopyTaskTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_copy',
    description: '复制任务（仅支持工作流项目）',
    parameters: copyTaskParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_copy 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        copyTask(args),
        'task_copy',
      )
    },
  })
}

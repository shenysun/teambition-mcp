import type { TbMCPServer } from '../../server'
import { moveTask, moveTaskParamsSchema } from '../../../apis/task/move-task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册移动任务MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerMoveTaskTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_move',
    description: '跨项目移动任务',
    parameters: moveTaskParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_move 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        moveTask(args),
        'task_move',
      )
    },
  })
}

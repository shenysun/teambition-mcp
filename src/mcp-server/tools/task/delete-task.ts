import type { TbMCPServer } from '../../server'
import { deleteTask, deleteTaskParamsSchema } from '../../../apis/task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册删除任务MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerDeleteTaskTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_delete',
    description: '删除任务',
    parameters: deleteTaskParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_delete 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        deleteTask(args),
        'task_delete',
      )
    },
  })
}

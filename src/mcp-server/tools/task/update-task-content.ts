import type { TbMCPServer } from '../../server'
import { updateTaskContent, updateTaskContentParamsSchema } from '../../../apis/task/update-task-content'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务标题MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskContentTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_content',
    description: '更新任务标题',
    parameters: updateTaskContentParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_content 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskContent(args),
        'task_update_content',
      )
    },
  })
}

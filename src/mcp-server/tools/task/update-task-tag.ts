import type { TbMCPServer } from '../../server'
import { updateTaskTag, updateTaskTagParamsSchema } from '../../../apis/task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务标签MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskTagTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_tag',
    description: '更新任务标签',
    parameters: updateTaskTagParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_tag 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskTag(args),
        'task_update_tag',
      )
    },
  })
}

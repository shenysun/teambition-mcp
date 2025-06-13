import type { TbMCPServer } from '../../server'
import { updateTaskVisible, updateTaskVisibleParamsSchema } from '../../../apis/task/update-task-visible'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务可见性MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskVisibleTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_visible',
    description: '更新任务可见性',
    parameters: updateTaskVisibleParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_visible 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskVisible(args),
        'task_update_visible',
      )
    },
  })
}

import type { TbMCPServer } from '../../server'
import { updateTaskParent, updateTaskParentParamsSchema } from '../../../apis/task/update-task-parent'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务父任务MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskParentTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_parent',
    description: '改变任务的父任务',
    parameters: updateTaskParentParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_parent 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskParent(args),
        'task_update_parent',
      )
    },
  })
}

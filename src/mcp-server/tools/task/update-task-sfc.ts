import type { TbMCPServer } from '../../server'
import { updateTaskSfc, updateTaskSfcParamsSchema } from '../../../apis/task/update-task-sfc'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务类型MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskSfcTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_sfc',
    description: '更新任务的任务类型',
    parameters: updateTaskSfcParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_sfc 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskSfc(args),
        'task_update_sfc',
      )
    },
  })
}

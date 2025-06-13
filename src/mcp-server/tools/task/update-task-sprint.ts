import type { TbMCPServer } from '../../server'
import { updateTaskSprint, updateTaskSprintParamsSchema } from '../../../apis/task/update-task-sprint'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务迭代MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskSprintTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_sprint',
    description: '更新任务迭代',
    parameters: updateTaskSprintParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_sprint 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskSprint(args),
        'task_update_sprint',
      )
    },
  })
}

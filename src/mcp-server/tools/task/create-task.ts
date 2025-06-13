import type { TbMCPServer } from '../../server'
import { createTask, createTaskParamsSchema } from '../../../apis/task/create-task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册创建任务MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerCreateTaskTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_create',
    description: '创建任务',
    parameters: createTaskParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_create 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        createTask(args),
        'task_create',
      )
    },
  })
}

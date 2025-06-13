import type { TbMCPServer } from '../../server'
import { updateTaskAccessPolicy, updateTaskAccessPolicyParamsSchema } from '../../../apis/task/update-task-access-policy'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务锁定动作MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskAccessPolicyTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_access_policy',
    description: '更新任务锁定动作',
    parameters: updateTaskAccessPolicyParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_access_policy 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskAccessPolicy(args),
        'task_update_access_policy',
      )
    },
  })
}

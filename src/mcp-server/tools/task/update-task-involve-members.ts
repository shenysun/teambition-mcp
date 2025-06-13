import type { TbMCPServer } from '../../server'
import { updateTaskInvolveMembers, updateTaskInvolveMembersParamsSchema } from '../../../apis/task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务参与者MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskInvolveMembersTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_involve_members',
    description: '更新任务参与者',
    parameters: updateTaskInvolveMembersParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_involve_members 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskInvolveMembers(args),
        'task_update_involve_members',
      )
    },
  })
}

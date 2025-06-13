import type { TbMCPServer } from '../../server'
import { getTaskFlowStatus, getTaskFlowStatusParamsSchema } from '../../../apis/task/get-task-flow-status'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册获取任务状态列表MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerGetTaskFlowStatusTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_get_flow_status',
    description: '查询任务所在工作流的任务状态列表',
    parameters: getTaskFlowStatusParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_get_flow_status 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        getTaskFlowStatus(args),
        'task_get_flow_status',
      )
    },
  })
}

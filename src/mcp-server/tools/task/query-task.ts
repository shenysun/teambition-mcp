import type { TbMCPServer } from '../../server'
import { queryTask, queryTaskParamsSchema } from '../../../apis/task/query-task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册查询任务MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerQueryTaskTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_query',
    description: '查询任务详情',
    parameters: queryTaskParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_query 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        queryTask(args),
        'task_query',
      )
    },
  })
}

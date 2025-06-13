import type { TbMCPServer } from '../../server'
import { queryAllTask, queryAllTaskParamsSchema } from '../../../apis/task/query-all-task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册查询自由任务和项目任务MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerQueryAllTaskTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_query_all',
    description: '查询自由任务和项目任务详情',
    parameters: queryAllTaskParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_query_all 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        queryAllTask(args),
        'task_query_all',
      )
    },
  })
}

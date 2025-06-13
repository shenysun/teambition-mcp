import type { TbMCPServer } from '../../server'
import { searchTask, searchTaskParamsSchema } from '../../../apis/task/search-task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册搜索任务MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerSearchTaskTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_search',
    description: '通过TQL搜索任务ID',
    parameters: searchTaskParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_search 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        searchTask(args),
        'task_search',
      )
    },
  })
}

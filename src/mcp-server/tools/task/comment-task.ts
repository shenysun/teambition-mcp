import type { TbMCPServer } from '../../server'
import { commentTask, commentTaskParamsSchema } from '../../../apis/task/comment-task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册评论任务MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerCommentTaskTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_comment',
    description: '评论任务',
    parameters: commentTaskParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_comment 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        commentTask(args),
        'task_comment',
      )
    },
  })
}

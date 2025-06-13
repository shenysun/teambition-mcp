import type { TbMCPServer } from '../../server'
import { updateTaskStoryPoint, updateTaskStoryPointParamsSchema } from '../../../apis/task/update-task-story-point'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务StoryPoint MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskStoryPointTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_story_point',
    description: '更新任务StoryPoint',
    parameters: updateTaskStoryPointParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_story_point 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskStoryPoint(args),
        'task_update_story_point',
      )
    },
  })
}

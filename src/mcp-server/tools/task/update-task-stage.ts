import type { TbMCPServer } from '../../server'
import { updateTaskStage, updateTaskStageParamsSchema } from '../../../apis/task/update-task-stage'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务列表MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskStageTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_stage',
    description: '更新任务列表',
    parameters: updateTaskStageParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_stage 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskStage(args),
        'task_update_stage',
      )
    },
  })
}

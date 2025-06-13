import type { TbMCPServer } from '../../server'
import { renderTaskRtf, renderTaskRtfParamsSchema } from '../../../apis/task/render-task-rtf'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册渲染任务富文本MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerRenderTaskRtfTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_render_rtf',
    description: '渲染任务富文本',
    parameters: renderTaskRtfParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_render_rtf 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        renderTaskRtf(args),
        'task_render_rtf',
      )
    },
  })
}

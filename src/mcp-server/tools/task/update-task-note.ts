import type { TbMCPServer } from '../../server'
import { updateTaskNote, updateTaskNoteParamsSchema } from '../../../apis/task'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册更新任务备注MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerUpdateTaskNoteTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'task_update_note',
    description: '更新任务备注',
    parameters: updateTaskNoteParamsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 task_update_note 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateTaskNote(args),
        'task_update_note',
      )
    },
  })
}

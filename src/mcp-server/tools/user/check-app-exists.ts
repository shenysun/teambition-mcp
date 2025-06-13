import type { TbMCPServer } from '../../server'
import { checkAppExists, CheckAppExistsSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

export function registerCheckAppExistsTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'checkAppExists',
    description: '批量查询用户应用可见性',
    parameters: CheckAppExistsSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 checkAppExists 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        checkAppExists(args),
        'checkAppExists',
      )
    },
  })
}

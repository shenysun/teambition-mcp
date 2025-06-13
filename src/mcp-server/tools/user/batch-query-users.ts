import type { TbMCPServer } from '../../server'
import { batchQueryUsers, batchQueryUsersSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

export function registerBatchQueryUsersTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'batchQueryUsers',
    description: '批量查询用户信息',
    parameters: batchQueryUsersSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 batchQueryUsers 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        batchQueryUsers(args),
        'batchQueryUsers',
      )
    },
  })
}

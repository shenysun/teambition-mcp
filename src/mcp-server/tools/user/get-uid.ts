import type { TbMCPServer } from '../../server'
import { getUserIdByEmail, getUserIdByEmailSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

export function registerGetUidTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'getUid',
    description: '根据邮箱获取用户 uid',
    parameters: getUserIdByEmailSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 getUid 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        getUserIdByEmail(args),
        'getUid',
      )
    },
  })
}

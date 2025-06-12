import type { TbMCPServer } from '../../server'
import { getUserIdByEmail, GetUserIdByEmailSchema } from '../../../apis'
import { promise2ExecContent } from '../promise-exec'

export function registerGetUidTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'get-uid',
    description: '根据邮箱获取用户 uid',
    parameters: GetUserIdByEmailSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      return promise2ExecContent(
        getUserIdByEmail(args),
      )
    },
  })
}

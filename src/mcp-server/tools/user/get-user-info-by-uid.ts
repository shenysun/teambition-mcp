import type { TbMCPServer } from '../../server'
import { getUserInfoByUid, getUserInfoByUidSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册通过用户ID获取用户信息的工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerGetUserInfoByUidTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'getUserInfoByUid',
    description: '根据用户ID获取用户信息',
    parameters: getUserInfoByUidSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 getUserInfoByUid 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        getUserInfoByUid(args),
        'getUserInfoByUid',
      )
    },
  })
}

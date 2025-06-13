import type { TbMCPServer } from '../../server'
import { getUserInfoByEmail, getUserInfoByEmailSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

/**
 * 注册通过用户邮箱获取用户信息的工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerGetUserInfoByEmailTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'getUserInfoByEmail',
    description: '根据用户邮箱获取用户信息',
    parameters: getUserInfoByEmailSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 getUserInfoByEmail 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        getUserInfoByEmail(args),
        'getUserInfoByEmail',
      )
    },
  })
}

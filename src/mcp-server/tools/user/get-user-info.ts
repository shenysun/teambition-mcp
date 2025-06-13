import type { TbMCPServer } from '../../server'
import { getUserInfo, GetUserInfoByEmailSchema, GetUserInfoByUidSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

// 注册通过用户ID获取用户信息的工具
export function registerGetUserInfoByUidTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'getUserInfoByUid',
    description: '根据用户ID获取用户信息',
    parameters: GetUserInfoByUidSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 getUserInfoByUid 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        getUserInfo(args),
        'getUserInfoByUid',
      )
    },
  })
}

export function registerGetUserInfoByEmailTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'getUserInfoByEmail',
    description: '根据用户邮箱获取用户信息',
    parameters: GetUserInfoByEmailSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 getUserInfoByEmail 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        getUserInfo(args),
        'getUserInfoByEmail',
      )
    },
  })
}

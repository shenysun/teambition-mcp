import type { TbMCPServer } from '../../server'
import { getUserInfo, GetUserInfoByEmailSchema, GetUserInfoByUidSchema } from '../../../apis'
import { promise2ExecContent } from '../promise-exec'

// 注册通过用户ID获取用户信息的工具
export function registerGetUserInfoByUidTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'get-user-info-by-uid',
    description: '根据用户ID获取用户信息',
    parameters: GetUserInfoByUidSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      return promise2ExecContent(
        getUserInfo(args),
      )
    },
  })
}

export function registerGetUserInfoByEmailTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'get-user-info-by-email',
    description: '根据用户邮箱获取用户信息',
    parameters: GetUserInfoByEmailSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      return promise2ExecContent(
        getUserInfo(args),
      )
    },
  })
}

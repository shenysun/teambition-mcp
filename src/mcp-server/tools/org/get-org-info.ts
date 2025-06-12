import type { TbMCPServer } from '../../server'
import { getOrgInfo, GetOrgInfoSchema } from '../../../apis'
import { promise2ExecContent } from '../promise-exec'

// 注册获取组织信息的工具
export function registerGetOrgInfoTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'get-org-info',
    description: '获取组织信息',
    parameters: GetOrgInfoSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      return promise2ExecContent(
        getOrgInfo(args),
      )
    },
  })
}

import type { TbMCPServer } from '../../server'
import { updateOrgInfo, UpdateOrgInfoSchema } from '../../../apis'
import { promise2ExecContent } from '../promise-exec'

// 注册更新组织信息的工具
export function registerUpdateOrgInfoTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'update-org-info',
    description: '更新组织信息',
    parameters: UpdateOrgInfoSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      return promise2ExecContent(updateOrgInfo(args))
    },
  })
}

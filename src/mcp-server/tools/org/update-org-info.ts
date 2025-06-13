import type { TbMCPServer } from '../../server'
import { updateOrgInfo, UpdateOrgInfoSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

// 注册更新组织信息的工具
export function registerUpdateOrgInfoTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'updateOrgInfo',
    description: '更新组织信息',
    parameters: UpdateOrgInfoSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 updateOrgInfo 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        updateOrgInfo(args),
        'updateOrgInfo',
      )
    },
  })
}

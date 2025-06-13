import type { TbMCPServer } from '../../server'
import { getOrgInfo, getOrgInfoSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

// 注册获取组织信息的工具
export function registerGetOrgInfoTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'getOrgInfo',
    description: '获取组织信息',
    parameters: getOrgInfoSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 getOrgInfo 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        getOrgInfo(args),
        'getOrgInfo',
      )
    },
  })
}

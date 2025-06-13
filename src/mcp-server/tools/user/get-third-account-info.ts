import type { TbMCPServer } from '../../server'
import { getThirdAccountInfo, getThirdAccountInfoSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

export function registerGetThirdAccountInfoTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'getThirdAccountInfo',
    description: '获取三方账号的信息',
    parameters: getThirdAccountInfoSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 getThirdAccountInfo 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        getThirdAccountInfo(args),
        'getThirdAccountInfo',
      )
    },
  })
}

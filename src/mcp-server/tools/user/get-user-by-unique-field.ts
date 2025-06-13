import type { TbMCPServer } from '../../server'
import { getUserByUniqueField, GetUserByUniqueFieldSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

export function registerGetUserByUniqueFieldTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'getUserByUniqueField',
    description: '根据用户唯一识别查询基本信息',
    parameters: GetUserByUniqueFieldSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 getUserByUniqueField 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        getUserByUniqueField(args),
        'getUserByUniqueField',
      )
    },
  })
}

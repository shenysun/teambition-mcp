import type { TbMCPServer } from '../../server'
import { queryIdMap, queryIdMapSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

export function registerQueryIdMapTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'queryIdMap',
    description: '查询IDMap',
    parameters: queryIdMapSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 queryIdMap 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        queryIdMap(args),
        'queryIdMap',
      )
    },
  })
}

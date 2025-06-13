import type { TbMCPServer } from '../../server'
import { getUserPreferences, GetUserPreferencesSchema } from '../../../apis'
import { logger } from '../../../utils'
import { promise2ExecContent } from '../promise-exec'

export function registerGetUserPreferencesTool(tbMCPServer: TbMCPServer) {
  tbMCPServer.server.addTool({
    name: 'getUserPreferences',
    description: '根据用户ID查询用户设置',
    parameters: GetUserPreferencesSchema,
    timeoutMs: 10000,
    execute: async (args) => {
      logger.info(`执行 getUserPreferences 工具，参数: ${JSON.stringify(args)}`)
      return promise2ExecContent(
        getUserPreferences(args),
        'getUserPreferences',
      )
    },
  })
}

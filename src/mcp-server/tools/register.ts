import type { TbMCPServer } from '../server'
import {
  registerGetOrgInfoTool,
  registerUpdateOrgInfoTool,
} from './org'
import {
  registerGetUidTool,
  registerGetUserInfoByEmailTool,
  registerGetUserInfoByUidTool,
} from './user'

/**
 * 注册所有MCP工具
 * @param tbMCPServer MCP服务器实例
 */
export function registerAllTools(tbMCPServer: TbMCPServer) {
  // 注册用户相关工具
  registerGetUidTool(tbMCPServer)
  registerGetUserInfoByUidTool(tbMCPServer)
  registerGetUserInfoByEmailTool(tbMCPServer)

  // // 注册组织相关工具
  registerGetOrgInfoTool(tbMCPServer)
  registerUpdateOrgInfoTool(tbMCPServer)
}

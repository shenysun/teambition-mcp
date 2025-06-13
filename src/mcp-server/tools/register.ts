import type { TbMCPServer } from '../server'
import {
  registerGetOrgInfoTool,
  registerUpdateOrgInfoTool,
} from './org'
import {
  registerArchiveTaskTool,
  registerCommentTaskTool,
  registerCreateTaskTool,
  registerDeleteTaskTool,
  registerQueryTaskTool,
  registerSearchTaskTool,
  registerUpdateTaskContentTool,
  registerUpdateTaskDueDateTool,
  registerUpdateTaskExecutorTool,
  registerUpdateTaskInvolveMembersTool,
  registerUpdateTaskNoteTool,
  registerUpdateTaskPriorityTool,
  registerUpdateTaskProgressTool,
  registerUpdateTaskStartDateTool,
  registerUpdateTaskStatusTool,
  registerUpdateTaskTagTool,
} from './task'
import {
  registerBatchQueryUsersTool,
  registerCheckAppExistsTool,
  registerGetThirdAccountInfoTool,
  registerGetUidTool,
  registerGetUserByUniqueFieldTool,
  registerGetUserInfoByEmailTool,
  registerGetUserInfoByUidTool,
  registerGetUserPreferencesTool,
  registerQueryIdMapTool,
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
  registerBatchQueryUsersTool(tbMCPServer)
  registerCheckAppExistsTool(tbMCPServer)
  registerGetThirdAccountInfoTool(tbMCPServer)
  registerGetUserPreferencesTool(tbMCPServer)
  registerGetUserByUniqueFieldTool(tbMCPServer)
  registerQueryIdMapTool(tbMCPServer)

  // 注册组织相关工具
  registerGetOrgInfoTool(tbMCPServer)
  registerUpdateOrgInfoTool(tbMCPServer)

  // 注册任务相关工具
  registerQueryTaskTool(tbMCPServer)
  registerCreateTaskTool(tbMCPServer)
  registerUpdateTaskStatusTool(tbMCPServer)
  registerUpdateTaskContentTool(tbMCPServer)
  registerUpdateTaskExecutorTool(tbMCPServer)
  registerArchiveTaskTool(tbMCPServer)
  registerCommentTaskTool(tbMCPServer)
  registerSearchTaskTool(tbMCPServer)
  registerUpdateTaskDueDateTool(tbMCPServer)
  registerUpdateTaskStartDateTool(tbMCPServer)
  registerUpdateTaskNoteTool(tbMCPServer)
  registerUpdateTaskPriorityTool(tbMCPServer)
  registerUpdateTaskInvolveMembersTool(tbMCPServer)
  registerUpdateTaskTagTool(tbMCPServer)
  registerUpdateTaskProgressTool(tbMCPServer)
  registerDeleteTaskTool(tbMCPServer)
}

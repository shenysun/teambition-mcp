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
import { registerCopyTaskTool } from './task/copy-task'
import { registerGetTaskFlowStatusTool } from './task/get-task-flow-status'
import { registerMoveTaskTool } from './task/move-task'
import { registerQueryAllTaskTool } from './task/query-all-task'
import { registerRenderTaskRtfTool } from './task/render-task-rtf'
import { registerUpdateTaskAccessPolicyTool } from './task/update-task-access-policy'
import { registerUpdateTaskParentTool } from './task/update-task-parent'
import { registerUpdateTaskSfcTool } from './task/update-task-sfc'
import { registerUpdateTaskSprintTool } from './task/update-task-sprint'
import { registerUpdateTaskStageTool } from './task/update-task-stage'
import { registerUpdateTaskStoryPointTool } from './task/update-task-story-point'
import { registerUpdateTaskVisibleTool } from './task/update-task-visible'
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
  registerArchiveTaskTool(tbMCPServer)
  registerCommentTaskTool(tbMCPServer)
  registerCopyTaskTool(tbMCPServer)
  registerCreateTaskTool(tbMCPServer)
  registerDeleteTaskTool(tbMCPServer)
  registerGetTaskFlowStatusTool(tbMCPServer)
  registerMoveTaskTool(tbMCPServer)
  registerQueryAllTaskTool(tbMCPServer)
  registerQueryTaskTool(tbMCPServer)
  registerRenderTaskRtfTool(tbMCPServer)
  registerSearchTaskTool(tbMCPServer)
  registerUpdateTaskAccessPolicyTool(tbMCPServer)
  registerUpdateTaskContentTool(tbMCPServer)
  registerUpdateTaskDueDateTool(tbMCPServer)
  registerUpdateTaskExecutorTool(tbMCPServer)
  registerUpdateTaskInvolveMembersTool(tbMCPServer)
  registerUpdateTaskNoteTool(tbMCPServer)
  registerUpdateTaskParentTool(tbMCPServer)
  registerUpdateTaskPriorityTool(tbMCPServer)
  registerUpdateTaskProgressTool(tbMCPServer)
  registerUpdateTaskSfcTool(tbMCPServer)
  registerUpdateTaskSprintTool(tbMCPServer)
  registerUpdateTaskStageTool(tbMCPServer)
  registerUpdateTaskStartDateTool(tbMCPServer)
  registerUpdateTaskStatusTool(tbMCPServer)
  registerUpdateTaskStoryPointTool(tbMCPServer)
  registerUpdateTaskTagTool(tbMCPServer)
  registerUpdateTaskVisibleTool(tbMCPServer)
}

import type { TbMCPServer } from '../../../../mcp-server/server'
import { describe, expect, it, vi } from 'vitest'
import * as api from '../../../../apis/user/get-user-info-by-uid'
import * as promiseExec from '../../../../mcp-server/tools/promise-exec'
import { registerGetUserInfoByUidTool } from '../../../../mcp-server/tools/user/get-user-info-by-uid'
import * as utils from '../../../../utils'

// 模拟依赖
vi.mock('../../../../apis/user/get-user-info-by-uid')
vi.mock('../../../../utils')
vi.mock('../../../../mcp-server/tools/promise-exec')

describe('get-user-info-by-uid.ts', () => {
  it('应该正确注册getUserInfoByUid工具', () => {
    // 准备
    const mockServer = {
      addTool: vi.fn(),
    }
    const tbMCPServer = { server: mockServer } as unknown as TbMCPServer

    // 执行
    registerGetUserInfoByUidTool(tbMCPServer)

    // 验证
    expect(mockServer.addTool).toHaveBeenCalledTimes(1)
    const toolConfig = mockServer.addTool.mock.calls[0][0]
    expect(toolConfig.name).toBe('getUserInfoByUid')
    expect(toolConfig.description).toBe('根据用户ID获取用户信息')
    expect(toolConfig.parameters).toBe(api.getUserInfoByUidSchema)
    expect(toolConfig.timeoutMs).toBe(10000)
  })

  it('应该正确执行getUserInfoByUid工具', async () => {
    // 准备
    const mockServer = {
      addTool: vi.fn(),
    }
    const tbMCPServer = { server: mockServer } as unknown as TbMCPServer

    // 模拟API返回
    const mockApiResult = { success: true, data: { name: '测试用户' } }
    const mockApiPromise = Promise.resolve(mockApiResult)
    vi.mocked(api.getUserInfoByUid).mockReturnValue(mockApiPromise as any)

    // 模拟logger
    vi.mocked(utils.logger.info).mockImplementation(() => {})

    // 模拟promise2ExecContent
    const mockExecResult = {
      success: true,
      content: [{ type: 'text', text: '执行成功' }],
    }
    vi.mocked(promiseExec.promise2ExecContent).mockResolvedValue(mockExecResult as any)

    // 注册工具
    registerGetUserInfoByUidTool(tbMCPServer)

    // 获取execute函数
    const execute = mockServer.addTool.mock.calls[0][0].execute

    // 执行工具
    const args = { userId: 'user123', orgId: 'org123' }
    const result = await execute(args)

    // 验证
    expect(utils.logger.info).toHaveBeenCalled()
    expect(api.getUserInfoByUid).toHaveBeenCalledWith(args)
    expect(promiseExec.promise2ExecContent).toHaveBeenCalledWith(mockApiPromise, 'getUserInfoByUid')
    expect(result).toBe(mockExecResult)
  })
})

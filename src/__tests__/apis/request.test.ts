import { beforeEach, describe, expect, it, vi } from 'vitest'
import { tbServer } from '../../apis/request'

// Mock 环境变量模块
vi.mock('../../constants/env', () => ({
  APP_ID: 'mock-app-id',
  APP_SECRET: 'mock-app-secret',
  TB_BASE_URL: 'https://mock-url.com',
}))

// Mock tws-auth 模块
vi.mock('tws-auth', () => ({
  TWS: vi.fn().mockImplementation(config => ({
    appId: config.appId,
    appSecrets: config.appSecrets,
    host: config.host,
    withTenant: vi.fn().mockReturnThis(),
    withQuery: vi.fn().mockReturnThis(),
    get: vi.fn(),
    post: vi.fn(),
  })),
}))

describe('request.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('tWS 实例应该有必要的方法', () => {
    expect(typeof tbServer.withTenant).toBe('function')
    expect(typeof tbServer.withQuery).toBe('function')
    expect(typeof tbServer.get).toBe('function')
    expect(typeof tbServer.post).toBe('function')
  })
})

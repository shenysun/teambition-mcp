import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { logger, LogLevel } from '../../utils/logger'

describe('logger', () => {
  beforeEach(() => {
    // 保存原始的console方法
    vi.spyOn(console, 'error').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'info').mockImplementation(() => {})
    vi.spyOn(console, 'debug').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
    delete process.env.LOG_LEVEL
  })

  it('should log error messages', () => {
    logger.error('Test error message')
    expect(console.error).toHaveBeenCalled()
  })

  it('should log warning messages', () => {
    logger.warn('Test warning message')
    expect(console.warn).toHaveBeenCalled()
  })

  it('should log info messages', () => {
    logger.info('Test info message')
    expect(console.info).toHaveBeenCalled()
  })

  it('should log debug messages', () => {
    // 设置环境变量，启用DEBUG级别日志
    process.env.LOG_LEVEL = 'DEBUG'
    logger.debug('Test debug message')
    expect(console.debug).toHaveBeenCalled()
  })

  it('should log error objects with context', () => {
    const error = new Error('Test error')
    logger.logError(error, 'TestContext')
    expect(console.error).toHaveBeenCalled()
  })
})

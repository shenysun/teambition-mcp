/**
 * 简单的日志工具模块
 * 提供不同级别的日志记录功能
 */

// 日志级别枚举
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

// 默认日志级别
const DEFAULT_LOG_LEVEL = LogLevel.INFO

// 从环境变量获取日志级别
function getLogLevelFromEnv(): LogLevel {
  // 在测试环境中默认使用 DEBUG 级别
  if (process.env.NODE_ENV === 'test' || process.env.VITEST) {
    return LogLevel.DEBUG
  }

  const envLevel = process.env.LOG_LEVEL?.toUpperCase()
  if (!envLevel)
    return DEFAULT_LOG_LEVEL

  switch (envLevel) {
    case 'ERROR': return LogLevel.ERROR
    case 'WARN': return LogLevel.WARN
    case 'INFO': return LogLevel.INFO
    case 'DEBUG': return LogLevel.DEBUG
    default: return DEFAULT_LOG_LEVEL
  }
}

// 当前日志级别
const currentLogLevel = getLogLevelFromEnv()

// 格式化日志消息
function formatLogMessage(level: string, message: string): string {
  const timestamp = new Date().toISOString()
  return `[${timestamp}] [${level}] ${message}`
}

// 日志工具对象
export const logger = {
  error(message: string, ...args: any[]): void {
    if (currentLogLevel >= LogLevel.ERROR) {
      console.error(formatLogMessage('ERROR', message), ...args)
    }
  },

  warn(message: string, ...args: any[]): void {
    if (currentLogLevel >= LogLevel.WARN) {
      console.warn(formatLogMessage('WARN', message), ...args)
    }
  },

  info(message: string, ...args: any[]): void {
    if (currentLogLevel >= LogLevel.INFO) {
      console.info(formatLogMessage('INFO', message), ...args)
    }
  },

  debug(message: string, ...args: any[]): void {
    if (currentLogLevel >= LogLevel.DEBUG) {
      console.debug(formatLogMessage('DEBUG', message), ...args)
    }
  },

  // 记录错误对象
  logError(err: Error, context?: string): void {
    const contextMsg = context ? ` [${context}]` : ''
    this.error(`${contextMsg} ${err.message}`)
    if (currentLogLevel >= LogLevel.DEBUG && err.stack) {
      console.error(err.stack)
    }
  },
}

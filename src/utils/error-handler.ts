/**
 * 错误处理模块
 * 提供统一的错误类和处理机制
 */
import { logger } from './logger'

// 基础错误类
export class TbError extends Error {
  public code: string
  public statusCode: number
  public details?: any

  constructor(message: string, code = 'INTERNAL_ERROR', statusCode = 500, details?: any) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.statusCode = statusCode
    this.details = details

    // 修复 TypeScript 中 Error 子类的堆栈问题
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  // 转换为可序列化的对象
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      details: this.details,
      stack: process.env.NODE_ENV !== 'production' ? this.stack : undefined,
    }
  }
}

// 特定类型的错误
export class ValidationError extends TbError {
  constructor(message: string, details?: any) {
    super(message, 'VALIDATION_ERROR', 400, details)
  }
}

export class AuthenticationError extends TbError {
  constructor(message: string, details?: any) {
    super(message, 'AUTHENTICATION_ERROR', 401, details)
  }
}

export class AuthorizationError extends TbError {
  constructor(message: string, details?: any) {
    super(message, 'AUTHORIZATION_ERROR', 403, details)
  }
}

export class NotFoundError extends TbError {
  constructor(message: string, details?: any) {
    super(message, 'NOT_FOUND_ERROR', 404, details)
  }
}

// 全局错误处理函数
export function handleError(error: any, context?: string): TbError {
  // 如果已经是 TbError 实例，直接记录并返回
  if (error instanceof TbError) {
    logger.logError(error, context)
    return error
  }

  // 将未知错误转换为 TbError
  const tbError = new TbError(
    error.message || '发生未知错误',
    'INTERNAL_ERROR',
    500,
    process.env.NODE_ENV !== 'production' ? error : undefined,
  )

  logger.logError(tbError, context)
  return tbError
}

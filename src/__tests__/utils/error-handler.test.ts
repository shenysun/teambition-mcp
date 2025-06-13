import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthenticationError, AuthorizationError, handleError, NotFoundError, TbError, ValidationError } from '../../utils/error-handler'

// 模拟logger
vi.mock('../../utils/logger', () => ({
  logger: {
    logError: vi.fn(),
  },
}))

describe('error Handler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('tbError', () => {
    it('should create a basic error with default values', () => {
      const error = new TbError('Test error')
      expect(error.message).toBe('Test error')
      expect(error.code).toBe('INTERNAL_ERROR')
      expect(error.statusCode).toBe(500)
      expect(error.name).toBe('TbError')
    })

    it('should create an error with custom values', () => {
      const error = new TbError('Custom error', 'CUSTOM_CODE', 418, { custom: 'data' })
      expect(error.message).toBe('Custom error')
      expect(error.code).toBe('CUSTOM_CODE')
      expect(error.statusCode).toBe(418)
      expect(error.details).toEqual({ custom: 'data' })
    })

    it('should convert to JSON correctly', () => {
      const error = new TbError('Test error')
      const json = error.toJSON()
      expect(json.message).toBe('Test error')
      expect(json.code).toBe('INTERNAL_ERROR')
      expect(json.statusCode).toBe(500)
    })
  })

  describe('specialized Errors', () => {
    it('should create ValidationError correctly', () => {
      const error = new ValidationError('Invalid data')
      expect(error.message).toBe('Invalid data')
      expect(error.code).toBe('VALIDATION_ERROR')
      expect(error.statusCode).toBe(400)
    })

    it('should create AuthenticationError correctly', () => {
      const error = new AuthenticationError('Not authenticated')
      expect(error.message).toBe('Not authenticated')
      expect(error.code).toBe('AUTHENTICATION_ERROR')
      expect(error.statusCode).toBe(401)
    })

    it('should create AuthorizationError correctly', () => {
      const error = new AuthorizationError('Not authorized')
      expect(error.message).toBe('Not authorized')
      expect(error.code).toBe('AUTHORIZATION_ERROR')
      expect(error.statusCode).toBe(403)
    })

    it('should create NotFoundError correctly', () => {
      const error = new NotFoundError('Resource not found')
      expect(error.message).toBe('Resource not found')
      expect(error.code).toBe('NOT_FOUND_ERROR')
      expect(error.statusCode).toBe(404)
    })
  })

  describe('handleError', () => {
    it('should return TbError if already a TbError', () => {
      const originalError = new TbError('Original error')
      const handledError = handleError(originalError)
      expect(handledError).toBe(originalError)
    })

    it('should convert standard Error to TbError', () => {
      const originalError = new Error('Standard error')
      const handledError = handleError(originalError)
      expect(handledError).toBeInstanceOf(TbError)
      expect(handledError.message).toBe('Standard error')
    })

    it('should handle non-error objects', () => {
      const handledError = handleError({ message: 'Not an error' })
      expect(handledError).toBeInstanceOf(TbError)
      expect(handledError.message).toBe('Not an error')
    })

    it('should handle error without message', () => {
      const handledError = handleError({})
      expect(handledError).toBeInstanceOf(TbError)
      expect(handledError.message).toBe('发生未知错误')
    })
  })
})

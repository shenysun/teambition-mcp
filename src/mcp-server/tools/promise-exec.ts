import type { ContentResult } from 'fastmcp'
import type { TBResponse } from '../../types/response'
import { handleError, logger } from '../../utils'

export async function promise2ExecContent<T>(p: Promise<TBResponse<T>>, context?: string): Promise<ContentResult> {
  try {
    const res = await p
    if (res.code === 200) {
      logger.debug(`${context || 'API'} 请求成功: ${JSON.stringify(res.result)}`)
      return {
        isError: false,
        content: [
          {
            text: JSON.stringify(res.result),
            type: 'text',
          },
        ],
      }
    }

    // 记录API错误
    logger.warn(`${context || 'API'} 请求失败: [${res.code}] ${res.errorMessage || '未知错误'}`)
    return {
      isError: true,
      content: [
        {
          text: JSON.stringify(res),
          type: 'text',
        },
      ],
    }
  }
  catch (error) {
    // 使用错误处理器处理异常
    const handledError = handleError(error, context)

    return {
      isError: true,
      content: [
        {
          text: JSON.stringify(handledError.toJSON()),
          type: 'text',
        },
      ],
    }
  }
}

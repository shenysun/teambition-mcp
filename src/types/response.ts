import { z } from 'zod'

export function TBResponseSchema<T>(schema: z.ZodSchema<T>) {
  return z.object({
    code: z.number().describe('状态码'),
    errorMessage: z.string().describe('错误信息'),
    requestId: z.string().describe('请求ID'),
    result: schema.describe('数据'),
  })
}

export type TBResponse<T> = z.infer<ReturnType<typeof TBResponseSchema<T>>>

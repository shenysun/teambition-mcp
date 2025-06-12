import type { ContentResult } from 'fastmcp'
import type { TBResponse } from '../../types/response'

export async function promise2ExecContent<T>(p: Promise<TBResponse<T>>): Promise<ContentResult> {
  try {
    const res = await p
    if (res.code === 200) {
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
    return {
      isError: true,
      content: [
        {
          text: JSON.stringify(error),
          type: 'text',
        },
      ],
    }
  }
}

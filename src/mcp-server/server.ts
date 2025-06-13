import { FastMCP } from 'fastmcp'
import { name, version } from '../../package.json'
import { logger } from '../utils'
import { registerAllTools } from './tools/register'

/**
 * Start the MCP server
 */
export async function startServer() {
  const server = new TbMCPServer()

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    logger.info('接收到 SIGINT 信号，正在关闭服务器...')
    await server.stop()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    logger.info('接收到 SIGTERM 信号，正在关闭服务器...')
    await server.stop()
    process.exit(0)
  })

  // 全局未捕获异常处理
  process.on('uncaughtException', (error) => {
    logger.error('未捕获的异常:', error)
    // 对于未捕获的异常，我们记录但不立即退出，让服务尽可能继续运行
  })

  // 未处理的 Promise 拒绝处理
  process.on('unhandledRejection', (reason, _promise) => {
    logger.error('未处理的 Promise 拒绝:', reason)
  })

  try {
    await server.start()
  }
  catch (error: any) {
    logger.error(`启动 MCP 服务器失败: ${error.message}`, error)
    process.exit(1)
  }
}

export class TbMCPServer {
  public server: FastMCP

  constructor() {
    logger.info(`初始化 ${name} 服务器 v${version}`)
    this.server = new FastMCP({
      name,
      version: version as `${number}.${number}.${number}`,
    })
  }

  async start() {
    logger.info('注册 MCP 工具...')
    registerAllTools(this)

    logger.info('启动 MCP 服务器...')
    this.server.start({
      transportType: 'stdio',
    })

    logger.info('MCP 服务器启动成功')
  }

  async stop() {
    logger.info('停止 MCP 服务器...')
    this.server.stop()
    logger.info('MCP 服务器已停止')
  }
}

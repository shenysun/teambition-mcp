import { configDotenv } from 'dotenv'
import { startServer } from './mcp-server/server'
import { logger } from './utils'

// 加载环境变量
configDotenv()

// 设置默认的NODE_ENV
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

logger.info(`启动服务，环境: ${process.env.NODE_ENV}`)
startServer()

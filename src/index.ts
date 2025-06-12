import { configDotenv } from 'dotenv'
import { startServer } from './mcp-server/server'

configDotenv()

startServer()

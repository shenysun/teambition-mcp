import { FastMCP } from 'fastmcp'
import { name, version } from '../../package.json'
import { registerAllTools } from './tools/register'

/**
 * Start the MCP server
 */
export async function startServer() {
  const server = new TbMCPServer()

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    await server.stop()
    process.exit(0)
  })

  process.on('SIGTERM', async () => {
    await server.stop()
    process.exit(0)
  })

  try {
    await server.start()
  }
  catch (error: any) {
    console.error(`Failed to start MCP server: ${error.message}`)
    process.exit(1)
  }
}

export class TbMCPServer {
  public server: FastMCP

  constructor() {
    this.server = new FastMCP({
      name,
      version: version as `${number}.${number}.${number}`,
    })
  }

  async start() {
    registerAllTools(this)
    this.server.start({
      transportType: 'stdio',
    })
  }

  async stop() {
    this.server.stop()
  }
}

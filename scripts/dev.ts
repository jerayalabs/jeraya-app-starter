#!/usr/bin/env node

import 'dotenv/config'
// import { startServer } from '../server/app'
import { createServer } from 'vite'
import open from 'open'
import jerayaLocalConfig from '../.jeraya-config.json' with { type: 'json' }

async function dev() {
  const baseId = process.env.VITE_JERAYA_BASEID
  const dynamicUrl = `http://localhost:3000/#/d/${baseId}/app/${(jerayaLocalConfig as { appId: string }).appId}/home?dev=true`

  // console.log('Starting Fastify API server...')
  // await startServer()

  console.log('Starting Vite dev server...')
  const server = await createServer({
    server: { port: 5173, open: false },
    define: { __DYNAMIC_URL__: JSON.stringify(dynamicUrl) },
  })

  await server.listen()
  server.printUrls()

  console.log(`App URL: ${dynamicUrl}`)
  await open(dynamicUrl)
}

dev().catch((err) => {
  console.error('Failed to start dev server:', err)
  process.exit(1)
})

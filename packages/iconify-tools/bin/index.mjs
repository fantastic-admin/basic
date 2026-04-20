#!/usr/bin/env node

import process from 'node:process'
import { tsImport } from 'tsx/esm/api'

async function run() {
  try {
    const module = await tsImport('../scripts/index.ts', import.meta.url)
    await module.main()
  }
  catch (error) {
    process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
    process.exit(1)
  }
}

run()

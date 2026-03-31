#!/usr/bin/env node

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import * as p from '@clack/prompts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

let childProcess: ReturnType<typeof spawn> | null = null

process.on('SIGINT', () => {
  if (childProcess) {
    childProcess.kill('SIGINT')
  }
})

interface AppInfo {
  name: string
  packageName: string
  description: string
  serveScripts: string[]
}

function getApps(): AppInfo[] {
  const apps: AppInfo[] = []

  // Scan apps directory (subdirectories)
  const appsDir = path.resolve(rootDir, 'apps')
  if (fs.existsSync(appsDir)) {
    const entries = fs.readdirSync(appsDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const packageJsonPath = path.join(appsDir, entry.name, 'package.json')
        if (fs.existsSync(packageJsonPath)) {
          const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'))
          const serveScripts = Object.keys(pkg.scripts || {}).filter(s => s === 'serve' || s.startsWith('serve:'))
          if (serveScripts.length > 0) {
            apps.push({
              name: entry.name,
              packageName: pkg.name,
              description: pkg.description || '',
              serveScripts,
            })
          }
        }
      }
    }
  }

  return apps
}

async function runServe(packageName: string, script: string): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess = spawn('pnpm', ['--filter', packageName, 'run', script], {
      stdio: 'inherit',
      cwd: rootDir,
    })

    childProcess.on('close', (code) => {
      childProcess = null
      if (code === 0 || code === null) {
        resolve()
      }
      else {
        reject(new Error(`Process exited with code ${code}`))
      }
    })

    childProcess.on('error', (err) => {
      childProcess = null
      reject(err)
    })
  })
}

async function selectServeScript(app: AppInfo): Promise<string> {
  if (app.serveScripts.length === 1) {
    return app.serveScripts[0]
  }

  const script = await p.select({
    message: `Select serve script for "${app.name}":`,
    options: app.serveScripts.map(s => ({ value: s, label: s })),
  })

  if (p.isCancel(script)) {
    p.cancel('Operation cancelled')
    process.exit(0)
  }

  return script as string
}

async function main() {
  p.intro('Select an app to serve')

  const apps = getApps()

  if (apps.length === 0) {
    p.log.error('No apps found with serve script')
    process.exit(1)
  }

  if (apps.length === 1) {
    p.log.info(`Only one app found: ${apps[0].name}`)
    const script = await selectServeScript(apps[0])
    await runServe(apps[0].packageName, script)
    return
  }

  const choices = apps.map(app => ({
    value: app.packageName,
    label: app.name,
    hint: app.description,
  }))

  const selected = await p.select({
    message: 'Which app do you want to serve?',
    options: choices,
  })

  if (p.isCancel(selected)) {
    p.cancel('Operation cancelled')
    process.exit(0)
  }

  const selectedApp = apps.find(a => a.packageName === selected)!
  const script = await selectServeScript(selectedApp)
  p.log.info(`Serving "${selectedApp.name}" with script "${script}"...`)
  await runServe(selectedApp.packageName, script)
}

main().catch((err) => {
  p.log.error(err.message)
  process.exit(1)
})

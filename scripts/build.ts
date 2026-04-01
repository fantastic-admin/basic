#!/usr/bin/env node

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import * as p from '@clack/prompts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const isWindows = process.platform === 'win32'

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
  buildScripts: string[]
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
          const buildScripts = Object.keys(pkg.scripts || {}).filter(s => s === 'build' || s.startsWith('build:'))
          if (buildScripts.length > 0) {
            apps.push({
              name: entry.name,
              packageName: pkg.name,
              description: pkg.description || '',
              buildScripts,
            })
          }
        }
      }
    }
  }

  return apps
}

async function runBuild(packageName: string, script: string): Promise<void> {
  return new Promise((resolve, reject) => {
    childProcess = spawn('pnpm', ['--filter', packageName, 'run', script], {
      stdio: 'inherit',
      cwd: rootDir,
      shell: isWindows,
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

async function selectBuildScript(app: AppInfo): Promise<string> {
  if (app.buildScripts.length === 1) {
    return app.buildScripts[0]
  }

  const script = await p.select({
    message: `Select build script for "${app.name}":`,
    options: app.buildScripts.map(s => ({ value: s, label: s })),
  })

  if (p.isCancel(script)) {
    p.cancel('Operation cancelled')
    process.exit(0)
  }

  return script as string
}

async function main() {
  p.intro('Select apps to build')

  const apps = getApps()

  if (apps.length === 0) {
    p.log.error('No apps found with build script')
    process.exit(1)
  }

  if (apps.length === 1) {
    p.log.info(`Only one app found: ${apps[0].name}`)
    const script = await selectBuildScript(apps[0])
    await runBuild(apps[0].packageName, script)
    p.outro('Build complete!')
    return
  }

  const choices = apps.map(app => ({
    value: app.packageName,
    label: app.name,
    hint: app.description,
  }))

  const selected = await p.multiselect({
    message: 'Which apps do you want to build?',
    options: choices,
    required: true,
  })

  if (p.isCancel(selected)) {
    p.cancel('Operation cancelled')
    process.exit(0)
  }

  const selectedPackageNames = selected as string[]
  const selectedApps = selectedPackageNames.map(pkg => apps.find(a => a.packageName === pkg)!)

  for (const app of selectedApps) {
    const script = await selectBuildScript(app)
    p.log.info(`Building "${app.name}" with script "${script}"...`)
    await runBuild(app.packageName, script)
  }

  p.outro('Build complete!')
}

main().catch((err) => {
  p.log.error(err.message)
  process.exit(1)
})

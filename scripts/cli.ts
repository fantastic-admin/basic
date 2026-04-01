#!/usr/bin/env node

import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import * as p from '@clack/prompts'

interface PackageJson {
  name: string
  description?: string
  scripts?: Record<string, string>
}

interface WorkspaceEntry {
  name: string
  packageJsonPath: string
}

interface AppInfo {
  name: string
  packageName: string
  description: string
  scripts: string[]
}

interface RunMessageContext {
  app: AppInfo
  script: string
}

interface ModeConfig {
  action: Mode
  intro: string
  noAppsMessage: string
  appSelectMessage: string
  scriptMatcher: (scriptName: string) => boolean
  selectionMode: 'single' | 'multiple'
  completionMessage?: string
  getRunMessage?: (context: RunMessageContext) => string
  showRunMessageWhenSingleApp?: boolean
}

type Mode = 'build' | 'dev' | 'serve'

const currentDir = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(currentDir, '..')
const isWindows = process.platform === 'win32'
const validModes: Mode[] = ['build', 'dev', 'serve']
const modeConfigs: Record<Mode, ModeConfig> = {
  build: {
    action: 'build',
    intro: 'Select apps to build',
    noAppsMessage: 'No apps found with build script',
    appSelectMessage: 'Which apps do you want to build?',
    scriptMatcher: isBuildScript,
    selectionMode: 'multiple',
    completionMessage: 'Build complete!',
    getRunMessage: ({ app, script }) => `Building "${app.name}" with script "${script}"...`,
  },
  dev: {
    action: 'dev',
    intro: 'Select an app to run',
    noAppsMessage: 'No apps found with dev script',
    appSelectMessage: 'Which app do you want to run?',
    scriptMatcher: isDevScript,
    selectionMode: 'single',
    getRunMessage: ({ app }) => `Starting ${app.packageName}...`,
  },
  serve: {
    action: 'serve',
    intro: 'Select an app to serve',
    noAppsMessage: 'No apps found with serve script',
    appSelectMessage: 'Which app do you want to serve?',
    scriptMatcher: isServeScript,
    selectionMode: 'single',
    getRunMessage: ({ app, script }) => `Serving "${app.name}" with script "${script}"...`,
  },
}

let childProcess: ReturnType<typeof spawn> | null = null

process.on('SIGINT', () => {
  childProcess?.kill('SIGINT')
})

function isBuildScript(scriptName: string): boolean {
  return scriptName === 'build' || scriptName.startsWith('build:')
}

function isDevScript(scriptName: string): boolean {
  return scriptName === 'dev'
}

function isServeScript(scriptName: string): boolean {
  return scriptName === 'serve' || scriptName.startsWith('serve:')
}

function getWorkspaceEntries(): WorkspaceEntry[] {
  const entries: WorkspaceEntry[] = []
  const appsDir = path.resolve(rootDir, 'apps')

  if (fs.existsSync(appsDir)) {
    const apps = fs.readdirSync(appsDir, { withFileTypes: true })

    for (const app of apps) {
      if (!app.isDirectory()) {
        continue
      }

      const packageJsonPath = path.join(appsDir, app.name, 'package.json')
      if (!fs.existsSync(packageJsonPath)) {
        continue
      }

      entries.push({
        name: app.name,
        packageJsonPath,
      })
    }
  }

  const docsPackageJsonPath = path.resolve(rootDir, 'docs', 'package.json')
  if (fs.existsSync(docsPackageJsonPath)) {
    entries.push({
      name: 'docs',
      packageJsonPath: docsPackageJsonPath,
    })
  }

  return entries
}

function readPackageJson(packageJsonPath: string): PackageJson {
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8')) as PackageJson
}

function getApps(scriptMatcher: (scriptName: string) => boolean): AppInfo[] {
  const apps: AppInfo[] = []

  for (const entry of getWorkspaceEntries()) {
    const packageJson = readPackageJson(entry.packageJsonPath)
    const scripts = Object.keys(packageJson.scripts ?? {}).filter(scriptMatcher)

    if (scripts.length === 0) {
      continue
    }

    apps.push({
      name: entry.name,
      packageName: packageJson.name,
      description: packageJson.description || '',
      scripts,
    })
  }

  return apps
}

function getAppChoices(apps: AppInfo[]): Array<{ value: string, label: string, hint: string }> {
  return apps.map(app => ({
    value: app.packageName,
    label: app.name,
    hint: app.description,
  }))
}

function getAppByPackageName(apps: AppInfo[], packageName: string): AppInfo {
  const app = apps.find(item => item.packageName === packageName)

  if (!app) {
    throw new Error(`App not found: ${packageName}`)
  }

  return app
}

function resolvePromptValue<T>(value: T | symbol): T {
  if (p.isCancel(value)) {
    p.cancel('Operation cancelled')
    process.exit(0)
  }

  return value
}

async function selectScript(app: AppInfo, action: Mode): Promise<string> {
  if (app.scripts.length === 1) {
    return app.scripts[0]
  }

  const script = await p.select({
    message: `Select ${action} script for "${app.name}":`,
    options: app.scripts.map(name => ({
      value: name,
      label: name,
    })),
  })

  return resolvePromptValue(script)
}

async function runPackageScript(packageName: string, script: string): Promise<void> {
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
        return
      }

      reject(new Error(`Process exited with code ${code}`))
    })

    childProcess.on('error', (error) => {
      childProcess = null
      reject(error)
    })
  })
}

async function selectApps(apps: AppInfo[], message: string, selectionMode: ModeConfig['selectionMode']): Promise<AppInfo[]> {
  if (selectionMode === 'multiple') {
    const selectedPackageNames = resolvePromptValue(await p.multiselect({
      message,
      options: getAppChoices(apps),
      required: true,
    }))

    return selectedPackageNames.map(packageName => getAppByPackageName(apps, packageName))
  }

  const selectedPackageName = resolvePromptValue(await p.select({
    message,
    options: getAppChoices(apps),
  }))

  return [getAppByPackageName(apps, selectedPackageName)]
}

async function runSelectedApps(apps: AppInfo[], config: ModeConfig, showRunMessage: boolean): Promise<void> {
  for (const app of apps) {
    const script = await selectScript(app, config.action)

    if (showRunMessage) {
      const runMessage = config.getRunMessage?.({
        app,
        script,
      })

      if (runMessage) {
        p.log.info(runMessage)
      }
    }

    await runPackageScript(app.packageName, script)
  }
}

async function runMode(config: ModeConfig): Promise<void> {
  p.intro(config.intro)

  const apps = getApps(config.scriptMatcher)

  if (apps.length === 0) {
    p.log.error(config.noAppsMessage)
    process.exit(1)
  }

  if (apps.length === 1) {
    p.log.info(`Only one app found: ${apps[0].name}`)
    await runSelectedApps([apps[0]], config, config.showRunMessageWhenSingleApp ?? false)

    if (config.completionMessage) {
      p.outro(config.completionMessage)
    }

    return
  }

  const selectedApps = await selectApps(apps, config.appSelectMessage, config.selectionMode)
  await runSelectedApps(selectedApps, config, true)

  if (config.completionMessage) {
    p.outro(config.completionMessage)
  }
}

function parseModeArg(argv: string[]): string | undefined {
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]

    if (arg === '--mode' || arg === '-m') {
      return argv[index + 1]
    }

    if (arg.startsWith('--mode=')) {
      return arg.slice('--mode='.length)
    }

    if (arg.startsWith('-m=')) {
      return arg.slice('-m='.length)
    }
  }

  return undefined
}

function hasHelpArg(argv: string[]): boolean {
  return argv.includes('--help') || argv.includes('-h')
}

function isMode(value: string | undefined): value is Mode {
  return value !== undefined && validModes.includes(value as Mode)
}

function printHelp(): void {
  console.log(`Usage: tsx scripts/cli.ts --mode=<${validModes.join('|')}>`)
  console.log('Examples:')
  console.log('  pnpm dev')
  console.log('  pnpm build')
  console.log('  pnpm serve')
  console.log('  pnpm cli -- --mode=dev')
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2)
  const modeArg = parseModeArg(argv)

  if (hasHelpArg(argv)) {
    printHelp()
    return
  }

  if (!isMode(modeArg)) {
    p.log.error(`Invalid or missing mode. Expected one of: ${validModes.join(', ')}`)
    printHelp()
    process.exit(1)
  }

  await runMode(modeConfigs[modeArg])
}

main().catch((error: Error) => {
  p.log.error(error.message)
  process.exit(1)
})

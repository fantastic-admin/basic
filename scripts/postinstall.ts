#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const isWindows = process.platform === 'win32'

const sourceDir = path.resolve(rootDir, '.agents/skills')
const targetDirs = [
  '.claude/skills',
  // '.other-agent/skills',
]

// 根目录文件链接：[source, link]
const fileLinks = [
  ['AGENTS.md', 'CLAUDE.md'],
]

function syncSkillLinks() {
  if (!fs.existsSync(sourceDir)) {
    return
  }

  const skills = fs.readdirSync(sourceDir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)

  for (const targetDir of targetDirs) {
    const absTargetDir = path.resolve(rootDir, targetDir)
    fs.mkdirSync(absTargetDir, { recursive: true })

    let created = 0

    for (const skill of skills) {
      const linkPath = path.join(absTargetDir, skill)
      const skillSourcePath = path.join(sourceDir, skill)

      // 已存在则先删除（兼容 symlink / junction / 普通目录）
      try {
        fs.lstatSync(linkPath)
        fs.rmSync(linkPath, { recursive: true, force: true })
      }
      catch {
        // 不存在，正常继续创建
      }

      if (isWindows) {
        // Windows 使用 junction（目录联接），无需管理员权限
        fs.symlinkSync(skillSourcePath, linkPath, 'junction')
      }
      else {
        // Mac/Linux 使用相对路径软链接
        const relativePath = path.relative(absTargetDir, skillSourcePath)
        fs.symlinkSync(relativePath, linkPath)
      }

      created++
    }

    if (created > 0) {
      console.log(`[postinstall] Linked ${created} skill(s) to ${targetDir}/`)
    }
  }
}

function syncFileLinks() {
  for (const [source, link] of fileLinks) {
    const sourcePath = path.resolve(rootDir, source)
    const linkPath = path.resolve(rootDir, link)

    if (!fs.existsSync(sourcePath)) {
      console.warn(`[postinstall] Source file not found, skipping: ${source}`)
      continue
    }

    // 已存在则先删除
    try {
      fs.lstatSync(linkPath)
      fs.rmSync(linkPath, { force: true })
    }
    catch {
      // 不存在，正常继续创建
    }
    const relativePath = isWindows ? sourcePath : path.relative(rootDir, sourcePath)
    fs.symlinkSync(relativePath, linkPath, 'file')
    console.log(`[postinstall] Linked file: ${link} -> ${source}`)
  }
}

syncSkillLinks()
syncFileLinks()

import path from 'path'
import fs from 'fs-extra'
import { icons } from '@iconify-json/ep'

async function prepare() {
    const outputDir = path.resolve(process.cwd(), 'public/icons')
    fs.ensureDir(outputDir)
    fs.emptyDir(outputDir)
    fs.writeJSON(
        path.resolve(outputDir, 'icons.json'),
        icons
    )
}

prepare()

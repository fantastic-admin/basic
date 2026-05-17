import type { ImportsMap } from 'unplugin-auto-import/types'
import { createRequire } from 'node:module'

const PACKAGE_NAME = createRequire(import.meta.url)('./package.json').name

const AUTO_IMPORT_NAMES = [
  'usePagination',
] as const

export const ComposablesAutoImports: ImportsMap = {
  [PACKAGE_NAME]: [...AUTO_IMPORT_NAMES],
}

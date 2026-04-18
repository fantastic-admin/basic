import type { ImportsMap } from 'unplugin-auto-import/types'

const PACKAGE_NAME = '@fantastic-admin/composables'

const AUTO_IMPORT_NAMES = [
  'usePagination',
] as const

export const FantasticComposablesAutoImports: ImportsMap = {
  [PACKAGE_NAME]: [...AUTO_IMPORT_NAMES],
}

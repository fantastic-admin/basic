import autoImport from 'unplugin-auto-import/vite'

export default function createAutoImport() {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia',
    ],
    dts: './src/types/auto-imports.d.ts',
    dirs: [
      './src/utils/composables/**',
    ],
  })
}

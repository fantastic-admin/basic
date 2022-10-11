import compression from 'vite-plugin-compression'

export default function createCompression(env) {
  const { VITE_BUILD_COMPRESS } = env
  const compressList = VITE_BUILD_COMPRESS.split(',')
  const plugin: any[] = []
  if (compressList.includes('gzip')) {
    plugin.push(
      compression({
        filter: /\.(js|mjs|json|css)$/i,
        ext: '.gz',
        deleteOriginFile: true,
      }),
    )
  }
  if (compressList.includes('brotli')) {
    plugin.push(
      compression({
        filter: /\.(js|mjs|json|css)$/i,
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile: true,
      }),
    )
  }
  return plugin
}

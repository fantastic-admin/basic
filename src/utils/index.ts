import path from 'path-browserify'

export function isExternalLink(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function resolveRoutePath(basePath: string, routePath: string) {
  if (isExternalLink(routePath)) {
    return routePath
  }
  if (isExternalLink(basePath)) {
    return basePath
  }
  return basePath ? path.resolve(basePath, routePath) : routePath
}

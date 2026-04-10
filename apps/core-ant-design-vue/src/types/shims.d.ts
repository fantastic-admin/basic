declare interface Window {
  webkitDevicePixelRatio: any
  mozDevicePixelRatio: any
}

declare const __SYSTEM_INFO__: {
  pkg: {
    version: string
    dependencies: Record<string, string>
    devDependencies: Record<string, string>
  }
  lastBuildTime: string
}

declare module 'virtual:fantastic-admin/turbo-console' {
  export function warnKeepAliveComponentNameMissing(filePath: string): void
}

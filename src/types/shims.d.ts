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

declare module 'vue-esign'
declare module '@bytemd/plugin-gfm/lib/locales/zh_Hans.json'

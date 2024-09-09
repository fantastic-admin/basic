declare interface Window {
  webkitDevicePixelRatio: any
  mozDevicePixelRatio: any
}

declare module 'virtual:app-loading' {
  const loadingFadeOut: () => void
  export {
    loadingFadeOut,
  }
}

declare const __SYSTEM_INFO__: {
  pkg: {
    version: Recordable<string>
    dependencies: Recordable<string>
    devDependencies: Recordable<string>
  }
  lastBuildTime: string
}

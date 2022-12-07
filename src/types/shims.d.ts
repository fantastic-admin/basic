declare interface Window {
  webkitDevicePixelRatio: any
  mozDevicePixelRatio: any
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const __SYSTEM_INFO__: {
  pkg: {
    version: string
    dependencies: Recordable<string>
    devDependencies: Recordable<string>
  }
  lastBuildTime: string
}

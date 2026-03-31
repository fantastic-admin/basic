# 应用设置 (app)

## 目录
- [认证配置 (auth)](#认证配置-auth)
- [路由配置](#路由配置)
- [功能开关](#功能开关)
- [布局配置 (layout)](#布局配置-layout)
- [主页配置 (home)](#主页配置-home)
- [版权配置 (copyright)](#版权配置-copyright)
- [偏好设置 (preferences)](#偏好设置-preferences)

## 认证配置 (auth)

### permission
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否开启权限功能,控制是否启用权限验证功能

### expiredMode
- **类型**: `'redirect' | 'popup'`
- **默认值**: `'redirect'`
- **说明**: 登录过期模式
  - `'redirect'` - 跳转到登录页
  - `'popup'` - 弹出登录窗口

### multipleAccounts
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 多账号管理,可同时登录多个账号,方便快速切换

**示例:**
```typescript
app: {
  auth: {
    permission: true,
    expiredMode: 'redirect',
    multipleAccounts: true,
  }
}
```

## 路由配置

### routeMode
- **类型**: `'hash' | 'html5'`
- **默认值**: `'hash'`
- **说明**: 设置应用的路由模式
  - `'hash'` - Hash 模式
  - `'html5'` - HTML5 模式

### routeBaseOn
- **类型**: `'frontend' | 'backend'
- **默认值**: `'frontend'`
- **说明**: 指定路由数据的来源方式
  - `'frontend'` - 前端
  - `'backend'` - 后端

## 功能开关

### dynamicTitle
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否启用动态页面标题功能

### watermark
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否在页面上显示水印

### feedback
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否启用用户反馈功能

### lockScreen
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否启用锁屏功能

### errorLog
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否在非开发环境开启错误日志功能,具体业务代码在 `/src/utils/errorLog.ts`

### checkUpdates
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 控制是否启用应用更新检查功能

### rip
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 哀悼模式,开启后网站将会整体变灰

### mobile
- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 移动端访问,关闭后网站将禁用移动端访问

## 布局配置 (layout)

### center
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否开启居中布局

### centerScope
- **类型**: `'inner' | 'outer'`
- **默认值**: `'inner'`
- **说明**: 居中布局作用范围
  - `'inner'` - 内层
  - `'outer'` - 外层

### centerWidth
- **类型**: `number`
- **默认值**: `1400`
- **说明**: 居中布局宽度(像素)

**示例:**
```typescript
app: {
  layout: {
    center: true,
    centerScope: 'outer',
    centerWidth: 1400,
  }
}
```

## 主页配置 (home)

### enable
- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否开启主页功能

### title
- **类型**: `string`
- **默认值**: `'主页'`
- **说明**: 主页的标题

### fullPath
- **类型**: `string`
- **默认值**: `'/'`
- **说明**: 主页的完整路由路径

**示例:**
```typescript
app: {
  home: {
    enable: true,
    title: 'app.route.home',
    fullPath: '/',
  }
}
```

## 版权配置 (copyright)

### enable
- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否开启版权信息显示,同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息

### dates
- **类型**: `string`
- **默认值**: `''`
- **说明**: 网站运行日期

### company
- **类型**: `string`
- **默认值**: `''`
- **说明**: 版权信息中显示的公司名称

### website
- **类型**: `string`
- **默认值**: `''`
- **说明**: 版权信息中显示的网站地址

**示例:**
```typescript
app: {
  copyright: {
    enable: true,
    dates: '2020-present',
    company: 'Fantastic-admin',
    website: 'https://fantastic-admin.hurui.me',
  }
}
```

## 偏好设置 (preferences)

控制用户偏好设置,可以控制各个功能模块的启用状态。

**类型**: `{ [key]: boolean | PreferencesBoolean }`

**示例:**
```typescript
app: {
  preferences: {
    theme: true,    // 允许用户自定义主题设置
    menu: true,     // 允许用户自定义菜单设置
    topbar: true,   // 允许用户自定义顶栏设置
    tabbar: true,   // 允许用户自定义标签栏设置
    toolbar: true,  // 允许用户自定义工具栏设置
    page: true,     // 允许用户自定义页面设置
  }
}
```

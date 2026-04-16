# RouteMetaRaw 类型属性说明

本文档详细说明了 Fantastic-admin 框架中路由 meta 对象的所有可用属性。

## 目录

- [权限相关](#权限相关)
- [导航显示](#导航显示)
- [标签页](#标签页)
- [页面行为](#页面行为)
- [布局](#布局)
- [其他](#其他)

## 权限相关

### auth

- **类型**: `string | string[]`
- **默认值**: `undefined`
- **说明**: 路由访问权限,配置为数组时,只需满足一个即可进入
- **示例**:
  ```typescript
  auth: 'news:view' // 需要具备 news:view 权限
  auth: ['news:view', 'news:edit'] // 需要具备其中一个权限
  ```

## 导航显示

### title

- **类型**: `string | (() => string)`
- **默认值**: `undefined`
- **说明**: 标题会在导航、标签页、面包屑等需要的展示位置显示
- **示例**:
  ```typescript
  title: '新闻管理'
  title: () => '动态标题'
  ```

### icon

- **类型**: `string`
- **默认值**: `undefined`
- **说明**: 图标
- **示例**:
  ```typescript
  icon: 'i-ep:lock' // 默认显示 i-ep:lock 图标
  ```

### menu

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否在导航中显示,当子导航里没有可展示的导航时,会直接显示父导航

### activeMenu

- **类型**: `string`
- **默认值**: `undefined`
- **说明**: 高亮导航,需要设置完整路由地址
- **示例**:
  ```typescript
  activeMenu: '/news/list'
  ```

### expand

- **类型**: `boolean`
- **默认值**: `undefined`
- **说明**: 是否默认展开
- **示例**:
  ```typescript
  expand: true // 默认展开
  ```

### breadcrumb

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否在面包屑中显示

## 页面行为

### keepAlive

- **类型**: `boolean | string | string[]`
- **默认值**: `undefined`
- **说明**: 保活,根据规则保活当前路由页面
- **示例**:
  ```typescript
  keepAlive: true // 始终保活
  keepAlive: 'news' // 访问路由name为news的页面时保活
  keepAlive: ['news', 'user'] // 访问路由name为news或user的页面时保活
  ```

### noKeepAlive

- **类型**: `string | string[]`
- **默认值**: `undefined`
- **说明**: 不保活,根据规则不保活当前路由页面
- **示例**:
  ```typescript
  noKeepAlive: 'news' // 访问路由name为news的页面时不保活
  noKeepAlive: ['news', 'user'] // 访问路由name为news或user的页面时不保活
  ```

### link

- **类型**: `string`
- **默认值**: `undefined`
- **说明**: 外部链接,会在浏览器新窗口访问该链接
- **示例**:
  ```typescript
  link: 'https://fantastic-admin.hurui.me' // 在浏览器新窗口打开 Fantastic-admin 官网
  ```

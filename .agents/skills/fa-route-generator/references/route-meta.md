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

### auths

- **类型**: `Array<{ name: string, value: string }>`
- **默认值**: `undefined`
- **说明**: 权限池,对路由本身无实际作用,通常用于角色管理模块,展示路由可配置权限
- **示例**:
  ```typescript
  auths: [
    { name: '新闻管理(浏览)', value: 'news:view' },
    { name: '新闻管理(编辑)', value: 'news:edit' }
  ]
  ```

### auth

- **类型**: `string | string[]`
- **默认值**: `undefined`
- **说明**: 路由访问权限,配置为数组时,只需满足一个即可进入
- **示例**:
  ```typescript
  auth: 'news:view' // 需要具备 news:view 权限
  auth: ['news:view', 'news:edit'] // 需要具备其中一个权限
  ```

### localeAuth

- **类型**: `string | string[]`
- **默认值**: `undefined`
- **说明**: 区域语言权限,配置为数组时,只需满足一个即可进入
- **示例**:
  ```typescript
  localeAuth: 'zh-cn' // 当前区域语言为 zh-cn 允许访问
  localeAuth: ['zh-cn', 'zh-tw'] // 当前区域语言为 zh-cn 或 zh-tw 允许访问
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

- **类型**: `string | [string, string]`
- **默认值**: `undefined`
- **说明**: 图标,如果配置为数组,则第一个为默认图标,第二个为激活图标
- **示例**:
  ```typescript
  icon: 'i-ep:lock' // 默认显示 i-ep:lock 图标
  icon: ['i-ep:lock', 'i-ep:unlock'] // 默认显示 i-ep:lock,激活时显示 i-ep:unlock
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

- **类型**: `boolean | [boolean, boolean]`
- **默认值**: `undefined`
- **说明**: 是否默认展开,如果配置为数组,则第一个为默认展开状态,第二个是否始终展开
- **示例**:
  ```typescript
  expand: true // 默认展开
  expand: [true, true] // 默认展开,且不允许收起
  ```

### badge

- **类型**: `boolean | string | number | (() => boolean | string | number) | [value, color]`
- **默认值**: `undefined`
- **说明**: 徽章,如果配置为数组,则第一个为徽章内容,第二个为徽章颜色
- **示例**:
  ```typescript
  badge: 'PRO' // 显示徽章,内容为 PRO
  badge: true // 显示徽章,内容为圆点
  badge: [true, 'destructive'] // 显示徽章,内容为圆点,颜色为 destructive
  badge: () => '动态徽章'
  ```

### sort

- **类型**: `number`
- **默认值**: `0`
- **说明**: 导航排序,数字越大越靠前

### singleMenu

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否为单个一级导航,该配置用于简化只想展示一级,没有二级导航的路由配置

### breadcrumb

- **类型**: `boolean`
- **默认值**: `true`
- **说明**: 是否在面包屑中显示

## 标签页

### tabPermanent

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否常驻标签页,请勿在带有参数的路由上设置该特性

### tabMerge

- **类型**: `'routeName' | 'activeMenu'`
- **默认值**: `undefined`
- **说明**: 标签页合并,根据规则合并标签页
- **示例**:
  ```typescript
  tabMerge: 'routeName' // 根据路由名称合并
  tabMerge: 'activeMenu' // 根据 activeMenu 属性合并
  ```

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

### maximize

- **类型**: `boolean | [boolean, boolean]`
- **默认值**: `undefined`
- **说明**: 最大化,如果配置为数组,则第一个为是否开启最大化,第二个为是否允许手动退出最大化
- **示例**:
  ```typescript
  maximize: true // 开启最大化
  maximize: [true, false] // 开启最大化,允许手动退出最大化
  maximize: [true, true] // 开启最大化,不允许手动退出最大化
  ```

### newWindow

- **类型**: `boolean`
- **默认值**: `false`
- **说明**: 是否在新窗口打开

### iframe

- **类型**: `string | boolean`
- **默认值**: `undefined`
- **说明**: 是否在iframe中打开
- **示例**:
  ```typescript
  iframe: 'https://fantastic-admin.hurui.me' // 在iframe中打开 Fantastic-admin 官网
  iframe: true // 获取路由query中的iframe属性,并在iframe中打开
  ```

### link

- **类型**: `string`
- **默认值**: `undefined`
- **说明**: 外部链接,会在浏览器新窗口访问该链接
- **示例**:
  ```typescript
  link: 'https://fantastic-admin.hurui.me' // 在浏览器新窗口打开 Fantastic-admin 官网
  ```

### query

- **类型**: `Record<string, any>`
- **默认值**: `undefined`
- **说明**: 路由 query 参数,点击导航时进行路由跳转时,携带的参数
- **示例**:
  ```typescript
  query: { id: 1, name: 'test' }  // 点击导航时,携带 id 参数为 1,name 参数为 test
  ```

## 布局

### layout

- **类型**: `object`
- **默认值**: `undefined`
- **说明**: 布局配置
- **属性**:
  - `center`: `boolean` - 是否居中,如果不设置,则使用全局配置
  - `centerScope`: `'inner' | 'outer'` - 作用范围,如果不设置,则使用全局配置
  - `centerWidth`: `number` - 宽度,如果不设置,则使用全局配置
- **示例**:
  ```typescript
  layout: {
    center: true,
    centerScope: 'inner',
    centerWidth: 1200
  }
  ```

### copyright

- **类型**: `boolean`
- **默认值**: `undefined`
- **说明**: 是否显示版权,如果不设置,则使用全局配置

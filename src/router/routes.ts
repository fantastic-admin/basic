import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import MultilevelMenuExample from './modules/multilevel.menu.example'
import BreadcrumbExample from './modules/breadcrumb.example'
import KeepAliveExample from './modules/keep.alive.example'
import ComponentBasicExample from './modules/component.basic.example'
import ComponentExtendExample from './modules/component.extend.example'
import PermissionExample from './modules/permission.example'
import MockExample from './modules/mock.example'
import JsxExample from './modules/jsx.example'
import ExternalLinkExample from './modules/external.link.example'
import EcologyExample from './modules/ecology.example'
import type { Route } from '@/global'
import useSettingsStore from '@/store/modules/settings'

// 固定路由（默认路由）
const constantRoutes: Route.recordRaw[] = [
  {
    path: '/',
    redirect: '/dashboard',
    meta: {
      title: '',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
      title: '找不到页面',
    },
  },
]

// 系统路由
const systemRoutes: Route.recordRaw[] = [
  {
    path: '/dashboard',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: () => useSettingsStore().dashboard.title,
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/views/index.vue'),
        meta: {
          title: () => useSettingsStore().dashboard.title,
          breadcrumb: false,
        },
      },
    ],
  },
  {
    path: '/personal',
    component: () => import('@/layouts/index.vue'),
    redirect: '/personal/setting',
    meta: {
      title: '个人中心',
      breadcrumb: false,
    },
    children: [
      {
        path: 'setting',
        name: 'personalSetting',
        component: () => import('@/views/personal/setting.vue'),
        meta: {
          title: '个人设置',
          cache: 'personalEditPassword',
        },
      },
      {
        path: 'edit/password',
        name: 'personalEditPassword',
        component: () => import('@/views/personal/edit.password.vue'),
        meta: {
          title: '修改密码',
        },
      },
    ],
  },
  {
    path: '/reload',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: '重新加载',
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载',
          breadcrumb: false,
        },
      },
    ],
  },
]

// 动态路由（异步路由、导航栏路由）
const asyncRoutes: Route.recordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'sidebar-default',
    },
    children: [
      MultilevelMenuExample,
      BreadcrumbExample,
      KeepAliveExample,
      ComponentBasicExample,
      ComponentExtendExample,
      PermissionExample,
      MockExample,
      JsxExample,
      ExternalLinkExample,
    ],
  },
  {
    meta: {
      title: '生态',
      icon: 'sidebar-ecology',
    },
    children: [
      ...EcologyExample,
    ],
  },
]

const constantRoutesByFilesystem = generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant === true
})

const asyncRoutesByFilesystem = setupLayouts(generatedRoutes.filter((item) => {
  return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
})) as Route.recordRaw[]

export {
  constantRoutes,
  systemRoutes,
  asyncRoutes,
  constantRoutesByFilesystem,
  asyncRoutesByFilesystem,
}

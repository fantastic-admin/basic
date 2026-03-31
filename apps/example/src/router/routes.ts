import type { RouteRecordMainRaw } from '@fantastic-admin/types'
import type { RouteRecordRaw } from 'vue-router'
import pinia from '@/store'
import AuthExample from './modules/auth.example'
import BreadcrumbExample from './modules/breadcrumb.example'
import ComponentExample from './modules/component.example'
import EcologyExample from './modules/ecology.example'
import ElementPlusExample from './modules/element.plus.example'
import ExternalLinkExample from './modules/external.link.example'
import FakeExample from './modules/fake.example'
import FeatureExample from './modules/feature.example'
import IconExample from './modules/icon.example'
import JsxExample from './modules/jsx.example'
import KeepAliveExample from './modules/keep.alive.example'
import MultilevelMenuExample from './modules/multilevel.menu.example'
import PluginExample from './modules/plugin.example'
import TabbarExample from './modules/tabbar.example'

// 固定路由（默认路由）
const constantRoutes: RouteRecordRaw[] = [
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
const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/index.vue'),
    meta: {
      breadcrumb: false,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/index.vue'),
        meta: {
          title: useAppSettingsStore(pinia).settings.app.home.title,
          icon: 'i-ant-design:home-twotone',
          breadcrumb: false,
        },
      },
      {
        path: 'reload',
        name: 'reload',
        component: () => import('@/views/reload.vue'),
        meta: {
          title: '重新加载中...',
          breadcrumb: false,
        },
      },
    ],
  },
]

// 动态路由（异步路由、导航菜单路由）
const asyncRoutes: RouteRecordMainRaw[] = [
  {
    meta: {
      title: '演示',
      icon: 'i-ri:function-ai-line',
    },
    children: [
      MultilevelMenuExample,
      BreadcrumbExample,
      KeepAliveExample,
      TabbarExample,
      ComponentExample,
      IconExample,
      FeatureExample,
      PluginExample,
      AuthExample,
      FakeExample,
      JsxExample,
      ExternalLinkExample,
    ],
  },
  {
    meta: {
      title: 'UI',
      icon: 'i-whh:jqueryui',
    },
    children: [
      ElementPlusExample,
    ],
  },
  {
    meta: {
      title: '生态',
      icon: 'i-icon-park-outline:circular-connection',
    },
    children: [
      ...EcologyExample,
    ],
  },
]

export {
  asyncRoutes,
  constantRoutes,
  systemRoutes,
}

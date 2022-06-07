import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'

// 固定路由（默认路由）
let constantRoutes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    }
]

// 系统路由
let systemRoutes = [
    {
        path: '/dashboard',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/views/index.vue'),
                meta: {
                    title: () => {
                        return useSettingsStore().dashboard.title
                    },
                    breadcrumb: false
                }
            }
        ]
    },
    {
        path: '/personal',
        component: () => import('@/layout/index.vue'),
        redirect: '/personal/setting',
        children: [
            {
                path: 'setting',
                name: 'personalSetting',
                component: () => import('@/views/personal/setting.vue'),
                meta: {
                    title: '个人设置',
                    i18n: 'route.personal.setting',
                    cache: 'personalEditPassword'
                }
            },
            {
                path: 'edit/password',
                name: 'personalEditPassword',
                component: () => import('@/views/personal/edit.password.vue'),
                meta: {
                    title: '修改密码',
                    i18n: 'route.personal.editpassword'
                }
            }
        ]
    },
    {
        path: '/reload',
        component: () => import('@/layout/index.vue'),
        children: [
            {
                path: '',
                name: 'reload',
                component: () => import('@/views/reload.vue'),
                meta: {
                    title: '重新加载',
                    breadcrumb: false
                }
            }
        ]
    }
]

import MultilevelMenuExample from './modules/multilevel.menu.example'
import BreadcrumbExample from './modules/breadcrumb.example'

// 动态路由（异步路由、导航栏路由）
let asyncRoutes = [
    {
        meta: {
            title: '演示',
            icon: 'sidebar-default'
        },
        children: [
            MultilevelMenuExample,
            BreadcrumbExample
        ]
    }
]

import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

if (useSettingsStore(pinia).app.routeBaseOn === 'filesystem') {
    constantRoutes = generatedRoutes.filter(item => {
        return item.meta?.enabled !== false && item.meta?.constant === true
    })
    asyncRoutes = setupLayouts(generatedRoutes.filter(item => {
        return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
    }))
}

// 404路由
const notFoundRoute = {
    path: '/:all(.*)*',
    name: 'notFound',
    component: () => import('@/views/[...all].vue'),
    meta: {
        title: '找不到页面'
    }
}

export {
    constantRoutes,
    systemRoutes,
    asyncRoutes,
    notFoundRoute
}

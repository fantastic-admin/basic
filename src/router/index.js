import { createRouter, createWebHashHistory } from 'vue-router'
import { useSettingsOutsideStore } from '@/store/modules/settings'
import { useKeepAliveOutsideStore } from '@/store/modules/keepAlive'
import { useUserOutsideStore } from '@/store/modules/user'
import { useMenuOutsideStore } from '@/store/modules/menu'
import { useRouteOutsideStore } from '@/store/modules/route'

import '@/assets/styles/nprogress.scss'
import { useNProgress } from '@vueuse/integrations/useNProgress'
const { isLoading } = useNProgress()

// 固定路由
const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/index.vue'),
                meta: {
                    title: () => {
                        const settingsOutsideStore = useSettingsOutsideStore()
                        return settingsOutsideStore.dashboard.title
                    }
                }
            },
            {
                path: 'personal/setting',
                name: 'personalSetting',
                component: () => import('@/views/personal/setting.vue'),
                meta: {
                    title: '个人设置',
                    cache: 'personalEditPassword',
                    breadcrumbNeste: [
                        { title: '个人设置', path: '/personal/setting' }
                    ]
                }
            },
            {
                path: 'personal/edit/password',
                name: 'personalEditPassword',
                component: () => import('@/views/personal/edit.password.vue'),
                meta: {
                    title: '修改密码',
                    breadcrumbNeste: [
                        { title: '修改密码', path: '/personal/edit/password' }
                    ]
                }
            },
            {
                path: 'reload',
                name: 'reload',
                component: () => import('@/views/reload.vue')
            }
        ]
    }
]

import MultilevelMenuExample from './modules/multilevel.menu.example'
import BreadcrumbExample from './modules/breadcrumb.example'

// 动态路由（异步路由、导航栏路由）
const asyncRoutes = [
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

const lastRoute = {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404.vue'),
    meta: {
        title: '找不到页面'
    }
}

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

router.beforeEach(async(to, from, next) => {
    const settingsOutsideStore = useSettingsOutsideStore()
    const userOutsideStore = useUserOutsideStore()
    const menuOutsideStore = useMenuOutsideStore()
    const routeOutsideStore = useRouteOutsideStore()
    settingsOutsideStore.app.enableProgress && (isLoading.value = true)
    // 是否已登录
    if (userOutsideStore.isLogin) {
        // 是否已根据权限动态生成并挂载路由
        if (routeOutsideStore.isGenerate) {
            // 导航栏如果不是 single 模式，则需要根据 path 定位主导航的选中状态
            settingsOutsideStore.menu.menuMode !== 'single' && menuOutsideStore.setActived(to.path)
            if (to.name) {
                if (to.matched.length !== 0) {
                    // 如果已登录状态下，进入登录页会强制跳转到控制台页面
                    if (to.name == 'login') {
                        next({
                            name: 'dashboard',
                            replace: true
                        })
                    } else if (!settingsOutsideStore.dashboard.enable && to.name == 'dashboard') {
                        // 如果未开启控制台页面，则默认进入侧边栏导航第一个模块
                        if (menuOutsideStore.sidebarMenus.length > 0) {
                            next({
                                path: menuOutsideStore.sidebarMenusFirstDeepestPath,
                                replace: true
                            })
                        } else {
                            next()
                        }
                    } else {
                        next()
                    }
                } else {
                    // 如果是通过 name 跳转，并且 name 对应的路由没有权限时，需要做这步处理，手动指向到 404 页面
                    next({
                        path: '/404'
                    })
                }
            } else {
                next()
            }
        } else {
            if (!settingsOutsideStore.app.enableBackendReturnRoute) {
                await routeOutsideStore.generateRoutesAtFront(asyncRoutes)
            } else {
                await routeOutsideStore.generateRoutesAtBack()
            }
            let removeRoutes = []
            routeOutsideStore.flatRoutes.forEach(route => {
                if (!/^(https?:|mailto:|tel:)/.test(route.path)) {
                    removeRoutes.push(router.addRoute(route))
                }
            })
            removeRoutes.push(router.addRoute(lastRoute))
            // 记录的 accessRoutes 路由数据，在登出时会使用到，不使用 router.removeRoute 是考虑配置的路由可能不一定有设置 name ，则通过调用 router.addRoute() 返回的回调进行删除
            routeOutsideStore.setCurrentRemoveRoutes(removeRoutes)
            next({ ...to, replace: true })
        }
    } else {
        if (to.name != 'login') {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath
                }
            })
        } else {
            next()
        }
    }
})

router.afterEach((to, from) => {
    const settingsOutsideStore = useSettingsOutsideStore()
    const keepAliveOutsideStore = useKeepAliveOutsideStore()
    settingsOutsideStore.app.enableProgress && (isLoading.value = false)
    // 设置页面 title
    to.meta.title && settingsOutsideStore.setTitle(typeof to.meta.title === 'function' ? to.meta.title() : to.meta.title)
    // 判断当前页面是否开启缓存，如果开启，则将当前页面的 name 信息存入 keep-alive 全局状态
    if (to.meta.cache) {
        let componentName = to.matched[to.matched.length - 1].components.default.name
        if (componentName) {
            keepAliveOutsideStore.add(componentName)
        } else {
            console.warn('该页面组件未设置组件名，会导致缓存失效，请检查')
        }
    }
    // 判断离开页面是否开启缓存，如果开启，则根据缓存规则判断是否需要清空 keep-alive 全局状态里离开页面的 name 信息
    if (from.meta.cache) {
        let componentName = from.matched[from.matched.length - 1].components.default.name
        // 通过 meta.cache 判断针对哪些页面进行缓存
        switch (typeof from.meta.cache) {
            case 'string':
                if (from.meta.cache != to.name) {
                    keepAliveOutsideStore.remove(componentName)
                }
                break
            case 'object':
                if (!from.meta.cache.includes(to.name)) {
                    keepAliveOutsideStore.remove(componentName)
                }
                break
        }
        // 如果进入的是 reload 页面，则也将离开页面的缓存清空
        if (to.name == 'reload') {
            keepAliveOutsideStore.remove(componentName)
        }
    }
})

export default router

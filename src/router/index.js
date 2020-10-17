import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style

Vue.use(Router)

import Layout from '@/layout'
import KeepAliveLayout from '@/layout/keepAlive'

const constantRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('@/views/index'),
                meta: {
                    title: store.state.global.dashboardTitle
                }
            },
            {
                path: 'personal',
                component: KeepAliveLayout,
                redirect: '/personal/setting',
                meta: {
                    title: '个人中心',
                    breadcrumb: false
                },
                children: [
                    {
                        path: 'setting',
                        name: 'personalSetting',
                        component: () => import('@/views/personal/setting'),
                        meta: {
                            title: '个人设置'
                        }
                    },
                    {
                        path: 'edit/password',
                        name: 'personalEditPassword',
                        component: () => import('@/views/personal/edit.password'),
                        meta: {
                            title: '修改密码'
                        }
                    }
                ]
            },
            {
                path: 'reload',
                name: 'reload',
                component: () => import('@/views/reload')
            }
        ]
    }
]

import MultilevelMenuExample from './modules/multilevel.menu.example'
import BreadcrumbExample from './modules/breadcrumb.example'
import KeepAliveExample from './modules/keep.alive.example'
import ComponentExample from './modules/component.example'
import PermissionExample from './modules/permission.example'
import ExTernalLinkExample from './modules/external.link.example'

// 当 children 不为空的主导航只有一项时，则隐藏
let asyncRoutes = [
    {
        meta: {
            title: '默认',
            icon: 'sidebar-default'
        },
        children: [
            MultilevelMenuExample,
            BreadcrumbExample,
            KeepAliveExample,
            ComponentExample,
            PermissionExample
        ]
    },
    {
        meta: {
            title: '其它',
            icon: 'sidebar-other'
        },
        children: [
            ExTernalLinkExample
        ]
    }
]

const lastRoute = [{
    path: '*',
    component: () => import('@/views/404'),
    meta: {
        title: '404',
        sidebar: false
    }
}]

const router = new Router({
    routes: constantRoutes
})

// 解决路由在 push/replace 了相同地址报错的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

router.beforeEach(async(to, from, next) => {
    store.state.global.enableProgress && NProgress.start()
    // 已经登录，但还没根据权限动态挂载路由
    if (store.getters['token/isLogin'] && !store.state.global.permissionInit) {
        /**
         * 重置 matcher
         * https://blog.csdn.net/baidu_28647571/article/details/101711682
         */
        router.matcher = new Router({
            routes: constantRoutes
        }).matcher
        const accessRoutes = await store.dispatch('global/generateRoutes', {
            asyncRoutes,
            currentPath: to.path
        })
        router.addRoutes(accessRoutes)
        router.addRoutes(lastRoute)
        next({ ...to, replace: true })
    }
    if (store.state.global.permissionInit) {
        store.commit('global/setHeaderActive', to.path)
    }
    to.meta.title && store.commit('global/setTitle', to.meta.title)
    if (store.getters['token/isLogin']) {
        if (to.name) {
            if (to.matched.length !== 0) {
                // 如果未开启控制台页面，则默认进入侧边栏导航第一个模块
                if (!store.state.global.enableDashboard && to.name == 'dashboard') {
                    next({
                        name: store.state.global.sidebarRoutes[0].name,
                        replace: true
                    })
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
    store.state.global.enableProgress && NProgress.done()
})

export default router

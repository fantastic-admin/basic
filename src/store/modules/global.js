/**
 * 存放全局公用状态
 */
import setting from '@/setting'
import { deepClone } from '@/util'

function hasPermission(permissions, route) {
    let isAuth = false
    if (route.meta && route.meta.auth) {
        isAuth = permissions.some(auth => {
            if (typeof route.meta.auth == 'string') {
                return route.meta.auth === auth
            } else {
                return route.meta.auth.some(routeAuth => {
                    return routeAuth === auth
                })
            }
        })
    } else {
        isAuth = true
    }
    return isAuth
}

function filterAsyncRoutes(routes, permissions) {
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(permissions, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, permissions)
                tmp.children.length && res.push(tmp)
            } else {
                res.push(tmp)
            }
        }
    })
    return res
}

const state = {
    ...setting,
    // 显示模式，支持：mobile、pc
    mode: 'pc',
    // 如果未开启 openPermission 则 permissionInit 和 permissions 参数不会使用到
    permissionInit: false,
    permissions: [],
    // 如果未开启 showHeader 则 allRoutes 和 headerNavActive 参数不会使用到
    allRoutes: [],
    headerNavActive: 0,
    // 侧边栏导航，通过路由自动生成
    sidebarRoutes: [],
    // 页面标题
    title: '',
    // 是否打开搜索
    openSearch: false,
    // 是否打开主题配置
    openTheme: false
}

const getters = {
    hasPermission: state => permissions => {
        if (state.openPermission) {
            return state.permissions.some(v => {
                return v === permissions
            })
        } else {
            return true
        }
    }
}

const actions = {
    // 获取我的权限
    getPermissions({rootState, commit}) {
        return new Promise(resolve => {
            // 模拟权限数据
            let permissions
            if (rootState.token.account == 'admin') {
                permissions = [
                    'permission.browse',
                    'permission.create',
                    'permission.edit',
                    'permission.remove'
                ]
            } else if (rootState.token.account == 'test') {
                permissions = [
                    'permission.browse'
                ]
            } else {
                permissions = []
            }
            commit('setPermissions', permissions)
            resolve(permissions)
        })
    },
    // 根据权限动态生成路由
    generateRoutes({state, dispatch, commit}, data) {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async resolve => {
            let accessedRoutes
            // 判断权限功能是否开启
            if (state.openPermission) {
                const permissions = await dispatch('getPermissions')
                accessedRoutes = filterAsyncRoutes(data.asyncRoutes, permissions)
            } else {
                accessedRoutes = data.asyncRoutes
            }
            commit('setRoutes', accessedRoutes)
            commit('setHeaderActive', data.currentPath)
            let routes = []
            accessedRoutes.map(item => {
                routes.push(item.children)
            })
            routes = routes.flat()
            resolve(routes)
        })
    }
}

const mutations = {
    setMode(state, width) {
        if (width < 992) {
            state.mode = 'mobile'
        } else {
            state.mode = 'pc'
        }
    },
    setPermissions(state, permissions) {
        state.permissions = permissions
    },
    setRoutes(state, routes) {
        state.permissionInit = true
        state.allRoutes = deepClone(routes)
        state.allRoutes = state.allRoutes.filter(item => {
            return item.children.length != 0
        })
    },
    setHeaderActive(state, currentPath) {
        state.allRoutes.map((item, index) => {
            if (item.children.some(r => currentPath.indexOf(r.path + '/') === 0 || currentPath == r.path)) {
                state.headerNavActive = index
            }
        })
        state.sidebarRoutes = state.allRoutes[state.headerNavActive].children
    },
    switchHeader(state, index) {
        state.headerNavActive = index
        state.sidebarRoutes = state.allRoutes[index].children
    },
    invalidRoutes(state) {
        state.permissionInit = false
        state.headerNavActive = 0
    },
    setTitle(state, title) {
        state.title = title
    },
    toggleSidebarCollapse(state) {
        state.sidebarCollapse = !state.sidebarCollapse
    },
    toggleSearch(state) {
        state.openSearch = !state.openSearch
    },
    toggleTheme(state) {
        state.openTheme = !state.openTheme
    },
    updateThemeSetting(state, data) {
        Object.assign(state, data)
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}

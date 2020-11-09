/**
 * 存放全局公用状态
 */
import setting from '@/setting'

const state = {
    ...setting,
    // 显示模式，支持：mobile、pc
    mode: 'pc',
    // 页面标题
    title: ''
}

const getters = {}

const actions = {}

const mutations = {
    // 设置访问模式，页面宽度小于 992px 时切换为移动端展示
    setMode(state, width) {
        if (width < 992) {
            state.mode = 'mobile'
        } else {
            state.mode = 'pc'
        }
    },
    // 设置网页标题
    setTitle(state, title) {
        state.title = title
    },
    // 切换侧边栏导航展开/收起
    toggleSidebarCollapse(state) {
        state.sidebarCollapse = !state.sidebarCollapse
    },
    // 更新主题配置
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

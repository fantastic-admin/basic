// import api from '@/api'

const state = {
    account: localStorage.account,
    token: localStorage.token,
    failure_time: localStorage.failure_time,
    permissions: []
}

const getters = {
    isLogin: state => {
        let retn = false
        if (state.token != null) {
            let unix = Date.parse(new Date())
            if (unix < state.failure_time * 1000) {
                retn = true
            }
        }
        return retn
    }
}

const actions = {
    // login({commit}, data) {
    //     return new Promise((resolve, reject) => {
    //         api.post('member/login', data).then(res => {
    //             commit('setUserData', res.data)
    //             resolve(res)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // }
    login({commit}, data) {
        return new Promise(resolve => {
            // 模拟登录成功，写入 token 信息
            commit('setUserData', {
                account: data.account,
                token: '1234567890',
                failure_time: Date.parse(new Date()) / 1000 + 24 * 60 * 60
            })
            resolve()
        })
    },
    logout({commit}) {
        commit('removeUserData')
        commit('menu/invalidRoutes', null, {root: true})
    },
    // 获取我的权限
    getPermissions({state, commit}) {
        return new Promise(resolve => {
            // 模拟权限数据
            let permissions
            if (state.account == 'admin') {
                permissions = [
                    'permission.browse',
                    'permission.create',
                    'permission.edit',
                    'permission.remove'
                ]
            } else if (state.account == 'test') {
                permissions = [
                    'permission.browse'
                ]
            } else {
                permissions = []
            }
            commit('setPermissions', permissions)
            resolve(permissions)
        })
    }
}

const mutations = {
    setUserData(state, data) {
        localStorage.setItem('account', data.account)
        localStorage.setItem('token', data.token)
        localStorage.setItem('failure_time', data.failure_time)
        state.account = data.account
        state.token = data.token
        state.failure_time = data.failure_time
    },
    removeUserData(state) {
        localStorage.removeItem('account')
        localStorage.removeItem('token')
        localStorage.removeItem('failure_time')
        state.account = ''
        state.token = ''
        state.failure_time = ''
    },
    setPermissions(state, permissions) {
        state.permissions = permissions
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}

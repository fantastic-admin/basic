// import api from '@/api'

const state = {
    account: localStorage.account,
    token: localStorage.token,
    failure_time: localStorage.failure_time
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
    //             commit('setData', res.data)
    //             resolve(res)
    //         }).catch(error => {
    //             reject(error)
    //         })
    //     })
    // }
    login({commit}, data) {
        return new Promise(resolve => {
            // 模拟登录成功，写入 token 信息
            commit('setData', {
                account: data.account,
                token: '1234567890',
                failure_time: Date.parse(new Date()) / 1000 + 24 * 60 * 60
            })
            resolve()
        })
    },
    logout({commit}) {
        commit('removeData')
        commit('global/invalidRoutes', null, {root: true})
    }
}

const mutations = {
    setData(state, data) {
        localStorage.setItem('account', data.account)
        localStorage.setItem('token', data.token)
        localStorage.setItem('failure_time', data.failure_time)
        state.account = data.account
        state.token = data.token
        state.failure_time = data.failure_time
    },
    removeData(state) {
        localStorage.removeItem('account')
        localStorage.removeItem('token')
        localStorage.removeItem('failure_time')
        state.account = ''
        state.token = ''
        state.failure_time = ''
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}

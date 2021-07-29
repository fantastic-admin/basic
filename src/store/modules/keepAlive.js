const state = {
    list: []
}

const getters = {}

const actions = {}

const mutations = {
    add(state, name) {
        !state.list.includes(name) && state.list.push(name)
    },
    remove(state, name) {
        state.list = state.list.filter(v => {
            return v != name
        })
    },
    clean(state) {
        state.list = []
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}

const state = () => ({
    list: []
})

const getters = {}

const actions = {}

const mutations = {
    add(state, name) {
        if (typeof name === 'string') {
            !state.list.includes(name) && state.list.push(name)
        } else {
            name.map(v => {
                v && !state.list.includes(v) && state.list.push(v)
            })
        }
    },
    remove(state, name) {
        if (typeof name === 'string') {
            state.list = state.list.filter(v => {
                return v != name
            })
        } else {
            state.list = state.list.filter(v => {
                return !name.includes(v)
            })
        }
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

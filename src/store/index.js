import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modules = {}
const require_module = require.context('./modules', false, /.js$/)
require_module.keys().forEach(file_name => {
    modules[file_name.slice(2, -3)] = require_module(file_name).default
})

export default new Vuex.Store({
    modules: modules,
    strict: process.env.NODE_ENV !== 'production'
})

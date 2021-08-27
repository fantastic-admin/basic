import { createStore, createLogger } from 'vuex'

const modules = {}
const modulesContext = import.meta.globEager('./modules/*.js')
for (const path in modulesContext) {
    modules[path.slice(10, -3)] = modulesContext[path].default
}

export default createStore({
    modules: modules,
    strict: !import.meta.env.PROD,
    plugins: !import.meta.env.PROD ? [createLogger()] : []
})

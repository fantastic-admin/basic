export default function registerGlobalComponent(app) {
    const componentsContext = import.meta.globEager('./**/index.vue')
    for (const path in componentsContext) {
        const component = componentsContext[path].default
        app.component(component.name, component)
    }
}

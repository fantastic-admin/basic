import Vue from 'vue'

const component = require('./main.vue').default
const constructor = Vue.extend(component)

const exampleNotice = options => {
    options = options || {}
    let instance = new constructor({
        data: options
    })
    instance.vm = instance.$mount()
    instance.dom = instance.vm.$el
    document.body.appendChild(instance.dom)
    return instance.vm
}

export default {
    install: Vue => {
        Vue.prototype[`$${component.name}`] = exampleNotice
    }
}

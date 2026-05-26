import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Controlled from './_controlled.vue'
import ControlledRaw from './_controlled.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '手动控制',
    component: Controlled,
    componentRaw: ControlledRaw,
  },
]

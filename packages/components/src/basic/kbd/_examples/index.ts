import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import GroupBasic from './_group-basic.vue'
import GroupBasicRaw from './_group-basic.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '组合',
    component: GroupBasic,
    componentRaw: GroupBasicRaw,
  },
]

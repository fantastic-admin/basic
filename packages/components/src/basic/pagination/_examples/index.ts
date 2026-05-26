import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Event from './_event.vue'
import EventRaw from './_event.vue?raw'
import Layout from './_layout.vue'
import LayoutRaw from './_layout.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '布局',
    component: Layout,
    componentRaw: LayoutRaw,
  },
  {
    title: '事件',
    component: Event,
    componentRaw: EventRaw,
  },
]

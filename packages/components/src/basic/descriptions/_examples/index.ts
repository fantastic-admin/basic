import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Border from './_border.vue'
import BorderRaw from './_border.vue?raw'
import Slot from './_slot.vue'
import SlotRaw from './_slot.vue?raw'
import Vertical from './_vertical.vue'
import VerticalRaw from './_vertical.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '边框',
    component: Border,
    componentRaw: BorderRaw,
  },
  {
    title: '纵向布局',
    component: Vertical,
    componentRaw: VerticalRaw,
  },
  {
    title: '自定义插槽',
    component: Slot,
    componentRaw: SlotRaw,
  },
]

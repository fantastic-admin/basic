import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import Slot from './_slot.vue'
import SlotRaw from './_slot.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
  {
    title: '插槽',
    component: Slot,
    componentRaw: SlotRaw,
  },
]

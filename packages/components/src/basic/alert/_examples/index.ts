import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Slot from './_slot.vue'
import SlotRaw from './_slot.vue?raw'
import Variant from './_variant.vue'
import VariantRaw from './_variant.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '警告类型',
    component: Variant,
    componentRaw: VariantRaw,
  },
  {
    title: '自定义描述',
    component: Slot,
    componentRaw: SlotRaw,
  },
]

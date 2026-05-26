import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CustomStyle from './_custom-style.vue'
import CustomStyleRaw from './_custom-style.vue?raw'
import Description from './_description.vue'
import DescriptionRaw from './_description.vue?raw'
import Slot from './_slot.vue'
import SlotRaw from './_slot.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '描述',
    component: Description,
    componentRaw: DescriptionRaw,
  },
  {
    title: '插槽',
    component: Slot,
    componentRaw: SlotRaw,
  },
  {
    title: '自定义样式',
    component: CustomStyle,
    componentRaw: CustomStyleRaw,
  },
]

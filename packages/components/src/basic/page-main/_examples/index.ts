import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Collapse from './_collapse.vue'
import CollapseRaw from './_collapse.vue?raw'
import Slot from './_slot.vue'
import SlotRaw from './_slot.vue?raw'
import Title from './_title.vue'
import TitleRaw from './_title.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '标题',
    component: Title,
    componentRaw: TitleRaw,
  },
  {
    title: '插槽',
    component: Slot,
    componentRaw: SlotRaw,
  },
  {
    title: '折叠',
    component: Collapse,
    componentRaw: CollapseRaw,
  },
]

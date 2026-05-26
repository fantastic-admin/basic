import Align from './_align.vue'
import AlignRaw from './_align.vue?raw'
import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Offset from './_offset.vue'
import OffsetRaw from './_offset.vue?raw'
import Side from './_side.vue'
import SideRaw from './_side.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '弹出方向',
    component: Side,
    componentRaw: SideRaw,
  },
  {
    title: '对齐方式',
    component: Align,
    componentRaw: AlignRaw,
  },
  {
    title: '偏移',
    component: Offset,
    componentRaw: OffsetRaw,
  },
]

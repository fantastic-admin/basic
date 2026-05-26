import Align from './_align.vue'
import AlignRaw from './_align.vue?raw'
import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import Icon from './_icon.vue'
import IconRaw from './_icon.vue?raw'
import Nested from './_nested.vue'
import NestedRaw from './_nested.vue?raw'
import Offset from './_offset.vue'
import OffsetRaw from './_offset.vue?raw'
import Side from './_side.vue'
import SideRaw from './_side.vue?raw'
import Warning from './_warning.vue'
import WarningRaw from './_warning.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '图标',
    component: Icon,
    componentRaw: IconRaw,
  },
  {
    title: '警告',
    component: Warning,
    componentRaw: WarningRaw,
  },
  {
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
  {
    title: '嵌套',
    component: Nested,
    componentRaw: NestedRaw,
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

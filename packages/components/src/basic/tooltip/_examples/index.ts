import Align from './_align.vue'
import AlignRaw from './_align.vue?raw'
import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Delay from './_delay.vue'
import DelayRaw from './_delay.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import Side from './_side.vue'
import SideRaw from './_side.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '延迟显示',
    component: Delay,
    componentRaw: DelayRaw,
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
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
]

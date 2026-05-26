import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Callback from './_callback.vue'
import CallbackRaw from './_callback.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import Length from './_length.vue'
import LengthRaw from './_length.vue?raw'
import Pattern from './_pattern.vue'
import PatternRaw from './_pattern.vue?raw'
import Separator from './_separator.vue'
import SeparatorRaw from './_separator.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '长度',
    component: Length,
    componentRaw: LengthRaw,
  },
  {
    title: '模式',
    component: Pattern,
    componentRaw: PatternRaw,
  },
  {
    title: '分隔符',
    component: Separator,
    componentRaw: SeparatorRaw,
  },
  {
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
  {
    title: '回调',
    component: Callback,
    componentRaw: CallbackRaw,
  },
]

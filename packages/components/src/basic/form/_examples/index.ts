import AsyncValidation from './_async.vue'
import AsyncValidationRaw from './_async.vue?raw'
import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Composite from './_composite.vue'
import CompositeRaw from './_composite.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import Dynamic from './_dynamic.vue'
import DynamicRaw from './_dynamic.vue?raw'
import Layout from './_layout.vue'
import LayoutRaw from './_layout.vue?raw'
import Methods from './_methods.vue'
import MethodsRaw from './_methods.vue?raw'
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
    title: '异步验证',
    component: AsyncValidation,
    componentRaw: AsyncValidationRaw,
  },
  {
    title: '动态表单',
    component: Dynamic,
    componentRaw: DynamicRaw,
  },
  {
    title: '复合输入',
    component: Composite,
    componentRaw: CompositeRaw,
  },
  {
    title: '布局',
    component: Layout,
    componentRaw: LayoutRaw,
  },
  {
    title: '插槽',
    component: Slot,
    componentRaw: SlotRaw,
  },
  {
    title: '方法',
    component: Methods,
    componentRaw: MethodsRaw,
  },
]

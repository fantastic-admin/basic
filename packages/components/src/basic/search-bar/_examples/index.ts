import Background from './_background.vue'
import BackgroundRaw from './_background.vue?raw'
import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CustomTrigger from './_custom-trigger.vue'
import CustomTriggerRaw from './_custom-trigger.vue?raw'
import Expanded from './_expanded.vue'
import ExpandedRaw from './_expanded.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '默认展开',
    component: Expanded,
    componentRaw: ExpandedRaw,
  },
  {
    title: '背景',
    component: Background,
    componentRaw: BackgroundRaw,
  },
  {
    title: '自定义触发按钮',
    component: CustomTrigger,
    componentRaw: CustomTriggerRaw,
  },
]

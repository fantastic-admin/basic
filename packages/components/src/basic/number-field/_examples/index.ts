import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import MinMax from './_min-max.vue'
import MinMaxRaw from './_min-max.vue?raw'
import Step from './_step.vue'
import StepRaw from './_step.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '最大值/最小值',
    component: MinMax,
    componentRaw: MinMaxRaw,
  },
  {
    title: '步长',
    component: Step,
    componentRaw: StepRaw,
  },
  {
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
]

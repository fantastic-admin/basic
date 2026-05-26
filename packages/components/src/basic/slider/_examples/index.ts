import Alignment from './_alignment.vue'
import AlignmentRaw from './_alignment.vue?raw'
import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Inverted from './_inverted.vue'
import InvertedRaw from './_inverted.vue?raw'
import Range from './_range.vue'
import RangeRaw from './_range.vue?raw'
import Step from './_step.vue'
import StepRaw from './_step.vue?raw'
import Tooltip from './_tooltip.vue'
import TooltipRaw from './_tooltip.vue?raw'
import Vertical from './_vertical.vue'
import VerticalRaw from './_vertical.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '垂直',
    component: Vertical,
    componentRaw: VerticalRaw,
  },
  {
    title: '反转',
    component: Inverted,
    componentRaw: InvertedRaw,
  },
  {
    title: '最大值/最小值',
    component: Range,
    componentRaw: RangeRaw,
  },
  {
    title: '步长',
    component: Step,
    componentRaw: StepRaw,
  },
  {
    title: '对齐方式',
    component: Alignment,
    componentRaw: AlignmentRaw,
  },
  {
    title: '提示',
    component: Tooltip,
    componentRaw: TooltipRaw,
  },
]

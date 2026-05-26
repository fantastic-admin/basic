import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Nested from './_nested.vue'
import NestedRaw from './_nested.vue?raw'
import Separator from './_separator.vue'
import SeparatorRaw from './_separator.vue?raw'
import Vertical from './_vertical.vue'
import VerticalRaw from './_vertical.vue?raw'
import WithComponents from './_with-components.vue'
import WithComponentsRaw from './_with-components.vue?raw'

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
    title: '分割线',
    component: Separator,
    componentRaw: SeparatorRaw,
  },
  {
    title: '嵌套',
    component: Nested,
    componentRaw: NestedRaw,
  },
  {
    title: '与其他组件组合',
    component: WithComponents,
    componentRaw: WithComponentsRaw,
  },
]

import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CustomStyle from './_custom-style.vue'
import CustomStyleRaw from './_custom-style.vue?raw'
import Fallback from './_fallback.vue'
import FallbackRaw from './_fallback.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '回退显示',
    component: Fallback,
    componentRaw: FallbackRaw,
  },
  {
    title: '自定义样式',
    component: CustomStyle,
    componentRaw: CustomStyleRaw,
  },
]

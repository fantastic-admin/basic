import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CustomStyle from './_custom-style.vue'
import CustomStyleRaw from './_custom-style.vue?raw'
import Icon from './_icon.vue'
import IconRaw from './_icon.vue?raw'

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
    title: '自定义样式',
    component: CustomStyle,
    componentRaw: CustomStyleRaw,
  },
]

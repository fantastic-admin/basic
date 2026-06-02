import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Closable from './_closable.vue'
import ClosableRaw from './_closable.vue?raw'
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
    title: '可关闭',
    component: Closable,
    componentRaw: ClosableRaw,
  },
]

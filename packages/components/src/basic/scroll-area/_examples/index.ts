import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import HiddenScrollbar from './_hidden-scrollbar.vue'
import HiddenScrollbarRaw from './_hidden-scrollbar.vue?raw'
import Horizontal from './_horizontal.vue'
import HorizontalRaw from './_horizontal.vue?raw'
import Mask from './_mask.vue'
import MaskRaw from './_mask.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '水平滚动',
    component: Horizontal,
    componentRaw: HorizontalRaw,
  },
  {
    title: '隐藏滚动条',
    component: HiddenScrollbar,
    componentRaw: HiddenScrollbarRaw,
  },
  {
    title: '遮罩',
    component: Mask,
    componentRaw: MaskRaw,
  },
]

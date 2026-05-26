import Iconify from './_iconify.vue'
import IconifyRaw from './_iconify.vue?raw'
import Image from './_image.vue'
import ImageRaw from './_image.vue?raw'
import Svg from './_svg.vue'
import SvgRaw from './_svg.vue?raw'
import Transition from './_transition.vue'
import TransitionRaw from './_transition.vue?raw'
import Unocss from './_unocss.vue'
import UnocssRaw from './_unocss.vue?raw'

export default [
  {
    title: 'SVG文件',
    component: Svg,
    componentRaw: SvgRaw,
  },
  {
    title: 'Iconify',
    component: Iconify,
    componentRaw: IconifyRaw,
  },
  {
    title: 'UnoCSS',
    component: Unocss,
    componentRaw: UnocssRaw,
  },
  {
    title: 'Image',
    component: Image,
    componentRaw: ImageRaw,
  },
  {
    title: '过渡动画',
    component: Transition,
    componentRaw: TransitionRaw,
  },
]

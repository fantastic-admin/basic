import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import Loading from './_loading.vue'
import LoadingRaw from './_loading.vue?raw'
import Size from './_size.vue'
import SizeRaw from './_size.vue?raw'
import Variant from './_variant.vue'
import VariantRaw from './_variant.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '变体',
    component: Variant,
    componentRaw: VariantRaw,
  },
  {
    title: '尺寸',
    component: Size,
    componentRaw: SizeRaw,
  },
  {
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
  {
    title: '加载',
    component: Loading,
    componentRaw: LoadingRaw,
  },
]

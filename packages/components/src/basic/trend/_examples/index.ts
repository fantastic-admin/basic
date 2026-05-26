import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import PrefixSuffix from './_prefix-suffix.vue'
import PrefixSuffixRaw from './_prefix-suffix.vue?raw'
import Reverse from './_reverse.vue'
import ReverseRaw from './_reverse.vue?raw'
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
    title: '风格',
    component: Variant,
    componentRaw: VariantRaw,
  },
  {
    title: '尺寸',
    component: Size,
    componentRaw: SizeRaw,
  },
  {
    title: '颜色反转',
    component: Reverse,
    componentRaw: ReverseRaw,
  },
  {
    title: '前缀/后缀',
    component: PrefixSuffix,
    componentRaw: PrefixSuffixRaw,
  },
]

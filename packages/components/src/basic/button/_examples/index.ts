import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import GroupBasic from './_group-basic.vue'
import GroupBasicRaw from './_group-basic.vue?raw'
import GroupNested from './_group-nested.vue'
import GroupNestedRaw from './_group-nested.vue?raw'
import GroupSeparator from './_group-separator.vue'
import GroupSeparatorRaw from './_group-separator.vue?raw'
import GroupVertical from './_group-vertical.vue'
import GroupVerticalRaw from './_group-vertical.vue?raw'
import GroupWithComponents from './_group-with-components.vue'
import GroupWithComponentsRaw from './_group-with-components.vue?raw'
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
  {
    title: '按钮组 - 基础',
    component: GroupBasic,
    componentRaw: GroupBasicRaw,
  },
  {
    title: '按钮组 - 垂直',
    component: GroupVertical,
    componentRaw: GroupVerticalRaw,
  },
  {
    title: '按钮组 - 分割线',
    component: GroupSeparator,
    componentRaw: GroupSeparatorRaw,
  },
  {
    title: '按钮组 - 嵌套',
    component: GroupNested,
    componentRaw: GroupNestedRaw,
  },
  {
    title: '按钮组 - 与其他组件组合',
    component: GroupWithComponents,
    componentRaw: GroupWithComponentsRaw,
  },
]

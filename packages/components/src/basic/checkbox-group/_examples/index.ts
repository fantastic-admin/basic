import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CustomOption from './_custom-option.vue'
import CustomOptionRaw from './_custom-option.vue?raw'
import Description from './_description.vue'
import DescriptionRaw from './_description.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import Limit from './_limit.vue'
import LimitRaw from './_limit.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '描述',
    component: Description,
    componentRaw: DescriptionRaw,
  },
  {
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
  {
    title: '数量限制',
    component: Limit,
    componentRaw: LimitRaw,
  },
  {
    title: '自定义选项内容',
    component: CustomOption,
    componentRaw: CustomOptionRaw,
  },
]

import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CustomOption from './_custom-option.vue'
import CustomOptionRaw from './_custom-option.vue?raw'
import DescriptionDisabled from './_description-disabled.vue'
import DescriptionDisabledRaw from './_description-disabled.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '带描述和禁用态',
    component: DescriptionDisabled,
    componentRaw: DescriptionDisabledRaw,
  },
  {
    title: '自定义选项内容',
    component: CustomOption,
    componentRaw: CustomOptionRaw,
  },
]

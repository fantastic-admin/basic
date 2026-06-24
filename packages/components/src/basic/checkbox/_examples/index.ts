import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CustomStyle from './_custom-style.vue'
import CustomStyleRaw from './_custom-style.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import GroupBasic from './_group-basic.vue'
import GroupBasicRaw from './_group-basic.vue?raw'
import GroupCustomOption from './_group-custom-option.vue'
import GroupCustomOptionRaw from './_group-custom-option.vue?raw'
import GroupDescription from './_group-description.vue'
import GroupDescriptionRaw from './_group-description.vue?raw'
import GroupDisabled from './_group-disabled.vue'
import GroupDisabledRaw from './_group-disabled.vue?raw'
import GroupLimit from './_group-limit.vue'
import GroupLimitRaw from './_group-limit.vue?raw'
import Indeterminate from './_indeterminate.vue'
import IndeterminateRaw from './_indeterminate.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
  {
    title: '半选',
    component: Indeterminate,
    componentRaw: IndeterminateRaw,
  },
  {
    title: '自定义样式',
    component: CustomStyle,
    componentRaw: CustomStyleRaw,
  },
  {
    title: '复选框组 - 基础',
    component: GroupBasic,
    componentRaw: GroupBasicRaw,
  },
  {
    title: '复选框组 - 描述',
    component: GroupDescription,
    componentRaw: GroupDescriptionRaw,
  },
  {
    title: '复选框组 - 禁用',
    component: GroupDisabled,
    componentRaw: GroupDisabledRaw,
  },
  {
    title: '复选框组 - 数量限制',
    component: GroupLimit,
    componentRaw: GroupLimitRaw,
  },
  {
    title: '复选框组 - 自定义选项',
    component: GroupCustomOption,
    componentRaw: GroupCustomOptionRaw,
  },
]

import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CustomRule from './_custom-rule.vue'
import CustomRuleRaw from './_custom-rule.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '自定义规则',
    component: CustomRule,
    componentRaw: CustomRuleRaw,
  },
]

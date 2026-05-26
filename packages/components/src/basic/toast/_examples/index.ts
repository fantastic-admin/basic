import Action from './_action.vue'
import ActionRaw from './_action.vue?raw'
import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Loading from './_loading.vue'
import LoadingRaw from './_loading.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '操作按钮',
    component: Action,
    componentRaw: ActionRaw,
  },
  {
    title: '加载状态',
    component: Loading,
    componentRaw: LoadingRaw,
  },
]

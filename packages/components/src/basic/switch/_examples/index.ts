import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Callback from './_callback.vue'
import CallbackRaw from './_callback.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import Icon from './_icon.vue'
import IconRaw from './_icon.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '图标',
    component: Icon,
    componentRaw: IconRaw,
  },
  {
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
  {
    title: '回调',
    component: Callback,
    componentRaw: CallbackRaw,
  },
]

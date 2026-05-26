import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Clearable from './_clearable.vue'
import ClearableRaw from './_clearable.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import Password from './_password.vue'
import PasswordRaw from './_password.vue?raw'
import Slot from './_slot.vue'
import SlotRaw from './_slot.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '可清空',
    component: Clearable,
    componentRaw: ClearableRaw,
  },
  {
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
  {
    title: '密码',
    component: Password,
    componentRaw: PasswordRaw,
  },
  {
    title: '插槽',
    component: Slot,
    componentRaw: SlotRaw,
  },
]

import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Disabled from './_disabled.vue'
import DisabledRaw from './_disabled.vue?raw'
import Group from './_group.vue'
import GroupRaw from './_group.vue?raw'
import Multiple from './_multiple.vue'
import MultipleRaw from './_multiple.vue?raw'
import Position from './_position.vue'
import PositionRaw from './_position.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '组',
    component: Group,
    componentRaw: GroupRaw,
  },
  {
    title: '多选',
    component: Multiple,
    componentRaw: MultipleRaw,
  },
  {
    title: '定位模式',
    component: Position,
    componentRaw: PositionRaw,
  },
  {
    title: '禁用',
    component: Disabled,
    componentRaw: DisabledRaw,
  },
]

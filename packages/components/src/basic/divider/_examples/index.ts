import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Position from './_position.vue'
import PositionRaw from './_position.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '位置',
    component: Position,
    componentRaw: PositionRaw,
  },
]

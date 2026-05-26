import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Error from './_error.vue'
import ErrorRaw from './_error.vue?raw'
import Functional from './_functional.vue'
import FunctionalRaw from './_functional.vue?raw'
import Size from './_size.vue'
import SizeRaw from './_size.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '尺寸',
    component: Size,
    componentRaw: SizeRaw,
  },
  {
    title: '错误',
    component: Error,
    componentRaw: ErrorRaw,
  },
  {
    title: '函数式调用',
    component: Functional,
    componentRaw: FunctionalRaw,
  },
]

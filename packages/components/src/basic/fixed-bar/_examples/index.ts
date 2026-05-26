import Bottom from './_bottom.vue'
import BottomRaw from './_bottom.vue?raw'
import Top from './_top.vue'
import TopRaw from './_top.vue?raw'

export default [
  {
    title: '固定在页面顶部',
    component: Top,
    componentRaw: TopRaw,
  },
  {
    title: '固定在页面底部',
    component: Bottom,
    componentRaw: BottomRaw,
  },
]

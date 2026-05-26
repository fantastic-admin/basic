import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import Custom from './_custom.vue'
import CustomRaw from './_custom.vue?raw'
import Form from './_form.vue'
import FormRaw from './_form.vue?raw'
import Width from './_width.vue'
import WidthRaw from './_width.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '固定宽度',
    component: Width,
    componentRaw: WidthRaw,
  },
  {
    title: '表单布局',
    component: Form,
    componentRaw: FormRaw,
  },
  {
    title: '自定义内容',
    component: Custom,
    componentRaw: CustomRaw,
  },
]

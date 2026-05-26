import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CustomRequest from './_custom-request.vue'
import CustomRequestRaw from './_custom-request.vue?raw'
import Directory from './_directory.vue'
import DirectoryRaw from './_directory.vue?raw'
import Slot from './_slot.vue'
import SlotRaw from './_slot.vue?raw'
import Validation from './_validation.vue'
import ValidationRaw from './_validation.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '上传前校验、限制数量、点击事件',
    component: Validation,
    componentRaw: ValidationRaw,
  },
  {
    title: '插槽',
    component: Slot,
    componentRaw: SlotRaw,
  },
  {
    title: '自定义上传请求',
    component: CustomRequest,
    componentRaw: CustomRequestRaw,
  },
  {
    title: '文件夹上传',
    component: Directory,
    componentRaw: DirectoryRaw,
  },
]

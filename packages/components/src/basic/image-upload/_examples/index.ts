import Basic from './_basic.vue'
import BasicRaw from './_basic.vue?raw'
import CustomRequest from './_custom-request.vue'
import CustomRequestRaw from './_custom-request.vue?raw'
import Directory from './_directory.vue'
import DirectoryRaw from './_directory.vue?raw'
import Multiple from './_multiple.vue'
import MultipleRaw from './_multiple.vue?raw'
import Validation from './_validation.vue'
import ValidationRaw from './_validation.vue?raw'

export default [
  {
    title: '基础',
    component: Basic,
    componentRaw: BasicRaw,
  },
  {
    title: '多图上传',
    component: Multiple,
    componentRaw: MultipleRaw,
  },
  {
    title: '上传前校验',
    component: Validation,
    componentRaw: ValidationRaw,
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

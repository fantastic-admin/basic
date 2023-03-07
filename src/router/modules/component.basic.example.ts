import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const routes: RouteRecordRaw = {
  path: '/component_basic_example',
  component: Layout,
  redirect: '/component_basic_example/icon',
  name: 'componentBasicExample',
  meta: {
    title: '基础组件',
    icon: 'ep:element-plus',
  },
  children: [
    {
      path: '',
      name: 'componentBasicExampleIndex',
      component: () => import('@/views/component_basic_example/index.vue'),
      meta: {
        title: '基础组件',
        sidebar: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

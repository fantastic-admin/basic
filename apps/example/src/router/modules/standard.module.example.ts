import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/standard_module_example',
  component: Layout,
  name: 'standardModuleExample',
  meta: {
    title: '标准模块',
    icon: 'i-ic:round-view-module',
  },
  children: [
    {
      path: '',
      name: 'standardModuleExampleList',
      component: () => import('@/views/standard_module_example/list.vue'),
      meta: {
        title: '列表',
        menu: false,
        breadcrumb: false,
        keepAlive: 'standardModuleExampleDetail',
      },
    },
    {
      path: 'detail/:id?',
      name: 'standardModuleExampleDetail',
      component: () => import('@/views/standard_module_example/detail.vue'),
      meta: {
        title: '详情',
        menu: false,
        activeMenu: '/standard_module_example',
        keepAlive: true,
        noKeepAlive: 'standardModuleExampleList',
      },
    },
  ],
}

export default routes

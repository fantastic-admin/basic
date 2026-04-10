import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/tdesign_example',
  component: Layout,
  meta: {
    title: 'TDesign',
    icon: 'https://static.tdesign.tencent.com/favicon.ico',
    menu: false,
  },
  children: [
    {
      path: '',
      name: 'tdesignExample',
      component: () => import('@/views/tdesign_example/index.vue'),
      meta: {
        title: 'TDesign',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

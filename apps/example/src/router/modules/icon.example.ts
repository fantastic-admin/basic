import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/icon_example',
  component: Layout,
  meta: {
    title: '图标',
    icon: 'i-ri:remixicon-line',
  },
  children: [
    {
      path: '',
      name: 'iconExample',
      component: () => import('@/views/icon_example/index.vue'),
      meta: {
        title: '图标',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/mock_example',
  component: Layout,
  name: 'mockExample',
  meta: {
    title: 'Mock',
    icon: 'i-ri:database-2-line',
  },
  children: [
    {
      path: '',
      name: 'mockExampleIndex',
      component: () => import('@/views/mock_example/index.vue'),
      meta: {
        title: 'Mock',
        menu: false,
        breadcrumb: false,
        activeMenu: '/mock_example',
      },
    },
  ],
}

export default routes

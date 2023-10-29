import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/mock_example',
  component: Layout,
  redirect: '/mock_example/index',
  name: 'mockExample',
  meta: {
    title: 'Mock',
    icon: 'ri:database-2-line',
  },
  children: [
    {
      path: 'index',
      name: 'mockExampleIndex',
      component: () => import('@/views/mock_example/index.vue'),
      meta: {
        title: 'Mock',
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/mock_example',
      },
    },
  ],
}

export default routes

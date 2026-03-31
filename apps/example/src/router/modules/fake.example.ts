import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/fake_example',
  component: Layout,
  meta: {
    title: '假数据',
    icon: 'i-ri:database-2-line',
  },
  children: [
    {
      path: '',
      name: 'fakeExample',
      component: () => import('@/views/fake_example/index.vue'),
      meta: {
        title: '假数据',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

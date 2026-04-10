import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/antdv_next_example',
  component: Layout,
  meta: {
    title: 'Antdv Next',
    icon: 'https://www.antdv-next.com/antdv-next.svg',
    menu: false,
  },
  children: [
    {
      path: '',
      name: 'antdvNextExample',
      component: () => import('@/views/antdv_next_example/index.vue'),
      meta: {
        title: 'Antdv Next',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

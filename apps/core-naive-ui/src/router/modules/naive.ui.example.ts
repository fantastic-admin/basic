import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/naive_ui_example',
  component: Layout,
  meta: {
    title: 'Naive UI',
    icon: 'i-logos:naiveui',
    menu: false,
  },
  children: [
    {
      path: '',
      name: 'naiveUiExample',
      component: () => import('@/views/naive_ui_example/index.vue'),
      meta: {
        title: 'Naive UI',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

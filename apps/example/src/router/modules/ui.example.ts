import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/ui_example',
  component: Layout,
  meta: {
    title: 'UI',
    icon: 'i-whh:jqueryui',
    menu: false,
  },
  children: [
    {
      path: '',
      name: 'uiExample',
      component: () => import('@/views/ui_example/index.vue'),
      meta: {
        title: 'UI',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

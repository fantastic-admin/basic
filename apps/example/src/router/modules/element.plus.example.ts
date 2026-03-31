import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/element_plus_example',
  component: Layout,
  meta: {
    title: 'Element Plus',
    icon: 'i-ep:element-plus',
    menu: false,
  },
  children: [
    {
      path: '',
      name: 'elementPlusExample',
      component: () => import('@/views/element_plus_example/index.vue'),
      meta: {
        title: 'Element Plus',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

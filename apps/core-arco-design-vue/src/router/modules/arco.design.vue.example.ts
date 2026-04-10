import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/arco_design_vue_example',
  component: Layout,
  meta: {
    title: 'Arco Design Vue',
    icon: 'https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico',
    menu: false,
  },
  children: [
    {
      path: '',
      name: 'arcoDesignVueExample',
      component: () => import('@/views/arco_design_vue_example/index.vue'),
      meta: {
        title: 'Arco Design Vue',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

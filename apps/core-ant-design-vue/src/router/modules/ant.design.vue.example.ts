import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/ant_design_vue_example',
  component: Layout,
  meta: {
    title: 'Ant Design Vue',
    icon: 'https://antdv.com/favicon.ico',
    menu: false,
  },
  children: [
    {
      path: '',
      name: 'antDesignVueExample',
      component: () => import('@/views/ant_design_vue_example/index.vue'),
      meta: {
        title: 'Ant Design Vue',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

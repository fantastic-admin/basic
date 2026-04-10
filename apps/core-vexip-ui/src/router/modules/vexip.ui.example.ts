import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/vexip_ui_example',
  component: Layout,
  meta: {
    title: 'Vexip UI',
    icon: 'https://www.vexipui.com/vexip-ui.svg',
    menu: false,
  },
  children: [
    {
      path: '',
      name: 'vexipUiExample',
      component: () => import('@/views/vexip_ui_example/index.vue'),
      meta: {
        title: 'Vexip UI',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

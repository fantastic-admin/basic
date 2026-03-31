import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/keep_alive_example',
  component: Layout,
  meta: {
    title: '页面保活',
    icon: 'i-cil:window-restore',
  },
  children: [
    {
      path: '',
      name: 'keepAliveExample',
      component: () => import('@/views/keep_alive_example/index.vue'),
      meta: {
        title: '页面保活',
        menu: false,
        breadcrumb: false,
        keepAlive: true,
      },
    },
  ],
}

export default routes

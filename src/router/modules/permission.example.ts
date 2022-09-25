import type { Route } from '@/global'

const Layout = () => import('@/layouts/index.vue')

const routes: Route.recordRaw = {
  path: '/permission_example',
  component: Layout,
  redirect: '/permission_example/index',
  name: 'permissionExample',
  meta: {
    title: '权限验证',
    icon: 'ep:key',
  },
  children: [
    {
      path: 'index',
      name: 'permissionExampleIndex',
      component: () => import('@/views/permission_example/index.vue'),
      meta: {
        title: '权限验证',
        auth: ['permission.browse'],
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/permission_example',
      },
    },
  ],
}

export default routes

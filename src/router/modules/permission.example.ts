import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/permission_example',
  component: Layout,
  redirect: '/permission_example/index',
  name: 'permissionExample',
  meta: {
    title: '权限验证',
    icon: 'ri:shield-keyhole-line',
  },
  children: [
    {
      path: 'index',
      name: 'permissionExampleIndex',
      component: () => import('@/views/permission_example/index.vue'),
      meta: {
        title: '权限验证',
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/permission_example',
      },
    },
    {
      path: 'test',
      name: 'permissionExampleTest',
      component: () => import('@/views/permission_example/test.vue'),
      meta: {
        title: '测试页面',
        auth: ['permission.browse'],
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/permission_example',
      },
    },
  ],
}

export default routes

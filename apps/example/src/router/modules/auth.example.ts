import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/auth_example',
  component: Layout,
  name: 'authExample',
  meta: {
    title: '权限验证',
    icon: 'i-ri:shield-keyhole-line',
  },
  children: [
    {
      path: '',
      name: 'authExampleIndex',
      component: () => import('@/views/auth_example/index.vue'),
      meta: {
        title: '权限验证',
        menu: false,
        breadcrumb: false,
        activeMenu: '/auth_example',
      },
    },
    {
      path: 'test',
      name: 'authExampleTest',
      component: () => import('@/views/auth_example/test.vue'),
      meta: {
        title: '测试页面',
        auth: ['pages.general:browse'],
        menu: false,
        breadcrumb: false,
        activeMenu: '/auth_example',
      },
    },
  ],
}

export default routes

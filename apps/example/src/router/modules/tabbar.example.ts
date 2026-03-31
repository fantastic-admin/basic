import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/tabbar_example',
  component: Layout,
  name: 'tabbarExample',
  meta: {
    title: '标签栏',
    icon: 'i-ic:round-tab',
  },
  children: [
    {
      path: 'api',
      name: 'tabbarExampleApi',
      component: () => import('@/views/tabbar_example/api.vue'),
      meta: {
        title: '常用API',
      },
    },
  ],
}

export default routes

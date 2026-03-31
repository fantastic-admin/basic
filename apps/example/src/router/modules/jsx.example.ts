import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/jsx_example',
  component: Layout,
  meta: {
    title: 'JSX',
    icon: 'i-file-icons:jsx',
  },
  children: [
    {
      path: '',
      name: 'jsxExample',
      component: () => import('@/views/jsx_example/index.vue'),
      meta: {
        title: 'JSX',
        menu: false,
        breadcrumb: false,
      },
    },
  ],
}

export default routes

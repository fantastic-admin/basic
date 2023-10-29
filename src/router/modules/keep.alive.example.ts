import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/keep_alive_example',
  component: Layout,
  redirect: '/keep_alive_example/page',
  name: 'keepAliveExample',
  meta: {
    title: '页面缓存',
    icon: 'cil:window-restore',
  },
  children: [
    {
      path: 'page',
      name: 'keepAliveExamplePage',
      component: () => import('@/views/keep_alive_example/page.vue'),
      meta: {
        title: '页面缓存',
        breadcrumb: false,
      },
    },
    {
      path: 'detail',
      name: 'keepAliveExampleDetail',
      component: () => import('@/views/keep_alive_example/detail.vue'),
      meta: {
        title: '平级路由',
        sidebar: false,
        activeMenu: '/keep_alive_example/page',
      },
    },
    {
      path: 'nested',
      redirect: '/keep_alive_example/nested/detail',
      meta: {
        title: '嵌套路由',
        sidebar: false,
      },
      children: [
        {
          path: 'detail',
          name: 'keepAliveExampleNestedDetail',
          component: () => import('@/views/keep_alive_example/detail.vue'),
          meta: {
            title: '嵌套路由',
            activeMenu: '/keep_alive_example/page',
          },
        },
      ],
    },
    {
      path: 'nested1',
      name: 'keepAliveExampleNested1',
      component: () => import('@/views/keep_alive_example/nested/nested.vue'),
      meta: {
        title: '路由多级缓存1',
      },
      children: [
        {
          path: 'nested2',
          name: 'keepAliveExampleNested2',
          component: () => import('@/views/keep_alive_example/nested/nested/nested.vue'),
          meta: {
            title: '路由多级缓存1-1',
          },
          children: [
            {
              path: 'index',
              name: 'keepAliveExampleNestedIndex',
              component: () => import('@/views/keep_alive_example/nested/nested/nested/index.vue'),
              meta: {
                title: '路由多级缓存1-1-1',
                cache: true,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default routes

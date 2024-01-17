import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/multilevel_menu_example',
  component: Layout,
  redirect: '/multilevel_menu_example/page',
  name: 'multilevelMenuExample',
  meta: {
    title: '多级导航',
    icon: 'i-heroicons-solid:menu-alt-3',
  },
  children: [
    {
      path: 'page',
      name: 'multilevelMenuExample1',
      component: () => import('@/views/multilevel_menu_example/page.vue'),
      meta: {
        title: '导航1',
      },
    },
    {
      path: 'level2',
      name: 'multilevelMenuExample2',
      redirect: '/multilevel_menu_example/level2/page',
      meta: {
        title: '导航2',
      },
      children: [
        {
          path: 'page',
          name: 'multilevelMenuExample2-1',
          component: () => import('@/views/multilevel_menu_example/level2/page.vue'),
          meta: {
            title: '导航2-1',
          },
        },
        {
          path: 'level3',
          name: 'multilevelMenuExample2-2',
          redirect: '/multilevel_menu_example/level2/level3/page1',
          meta: {
            title: '导航2-2',
          },
          children: [
            {
              path: 'page1',
              name: 'multilevelMenuExample2-2-1',
              component: () => import('@/views/multilevel_menu_example/level2/level3/page1.vue'),
              meta: {
                title: '导航2-2-1',
              },
            },
            {
              path: 'page2',
              name: 'multilevelMenuExample2-2-2',
              component: () => import('@/views/multilevel_menu_example/level2/level3/page2.vue'),
              meta: {
                title: '导航2-2-2',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default routes

import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/breadcrumb_example',
  component: Layout,
  name: 'breadcrumbExample',
  meta: {
    title: '面包屑导航',
    icon: 'i-ic:twotone-double-arrow',
  },
  children: [
    {
      path: 'list1',
      name: 'breadcrumbExampleList1',
      component: () => import('@/views/breadcrumb_example/list1.vue'),
      meta: {
        title: '列表1（平级模式）',
      },
    },
    {
      path: 'detail1',
      name: 'breadcrumbExampleDetail1',
      component: () => import('@/views/breadcrumb_example/detail1.vue'),
      meta: {
        title: '详情1',
        menu: false,
        activeMenu: '/breadcrumb_example/list1',
      },
    },
    {
      path: 'list2',
      meta: {
        title: '列表2（层级模式）',
      },
      children: [
        {
          path: '',
          name: 'breadcrumbExampleList2',
          component: () => import('@/views/breadcrumb_example/list2.vue'),
          meta: {
            title: '列表2（层级模式）',
            menu: false,
            breadcrumb: false,
          },
        },
        {
          path: 'detail2',
          name: 'breadcrumbExampleDetail2',
          component: () => import('@/views/breadcrumb_example/detail2.vue'),
          meta: {
            title: '详情2',
            menu: false,
            activeMenu: '/breadcrumb_example/list2',
          },
        },
      ],
    },
  ],
}

export default routes

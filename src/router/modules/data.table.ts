import type { Route } from '@/global'

const Layout = () => import('@/layouts/index.vue')

const routes: Route.recordRaw = {
  path: '/data_table',
  component: Layout,
  redirect: '/data_table/index',
  name: 'dataTable',
  meta: {
    title: '数据表格',
    icon: 'ep:document',
  },
  children: [
    {
      path: 'index',
      name: 'dataTablePage',
      component: () => import('@/views/data_table/data.table.vue'),
      meta: {
        title: '数据表格',
        auth: ['permission.browse'],
        sidebar: false,
        breadcrumb: false,
        activeMenu: '/data_table',
      },
    },
  ],
}

export default routes

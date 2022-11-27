import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const routes: RouteRecordRaw = {
  path: '/link',
  component: Layout,
  name: 'externalLinkExample',
  meta: {
    title: '外链',
    icon: 'sidebar-external-link',
  },
  children: [
    {
      path: 'https://gitee.com/hooray/fantastic-admin',
      redirect: '',
      meta: {
        title: 'Gitee 仓库',
      },
    },
    {
      path: 'https://github.com/hooray/fantastic-admin',
      redirect: '',
      meta: {
        title: 'Github 仓库',
      },
    },
  ],
}

export default routes

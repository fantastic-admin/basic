import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const routes: RouteRecordRaw = {
  path: '/link',
  component: Layout,
  redirect: '/link/gitee',
  name: 'externalLinkExample',
  meta: {
    title: '外链',
    icon: 'sidebar-external-link',
  },
  children: [
    {
      path: 'gitee',
      redirect: '',
      name: 'externalLinkGitee',
      meta: {
        title: 'Gitee 仓库',
        link: 'https://gitee.com/hooray/fantastic-admin',
      },
    },
    {
      path: 'github',
      redirect: '',
      name: 'externalLinkGithub',
      meta: {
        title: 'Github 仓库',
        link: 'https://github.com/hooray/fantastic-admin',
      },
    },
  ],
}

export default routes

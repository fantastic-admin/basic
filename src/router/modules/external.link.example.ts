import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

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
        link: 'https://gitee.com/fantastic-admin/basic',
      },
    },
    {
      path: 'github',
      redirect: '',
      name: 'externalLinkGithub',
      meta: {
        title: 'Github 仓库',
        link: 'https://github.com/fantastic-admin/basic',
      },
    },
  ],
}

export default routes

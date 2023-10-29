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
    icon: 'ri:external-link-fill',
  },
  children: [
    {
      path: 'gitee',
      redirect: '',
      name: 'linkExampleWindowGitee',
      meta: {
        title: 'Gitee 仓库',
        link: 'https://gitee.com/fantastic-admin/basic',
      },
    },
    {
      path: 'github',
      redirect: '',
      name: 'linkExampleWindowGithub',
      meta: {
        title: 'Github 仓库',
        link: 'https://github.com/fantastic-admin/basic',
      },
    },
  ],
}

export default routes

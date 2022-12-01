import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

const routes: RouteRecordRaw[] = [
  {
    path: '/official',
    redirect: '/official/fantastic-startkit',
    meta: {
      title: '官方周边',
      icon: 'ep:grid',
    },
    children: [
      {
        path: 'fantastic-startkit',
        redirect: '',
        name: 'officialFantasticStartkit',
        meta: {
          title: 'Fantastic-startkit 项目启动套件',
          link: 'https://hooray.gitee.io/fantastic-startkit/',
        },
      },
      {
        path: 'one-step-admin',
        redirect: '',
        name: 'officialOneStepAdmin',
        meta: {
          title: 'One-step-admin 干啥都快人一步的中后台框架',
          link: 'https://hooray.gitee.io/one-step-admin/',
        },
      },
    ],
  },
  {
    path: '/cooperation',
    redirect: '/cooperation/vform',
    meta: {
      title: '战略合作',
      icon: 'sidebar-cooperation',
    },
    children: [
      {
        path: 'vform',
        redirect: '',
        name: 'cooperationVform',
        meta: {
          title: 'VForm 低代码表单',
          link: 'https://www.vform666.com',
        },
      },
      {
        path: 'quickadmin',
        redirect: '',
        name: 'cooperationQuickadmin',
        meta: {
          title: 'QuickAdmin 快速开发管理框架',
          link: 'https://gitee.com/sciqtw/quickadmin',
        },
      },
    ],
  },
  {
    path: '/video/coming/soon',
    component: Layout,
    meta: {
      title: '视频教程',
      icon: 'sidebar-videos',
    },
    children: [
      {
        path: '',
        name: 'videosComingSoon',
        component: () => import('@/views/videos_example/coming.soon.vue'),
        meta: {
          title: '视频教程',
          sidebar: false,
          breadcrumb: false,
        },
      },
    ],
  },
]

export default routes

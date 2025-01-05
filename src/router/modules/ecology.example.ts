import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw[] = [
  {
    path: '/official',
    redirect: '/official/fantastic-startkit',
    component: Layout,
    meta: {
      title: '官方周边',
      icon: 'i-ion:apps',
    },
    children: [
      {
        path: 'fantastic-startkit',
        redirect: '',
        name: 'officialFantasticStartkit',
        meta: {
          title: 'Fantastic-startkit 项目启动套件',
          icon: 'https://cn.vuejs.org/logo.svg',
          link: 'https://hooray.github.io/fantastic-startkit/',
        },
      },
      {
        path: 'one-step-admin',
        redirect: '',
        name: 'officialOneStepAdmin',
        meta: {
          title: 'One-step-admin 干啥都快人一步的中后台框架',
          icon: 'https://one-step-admin.hurui.me/logo.png',
          link: 'https://one-step-admin.hurui.me',
        },
      },
      {
        path: 'fantastic-mobile',
        redirect: '',
        name: 'officialFantasticMobile',
        meta: {
          title: 'Fantastic-mobile 自成一派的 H5 框架',
          icon: 'https://fantastic-mobile.hurui.me/logo.png',
          link: 'https://fantastic-mobile.hurui.me',
        },
      },
    ],
  },
  {
    path: '/recommand',
    redirect: '/recommand/vform',
    component: Layout,
    meta: {
      title: '友情推荐',
      icon: 'i-ic:outline-handshake',
    },
    children: [
      {
        path: 'vform',
        redirect: '',
        name: 'recommandVform',
        meta: {
          title: 'VForm 低代码表单',
          icon: 'https://www.vform666.com/mini-logo.png',
          link: 'https://www.vform666.com',
        },
      },
      {
        path: 'form-create',
        redirect: '',
        name: 'recommandFormcreate',
        meta: {
          title: 'FormCreate 可视化表单设计器',
          icon: 'https://form-create.com/logo.png',
          link: 'https://form-create.com',
        },
      },
      {
        path: 'quickadmin',
        redirect: '',
        name: 'recommandQuickadmin',
        meta: {
          title: 'QuickAdmin 快速开发管理框架',
          icon: 'https://doc.quickadmin.cn/logo.png',
          link: 'https://doc.quickadmin.cn',
        },
      },
      {
        path: 'vexip',
        redirect: '',
        name: 'recommandVexip',
        meta: {
          title: 'Vexip UI 组件库',
          icon: 'https://www.vexipui.com/vexip-ui.png',
          link: 'https://www.vexipui.com/zh-CN',
        },
      },
      {
        path: 'mineadmin',
        redirect: '',
        name: 'recommandMineadmin',
        meta: {
          title: 'MineAdmin 开箱即用后台系统',
          icon: 'https://doc.mineadmin.com/logo.svg',
          link: 'https://github.com/mineadmin/mineadmin',
        },
      },
    ],
  },
]

export default routes

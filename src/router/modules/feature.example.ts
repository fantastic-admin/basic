import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/feature_example',
  component: Layout,
  redirect: '/feature_example/clipboard',
  name: 'featureExample',
  meta: {
    title: '功能',
    icon: 'ic:twotone-auto-awesome',
  },
  children: [
    {
      path: 'vueuse',
      name: 'featureExampleVueuse',
      component: () => import('@/views/feature_example/vueuse.vue'),
      meta: {
        title: 'VueUse',
        icon: 'logos:vueuse',
      },
    },
    {
      path: 'rules',
      name: 'featureExampleRules',
      component: () => import('@/views/feature_example/rules.vue'),
      meta: {
        title: '常用正则',
        icon: 'mdi:regex',
      },
    },
    {
      path: 'tableautoheight',
      name: 'featureExampleTableautoheight',
      component: () => import('@/views/feature_example/table.autoheight.vue'),
      meta: {
        title: '表格高度自适应',
        i18n: 'route.feature.tableautoheight',
        icon: 'tabler:arrow-autofit-height',
      },
    },
    {
      path: 'reload',
      name: 'featureExampleReload',
      component: () => import('@/views/feature_example/reload.vue'),
      meta: {
        title: '主页面刷新',
        icon: 'iconoir:refresh-double',
        cache: true,
      },
    },
    {
      path: 'menuswitch',
      name: 'featureExampleMenuswitch',
      component: () => import('@/views/feature_example/menuswitch.vue'),
      meta: {
        title: '主导航切换',
        icon: 'charm:menu-hamburger',
      },
    },
    {
      path: 'leavetips',
      name: 'featureExampleLeavetips',
      component: () => import('@/views/feature_example/leavetips.vue'),
      meta: {
        title: '页面离开提醒',
        icon: 'pepicons:leave',
      },
    },
    {
      path: 'scroll',
      name: 'featureExampleScroll',
      component: () => import('@/views/feature_example/scroll.vue'),
      meta: {
        title: '记录滚动位置',
        icon: 'carbon:auto-scroll',
        cache: true,
      },
    },
  ],
}

export default routes

import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/component_example',
  component: Layout,
  name: 'componentExample',
  meta: {
    title: '组件',
    icon: 'bx:bxs-component',
  },
  children: [
    {
      path: 'basic',
      name: 'componentExampleBasic',
      component: () => import('@/views/component_basic_example/index.vue'),
      meta: {
        title: '基础组件',
        icon: 'ep:element-plus',
      },
    },
    {
      path: 'builtIn',
      name: 'componentExampleBuiltIn',
      component: () => import('@/views/component_built_in_example/index.vue'),
      meta: {
        title: '内建组件',
      },
    },
    {
      path: 'extend',
      redirect: 'pageheader',
      name: 'componentExampleExtend',
      meta: {
        title: '扩展组件',
      },
      children: [
        {
          path: 'pageheader',
          name: 'componentExampleExtendPageheader',
          component: () => import('@/views/component_extend_example/pageheader.demo.vue'),
          meta: {
            title: '页头',
          },
        },
        {
          path: 'pagemain',
          name: 'componentExampleExtendPagemain',
          component: () => import('@/views/component_extend_example/pagemain.demo.vue'),
          meta: {
            title: '内容块',
          },
        },
        {
          path: 'actionbar',
          name: 'componentExampleExtendActionbar',
          component: () => import('@/views/component_extend_example/actionbar.demo.vue'),
          meta: {
            title: '固定底部操作栏',
          },
        },
        {
          path: 'searchbar',
          name: 'componentExampleExtendSearchbar',
          component: () => import('@/views/component_extend_example/searchbar.demo.vue'),
          meta: {
            title: '搜索面板',
          },
        },
        {
          path: 'upload',
          name: 'componentExampleExtendUpload',
          component: () => import('@/views/component_extend_example/upload.demo.vue'),
          meta: {
            title: '上传',
          },
        },
        {
          path: 'imagepreview',
          name: 'componentExampleExtendImagePreview',
          component: () => import('@/views/component_extend_example/image.preview.demo.vue'),
          meta: {
            title: '图片预览',
          },
        },
        {
          path: 'trend',
          name: 'componentExampleExtendTrend',
          component: () => import('@/views/component_extend_example/trend.demo.vue'),
          meta: {
            title: '趋势标记',
          },
        },
        {
          path: 'pcas',
          name: 'componentExampleExtendPcas',
          component: () => import('@/views/component_extend_example/pcas.demo.vue'),
          meta: {
            title: '省市区街道联动',
          },
        },
      ],
    },
  ],
}

export default routes

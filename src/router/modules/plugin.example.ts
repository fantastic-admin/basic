import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/plugin_example',
  component: Layout,
  redirect: '/plugin_example/qrcode',
  name: 'pluginExample',
  meta: {
    title: '插件',
    icon: 'i-clarity:plugin-outline-alerted',
  },
  children: [
    {
      path: 'hooksplus',
      name: 'pluginExampleHooksPlus',
      component: () => import('@/views/plugin_example/hooks.plus.vue'),
      meta: {
        title: 'VueHooks Plus',
        icon: 'https://inhiblabcore.github.io/docs/hooks/logo.svg',
      },
    },
    {
      path: 'qrcode',
      name: 'pluginExampleQrcode',
      component: () => import('@/views/plugin_example/qrcode.vue'),
      meta: {
        title: '二维码',
        icon: 'i-material-symbols:qr-code',
      },
    },
    {
      path: 'print',
      name: 'pluginExamplePrint',
      component: () => import('@/views/plugin_example/print.vue'),
      meta: {
        title: '打印',
        icon: 'i-ri:printer-line',
      },
    },
    {
      path: 'esign',
      name: 'pluginExampleEsign',
      component: () => import('@/views/plugin_example/esign.vue'),
      meta: {
        title: '电子签名',
        icon: 'i-mdi:draw',
      },
    },
    {
      path: 'animation',
      name: 'pluginExampleAnimation',
      component: () => import('@/views/plugin_example/animation.vue'),
      meta: {
        title: '过渡动画',
        icon: 'i-clarity:animation-line',
      },
    },
    {
      path: 'swiper',
      name: 'pluginExampleSwiper',
      component: () => import('@/views/plugin_example/swiper.vue'),
      meta: {
        title: '轮播动画',
        icon: 'i-carbon:carousel-horizontal',
      },
    },
    {
      path: 'chart',
      redirect: '/chart/echarts',
      name: 'pluginExampleChart',
      meta: {
        title: '图表',
        icon: 'i-ri:bar-chart-2-line',
      },
      children: [
        {
          path: 'echarts',
          name: 'pluginExampleChartEcharts',
          component: () => import('@/views/plugin_example/echarts.vue'),
          meta: {
            title: 'Echarts',
          },
        },
        {
          path: 'vchart',
          name: 'pluginExampleChartVchart',
          component: () => import('@/views/plugin_example/vchart.vue'),
          meta: {
            title: 'VChart',
          },
        },
        {
          path: 'g2plot',
          name: 'pluginExampleChartG2plot',
          component: () => import('@/views/plugin_example/g2plot.vue'),
          meta: {
            title: 'G2plot',
          },
        },
      ],
    },
    {
      path: 'tinymce',
      name: 'pluginExampleTinymce',
      component: () => import('@/views/plugin_example/tinymce.vue'),
      meta: {
        title: 'TinyMCE 编辑器',
        icon: 'i-file-icons:tinymce',
      },
    },
    {
      path: 'markdown',
      name: 'pluginExampleMarkdown',
      component: () => import('@/views/plugin_example/markdown.vue'),
      meta: {
        title: 'Markdown 编辑器',
        icon: 'i-teenyicons:markdown-outline',
      },
    },
    {
      path: 'currencyinput',
      name: 'pluginExampleCurrencyInput',
      component: () => import('@/views/plugin_example/currency.input.vue'),
      meta: {
        title: '货币格式输入',
        icon: 'i-ph:currency-cny-bold',
      },
    },
    {
      path: 'splitpanes',
      name: 'pluginExampleSplitpanes',
      component: () => import('@/views/plugin_example/splitpanes.vue'),
      meta: {
        title: '拆分面板',
        icon: 'i-icon-park-outline:split-cells',
      },
    },
    {
      path: 'vxe-table',
      name: 'pluginExampleVxeTable',
      component: () => import('@/views/plugin_example/vxe-table.vue'),
      meta: {
        title: 'vxe-table',
        icon: 'i-mdi:table-large',
      },
    },
    {
      path: 'cropper',
      name: 'pluginExampleCropper',
      component: () => import('@/views/plugin_example/cropper.vue'),
      meta: {
        title: '图片裁剪',
        icon: 'i-mdi:crop',
      },
    },
  ],
}

export default routes

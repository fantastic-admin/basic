import type { RouteRecordRaw } from 'vue-router'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '/icon_example',
  component: Layout,
  redirect: '/icon_example/svg',
  name: 'iconExample',
  meta: {
    title: '扩展图标',
    icon: 'i-ri:remixicon-line',
  },
  children: [
    {
      path: 'iconify',
      name: 'iconExampleIconify',
      component: () => import('@/views/icon_example/iconify.vue'),
      meta: {
        title: 'Iconify',
      },
    },
    {
      path: 'svg',
      name: 'iconExampleSvg',
      component: () => import('@/views/icon_example/svg.vue'),
      meta: {
        title: 'SVG Icon',
      },
    },
    {
      path: 'image',
      name: 'iconExampleImage',
      component: () => import('@/views/icon_example/image.vue'),
      meta: {
        title: 'Image Icon',
      },
    },
  ],
}

export default routes

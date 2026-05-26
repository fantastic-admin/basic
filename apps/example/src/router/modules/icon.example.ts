import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw = {
  path: '/icon_example',
  redirect: '/component_example/icon',
  meta: {
    title: '图标',
    icon: 'i-ri:remixicon-line',
  },
}

export default routes

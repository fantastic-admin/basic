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
    icon: 'i-bx:bxs-component',
  },
  children: [
    {
      path: 'avatar',
      name: 'componentExampleAvatar',
      component: () => import('@/views/component_example/avatar/index.vue'),
      meta: {
        title: '头像',
      },
    },
    {
      path: 'button',
      name: 'componentExampleButton',
      component: () => import('@/views/component_example/button/index.vue'),
      meta: {
        title: '按钮',
      },
    },
    {
      path: 'button_group',
      name: 'componentExampleButtonGroup',
      component: () => import('@/views/component_example/button_group/index.vue'),
      meta: {
        title: '按钮组',
      },
    },
    {
      path: 'card',
      name: 'componentExampleCard',
      component: () => import('@/views/component_example/card/index.vue'),
      meta: {
        title: '卡片',
      },
    },
    {
      path: 'checkbox',
      name: 'componentExampleCheckbox',
      component: () => import('@/views/component_example/checkbox/index.vue'),
      meta: {
        title: '复选框',
      },
    },
    {
      path: 'collapsible',
      name: 'componentExampleCollapsible',
      component: () => import('@/views/component_example/collapsible/index.vue'),
      meta: {
        title: '折叠面板',
      },
    },
    {
      path: 'context_menu',
      name: 'componentExampleContextMenu',
      component: () => import('@/views/component_example/context_menu/index.vue'),
      meta: {
        title: '右键菜单',
      },
    },
    {
      path: 'divider',
      name: 'componentExampleDivider',
      component: () => import('@/views/component_example/divider/index.vue'),
      meta: {
        title: '分割线',
      },
    },
    {
      path: 'drawer',
      name: 'componentExampleDrawer',
      component: () => import('@/views/component_example/drawer/index.vue'),
      meta: {
        title: '抽屉',
      },
    },
    {
      path: 'dropdown',
      name: 'componentExampleDropdown',
      component: () => import('@/views/component_example/dropdown/index.vue'),
      meta: {
        title: '下拉菜单',
      },
    },
    {
      path: 'file_upload',
      name: 'componentExampleFileUpload',
      component: () => import('@/views/component_example/file_upload/index.vue'),
      meta: {
        title: '文件上传',
      },
    },
    {
      path: 'fixed_bar',
      name: 'componentExampleFixedactionbar',
      component: () => import('@/views/component_example/fixed_bar/index.vue'),
      meta: {
        title: '固定栏',
        copyright: false,
      },
    },
    {
      path: 'hover_card',
      name: 'componentExampleHoverCard',
      component: () => import('@/views/component_example/hover_card/index.vue'),
      meta: {
        title: '悬浮卡片',
      },
    },
    {
      path: 'image_preview',
      name: 'componentExampleImagePreview',
      component: () => import('@/views/component_example/image_preview/index.vue'),
      meta: {
        title: '图片预览',
      },
    },
    {
      path: 'image_upload',
      name: 'componentExampleImageUpload',
      component: () => import('@/views/component_example/image_upload/index.vue'),
      meta: {
        title: '图片上传',
      },
    },
    {
      path: 'input',
      name: 'componentExampleInput',
      component: () => import('@/views/component_example/input/index.vue'),
      meta: {
        title: '输入框',
      },
    },
    {
      path: 'input_otp',
      name: 'componentExampleInputOtp',
      component: () => import('@/views/component_example/input_otp/index.vue'),
      meta: {
        title: '一次性密码输入框',
      },
    },
    {
      path: 'kbd',
      name: 'componentExampleKbd',
      component: () => import('@/views/component_example/kbd/index.vue'),
      meta: {
        title: '键盘',
      },
    },
    {
      path: 'modal',
      name: 'componentExampleModal',
      component: () => import('@/views/component_example/modal/index.vue'),
      meta: {
        title: '弹窗',
      },
    },
    {
      path: 'number_field',
      name: 'componentExampleNumberField',
      component: () => import('@/views/component_example/number_field/index.vue'),
      meta: {
        title: '数字输入框',
      },
    },
    {
      path: 'page_header',
      name: 'componentExamplePageheader',
      component: () => import('@/views/component_example/page_header/index.vue'),
      meta: {
        title: '页头',
      },
    },
    {
      path: 'page_main',
      name: 'componentExamplePagemain',
      component: () => import('@/views/component_example/page_main/index.vue'),
      meta: {
        title: '内容块',
      },
    },
    {
      path: 'password_strength',
      name: 'componentExamplePasswordStrength',
      component: () => import('@/views/component_example/password_strength/index.vue'),
      meta: {
        title: '密码强度',
      },
    },
    {
      path: 'popover',
      name: 'componentExamplePopover',
      component: () => import('@/views/component_example/popover/index.vue'),
      meta: {
        title: '浮动面板',
      },
    },
    {
      path: 'progress',
      name: 'componentExampleProgress',
      component: () => import('@/views/component_example/progress/index.vue'),
      meta: {
        title: '进度条',
      },
    },
    {
      path: 'scroll_area',
      name: 'componentExampleScrollArea',
      component: () => import('@/views/component_example/scroll_area/index.vue'),
      meta: {
        title: '滚动区域',
      },
    },
    {
      path: 'search_bar',
      name: 'componentExampleSearchBar',
      component: () => import('@/views/component_example/search_bar/index.vue'),
      meta: {
        title: '搜索面板',
      },
    },
    {
      path: 'select',
      name: 'componentExampleSelect',
      component: () => import('@/views/component_example/select/index.vue'),
      meta: {
        title: '选择器',
      },
    },
    {
      path: 'slider',
      name: 'componentExampleSlider',
      component: () => import('@/views/component_example/slider/index.vue'),
      meta: {
        title: '滑块',
      },
    },
    {
      path: 'switch',
      name: 'componentExampleSwitch',
      component: () => import('@/views/component_example/switch/index.vue'),
      meta: {
        title: '开关',
      },
    },
    {
      path: 'tabs',
      name: 'componentExampleTabs',
      component: () => import('@/views/component_example/tabs/index.vue'),
      meta: {
        title: '标签页',
      },
    },
    {
      path: 'textarea',
      name: 'componentExampleTextarea',
      component: () => import('@/views/component_example/textarea/index.vue'),
      meta: {
        title: '文本域',
      },
    },
    {
      path: 'toast',
      name: 'componentExampleToast',
      component: () => import('@/views/component_example/toast/index.vue'),
      meta: {
        title: '轻提示',
      },
    },
    {
      path: 'tooltip',
      name: 'componentExampleTooltip',
      component: () => import('@/views/component_example/tooltip/index.vue'),
      meta: {
        title: '文字提示',
      },
    },
    {
      path: 'trend',
      name: 'componentExampleTrend',
      component: () => import('@/views/component_example/trend/index.vue'),
      meta: {
        title: '趋势标记',
      },
    },
  ],
}

export default routes

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
      path: 'basic',
      name: 'componentExampleBasic',
      component: () => import('@/views/component_basic_example/index.vue'),
      meta: {
        title: '基础组件',
        icon: 'i-ep:element-plus',
      },
    },
    {
      path: 'builtIn',
      name: 'componentExampleBuiltIn',
      meta: {
        title: '内建组件',
      },
      children: [
        {
          path: 'avatar',
          name: 'componentExampleBuiltInAvatar',
          component: () => import('@/views/component_built_in_example/avatar.vue'),
          meta: {
            title: '头像',
          },
        },
        {
          path: 'button',
          name: 'componentExampleBuiltInButton',
          component: () => import('@/views/component_built_in_example/button.vue'),
          meta: {
            title: '按钮',
          },
        },
        {
          path: 'card',
          name: 'componentExampleBuiltInCard',
          component: () => import('@/views/component_built_in_example/card.vue'),
          meta: {
            title: '卡片',
          },
        },
        {
          path: 'checkbox',
          name: 'componentExampleBuiltInCheckbox',
          component: () => import('@/views/component_built_in_example/checkbox.vue'),
          meta: {
            title: '复选框',
          },
        },
        {
          path: 'contextmenu',
          name: 'componentExampleBuiltInContextMenu',
          component: () => import('@/views/component_built_in_example/contextmenu.vue'),
          meta: {
            title: '右键菜单',
          },
        },
        {
          path: 'divider',
          name: 'componentExampleBuiltInDivider',
          component: () => import('@/views/component_built_in_example/divider.vue'),
          meta: {
            title: '分割线',
          },
        },
        {
          path: 'drawer',
          name: 'componentExampleBuiltInDrawer',
          component: () => import('@/views/component_built_in_example/drawer.vue'),
          meta: {
            title: '抽屉',
          },
        },
        {
          path: 'dropdown',
          name: 'componentExampleBuiltInDropdown',
          component: () => import('@/views/component_built_in_example/dropdown.vue'),
          meta: {
            title: '下拉菜单',
          },
        },
        {
          path: 'fixedactionbar',
          name: 'componentExampleBuiltInFixedactionbar',
          component: () => import('@/views/component_built_in_example/fixedactionbar.vue'),
          meta: {
            title: '固定底部操作栏',
            copyright: false,
          },
        },
        {
          path: 'input',
          name: 'componentExampleBuiltInInput',
          component: () => import('@/views/component_built_in_example/input.vue'),
          meta: {
            title: '输入框',
          },
        },
        {
          path: 'kbd',
          name: 'componentExampleBuiltInKbd',
          component: () => import('@/views/component_built_in_example/kbd.vue'),
          meta: {
            title: '键盘',
          },
        },
        {
          path: 'modal',
          name: 'componentExampleBuiltInModal',
          component: () => import('@/views/component_built_in_example/modal.vue'),
          meta: {
            title: '弹窗',
          },
        },
        {
          path: 'notification',
          name: 'componentExampleBuiltInNotification',
          component: () => import('@/views/component_built_in_example/notification.vue'),
          meta: {
            title: '通知',
          },
        },
        {
          path: 'pageheader',
          name: 'componentExampleBuiltInPageheader',
          component: () => import('@/views/component_built_in_example/pageheader.vue'),
          meta: {
            title: '页头',
          },
        },
        {
          path: 'pagemain',
          name: 'componentExampleBuiltInPagemain',
          component: () => import('@/views/component_built_in_example/pagemain.vue'),
          meta: {
            title: '内容块',
          },
        },
        {
          path: 'passwordstrength',
          name: 'componentExampleBuiltInPasswordStrength',
          component: () => import('@/views/component_built_in_example/passwordstrength.vue'),
          meta: {
            title: '密码强度',
          },
        },
        {
          path: 'pininput',
          name: 'componentExampleBuiltInPinInput',
          component: () => import('@/views/component_built_in_example/pininput.vue'),
          meta: {
            title: '数字输入框',
          },
        },
        {
          path: 'popover',
          name: 'componentExampleBuiltInPopover',
          component: () => import('@/views/component_built_in_example/popover.vue'),
          meta: {
            title: '浮动面板',
          },
        },
        {
          path: 'scrollarea',
          name: 'componentExampleBuiltInScrollarea',
          component: () => import('@/views/component_built_in_example/scrollarea.vue'),
          meta: {
            title: '滚动区域',
          },
        },
        {
          path: 'searchbar',
          name: 'componentExampleBuiltInSearchbar',
          component: () => import('@/views/component_built_in_example/searchbar.vue'),
          meta: {
            title: '搜索面板',
          },
        },
        {
          path: 'select',
          name: 'componentExampleBuiltInSelect',
          component: () => import('@/views/component_built_in_example/select.vue'),
          meta: {
            title: '选择器',
          },
        },
        {
          path: 'switch',
          name: 'componentExampleBuiltInSwitch',
          component: () => import('@/views/component_built_in_example/switch.vue'),
          meta: {
            title: '开关',
          },
        },
        {
          path: 'tabs',
          name: 'componentExampleBuiltInTabs',
          component: () => import('@/views/component_built_in_example/tabs.vue'),
          meta: {
            title: '标签页',
          },
        },
        {
          path: 'toast',
          name: 'componentExampleBuiltInToast',
          component: () => import('@/views/component_built_in_example/toast.vue'),
          meta: {
            title: '轻提示',
          },
        },
        {
          path: 'tooltip',
          name: 'componentExampleBuiltInTooltip',
          component: () => import('@/views/component_built_in_example/tooltip.vue'),
          meta: {
            title: '文字提示',
          },
        },
      ],
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
          path: 'upload',
          name: 'componentExampleExtendUpload',
          component: () => import('@/views/component_extend_example/upload.vue'),
          meta: {
            title: '上传',
          },
        },
        {
          path: 'imagepreview',
          name: 'componentExampleExtendImagePreview',
          component: () => import('@/views/component_extend_example/image.preview.vue'),
          meta: {
            title: '图片预览',
          },
        },
        {
          path: 'pcas',
          name: 'componentExampleExtendPcas',
          component: () => import('@/views/component_extend_example/pcas.vue'),
          meta: {
            title: '省市区街道联动',
          },
        },
      ],
    },
  ],
}

export default routes

import { faker } from '@faker-js/faker'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

export default defineFakeRoute([
  {
    url: '/fake/app/route/list',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 1,
        data: [
          // 主导航
          {
            meta: {
              title: '演示',
              icon: 'uim:box',
            },
            children: [
              // 次导航（一级路由）
              {
                path: '/multilevel_menu_example',
                component: 'Layout',
                name: 'multilevelMenuExample',
                meta: {
                  title: 'route.multimenu.root',
                  icon: 'heroicons-solid:menu-alt-3',
                },
                children: [
                  // 次导航（二级路由）
                  {
                    path: 'page',
                    name: 'multilevelMenuExample1',
                    component: 'multilevel_menu_example/page.vue',
                    meta: {
                      title: 'route.multimenu.page',
                    },
                  },
                  {
                    path: 'level2',
                    name: 'multilevelMenuExample2',
                    meta: {
                      title: 'route.multimenu.level2.root',
                    },
                    children: [
                      // 次导航（三级路由）
                      {
                        path: 'page',
                        name: 'multilevelMenuExample2-1',
                        component: 'multilevel_menu_example/level2/page.vue',
                        meta: {
                          title: 'route.multimenu.level2.page',
                        },
                      },
                      {
                        path: 'level3',
                        name: 'multilevelMenuExample2-2',
                        meta: {
                          title: 'route.multimenu.level2.level3.root',
                        },
                        children: [
                          // 次导航（四级路由）
                          {
                            path: 'page1',
                            name: 'multilevelMenuExample2-2-1',
                            component: 'multilevel_menu_example/level2/level3/page1.vue',
                            meta: {
                              title: 'route.multimenu.level2.level3.page1',
                            },
                          },
                          {
                            path: 'page2',
                            name: 'multilevelMenuExample2-2-2',
                            component: 'multilevel_menu_example/level2/level3/page2.vue',
                            meta: {
                              title: 'route.multimenu.level2.level3.page2',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                path: '/permission_example',
                component: 'Layout',
                name: 'permissionExample',
                meta: {
                  title: 'route.permission',
                  icon: 'ri:shield-keyhole-line',
                },
                children: [
                  {
                    path: 'index',
                    name: 'permissionExampleIndex',
                    component: 'permission_example/index.vue',
                    meta: {
                      title: 'route.permission',
                      menu: false,
                      breadcrumb: false,
                      activeMenu: '/permission_example',
                    },
                  },
                  {
                    path: 'test',
                    name: 'permissionExampleTest',
                    component: 'permission_example/test.vue',
                    meta: {
                      title: '测试页面',
                      auth: ['permission.browse'],
                      menu: false,
                      breadcrumb: false,
                      activeMenu: '/permission_example',
                    },
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  },
  {
    url: '/fake/app/menu/list',
    method: 'get',
    response: () => {
      return {
        error: '',
        status: 1,
        data: [
          {
            meta: {
              title: '演示',
              icon: 'uim:box',
            },
            children: [
              {
                meta: {
                  title: '多级导航',
                  icon: 'heroicons-solid:menu-alt-3',
                },
                children: [
                  {
                    path: '/multilevel_menu_example/page',
                    meta: {
                      title: '导航1',
                    },
                  },
                  {
                    meta: {
                      title: '导航2',
                    },
                    children: [
                      {
                        path: '/multilevel_menu_example/level2/page',
                        meta: {
                          title: '导航2-1',
                        },
                      },
                      {
                        meta: {
                          title: '导航2-2',
                        },
                        children: [
                          {
                            path: '/multilevel_menu_example/level2/level3/page1',
                            meta: {
                              title: '导航2-2-1',
                            },
                          },
                          {
                            path: '/multilevel_menu_example/level2/level3/page2',
                            meta: {
                              title: '导航2-2-2',
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                path: '/permission_example',
                meta: {
                  title: '权限验证',
                  icon: 'ri:shield-keyhole-line',
                },
              },
            ],
          },
        ],
      }
    },
  },
  {
    url: '/fake/app/account/login',
    method: 'post',
    response: ({ body }) => {
      return {
        error: '',
        status: 1,
        data: {
          account: body.account,
          token: `${body.account}:${faker.internet.jwt()}`,
          avatar: `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${body.account}`,
        },
      }
    },
  },
  {
    url: '/fake/app/account/permission',
    method: 'get',
    response: ({ headers }) => {
      let permissions: string[] = []
      if (headers.token?.indexOf('admin') === 0) {
        permissions = [
          'pages.general:browse',
          'pages.form:browse',
          'pages.list:browse',
          'pages.shop:browse',
        ]
      }
      else if (headers.token?.indexOf('test') === 0) {
        permissions = [
          'pages.general:browse',
        ]
      }
      return {
        error: '',
        status: 1,
        data: {
          permissions,
        },
      }
    },
  },
  {
    url: '/fake/app/account/password/edit',
    method: 'post',
    response: () => {
      return {
        error: '',
        status: 1,
        data: {
          isSuccess: true,
        },
      }
    },
  },
])

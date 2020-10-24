import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

export default {
    path: '/keep_alive_example',
    component: Layout,
    redirect: '/keep_alive_example/page',
    name: 'keepAliveExample',
    meta: {
        title: '页面缓存',
        icon: 'sidebar-keep-alive'
    },
    children: [
        {
            path: 'page',
            name: 'keepAliveExamplePage',
            component: () => import(/* webpackChunkName: 'keep_alive_example' */ '@/views/keep_alive_example/page'),
            meta: {
                title: '演示',
                sidebar: false,
                activeMenu: '/keep_alive_example'
            }
        },
        {
            path: 'detail',
            name: 'keepAliveExampleDetail',
            component: () => import(/* webpackChunkName: 'keep_alive_example' */ '@/views/keep_alive_example/detail'),
            meta: {
                title: '同级路由',
                sidebar: false,
                activeMenu: '/keep_alive_example'
            }
        },
        {
            path: 'detail2',
            component: EmptyLayout,
            redirect: '/keep_alive_example/detail2',
            meta: {
                title: '下级路由',
                sidebar: false
            },
            children: [
                {
                    path: '',
                    name: 'keepAliveExampleDetail2',
                    component: () => import(/* webpackChunkName: 'keep_alive_example' */ '@/views/keep_alive_example/detail'),
                    meta: {
                        title: '下级路由',
                        activeMenu: '/keep_alive_example'
                    }
                },
                {
                    path: 'detail3',
                    component: EmptyLayout,
                    redirect: '/keep_alive_example/detail2/detail3',
                    meta: {
                        title: '下下级路由',
                        sidebar: false
                    },
                    children: [
                        {
                            path: '',
                            name: 'keepAliveExampleDetail3',
                            component: () => import(/* webpackChunkName: 'keep_alive_example' */ '@/views/keep_alive_example/detail'),
                            meta: {
                                title: '下下级路由',
                                activeMenu: '/keep_alive_example'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

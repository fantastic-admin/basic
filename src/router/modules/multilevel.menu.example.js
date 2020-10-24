import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

export default {
    path: '/multilevel_menu_example',
    component: Layout,
    redirect: '/multilevel_menu_example/page',
    name: 'multilevelMenuExample',
    meta: {
        title: '多级导航',
        icon: 'sidebar-menu'
    },
    children: [
        {
            path: 'page',
            name: 'multilevelMenuExample1',
            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/multilevel_menu_example/page'),
            meta: {
                title: '导航1'
            }
        },
        {
            path: 'level2',
            name: 'multilevelMenuExample2',
            component: EmptyLayout,
            redirect: '/multilevel_menu_example/level2/page',
            meta: {
                title: '导航2'
            },
            children: [
                {
                    path: 'page',
                    name: 'multilevelMenuExample2-1',
                    component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/multilevel_menu_example/level2/page'),
                    meta: {
                        title: '导航2-1'
                    }
                },
                {
                    path: 'level3',
                    name: 'multilevelMenuExample2-2',
                    component: EmptyLayout,
                    redirect: '/multilevel_menu_example/level2/level3/page1',
                    meta: {
                        title: '导航2-2'
                    },
                    children: [
                        {
                            path: 'page1',
                            name: 'multilevelMenuExample2-2-1',
                            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/multilevel_menu_example/level2/level3/page1'),
                            meta: {
                                title: '导航2-2-1'
                            }
                        },
                        {
                            path: 'page2',
                            name: 'multilevelMenuExample2-2-2',
                            component: () => import(/* webpackChunkName: 'multilevel_menu_example' */ '@/views/multilevel_menu_example/level2/level3/page2'),
                            meta: {
                                title: '导航2-2-2'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}

import Layout from '@/layout'
import EmptyLayout from '@/layout/empty'

export default {
    path: '/breadcrumb_example',
    component: Layout,
    redirect: '/breadcrumb_example/list1',
    name: 'breadcrumbExample',
    meta: {
        title: '面包屑导航',
        icon: 'sidebar-breadcrumb'
    },
    children: [
        {
            path: 'list1',
            name: 'breadcrumbExampleList1',
            component: () => import(/* webpackChunkName: 'breadcrumb_example' */ '@/views/breadcrumb_example/list1'),
            meta: {
                title: '列表1（平级模式）'
            }
        },
        {
            path: 'detail1',
            name: 'breadcrumbExampleDetail1',
            component: () => import(/* webpackChunkName: 'breadcrumb_example' */ '@/views/breadcrumb_example/detail1'),
            meta: {
                title: '详情1',
                sidebar: false,
                activeMenu: '/breadcrumb_example/list1'
            }
        },
        {
            path: 'list2',
            name: 'breadcrumbExampleList2',
            component: EmptyLayout,
            redirect: '/breadcrumb_example/list2',
            meta: {
                title: '列表2（层级模式）'
            },
            children: [
                {
                    path: '',
                    component: () => import(/* webpackChunkName: 'breadcrumb_example' */ '@/views/breadcrumb_example/list2'),
                    meta: {
                        title: '列表2（层级模式）',
                        sidebar: false,
                        breadcrumb: false
                    }
                },
                {
                    path: 'detail2',
                    name: 'breadcrumbExampleDetail2',
                    component: () => import(/* webpackChunkName: 'breadcrumb_example' */ '@/views/breadcrumb_example/detail2'),
                    meta: {
                        title: '详情2',
                        sidebar: false,
                        activeMenu: '/breadcrumb_example/list2'
                    }
                }
            ]
        }
    ]
}

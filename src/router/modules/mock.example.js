import Layout from '@/layout'

export default {
    path: '/mock_example',
    component: Layout,
    redirect: '/mock_example/index',
    name: 'mockExample',
    meta: {
        title: 'Mock',
        icon: 'sidebar-mock',
        badge: 'NEW'
    },
    children: [
        {
            path: 'index',
            name: 'mockExampleIndex',
            component: () => import(/* webpackChunkName: 'mock_example' */ '@/views/mock_example'),
            meta: {
                title: 'Mock',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/mock_example'
            }
        }
    ]
}

const Layout = () => import('@/layout/index.vue')

export default {
    path: '/mock_example',
    component: Layout,
    redirect: '/mock_example/index',
    name: 'mockExample',
    meta: {
        title: 'Mock',
        icon: 'sidebar-mock'
    },
    children: [
        {
            path: 'index',
            name: 'mockExampleIndex',
            component: () => import('@/views/mock_example/index.vue'),
            meta: {
                title: 'Mock',
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/mock_example'
            }
        }
    ]
}

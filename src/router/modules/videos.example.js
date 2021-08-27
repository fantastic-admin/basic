const Layout = () => import('@/layout/index.vue')

export default [
    {
        path: '/videos_example/coming/soon',
        component: Layout,
        meta: {
            title: '即将推出'
        },
        children: [
            {
                path: '',
                name: 'videosExampleVideoComingSoon',
                component: () => import('@/views/videos_example/coming.soon.vue'),
                meta: {
                    title: '即将推出',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/videos_example/coming/soon'
                }
            }
        ]
    }
]

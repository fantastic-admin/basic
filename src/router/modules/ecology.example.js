const Layout = () => import('@/layout/index.vue')

export default [
    {
        path: '/official',
        meta: {
            title: '官方周边',
            icon: 'ep:grid'
        },
        children: [
            {
                path: 'https://hooray.gitee.io/fantastic-startkit/',
                meta: {
                    title: 'Fantastic-startkit 项目启动套件'
                }
            },
            {
                path: 'https://hooray.gitee.io/one-step-admin/',
                meta: {
                    title: 'One-step-admin 干啥都快人一步的中后台框架'
                }
            }
        ]
    },
    {
        path: '/plugin',
        meta: {
            title: '战略合作',
            icon: 'sidebar-cooperation'
        },
        children: [
            {
                path: 'https://www.vform666.com',
                meta: {
                    title: 'VForm 低代码表单'
                }
            }
        ]
    },
    {
        path: '/videos/coming/soon',
        component: Layout,
        meta: {
            title: '视频教程',
            icon: 'sidebar-videos'
        },
        children: [
            {
                path: '',
                name: 'videosComingSoon',
                component: () => import('@/views/videos_example/coming.soon.vue'),
                meta: {
                    title: '视频教程',
                    sidebar: false,
                    breadcrumb: false
                }
            }
        ]
    }
]

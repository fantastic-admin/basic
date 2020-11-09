import Layout from '@/layout'

export default [
    {
        path: '/videos_example/1',
        component: Layout,
        meta: {
            title: '01 - 开发环境配置'
        },
        children: [
            {
                path: '',
                name: 'videosExampleVideo1',
                component: () => import(/* webpackChunkName: 'videos_example' */ '@/views/videos_example/1'),
                meta: {
                    title: '01 - 开发环境配置',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/videos_example/1'
                }
            }
        ]
    },
    {
        path: '/videos_example/2',
        component: Layout,
        meta: {
            title: '02 - 框架配置'
        },
        children: [
            {
                path: '',
                name: 'videosExampleVideo2',
                component: () => import(/* webpackChunkName: 'videos_example' */ '@/views/videos_example/2'),
                meta: {
                    title: '02 框架配置',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/videos_example/2'
                }
            }
        ]
    },
    {
        path: '/videos_example/3',
        component: Layout,
        meta: {
            title: '03 - 布局和主题'
        },
        children: [
            {
                path: '',
                name: 'videosExampleVideo3',
                component: () => import(/* webpackChunkName: 'videos_example' */ '@/views/videos_example/3'),
                meta: {
                    title: '03 布局和主题',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/videos_example/3'
                }
            }
        ]
    },
    {
        path: '/videos_example/4',
        component: Layout,
        meta: {
            title: '04 - 全局资源'
        },
        children: [
            {
                path: '',
                name: 'videosExampleVideo4',
                component: () => import(/* webpackChunkName: 'videos_example' */ '@/views/videos_example/4'),
                meta: {
                    title: '04 全局资源',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/videos_example/4'
                }
            }
        ]
    },
    {
        path: '/videos_example/5',
        component: Layout,
        meta: {
            title: '05 - 组件'
        },
        children: [
            {
                path: '',
                name: 'videosExampleVideo5',
                component: () => import(/* webpackChunkName: 'videos_example' */ '@/views/videos_example/5'),
                meta: {
                    title: '05 组件',
                    sidebar: false,
                    breadcrumb: false,
                    activeMenu: '/videos_example/5'
                }
            }
        ]
    }
]

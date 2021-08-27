const Layout = () => import('@/layout/index.vue')

export default {
    path: '/permission_example',
    component: Layout,
    redirect: '/permission_example/index',
    name: 'permissionExample',
    meta: {
        title: '权限验证',
        icon: 'sidebar-permission'
    },
    children: [
        {
            path: 'index',
            name: 'permissionExampleIndex',
            component: () => import('@/views/permission_example/index.vue'),
            meta: {
                title: '权限验证',
                auth: ['permission.browse'],
                sidebar: false,
                breadcrumb: false,
                activeMenu: '/permission_example'
            }
        }
    ]
}

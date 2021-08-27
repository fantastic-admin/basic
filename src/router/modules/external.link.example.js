const Layout = () => import('@/layout/index.vue')

export default {
    path: '/link',
    component: Layout,
    redirect: '/link/iframe',
    name: 'externalLinkExample',
    meta: {
        title: '外链',
        icon: 'sidebar-external-link'
    },
    children: [
        {
            path: 'https://gitee.com/hooray/fantastic-admin',
            meta: {
                title: 'Gitee 仓库'
            }
        },
        {
            path: 'https://github.com/hooray/fantastic-admin',
            meta: {
                title: 'Github 仓库'
            }
        }
    ]
}

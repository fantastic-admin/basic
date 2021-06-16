import Layout from '@/layout'

export default {
    path: '/link',
    component: Layout,
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

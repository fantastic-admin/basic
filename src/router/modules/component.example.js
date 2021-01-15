import Layout from '@/layout'

export default {
    path: '/component_extend_example',
    component: Layout,
    redirect: '/component_extend_example/pageheader',
    name: 'componentExtendExample',
    meta: {
        title: '扩展组件',
        icon: 'sidebar-component'
    },
    children: [
        {
            path: 'pageheader',
            name: 'componentExtendExamplePageheader',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/pageheader'),
            meta: {
                title: '页头'
            }
        },
        {
            path: 'pagemain',
            name: 'componentExtendExamplePagemain',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/pagemain'),
            meta: {
                title: '内容块'
            }
        },
        {
            path: 'editor',
            name: 'componentExtendExampleEditor',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/editor'),
            meta: {
                title: '编辑器'
            }
        },
        {
            path: 'result',
            name: 'componentExtendExampleResult',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/result'),
            meta: {
                title: '处理结果'
            }
        },
        {
            path: 'actionbar',
            name: 'componentExtendExampleActionbar',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/actionbar'),
            meta: {
                title: '固定底部操作栏'
            }
        },
        {
            path: 'searchbar',
            name: 'componentExtendExampleSearchbar',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/searchbar'),
            meta: {
                title: '搜索栏'
            }
        },
        {
            path: 'batchactionbar',
            name: 'componentExtendExampleBatchactionbar',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/batchactionbar'),
            meta: {
                title: '批量操作栏'
            }
        },
        {
            path: 'tableautoheight',
            name: 'componentExtendExampleTableautoheight',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/table.autoheight'),
            meta: {
                title: '表格自适应'
            }
        },
        {
            path: 'upload',
            name: 'componentExtendExampleUpload',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/upload'),
            meta: {
                title: '上传'
            }
        },
        {
            path: 'imagepreview',
            name: 'componentExtendExampleImagePreview',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/image.preview'),
            meta: {
                title: '图片预览'
            }
        },
        {
            path: 'trend',
            name: 'componentExtendExampleTrend',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/trend'),
            meta: {
                title: '趋势标记'
            }
        },
        {
            path: 'area',
            name: 'componentExtendExampleArea',
            component: () => import(/* webpackChunkName: 'component_extend_example' */ '@/views/component_extend_example/area'),
            meta: {
                title: '省市区联动'
            }
        }
    ]
}

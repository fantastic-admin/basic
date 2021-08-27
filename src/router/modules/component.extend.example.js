const Layout = () => import('@/layout/index.vue')

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
            path: 'svg',
            name: 'componentExtendExampleSvg',
            component: () => import('@/views/component_extend_example/svg.vue'),
            meta: {
                title: 'SVG Icon'
            }
        },
        {
            path: 'pageheader',
            name: 'componentExtendExamplePageheader',
            component: () => import('@/views/component_extend_example/pageheader.vue'),
            meta: {
                title: '页头'
            }
        },
        {
            path: 'pagemain',
            name: 'componentExtendExamplePagemain',
            component: () => import('@/views/component_extend_example/pagemain.vue'),
            meta: {
                title: '内容块'
            }
        },
        {
            path: 'result',
            name: 'componentExtendExampleResult',
            component: () => import('@/views/component_extend_example/result.vue'),
            meta: {
                title: '处理结果'
            }
        },
        {
            path: 'actionbar',
            name: 'componentExtendExampleActionbar',
            component: () => import('@/views/component_extend_example/actionbar.vue'),
            meta: {
                title: '固定底部操作栏'
            }
        },
        {
            path: 'searchbar',
            name: 'componentExtendExampleSearchbar',
            component: () => import('@/views/component_extend_example/searchbar.vue'),
            meta: {
                title: '搜索面板'
            }
        },
        {
            path: 'batchactionbar',
            name: 'componentExtendExampleBatchactionbar',
            component: () => import('@/views/component_extend_example/batchactionbar.vue'),
            meta: {
                title: '批量操作栏'
            }
        },
        {
            path: 'tableautoheight',
            name: 'componentExtendExampleTableautoheight',
            component: () => import('@/views/component_extend_example/table.autoheight.vue'),
            meta: {
                title: '表格自适应'
            }
        },
        {
            path: 'upload',
            name: 'componentExtendExampleUpload',
            component: () => import('@/views/component_extend_example/upload.vue'),
            meta: {
                title: '上传'
            }
        },
        {
            path: 'imagepreview',
            name: 'componentExtendExampleImagePreview',
            component: () => import('@/views/component_extend_example/image.preview.vue'),
            meta: {
                title: '图片预览'
            }
        },
        {
            path: 'trend',
            name: 'componentExtendExampleTrend',
            component: () => import('@/views/component_extend_example/trend.vue'),
            meta: {
                title: '趋势标记'
            }
        },
        {
            path: 'area',
            name: 'componentExtendExampleArea',
            component: () => import('@/views/component_extend_example/area.vue'),
            meta: {
                title: '省市区联动'
            }
        },
        {
            path: 'editor',
            name: 'componentExtendExampleEditor',
            component: () => import('@/views/component_extend_example/editor.vue'),
            meta: {
                title: '编辑器'
            }
        }
    ]
}

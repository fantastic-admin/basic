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
            component: () => import('@/views/component_extend_example/svg.demo.vue'),
            meta: {
                title: 'SVG Icon'
            }
        },
        {
            path: 'pageheader',
            name: 'componentExtendExamplePageheader',
            component: () => import('@/views/component_extend_example/pageheader.demo.vue'),
            meta: {
                title: '页头'
            }
        },
        {
            path: 'pagemain',
            name: 'componentExtendExamplePagemain',
            component: () => import('@/views/component_extend_example/pagemain.demo.vue'),
            meta: {
                title: '内容块'
            }
        },
        {
            path: 'actionbar',
            name: 'componentExtendExampleActionbar',
            component: () => import('@/views/component_extend_example/actionbar.demo.vue'),
            meta: {
                title: '固定底部操作栏'
            }
        },
        {
            path: 'searchbar',
            name: 'componentExtendExampleSearchbar',
            component: () => import('@/views/component_extend_example/searchbar.demo.vue'),
            meta: {
                title: '搜索面板'
            }
        },
        {
            path: 'batchactionbar',
            name: 'componentExtendExampleBatchactionbar',
            component: () => import('@/views/component_extend_example/batchactionbar.demo.vue'),
            meta: {
                title: '批量操作栏'
            }
        },
        {
            path: 'tableautoheight',
            name: 'componentExtendExampleTableautoheight',
            component: () => import('@/views/component_extend_example/table.autoheight.demo.vue'),
            meta: {
                title: '表格高度自适应'
            }
        },
        {
            path: 'upload',
            name: 'componentExtendExampleUpload',
            component: () => import('@/views/component_extend_example/upload.demo.vue'),
            meta: {
                title: '上传'
            }
        },
        {
            path: 'imagepreview',
            name: 'componentExtendExampleImagePreview',
            component: () => import('@/views/component_extend_example/image.preview.demo.vue'),
            meta: {
                title: '图片预览'
            }
        },
        {
            path: 'trend',
            name: 'componentExtendExampleTrend',
            component: () => import('@/views/component_extend_example/trend.demo.vue'),
            meta: {
                title: '趋势标记'
            }
        },
        {
            path: 'area',
            name: 'componentExtendExampleArea',
            component: () => import('@/views/component_extend_example/area.demo.vue'),
            meta: {
                title: '省市区联动'
            }
        },
        {
            path: 'editor',
            name: 'componentExtendExampleEditor',
            component: () => import('@/views/component_extend_example/editor.demo.vue'),
            meta: {
                title: '编辑器'
            }
        }
    ]
}

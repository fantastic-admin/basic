import Layout from '@/layout'

export default {
    path: '/component_basic_example',
    component: Layout,
    redirect: '/component_basic_example/icon',
    name: 'componentBasicExample',
    meta: {
        title: '基础组件（部分）',
        icon: 'sidebar-component'
    },
    children: [
        {
            path: 'icon',
            name: 'componentBasicExampleIcon',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/icon'),
            meta: {
                title: '图标'
            }
        },
        {
            path: 'button',
            name: 'componentBasicExampleButton',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/button'),
            meta: {
                title: '按钮'
            }
        },
        {
            path: 'link',
            name: 'componentBasicExampleLink',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/link'),
            meta: {
                title: '文字链接'
            }
        },
        {
            path: 'radio',
            name: 'componentBasicExampleRadio',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/radio'),
            meta: {
                title: '单选框'
            }
        },
        {
            path: 'checkbox',
            name: 'componentBasicExampleCheckbox',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/checkbox'),
            meta: {
                title: '多选框'
            }
        },
        {
            path: 'input',
            name: 'componentBasicExampleInput',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/input'),
            meta: {
                title: '输入框'
            }
        },
        {
            path: 'inputnumber',
            name: 'componentBasicExampleInputnumber',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/inputnumber'),
            meta: {
                title: '计数器'
            }
        },
        {
            path: 'select',
            name: 'componentBasicExampleSelect',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/select'),
            meta: {
                title: '选择器'
            }
        },
        {
            path: 'switch',
            name: 'componentBasicExampleSwitch',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/switch'),
            meta: {
                title: '开关'
            }
        },
        {
            path: 'slider',
            name: 'componentBasicExampleSlider',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/slider'),
            meta: {
                title: '滑块'
            }
        },
        {
            path: 'timepicker',
            name: 'componentBasicExampleTimepicker',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/timepicker'),
            meta: {
                title: '时间选择器'
            }
        },
        {
            path: 'datepicker',
            name: 'componentBasicExampleDatepicker',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/datepicker'),
            meta: {
                title: '日期选择器'
            }
        },
        {
            path: 'datetimepicker',
            name: 'componentBasicExampleDatetimepicker',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/datetimepicker'),
            meta: {
                title: '日期时间选择器'
            }
        },
        {
            path: 'rate',
            name: 'componentBasicExampleRate',
            component: () => import(/* webpackChunkName: 'component_basic_example' */ '@/views/component_basic_example/rate'),
            meta: {
                title: '评分'
            }
        }
    ]
}

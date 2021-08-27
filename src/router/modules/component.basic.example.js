const Layout = () => import('@/layout/index.vue')

export default {
    path: '/component_basic_example',
    component: Layout,
    redirect: '/component_basic_example/icon',
    name: 'componentBasicExample',
    meta: {
        title: '基础组件（部分）',
        icon: 'sidebar-element'
    },
    children: [
        {
            path: 'icon',
            name: 'componentBasicExampleIcon',
            component: () => import('@/views/component_basic_example/icon.vue'),
            meta: {
                title: '图标'
            }
        },
        {
            path: 'button',
            name: 'componentBasicExampleButton',
            component: () => import('@/views/component_basic_example/button.vue'),
            meta: {
                title: '按钮'
            }
        },
        {
            path: 'link',
            name: 'componentBasicExampleLink',
            component: () => import('@/views/component_basic_example/link.vue'),
            meta: {
                title: '文字链接'
            }
        },
        {
            path: 'radio',
            name: 'componentBasicExampleRadio',
            component: () => import('@/views/component_basic_example/radio.vue'),
            meta: {
                title: '单选框'
            }
        },
        {
            path: 'checkbox',
            name: 'componentBasicExampleCheckbox',
            component: () => import('@/views/component_basic_example/checkbox.vue'),
            meta: {
                title: '多选框'
            }
        },
        {
            path: 'input',
            name: 'componentBasicExampleInput',
            component: () => import('@/views/component_basic_example/input.vue'),
            meta: {
                title: '输入框'
            }
        },
        {
            path: 'inputnumber',
            name: 'componentBasicExampleInputnumber',
            component: () => import('@/views/component_basic_example/inputnumber.vue'),
            meta: {
                title: '计数器'
            }
        },
        {
            path: 'select',
            name: 'componentBasicExampleSelect',
            component: () => import('@/views/component_basic_example/select.vue'),
            meta: {
                title: '选择器'
            }
        },
        {
            path: 'switch',
            name: 'componentBasicExampleSwitch',
            component: () => import('@/views/component_basic_example/switch.vue'),
            meta: {
                title: '开关'
            }
        },
        {
            path: 'slider',
            name: 'componentBasicExampleSlider',
            component: () => import('@/views/component_basic_example/slider.vue'),
            meta: {
                title: '滑块'
            }
        },
        {
            path: 'timepicker',
            name: 'componentBasicExampleTimepicker',
            component: () => import('@/views/component_basic_example/timepicker.vue'),
            meta: {
                title: '时间选择器'
            }
        },
        {
            path: 'datepicker',
            name: 'componentBasicExampleDatepicker',
            component: () => import('@/views/component_basic_example/datepicker.vue'),
            meta: {
                title: '日期选择器'
            }
        },
        {
            path: 'datetimepicker',
            name: 'componentBasicExampleDatetimepicker',
            component: () => import('@/views/component_basic_example/datetimepicker.vue'),
            meta: {
                title: '日期时间选择器'
            }
        },
        {
            path: 'rate',
            name: 'componentBasicExampleRate',
            component: () => import('@/views/component_basic_example/rate.vue'),
            meta: {
                title: '评分'
            }
        }
    ]
}

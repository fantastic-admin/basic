<script setup name="CascaderArea">
import area from '@/util/area'

const props = defineProps({
    // 传入数据为中文数组，例如：['河北省', '唐山市', '市辖区']
    modelValue: {
        type: Array,
        default: () => []
    },
    size: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const data = ref({
    options: area,
    props: {
        value: 'code',
        label: 'name'
    }
})

const myValue = computed({
    // 将中文转成 code 码
    get: () => {
        const myValue = []
        if (props.modelValue.length === 3) {
            const [pName, cName, aName] = props.modelValue
            area.map(p => {
                if (p.name === pName) {
                    myValue.push(p.code)
                    p.children.map(c => {
                        if (c.name === cName) {
                            myValue.push(c.code)
                            c.children.map(a => {
                                if (a.name === aName) {
                                    myValue.push(a.code)
                                }
                            })
                        }
                    })
                }
            })
        }
        return myValue
    },
    // 将 code 码转成中文
    set: value => {
        if (value) {
            let [pCode, cCode, aCode] = value
            area.map(p => {
                if (p.code === pCode) {
                    pCode = p.name
                    p.children.map(c => {
                        if (c.code === cCode) {
                            cCode = c.name
                            c.children.map(a => {
                                if (a.code === aCode) {
                                    aCode = a.name
                                }
                            })
                        }
                    })
                }
            })
            emit('update:modelValue', [pCode, cCode, aCode])
        } else {
            emit('update:modelValue', [])
        }
    }
})
</script>

<template>
    <div>
        <el-cascader v-model="myValue" :options="data.options" :props="data.props" :size="size" :disabled="disabled" clearable filterable />
    </div>
</template>

<style lang="scss" scoped>
:deep(.el-cascader) {
    width: 100%;
}
</style>

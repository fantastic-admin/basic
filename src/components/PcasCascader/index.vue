<script setup name="PcasCascader">
import pcasRaw from './pcas-code.json'

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => []
    },
    disabled: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: 'pca'
    },
    format: {
        type: String,
        default: 'code'
    }
})

const emit = defineEmits(['update:modelValue'])

const pcasData = computed(() => {
    const data = []
    // 省份
    pcasRaw.forEach(p => {
        const tempP = {
            code: p.code,
            name: p.name
        }
        const tempChildrenC = []
        // 城市
        p.children.forEach(c => {
            const tempC = {
                code: c.code,
                name: c.name
            }
            if (['pca', 'pcas'].includes(props.type)) {
                const tempChildrenA = []
                // 区县
                c.children.forEach(a => {
                    const tempA = {
                        code: a.code,
                        name: a.name
                    }
                    if (props.type === 'pcas') {
                        const tempChildrenS = []
                        // 街道
                        a.children.forEach(s => {
                            const tempS = {
                                code: s.code,
                                name: s.name
                            }
                            tempChildrenS.push(tempS)
                        })
                        tempA.children = tempChildrenS
                    }
                    tempChildrenA.push(tempA)
                })
                tempC.children = tempChildrenA
            }
            tempChildrenC.push(tempC)
        })
        tempP.children = tempChildrenC
        data.push(tempP)
    })
    return data
})

const myValue = computed({
    // 将入参数据转成 code 码
    get: () => {
        return anyToCode(props.modelValue)
    },
    // 将 code 码转成出参数据
    set: value => {
        emit('update:modelValue', value ? codeToAny(value) : [])
    }
})

function anyToCode(value, dictionarie = pcasData.value) {
    const input = []
    if (value.length > 0) {
        const findItem = dictionarie.find(item => {
            if (props.format === 'code') {
                return item.code === value[0]
            } else if (props.format === 'name') {
                return item.name === value[0]
            } else {
                return item.name === value[0].name && item.code === value[0].code
            }
        })
        input.push(findItem.code)
        if (findItem.children) {
            input.push(...anyToCode(value.slice(1 - value.length), findItem.children))
        }
    }
    return input
}

function codeToAny(codes, dictionarie = pcasData.value) {
    const output = []
    const findItem = dictionarie.find(item => item.code === codes[0])
    if (findItem) {
        switch (props.format) {
            case 'code':
                output.push(findItem.code)
                break
            case 'name':
                output.push(findItem.name)
                break
            case 'both':
                output.push({
                    code: findItem.code,
                    name: findItem.name
                })
        }
        const newCodes = codes.slice(1 - codes.length)
        if (newCodes.length > 0 && findItem.children) {
            output.push(...codeToAny(newCodes, findItem.children))
        }
    }
    return output
}
</script>

<template>
    <el-cascader v-model="myValue" :options="pcasData" :props="{ value: 'code', label: 'name' }" :disabled="disabled" clearable filterable />
</template>

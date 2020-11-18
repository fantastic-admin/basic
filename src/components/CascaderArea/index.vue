<template>
    <el-cascader v-model="myValue" :options="options" :props="props" :size="size" :disabled="disabled" clearable filterable />
</template>

<script>
import area from '@/util/area'

export default {
    name: 'CascaderArea',
    props: {
        // 传入数据为中文数组，例如：['河北省', '唐山市', '市辖区']
        value: {
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
    },
    data() {
        return {
            options: area,
            props: {
                value: 'code',
                label: 'name'
            }
        }
    },
    computed: {
        myValue: {
            // 将中文转成 code 码
            get: function() {
                const myValue = []
                if (this.value.length === 3) {
                    const [pName, cName, aName] = this.value
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
            set: function(value) {
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
                this.$emit('input', [pCode, cCode, aCode])
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.el-cascader {
    width: 100%;
}
</style>

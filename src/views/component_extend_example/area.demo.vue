<route>
{
    meta: {
        enabled: false
    }
}
</route>

<script>
export default {
    name: 'ComponentExampleArea',
    props: {},
    data() {
        return {
            area: ['浙江省', '杭州市', '西湖区'],
            ruleForm: {
                area: []
            },
            rules: {
                area: [
                    { type: 'array', required: true, message: '请选择地区', trigger: 'change' }
                ]
            }
        }
    },
    created() {},
    mounted() {},
    methods: {
        submitForm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    alert('提交成功')
                }
            })
        }
    }
}
</script>

<template>
    <div>
        <page-header title="省市区联动" content="CascaderArea" />
        <page-main>
            <cascader-area v-model="area" />
        </page-main>
        <page-main title="表单验证">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-form-item label="地区" prop="area">
                    <cascader-area v-model="ruleForm.area" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                </el-form-item>
            </el-form>
        </page-main>
    </div>
</template>

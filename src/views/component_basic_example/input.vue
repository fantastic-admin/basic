<template>
    <div>
        <Alert />
        <page-header title="输入框" />
        <page-main title="基础用法" class="demo">
            <el-input v-model="input" placeholder="请输入内容" />
        </page-main>
        <page-main title="禁用状态" class="demo">
            <el-input v-model="input" placeholder="请输入内容" :disabled="true" />
        </page-main>
        <page-main title="可清空" class="demo">
            <el-input v-model="input" placeholder="请输入内容" clearable />
        </page-main>
        <page-main title="密码框" class="demo">
            <el-input v-model="input" placeholder="请输入内容" show-password />
        </page-main>
        <page-main title="带 icon 的输入框" class="demo">
            <el-input v-model="input1" placeholder="请选择日期" suffix-icon="el-icon-date" />
            <el-input v-model="input2" placeholder="请输入内容" prefix-icon="el-icon-search" />
        </page-main>
        <page-main title="文本域" class="demo">
            <el-input v-model="textarea" type="textarea" :rows="2" placeholder="请输入内容" />
        </page-main>
    </div>
</template>

<script>
import Alert from './components/alert'

export default {
    components: {
        Alert
    },
    data() {
        return {
            input: '',
            input1: '',
            input2: '',
            textarea: ''
        }
    }
}
</script>

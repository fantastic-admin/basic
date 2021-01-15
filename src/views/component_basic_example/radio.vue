<template>
    <div>
        <Alert />
        <page-header title="单选框" />
        <page-main title="基础用法" class="demo">
            <el-radio v-model="radio" label="1">备选项</el-radio>
            <el-radio v-model="radio" label="2">备选项</el-radio>
        </page-main>
        <page-main title="禁用状态" class="demo">
            <el-radio v-model="radio2" disabled label="禁用">备选项</el-radio>
            <el-radio v-model="radio2" disabled label="选中且禁用">备选项</el-radio>
        </page-main>
        <page-main title="单选框组" class="demo">
            <el-radio-group v-model="radio3">
                <el-radio :label="3">备选项</el-radio>
                <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio>
            </el-radio-group>
        </page-main>
        <page-main title="按钮样式" class="demo">
            <el-radio-group v-model="radio4">
                <el-radio-button label="上海" />
                <el-radio-button label="北京" />
                <el-radio-button label="广州" />
                <el-radio-button label="深圳" />
            </el-radio-group>
        </page-main>
        <page-main title="带有边框" class="demo">
            <el-radio v-model="radio5" label="1" border>备选项1</el-radio>
            <el-radio v-model="radio5" label="2" border>备选项2</el-radio>
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
            radio: '1',
            radio2: '选中且禁用',
            radio3: 3,
            radio4: '上海',
            radio5: '1'
        }
    }
}
</script>

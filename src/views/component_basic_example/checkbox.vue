<template>
    <div>
        <Alert />
        <page-header title="多选框" />
        <page-main title="基础用法" class="demo">
            <el-checkbox v-model="checked">备选项</el-checkbox>
        </page-main>
        <page-main title="禁用状态" class="demo">
            <el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>
            <el-checkbox v-model="checked2" disabled>备选项</el-checkbox>
        </page-main>
        <page-main title="多选框组" class="demo">
            <el-checkbox-group v-model="checkList">
                <el-checkbox label="复选框 A" />
                <el-checkbox label="复选框 B" />
                <el-checkbox label="复选框 C" />
                <el-checkbox label="禁用" disabled />
                <el-checkbox label="选中且禁用" disabled />
            </el-checkbox-group>
        </page-main>
        <page-main title="可选项目数量的限制" class="demo">
            <el-checkbox-group v-model="checkedCities" :min="1" :max="2">
                <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
            </el-checkbox-group>
        </page-main>
        <page-main title="按钮样式" class="demo">
            <el-checkbox-group v-model="checkboxGroup1">
                <el-checkbox-button v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox-button>
            </el-checkbox-group>
        </page-main>
        <page-main title="带有边框" class="demo">
            <el-checkbox v-model="checked3" label="备选项1" border />
            <el-checkbox v-model="checked4" label="备选项2" border />
        </page-main>
    </div>
</template>

<script>
import Alert from './components/alert'

const cityOptions = ['上海', '北京', '广州', '深圳']

export default {
    components: {
        Alert
    },
    data() {
        return {
            checked: true,
            checked1: false,
            checked2: true,
            checkList: ['选中且禁用', '复选框 A'],
            checkedCities: ['上海', '北京'],
            cities: cityOptions,
            checkboxGroup1: ['上海'],
            checked3: true,
            checked4: false
        }
    }
}
</script>

<template>
    <div>
        <Alert />
        <page-header title="选择器" />
        <page-main title="基础用法" class="demo">
            <el-select v-model="value1" placeholder="请选择">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </page-main>
        <page-main title="有禁用选项" class="demo">
            <el-select v-model="value2" placeholder="请选择">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </page-main>
        <page-main title="禁用状态" class="demo">
            <el-select v-model="value1" disabled placeholder="请选择">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </page-main>
        <page-main title="可清空单选" class="demo">
            <el-select v-model="value1" clearable placeholder="请选择">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </page-main>
        <page-main title="基础多选" class="demo">
            <el-select v-model="value3" multiple placeholder="请选择">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </page-main>
        <page-main title="可搜索" class="demo">
            <el-select v-model="value1" filterable placeholder="请选择">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
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
            options1: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '双皮奶' },
                { value: '选项3', label: '蚵仔煎' },
                { value: '选项4', label: '龙须面' },
                { value: '选项5', label: '北京烤鸭' }
            ],
            value1: '',
            options2: [
                { value: '选项1', label: '黄金糕' },
                { value: '选项2', label: '双皮奶', disabled: true },
                { value: '选项3', label: '蚵仔煎' },
                { value: '选项4', label: '龙须面' },
                { value: '选项5', label: '北京烤鸭' }
            ],
            value2: '',
            value3: []
        }
    }
}
</script>

<template>
    <div>
        <Alert />
        <page-header title="评分" />
        <page-main title="基础用法" class="demo">
            <el-rate v-model="value1" />
        </page-main>
        <page-main title="辅助文字" class="demo">
            <el-rate v-model="value2" show-text />
        </page-main>
        <page-main title="只读" class="demo">
            <el-rate v-model="value3" disabled show-score text-color="#ff9900" score-template="{value}" />
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
            value1: null,
            value2: null,
            value3: 3.7
        }
    }
}
</script>

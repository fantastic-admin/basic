<template>
    <div>
        <Alert />
        <page-header title="开关" />
        <page-main title="基础用法" class="demo">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" />
        </page-main>
        <page-main title="文字描述" class="demo">
            <el-switch v-model="value1" active-text="按月付费" inactive-text="按年付费" />
        </page-main>
        <page-main title="禁用状态" class="demo">
            <el-switch v-model="value2" disabled style="margin-right: 10px;" />
            <el-switch v-model="value3" disabled />
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
            value: true,
            value1: true,
            value2: true,
            value3: false
        }
    }
}
</script>

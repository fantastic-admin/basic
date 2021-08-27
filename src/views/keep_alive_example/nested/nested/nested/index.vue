<template>
    <div>
        <page-main>
            <div>层级 1-1-1</div>
            <el-input v-model="val" />
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'TabExampleNestedTest',
    data() {
        return {
            val: ''
        }
    }
}
</script>

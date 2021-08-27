<template>
    <div>
        <page-main>
            <div>层级 1-1-2</div>
            <el-input v-model="val" />
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'TabExampleNestedTest2',
    data() {
        return {
            val: ''
        }
    }
}
</script>

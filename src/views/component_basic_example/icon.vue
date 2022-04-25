<route>
{
    meta: {
        enabled: false
    }
}
</route>

<script setup>
import Alert from './components/alert.vue'
</script>

<template>
    <div>
        <Alert />
        <page-header title="图标" />
        <page-main class="demo">
            <el-icon>
                <svg-icon name="ep:edit" />
            </el-icon>
            <el-icon>
                <svg-icon name="ep:share" />
            </el-icon>
            <el-icon>
                <svg-icon name="ep:delete" />
            </el-icon>
            <el-button type="primary">
                <template #icon>
                    <el-icon>
                        <svg-icon name="ep:search" />
                    </el-icon>
                </template>
                搜索
            </el-button>
        </page-main>
    </div>
</template>

<style lang="scss" scoped>
.demo {
    > .el-icon {
        color: #606266;
        margin: 0 20px;
        font-size: 1.5em;
        vertical-align: middle;
    }
    button {
        margin: 0 20px;
    }
}
.list-icon {
    display: inline-block;
    margin: 10px;
    i {
        font-size: 32px;
        color: #606266;
    }
}
</style>

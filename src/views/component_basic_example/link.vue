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
        <page-header title="文字链接" />
        <page-main title="基础用法" class="demo">
            <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
            <el-link type="primary">主要链接</el-link>
            <el-link type="success">成功链接</el-link>
            <el-link type="warning">警告链接</el-link>
            <el-link type="danger">危险链接</el-link>
            <el-link type="info">信息链接</el-link>
        </page-main>
        <page-main title="禁用状态" class="demo">
            <el-link disabled>默认链接</el-link>
            <el-link type="primary" disabled>主要链接</el-link>
            <el-link type="success" disabled>成功链接</el-link>
            <el-link type="warning" disabled>警告链接</el-link>
            <el-link type="danger" disabled>危险链接</el-link>
            <el-link type="info" disabled>信息链接</el-link>
        </page-main>
        <page-main title="下划线" class="demo">
            <el-link :underline="false">无下划线</el-link>
            <el-link>有下划线</el-link>
        </page-main>
        <page-main title="图标" class="demo">
            <el-link>
                <el-icon class="el-icon--left">
                    <svg-icon name="ep:edit" />
                </el-icon>
                编辑
            </el-link>
            <el-link>
                查看
                <el-icon class="el-icon--right">
                    <svg-icon name="ep:view" />
                </el-icon>
            </el-link>
        </page-main>
    </div>
</template>

<style lang="scss" scoped>
.demo {
    .el-link {
        margin: 0 5px;
    }
}
</style>

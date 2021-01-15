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
            <el-link icon="el-icon-edit">编辑</el-link>
            <el-link>查看<i class="el-icon-view el-icon--right" /> </el-link>
        </page-main>
    </div>
</template>

<script>
import Alert from './components/alert'

export default {
    components: {
        Alert
    }
}
</script>

<style lang="scss" scoped>
.demo {
    .el-link {
        margin: 0 5px;
    }
}
</style>

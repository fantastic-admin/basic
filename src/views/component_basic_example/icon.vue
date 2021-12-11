<template>
    <div>
        <Alert />
        <page-header title="图标" />
        <page-main class="demo">
            <el-icon><el-icon-edit /></el-icon>
            <el-icon><el-icon-share /></el-icon>
            <el-icon><el-icon-delete /></el-icon>
            <el-button type="primary" :icon="Search">
                搜索
            </el-button>
        </page-main>
        <page-main title="图标集合">
            <div v-for="(item, index) in icon" :key="index" class="list-icon">
                <el-tooltip class="item" effect="dark" :content="hyphen(`ElIcon${item}`)" placement="top">
                    <svg-icon :name="hyphen(`ElIcon${item}`)" />
                </el-tooltip>
            </div>
        </page-main>
    </div>
</template>

<script setup>
import Alert from './components/alert.vue'
import { Search } from '@element-plus/icons-vue'
import * as ElementIcons from '@element-plus/icons-vue'
import { hyphen } from 'naming-style'

const icon = Object.keys(ElementIcons)
</script>

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

<template>
    <div>
        <Alert />
        <page-header title="图标" />
        <page-main class="demo">
            <i class="el-icon-edit" />
            <i class="el-icon-share" />
            <i class="el-icon-delete" />
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </page-main>
        <page-main title="图标集合">
            <div v-for="(item, index) in icon" :key="index" class="list-icon">
                <el-tooltip class="item" effect="dark" :content="`el-icon-${item}`" placement="top">
                    <i :class="`el-icon-${item}`" />
                </el-tooltip>
            </div>
        </page-main>
    </div>
</template>

<script>
import Alert from './components/alert'
import icon from './icon.json'

export default {
    components: {
        Alert
    },
    computed: {
        icon() {
            return icon
        }
    }
}
</script>

<style lang="scss" scoped>
.demo {
    i {
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
    font-size: 32px;
    color: #606266;
    margin: 10px;
}
</style>

<template>
    <div class="alert">
        <el-alert show-icon type="info" :closable="false" close-text="前往 ElementUI 官网">
            <template slot="title">
                基础组件来自 ElementUI ，更多组件及使用技巧请查看 <el-link type="primary" href="https://element.eleme.cn/#/zh-CN" target="_blank">ElementUI 官网</el-link>
            </template>
        </el-alert>
    </div>
</template>

<style lang="scss" scoped>
.alert {
    padding: 20px 20px 0;
    background-color: #fff;
}
</style>

<route>
{
    meta: {
        enabled: false
    }
}
</route>

<template>
    <div>
        <page-header title="内容块" content="PageMain" />
        <page-main>
            PageMain 是最常用的页面组件，几乎所有页面都会使用到
        </page-main>
        <page-main title="你可以设置一个自定义的标题">
            这里放页面内容
        </page-main>
        <page-main>
            <template #title>
                <div style="display: flex; align-item: center; justify-content: space-between;">
                    通过 slot 设置标题
                    <el-button size="small">还可以放置自定义按钮</el-button>
                </div>
            </template>
            这里放页面内容
        </page-main>
        <el-row :gutter="20" style="margin: -10px 10px;">
            <el-col :md="8">
                <page-main style="margin: 10px 0;">
                    还可以结合 ElRow 使用
                </page-main>
            </el-col>
            <el-col :md="8">
                <page-main style="margin: 10px 0;">
                    这里放页面内容
                </page-main>
            </el-col>
            <el-col :md="8">
                <page-main style="margin: 10px 0;">
                    这里放页面内容
                </page-main>
            </el-col>
        </el-row>
        <page-main title="带展开功能" collaspe height="200px">
            <h1>Fantastic-admin</h1>
            <img src="../../assets/images/logo.png">
            <p>这是一款开箱即用的中后台框架，同时它也经历过数十个真实项目的技术沉淀，确保框架在开发中可落地、可使用、可维护</p>
        </page-main>
    </div>
</template>

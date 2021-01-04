<template>
    <div>
        <page-header title="Element 组件" content="框架支持 Element 所有组件，以下只演示部分，更多组件使用请查看 Element 官网">
            <el-button icon="el-icon-link" @click="open('https://element.eleme.cn/#/zh-CN')">Element 官网</el-button>
        </page-header>
        <page-main title="Icon 图标" class="demo-icon">
            <i class="el-icon-edit" />
            <i class="el-icon-share" />
            <i class="el-icon-delete" />
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </page-main>
        <page-main title="Button 按钮" class="demo-button">
            <el-row>
                <el-button>默认按钮</el-button>
                <el-button type="primary">主要按钮</el-button>
                <el-button type="success">成功按钮</el-button>
                <el-button type="info">信息按钮</el-button>
                <el-button type="warning">警告按钮</el-button>
                <el-button type="danger">危险按钮</el-button>
            </el-row>
            <el-row>
                <el-button plain>朴素按钮</el-button>
                <el-button type="primary" plain>主要按钮</el-button>
                <el-button type="success" plain>成功按钮</el-button>
                <el-button type="info" plain>信息按钮</el-button>
                <el-button type="warning" plain>警告按钮</el-button>
                <el-button type="danger" plain>危险按钮</el-button>
            </el-row>
            <el-row>
                <el-button round>圆角按钮</el-button>
                <el-button type="primary" round>主要按钮</el-button>
                <el-button type="success" round>成功按钮</el-button>
                <el-button type="info" round>信息按钮</el-button>
                <el-button type="warning" round>警告按钮</el-button>
                <el-button type="danger" round>危险按钮</el-button>
            </el-row>
            <el-row>
                <el-button icon="el-icon-search" circle />
                <el-button type="primary" icon="el-icon-edit" circle />
                <el-button type="success" icon="el-icon-check" circle />
                <el-button type="info" icon="el-icon-message" circle />
                <el-button type="warning" icon="el-icon-star-off" circle />
                <el-button type="danger" icon="el-icon-delete" circle />
            </el-row>
        </page-main>
        <page-main title="Link 文字链接" class="demo-link">
            <el-link>默认链接</el-link>
            <el-link type="primary">主要链接</el-link>
            <el-link type="success">成功链接</el-link>
            <el-link type="warning">警告链接</el-link>
            <el-link type="danger">危险链接</el-link>
            <el-link type="info">信息链接</el-link>
        </page-main>
        <page-main title="Table 表格">
            <el-table :data="tableData" style="width: 100%;">
                <el-table-column prop="date" label="日期" width="180" />
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="address" label="地址" />
            </el-table>
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'ComponentExampleElement',
    props: {},
    data() {
        return {
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    created() {},
    mounted() {},
    methods: {
        open(url) {
            window.open(url, 'top')
        }
    }
}
</script>

<style lang="scss" scoped>
.demo-icon {
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
.demo-button {
    .el-row {
        margin-bottom: 20px;
    }
}
.demo-link {
    .el-link {
        margin: 0 5px;
    }
}
</style>

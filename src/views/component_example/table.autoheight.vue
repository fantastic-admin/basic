<template>
    <AbsoluteContainer>
        <page-header title="表格自适应">
            <template #content>
                <p>AbsoluteContainer</p>
                <p style="margin-bottom: 0;">该组件是一个 absolute 固定容器，表格自适应需要自行实现，可参考演示源码，缩小浏览器窗口高度可查看最终效果</p>
            </template>
        </page-header>
        <page-main>
            <el-table :data="dataList" border stripe highlight-current-row>
                <el-table-column type="index" width="50" />
                <el-table-column prop="date" label="日期" width="180" />
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="address" label="地址" />
            </el-table>
            <el-button type="primary">新增</el-button>
        </page-main>
    </AbsoluteContainer>
</template>

<script>
export default {
    name: 'ComponentExampleAbsoluteContainer',
    props: {},
    data() {
        return {
            dataList: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ],
            selectionDataList: []
        }
    },
    created() {},
    mounted() {
        this.$nextTick(() => {
            // 获取表头高度，然后设置 .el-table__body-wrapper 的 height
            let height = document.getElementsByClassName('el-table__header-wrapper')[0].offsetHeight
            document.getElementsByClassName('el-table__body-wrapper')[0].style.height = `calc(100% - ${height}px)`
        })
    },
    methods: {}
}
</script>

<style lang="scss" scoped>
.page-main {
    display: flex;
    flex-direction: column;

    // 减去的 40px 为 page-main 的上下 margin
    // 减去的 130px 为 page-header 的高度，如果没有设置，可以去掉

    height: calc(100% - 40px - 130px);
    ::v-deep .el-table {
        height: 100%;
        .el-table__body-wrapper {
            overflow-y: auto;
        }
    }
}
</style>

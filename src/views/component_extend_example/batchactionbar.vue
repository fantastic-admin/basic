<template>
    <div>
        <page-header title="批量操作栏">
            <template #content>
                <p>BatchActionBar</p>
                <p style="margin-bottom: 0;">该组件需要和 ElTable 搭配使用</p>
            </template>
        </page-header>
        <page-main>
            <batch-action-bar :data="dataList" :selection-data="selectionDataList" @check-all="$refs.table.toggleAllSelection()" @check-null="$refs.table.clearSelection()">
                <el-button size="small">单个批量操作按钮</el-button>
                <el-button-group>
                    <el-button size="small">批量操作按钮组1</el-button>
                    <el-button size="small">批量操作按钮组2</el-button>
                </el-button-group>
            </batch-action-bar>
            <el-table ref="table" :data="dataList" border stripe highlight-current-row @selection-change="selectionDataList = $event">
                <el-table-column type="selection" width="40" />
                <el-table-column prop="date" label="日期" width="180" />
                <el-table-column prop="name" label="姓名" width="180" />
                <el-table-column prop="address" label="地址" />
            </el-table>
            <batch-action-bar :data="dataList" :selection-data="selectionDataList" @check-all="$refs.table.toggleAllSelection()" @check-null="$refs.table.clearSelection()">
                <el-button size="small">单个批量操作按钮</el-button>
                <el-button-group>
                    <el-button size="small">批量操作按钮组1</el-button>
                    <el-button size="small">批量操作按钮组2</el-button>
                </el-button-group>
            </batch-action-bar>
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'ComponentExampleBatchactionbar',
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
                }
            ],
            selectionDataList: []
        }
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
// scss
</style>

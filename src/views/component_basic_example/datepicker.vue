<template>
    <div>
        <Alert />
        <page-header title="日期选择器" />
        <page-main title="选择日" class="demo">
            <div>默认</div>
            <el-date-picker v-model="value1" type="date" placeholder="选择日期" />
            <div>带快捷选项</div>
            <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions" />
        </page-main>
        <page-main title="其他日期单位" class="demo">
            <div>周</div>
            <el-date-picker v-model="value3" type="week" format="yyyy 第 WW 周" placeholder="选择周" />
            <div>月</div>
            <el-date-picker v-model="value4" type="month" placeholder="选择月" />
            <div>年</div>
            <el-date-picker v-model="value5" type="year" placeholder="选择年" />
            <div>多个日期</div>
            <el-date-picker v-model="value6" type="dates" placeholder="选择一个或多个日期" />
        </page-main>
        <page-main title="选择日期范围" class="demo">
            <el-date-picker v-model="value7" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </page-main>
        <page-main title="选择月份范围" class="demo">
            <el-date-picker v-model="value8" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份" />
        </page-main>
    </div>
</template>

<script>
import Alert from './components/alert'

export default {
    components: {
        Alert
    },
    data() {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now()
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date())
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24)
                        picker.$emit('pick', date)
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date()
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                        picker.$emit('pick', date)
                    }
                }]
            },
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            value7: '',
            value8: ''
        }
    }
}
</script>

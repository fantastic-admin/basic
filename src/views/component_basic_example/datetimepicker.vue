<template>
    <div>
        <Alert />
        <page-header title="日期时间选择器" />
        <page-main title="日期和时间点" class="demo">
            <el-date-picker v-model="value1" type="datetime" placeholder="选择日期时间" />
        </page-main>
        <page-main title="日期和时间范围" class="demo">
            <el-date-picker v-model="value2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </page-main>
        <page-main title="默认的起始与结束时刻" class="demo">
            <div>起始日期时刻为 12:00:00，结束日期时刻为 08:00:00</div>
            <el-date-picker v-model="value3" type="datetimerange" align="right" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['12:00:00', '08:00:00']" />
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
            value1: '',
            value2: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
            value3: ''
        }
    }
}
</script>

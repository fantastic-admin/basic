<route>
{
    meta: {
        enabled: false
    }
}
</route>

<script>
import Alert from './components/alert.vue'

const makeRange = (start, end) => {
    const result = []
    for (let i = start; i <= end; i++) {
        result.push(i)
    }
    return result
}
export default {
    components: {
        Alert
    },
    data() {
        return {
            value: '',
            value1: new Date(2016, 9, 10, 18, 40),
            startTime: '',
            endTime: ''
        }
    },
    methods: {
        // 如允许 17:30:00 - 18:30:00
        disabledHours() {
            return makeRange(0, 16).concat(makeRange(19, 23))
        },
        disabledMinutes(hour) {
            if (hour === 17) {
                return makeRange(0, 29)
            }
            if (hour === 18) {
                return makeRange(31, 59)
            }
        },
        disabledSeconds(hour, minute) {
            if (hour === 18 && minute === 30) {
                return makeRange(1, 59)
            }
        }
    }
}
</script>

<template>
    <div>
        <Alert />
        <page-header title="时间选择器" />
        <page-main title="固定时间点" class="demo">
            <el-time-select v-model="value" start="08:30" step="00:15" end="18:30" placeholder="选择时间" />
        </page-main>
        <page-main title="任意时间点" class="demo">
            <el-time-picker v-model="value1" :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes" :disabled-seconds="disabledSeconds" placeholder="任意时间点" />
        </page-main>
        <page-main title="固定时间范围" class="demo">
            <el-time-select v-model="startTime" placeholder="起始时间" start="08:30" step="00:15" end="18:30" style="margin-right: 10px;" />
            <el-time-select v-model="endTime" placeholder="结束时间" start="08:30" step="00:15" end="18:30" :min-time="startTime" />
        </page-main>
    </div>
</template>

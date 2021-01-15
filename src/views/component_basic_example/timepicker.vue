<template>
    <div>
        <Alert />
        <page-header title="时间选择器" />
        <page-main title="固定时间点" class="demo">
            <el-time-select
                v-model="value"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                }"
                placeholder="选择时间"
            />
        </page-main>
        <page-main title="任意时间点" class="demo">
            <el-time-picker
                v-model="value1"
                :picker-options="{
                    selectableRange: '18:30:00 - 20:30:00'
                }"
                placeholder="任意时间点"
            />
        </page-main>
        <page-main title="固定时间范围" class="demo">
            <el-time-select
                v-model="startTime"
                placeholder="起始时间"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30'
                }"
                style="margin-right: 10px;"
            />
            <el-time-select
                v-model="endTime"
                placeholder="结束时间"
                :picker-options="{
                    start: '08:30',
                    step: '00:15',
                    end: '18:30',
                    minTime: startTime
                }"
            />
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
            value: '',
            value1: new Date(2016, 9, 10, 18, 40),
            startTime: '',
            endTime: ''
        }
    }
}
</script>

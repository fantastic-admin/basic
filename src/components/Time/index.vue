<template>
    <span :title="$dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')">{{ date }}</span>
</template>

<script>
export default {
    name: 'Time',
    props: {
        value: {
            type: [Number, Date, String],
            required: true
        },
        cutOff: {
            type: String,
            validator: val => ['', 'minute', 'hour', 'day', 'month', 'year'].includes(val),
            default: ''
        }
    },
    data() {
        return {
            date: '',
            intervalMillisec: null,
            oneSecond: 1000,
            oneMinute: 60000,
            oneHour: 3600000,
            oneDay: 86400000,
            oneMonth: 2623860000,
            oneYear: 31567860000
        }
    },
    computed: {
        timestamp() {
            return this.$dayjs(this.value).valueOf()
        }
    },
    mounted() {
        this.setTime()
        this.startInterval()
    },
    beforeDestroy() {
        if (this.timer) {
            clearInterval(this.timer)
        }
    },
    updated() {
        if (this.timer) {
            clearInterval(this.timer)
        }
        this.setTime()
        this.startInterval()
    },
    methods: {
        startInterval() {
            this.intervalMillisec = this.getIntervalMillisec()
            this.timer = setInterval(() => {
                this.setTime()
                if (this.intervalMillisec !== this.getIntervalMillisec()) {
                    this.restartInterval()
                }
            }, this.intervalMillisec)
        },
        restartInterval() {
            clearInterval(this.timer)
            this.startInterval()
        },
        setTime() {
            // 获取当前时间时间戳
            const currentTime = new Date().getTime()
            // 获取两个时间戳差值
            const diff = Math.abs(currentTime - this.timestamp)
            // 判断传入时间戳是否早于当前时间戳
            const dirStr = this.timestamp <= currentTime ? '前' : '后'
            if (diff < this.oneMinute) {
                this.date = parseInt(diff / this.oneSecond) + '秒' + dirStr
            } else if (diff >= this.oneMinute && diff < this.oneHour && this.cutOff != 'minute') {
                this.date = parseInt(diff / this.oneMinute) + '分钟' + dirStr
            } else if (diff >= this.oneHour && diff < this.oneDay && this.cutOff != 'hour') {
                this.date = parseInt(diff / this.oneHour) + '小时' + dirStr
            } else if (diff >= this.oneDay && diff < this.oneMonth && this.cutOff != 'day') {
                this.date = parseInt(diff / this.oneDay) + '天' + dirStr
            } else if (diff >= this.oneMonth && diff < this.oneYear && this.cutOff != 'month') {
                this.date = parseInt(diff / this.oneMonth) + '个月' + dirStr
            } else if (diff >= this.oneYear && this.cutOff != 'year') {
                this.date = parseInt(diff / this.oneYear) + '年' + dirStr
            } else {
                this.date = this.$dayjs(this.timestamp).format('YYYY-MM-DD HH:mm:ss')
            }
        },
        // 获取 setInterval 的周期，如果小于 1 分钟，则周期为 1 秒，否则则为 1 分钟
        getIntervalMillisec() {
            const diff = Math.abs(new Date().getTime() - this.timestamp)
            return diff < 60000 ? 1000 : 60000
        }
    }
}
</script>

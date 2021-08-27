<template>
    <div :class="`trend ${isUp ? 'up' : 'down'}`">
        <span v-if="prefix" class="prefix">{{ prefix }}</span>
        <span class="text">{{ value }}</span>
        <span v-if="suffix" class="suffix">{{ suffix }}</span>
        <i :class="`${isUp ? 'el-icon-caret-top' : 'el-icon-caret-bottom'}`" />
    </div>
</template>

<script>
export default {
    name: 'Trend',
    props: {
        value: {
            type: String,
            required: true
        },
        type: {
            type: String,
            validator: val => ['up', 'down'].includes(val),
            default: 'up'
        },
        prefix: {
            type: String,
            default: ''
        },
        suffix: {
            type: String,
            default: ''
        },
        reverse: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isUp() {
            let isUp = this.type === 'up'
            if (this.reverse) {
                isUp = !isUp
            }
            return isUp
        }
    }
}
</script>

<style lang="scss" scoped>
.trend {
    display: inline-block;
    &.up {
        color: #67c23a;
    }
    &.down {
        color: #f56c6c;
    }
    i {
        margin-left: 5px;
    }
}
</style>

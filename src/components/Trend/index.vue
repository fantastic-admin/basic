<script setup name="Trend">
const props = defineProps({
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
})

const isUp = computed(() => {
    let isUp = props.type === 'up'
    if (props.reverse) {
        isUp = !isUp
    }
    return isUp
})
</script>

<template>
    <div :class="`trend ${isUp ? 'up' : 'down'}`">
        <span v-if="prefix" class="prefix">{{ prefix }}</span>
        <span class="text">{{ value }}</span>
        <span v-if="suffix" class="suffix">{{ suffix }}</span>
        <svg-icon :name="`${isUp ? 'el-icon-caret-top' : 'el-icon-caret-bottom'}`" />
    </div>
</template>

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

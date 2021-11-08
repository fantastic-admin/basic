<template>
    <el-icon v-if="name.indexOf('el-icon-') === 0 || name.indexOf('ElIcon') === 0" class="svg-icon" :style="transformStyle">
        <Component :is="name" />
    </el-icon>
    <i v-else-if="name.indexOf('ri-') === 0" class="svg-icon" :style="transformStyle" :class="name" />
    <svg v-else class="svg-icon" :style="transformStyle" aria-hidden="true">
        <use :xlink:href="`#icon-${name}`" />
    </svg>
</template>

<script setup>
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    flip: {
        type: String,
        validator(value) {
            return ['', 'horizontal', 'vertical', 'both'].includes(value)
        },
        default: ''
    },
    rotate: {
        type: Number,
        validator(value) {
            return value >= 0 && value <= 360
        },
        default: 0
    }
})

const transformStyle = computed(() => {
    let style = []
    if (props.flip != '') {
        switch (props.flip) {
            case 'horizontal':
                style.push('rotateY(180deg)')
                break
            case 'vertical':
                style.push('rotateX(180deg)')
                break
            case 'both':
                style.push('rotateX(180deg)')
                style.push('rotateY(180deg)')
                break
        }
    }
    if (props.rotate != 0) {
        style.push(`rotate(${props.rotate}deg)`)
    }
    return `transform: ${style.join(' ')};`
})
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>

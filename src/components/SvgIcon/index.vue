<template>
    <i v-if="name.indexOf('el-icon-') === 0" :class="name" />
    <svg v-else class="svg-icon" :style="transformStyle" aria-hidden="true">
        <use :xlink:href="`#icon-${name}`" />
    </svg>
</template>

<script>
export default {
    name: 'SvgIcon',
    props: {
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
    },
    computed: {
        transformStyle() {
            let style = []
            if (this.flip != '') {
                switch (this.flip) {
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
            if (this.rotate != 0) {
                style.push(`rotate(${this.rotate}deg)`)
            }
            return `transform: ${style.join(' ')};`
        }
    }
}
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

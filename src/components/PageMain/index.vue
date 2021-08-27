<template>
    <div :class="{
        'page-main': true,
        'is-collaspe': collaspeData
    }" :style="{
        'height': collaspeData ? height : ''
    }"
    >
        <div v-if="title" class="title-container">{{ title }}</div>
        <slot />
        <div v-if="collaspeData" class="collaspe" title="展开" @click="uncollaspe">
            <i class="el-icon-arrow-down" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageMain',
    props: {
        title: {
            type: String,
            default: ''
        },
        collaspe: {
            type: Boolean,
            default: false
        },
        height: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            collaspeData: this.collaspe
        }
    },
    methods: {
        uncollaspe() {
            this.collaspeData = false
        }
    }
}
</script>

<style lang="scss" scoped>
.page-main {
    position: relative;
    margin: 20px;
    padding: 20px;
    background-color: #fff;
    &.is-collaspe {
        overflow: hidden;
        .collaspe {
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 40px 0 10px;
            text-align: center;
            font-size: 24px;
            color: #ccc;
            text-shadow: 0 0 1px #000;
            background: linear-gradient(to bottom, transparent, #fff);
            cursor: pointer;
            transition: 0.3s;
            &:hover {
                color: #333;
            }
        }
    }
    .title-container {
        width: calc(100% + 40px);
        padding: 14px 20px;
        margin-left: -20px;
        margin-top: -20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #eee;
    }
}
</style>

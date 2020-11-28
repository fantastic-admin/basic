<template>
    <div class="absolute-container">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'AbsoluteContainer',
    props: {},
    data() {
        return {}
    },
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.absolute-container {
    position: absolute;
    width: 100%;
    height: calc(100% - #{$g-topbar-height});
}
</style>

<template>
    <div>
        <transition name="main" mode="out-in">
            <keep-alive :include="$store.state.keepAlive.list">
                <RouterView />
            </keep-alive>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'KeepAliveLayout',
    props: {},
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.main-enter-active,
.main-leave-active {
    transition: all 0.3s;
}
.main-enter {
    opacity: 0;
    margin-left: -20px;
}
.main-leave-to {
    opacity: 0;
    margin-left: 20px;
}
</style>

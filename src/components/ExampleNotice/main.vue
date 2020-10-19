<template>
    <transition name="notice">
        <div v-if="show" class="notice">
            {{ content }}
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ExampleNotice',
    data() {
        return {
            show: false,
            content: ''
        }
    },
    mounted() {
        this.show = true
        setTimeout(() => {
            this.show = false
        }, 2000)
    }
}
</script>

<style lang="scss" scoped>
.notice {
    padding: 10px;
    background-color: #eee;
    border-radius: 10px;
    @include position-center(xy);
}
.notice-leave-active,
.notice-enter-active {
    transition: all 0.3s;
}
.notice-enter,
.notice-leave-to {
    opacity: 0;
}
</style>

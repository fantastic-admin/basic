<script setup name="FixedActionBar">
const data = ref({
    isBottom: true
})

onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
})

function onScroll() {
    // 变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // 变量windowHeight是可视区的高度
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
    // 变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    // 滚动条到底部
    if (Math.ceil(scrollTop + windowHeight) >= scrollHeight) {
        data.value.isBottom = true
    } else {
        data.value.isBottom = false
    }
}
</script>

<template>
    <div class="actionbar" :class="{'shadow': !data.isBottom}" data-fixed-calc-width>
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.actionbar {
    z-index: 4;
    bottom: 0;
    padding: 20px;
    text-align: center;
    background-color: #fff;
    transition: all 0.3s, box-shadow 0.5s;
    box-shadow: 0 0 1px 0 #ccc;
    &.shadow {
        box-shadow: 0 -10px 10px -10px #ccc;
    }
}
:deep(.el-form-item) {
    margin-bottom: 0;
}
</style>

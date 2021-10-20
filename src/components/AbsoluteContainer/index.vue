<template>
    <div class="absolute-container">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.absolute-container {
    position: absolute;
    width: 100%;
    transition: 0.3s;
}
.main-container {
    .topbar-container + .main .absolute-container {
        height: calc(100% - #{$g-topbar-height});
    }
}
</style>

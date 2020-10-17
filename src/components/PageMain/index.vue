<template>
    <div class="page-main">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'PageMain'
}
</script>

<style lang="scss" scoped>
.page-main {
    margin: 20px;
    padding: 20px;
    background-color: #fff;
}
</style>

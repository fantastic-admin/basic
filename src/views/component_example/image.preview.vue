<template>
    <div>
        <page-main>
            <image-preview src="https://s1.ax1x.com/2020/07/03/NOeqld.jpg" :width="200" />
            <image-preview src="http://image.lookbi.com/four_season/uploads/supply//1/20200623/1592845429844750.png" :width="200" :height="150" />
            <el-divider content-position="left">加载失败</el-divider>
            <image-preview src="" width="100px" height="100px" />
        </page-main>
    </div>
</template>

<script>
export default {
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
// scss
</style>

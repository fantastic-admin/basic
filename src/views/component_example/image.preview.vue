<template>
    <div>
        <page-header title="图片预览" content="ImagePreview" />
        <page-main>
            <div>
                <image-preview src="https://s1.ax1x.com/2020/07/03/NOeqld.jpg" :width="200" />
            </div>
            <div>
                <image-preview src="" width="100px" height="100px" />
            </div>
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

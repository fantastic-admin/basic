<template>
    <div>
        <page-header title="图片预览" content="ImagePreview" />
        <page-main>
            <div>
                <image-preview :src="`https://hooray.${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/logo.png`" :width="200" />
            </div>
        </page-main>
        <page-main title="图片加载失败时">
            <div>
                <image-preview src="http://www.baidu.com" width="100px" height="100px" />
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
    computed: {
        locationOrigin: () => location.origin
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
// scss
</style>

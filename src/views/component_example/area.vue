<template>
    <div>
        <page-main>
            <cascader-area v-model="area" />
        </page-main>
    </div>
</template>

<script>
export default {
    inject: ['reload'],
    name: 'ComponentExampleArea',
    props: {},
    data() {
        return {
            area: ['浙江省', '杭州市', '西湖区']
        }
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
// scss
</style>

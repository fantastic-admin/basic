<template>
    <div>
        <page-header title="页面缓存" content="页面缓存只支持跳转至同级或下级路由，跳转上级路由则无法缓存，建议结合路由配置文件加深理解。" />
        <page-main>
            <div class="block">
                <el-switch v-model="openKeepAlive" active-text="开启缓存" inactive-text="关闭缓存" />
            </div>
            <div class="block">
                <el-input-number v-model="num" />
            </div>
            <div class="block">
                <el-button @click="go(1)">进入同级路由页面</el-button>
                <el-button @click="go(2)">进入下级路由页面</el-button>
                <el-button @click="go(3)">进入下下级路由页面</el-button>
            </div>
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'KeepAliveExamplePage',
    beforeRouteEnter(to, from, next) {
        // 进入页面时，先将当前页面的 name 信息存入 keep-alive 全局状态
        next(vm => {
            vm.$store.commit('keepAlive/add', 'KeepAliveExamplePage')
        })
    },
    beforeRouteLeave(to, from, next) {
        if (this.openKeepAlive) {
            // 因为并不是所有的路由跳转都需要将当前页面进行缓存，例如最常见的情况，从列表页进入详情页，则需要将列表页缓存，而从列表页跳转到其它页面，则不需要将列表页缓存
            // 所以下面的代码意思就是，如果目标路由的 name 不是 keepAliveExampleDetail 或者 keepAliveExampleDetail2 ，则将当前页面的 name 从 keep-alive 中删除
            if (!['keepAliveExampleDetail', 'keepAliveExampleDetail2', 'keepAliveExampleDetail3'].includes(to.name)) {
                // 注意：上面校验的是路由的 name ，下面记录的是当前页面的 name
                this.$store.commit('keepAlive/remove', 'KeepAliveExamplePage')
            }
        } else {
            this.$store.commit('keepAlive/clean')
        }
        next()
    },
    props: {},
    data() {
        return {
            openKeepAlive: false,
            num: 1
        }
    },
    created() {},
    mounted() {},
    methods: {
        go(type) {
            let routerName
            switch (type) {
                case 1: routerName = 'keepAliveExampleDetail'; break
                case 2: routerName = 'keepAliveExampleDetail2'; break
                case 3: routerName = 'keepAliveExampleDetail3'; break
            }
            this.$router.push({
                name: routerName
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.block {
    margin-bottom: 10px;
}
</style>

<template>
    <div class="notfound">
        <svg-icon name="404" />
        <div class="content">
            <h1>404</h1>
            <div class="desc">抱歉，你访问的页面不存在</div>
            <el-button type="primary" @click="goBack">{{ countdown }}秒后，返回首页</el-button>
        </div>
    </div>
</template>

<script>
export default {
    beforeRouteLeave(to, from, next) {
        clearInterval(this.inter)
        next()
    },
    data() {
        return {
            inter: null,
            countdown: 5
        }
    },
    mounted() {
        this.inter = setInterval(() => {
            this.countdown--
            if (this.countdown == 0) {
                clearInterval(this.inter)
                this.goBack()
            }
        }, 1000)
    },
    methods: {
        goBack() {
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.notfound {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 700px;
    @include position-center(xy);
    .svg-icon {
        width: 400px;
        height: 400px;
    }
    .content {
        h1 {
            margin: 0;
            font-size: 72px;
            color: #303133;
        }
        .desc {
            margin: 20px 0 30px;
            font-size: 20px;
            color: #606266;
        }
    }
}
</style>

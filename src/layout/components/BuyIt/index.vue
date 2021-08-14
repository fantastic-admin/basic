<template>
    <div class="buy-it">
        <div class="item" @click="open('http://wpa.qq.com/msgrd?v=3&uin=304327508&site=qq&menu=yes')">
            <svg-icon name="fixed-right-qq" />
            <span class="title">在线<br>咨询</span>
        </div>
        <div class="item chat" @click="open('https://qm.qq.com/cgi-bin/qm/qr?k=WoDBYN0S9r94f9oBZkxlGbiYxu3dEzgt&jump_from=webapi')">
            <svg-icon name="fixed-right-chat" />
            <span class="title">加入<br>QQ群</span>
        </div>
        <div class="item buy" @click="open(`https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/buy.html`)">
            <svg-icon name="fixed-right-buy" />
            <span class="title">购买<br>专业版</span>
        </div>
        <div class="item doc" @click="open(`https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/`)">
            <svg-icon name="fixed-right-doc" />
            <span class="title">开发<br>文档</span>
        </div>
        <div class="item code" @click="open(`https://${location.origin.includes('gitee') ? 'gitee' : 'github'}.com/hooray/fantastic-admin/`)">
            <svg-icon name="fixed-right-code" />
            <span class="title">下载<br>基础版</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            location: {
                origin: location.origin
            }
        }
    },
    mounted() {
        this.$notify({
            type: 'success',
            title: '温馨提示',
            dangerouslyUseHTMLString: true,
            message: `
                <p>当前访问的是<b>基础版</b></p>
                <p>你可以点<a href="https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/vue2/pro/" target="_blank"><b>这里</b></a>访问专业版</p>
                <div style="border-top: 1px solid #ccc; margin: 10px 0;"></div>
                <p>如果你对 Vue3 感兴趣，框架也提供了 Vue3 版本的：<a href="https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/vue3/basic/" target="_blank"><b>基础版</b></a>和<a href="https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/vue3/pro/" target="_blank"><b>专业版</b></a></p>
            `,
            position: 'bottom-right',
            duration: 0
        })
    },
    methods: {
        open(url) {
            window.open(url, 'top')
        }
    }
}
</script>

<style lang="scss" scoped>
.buy-it {
    position: fixed;
    z-index: 10;
    right: 0;
    top: 50%;
    margin-top: -170px;
    width: 60px;
    display: flex;
    flex-direction: column;
    .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 70px;
        text-align: center;
        color: #fff;
        background-color: #409eff;
        border-bottom: 1px solid #fff;
        transition: 0.3s;
        opacity: 0.6;
        cursor: pointer;
        &:hover {
            opacity: 1;
        }
        &:first-child {
            border-top-left-radius: 5px;
        }
        &:last-child {
            border-bottom-left-radius: 5px;
            border-bottom: 0;
        }
        &.chat {
            background-color: #0fcc1a;
        }
        &.buy {
            background-color: #ff4200;
        }
        &.doc {
            background-color: #727272;
        }
        &.code {
            background-color: #343b42;
        }
        .svg-icon {
            display: block;
            margin: 0 auto;
            font-size: 20px;
        }
        .title {
            display: inline-block;
            font-size: 12px;
        }
    }
}
</style>

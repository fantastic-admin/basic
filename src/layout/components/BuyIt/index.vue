<script setup name="BuyIt">
const { proxy } = getCurrentInstance()

const locationOrigin = ref(location.href)

const isActived = ref(true)
setTimeout(() => {
    isActived.value = false
}, 5000)

onMounted(() => {
    proxy.$notify({
        type: 'success',
        title: '温馨提示',
        dangerouslyUseHTMLString: true,
        message: `
                <p>当前访问的是<b>基础版</b> (Vue3)</p>
                <p>你可以点<a href="https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/vue3/pro/" target="_blank"><b>这里</b></a>访问专业版 (Vue3)</p>
            `,
        position: 'bottom-right',
        duration: 5000
    })
    setTimeout(() => {
        proxy.$notify({
            type: 'warning',
            title: '点⭐领取专业版源码',
            dangerouslyUseHTMLString: true,
            message: `
                <p>给项目仓库点⭐就可以领取专业版源码，点<a href="https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/buy" target="_blank"><b>这里</b></a>了解一下</p>
            `,
            position: 'bottom-right',
            duration: 0
        })
    }, 0)
    proxy.$messageBox.confirm('<p>做为本框架的作者，我一直秉持着 <b>人无我有，人有我优</b> 的准则要求自己，用心去打造每一个功能。</p><p>这一次，我又带来了一个全新的功能，那就是 <b>基于文件系统的路由</b>，并且(目前)在市面上各种后台框架中，我们是唯一一款提供该功能的。</p><p>我已经迫不及待地希望你们可以尽快了解并使用上，因为这意味着，<b>手动编写路由数据的开发模式将成为过去式</b>！</p>', '作者寄语', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '去看看',
        cancelButtonText: '知道了'
    }).then(() => {
        open(`https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/guide/file-system-route.html`)
    })
})

function open(url) {
    window.open(url, 'top')
}
</script>

<template>
    <div class="buy-it" :class="{'actived': isActived}">
        <div class="item" @click="open('https://wpa.qq.com/msgrd?v=3&uin=304327508&site=qq&menu=yes')">
            <svg-icon name="fixed-right-qq" />
            <span class="title">在线<br>咨询</span>
        </div>
        <div class="item chat" @click="open('https://qm.qq.com/cgi-bin/qm/qr?k=WoDBYN0S9r94f9oBZkxlGbiYxu3dEzgt&jump_from=webapi')">
            <svg-icon name="fixed-right-chat" />
            <span class="title">加入<br>QQ群</span>
        </div>
        <div class="item buy" @click="open(`https://hooray.${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/buy.html`)">
            <svg-icon name="fixed-right-buy" />
            <span class="title">购买<br>专业版</span>
        </div>
        <div class="item doc" @click="open(`https://hooray.${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.io/fantastic-admin/`)">
            <svg-icon name="fixed-right-doc" />
            <span class="title">开发<br>文档</span>
        </div>
        <div class="item code" @click="open(`https://${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.com/hooray/fantastic-admin/`)">
            <svg-icon name="fixed-right-code" />
            <span class="title">下载<br>基础版</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.buy-it {
    position: fixed;
    z-index: 10;
    right: -58px;
    top: 50%;
    margin-top: -170px;
    width: 70px;
    display: flex;
    flex-direction: column;
    transition: right 0.3s;
    &.actived,
    &:hover {
        right: 0;
    }
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
        opacity: 0.7;
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

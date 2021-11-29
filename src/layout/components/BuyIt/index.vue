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
    <el-dialog v-model="discoveryInfo.dialogVisible" title="One-step-admin 正式发布" width="600px" center :close-on-click-modal="false">
        <div style="text-align: center; margin-bottom: 20px;">One-step-admin 是一款<b>干啥都快人一步</b>的 Vue 中后台管理系统框架</div>
        <el-carousel trigger="click" indicator-position="none" arrow="always" :autoplay="false" height="330px">
            <el-carousel-item v-for="item in discoveryInfo.data" :key="item">
                <img :src="item.img" style="cursor: pointer; width: 100%; margin: auto;" @click="discoveryInfo.imageVisible = true; discoveryInfo.imagePreview = [item.img]">
                <div style="text-align: center; margin-top: 20px;">{{ item.text }}</div>
            </el-carousel-item>
        </el-carousel>
        <el-image-viewer v-if="discoveryInfo.imageVisible" :url-list="discoveryInfo.imagePreview" @close="discoveryInfo.imageVisible = false" />
        <template #footer>
            <el-button @click="discoveryInfo.dialogVisible = false">不用了</el-button>
            <el-button type="primary" @click="open(`https://hooray.${locationOrigin.includes('gitee') ? 'gitee' : 'github'}.io/one-step-admin/`)">去看看</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
const { proxy } = getCurrentInstance()

const locationOrigin = ref(location.href)

const isActived = ref(true)
setTimeout(() => {
    isActived.value = false
}, 5000)

const discoveryInfo = ref({
    dialogVisible: true,
    imageVisible: false,
    imagePreview: [],
    data: [
        { img: `https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/one-step-admin/intro-1.gif`, text: '摆脱传统后台框架路由跳转的交互，将每个模块以窗口的形式展示在同一个界面中，让使用人员可以做到跨模块的多线操作。' },
        { img: `https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/one-step-admin/intro-2.gif`, text: '窗口默认宽度为 800px ，可以在项目中进行调整，也可以通过最大化按钮将窗口最大化展示，以便展示更多信息。' },
        { img: `https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/one-step-admin/intro-3.gif`, text: '提供的预览界面可以帮助使用人员快速定位到需要操作的窗口。' },
        { img: `https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/one-step-admin/intro-4.gif`, text: '可勾选 2 到 4 个窗口平均分布在页面中，专注于所勾选的窗口进行操作。' },
        { img: `https://hooray.${location.origin.includes('gitee') ? 'gitee' : 'github'}.io/one-step-admin/intro-5.gif`, text: '快速调整窗口的展示顺序。' }
    ]
})

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
})

function open(url) {
    window.open(url, 'top')
}
</script>

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

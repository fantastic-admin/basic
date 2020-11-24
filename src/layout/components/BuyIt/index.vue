<template>
    <div class="buy-it">
        <div class="item" @click="open('http://wpa.qq.com/msgrd?v=3&uin=304327508&site=qq&menu=yes')">
            <svg-icon name="fixed-right-qq" />
            <span class="title">咨询</span>
        </div>
        <template>
            <el-popover placement="left" width="400" trigger="hover">
                <div class="pay">
                    <div class="wechat">
                        <el-image :src="require('@/assets/images/wechat.png')" />
                    </div>
                    <div class="alipay">
                        <el-image :src="require('@/assets/images/alipay.png')" />
                    </div>
                    <div class="info">
                        <p>专业版限时优惠 <b style="font-size: 18px; color: #f40;">396</b> 元，截止至 2020/12/31</p>
                        <p>请先加作者 QQ ：304327508 ，或者点击右侧在线咨询，然后通过上方微信或支付宝进行支付</p>
                        <p>支付成功后将需提供一个源码接收邮箱地址，源码包含专业版演示源码和模版源码</p>
                    </div>
                </div>
                <div slot="reference" class="item buy">
                    <svg-icon name="fixed-right-buy" />
                    <span class="title">购买</span>
                </div>
            </el-popover>
            <div class="item doc" @click="open('https://hooray.gitee.io/fantastic-admin/')">
                <svg-icon name="fixed-right-doc" />
                <span class="title">文档</span>
            </div>
            <div class="item code" @click="open('https://gitee.com/hooray/fantastic-admin/')">
                <svg-icon name="fixed-right-code" />
                <span class="title">源码</span>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$notify({
            type: 'info',
            iconClass: '',
            title: '优惠啦~',
            message: '专业版限时优惠 396 元，截止至 2020/12/31',
            duration: 6000
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
    right: 0;
    top: 50%;
    margin-top: -120px;
    width: 60px;
    display: flex;
    flex-direction: column;
    .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 60px;
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
        &.buy {
            border-radius: 0;
            border-bottom: 1px solid #fff;
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
.pay {
    text-align: center;
    .wechat,
    .alipay {
        display: inline-block;
        width: 160px;
        margin: 10px 10px;
        padding: 20px 20px 0;
        color: #fff;
        border-radius: 4px;
        &::after {
            display: block;
            height: 40px;
            line-height: 36px;
            font-size: 14px;
            font-weight: bold;
            text-align: center;
        }
    }
    .wechat {
        background-color: #22ab38;
        &::after {
            content: '请使用微信支付';
        }
    }
    .alipay {
        background-color: #1678ff;
        &::after {
            content: '请使用支付宝支付';
        }
    }
    .info {
        line-height: 20px;
        p {
            margin: 10px;
        }
    }
}
</style>

<script setup lang="ts">
import { ElNotification } from 'element-plus'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'BuyIt',
})

const isActived = ref(true)
setTimeout(() => {
  isActived.value = false
}, 5000)

const UIdialog = ref(false)
function switchUI() {
  UIdialog.value = true
}

function open(url: string) {
  window.open(url, '_blank')
}

onMounted(() => {
  eventBus.on('global-ui-component-switch', () => switchUI())
//   ElNotification({
//     type: 'info',
//     title: '「 专业版限时优惠倒计时 」',
//     dangerouslyUseHTMLString: true,
//     message: `
// <p>限时优惠活动将于 <b>2024/04/01</b> 到期，现在购买只需 <b style="font-size: 18px; color: #ff4400;">899.00</b> 元。</p>
// <p style="text-align: right;"><a href="https://fantastic-admin.gitee.io/buy.html" target="_blank">查看详情</a></p>
//     `,
//     position: 'bottom-right',
//     duration: 0,
//   })
//   setTimeout(() => {
//     ElNotification({
//       type: 'info',
//       title: '「 免费领取 Vue2 版本专业版 」',
//       dangerouslyUseHTMLString: true,
//       message: `
// <p style="text-align: right;"><a href="https://fantastic-admin.gitee.io/get-vue2-pro.html" target="_blank">查看详情</a></p>
//     `,
//       position: 'bottom-right',
//       duration: 0,
//     })
//   }, 0)
})

onUnmounted(() => {
  ElNotification.closeAll()
})
</script>

<template>
  <div class="buy-it" :class="{ actived: isActived }">
    <div class="item" @click="switchUI">
      <SvgIcon name="i-icon-park-twotone:components" />
      <span class="title">切换<br>组件库</span>
      <HDialog v-model="UIdialog" title="切换组件库" overlay>
        <div class="rounded-2 bg-green/20 px-4 py-2 text-sm/6 c-green-6">
          <p class="my-1">
            为了视觉风格统一，同时也能服务于更多开发者，本框架从 v4.0.0 版本开始，与 Element Plus 组件库进行了解耦，意味着可以轻松将 Element Plus 组件库替换成其他 UI 组件库，并且不会影响框架原本的功能。
          </p>
          <p class="my-1">
            演示站挑选了以下 6 款组件库作为示例，你可以点击访问并预览。
          </p>
        </div>
        <div class="mt-4 flex flex-wrap justify-center gap-4">
          <HButton @click="open('https://fantastic-admin.github.io/antd-example/')">
            访问 Ant Design Vue 演示站
          </HButton>
          <HButton @click="open('https://fantastic-admin.github.io/arco-example/')">
            访问 Arco Design Vue 演示站
          </HButton>
          <HButton @click="open('https://fantastic-admin.github.io/naive-example/')">
            访问 Naive UI 演示站
          </HButton>
          <HButton @click="open('https://fantastic-admin.github.io/tdesign-example/')">
            访问 TDesign 演示站
          </HButton>
          <HButton @click="open('https://fantastic-admin.github.io/vexip-example/')">
            访问 Vexip UI 演示站
          </HButton>
          <HButton @click="open('https://fantastic-admin.github.io/idux-example/')">
            访问 iDux 演示站
          </HButton>
        </div>
      </HDialog>
    </div>
    <div class="item" @click="open(`https://fantastic-admin.gitee.io/buy.html`)">
      <SvgIcon name="i-ri:money-cny-box-line" />
      <span class="title">购买<br>专业版</span>
    </div>
    <div class="item" @click="open('https://gitee.com/fantastic-admin/basic')">
      <SvgIcon name="i-ri:code-s-slash-line" />
      <span class="title">下载<br>基础版</span>
    </div>
    <div class="item" @click="open(`https://fantastic-admin.gitee.io`)">
      <SvgIcon name="i-ri:book-read-line" />
      <span class="title">开发<br>文档</span>
    </div>
    <div class="item" @click="open(`https://fantastic-admin.gitee.io/support.html`)">
      <SvgIcon name="i-ri:message-2-line" />
      <span class="title">技术<br>支持</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.buy-it {
  position: fixed;
  top: 50%;
  right: -58px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 70px;
  transition: right 0.3s;
  transform: translateY(-50%);

  &.actived,
  &:hover {
    right: 0;
  }

  .item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    justify-content: center;
    height: 70px;
    color: #fff;
    text-align: center;
    cursor: pointer;
    border-bottom: 1px solid #fff;
    opacity: 0.7;
    transition: 0.3s;

    &:hover {
      opacity: 1;
    }

    &:first-child {
      border-top-left-radius: 5px;
    }

    &:last-child {
      border-bottom: 0;
      border-bottom-left-radius: 5px;
    }

    &:nth-child(1) {
      --at-apply: bg-pink;
    }

    &:nth-child(2) {
      --at-apply: bg-orange;
    }

    &:nth-child(3) {
      --at-apply: bg-green;
    }

    &:nth-child(4) {
      --at-apply: bg-red;
    }

    &:nth-child(5) {
      --at-apply: bg-stone;
    }

    i {
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

<script setup lang="ts">
import dayjs from '@/utils/dayjs'
import eventBus from '@/utils/eventBus'
import isBetween from 'dayjs/plugin/isBetween'
import { ElNotification } from 'element-plus'

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
  dayjs.extend(isBetween)
  if (dayjs().isBetween('2024-10-17', '2024-11-17')) {
    ElNotification({
      type: 'info',
      title: '「 四周年庆，全年最低价 」',
      dangerouslyUseHTMLString: true,
      message: `
  <p>为庆祝 Fantastic-admin 正式发布四周年，我们在 <b>2024/10/17 - 2024/11/17</b> 期间推出一系列优惠。</p>
  <p style="text-align: right;"><a href="https://fantastic-admin.hurui.me/buy-4yr.html" target="_blank">查看详情</a></p>
      `,
      position: 'bottom-right',
      duration: 0,
    })
  }
})

onUnmounted(() => {
  ElNotification.closeAll()
})
</script>

<template>
  <div class="buy-it" :class="{ actived: isActived }">
    <div class="item" @click="switchUI">
      <FaIcon name="i-icon-park-twotone:components" />
      <span class="title">切换<br>组件库</span>
      <FaModal v-model="UIdialog" title="切换组件库" description="演示站挑选了以下 6 款组件库作为示例，你可以点击访问并预览" :footer="false">
        <div class="rounded-2 bg-green/20 px-4 py-2 text-sm/6 c-green-6">
          为了视觉风格统一，同时也能服务于更多开发者，本框架从 v4 版本开始，与 Element Plus 组件库进行了解耦，意味着可以轻松将 Element Plus 组件库替换成其他 UI 组件库，并且不会影响框架原本的功能。
        </div>
        <div class="mt-4 flex-col-center gap-2">
          <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/antd-example/')">
            <FaIcon name="https://aliyuncdn.antdv.com/favicon.ico" />
            访问 Ant Design Vue 演示站
          </FaButton>
          <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/arco-example/')">
            <FaIcon name="https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico" />
            访问 Arco Design Vue 演示站
          </FaButton>
          <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/naive-example/')">
            <FaIcon name="i-logos:naiveui" />
            访问 Naive UI 演示站
          </FaButton>
          <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/tdesign-example/')">
            <FaIcon name="https://static.tdesign.tencent.com/favicon.ico" />
            访问 TDesign 演示站
          </FaButton>
          <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/vexip-example/')">
            <FaIcon name="https://www.vexipui.com/vexip-ui.svg" />
            访问 Vexip UI 演示站
          </FaButton>
          <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/idux-example/')">
            <FaIcon name="https://idux.site/favicon.ico" />
            访问 iDux 演示站
          </FaButton>
        </div>
      </FaModal>
    </div>
    <div class="item" @click="open(`https://fantastic-admin.hurui.me/buy.html`)">
      <FaIcon name="i-ri:money-cny-box-line" />
      <span class="title">购买<br>专业版</span>
    </div>
    <div class="item" @click="open('https://github.com/fantastic-admin/basic')">
      <FaIcon name="i-ri:code-s-slash-line" />
      <span class="title">下载<br>基础版</span>
    </div>
    <div class="item" @click="open(`https://fantastic-admin.hurui.me`)">
      <FaIcon name="i-ri:book-read-line" />
      <span class="title">开发<br>文档</span>
    </div>
    <div class="item" @click="open(`https://fantastic-admin.hurui.me/support.html`)">
      <FaIcon name="i-ri:message-2-line" />
      <span class="title">技术<br>支持</span>
    </div>
  </div>
</template>

<style scoped>
.buy-it {
  position: fixed;
  inset-inline-end: -58px;
  top: 50%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  width: 70px;
  overflow: hidden;
  border-radius: 5px 0 0 5px;
  transform: translateY(-50%);
  transition: inset-inline-end 0.3s;

  &.actived,
  &:hover {
    inset-inline-end: 0;
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

    &:last-child {
      border-bottom: 0;
    }

    &:nth-child(1) {
      --uno: bg-pink;
    }

    &:nth-child(2) {
      --uno: bg-orange;
    }

    &:nth-child(3) {
      --uno: bg-green;
    }

    &:nth-child(4) {
      --uno: bg-red;
    }

    &:nth-child(5) {
      --uno: bg-stone;
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

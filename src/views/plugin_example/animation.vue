<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import Alert from './components/alert.vue'
import 'animate.css'

const animateList = ref([
  {
    label: 'Attention seekers',
    options: [
      { label: 'bounce', value: 'animate__bounce' },
      { label: 'flash', value: 'animate__flash' },
      { label: 'pulse', value: 'animate__pulse' },
      { label: 'rubberBand', value: 'animate__rubberBand' },
      { label: 'shakeX', value: 'animate__shakeX' },
      { label: 'shakeY', value: 'animate__shakeY' },
      { label: 'headShake', value: 'animate__headShake' },
      { label: 'swing', value: 'animate__swing' },
      { label: 'tada', value: 'animate__tada' },
      { label: 'wobble', value: 'animate__wobble' },
      { label: 'jello', value: 'animate__jello' },
      { label: 'heartBeat', value: 'animate__heartBeat' },
    ],
  },
  {
    label: 'Back entrances',
    options: [
      { label: 'backInDown', value: 'animate__backInDown' },
      { label: 'backInLeft', value: 'animate__backInLeft' },
      { label: 'backInRight', value: 'animate__backInRight' },
      { label: 'backInUp', value: 'animate__backInUp' },
    ],
  },
  {
    label: 'Back exits',
    options: [
      { label: 'backOutDown', value: 'animate__backOutDown' },
      { label: 'backOutLeft', value: 'animate__backOutLeft' },
      { label: 'backOutRight', value: 'animate__backOutRight' },
      { label: 'backOutUp', value: 'animate__backOutUp' },
    ],
  },
  {
    label: 'Bouncing entrances',
    options: [
      { label: 'bounceIn', value: 'animate__bounceIn' },
      { label: 'bounceInDown', value: 'animate__bounceInDown' },
      { label: 'bounceInLeft', value: 'animate__bounceInLeft' },
      { label: 'bounceInRight', value: 'animate__bounceInRight' },
      { label: 'bounceInUp', value: 'animate__bounceInUp' },
    ],
  },
  {
    label: 'Bouncing exits',
    options: [
      { label: 'bounceOut', value: 'animate__bounceOut' },
      { label: 'bounceOutDown', value: 'animate__bounceOutDown' },
      { label: 'bounceOutLeft', value: 'animate__bounceOutLeft' },
      { label: 'bounceOutRight', value: 'animate__bounceOutRight' },
      { label: 'bounceOutUp', value: 'animate__bounceOutUp' },
    ],
  },
  {
    label: 'Fading entrances',
    options: [
      { label: 'fadeIn', value: 'animate__fadeIn' },
      { label: 'fadeInDown', value: 'animate__fadeInDown' },
      { label: 'fadeInDownBig', value: 'animate__fadeInDownBig' },
      { label: 'fadeInLeft', value: 'animate__fadeInLeft' },
      { label: 'fadeInLeftBig', value: 'animate__fadeInLeftBig' },
      { label: 'fadeInRight', value: 'animate__fadeInRight' },
      { label: 'fadeInRightBig', value: 'animate__fadeInRightBig' },
      { label: 'fadeInUp', value: 'animate__fadeInUp' },
      { label: 'fadeInUpBig', value: 'animate__fadeInUpBig' },
      { label: 'fadeInTopLeft', value: 'animate__fadeInTopLeft' },
      { label: 'fadeInTopRight', value: 'animate__fadeInTopRight' },
      { label: 'fadeInBottomLeft', value: 'animate__fadeInBottomLeft' },
      { label: 'fadeInBottomRight', value: 'animate__fadeInBottomRight' },
    ],
  },
  {
    label: 'Fading exits',
    options: [
      { label: 'fadeOut', value: 'animate__fadeOut' },
      { label: 'fadeOutDown', value: 'animate__fadeOutDown' },
      { label: 'fadeOutDownBig', value: 'animate__fadeOutDownBig' },
      { label: 'fadeOutLeft', value: 'animate__fadeOutLeft' },
      { label: 'fadeOutLeftBig', value: 'animate__fadeOutLeftBig' },
      { label: 'fadeOutRight', value: 'animate__fadeOutRight' },
      { label: 'fadeOutRightBig', value: 'animate__fadeOutRightBig' },
      { label: 'fadeOutUp', value: 'animate__fadeOutUp' },
      { label: 'fadeOutUpBig', value: 'animate__fadeOutUpBig' },
      { label: 'fadeOutTopLeft', value: 'animate__fadeOutTopLeft' },
      { label: 'fadeOutTopRight', value: 'animate__fadeOutTopRight' },
      { label: 'fadeOutBottomLeft', value: 'animate__fadeOutBottomLeft' },
      { label: 'fadeOutBottomRight', value: 'animate__fadeOutBottomRight' },
    ],
  },
  {
    label: 'Flippers',
    options: [
      { label: 'flip', value: 'animate__flip' },
      { label: 'flipInX', value: 'animate__flipInX' },
      { label: 'flipInY', value: 'animate__flipInY' },
      { label: 'flipOutX', value: 'animate__flipOutX' },
      { label: 'flipOutY', value: 'animate__flipOutY' },
    ],
  },
  {
    label: 'Lightspeed',
    options: [
      { label: 'lightSpeedInRight', value: 'animate__lightSpeedInRight' },
      { label: 'lightSpeedInLeft', value: 'animate__lightSpeedInLeft' },
      { label: 'lightSpeedOutRight', value: 'animate__lightSpeedOutRight' },
      { label: 'lightSpeedOutLeft', value: 'animate__lightSpeedOutLeft' },
    ],
  },
  {
    label: 'Rotating entrances',
    options: [
      { label: 'rotateIn', value: 'animate__rotateIn' },
      { label: 'rotateInDownLeft', value: 'animate__rotateInDownLeft' },
      { label: 'rotateInDownRight', value: 'animate__rotateInDownRight' },
      { label: 'rotateInUpLeft', value: 'animate__rotateInUpLeft' },
      { label: 'rotateInUpRight', value: 'animate__rotateInUpRight' },
    ],
  },
  {
    label: 'Rotating exits',
    options: [
      { label: 'rotateOut', value: 'animate__rotateOut' },
      { label: 'rotateOutDownLeft', value: 'animate__rotateOutDownLeft' },
      { label: 'rotateOutDownRight', value: 'animate__rotateOutDownRight' },
      { label: 'rotateOutUpLeft', value: 'animate__rotateOutUpLeft' },
      { label: 'rotateOutUpRight', value: 'animate__rotateOutUpRight' },
    ],
  },
  {
    label: 'Specials',
    options: [
      { label: 'hinge', value: 'animate__hinge' },
      { label: 'jackInTheBox', value: 'animate__jackInTheBox' },
      { label: 'rollIn', value: 'animate__rollIn' },
      { label: 'rollOut', value: 'animate__rollOut' },
    ],
  },
  {
    label: 'Zooming entrances',
    options: [
      { label: 'zoomIn', value: 'animate__zoomIn' },
      { label: 'zoomInDown', value: 'animate__zoomInDown' },
      { label: 'zoomInLeft', value: 'animate__zoomInLeft' },
      { label: 'zoomInRight', value: 'animate__zoomInRight' },
      { label: 'zoomInUp', value: 'animate__zoomInUp' },
    ],
  },
  {
    label: 'Zooming exits',
    options: [
      { label: 'zoomOut', value: 'animate__zoomOut' },
      { label: 'zoomOutDown', value: 'animate__zoomOutDown' },
      { label: 'zoomOutLeft', value: 'animate__zoomOutLeft' },
      { label: 'zoomOutRight', value: 'animate__zoomOutRight' },
      { label: 'zoomOutUp', value: 'animate__zoomOutUp' },
    ],
  },
  {
    label: 'Sliding entrances',
    options: [
      { label: 'slideInDown', value: 'animate__slideInDown' },
      { label: 'slideInLeft', value: 'animate__slideInLeft' },
      { label: 'slideInRight', value: 'animate__slideInRight' },
      { label: 'slideInUp', value: 'animate__slideInUp' },
    ],
  },
  {
    label: 'Sliding exits',
    options: [
      { label: 'slideOutDown', value: 'animate__slideOutDown' },
      { label: 'slideOutLeft', value: 'animate__slideOutLeft' },
      { label: 'slideOutRight', value: 'animate__slideOutRight' },
      { label: 'slideOutUp', value: 'animate__slideOutUp' },
    ],
  },
])

const animateIn = ref('animate__bounce')
const animateOut = ref('animate__bounce')

const flag = ref(true)

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="过渡动画" content="结合 <transition> 组件使用">
      <template #content>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add animate.css</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://github.com/animate-css/animate.css')">
        <template #icon>
          <SvgIcon name="ep:link" />
        </template>
        访问 animate.css
      </ElButton>
    </PageHeader>
    <PageMain>
      <ElForm>
        <ElFormItem label="进入动画（显示）">
          <ElSelect v-model="animateIn" filterable>
            <ElOptionGroup v-for="group in animateList" :key="group.label" :label="group.label">
              <ElOption v-for="item in group.options" :key="item.label" :label="item.label" :value="item.value" />
            </ElOptionGroup>
          </ElSelect>
        </ElFormItem>
        <ElFormItem label="离开动画（隐藏）">
          <ElSelect v-model="animateOut" filterable>
            <ElOptionGroup v-for="group in animateList" :key="group.label" :label="group.label">
              <ElOption v-for="item in group.options" :key="item.label" :label="item.label" :value="item.value" />
            </ElOptionGroup>
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton @click="flag = !flag">
            {{ flag ? '隐藏' : '显示' }}
          </ElButton>
        </ElFormItem>
      </ElForm>
      <Transition :enter-active-class="`animate__animated ${animateIn}`" :leave-active-class="`animate__animated ${animateOut}`">
        <div v-if="flag" class="box" />
      </Transition>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: deepskyblue;
}
</style>

<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

import Alert from './components/alert.vue'

const modules = [Navigation, Pagination, Scrollbar, A11y]

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <PageHeader title="轮播动画">
      <template #content>
        <p style="margin-bottom: 0;">
          安装命令：<ElTag>pnpm add swiper</ElTag>
        </p>
      </template>
      <ElButton @click="open('https://swiperjs.com/vue')">
        <template #icon>
          <SvgIcon name="ep:link" />
        </template>
        访问 swiper
      </ElButton>
    </PageHeader>
    <ElRow :gutter="20" style="margin: -10px 10px;">
      <ElCol :md="8">
        <PageMain style="margin: 10px 0;">
          <Swiper :modules="modules" class="swiper" autoplay>
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
            <SwiperSlide>Slide 10</SwiperSlide>
          </Swiper>
        </PageMain>
      </ElCol>
      <ElCol :md="8">
        <PageMain style="margin: 10px 0;">
          <Swiper :modules="modules" class="swiper" :pagination="{ clickable: true }">
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
            <SwiperSlide>Slide 10</SwiperSlide>
          </Swiper>
        </PageMain>
      </ElCol>
      <ElCol :md="8">
        <PageMain style="margin: 10px 0;">
          <Swiper :modules="modules" class="swiper" navigation>
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
            <SwiperSlide>Slide 10</SwiperSlide>
          </Swiper>
        </PageMain>
      </ElCol>
    </ElRow>
    <ElRow :gutter="20" style="margin: -10px 10px;">
      <ElCol :md="8">
        <PageMain style="margin: 10px 0;">
          <Swiper :modules="modules" class="swiper" :pagination="{ dynamicBullets: true }">
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
            <SwiperSlide>Slide 10</SwiperSlide>
          </Swiper>
        </PageMain>
      </ElCol>
      <ElCol :md="8">
        <PageMain style="margin: 10px 0;">
          <Swiper :modules="modules" class="swiper" :pagination="{ type: 'fraction' }">
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
            <SwiperSlide>Slide 10</SwiperSlide>
          </Swiper>
        </PageMain>
      </ElCol>
      <ElCol :md="8">
        <PageMain style="margin: 10px 0;">
          <Swiper :modules="modules" class="swiper" :scrollbar="{ draggable: true }">
            <SwiperSlide>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
            <SwiperSlide>Slide 10</SwiperSlide>
          </Swiper>
        </PageMain>
      </ElCol>
    </ElRow>
  </div>
</template>

<style lang="scss" scoped>
.swiper {
  width: 100%;
  height: 300px;

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36.4px;
    font-weight: 700;
    text-align: center;
    background-color: #fff;
  }
}
</style>

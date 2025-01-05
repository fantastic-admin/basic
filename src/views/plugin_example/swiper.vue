<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
// import Swiper core and required modules
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper/modules'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

import Alert from './components/alert.vue'
import Command from './components/command.vue'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

const modules = [Navigation, Pagination, Scrollbar, A11y]

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <FaPageHeader title="轮播动画">
      <template #description>
        <p>
          安装命令：
          <Command text="pnpm add swiper" />
        </p>
      </template>
      <FaButton variant="outline" @click="open('https://swiperjs.com/vue')">
        <FaIcon name="i-ep:link" />
        访问 swiper
      </FaButton>
    </FaPageHeader>
    <div class="grid grid-cols-1 mx-4 gap-4 lg-grid-cols-3">
      <FaPageMain class="m-0!">
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
      </FaPageMain>
      <FaPageMain class="m-0!">
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
      </FaPageMain>
      <FaPageMain class="m-0!">
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
      </FaPageMain>
      <FaPageMain class="m-0!">
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
      </FaPageMain>
      <FaPageMain class="m-0!">
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
      </FaPageMain>
      <FaPageMain class="m-0!">
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
      </FaPageMain>
    </div>
  </div>
</template>

<style scoped>
.swiper {
  width: 100%;
  height: 300px;

  .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-weight: 700;
    text-align: center;
    background-color: #fff;
  }
}
</style>

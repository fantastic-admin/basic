<route lang="yaml">
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
const versionType = ref('basic')
watch(versionType, (val) => {
  if (val === 'pro') {
    location.href = `${location.origin}${location.pathname}`.replace('basic-example', 'pro-example')
  }
})

const fantasticStartkitInfo = ref({
  feature: [
    '支持 TypeScript',
    '默认集成 vue-router 和 pinia',
    '支持基于文件系统的路由',
    '全局组件自动引入',
    '全局 SCSS 资源引入',
    '支持 Unocss',
    '支持 SVG 文件图标、Iconify 图标、UnoCSS 图标',
    '支持 mock 数据，可脱离后端束缚独立开发',
    '支持 gzip / brotli 优化项目体积，提高加载速度',
    '结合 IDE 插件、ESlint 、stylelint 、Git 钩子，轻松实现团队代码规范',
  ],
})

const fantasticAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://fantastic-admin.hurui.me/preview1.png',
    'https://fantastic-admin.hurui.me/preview2.png',
    'https://fantastic-admin.hurui.me/preview3.png',
    'https://fantastic-admin.hurui.me/preview4.png',
    'https://fantastic-admin.hurui.me/preview5.png',
    'https://fantastic-admin.hurui.me/preview6.png',
  ],
})

const oneStepAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://one-step-admin.hurui.me/preview1.png',
    'https://one-step-admin.hurui.me/preview2.png',
    'https://one-step-admin.hurui.me/preview3.png',
    'https://one-step-admin.hurui.me/preview4.png',
    'https://one-step-admin.hurui.me/preview5.png',
    'https://one-step-admin.hurui.me/preview6.png',
  ],
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <FaPageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          欢迎使用 Fantastic-admin
          <FaTabs
            v-model="versionType" :list="[
              { label: '基础版', value: 'basic' },
              { label: '专业版', value: 'pro' },
            ]" class="-mb-2"
          />
        </div>
      </template>
      <template #description>
        <div class="text-sm/6">
          <div>
            这是一款<b class="text-emphasis">开箱即用</b>的中后台框架，同时它也经历过数十个真实项目的技术沉淀，确保框架在开发中可落地、可使用、可维护
          </div>
          <div>
            注：在作者就职过的公司，本框架已在电商、直播、OA、ERP等多个不同领域的中后台系统中应用并稳定运行
          </div>
        </div>
      </template>
      <div class="flex gap-2">
        <FaButton variant="outline" @click="open('https://fantastic-admin.hurui.me')">
          <FaIcon name="i-ri:file-text-line" />
          开发文档
        </FaButton>
        <FaDropdown
          :items="[
            [
              { label: 'Github', icon: 'i-simple-icons:github', handle: () => open('https://github.com/fantastic-admin/basic') },
              { label: 'Gitee', icon: 'i-simple-icons:gitee', handle: () => open('https://gitee.com/fantastic-admin/basic') },
            ],
          ]"
        >
          <FaButton>
            <FaIcon name="i-ri:code-s-slash-line" />
            代码仓库
            <FaIcon name="i-ep:arrow-down" />
          </FaButton>
        </FaDropdown>
      </div>
    </FaPageHeader>
    <div class="w-full flex flex-col gap-4 px-4 xl-flex-row">
      <FaPageMain class="m-0 flex-1" title-class="flex flex-wrap items-center justify-between gap-4">
        <template #title>
          <div class="title-info">
            <img src="https://cn.vuejs.org/logo.svg">
            <div>
              <h1 class="c-[#41b883]">
                Fantastic-startkit
              </h1>
              <h2>一款简单好用的 Vue3 项目启动套件</h2>
            </div>
          </div>
          <div class="ms-auto">
            <FaButton @click="open('https://hooray.github.io/fantastic-startkit')">
              访问官网
            </FaButton>
          </div>
        </template>
        <ul class="m-0 list-disc px-8 text-sm leading-6 space-y-1">
          <li v-for="item in fantasticStartkitInfo.feature" :key="item">
            {{ item }}
          </li>
        </ul>
      </FaPageMain>
      <FaPageMain class="m-0 flex-1" title-class="flex flex-wrap items-center justify-between gap-4">
        <template #title>
          <div class="title-info">
            <img src="https://fantastic-admin.hurui.me/logo.svg">
            <div>
              <h1 class="c-[#41b883]">
                Fantastic-admin
              </h1>
              <h2>一款开箱即用的 Vue 中后台管理系统框架</h2>
            </div>
          </div>
          <div class="ms-auto">
            <FaButton @click="open('https://fantastic-admin.hurui.me')">
              访问官网
            </FaButton>
          </div>
        </template>
        <ElCarousel trigger="click" indicator-position="none" :interval="5000" height="250px">
          <ElCarouselItem v-for="(item, index) in fantasticAdminInfo.data" :key="item">
            <ElImage :src="item" fit="cover" style="width: 100%; height: 250px; margin: auto; cursor: pointer;" @click="fantasticAdminInfo.imageVisible = true; fantasticAdminInfo.index = index" />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer v-if="fantasticAdminInfo.imageVisible" :url-list="fantasticAdminInfo.data" :initial-index="fantasticAdminInfo.index" @close="fantasticAdminInfo.imageVisible = false" />
      </FaPageMain>
      <FaPageMain class="m-0 flex-1" title-class="flex flex-wrap items-center justify-between gap-4">
        <template #title>
          <div class="title-info">
            <img src="https://one-step-admin.hurui.me/logo.png">
            <div>
              <h1 class="c-[#67c23a]">
                One-step-admin
              </h1>
              <h2>一款干啥都快人一步的 Vue 中后台系统框架</h2>
            </div>
          </div>
          <div class="ms-auto">
            <FaButton @click="open('https://one-step-admin.hurui.me')">
              访问官网
            </FaButton>
          </div>
        </template>
        <ElCarousel trigger="click" indicator-position="none" :interval="5000" height="250px">
          <ElCarouselItem v-for="(item, index) in oneStepAdminInfo.data" :key="item">
            <ElImage :src="item" fit="cover" style="width: 100%; height: 250px; margin: auto; cursor: pointer;" @click="oneStepAdminInfo.imageVisible = true; oneStepAdminInfo.index = index" />
          </ElCarouselItem>
        </ElCarousel>
        <ElImageViewer v-if="oneStepAdminInfo.imageVisible" :url-list="oneStepAdminInfo.data" :initial-index="oneStepAdminInfo.index" @close="oneStepAdminInfo.imageVisible = false" />
      </FaPageMain>
    </div>
  </div>
</template>

<style scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}

.title-info {
  --uno: flex items-center gap-4;

  img {
    --uno: block w-12 h-12;
  }

  h1 {
    --uno: m-0 text-2xl;
  }

  h2 {
    --uno: m-0 text-base text-secondary-foreground/50 font-normal;
  }
}
</style>

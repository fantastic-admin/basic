<script setup lang="ts">
import logo from '@/assets/images/logo.svg'

const versionType = ref('basic')
watch(versionType, (val) => {
  if (val === 'pro') {
    location.href = `${location.origin}${location.pathname}`.replace('basic-example', 'pro-example')
  }
})

const products = ref([
  {
    id: 'startkit',
    name: 'Fantastic-startkit',
    tagline: '一款简单好用的 Vue3 项目启动套件',
    logo: 'https://cn.vuejs.org/logo.svg',
    url: 'https://hooray.github.io/fantastic-startkit',
    features: [
      '支持 TypeScript',
      '默认集成 vue-router 和 pinia',
      '支持基于文件系统的路由',
      '全局组件自动引入',
      '支持 Unocss 和 SVG 图标',
      '结合 IDE 插件、ESlint 、stylelint 、Git 钩子，轻松实现团队代码规范',
    ],
  },
  {
    id: 'admin',
    name: 'Fantastic-admin',
    tagline: '一款开箱即用的 Vue 中后台管理系统框架',
    logo: 'https://fantastic-admin.hurui.me/logo.svg',
    url: 'https://fantastic-admin.hurui.me',
    images: [
      'https://fantastic-admin.hurui.me/hero_preview.png',
    ],
  },
  {
    id: 'onestep',
    name: 'One-step-admin',
    tagline: '一款干啥都快人一步的 Vue 中后台系统框架',
    logo: 'https://one-step-admin.hurui.me/logo.png',
    url: 'https://one-step-admin.hurui.me',
    images: [
      'https://one-step-admin.hurui.me/preview1.png',
    ],
  },
])

const useCases = ref([
  { title: '小型公司', description: '让后端开发人员能在短时间内转型成为全栈开发' },
  { title: '中小型公司', description: '提高项目开发效率，减轻前端开发人员工作压力' },
  { title: '项目型公司', description: '应对绝大部分甲方需求，实现高度定制化' },
  { title: '产品型公司', description: '完善的开发文档和代码注释，为产品保驾护航' },
])

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div class="bg-background size-full absolute overflow-auto">
    <div class="mx-auto px-4 py-6 max-w-7xl md-px-8 md-py-10">
      <!-- Top Bar -->
      <div class="mb-6 flex items-center justify-between">
        <div class="flex gap-3 items-center">
          <FaIcon :name="logo" class="p-1 border rounded-lg size-10" />
          <span class="tracking-tight font-semibold">Fantastic-admin</span>
        </div>
        <FaTabs
          v-model="versionType"
          :list="[
            { label: '基础版', value: 'basic' },
            { label: '专业版', value: 'pro' },
          ]"
        />
      </div>

      <!-- Hero: Asymmetric split -->
      <div class="mb-6 gap-4 grid items-stretch md-grid-cols-[3fr_2fr]">
        <!-- Left: Title & CTA -->
        <div class="hero-enter p-6 border rounded-xl relative overflow-hidden md-p-8">
          <div class="text-xs text-muted-foreground tracking-widest font-medium mb-3 uppercase">
            TypeScript · Vue 3.6 · Vite 8 · UnoCSS
          </div>
          <h1 class="text-2xl leading-tight tracking-tight font-semibold mb-3 md-text-3xl">
            欢迎使用
            <div class="text-4xl tracking-tight font-semibold md-text-6xl">
              Fantastic-admin
            </div>
          </h1>
          <p class="text-sm text-muted-foreground leading-relaxed mb-6 max-w-prose md-text-base">
            这是一款<span class="text-foreground font-medium">开箱即用</span>的 Vue3 管理系统框架，为中后台项目开发提供完整解决方案。
          </p>
          <div class="flex flex-wrap gap-3">
            <FaButton size="lg" @click="open('https://fantastic-admin.hurui.me')">
              开发文档
            </FaButton>
            <FaDropdown
              :items="[
                [
                  { label: 'Github', icon: 'i-simple-icons:github', handle: () => open('https://github.com/fantastic-admin/basic') },
                  { label: 'Gitee', icon: 'i-simple-icons:gitee', handle: () => open('https://gitee.com/fantastic-admin/basic') },
                  { label: 'GitCode', icon: 'i-simple-icons:gitcode', handle: () => open('https://atomgit.com/fantastic-admin/basic') },
                ],
              ]"
            >
              <FaButton variant="outline" size="lg">
                代码仓库 (基础版)
                <FaIcon name="i-ep:arrow-down" class="ml-1" />
              </FaButton>
            </FaDropdown>
            <FaButton variant="outline" size="lg" @click="open('https://fantastic-admin.hurui.me/buy.html')">
              购买 (专业版)
            </FaButton>
          </div>
        </div>

        <!-- Right: Stats -->
        <div class="gap-4 grid grid-rows-2">
          <div class="stat-enter border rounded-xl bg-neutral-950/[.012] dark:bg-white/5" :style="{ animationDelay: '100ms' }">
            <div class="p-5 flex flex-col h-full justify-between">
              <div class="text-xs text-muted-foreground tracking-widest font-medium uppercase">
                稳定运行
              </div>
              <div>
                <div class="text-3xl tracking-tight font-semibold mb-1 md-text-4xl">
                  1000+
                </div>
                <div class="text-sm text-muted-foreground">
                  个项目稳定运行
                </div>
              </div>
            </div>
          </div>
          <div class="stat-enter border rounded-xl bg-neutral-950/[.012] dark:bg-white/5" :style="{ animationDelay: '200ms' }">
            <div class="p-5 flex flex-col h-full justify-between">
              <div class="text-xs text-muted-foreground tracking-widest font-medium uppercase">
                持续维护
              </div>
              <div>
                <div class="text-3xl tracking-tight font-semibold mb-1 md-text-4xl">
                  5年
                </div>
                <div class="text-sm text-muted-foreground flex flex-wrap gap-1 items-center">
                  <span>已在</span>
                  <span class="text-foreground font-semibold">电商、直播、OA、CRM、ERP</span>
                  <span>等多个领域提供技术支持</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Use Cases -->
      <div class="mb-6">
        <div class="mb-3 flex gap-2 items-center">
          <div class="rounded-full bg-primary h-4 w-0.5" />
          <h2 class="text-xs text-muted-foreground tracking-widest font-semibold uppercase">
            应用场景
          </h2>
        </div>
        <div class="gap-3 grid grid-cols-2 md-grid-cols-4">
          <div
            v-for="(useCase, i) in useCases"
            :key="useCase.title"
            class="card-enter border rounded-xl bg-neutral-950/[.012] dark:bg-white/5"
            :style="{ animationDelay: `${i * 60}ms` }"
          >
            <div class="p-5">
              <div class="text-sm font-semibold mb-2">
                {{ useCase.title }}
              </div>
              <div class="text-xs text-muted-foreground leading-relaxed">
                {{ useCase.description }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ecosystem -->
      <div>
        <div class="mb-4 flex gap-3 items-center">
          <div class="rounded-full bg-primary h-4 w-0.5" />
          <h2 class="text-xs text-muted-foreground tracking-widest font-semibold uppercase">
            生态
          </h2>
          <span class="text-xs text-muted-foreground hidden md-block">为不同场景提供完整解决方案</span>
        </div>
        <div class="gap-4 grid md-grid-cols-3">
          <div
            v-for="(product, i) in products"
            :key="product.id"
            class="group card-enter border rounded-xl bg-neutral-950/[.012] dark:bg-white/5"
            :style="{ animationDelay: `${i * 80}ms` }"
          >
            <div class="flex flex-col h-full">
              <div class="p-6 border-b flex gap-4 items-start">
                <img :src="product.logo" :alt="product.name" class="shrink-0 h-10 w-10 object-contain">
                <div>
                  <div class="text-sm tracking-tight font-semibold">
                    {{ product.name }}
                  </div>
                  <div class="text-xs text-muted-foreground leading-relaxed mt-1">
                    {{ product.tagline }}
                  </div>
                </div>
              </div>
              <div class="p-6 flex-col-start flex-1">
                <div v-if="product.features" class="mb-5 flex-1">
                  <ul class="space-y-1.5">
                    <li
                      v-for="feature in product.features"
                      :key="feature"
                      class="text-xs text-muted-foreground flex gap-2 items-start"
                    >
                      <span class="text-primary mt-0.5 shrink-0">·</span>
                      <span>{{ feature }}</span>
                    </li>
                  </ul>
                </div>
                <div v-if="product.images" class="mb-5 border rounded-lg flex-1 overflow-hidden">
                  <img
                    :src="product.images[0]"
                    :alt="product.name"
                    class="opacity-50 h-full w-full transition-opacity duration-500 object-cover group-hover-opacity-100"
                  >
                </div>
                <FaButton
                  variant="link"
                  size="sm"
                  class="mt-auto active-scale-98"
                  @click="open(product.url)"
                >
                  探索 →
                </FaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-enter {
  animation: slide-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.stat-enter {
  animation: slide-up 1.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.card-enter {
  animation: fade-up 1.4s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.active-scale-98:active {
  transform: scale(0.98);
}
</style>

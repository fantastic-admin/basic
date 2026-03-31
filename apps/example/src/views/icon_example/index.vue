<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { icons } from '@/iconify'

const { copy, isSupported } = useClipboard()

function onCopy(iconName: string) {
  if (isSupported.value) {
    copy(`<FaIcon name="i-${iconName}" />`)
    faToast.success('复制成功', {
      description: `<FaIcon name="i-${iconName}" />`,
    })
  }
}

const webImage = ref('https://picsum.photos/50')
function change() {
  webImage.value = ''
  webImage.value = `https://picsum.photos/50?random=${Math.random()}`
}

const fa = new URL('@/assets/images/logo.svg', import.meta.url).href

const active = ref(false)
</script>

<template>
  <div>
    <FaPageHeader title="FaIcon" description="FaIcon 是统一的图标组件，支持 Iconify、UnoCSS、SVG 雪碧图和图片 URL 四种图标来源" />

    <!-- Iconify -->
    <FaPageMain title="Iconify">
      <div class="gap-4 grid grid-cols-2 xl:grid-cols-3">
        <div v-for="(icon, key) in icons" :key="key" class="p-4">
          <p class="text-sm font-medium mb-3">
            {{ icon.info.name }}
          </p>
          <div class="flex flex-wrap gap-2">
            <FaTooltip v-for="(item, index) in icon.info.samples" :key="index" :text="`i-${icon.prefix}:${item}`">
              <FaButton variant="outline" size="icon" class="size-10" @click="onCopy(`${icon.prefix}:${item}`)">
                <FaIcon :name="`${icon.prefix}:${item}`" class="size-5" />
              </FaButton>
            </FaTooltip>
          </div>
        </div>
      </div>
    </FaPageMain>

    <!-- SVG Icon -->
    <FaPageMain title="SVG Icon">
      <div class="space-y-4">
        <div>
          <p class="text-sm text-muted-foreground font-medium mb-3">
            单色
          </p>
          <div class="flex gap-4">
            <div v-for="name in ['example-emotion-line', 'example-emotion-laugh-line', 'example-emotion-unhappy-line']" :key="name" class="p-3 flex flex-col gap-1.5 w-20 items-center">
              <FaIcon :name="name" class="size-10" />
              <span class="text-xs text-muted-foreground text-center w-full truncate">{{ name.replace('example-', '') }}</span>
            </div>
          </div>
        </div>
        <div>
          <p class="text-sm text-muted-foreground font-medium mb-3">
            彩色
          </p>
          <div class="flex gap-4">
            <div v-for="name in ['example-crown', 'example-star', 'example-vip']" :key="name" class="p-3 flex flex-col gap-1.5 w-20 items-center">
              <FaIcon :name="name" class="size-10" />
              <span class="text-xs text-muted-foreground text-center w-full truncate">{{ name.replace('example-', '') }}</span>
            </div>
          </div>
        </div>
      </div>
    </FaPageMain>

    <!-- Image Icon -->
    <FaPageMain title="Image Icon">
      <div class="flex gap-6">
        <div class="p-4 flex flex-col gap-3 items-center">
          <span class="text-xs text-muted-foreground font-medium">网络图片</span>
          <FaIcon :name="webImage" class="size-12" />
          <div class="flex gap-2">
            <FaButton size="sm" @click="change">
              更换图片
            </FaButton>
            <FaButton size="sm" variant="outline" @click="webImage = 'https://xxx/'">
              触发错误
            </FaButton>
          </div>
        </div>
        <div class="p-4 flex flex-col gap-3 items-center">
          <span class="text-xs text-muted-foreground font-medium">本地图片</span>
          <FaIcon :name="fa" class="size-12" />
        </div>
      </div>
    </FaPageMain>

    <!-- Icon Transition -->
    <FaPageMain title="Icon Transition">
      <div class="flex gap-6 items-end">
        <div class="px-6 py-4 flex flex-col gap-3 items-center">
          <span class="text-xs text-muted-foreground font-medium">无动画</span>
          <FaIcon :name="active ? 'i-lucide:heart' : 'i-lucide:star'" class="size-8" />
        </div>
        <div class="px-6 py-4 flex flex-col gap-3 items-center">
          <span class="text-xs text-muted-foreground font-medium">开启动画</span>
          <FaIcon :name="active ? 'i-lucide:heart' : 'i-lucide:star'" class="size-8" transition />
        </div>
        <FaButton @click="active = !active">
          切换图标
        </FaButton>
      </div>
    </FaPageMain>
  </div>
</template>

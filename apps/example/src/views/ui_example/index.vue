<script setup lang="ts">
interface PreviewItem {
  id: string
  name: string
  accent: string
  src: string
}

const previewItems = [
  {
    id: 'ant-design-vue',
    name: 'Ant Design Vue',
    accent: 'oklch(0.55 0.19 253)',
    src: new URL('./previews/ant-design-vue.png', import.meta.url).href,
  },
  {
    id: 'antdv-next',
    name: 'Antdv Next',
    accent: 'oklch(0.61 0.17 302)',
    src: new URL('./previews/antdv-next.png', import.meta.url).href,
  },
  {
    id: 'arco-design-vue',
    name: 'Arco Design Vue',
    accent: 'oklch(0.59 0.2 221)',
    src: new URL('./previews/arco-design-vue.png', import.meta.url).href,
  },
  {
    id: 'element-plus',
    name: 'Element Plus',
    accent: 'oklch(0.62 0.18 258)',
    src: new URL('./previews/element-plus.png', import.meta.url).href,
  },
  {
    id: 'naive-ui',
    name: 'Naive UI',
    accent: 'oklch(0.63 0.17 143)',
    src: new URL('./previews/naive-ui.png', import.meta.url).href,
  },
  {
    id: 'tdesign',
    name: 'TDesign',
    accent: 'oklch(0.64 0.18 24)',
    src: new URL('./previews/tdesign.png', import.meta.url).href,
  },
  {
    id: 'vexip-ui',
    name: 'Vexip UI',
    accent: 'oklch(0.65 0.16 83)',
    src: new URL('./previews/vexip-ui.png', import.meta.url).href,
  },
] satisfies PreviewItem[]

const previewSources = computed(() => previewItems.map(item => item.src))
const guideUrl = 'https://fantastic-admin.hurui.me/guide/with-ui-libraries.html'
const { open: openImagePreview } = useFaImagePreview()

function openPreview(index: number) {
  openImagePreview(previewSources.value, index)
}

function openGuide() {
  window.open(guideUrl, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <main class="ui-showcase text-foreground flex flex-col h-full min-h-full overflow-hidden">
    <FaPageHeader
      title="三方 UI 组件库"
      description="Fantastic-admin 提供了多套内置三方 UI 组件库的预设模版，开箱即用。"
      class="mb-0 shrink-0"
    >
      <FaButton variant="outline" @click="openGuide">
        <FaIcon name="i-lucide:book-open" />
        了解更多
      </FaButton>
    </FaPageHeader>

    <section class="p-[clamp(16px,3vw,28px)] flex-1 min-h-0 overflow-auto" aria-label="UI library previews">
      <div class="gap-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]">
        <button
          v-for="(item, index) in previewItems"
          :key="item.id"
          type="button"
          class="preview-card group text-inherit p-3 text-left border border-[var(--showcase-line)] rounded-[8px] bg-background transition-[border-color,background-color,transform] duration-180 ease-in-out [font:inherit] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          :style="{ '--accent-line': item.accent }"
          :aria-label="`预览 ${item.name}`"
          @click="openPreview(index)"
        >
          <span class="rounded-[6px] bg-muted aspect-[2504/1346] block overflow-hidden">
            <img :src="item.src" :alt="item.name" class="size-full block transition-transform duration-260 ease-in-out object-cover group-focus-visible:scale-[1.012] group-hover:scale-[1.012]">
          </span>
          <span class="mt-3 flex gap-3 min-w-0 items-center justify-between">
            <span class="text-[0.92rem] font-[620] min-w-0 whitespace-nowrap text-ellipsis overflow-hidden">{{ item.name }}</span>
            <FaIcon name="i-lucide:maximize-2" class="text-muted-foreground shrink-0 size-4" />
          </span>
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.ui-showcase {
  --showcase-line: color-mix(in oklch, oklch(var(--border)) 82%, transparent);
}

.preview-card:hover,
.preview-card:focus-visible {
  background: color-mix(in oklch, var(--accent-line) 7%, oklch(var(--background)));
  border-color: color-mix(in oklch, var(--accent-line) 62%, oklch(var(--border)));
  transform: translateY(-2px);
}

@media (prefers-reduced-motion: reduce) {
  .preview-card,
  .preview-card img {
    transition: none;
  }

  .preview-card:hover,
  .preview-card:focus-visible,
  .preview-card:hover img,
  .preview-card:focus-visible img {
    transform: none;
  }
}
</style>

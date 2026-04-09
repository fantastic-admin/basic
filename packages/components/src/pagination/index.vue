<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
} from './pagination'

defineOptions({
  name: 'FaPagination',
})

const props = withDefaults(defineProps<{
  total: number
  sizes?: number[]
  layout?: string
}>(), {
  sizes: () => [10, 20, 30, 40, 50, 100],
  layout: 'total, sizes, ->, pager, jumper',
})

const emits = defineEmits<{
  pageChange: [page: number]
  sizeChange: [size: number]
}>()

const page = defineModel<number>('page', { required: true })
const size = defineModel<number>('size', { required: true })

const jumpPage = ref<number | string>(page.value)
const totalPages = computed(() => Math.ceil(props.total / size.value))

// Parse layout string to determine order and visibility
const layoutConfig = computed(() => {
  const items = props.layout.split(',').map(item => item.trim())
  const config: Record<string, { show: boolean, order: number }> = {
    'pager': { show: false, order: 0 },
    'total': { show: false, order: 0 },
    'sizes': { show: false, order: 0 },
    'jumper': { show: false, order: 0 },
    '->': { show: false, order: 0 },
  }

  items.forEach((item, index) => {
    if (config[item] !== undefined) {
      config[item] = { show: true, order: index + 1 }
    }
  })

  return config
})

// Sync jumpPage with page model and emit pageChange event
watch(page, (newPage) => {
  jumpPage.value = newPage
  emits('pageChange', newPage)
})

// Emit sizeChange event when size changes
watch(size, (newSize) => {
  emits('sizeChange', newSize)
})

function handleFocus(event: Event) {
  const input = event.target as HTMLInputElement
  input.select()
}

function handleInput(event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '') // Remove non-digit characters
  jumpPage.value = value
}

function handleJump() {
  const pageNum = Number(jumpPage.value)
  if (pageNum && Number.isInteger(pageNum) && pageNum >= 1 && pageNum <= totalPages.value) {
    page.value = pageNum
  }
  else if (pageNum > totalPages.value) {
    jumpPage.value = totalPages.value
  }
  else {
    jumpPage.value = page.value
  }
}
</script>

<template>
  <Pagination v-slot="{ page: currentPage }" :total="props.total" :sibling-count="1" show-edges :page="page" class="gap-4 items-center" :items-per-page="size" @update:page="(val) => page = val">
    <PaginationContent v-if="layoutConfig.pager.show" v-slot="{ items }" class="flex-center gap-1" :style="{ order: layoutConfig.pager.order }">
      <PaginationFirst size="icon-sm" class="size-8 rtl:rotate-180" />
      <PaginationPrevious size="icon-sm" class="size-8 rtl:rotate-180" />
      <template v-for="(item, index) in items" :key="index">
        <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === currentPage" size="icon-sm" class="size-8">
          {{ item.value }}
        </PaginationItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>
      <PaginationNext size="icon-sm" class="size-8 rtl:rotate-180" />
      <PaginationLast size="icon-sm" class="size-8 rtl:rotate-180" />
    </PaginationContent>
    <div v-if="layoutConfig.total.show" class="text-sm text-muted-foreground" :style="{ order: layoutConfig.total.order }">
      共 {{ props.total }} 条
    </div>
    <div v-if="layoutConfig.sizes.show" :style="{ order: layoutConfig.sizes.order }">
      <FaSelect v-model="size" :options="props.sizes.map(size => ({ label: `${size} 条/页`, value: size }))" class="w-auto" />
    </div>
    <div v-if="layoutConfig.jumper.show" class="flex-center gap-2" :style="{ order: layoutConfig.jumper.order }">
      <span class="text-sm text-muted-foreground">前往</span>
      <FaInput v-model="jumpPage" class="h-8 w-16" input-class="text-center" @focus="handleFocus" @input="handleInput" @keyup.enter="handleJump" />
      <span class="text-sm text-muted-foreground">页</span>
    </div>
    <div v-if="layoutConfig['->'].show" class="flex-1" :style="{ order: layoutConfig['->'].order }" />
  </Pagination>
</template>

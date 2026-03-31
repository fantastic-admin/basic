<script setup lang="ts">
import isBetween from 'dayjs/plugin/isBetween'
import dayjs from '@/utils/dayjs'

const isShow = ref(false)

onMounted(() => {
  dayjs.extend(isBetween)
  if (dayjs().isBetween('2025-09-17', '2025-10-17')) {
    isShow.value = true
  }
})

function handleOpen() {
  window.open('https://fantastic-admin.hurui.me/buy-5yr.html', '_blank')
}
</script>

<template>
  <div v-if="isShow" class="text-sm text-gray-100 font-medium flex-center gap-3 h-12 relative from-slate-800 to-gray-900 bg-gradient-to-r">
    <span class="text-lg font-bold">✨ 五周年庆，全年最低价 ✨</span>
    <button class="text-xs text-white font-semibold px-4 py-1 rounded-full bg-blue-600 transition-colors duration-200 hover:bg-blue-500" @click="handleOpen">
      查看详情 →
    </button>
    <button class="text-gray-400 p-1 bg-transparent flex-center transition-colors duration-200 right-3 top-1/2 absolute hover:text-gray-200 -translate-y-1/2" @click="isShow = false">
      <FaIcon name="i-ep:close" />
    </button>
  </div>
</template>

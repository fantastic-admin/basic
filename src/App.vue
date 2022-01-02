<template>
    <el-config-provider :size="settingsStore.elementSize">
        <RouterView
            :style="{
                '--g-main-sidebar-actual-width': mainSidebarActualWidth,
                '--g-sub-sidebar-actual-width': subSidebarActualWidth
            }"
        />
    </el-config-provider>
</template>

<script setup>
import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
    let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width')
    actualWidth = parseInt(actualWidth)
    if (['head', 'single'].includes(settingsStore.menuMode)) {
        actualWidth = 0
    }
    return `${actualWidth}px`
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
    let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width')
    actualWidth = parseInt(actualWidth)
    if (settingsStore.sidebarCollapse) {
        actualWidth = 64
    }
    return `${actualWidth}px`
})

watch(() => settingsStore.mode, () => {
    if (settingsStore.mode === 'pc') {
        settingsStore.updateThemeSetting({
            'sidebarCollapse': settingsStore.sidebarCollapseLastStatus
        })
    } else if (settingsStore.mode === 'mobile') {
        settingsStore.updateThemeSetting({
            'sidebarCollapse': true
        })
    }
    document.body.setAttribute('data-mode', settingsStore.mode)
}, {
    immediate: true
})

watch(() => settingsStore.menuMode, () => {
    document.body.setAttribute('data-menu-mode', settingsStore.menuMode)
}, {
    immediate: true
})

watch([
    () => settingsStore.enableDynamicTitle,
    () => settingsStore.title
], () => {
    if (settingsStore.enableDynamicTitle && settingsStore.title) {
        let title = settingsStore.title
        document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
    } else {
        document.title = import.meta.env.VITE_APP_TITLE
    }
}, {
    immediate: true
})

onMounted(() => {
    window.onresize = () => {
        settingsStore.setMode(document.documentElement.clientWidth)
    }
    window.onresize()
})
</script>

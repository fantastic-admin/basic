<template>
    <el-config-provider :size="settingsStore.app.elementSize">
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
    if (['head', 'single'].includes(settingsStore.menu.menuMode)) {
        actualWidth = 0
    }
    return `${actualWidth}px`
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
    let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width')
    actualWidth = parseInt(actualWidth)
    if (settingsStore.menu.subMenuCollapse) {
        actualWidth = 64
    }
    return `${actualWidth}px`
})

watch(() => settingsStore.mode, () => {
    if (settingsStore.mode === 'pc') {
        settingsStore.$patch(state => {
            state.menu.subMenuCollapse = settingsStore.subMenuCollapseLastStatus
        })
    } else if (settingsStore.mode === 'mobile') {
        settingsStore.$patch(state => {
            state.menu.subMenuCollapse = true
        })
    }
    document.body.setAttribute('data-mode', settingsStore.mode)
}, {
    immediate: true
})

watch(() => settingsStore.menu.menuMode, () => {
    document.body.setAttribute('data-menu-mode', settingsStore.menu.menuMode)
}, {
    immediate: true
})

watch([
    () => settingsStore.app.enableDynamicTitle,
    () => settingsStore.title
], () => {
    if (settingsStore.app.enableDynamicTitle && settingsStore.title) {
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

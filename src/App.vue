<template>
    <RouterView
        :style="{
            '--g-main-sidebar-actual-width': mainSidebarActualWidth,
            '--g-sub-sidebar-actual-width': subSidebarActualWidth
        }"
    />
</template>

<script setup>
const store = useStore()

// 侧边栏主导航当前实际宽度
const mainSidebarActualWidth = computed(() => {
    let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-main-sidebar-width')
    actualWidth = parseInt(actualWidth)
    if (['head', 'single'].includes(store.state.settings.menuMode)) {
        actualWidth = 0
    }
    return `${actualWidth}px`
})

// 侧边栏次导航当前实际宽度
const subSidebarActualWidth = computed(() => {
    let actualWidth = getComputedStyle(document.documentElement).getPropertyValue('--g-sub-sidebar-width')
    actualWidth = parseInt(actualWidth)
    if (store.state.settings.sidebarCollapse) {
        actualWidth = 64
    }
    return `${actualWidth}px`
})

watch(() => store.state.settings.mode, () => {
    if (store.state.settings.mode === 'pc') {
        store.commit('settings/updateThemeSetting', {
            'sidebarCollapse': store.state.settings.sidebarCollapseLastStatus
        })
    } else if (store.state.settings.mode === 'mobile') {
        store.commit('settings/updateThemeSetting', {
            'sidebarCollapse': true
        })
    }
    document.body.setAttribute('data-mode', store.state.settings.mode)
}, {
    immediate: true
})

watch(() => store.state.settings.menuMode, () => {
    document.body.setAttribute('data-menu-mode', store.state.settings.menuMode)
}, {
    immediate: true
})

watch([
    () => store.state.settings.enableDynamicTitle,
    () => store.state.settings.title
], () => {
    if (store.state.settings.enableDynamicTitle && store.state.settings.title) {
        let title = store.state.settings.title
        document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
    } else {
        document.title = import.meta.env.VITE_APP_TITLE
    }
}, {
    immediate: true
})

onMounted(() => {
    window.onresize = () => {
        store.commit('settings/setMode', document.documentElement.clientWidth)
    }
    window.onresize()
})
</script>

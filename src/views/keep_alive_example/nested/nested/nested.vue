<template>
    <div>
        <page-main>
            <div>层级：1-1</div>
            <router-view v-slot="{ Component }">
                <keep-alive :include="$store.state.keepAlive.list">
                    <component :is="Component" />
                </keep-alive>
            </router-view>
        </page-main>
    </div>
</template>

<script>
export default {
    name: 'TabExampleNested2'
}
</script>

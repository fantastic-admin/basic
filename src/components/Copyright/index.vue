<template>
    <footer class="copyright">
        Copyright © {{ settingsStore.copyrightDates }}
        <a v-if="settingsStore.copyrightWebsite" :href="settingsStore.copyrightWebsite" target="_blank" rel="noopener">{{ settingsStore.copyrightCompany }},</a>
        <span v-else>{{ settingsStore.copyrightCompany }},</span>
        All Rights Reserved
    </footer>
</template>

<script setup>
import { useSettingsStore } from '@/store/modules/settings'
const settingsStore = useSettingsStore()
</script>

<style lang="scss" scoped>
footer {
    margin: 40px 0 20px;
    line-height: 20px;
    text-align: center;
    color: #808695;
    font-size: 14px;
    a {
        text-decoration: none;
        color: #808695;
        &:hover {
            color: #3d4047;
        }
    }
}
</style>

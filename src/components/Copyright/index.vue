<template>
    <footer class="copyright">
        Copyright © {{ $store.state.settings.copyrightDates }}
        <a v-if="$store.state.settings.copyrightWebsite" :href="$store.state.settings.copyrightWebsite" target="_blank" rel="noopener">{{ $store.state.settings.copyrightCompany }},</a>
        <span v-else>{{ $store.state.settings.copyrightCompany }},</span>
        All Rights Reserved
    </footer>
</template>

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

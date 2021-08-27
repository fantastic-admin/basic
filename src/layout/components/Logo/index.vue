<template>
    <router-link :to="to" :class="{
        'title': true,
        'is-link': $store.state.settings.enableDashboard
    }" :title="title"
    >
        <img v-if="showLogo" :src="logo" class="logo">
        <span v-if="showTitle">{{ title }}</span>
    </router-link>
</template>

<script>
import imgLogo from '@/assets/images/logo.png'

export default {
    name: 'Logo',
    props: {
        showLogo: {
            type: Boolean,
            default: true
        },
        showTitle: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            title: import.meta.env.VITE_APP_TITLE,
            logo: imgLogo
        }
    },
    computed: {
        to() {
            let rtn = {}
            if (this.$store.state.settings.enableDashboard) {
                rtn.name = 'dashboard'
            }
            return rtn
        }
    }
}
</script>

<style lang="scss" scoped>
.title {
    position: fixed;
    z-index: 1000;
    top: 0;
    width: inherit;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: $g-sidebar-logo-height;
    text-align: center;
    overflow: hidden;
    text-decoration: none;
    &.is-link {
        cursor: pointer;
    }
    .logo {
        width: 30px;
        height: 30px;
        & + span {
            margin-left: 10px;
        }
    }
    span {
        display: block;
        font-weight: bold;
        color: #fff;
        @include text-overflow;
    }
}
</style>

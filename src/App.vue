<template>
    <RouterView />
</template>

<script>
export default {
    data() {
        return {}
    },
    watch: {
        '$store.state.settings.mode': {
            handler() {
                if (this.$store.state.settings.mode === 'pc') {
                    this.$store.commit('settings/updateThemeSetting', {
                        'sidebarCollapse': this.$store.state.settings.sidebarCollapseLastStatus
                    })
                } else if (this.$store.state.settings.mode === 'mobile') {
                    this.$store.commit('settings/updateThemeSetting', {
                        'sidebarCollapse': true
                    })
                }
                document.body.setAttribute('data-mode', this.$store.state.settings.mode)
            },
            immediate: true
        },
        '$store.state.settings.menuMode': {
            handler() {
                this.setMenuMode()
            },
            immediate: true
        },
        '$store.state.settings.sidebarCollapse': {
            handler() {
                this.setMenuMode()
            },
            immediate: true
        },
        '$store.state.settings.enableDynamicTitle': {
            handler() {
                this.setDocumentTitle()
            },
            immediate: true
        },
        '$store.state.settings.title': {
            handler() {
                this.setDocumentTitle()
            },
            immediate: true
        }
    },
    mounted() {
        window.onresize = () => {
            this.$store.commit('settings/setMode', document.documentElement.clientWidth)
        }
        window.onresize()
    },
    methods: {
        setDocumentTitle() {
            if (this.$store.state.settings.enableDynamicTitle && this.$store.state.settings.title) {
                let title = this.$store.state.settings.title
                document.title = `${title} - ${import.meta.env.VITE_APP_TITLE}`
            } else {
                document.title = import.meta.env.VITE_APP_TITLE
            }
        },
        setMenuMode() {
            document.body.removeAttribute('data-sidebar-no-collapse')
            document.body.removeAttribute('data-sidebar-collapse')
            if (['side', 'head', 'single'].includes(this.$store.state.settings.menuMode)) {
                if (this.$store.state.settings.sidebarCollapse) {
                    document.body.setAttribute('data-sidebar-collapse', '')
                } else {
                    document.body.setAttribute('data-sidebar-no-collapse', '')
                }
            }
            document.body.setAttribute('data-menu-mode', this.$store.state.settings.menuMode)
        }
    }
}
</script>

<template>
    <div id="app">
        <RouterView v-if="isRouterAlive" />
    </div>
</template>

<script>
export default {
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true
        }
    },
    watch: {
        $route: 'routeChange',
        '$store.state.keepAlive.list'(val) {
            process.env.NODE_ENV == 'development' && console.log(`[ keepAliveList ] ${val}`)
        },
        '$store.state.settings.mode': {
            handler() {
                if (this.$store.state.settings.mode == 'pc') {
                    if (this.$store.state.settings.enableSidebarCollapse) {
                        this.$store.commit('settings/updateThemeSetting', {
                            'sidebarCollapse': false
                        })
                    }
                }
                if (this.$store.state.settings.mode == 'mobile') {
                    this.$store.commit('settings/updateThemeSetting', {
                        'sidebarCollapse': true
                    })
                }
                document.body.setAttribute('data-mode', this.$store.state.settings.mode)
            },
            immediate: true
        }
    },
    mounted() {
        window.onresize = () => {
            this.$store.commit('settings/setMode', document.body.clientWidth)
        }
        window.onresize()
    },
    methods: {
        reload(type = 1) {
            if (type == 1) {
                this.isRouterAlive = false
                this.$nextTick(() => (this.isRouterAlive = true))
            } else {
                this.$router.push({
                    name: 'reload'
                })
            }
        },
        routeChange(newVal, oldVal) {
            if (newVal.name == oldVal.name) {
                this.reload()
            }
        }
    },
    metaInfo() {
        return {
            title: this.$store.state.settings.enableDynamicTitle && this.$store.state.settings.title,
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
        }
    }
}
</script>

<style scoped>
#app {
    height: 100%;
}
</style>

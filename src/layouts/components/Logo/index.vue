<script lang="ts" setup name="Logo">
import imgLogo from '@/assets/images/logo.png'
import useSettingsStore from '@/store/modules/settings'

defineProps({
  showLogo: {
    type: Boolean,
    default: true,
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
})

const settingsStore = useSettingsStore()

const title = ref(import.meta.env.VITE_APP_TITLE)
const logo = ref(imgLogo)

const to = computed(() => {
  const rtn: {
    name?: string
  } = {}
  if (settingsStore.settings.home.enable) {
    rtn.name = 'home'
  }
  return rtn
})
</script>

<template>
  <router-link :to="to" class="title" :class="{ 'is-link': settingsStore.settings.home.enable }" :title="title">
    <img v-if="showLogo" :src="logo" class="logo">
    <span v-if="showTitle">{{ title }}</span>
  </router-link>
</template>

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
  height: var(--g-sidebar-logo-height);
  text-align: center;
  overflow: hidden;
  text-decoration: none;

  &.is-link {
    cursor: pointer;
  }

  .logo {
    width: 30px;
    height: 30px;
    object-fit: contain;

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

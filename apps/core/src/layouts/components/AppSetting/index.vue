<script setup lang="ts">
import { diffTwoObj, setSettings } from '@fantastic-admin/settings'
import { useClipboard } from '@vueuse/core'
import eventBus from '@/utils/eventBus'

defineOptions({
  name: 'AppSetting',
})

const route = useRoute()

const appSettingsStore = useAppSettingsStore()
const settingsDefault = setSettings({})
const appMenuStore = useAppMenuStore()

const isShow = ref(false)

const themeRadius = computed<number[]>({
  get() {
    return [appSettingsStore.settings.theme.radius]
  },
  set(value) {
    appSettingsStore.settings.theme.radius = value[0]
  },
})

watch(() => appSettingsStore.settings.menu.mode, (value) => {
  if (value === 'single') {
    appMenuStore.setActived(0)
  }
  else {
    appMenuStore.setActived(route.fullPath)
  }
})
onMounted(() => {
  eventBus.on('global-app-setting-toggle', () => {
    isShow.value = !isShow.value
  })
})

const { copy, copied, isSupported } = useClipboard()

function handleCopy() {
  copy(JSON.stringify(diffTwoObj(settingsDefault, appSettingsStore.settings), null, 2))
}
</script>

<template>
  <FaModal v-model="isShow" title="应用配置" description="在生产环境中应关闭该模块" :footer="isSupported" :destroy-on-close="false" class="sm:max-w-4xl" content-class="bg-[var(--g-main-area-bg)] transition-background-color">
    <div
      :class="{
        'columns-1': appSettingsStore.mode === 'mobile',
        'columns-2': appSettingsStore.mode === 'pc',
      }"
    >
      <FaPageMain title="主题" class="m-0 mb-4 break-inside-avoid light:border-none" title-class="font-bold" main-class="space-y-4">
        <div class="setting-item">
          <div class="label">
            颜色方案
          </div>
          <FaButtonGroup>
            <FaButton
              v-for="(item, index) in [
                { icon: 'i-ri:sun-line', value: 'light' },
                { icon: 'i-ri:moon-line', value: 'dark' },
                { icon: 'i-codicon:color-mode', value: '' },
              ]" :key="index" :variant="appSettingsStore.settings.theme.colorScheme === item.value ? 'default' : 'outline'" size="sm" :class="{ 'z-1': appSettingsStore.settings.theme.colorScheme === item.value }" @click="appSettingsStore.settings.theme.colorScheme = (item.value as any)"
            >
              <FaIcon :name="item.icon" />
            </FaButton>
          </FaButtonGroup>
        </div>
        <div class="setting-item">
          <div class="label">
            圆角
          </div>
          <FaSlider v-model="themeRadius" :min="0" :max="1" :step="0.25" class="w-1/2" />
        </div>
        <div class="setting-item">
          <div class="label">
            色弱模式
          </div>
          <FaSwitch v-model="appSettingsStore.settings.theme.colorAmblyopia" />
        </div>
      </FaPageMain>
      <FaPageMain v-if="appSettingsStore.mode === 'pc'" title="导航菜单" class="m-0 mb-4 break-inside-avoid light:border-none" title-class="font-bold" main-class="space-y-4">
        <div class="menu-mode">
          <FaTooltip text="侧边栏模式 (有主导航菜单)" :delay="500">
            <FaButton variant="outline" class="mode mode-side" :class="{ active: appSettingsStore.settings.menu.mode === 'side' }" @click="appSettingsStore.settings.menu.mode = 'side'">
              <div class="mode-container" />
            </FaButton>
          </FaTooltip>
          <FaTooltip text="顶部模式" :delay="500">
            <FaButton variant="outline" class="mode mode-head" :class="{ active: appSettingsStore.settings.menu.mode === 'head' }" @click="appSettingsStore.settings.menu.mode = 'head'">
              <div class="mode-container" />
            </FaButton>
          </FaTooltip>
          <FaTooltip text="侧边栏模式 (无主导航菜单)" :delay="500">
            <FaButton variant="outline" class="mode mode-single" :class="{ active: appSettingsStore.settings.menu.mode === 'single' }" @click="appSettingsStore.settings.menu.mode = 'single'">
              <div class="mode-container" />
            </FaButton>
          </FaTooltip>
        </div>
        <div class="setting-item">
          <div class="label" :class="{ 'op-50': !['single', 'side', 'head'].includes(appSettingsStore.settings.menu.mode) }">
            点击主导航菜单
            <FaTooltip text="智能模式下默认执行切换操作，当次导航菜单只有一个可访问的导航菜单时执行跳转操作">
              <FaIcon name="i-ri:question-line" class="text-base text-orange cursor-help" />
            </FaTooltip>
          </div>
          <FaButtonGroup>
            <FaButton
              v-for="(item, index) in [
                { label: '切换', value: 'switch' },
                { label: '跳转', value: 'jump' },
                { label: '智能', value: 'smart' },
              ]" :key="index" :variant="appSettingsStore.settings.menu.mainMenuClickMode === item.value ? 'default' : 'outline'" size="sm" :disabled="!['single', 'side', 'head'].includes(appSettingsStore.settings.menu.mode)" :class="{ 'z-1': appSettingsStore.settings.menu.mainMenuClickMode === item.value }" @click="appSettingsStore.settings.menu.mainMenuClickMode = (item.value as any)"
            >
              {{ item.label }}
            </FaButton>
          </FaButtonGroup>
        </div>
        <div class="setting-item">
          <div class="label">
            次导航菜单唯一展开
          </div>
          <FaSwitch v-model="appSettingsStore.settings.menu.subMenuUniqueExpand" />
        </div>
        <div class="setting-item">
          <div class="label">
            次导航菜单收起
          </div>
          <FaSwitch v-model="appSettingsStore.settings.menu.subMenuCollapse" />
        </div>
        <div v-if="appSettingsStore.mode === 'pc'" class="setting-item">
          <div class="label">
            次导航菜单展开/收起按钮
          </div>
          <FaSwitch v-model="appSettingsStore.settings.menu.subMenuCollapseButton" />
        </div>
        <div class="setting-item">
          <div class="label" :class="{ 'op-50': appSettingsStore.settings.menu.mode === 'single' }">
            快捷键
          </div>
          <FaSwitch v-model="appSettingsStore.settings.menu.hotkeys" :disabled="appSettingsStore.settings.menu.mode === 'single'" />
        </div>
      </FaPageMain>
      <FaPageMain title="顶栏" class="m-0 mb-4 break-inside-avoid light:border-none" title-class="font-bold" main-class="space-y-4">
        <div class="setting-item">
          <div class="label">
            标签栏
          </div>
          <FaSwitch v-model="appSettingsStore.settings.topbar.tabbar" />
        </div>
        <div class="setting-item">
          <div class="label">
            工具栏
          </div>
          <FaSwitch v-model="appSettingsStore.settings.topbar.toolbar" />
        </div>
        <div class="setting-item">
          <div class="label">
            模式
          </div>
          <FaButtonGroup>
            <FaButton
              v-for="(item, index) in [
                { label: '静态', value: 'static' },
                { label: '固定', value: 'fixed' },
                { label: '粘性', value: 'sticky' },
              ]" :key="index" :variant="appSettingsStore.settings.topbar.mode === item.value ? 'default' : 'outline'" size="sm" :class="{ 'z-1': appSettingsStore.settings.topbar.mode === item.value }" :disabled="!appSettingsStore.settings.topbar.tabbar && !appSettingsStore.settings.topbar.toolbar" @click="appSettingsStore.settings.topbar.mode = (item.value as any)"
            >
              {{ item.label }}
            </FaButton>
          </FaButtonGroup>
        </div>
      </FaPageMain>
      <FaPageMain title="标签栏" class="m-0 mb-4 break-inside-avoid light:border-none" title-class="font-bold" main-class="space-y-4">
        <div class="setting-item">
          <div class="label">
            显示图标
          </div>
          <FaSwitch v-model="appSettingsStore.settings.tabbar.icon" />
        </div>
        <div class="setting-item">
          <div class="label">
            快捷键
          </div>
          <FaSwitch v-model="appSettingsStore.settings.tabbar.hotkeys" />
        </div>
      </FaPageMain>
      <FaPageMain title="工具栏" class="m-0 mb-4 break-inside-avoid light:border-none" title-class="font-bold" main-class="space-y-4">
        <div v-if="appSettingsStore.mode === 'pc'" class="setting-item">
          <div class="label">
            <FaIcon name="i-ic:twotone-double-arrow" />
            面包屑导航
          </div>
          <FaSwitch v-model="appSettingsStore.settings.toolbar.breadcrumb" />
        </div>
        <div class="setting-item">
          <div class="label">
            <FaIcon name="i-ri:search-line" />
            导航搜索
          </div>
          <FaSwitch v-model="appSettingsStore.settings.toolbar.menuSearch.enable" />
        </div>
        <div class="ps-8 space-y-4">
          <div class="setting-item">
            <div class="label" :class="{ 'op-50': !appSettingsStore.settings.toolbar.menuSearch.enable }">
              快捷键
            </div>
            <FaSwitch v-model="appSettingsStore.settings.toolbar.menuSearch.hotkeys" :disabled="!appSettingsStore.settings.toolbar.menuSearch.enable" />
          </div>
        </div>
        <div v-if="appSettingsStore.mode === 'pc'" class="setting-item">
          <div class="label">
            <FaIcon name="i-ri:fullscreen-line" />
            全屏
          </div>
          <FaSwitch v-model="appSettingsStore.settings.toolbar.fullscreen" />
        </div>
        <div class="setting-item">
          <div class="label">
            <FaIcon name="i-iconoir:refresh-double" />
            页面刷新
            <FaTooltip text="重新载入当前页面，并且不刷新浏览器">
              <FaIcon name="i-ri:question-line" class="text-base text-orange cursor-help" />
            </FaTooltip>
          </div>
          <FaSwitch v-model="appSettingsStore.settings.toolbar.pageReload" />
        </div>
        <div class="setting-item">
          <div class="label">
            <FaIcon name="i-ri:sun-line" />
            颜色主题
          </div>
          <FaSwitch v-model="appSettingsStore.settings.toolbar.colorScheme" />
        </div>
      </FaPageMain>
      <FaPageMain title="页面" class="m-0 mb-4 break-inside-avoid light:border-none" title-class="font-bold" main-class="space-y-4">
        <div class="setting-item">
          <div class="label">
            载入进度条
            <FaTooltip text="路由跳转时会在页面顶部显示进度条，该进度仅为模拟效果，并非真实加载进度">
              <FaIcon name="i-ri:question-line" class="text-base text-orange cursor-help" />
            </FaTooltip>
          </div>
          <FaSwitch v-model="appSettingsStore.settings.page.progress" />
        </div>
      </FaPageMain>
      <FaPageMain title="应用" class="m-0 mb-4 break-inside-avoid light:border-none" title-class="font-bold" main-class="space-y-4">
        <div class="p-4 pb-4 pt-14 border rounded-lg relative space-y-4">
          <div class="font-bold px-4 py-2 border-b border-e rounded-rb-lg inset-s-0 inset-t-0 absolute">
            账号
          </div>
          <div class="setting-item">
            <div class="label">
              权限验证
            </div>
            <FaSwitch v-model="appSettingsStore.settings.app.account.auth" />
          </div>
        </div>
        <div class="setting-item">
          <div class="label">
            动态标题
            <FaTooltip text="开启时页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置">
              <FaIcon name="i-ri:question-line" class="text-base text-orange cursor-help" />
            </FaTooltip>
          </div>
          <FaSwitch v-model="appSettingsStore.settings.app.dynamicTitle" />
        </div>
        <div class="setting-item">
          <div class="label">
            哀悼模式
            <FaTooltip text="网站整体变灰色">
              <FaIcon name="i-ri:question-line" class="text-base text-orange cursor-help" />
            </FaTooltip>
          </div>
          <FaSwitch v-model="appSettingsStore.settings.app.rip" />
        </div>
        <div class="setting-item">
          <div class="label">
            移动端访问
            <FaTooltip text="关闭后，将禁用移动端访问">
              <FaIcon name="i-ri:question-line" class="text-base text-orange cursor-help" />
            </FaTooltip>
          </div>
          <FaSwitch v-model="appSettingsStore.settings.app.mobile" />
        </div>
        <div class="p-4 pb-4 pt-14 border rounded-lg relative space-y-4">
          <div class="font-bold px-4 py-2 border-b border-e rounded-rb-lg inset-s-0 inset-t-0 absolute">
            主页
          </div>
          <div class="setting-item">
            <div class="label">
              启用
              <FaTooltip text="登录后默认进入主页，否则默认进入第一个导航页面">
                <FaIcon name="i-ri:question-line" class="text-base text-orange cursor-help" />
              </FaTooltip>
            </div>
            <FaSwitch v-model="appSettingsStore.settings.app.home.enable" />
          </div>
          <div class="setting-item">
            <div class="label">
              标题
              <FaTooltip text="用于设置首页显示标题，支持直接输入简体中文内容">
                <FaIcon name="i-ri:question-line" class="text-base text-orange cursor-help" />
              </FaTooltip>
            </div>
            <FaInput v-model="appSettingsStore.settings.app.home.title" />
          </div>
        </div>
        <div class="p-4 pb-4 pt-14 border rounded-lg relative space-y-4">
          <div class="font-bold px-4 py-2 border-b border-e rounded-rb-lg inset-s-0 inset-t-0 absolute">
            版权
          </div>
          <div class="setting-item">
            <div class="label">
              启用
            </div>
            <FaSwitch v-model="appSettingsStore.settings.app.copyright.enable" />
          </div>
          <div class="setting-item">
            <div class="label">
              日期
            </div>
            <FaInput v-model="appSettingsStore.settings.app.copyright.dates" :disabled="!appSettingsStore.settings.app.copyright.enable" />
          </div>
          <div class="setting-item">
            <div class="label">
              公司
            </div>
            <FaInput v-model="appSettingsStore.settings.app.copyright.company" :disabled="!appSettingsStore.settings.app.copyright.enable" />
          </div>
          <div class="setting-item">
            <div class="label">
              网站
            </div>
            <FaInput v-model="appSettingsStore.settings.app.copyright.website" :disabled="!appSettingsStore.settings.app.copyright.enable" />
          </div>
        </div>
      </FaPageMain>
    </div>
    <template #footer>
      <div class="w-full">
        <div class="text-sm/6 c-rose mb-2 px-4 py-2 text-center rounded-lg bg-rose/20">
          在此处调整配置只是临时生效，要想真正应用于项目，请点击「复制配置」按钮，并粘贴到
          <code class="text-sm font-mono font-semibold px-[0.3rem] py-[0.2rem] rounded bg-muted relative">src/settings.ts</code>
          文件中。
        </div>
        <FaButton class="w-full" @click="handleCopy">
          <FaIcon :name="copied ? 'i-tabler:clipboard-check' : 'i-tabler:clipboard'" class="size-5" />
          复制配置
        </FaButton>
      </div>
    </template>
  </FaModal>
</template>

<style scoped>
.menu-mode {
  --uno: flex items-center justify-center gap-4;

  .mode {
    --uno: relative w-16 h-12;

    &.active {
      --uno: ring-primary ring-2;
    }

    &::before,
    &::after,
    .mode-container {
      --uno: absolute pointer-events-none;
    }

    &::before {
      --uno: content-empty bg-primary;
    }

    &::after {
      --uno: content-empty bg-primary/60;
    }

    .mode-container {
      --uno: bg-primary/20 border-width-1.5 border-dashed border-primary;

      &::before {
        --uno: content-empty absolute w-full h-full;
      }
    }

    &-side {
      &::before {
        --uno: top-2 bottom-2 start-2 w-2 rounded-ss-1 rounded-es-1;
      }

      &::after {
        --uno: top-2 bottom-2 start-4.5 w-3;
      }

      .mode-container {
        --uno: inset-t-2 inset-e-2 inset-b-2 inset-s-8 rounded-se-1 rounded-ee-1;
      }
    }

    &-head {
      &::before {
        --uno: top-2 start-2 end-2 h-2 rounded-ss-1 rounded-se-1;
      }

      &::after {
        --uno: top-4.5 start-2 bottom-2 w-3 rounded-es-1;
      }

      .mode-container {
        --uno: inset-t-4.5 inset-e-2 inset-b-2 inset-s-5.5 rounded-ee-1;
      }
    }

    &-single {
      &::after {
        --uno: top-2 start-2 bottom-2 w-3 rounded-ss-1 rounded-es-1;
      }

      .mode-container {
        --uno: inset-t-2 inset-e-2 inset-b-2 inset-s-5.5 rounded-se-1 rounded-ee-1;
      }
    }
  }
}

.setting-item {
  --uno: flex items-center justify-between gap-4;

  .label {
    --uno: flex items-center flex-shrink-0 gap-2 text-sm;
  }
}
</style>

<script setup lang="ts">
import settingsDefault from '@/settings.default'
import useMenuStore from '@/store/modules/menu'
import useSettingsStore from '@/store/modules/settings'
import eventBus from '@/utils/eventBus'
import { useClipboard } from '@vueuse/core'
import Message from 'vue-m-message'

defineOptions({
  name: 'AppSetting',
})

const route = useRoute()

const settingsStore = useSettingsStore()
const menuStore = useMenuStore()

const isShow = ref(false)

watch(() => settingsStore.settings.menu.mode, (value) => {
  if (value === 'single') {
    menuStore.setActived(0)
  }
  else {
    menuStore.setActived(route.fullPath)
  }
})

onMounted(() => {
  eventBus.on('global-app-setting-toggle', () => {
    isShow.value = !isShow.value
  })
})

const { copy, copied, isSupported } = useClipboard()

watch(copied, (val) => {
  if (val) {
    Message.success('复制成功，请粘贴到 src/settings.ts 文件中！', {
      zIndex: 2000,
    })
  }
})

function isObject(value: any) {
  return typeof value === 'object' && !Array.isArray(value)
}
// 比较两个对象，并提取出不同的部分
function getObjectDiff(originalObj: Record<string, any>, diffObj: Record<string, any>) {
  if (!isObject(originalObj) || !isObject(diffObj)) {
    return diffObj
  }
  const diff: Record<string, any> = {}
  for (const key in diffObj) {
    const originalValue = originalObj[key]
    const diffValue = diffObj[key]
    if (JSON.stringify(originalValue) !== JSON.stringify(diffValue)) {
      if (isObject(originalValue) && isObject(diffValue)) {
        const nestedDiff = getObjectDiff(originalValue, diffValue)
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff
        }
      }
      else {
        diff[key] = diffValue
      }
    }
  }
  return diff
}

function handleCopy() {
  copy(JSON.stringify(getObjectDiff(settingsDefault, settingsStore.settings), null, 2))
}
</script>

<template>
  <HSlideover v-model="isShow" title="应用配置">
    <div class="rounded-2 bg-rose/20 px-4 py-2 text-sm/6 c-rose">
      <p class="my-1">
        应用配置可实时预览效果，但只是临时生效，要想真正应用于项目，可以点击下方的「复制配置」按钮，并将配置粘贴到 src/settings.ts 文件中。
      </p>
      <p class="my-1">
        注意：在生产环境中应关闭该模块。
      </p>
    </div>
    <div class="divider">
      颜色主题风格
    </div>
    <div class="flex items-center justify-center pb-4">
      <HTabList
        v-model="settingsStore.settings.app.colorScheme"
        :options="[
          { icon: 'i-ri:sun-line', label: '明亮', value: 'light' },
          { icon: 'i-ri:moon-line', label: '暗黑', value: 'dark' },
          { icon: 'i-codicon:color-mode', label: '系统', value: '' },
        ]"
        class="w-60"
      />
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="divider">
      导航栏模式
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="menu-mode">
      <HTooltip text="侧边栏模式 (含主导航)" placement="bottom" :delay="500">
        <div class="mode mode-side" :class="{ active: settingsStore.settings.menu.mode === 'side' }" @click="settingsStore.settings.menu.mode = 'side'">
          <div class="mode-container" />
        </div>
      </HTooltip>
      <HTooltip text="顶部模式" placement="bottom" :delay="500">
        <div class="mode mode-head" :class="{ active: settingsStore.settings.menu.mode === 'head' }" @click="settingsStore.settings.menu.mode = 'head'">
          <div class="mode-container" />
        </div>
      </HTooltip>
      <HTooltip text="侧边栏模式 (不含主导航)" placement="bottom" :delay="500">
        <div class="mode mode-single" :class="{ active: settingsStore.settings.menu.mode === 'single' }" @click="settingsStore.settings.menu.mode = 'single'">
          <div class="mode-container" />
        </div>
      </HTooltip>
    </div>
    <div class="divider">
      导航栏
    </div>
    <div class="setting-item">
      <div class="label">
        主导航切换跳转
        <HTooltip text="开启该功能后，切换主导航时，页面自动跳转至该主导航下，次导航里第一个导航">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.menu.switchMainMenuAndPageJump" :disabled="['single'].includes(settingsStore.settings.menu.mode)" />
    </div>
    <div class="setting-item">
      <div class="label">
        次导航保持展开一个
        <HTooltip text="开启该功能后，次导航只保持单个菜单的展开">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.menu.subMenuUniqueOpened" />
    </div>
    <div class="setting-item">
      <div class="label">
        次导航是否折叠
      </div>
      <HToggle v-model="settingsStore.settings.menu.subMenuCollapse" />
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        显示次导航折叠按钮
      </div>
      <HToggle v-model="settingsStore.settings.menu.enableSubMenuCollapseButton" />
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
      </div>
      <HToggle v-model="settingsStore.settings.menu.enableHotkeys" :disabled="['single'].includes(settingsStore.settings.menu.mode)" />
    </div>
    <div class="divider">
      顶栏
    </div>
    <div class="setting-item">
      <div class="label">
        模式
      </div>
      <HCheckList
        v-model="settingsStore.settings.topbar.mode" :options="[
          { label: '静止', value: 'static' },
          { label: '固定', value: 'fixed' },
          { label: '粘性', value: 'sticky' },
        ]"
      />
    </div>
    <div>
      <div class="divider">
        标签栏
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用
        </div>
        <HToggle v-model="settingsStore.settings.tabbar.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          是否显示图标
        </div>
        <HToggle v-model="settingsStore.settings.tabbar.enableIcon" :disabled="!settingsStore.settings.tabbar.enable" />
      </div>
      <div class="setting-item">
        <div class="label">
          是否启用快捷键
        </div>
        <HToggle v-model="settingsStore.settings.tabbar.enableHotkeys" :disabled="!settingsStore.settings.tabbar.enable" />
      </div>
    </div>
    <div class="divider">
      工具栏
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        面包屑导航
      </div>
      <HToggle v-model="settingsStore.settings.toolbar.breadcrumb" />
    </div>
    <div class="setting-item">
      <div class="label">
        导航搜索
        <HTooltip text="对导航进行快捷搜索">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.toolbar.navSearch" />
    </div>
    <div v-if="settingsStore.mode === 'pc'" class="setting-item">
      <div class="label">
        全屏
      </div>
      <HToggle v-model="settingsStore.settings.toolbar.fullscreen" />
    </div>
    <div class="setting-item">
      <div class="label">
        页面刷新
        <HTooltip text="使用框架内提供的刷新功能进行页面刷新">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.toolbar.pageReload" />
    </div>
    <div class="setting-item">
      <div class="label">
        颜色主题
        <HTooltip text="开启后可在明亮/暗黑模式中切换">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.toolbar.colorScheme" />
    </div>
    <div class="divider">
      页面
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
      </div>
      <HToggle v-model="settingsStore.settings.mainPage.enableHotkeys" />
    </div>
    <div class="divider">
      导航搜索
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用快捷键
      </div>
      <HToggle v-model="settingsStore.settings.navSearch.enableHotkeys" :disabled="!settingsStore.settings.toolbar.navSearch" />
    </div>
    <div class="divider">
      底部版权
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用
      </div>
      <HToggle v-model="settingsStore.settings.copyright.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        日期
      </div>
      <HInput v-model="settingsStore.settings.copyright.dates" :disabled="!settingsStore.settings.copyright.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        公司
      </div>
      <HInput v-model="settingsStore.settings.copyright.company" :disabled="!settingsStore.settings.copyright.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        网址
      </div>
      <HInput v-model="settingsStore.settings.copyright.website" :disabled="!settingsStore.settings.copyright.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        备案
      </div>
      <HInput v-model="settingsStore.settings.copyright.beian" :disabled="!settingsStore.settings.copyright.enable" />
    </div>
    <div class="divider">
      主页
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用
        <HTooltip text="该功能开启时，登录成功默认进入主页，反之则默认进入导航栏里第一个导航页面">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.home.enable" />
    </div>
    <div class="setting-item">
      <div class="label">
        主页名称
        <HTooltip text="开启国际化时，该设置无效">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HInput v-model="settingsStore.settings.home.title" />
    </div>
    <div class="divider">
      其它
    </div>
    <div class="setting-item">
      <div class="label">
        是否启用权限
      </div>
      <HToggle v-model="settingsStore.settings.app.enablePermission" />
    </div>
    <div class="setting-item">
      <div class="label">
        载入进度条
        <HTooltip text="该功能开启时，跳转路由会看到页面顶部有进度条">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.app.enableProgress" />
    </div>
    <div class="setting-item">
      <div class="label">
        哀悼模式
        <HTooltip text="该功能开启时，整站会变为灰色">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.app.enableMournMode" />
    </div>
    <div class="setting-item">
      <div class="label">
        色弱模式
      </div>
      <HToggle v-model="settingsStore.settings.app.enableColorAmblyopiaMode" />
    </div>
    <div class="setting-item">
      <div class="label">
        动态标题
        <HTooltip text="该功能开启时，页面标题会显示当前路由标题，格式为“页面标题 - 网站名称”；关闭时则显示网站名称，网站名称在项目根目录下 .env.* 文件里配置">
          <SvgIcon name="i-ri:question-line" />
        </HTooltip>
      </div>
      <HToggle v-model="settingsStore.settings.app.enableDynamicTitle" />
    </div>
    <template v-if="isSupported" #footer>
      <HButton block @click="handleCopy">
        <SvgIcon name="i-ep:document-copy" />
        复制配置
      </HButton>
    </template>
  </HSlideover>
</template>

<style scoped>
.divider {
  --uno: flex items-center justify-between gap-4 my-4 whitespace-nowrap text-sm font-500;

  &::before,
  &::after {
    --uno: content-empty w-full h-1px bg-stone-2 dark-bg-stone-6;
  }
}

.menu-mode {
  --uno: flex items-center justify-center gap-4 pb-4;

  .mode {
    --uno: relative w-16 h-12 rounded-2 ring-1 ring-stone-2 dark-ring-stone-7 cursor-pointer transition;

    &.active {
      --uno: ring-ui-primary ring-2;
    }

    &::before,
    &::after,
    .mode-container {
      --uno: absolute pointer-events-none;
    }

    &::before {
      --uno: content-empty bg-ui-primary;
    }

    &::after {
      --uno: content-empty bg-ui-primary/60;
    }

    .mode-container {
      --uno: bg-ui-primary/20 border-width-1.5 border-dashed border-ui-primary;

      &::before {
        --uno: content-empty absolute w-full h-full;
      }
    }

    &-side {
      &::before {
        --uno: top-2 bottom-2 left-2 w-2 rounded-tl-1 rounded-bl-1;
      }

      &::after {
        --uno: top-2 bottom-2 left-4.5 w-3;
      }

      .mode-container {
        --uno: inset-t-2 inset-r-2 inset-b-2 inset-l-8 rounded-tr-1 rounded-br-1;
      }
    }

    &-head {
      &::before {
        --uno: top-2 left-2 right-2 h-2 rounded-tl-1 rounded-tr-1;
      }

      &::after {
        --uno: top-4.5 left-2 bottom-2 w-3 rounded-bl-1;
      }

      .mode-container {
        --uno: inset-t-4.5 inset-r-2 inset-b-2 inset-l-5.5 rounded-br-1;
      }
    }

    &-single {
      &::after {
        --uno: top-2 left-2 bottom-2 w-3 rounded-tl-1 rounded-bl-1;
      }

      .mode-container {
        --uno: inset-t-2 inset-r-2 inset-b-2 inset-l-5.5 rounded-tr-1 rounded-br-1;
      }
    }
  }
}

.setting-item {
  --uno: flex items-center justify-between gap-4 px-4 py-2 rounded-2 transition hover-bg-stone-1 dark-hover-bg-stone-9;

  .label {
    --uno: flex items-center flex-shrink-0 gap-2 text-sm;

    i {
      --uno: text-xl text-orange cursor-help;
    }
  }
}
</style>

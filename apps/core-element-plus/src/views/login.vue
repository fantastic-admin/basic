<script setup lang="ts">
import { diffTwoObj } from '@fantastic-admin/settings'
import Login from '@/components/AppAccountForm/login.vue'
import Register from '@/components/AppAccountForm/register.vue'
import ResetPassword from '@/components/AppAccountForm/reset-password.vue'
import ColorScheme from '@/layouts/components/Topbar/Toolbar/ColorScheme/index.vue'
import settingsDefault from '@/settings'

defineOptions({
  name: 'Login',
})

const route = useRoute()
const router = useRouter()
const appSettingsStore = useAppSettingsStore()

const redirect = ref(route.query.redirect?.toString() ?? appSettingsStore.settings.app.home.fullPath)

// 布局对齐方式
const layoutAlign = ref<'left' | 'center' | 'right'>('center')
// 表单相关
const account = ref<string>()
const formType = ref<'login' | 'register' | 'resetPassword'>('login')

function handleLogin() {
  const data = diffTwoObj(settingsDefault, appSettingsStore.settings)
  router.push(redirect.value).then(() => {
    if (Object.keys(data).length > 0) {
      appSettingsStore.updateSettings(data)
    }
  })
}
</script>

<template>
  <div class="bg-banner" />
  <div class="text-base p-1 border rounded-lg bg-background flex-center right-4 top-4 absolute z-1">
    <FaDropdown
      v-if="appSettingsStore.mode === 'pc'"
      :items="[[
        { label: '左侧布局', disabled: layoutAlign === 'left', handle: () => { layoutAlign = 'left' } },
        { label: '居中布局', disabled: layoutAlign === 'center', handle: () => { layoutAlign = 'center' } },
        { label: '右侧布局', disabled: layoutAlign === 'right', handle: () => { layoutAlign = 'right' } },
      ]]"
    >
      <FaButton variant="ghost" size="icon-sm">
        <FaIcon
          :name="{
            left: 'i-icon-park-outline:left-bar',
            center: 'i-icon-park-outline:square',
            right: 'i-icon-park-outline:right-bar',
          }[layoutAlign]" class="size-4"
        />
      </FaButton>
    </FaDropdown>
    <ColorScheme v-if="appSettingsStore.settings.toolbar.colorScheme" />
  </div>
  <div class="login-box" :class="layoutAlign">
    <div class="login-banner">
      <img src="@/assets/images/logo.svg" class="rounded h-8 inset-s-4 inset-t-4 absolute">
      <img src="@/assets/images/login-banner.png" class="banner">
      <AppCopyright v-if="appSettingsStore.mode === 'pc' && ['left', 'right'].includes(layoutAlign)" class="w-full bottom-0 absolute" />
    </div>
    <div class="login-form flex-col-center">
      <div class="w-full">
        <Login
          v-if="formType === 'login'"
          :account
          @on-login="handleLogin"
          @on-register="(val) => { formType = 'register'; account = val }"
          @on-reset-password="(val) => { formType = 'resetPassword'; account = val }"
        />
        <Register
          v-else-if="formType === 'register'"
          :account
          @on-register="(val) => { formType = 'login'; account = val }"
          @on-login="formType = 'login'"
        />
        <ResetPassword
          v-else
          :account
          @on-reset-password="(val) => { formType = 'login'; account = val }"
          @on-login="formType = 'login'"
        />
      </div>
    </div>
  </div>
  <AppCopyright v-if="appSettingsStore.mode === 'mobile' || layoutAlign === 'center'" class="copyright" />
</template>

<style scoped>
.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(closest-side, oklch(var(--border) / 10%) 30%, oklch(var(--primary) / 20%) 30%, oklch(var(--border) / 30%) 50%) no-repeat,
    radial-gradient(closest-side, oklch(var(--border) / 10%) 30%, oklch(var(--primary) / 20%) 30%, oklch(var(--border) / 30%) 50%) no-repeat;
  background-position: 100% 100%, 0% 0%;
  background-size: 200vw 200vh;
  filter: blur(100px);
}

[data-mode="mobile"] {
  .login-box {
    position: relative;
    flex-direction: column;
    justify-content: start;
    width: 100%;

    .login-banner {
      width: 100%;
      padding: 20px 0;

      .banner {
        position: relative;
        top: inherit;
        right: inherit;
        display: inherit;
        width: 100%;
        max-width: 375px;
        margin: 0 auto;
        transform: translateY(0);
      }
    }

    .login-form {
      width: 100%;
    }
  }

  .copyright {
    position: relative;
  }
}

.login-box {
  position: absolute;
  display: flex;
  overflow: hidden;
  background-color: oklch(var(--background));

  [data-mode="pc"] & {
    &.center {
      --uno: shadow-md rounded-md;

      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    &.left,
    &.right {
      width: 100%;
      height: 100%;

      .login-banner {
        flex: 1;

        .banner {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50%;
          height: 50%;
          object-fit: contain;
          transform: translateX(-50%) translateY(-50%);
        }
      }

      .login-form {
        margin: 0 5vw;
      }
    }

    &.left {
      flex-direction: row-reverse;
    }
  }

  .login-banner {
    --uno: bg-muted dark:bg-muted/30;

    position: relative;
    width: 450px;
    overflow: hidden;

    &::before {
      position: absolute;
      width: 100%;
      height: 100%;
      content: "";
      background:
        radial-gradient(closest-side, oklch(var(--border) / 10%) 30%, oklch(var(--primary) / 20%) 30%, oklch(var(--border) / 30%) 50%) no-repeat,
        radial-gradient(closest-side, oklch(var(--border) / 10%) 30%, oklch(var(--primary) / 20%) 30%, oklch(var(--border) / 30%) 50%) no-repeat;
      background-position: 100% 100%, 0% 0%;
      background-size: 200vw 200vh;
      filter: blur(100px);
    }

    .banner {
      position: absolute;
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
    }
  }

  .login-form {
    width: 500px;
    transition: height 0.15s ease;
  }
}

.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  margin: 0;
}
</style>

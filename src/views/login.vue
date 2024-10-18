<route lang="yaml">
meta:
  title: 登录
  constant: true
  layout: false
</route>

<script setup lang="ts">
import Copyright from '@/layouts/components/Copyright/index.vue'
import useSettingsStore from '@/store/modules/settings'

defineOptions({
  name: 'Login',
})

const route = useRoute()
const router = useRouter()
const settingsStore = useSettingsStore()

const redirect = ref(route.query.redirect?.toString() ?? settingsStore.settings.home.fullPath)
const account = ref<string>()
// 表单类型
const formType = ref<'login' | 'register' | 'resetPassword'>('login')
</script>

<template>
  <div class="bg-banner" />
  <div class="login-box">
    <div class="login-banner">
      <img src="@/assets/images/logo.png" class="absolute left-4 top-4 h-30px rounded ring ring-stone-2 dark-ring-stone-8">
      <img src="@/assets/images/login-banner.png" class="banner">
    </div>
    <div class="login-form flex-col-center">
      <Transition name="fade" mode="out-in">
        <LoginForm
          v-if="formType === 'login'"
          :account
          @on-login="router.push(redirect)"
          @on-register="(account) => { formType = 'register'; account = account }"
          @on-reset-password="(account) => { formType = 'resetPassword'; account = account }"
        />
        <RegisterForm
          v-else-if="formType === 'register'"
          :account
          @on-register="(account) => { formType = 'login'; account = account }"
          @on-login="formType = 'login'"
        />
        <ResetPasswordForm
          v-else-if="formType === 'resetPassword'"
          :account
          @on-reset-password="(account) => { formType = 'login'; account = account }"
          @on-login="formType = 'login'"
        />
      </Transition>
    </div>
  </div>
  <Copyright />
</template>

<style scoped>
.bg-banner {
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, var(--g-container-bg), var(--g-bg));
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
  background-color: var(--g-container-bg);

  [data-mode="pc"] & {
    top: 50%;
    left: 50%;
    border-radius: 10px;
    box-shadow: var(--el-box-shadow);
    transform: translateX(-50%) translateY(-50%);
  }

  .login-banner {
    position: relative;
    width: 450px;
    overflow: hidden;
    background-color: var(--g-bg);

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

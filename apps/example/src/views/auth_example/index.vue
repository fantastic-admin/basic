<script setup lang="ts">
defineOptions({
  name: 'PermissionExample',
})

const router = useRouter()

const appSettingsStore = useAppSettingsStore()
const appAccountStore = useAppAccountStore()

const { auth, authAll } = useAppAuth()

async function accountSwitch(val: any) {
  await appAccountStore.login({
    account: val,
    password: '',
  })
  location.reload()
}
function goTest() {
  router.push({
    name: 'authExampleTest',
  })
}
function permissionCheck(permissions: string | string[]) {
  if (auth(permissions)) {
    faToast.success('校验通过', {
      position: 'top-center',
    })
  }
  else {
    faToast.error('校验不通过', {
      position: 'top-center',
    })
  }
}
function permissionCheck2(permissions: string[]) {
  if (authAll(permissions)) {
    faToast.success('校验通过', {
      position: 'top-center',
    })
  }
  else {
    faToast.error('校验不通过', {
      position: 'top-center',
    })
  }
}

function permissionText(type: 'have' | 'or' | 'and', permissions: {
  permission?: string
  permission1?: string
  permission2?: string
}) {
  switch (type) {
    case 'have':
      return `校验 '${permissions.permission}' 权限`
    case 'or':
      return `校验 '${permissions.permission1}' 或 '${permissions.permission2}' 权限`
    case 'and':
      return `校验 '${permissions.permission1}' 和 '${permissions.permission2}' 权限`
  }
}
</script>

<template>
  <div>
    <FaPageHeader title="权限验证" />
    <FaPageMain v-if="!appSettingsStore.settings.app.account.auth">
      请到 settings.ts 里设置并开启权限功能，再进入该页面查看演示
    </FaPageMain>
    <FaPageMain v-else title="切换账号" main-class="space-y-2">
      <FaButtonGroup separator>
        <FaButton
          v-for="(item, index) in [
            { label: 'admin', value: 'admin' },
            { label: 'test', value: 'test' },
            { label: 'hooray', value: 'hooray' },
          ]" :key="index" :variant="appAccountStore.account === item.value ? 'default' : 'outline'" @click="accountSwitch(item.value)"
        >
          {{ item.label }}
        </FaButton>
      </FaButtonGroup>
      <div>当前账号权限</div>
      <div>{{ appAccountStore.permissions }}</div>
    </FaPageMain>
    <FaPageMain v-if="appSettingsStore.settings.app.account.auth" title="路由鉴权">
      <FaButton @click="goTest">
        跳转测试页面
      </FaButton>
    </FaPageMain>
    <FaPageMain v-if="appSettingsStore.settings.app.account.auth" title="鉴权指令" main-class="space-y-2">
      <div class="flex-center-start gap-2">
        <div>{{ permissionText('have', { permission: 'pages.general:browse' }) }}</div>
        <div v-auth="'pages.general:browse'">
          ✅
        </div>
      </div>
      <div class="flex-center-start gap-2">
        <div>{{ permissionText('have', { permission: 'pages.form:browse' }) }}</div>
        <div v-auth="'pages.form:browse'">
          ✅
        </div>
      </div>
      <div class="flex-center-start gap-2">
        <div>{{ permissionText('or', { permission1: 'pages.general:browse', permission2: 'pages.form:browse' }) }}</div>
        <div v-auth="['pages.general:browse', 'pages.form:browse']">
          ✅
        </div>
      </div>
      <div class="flex-center-start gap-2">
        <div>{{ permissionText('and', { permission1: 'pages.general:browse', permission2: 'pages.form:browse' }) }}</div>
        <div v-auth.all="['pages.general:browse', 'pages.form:browse']">
          ✅
        </div>
      </div>
    </FaPageMain>
    <FaPageMain v-if="appSettingsStore.settings.app.account.auth" title="鉴权组件" main-class="space-y-2">
      <div class="flex-center-start gap-2">
        <div>{{ permissionText('have', { permission: 'pages.general:browse' }) }}</div>
        <AppAuth value="pages.general:browse">
          ✅
          <template #no-auth>
            ❌
          </template>
        </AppAuth>
      </div>
      <div class="flex-center-start gap-2">
        <div>{{ permissionText('have', { permission: 'pages.form:browse' }) }}</div>
        <AppAuth value="pages.form:browse">
          ✅
          <template #no-auth>
            ❌
          </template>
        </AppAuth>
      </div>
      <div class="flex-center-start gap-2">
        <div>{{ permissionText('or', { permission1: 'pages.general:browse', permission2: 'pages.form:browse' }) }}</div>
        <AppAuth :value="['pages.general:browse', 'pages.form:browse']">
          ✅
          <template #no-auth>
            ❌
          </template>
        </AppAuth>
      </div>
      <div class="flex-center-start gap-2">
        <div>{{ permissionText('and', { permission1: 'pages.general:browse', permission2: 'pages.form:browse' }) }}</div>
        <AppAuth :value="['pages.general:browse', 'pages.form:browse']" all>
          ✅
          <template #no-auth>
            ❌
          </template>
        </AppAuth>
      </div>
    </FaPageMain>
    <FaPageMain v-if="appSettingsStore.settings.app.account.auth" title="鉴权函数" main-class="flex-col-start gap-2">
      <FaButton variant="outline" @click="permissionCheck('pages.general:browse')">
        {{ permissionText('have', { permission: 'pages.general:browse' }) }}
      </FaButton>
      <FaButton variant="outline" @click="permissionCheck('pages.form:browse')">
        {{ permissionText('have', { permission: 'pages.form:browse' }) }}
      </FaButton>
      <FaButton variant="outline" @click="permissionCheck(['pages.general:browse', 'pages.form:browse'])">
        {{ permissionText('or', { permission1: 'pages.general:browse', permission2: 'pages.form:browse' }) }}
      </FaButton>
      <FaButton variant="outline" @click="permissionCheck2(['pages.general:browse', 'pages.form:browse'])">
        {{ permissionText('and', { permission1: 'pages.general:browse', permission2: 'pages.form:browse' }) }}
      </FaButton>
    </FaPageMain>
  </div>
</template>

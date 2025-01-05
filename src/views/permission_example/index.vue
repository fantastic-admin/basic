<route lang="yaml">
meta:
  title: 权限验证
</route>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'
import { toast } from 'vue-sonner'

defineOptions({
  name: 'PermissionExample',
})

const router = useRouter()

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const { auth, authAll } = useAuth()

// 模拟账号切换
async function accountChange(val: any) {
  await userStore.login({
    account: val,
    password: '',
  })
  location.reload()
}
function goTest() {
  router.push({
    name: 'permissionExampleTest',
  })
}
function permissionCheck(permissions: string | string[]) {
  if (auth(permissions)) {
    toast.success('校验通过', {
      position: 'top-center',
    })
  }
  else {
    toast.error('校验不通过', {
      position: 'top-center',
    })
  }
}
function permissionCheck2(permissions: string[]) {
  if (authAll(permissions)) {
    toast.success('校验通过', {
      position: 'top-center',
    })
  }
  else {
    toast.error('校验不通过', {
      position: 'top-center',
    })
  }
}
</script>

<template>
  <div>
    <FaPageHeader title="权限验证" />
    <FaPageMain v-if="!settingsStore.settings.app.enablePermission">
      请到 settings.ts 里设置并开启权限功能，再进入该页面查看演示
    </FaPageMain>
    <FaPageMain v-else title="切换账号">
      <div class="space-y-2">
        <div class="space-x-2">
          <FaButton
            v-for="(item, index) in [
              { label: 'admin', value: 'admin' },
              { label: 'test', value: 'test' },
              { label: 'hooray(无权限)', value: 'hooray' },
            ]" :key="index" :variant="userStore.account === item.value ? 'default' : 'outline'" @click="accountChange(item.value)"
          >
            {{ item.label }}
          </FaButton>
        </div>
        <div>当前账号权限：{{ userStore.permissions }}</div>
      </div>
    </FaPageMain>
    <FaPageMain v-if="settingsStore.settings.app.enablePermission" title="路由鉴权">
      <FaButton @click="goTest">
        跳转页面
      </FaButton>
    </FaPageMain>
    <FaPageMain v-if="settingsStore.settings.app.enablePermission" title="鉴权指令">
      <div class="flex-col-start space-y-2">
        <div v-auth="'permission.browse'">
          如果你有 permission.browse 权限则能看到这句话
        </div>
        <div v-auth="'permission.create'">
          如果你有 permission.create 权限则能看到这句话
        </div>
        <div v-auth="['permission.browse', 'permission.create']">
          如果你有 permission.browse 或 permission.create 权限则能看到这句话
        </div>
        <div v-auth.all="['permission.browse', 'permission.create']">
          如果你有 permission.browse 和 permission.create 权限则能看到这句话
        </div>
      </div>
    </FaPageMain>
    <FaPageMain v-if="settingsStore.settings.app.enablePermission" title="鉴权组件">
      <div class="text-sm space-y-2">
        <div>
          你
          <FaAuth value="permission.browse">
            <FaKbd>有</FaKbd>
            <template #no-auth>
              <FaKbd>没有</FaKbd>
            </template>
          </FaAuth>
          permission.browse 权限
        </div>
        <div>
          你
          <FaAuth value="permission.create">
            <FaKbd>有</FaKbd>
            <template #no-auth>
              <FaKbd>没有</FaKbd>
            </template>
          </FaAuth>
          permission.create 权限
        </div>
        <div>
          你
          <FaAuth :value="['permission.browse', 'permission.create']">
            <FaKbd>有</FaKbd>
            <template #no-auth>
              <FaKbd>没有</FaKbd>
            </template>
          </FaAuth>
          permission.browse 或 permission.create 权限
        </div>
        <div>
          你
          <FaAuth :value="['permission.browse', 'permission.create']" all>
            <FaKbd>有</FaKbd>
            <template #no-auth>
              <FaKbd>没有</FaKbd>
            </template>
          </FaAuth>
          permission.browse 和 permission.create 权限
        </div>
      </div>
    </FaPageMain>
    <FaPageMain v-if="settingsStore.settings.app.enablePermission" title="鉴权函数">
      <div class="space-y-2">
        <div class="space-x-2">
          <FaButton variant="outline" @click="permissionCheck('permission.browse')">
            校验 permission.browse 权限
          </FaButton>
          <FaButton variant="outline" @click="permissionCheck('permission.create')">
            校验 permission.create 权限
          </FaButton>
        </div>
        <div class="space-x-2">
          <FaButton variant="outline" @click="permissionCheck(['permission.browse', 'permission.create'])">
            校验 permission.browse 或 permission.create 权限
          </FaButton>
          <FaButton variant="outline" @click="permissionCheck2(['permission.browse', 'permission.create'])">
            校验 permission.browse 和 permission.create 权限
          </FaButton>
        </div>
      </div>
    </FaPageMain>
  </div>
</template>

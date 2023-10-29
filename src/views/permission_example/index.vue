<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

const router = useRouter()

const settingsStore = useSettingsStore()
const userStore = useUserStore()

const { auth, authAll } = useAuth()
const mainPage = useMainPage()

// 模拟账号切换
async function accountChange(val: any) {
  await userStore.login({
    account: val,
    password: '',
  })
  await userStore.getPermissions()
  mainPage.reload()
}
function goTest() {
  router.push({
    name: 'permissionExampleTest',
  })
}
function permissionCheck(permissions: string | string[]) {
  if (auth(permissions)) {
    ElMessage.success('校验通过')
  }
  else {
    ElMessage.error('校验不通过')
  }
}
function permissionCheck2(permissions: string[]) {
  if (authAll(permissions)) {
    ElMessage.success('校验通过')
  }
  else {
    ElMessage.error('校验不通过')
  }
}
</script>

<template>
  <div>
    <PageHeader title="权限验证" />
    <PageMain>
      <div v-if="!settingsStore.settings.app.enablePermission">
        请到 seeting.js 里打开权限功能，再进入该页面查看演示
      </div>
      <div v-else>
        <h3>切换帐号</h3>
        <ElRadioGroup v-model="userStore.account" @change="accountChange">
          <ElRadioButton label="admin" />
          <ElRadioButton label="test" />
          <ElRadioButton label="hooray">
            hooray(无权限)
          </ElRadioButton>
        </ElRadioGroup>
        <h3>帐号权限</h3>
        <div>{{ userStore.permissions }}</div>
        <h3>访问鉴权页面</h3>
        <div>
          <ElButton @click="goTest">
            点击访问
          </ElButton>
        </div>
        <h3>鉴权组件（请对照代码查看）</h3>
        <div>
          <Auth value="permission.browse" style="margin-bottom: 10px;">
            <ElTag>你有 permission.browse 权限</ElTag>
            <template #no-auth>
              <ElTag type="danger">
                你没有 permission.browse 权限
              </ElTag>
            </template>
          </Auth>
          <Auth value="permission.create" style="margin-bottom: 10px;">
            <ElTag>你有 permission.create 权限</ElTag>
            <template #no-auth>
              <ElTag type="danger">
                你没有 permission.create 权限
              </ElTag>
            </template>
          </Auth>
          <Auth :value="['permission.browse', 'permission.create']" style="margin-bottom: 10px;">
            <ElTag>你有 permission.browse 或 permission.create 权限</ElTag>
            <template #no-auth>
              <ElTag type="danger">
                你没有 permission.browse 或 permission.create 权限
              </ElTag>
            </template>
          </Auth>
          <AuthAll :value="['permission.browse', 'permission.create']">
            <ElTag>你有 permission.browse 和 permission.create 权限</ElTag>
            <template #no-auth>
              <ElTag type="danger">
                你没有 permission.browse 和 permission.create 权限
              </ElTag>
            </template>
          </AuthAll>
        </div>
        <h3>鉴权指令（请对照代码查看）</h3>
        <div>
          <div v-auth="'permission.browse'">
            如果你有 permission.browse 权限则能看到这句话
          </div>
          <div v-auth="'permission.create'">
            如果你有 permission.create 权限则能看到这句话
          </div>
          <div v-auth="['permission.browse', 'permission.create']">
            如果你有 permission.browse 或 permission.create 权限则能看到这句话
          </div>
          <div v-auth-all="['permission.browse', 'permission.create']">
            如果你有 permission.browse 和 permission.create 权限则能看到这句话
          </div>
        </div>
        <h3>鉴权函数（请对照代码查看）</h3>
        <div>
          <ElButtonGroup style="display: block; margin-bottom: 10px;">
            <ElButton @click="permissionCheck('permission.browse')">
              校验 permission.browse 权限
            </ElButton>
            <ElButton @click="permissionCheck('permission.create')">
              校验 permission.create 权限
            </ElButton>
          </ElButtonGroup>
          <ElButtonGroup>
            <ElButton @click="permissionCheck(['permission.browse', 'permission.create'])">
              校验 permission.browse 或 permission.create 权限
            </ElButton>
            <ElButton @click="permissionCheck2(['permission.browse', 'permission.create'])">
              校验 permission.browse 和 permission.create 权限
            </ElButton>
          </ElButtonGroup>
        </div>
      </div>
    </PageMain>
  </div>
</template>

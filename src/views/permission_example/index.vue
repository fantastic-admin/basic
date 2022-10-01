<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

const { auth, authAll } = useAuth()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

function accountChange(val: any) {
  ElLoading.service({
    lock: true,
    text: '帐号切换中',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  userStore.login({
    account: val,
    password: '',
  }).then(() => {
    setTimeout(() => {
      location.reload()
    }, 1000)
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
    <page-header title="权限验证" />
    <page-main>
      <div v-if="!settingsStore.app.enablePermission">
        请到 seeting.js 里打开权限功能，再进入该页面查看演示
      </div>
      <div v-else>
        <h3>切换帐号</h3>
        <el-radio-group v-model="userStore.account" @change="accountChange">
          <el-radio-button label="admin" />
          <el-radio-button label="test" />
        </el-radio-group>
        <h3>帐号权限</h3>
        <div>{{ userStore.permissions }}</div>
        <h3>鉴权组件（请对照代码查看）</h3>
        <div>
          <Auth value="permission.browse" style="margin-bottom: 10px;">
            <el-tag>你有 permission.browse 权限</el-tag>
            <template #no-auth>
              <el-tag type="danger">
                你没有 permission.browse 权限
              </el-tag>
            </template>
          </Auth>
          <Auth value="permission.create" style="margin-bottom: 10px;">
            <el-tag>你有 permission.create 权限</el-tag>
            <template #no-auth>
              <el-tag type="danger">
                你没有 permission.create 权限
              </el-tag>
            </template>
          </Auth>
          <Auth :value="['permission.browse', 'permission.create']" style="margin-bottom: 10px;">
            <el-tag>你有 permission.browse 或 permission.create 权限</el-tag>
            <template #no-auth>
              <el-tag type="danger">
                你没有 permission.browse 或 permission.create 权限
              </el-tag>
            </template>
          </Auth>
          <AuthAll :value="['permission.browse', 'permission.create']">
            <el-tag>你有 permission.browse 和 permission.create 权限</el-tag>
            <template #no-auth>
              <el-tag type="danger">
                你没有 permission.browse 和 permission.create 权限
              </el-tag>
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
          <el-button-group style="display: block; margin-bottom: 10px;">
            <el-button @click="permissionCheck('permission.browse')">
              校验 permission.browse 权限
            </el-button>
            <el-button @click="permissionCheck('permission.create')">
              校验 permission.create 权限
            </el-button>
          </el-button-group>
          <el-button-group>
            <el-button @click="permissionCheck(['permission.browse', 'permission.create'])">
              校验 permission.browse 或 permission.create 权限
            </el-button>
            <el-button @click="permissionCheck2(['permission.browse', 'permission.create'])">
              校验 permission.browse 和 permission.create 权限
            </el-button>
          </el-button-group>
        </div>
      </div>
    </page-main>
  </div>
</template>

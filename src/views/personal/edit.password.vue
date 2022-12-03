<route lang="yaml">
name: personalEditPassword
meta:
  title: 修改密码
</route>

<script lang="ts" setup name="PersonalEditPassword">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()

const formRef = ref<FormInstance>()
const form = ref({
  password: '',
  newpassword: '',
  checkpassword: '',
})

const rules = ref<FormRules>({
  password: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
  ],
  newpassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 18, trigger: 'blur', message: '密码长度为6到18位' },
  ],
  checkpassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== form.value.newpassword) {
          callback(new Error('请确认新密码'))
        }
        else {
          callback()
        }
      },
    },
  ],
})

function onSubmit() {
  formRef.value && formRef.value.validate((valid) => {
    if (valid) {
      userStore.editPassword(form.value).then(() => {
        ElMessage({
          type: 'success',
          message: '模拟修改成功，请重新登录',
        })
        userStore.logout().then(() => {
          router.push({
            name: 'login',
            query: {
              redirect: route.fullPath,
            },
          })
        })
      })
    }
  })
}
</script>

<template>
  <div>
    <page-header title="修改密码" content="定期修改密码可以提高帐号安全性噢~" />
    <page-main>
      <el-row>
        <el-col :md="24" :lg="12">
          <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="原密码" prop="password">
              <el-input v-model="form.password" type="password" placeholder="请输入原密码" show-password />
            </el-form-item>
            <el-form-item label="新密码" prop="newpassword">
              <el-input v-model="form.newpassword" type="password" placeholder="请输入原密码" show-password />
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkpassword">
              <el-input v-model="form.checkpassword" type="password" placeholder="请输入原密码" show-password />
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </page-main>
    <fixed-action-bar>
      <el-button type="primary" size="large" @click="onSubmit">
        提交
      </el-button>
    </fixed-action-bar>
  </div>
</template>

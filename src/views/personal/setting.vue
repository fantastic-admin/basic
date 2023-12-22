<route lang="yaml">
name: personalSetting
meta:
  title: 个人设置
  cache: personal-edit.password
</route>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

defineOptions({
  name: 'PersonalSetting',
})

const router = useRouter()

const form = ref({
  headimg: '',
  mobile: '',
  name: '',
  qq: '',
  wechat: '',
})

function handleSuccess(res: any) {
  if (res.error === '') {
    form.value.headimg = res.data.path
  }
  else {
    ElMessage.warning(res.error)
  }
}
function editPassword() {
  router.push({
    name: 'personalEditPassword',
  })
}
</script>

<template>
  <div>
    <PageMain>
      <ElTabs tab-position="left" style="height: 600px;">
        <ElTabPane label="基本设置" class="basic">
          <h2>基本设置</h2>
          <ElRow :gutter="20">
            <ElCol :span="16">
              <ElForm :model="form" label-width="120px" label-suffix="：">
                <ElFormItem label="名 称">
                  <ElInput v-model="form.name" placeholder="请输入你的名称" />
                </ElFormItem>
                <ElFormItem label="手机号">
                  <ElInput v-model="form.mobile" placeholder="请输入你的手机号" />
                </ElFormItem>
                <ElFormItem label="QQ 号">
                  <ElInput v-model="form.qq" placeholder="请输入你的 QQ 号" />
                </ElFormItem>
                <ElFormItem label="微信号">
                  <ElInput v-model="form.wechat" placeholder="请输入你的微信号" />
                </ElFormItem>
                <ElFormItem>
                  <ElButton type="primary">
                    保存
                  </ElButton>
                </ElFormItem>
              </ElForm>
            </ElCol>
            <ElCol :span="8">
              <ImageUpload v-model:url="form.headimg" action="http://scrm.1daas.com/api/upload/upload" name="image" :data="{ token: 'TKD628431923530324' }" notip class="headimg-upload" @on-success="handleSuccess" />
            </ElCol>
          </ElRow>
        </ElTabPane>
        <ElTabPane label="安全设置" class="security">
          <h2>安全设置</h2>
          <div class="setting-list">
            <div class="item">
              <div class="content">
                <div class="title">
                  账户密码
                </div>
                <div class="desc">
                  当前密码强度：强
                </div>
              </div>
              <div class="action">
                <ElButton type="primary" text @click="editPassword">
                  修改
                </ElButton>
              </div>
            </div>
            <div class="item">
              <div class="content">
                <div class="title">
                  密保手机
                </div>
                <div class="desc">
                  已绑定手机：187****3441
                </div>
              </div>
              <div class="action">
                <ElButton type="primary" text>
                  修改
                </ElButton>
              </div>
            </div>
            <div class="item">
              <div class="content">
                <div class="title">
                  备用邮箱
                </div>
                <div class="desc">
                  当前未绑定备用邮箱
                </div>
              </div>
              <div class="action">
                <ElButton type="primary" text>
                  绑定
                </ElButton>
              </div>
            </div>
          </div>
        </ElTabPane>
      </ElTabs>
    </PageMain>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-tabs) {
  .el-tabs__header .el-tabs__nav {
    .el-tabs__active-bar {
      z-index: 0;
      width: 100%;
      background-color: var(--el-color-primary-light-9);
      border-right: 2px solid var(--el-color-primary);
      transition: transform 0.3s, background-color 0.3s, var(--el-transition-border);
    }

    .el-tabs__item {
      padding-right: 100px;
      text-align: left;
    }
  }

  .el-tab-pane {
    padding: 0 20px 0 30px;
  }
}

h2 {
  margin: 0;
  margin-bottom: 30px;
  font-weight: normal;
}

.basic {
  :deep(.headimg-upload) {
    text-align: center;

    .el-upload-dragger {
      border-radius: 50%;
    }
  }
}

.security {
  .setting-list {
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid var(--el-border-color-lighter);
      transition: var(--el-transition-border);

      .content {
        .title {
          margin-bottom: 5px;
          color: var(--el-text-color-primary);
          transition: var(--el-transition-color);
        }

        .desc {
          font-size: 14px;
          color: var(--el-text-color-secondary);
          transition: var(--el-transition-color);
        }
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>

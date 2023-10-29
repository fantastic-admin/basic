<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
defineOptions({
  name: 'ComponentExampleActionbar',
})

const form = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
</script>

<template>
  <div>
    <PageHeader title="固定底部操作栏" content="避免因页面过长导致操作按钮需要滚动到页面底部才能操作，例如表单页">
      <template #content>
        <p>FixedActionBar</p>
        <p style="margin-bottom: 0;">
          避免因页面过长导致操作按钮需要滚动到页面底部才能操作，例如表单页
        </p>
      </template>
    </PageHeader>
    <PageMain>
      <ElRow>
        <ElCol :md="24" :lg="12">
          <ElForm ref="form" :model="form" label-width="120px">
            <ElFormItem label="活动名称">
              <ElInput v-model="form.name" />
            </ElFormItem>
            <ElFormItem label="活动区域">
              <ElSelect v-model="form.region" placeholder="请选择活动区域">
                <ElOption label="区域一" value="shanghai" />
                <ElOption label="区域二" value="beijing" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="活动时间">
              <ElCol :span="11">
                <ElDatePicker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
              </ElCol>
              <ElCol class="line" :span="2">
                -
              </ElCol>
              <ElCol :span="11">
                <ElTimePicker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
              </ElCol>
            </ElFormItem>
            <ElFormItem label="即时配送">
              <ElSwitch v-model="form.delivery" />
            </ElFormItem>
            <ElFormItem label="活动性质">
              <ElCheckboxGroup v-model="form.type">
                <ElCheckbox label="美食/餐厅线上活动" name="type" />
                <ElCheckbox label="地推活动" name="type" />
                <ElCheckbox label="线下主题活动" name="type" />
                <ElCheckbox label="单纯品牌曝光" name="type" />
              </ElCheckboxGroup>
            </ElFormItem>
            <ElFormItem label="特殊资源">
              <ElRadioGroup v-model="form.resource">
                <ElRadio label="线上品牌商赞助" />
                <ElRadio label="线下场地免费" />
              </ElRadioGroup>
            </ElFormItem>
            <ElFormItem label="活动形式">
              <ElInput v-model="form.desc" type="textarea" />
            </ElFormItem>
            <ElFormItem label="活动名称">
              <ElInput v-model="form.name" />
            </ElFormItem>
            <ElFormItem label="活动区域">
              <ElSelect v-model="form.region" placeholder="请选择活动区域">
                <ElOption label="区域一" value="shanghai" />
                <ElOption label="区域二" value="beijing" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="活动时间">
              <ElCol :span="11">
                <ElDatePicker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
              </ElCol>
              <ElCol class="line" :span="2">
                -
              </ElCol>
              <ElCol :span="11">
                <ElTimePicker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
              </ElCol>
            </ElFormItem>
            <ElFormItem label="即时配送">
              <ElSwitch v-model="form.delivery" />
            </ElFormItem>
            <ElFormItem label="活动性质">
              <ElCheckboxGroup v-model="form.type">
                <ElCheckbox label="美食/餐厅线上活动" name="type" />
                <ElCheckbox label="地推活动" name="type" />
                <ElCheckbox label="线下主题活动" name="type" />
                <ElCheckbox label="单纯品牌曝光" name="type" />
              </ElCheckboxGroup>
            </ElFormItem>
            <ElFormItem label="特殊资源">
              <ElRadioGroup v-model="form.resource">
                <ElRadio label="线上品牌商赞助" />
                <ElRadio label="线下场地免费" />
              </ElRadioGroup>
            </ElFormItem>
            <ElFormItem label="活动形式">
              <ElInput v-model="form.desc" type="textarea" />
            </ElFormItem>
            <ElFormItem label="活动名称">
              <ElInput v-model="form.name" />
            </ElFormItem>
            <ElFormItem label="活动区域">
              <ElSelect v-model="form.region" placeholder="请选择活动区域">
                <ElOption label="区域一" value="shanghai" />
                <ElOption label="区域二" value="beijing" />
              </ElSelect>
            </ElFormItem>
            <ElFormItem label="活动时间">
              <ElCol :span="11">
                <ElDatePicker v-model="form.date1" type="date" placeholder="选择日期" style="width: 100%;" />
              </ElCol>
              <ElCol class="line" :span="2">
                -
              </ElCol>
              <ElCol :span="11">
                <ElTimePicker v-model="form.date2" placeholder="选择时间" style="width: 100%;" />
              </ElCol>
            </ElFormItem>
            <ElFormItem label="即时配送">
              <ElSwitch v-model="form.delivery" />
            </ElFormItem>
            <ElFormItem label="活动性质">
              <ElCheckboxGroup v-model="form.type">
                <ElCheckbox label="美食/餐厅线上活动" name="type" />
                <ElCheckbox label="地推活动" name="type" />
                <ElCheckbox label="线下主题活动" name="type" />
                <ElCheckbox label="单纯品牌曝光" name="type" />
              </ElCheckboxGroup>
            </ElFormItem>
            <ElFormItem label="特殊资源">
              <ElRadioGroup v-model="form.resource">
                <ElRadio label="线上品牌商赞助" />
                <ElRadio label="线下场地免费" />
              </ElRadioGroup>
            </ElFormItem>
            <ElFormItem label="活动形式">
              <ElInput v-model="form.desc" type="textarea" />
            </ElFormItem>
          </ElForm>
        </ElCol>
      </ElRow>
    </PageMain>
    <FixedActionBar>
      <ElButton type="primary" size="large">
        立即创建
      </ElButton>
      <ElButton size="large">
        取消
      </ElButton>
    </FixedActionBar>
  </div>
</template>

<script setup lang="ts">
const inputValue = ref<string>('')
const inputValue1 = ref<string>('')

const radioValue = ref<number>(1)

const datePickerValue1 = ref()
const datePickerValue2 = ref()
const datePickerValue3 = ref()
const datePickerValue4 = ref()
const datePickerValue5 = ref()

const rateValue = ref<number>(2)

const selectValue1 = ref('lucy')
const selectValue2 = ref('lucy')
const selectValue3 = ref('lucy')
const selectOptions1 = ref([
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'disabled', label: 'Disabled', disabled: true },
  { value: 'yiminghe', label: 'Yiminghe' },
])
const selectOptions2 = ref([
  { value: 'lucy', label: 'Lucy' },
])
const selectOptions3 = ref([
  { value: 'lucy', label: 'Lucy' },
])

const sliderValue1 = ref<number>(0)
const sliderValue2 = ref<[number, number]>([20, 50])

const switchChecked = ref<boolean>(false)

const columns = [
  { prop: 'name', label: 'Name', width: '120' },
  { prop: 'salary', label: 'Salary', width: '120' },
  { prop: 'address', label: 'Address', width: '200' },
  { prop: 'email', label: 'Email', width: '180' },
]
const data = reactive([
  {
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    email: 'jane.doe@example.com',
  },
  {
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com',
  },
  {
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    email: 'kevin.sandra@example.com',
  },
  {
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com',
  },
  {
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com',
  },
])

function open(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div>
    <FaPageHeader description="框架提供已集成 Element Plus 组件库的模板，支持开箱即用。本页仅展示部分组件，更多组件及使用说明请查看 Element Plus 官网。">
      <template #title>
        <div class="flex gap-2 items-center">
          <FaIcon name="https://element-plus.org/images/element-plus-logo-small.svg" />
          Element Plus
        </div>
      </template>
      <FaButton variant="outline" @click="open('https://element-plus.org/zh-CN/')">
        <FaIcon name="i-ant-design:link-outlined" />
        Element Plus 官网
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <ElSpace>
        <ElButton type="primary">
          Primary
        </ElButton>
        <ElButton>Default</ElButton>
        <ElButton type="success">
          Success
        </ElButton>
        <ElButton type="warning">
          Warning
        </ElButton>
        <ElButton type="danger">
          Danger
        </ElButton>
        <ElButton type="info">
          Info
        </ElButton>
        <ElButton type="text">
          Text
        </ElButton>
      </ElSpace>
    </FaPageMain>
    <FaPageMain>
      <ElSpace>
        <ElInput v-model="inputValue" placeholder="Please enter something" clearable />
        <ElInput v-model.lazy="inputValue1" placeholder="Lazy input" clearable />
      </ElSpace>
    </FaPageMain>
    <FaPageMain>
      <ElRadioGroup v-model="radioValue">
        <ElRadio :value="1">
          A
        </ElRadio>
        <ElRadio :value="2">
          B
        </ElRadio>
        <ElRadio :value="3">
          C
        </ElRadio>
        <ElRadio :value="4">
          D
        </ElRadio>
      </ElRadioGroup>
    </FaPageMain>
    <FaPageMain>
      <ElSpace direction="vertical" :size="12">
        <ElDatePicker v-model="datePickerValue1" type="date" placeholder="Select date" />
        <ElDatePicker v-model="datePickerValue2" type="week" placeholder="Select week" />
        <ElDatePicker v-model="datePickerValue3" type="month" placeholder="Select month" />
        <ElDatePicker v-model="datePickerValue4" type="datetime" placeholder="Select datetime" />
        <ElDatePicker v-model="datePickerValue5" type="year" placeholder="Select year" />
      </ElSpace>
    </FaPageMain>
    <FaPageMain>
      <ElRate v-model="rateValue" />
    </FaPageMain>
    <FaPageMain>
      <ElSpace>
        <ElSelect v-model="selectValue1" placeholder="Select" class="w-50">
          <ElOption
            v-for="item in selectOptions1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </ElSelect>
        <ElSelect v-model="selectValue2" disabled placeholder="Disabled" class="w-50">
          <ElOption
            v-for="item in selectOptions2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
        <ElSelect v-model="selectValue3" loading placeholder="Loading" class="w-50">
          <ElOption
            v-for="item in selectOptions3"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </ElSelect>
      </ElSpace>
    </FaPageMain>
    <FaPageMain>
      <ElSlider v-model="sliderValue1" />
      <ElSlider v-model="sliderValue2" range />
    </FaPageMain>
    <FaPageMain>
      <ElSwitch v-model="switchChecked" />
    </FaPageMain>
    <FaPageMain>
      <ElTable :data="data">
        <ElTableColumn
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
        />
      </ElTable>
    </FaPageMain>
  </div>
</template>

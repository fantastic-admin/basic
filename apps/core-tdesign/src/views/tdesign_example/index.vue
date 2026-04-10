<script setup lang="ts">
const inputValue = ref<string>('')

const radioValue = ref<number>(1)

const datePickerValue1 = ref('')
const datePickerValue2 = ref('')
const datePickerValue3 = ref('')
const datePickerValue4 = ref('')
const datePickerValue5 = ref('')

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

const activeRowType = ref<any>('single')
const hover = ref(false)
const tableData = getTableData()
const columns = [
  { colKey: 'applicant', title: '申请人', width: '100' },
  { colKey: 'channel', title: '签署方式' },
  { colKey: 'detail.email', title: '邮箱地址', ellipsis: true },
  { colKey: 'createTime', title: '申请时间' },
]
watch([activeRowType], ([activeRowType]) => {
  if (!activeRowType) {
    hover.value = true
  }
})
function getTableData(total = 5) {
  const data = []
  for (let i = 0; i < total; i++) {
    data.push({
      key: i + 1,
      applicant: ['贾明', '张三', '王芳'][i % 3],
      status: i % 3,
      channel: ['电子签署', '纸质签署', '纸质签署'][i % 3],
      detail: {
        email: ['w.cezkdudy@lhll.au', 'r.nmgw@peurezgn.sl', 'p.cumx@rampblpa.ru'][i % 3],
      },
      matters: ['宣传物料制作费用', 'algolia 服务报销', '相关周边制作费', '激励奖品快递费'][i % 4],
      time: [2, 3, 1, 4][i % 4],
      createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01'][i % 4],
    })
  }
  return data
}

function open(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div>
    <FaPageHeader title="TDesign" description="框架内置 TDesign 组件库，本页仅展示部分组件，更多组件及使用说明请查看 TDesign 官网。">
      <FaButton variant="outline" @click="open('https://tdesign.tencent.com/vue-next/')">
        <FaIcon name="i-ant-design:link-outlined" />
        TDesign 官网
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <TSpace size="24px">
        <TButton variant="base">
          填充按钮
        </TButton>
        <TButton variant="outline">
          描边按钮
        </TButton>
        <TButton variant="dashed">
          虚框按钮
        </TButton>
        <TButton variant="text">
          文字按钮
        </TButton>
      </TSpace>
    </FaPageMain>
    <FaPageMain>
      <TSpace direction="vertical">
        <TInput />
        <TInput v-model="inputValue" placeholder="请输入内容（有默认值）" />
      </TSpace>
    </FaPageMain>
    <FaPageMain>
      <TRadioGroup v-model="radioValue">
        <TRadio :value="1">
          A
        </TRadio>
        <TRadio :value="2">
          B
        </TRadio>
        <TRadio :value="3">
          C
        </TRadio>
        <TRadio :value="4">
          D
        </TRadio>
      </TRadioGroup>
    </FaPageMain>
    <FaPageMain>
      <TSpace direction="vertical" :size="12">
        <TDatePicker v-model="datePickerValue1" mode="date" />
        <TDatePicker v-model="datePickerValue2" mode="week" />
        <TDatePicker v-model="datePickerValue3" mode="month" />
        <TDatePicker v-model="datePickerValue4" mode="quarter" />
        <TDatePicker v-model="datePickerValue5" mode="year" />
      </TSpace>
    </FaPageMain>
    <FaPageMain>
      <TRate v-model="rateValue" />
    </FaPageMain>
    <FaPageMain>
      <TSpace>
        <TSelect v-model="selectValue1" :options="selectOptions1" />
        <TSelect v-model="selectValue2" disabled :options="selectOptions2" />
        <TSelect v-model="selectValue3" loading :options="selectOptions3" />
      </TSpace>
    </FaPageMain>
    <FaPageMain>
      <TSlider v-model="sliderValue1" />
      <TSlider v-model="sliderValue2" range />
    </FaPageMain>
    <FaPageMain>
      <TSwitch v-model="switchChecked" />
    </FaPageMain>
    <FaPageMain>
      <TSpace direction="vertical">
        <TSpace align="center">
          <TRadioGroup v-model="activeRowType" variant="default-filled">
            <TRadioButton value="">
              不高亮
            </TRadioButton>
            <TRadioButton value="single">
              单行高亮
            </TRadioButton>
            <TRadioButton value="multiple">
              多行高亮
            </TRadioButton>
          </TRadioGroup>
          <TCheckbox v-model="hover">
            显示悬浮效果
          </TCheckbox>
        </TSpace>
        <TTable
          row-key="key"
          :data="tableData"
          :columns="columns"
          :active-row-type="activeRowType"
          :hover="hover"
          lazy-load
        />
      </TSpace>
    </FaPageMain>
  </div>
</template>

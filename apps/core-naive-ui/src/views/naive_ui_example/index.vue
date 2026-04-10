<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag, useMessage } from 'naive-ui'

const inputValue = ref<string>('')
const inputValue1 = ref<string>('')

const radioValue = ref<number>(1)

const timestamp = ref(1183135260000)

const rateValue = ref<number>(2)

const selectValue = ref(null)
const selectOptions = ref([
  {
    label: 'Everybody\'s Got Something to Hide Except Me and My Monkey',
    value: 'song0',
    disabled: true,
  },
  {
    label: 'Drive My Car',
    value: 'song1',
  },
  {
    label: 'Norwegian Wood',
    value: 'song2',
  },
  {
    label: 'You Won\'t See',
    value: 'song3',
    disabled: true,
  },
  {
    label: 'Nowhere Man',
    value: 'song4',
  },
  {
    label: 'Think For Yourself',
    value: 'song5',
  },
  {
    label: 'The Word',
    value: 'song6',
  },
  {
    label: 'Michelle',
    value: 'song7',
    disabled: true,
  },
  {
    label: 'What goes on',
    value: 'song8',
  },
  {
    label: 'Girl',
    value: 'song9',
  },
  {
    label: 'I\'m looking through you',
    value: 'song10',
  },
  {
    label: 'In My Life',
    value: 'song11',
  },
  {
    label: 'Wait',
    value: 'song12',
  },
])

const sliderValue = ref<number>(0)

const switchChecked = ref<boolean>(false)

const message = useMessage()
interface RowData {
  key: number
  name: string
  age: number
  address: string
  tags: string[]
}
function createColumns({
  sendMail,
}: {
  sendMail: (rowData: RowData) => void
}): DataTableColumns<RowData> {
  return [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Age',
      key: 'age',
    },
    {
      title: 'Address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      render(row) {
        const tags = row.tags.map((tagKey) => {
          return h(
            NTag,
            {
              style: {
                marginRight: '6px',
              },
              type: 'info',
              bordered: false,
            },
            {
              default: () => tagKey,
            },
          )
        })
        return tags
      },
    },
    {
      title: 'Action',
      key: 'actions',
      render(row) {
        return h(
          NButton,
          {
            size: 'small',
            onClick: () => sendMail(row),
          },
          { default: () => 'Send Email' },
        )
      },
    },
  ]
}
function createData(): RowData[] {
  return [
    {
      key: 0,
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: 1,
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['wow'],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]
}
const columns = createColumns({
  sendMail(rowData) {
    message.info(`send mail to ${rowData.name}`)
  },
})
const data = createData()
const pagination = {
  pageSize: 10,
}

function open(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div>
    <FaPageHeader title="Naive UI" description="框架内置 Naive UI 组件库，本页仅展示部分组件，更多组件及使用说明请查看 Naive UI 官网。">
      <FaButton variant="outline" @click="open('https://www.naiveui.com/')">
        <FaIcon name="i-ant-design:link-outlined" />
        Naive UI 官网
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <NSpace>
        <NButton>Default</NButton>
        <NButton type="tertiary">
          Tertiary
        </NButton>
        <NButton type="primary">
          Primary
        </NButton>
        <NButton type="info">
          Info
        </NButton>
        <NButton type="success">
          Success
        </NButton>
        <NButton type="warning">
          Warning
        </NButton>
        <NButton type="error">
          Error
        </NButton>
      </NSpace>
    </FaPageMain>
    <FaPageMain>
      <NSpace vertical>
        <NInput v-model:value="inputValue" type="text" placeholder="基本的 Input" />
        <NInput v-model:value="inputValue1" type="textarea" placeholder="基本的 Textarea" />
      </NSpace>
    </FaPageMain>
    <FaPageMain>
      <NRadioGroup v-model:value="radioValue">
        <NRadio :value="1">
          A
        </NRadio>
        <NRadio :value="2">
          B
        </NRadio>
        <NRadio :value="3">
          C
        </NRadio>
        <NRadio :value="4">
          D
        </NRadio>
      </NRadioGroup>
    </FaPageMain>
    <FaPageMain>
      <NDatePicker v-model:value="timestamp" type="date" />
    </FaPageMain>
    <FaPageMain>
      <NRate v-model:value="rateValue" />
    </FaPageMain>
    <FaPageMain>
      <NSpace vertical>
        <NSelect v-model:value="selectValue" :options="selectOptions" />
        <NSelect v-model:value="selectValue" disabled :options="selectOptions" />
      </NSpace>
    </FaPageMain>
    <FaPageMain>
      <NSpace vertical>
        <NSlider v-model:value="sliderValue" :step="10" />
        <NInputNumber v-model:value="sliderValue" size="small" />
      </NSpace>
    </FaPageMain>
    <FaPageMain>
      <NSpace>
        <NSwitch v-model:value="switchChecked" />
        <NSwitch v-model:value="switchChecked" disabled />
      </NSpace>
    </FaPageMain>
    <FaPageMain>
      <NDataTable
        :bordered="false"
        :single-line="false"
        :columns="columns"
        :data="data"
        :pagination="pagination"
      />
    </FaPageMain>
  </div>
</template>

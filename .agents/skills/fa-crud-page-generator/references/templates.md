# CRUD 代码模板

以下模板基于 `src/views/pages_example/manager` 真实模块提炼，使用以下占位符：

- `{cname}` — 模块中文名，如 `用户`
- `{componentNameList}` — 列表页组件名（PascalCase），如 `SystemUserList`
- `{componentNameDetail}` — 详情页组件名（PascalCase），如 `SystemUserDetail`
- `{fileName}` — API 文件名（camelCase），如 `systemUser`
- `{apiPrefix}` — API URL 前缀（无前导斜杠），如 `system/user`
- `{routeListName}` — 列表路由 name，如 `systemUserList`
- `{routeDetailName}` — 详情路由 name，如 `systemUserDetail`（仅 router 模式）

---

## list.vue 模板

```vue
<script setup lang="ts">
import api{FileName} from '@/api/modules/{fileName}'
import eventBus from '@/utils/eventBus'
import DetailForm from './components/DetailForm/index.vue'

defineOptions({
  name: '{componentNameList}',
})

const router = useRouter()
const { pagination, getParams, onSizeChange, onCurrentChange, onSortChange } = usePagination()

// 表格是否自适应高度
const tableAutoHeight = ref(false)

/**
 * 详情展示模式
 * router 路由跳转
 * modal 模态框
 * drawer 抽屉
 */
const formMode = ref<'router' | 'modal' | 'drawer'>('{formMode}')

// 详情
const formModeProps = ref({
  id: '',
})

// 搜索
const searchDefault = {
  {searchDefaults}
}
const search = ref({ ...searchDefault })
function searchReset() {
  Object.assign(search.value, searchDefault)
}

// 批量操作
const batch = ref({
  enable: true,
  selectionDataList: [],
})

// 列表
const loading = ref(false)
const dataList = ref([])

onMounted(() => {
  getDataList()
  if (formMode.value === 'router') {
    eventBus.on('get-data-list', () => {
      getDataList()
    })
  }
})

onBeforeUnmount(() => {
  if (formMode.value === 'router') {
    eventBus.off('get-data-list')
  }
})

function getDataList() {
  loading.value = true
  const params = {
    ...getParams(),
    {searchParams}
  }
  api{FileName}.list(params).then((res: any) => {
    loading.value = false
    dataList.value = res.data.list
    pagination.value.total = res.data.total
  })
}

// 每页数量切换
function sizeChange(size: number) {
  onSizeChange(size).then(() => getDataList())
}

// 当前页码切换（翻页）
function currentChange(page = 1) {
  onCurrentChange(page).then(() => getDataList())
}

// 字段排序
function sortChange({ prop, order }: { prop: string, order: string }) {
  onSortChange(prop, order).then(() => getDataList())
}

const formRef = ref<InstanceType<typeof DetailForm>>()

const { open: openModal, update: updateModal } = useFaModal().create({
  destroyOnClose: true,
  closeOnClickOverlay: false,
  closeOnPressEscape: false,
  beforeClose: (action, done) => {
    if (action === 'confirm') {
      // 调用 DetailForm 组件内部 submit 方法
      formRef.value?.submit().then(() => {
        getDataList()
        done()
      })
    }
    else {
      done()
    }
  },
  content: () => h(DetailForm, {
    ref: formRef,
    id: formModeProps.value.id,
  }),
})

const { open: openDrawer, update: updateDrawer } = useFaDrawer().create({
  destroyOnClose: true,
  closeOnClickOverlay: false,
  closeOnPressEscape: false,
  beforeClose: (action, done) => {
    if (action === 'confirm') {
      // 调用 DetailForm 组件内部 submit 方法
      formRef.value?.submit().then(() => {
        getDataList()
        done()
      })
    }
    else {
      done()
    }
  },
  content: () => h(DetailForm, {
    ref: formRef,
    id: formModeProps.value.id,
  }),
})

function onCreate() {
  if (formMode.value === 'router') {
    router.push({ name: '{routeDetailName}' })
  }
  else {
    formModeProps.value.id = ''
    if (formMode.value === 'modal') {
      updateModal({ title: '新增{cname}' })
      openModal()
    }
    else {
      updateDrawer({ title: '新增{cname}' })
      openDrawer()
    }
  }
}

function onEdit(row: any) {
  if (formMode.value === 'router') {
    router.push({ name: '{routeDetailName}', params: { id: row.id } })
  }
  else {
    formModeProps.value.id = row.id
    if (formMode.value === 'modal') {
      updateModal({ title: '编辑{cname}' })
      openModal()
    }
    else {
      updateDrawer({ title: '编辑{cname}' })
      openDrawer()
    }
  }
}

function onDel(row: any) {
  useFaModal().confirm({
    title: '确认信息',
    content: `确认删除「${row.{firstField}}」吗？`,
    onConfirm: () => {
      api{FileName}.delete(row.id).then(() => {
        getDataList()
        faToast.success('删除成功')
      })
    },
  })
}
</script>

<template>
  <div :class="{ 'absolute flex flex-col size-full': tableAutoHeight }">
    <FaPageHeader title="{cname}管理" class="mb-0" />
    <FaPageMain :class="{ 'flex-1 overflow-auto': tableAutoHeight }" :main-class="{ 'flex-1 flex flex-col overflow-auto': tableAutoHeight }">
      <FaSearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <div class="gap-x-8 gap-y-2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            {fields.search}
            <div class="flex gap-2 col-end--1 justify-end">
              <FaButton variant="outline" @click="searchReset(); currentChange()">
                重置
              </FaButton>
              <FaButton type="primary" @click="currentChange()">
                <FaIcon name="i-ri:search-line" />
                筛选
              </FaButton>
              <FaButton variant="ghost" @click="toggle">
                {{ fold ? '展开' : '收起' }}
                <FaIcon :name="fold ? 'i-ep:caret-bottom' : 'i-ep:caret-top'" />
              </FaButton>
            </div>
          </div>
        </template>
      </FaSearchBar>
      <div class="mx--5 my-4 border-t border-t-dashed" />
      <div class="flex-center-between gap-2">
        <FaButton v-if="batch.enable" variant="outline" :disabled="!batch.selectionDataList.length">
          批量操作
        </FaButton>
        <FaButton @click="onCreate">
          <FaIcon name="i-ri:add-line" />
          新增
        </FaButton>
      </div>
      <ElTable v-loading="loading" class="my-4" :data="dataList" stripe highlight-current-row border height="100%" @sort-change="sortChange" @selection-change="batch.selectionDataList = $event">
        <ElTableColumn v-if="batch.enable" type="selection" align="center" fixed />
        {fields.list}
        <ElTableColumn label="操作" width="120" align="center" fixed="right">
          <template #default="scope">
            <div class="flex-center gap-2">
              <FaButton variant="outline" size="icon-sm" @click="onEdit(scope.row)">
                <FaIcon name="i-ri:edit-line" />
              </FaButton>
              <FaDropdown
                :items="[
                  [
                    { label: '删除', variant: 'destructive', handle: () => onDel(scope.row) },
                  ],
                ]"
              >
                <FaButton variant="outline" size="icon-sm">
                  <FaIcon name="i-ri:more-line" />
                </FaButton>
              </FaDropdown>
            </div>
          </template>
        </ElTableColumn>
      </ElTable>
      <FaPagination :page="pagination.page" :size="pagination.size" :total="pagination.total" @page-change="currentChange" @size-change="sizeChange" />
    </FaPageMain>
  </div>
</template>
```

> 注意：`list.vue` 不需要 `<style scoped>` 块，所有样式均通过 UnoCSS 工具类实现。

---

## detail.vue 模板（仅 router 模式）

```vue
<script setup lang="ts">
import eventBus from '@/utils/eventBus'
import DetailForm from './components/DetailForm/index.vue'

defineOptions({
  name: '{componentNameDetail}',
})

const route = useRoute()
const router = useRouter()

const formRef = useTemplateRef('formRef')

function onSubmit() {
  formRef.value?.submit().then(() => {
    eventBus.emit('get-data-list')
    onCancel()
  })
}

function onCancel() {
  router.back({ name: '{routeListName}' })
}
</script>

<template>
  <div>
    <FaFixedBar position="top" class="p-0">
      <FaPageHeader :title="route.params.id ? '编辑{cname}' : '新增{cname}'" class="mb-0 border-b-none">
        <FaButton variant="outline" size="sm" class="rounded-full" @click="onCancel">
          <FaIcon name="i-ep:arrow-left" />
          返回
        </FaButton>
      </FaPageHeader>
    </FaFixedBar>
    <FaPageMain>
      <ElRow>
        <ElCol :md="24" :lg="16">
          <DetailForm :id="route.params.id as string" ref="formRef" />
        </ElCol>
      </ElRow>
    </FaPageMain>
    <FaFixedBar position="bottom" class="flex-center gap-4">
      <FaButton @click="onSubmit">
        提交
      </FaButton>
      <FaButton variant="outline" @click="onCancel">
        取消
      </FaButton>
    </FaFixedBar>
  </div>
</template>
```

---

## components/DetailForm/index.vue 模板

```vue
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import api{FileName} from '@/api/modules/{fileName}'

export interface Props {
  id?: number | string
}
const props = withDefaults(
  defineProps<Props>(),
  {
    id: '',
  },
)

const loading = ref(false)
const formRef = useTemplateRef<FormInstance>('formRef')
const form = ref({
  id: props.id,
  {fields.formInit}
})
const formRules = ref<FormRules>({
  {fields.rules}
})

onMounted(() => {
  if (form.value.id !== '') {
    getInfo()
  }
})

function getInfo() {
  loading.value = true
  api{FileName}.detail(form.value.id).then((res: any) => {
    loading.value = false
    {fields.formAssign}
  }).catch(() => {
    loading.value = false
  })
}

defineExpose({
  submit() {
    return new Promise<void>((resolve) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (form.value.id === '') {
            api{FileName}.create(form.value).then(() => {
              faToast.success('新增成功')
              resolve()
            })
          }
          else {
            api{FileName}.edit(form.value).then(() => {
              faToast.success('编辑成功')
              resolve()
            })
          }
        }
      })
    })
  },
})
</script>

<template>
  <div v-loading="loading">
    <ElForm ref="formRef" :model="form" :rules="formRules" label-width="120px" label-suffix="：">
      {fields.form}
    </ElForm>
  </div>
</template>
```

---

## api.ts 模板

```typescript
import api from '../index'

export default {
  list: (data: {
    {searchTypes}
    from: number
    limit: number
  }) => api.get('{apiPrefix}/list', {
    params: data,
    fake: true,
  }),

  detail: (id: number | string) => api.get('{apiPrefix}/detail', {
    params: { id },
    fake: true,
  }),

  create: (data: any) => api.post('{apiPrefix}/create', data, {
    fake: true,
  }),

  edit: (data: any) => api.post('{apiPrefix}/edit', data, {
    fake: true,
  }),

  delete: (id: number | string) => api.post('{apiPrefix}/delete', { id }, {
    fake: true,
  }),
}
```

> 不需要 Mock 数据时，去掉所有 `fake: true` 选项即可。

---

## fake.ts 模板

```typescript
import { faker } from '@faker-js/faker/locale/zh_CN'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

const {moduleName}List: any[] = []
for (let i = 0; i < 50; i++) {
  {moduleName}List.push({
    id: i + 1,
    {fields.mock}
  })
}

export default defineFakeRoute([
  {
    url: '/fake/{apiPrefix}/list',
    method: 'get',
    response: ({ query }) => {
      const { {searchQueryFields}, from, limit } = query
      let list = {moduleName}List
      {searchFilters}
      const pageList = list.filter((_item, index) => {
        return index >= ~~from && index < (~~from + ~~limit)
      })
      return {
        error: '',
        status: 1,
        data: {
          list: pageList,
          total: list.length,
        },
      }
    },
  },
  {
    url: '/fake/{apiPrefix}/detail',
    method: 'get',
    response: ({ query }) => {
      const info = {moduleName}List.filter(item => item.id === ~~query.id)
      return {
        error: '',
        status: 1,
        data: info[0],
      }
    },
  },
  {
    url: '/fake/{apiPrefix}/create',
    method: 'post',
    response: () => {
      return { error: '', status: 1, data: { isSuccess: true } }
    },
  },
  {
    url: '/fake/{apiPrefix}/edit',
    method: 'post',
    response: () => {
      return { error: '', status: 1, data: { isSuccess: true } }
    },
  },
  {
    url: '/fake/{apiPrefix}/delete',
    method: 'post',
    response: () => {
      return { error: '', status: 1, data: { isSuccess: true } }
    },
  },
])
```

---

## 字段生成规则

### 搜索栏字段

每个搜索字段用 `FaLabel` 包裹，内部控件根据字段类型自行选择合适的 Fa* 或 El* 组件。次要搜索条件加 `v-show="!fold"` 实现折叠。

```vue
<FaLabel label="{label}" class="col-span-1">
  <!-- 内部放对应的输入控件，string 用 FaInput，枚举用 FaSelect，日期用 ElDatePicker 等 -->
</FaLabel>
```

### 列表列

普通列直接用 `prop` 渲染，需要自定义展示时使用 `#default` slot：

```vue
<!-- 普通列 -->
<ElTableColumn prop="{field}" label="{label}" />

<!-- 需要自定义渲染时 -->
<ElTableColumn prop="{field}" label="{label}" width="100" align="center">
  <template #default="scope">
    <!-- 根据字段含义选择合适的展示方式，如 ElTag、FaSwitch 等 -->
  </template>
</ElTableColumn>
```

### 表单字段

每个表单字段用 `ElFormItem` 包裹，内部控件根据字段类型自行选择合适的 Fa* 或 El* 组件，注意加 `class="w-full"`。

```vue
<ElFormItem label="{label}" prop="{field}">
  <!-- 内部放对应的输入控件 -->
</ElFormItem>
```

### 表单验证规则

```typescript
// 必填文本
{field}: [
  { required: true, message: '请输入{label}', trigger: 'blur' },
],
// 必填选择
{field}: [
  { required: true, message: '请选择{label}', trigger: 'change' },
],
```

### Mock 数据字段映射

| 字段类型 | faker 方法 |
|---------|-----------|
| 姓名 | `faker.person.fullName()` |
| 账号/用户名 | `faker.person.firstName()` |
| 手机号 | `faker.phone.number({ style: 'international' })` |
| 邮箱 | `faker.internet.email()` |
| 标题/名称 | `faker.lorem.words(3)` |
| 描述 | `faker.lorem.sentence()` |
| 数字（枚举） | `faker.number.int(2)` |
| 布尔（状态） | `faker.datatype.boolean()` |
| 金额 | `faker.number.float({ min: 10, max: 9999, fractionDigits: 2 })` |
| 日期 | `faker.date.recent().toISOString()` |

### Mock 搜索过滤模式

**string 模糊匹配：**
```typescript
list = list.filter((item) => {
  return {field} ? item.{field}.includes({field}) : true
})
```

**枚举/数字精确匹配（注意：query 参数均为字符串，`0` 是 falsy，不能直接用 `{field} ?` 判断）：**
```typescript
list = list.filter((item) => {
  return {field} !== undefined && {field} !== '' ? item.{field} === ~~{field} : true
})
```

---

## faker.js 字段类型映射

| 字段类型 | 推荐 faker 方法 |
|---------|----------------|
| string（名称类） | `faker.person.fullName()` 或 `faker.commerce.productName()` |
| string（标题类） | `faker.lorem.words(3)` |
| string（描述类） | `faker.lorem.sentence()` |
| number（ID） | 自增 `i + 1` |
| number（金额） | `faker.number.float({ min: 10, max: 9999, fractionDigits: 2 })` |
| number（数量） | `faker.number.int({ min: 1, max: 100 })` |
| boolean | `faker.datatype.boolean()` |
| date | `faker.date.recent().toISOString()` |
| status（枚举） | `faker.helpers.arrayElement([0, 1, 2])` |

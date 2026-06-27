# CRUD 代码模板

生成业务模块时优先保持结构一致，再按字段和业务控件做替换。

## 占位符

- `{cname}` — 模块中文名，如 `商品`
- `{moduleName}` — 模块英文名 camelCase，如 `product`
- `{ModuleName}` — 模块英文名 PascalCase，如 `Product`
- `{fileName}` — API 文件名，如 `product`
- `{apiPrefix}` — API URL 前缀，无前导斜杠，如 `product`
- `{componentNameList}` — 列表页组件名，如 `ProductList`
- `{componentNameDetail}` — 详情页组件名，如 `ProductDetail`
- `{routeListName}` — 列表路由 name，如 `productList`
- `{routeDetailName}` — 详情路由 name，如 `productDetail`
- `{routeRootName}` — 父级路由 name，如 `product`
- `{routePath}` — 父级路由 path，如 `/product`
- `{routeTitle}` — 路由标题，如 `商品管理`
- `{formMode}` — `router`、`modal` 或 `drawer`
- `{firstField}` — 删除确认中展示的主字段，如 `title`
- `{formModelTypes}` — `DetailFormModel` 中除 `id` 外的字段类型
- `{formValidationSchema}` — `FaForm` 的 validation schema 对象字段

---

## list.vue 模板

```vue
<script setup lang="ts">
import type { TableColumn } from '@fantastic-admin/components'
import api{ModuleName} from '@/api/modules/{fileName}'
import eventBus from '@/utils/eventBus'
import DetailForm from './components/DetailForm/index.vue'

defineOptions({
  name: '{componentNameList}',
})

interface {ModuleName}Item {
  id: number
  {itemTypeFields}
}

const router = useRouter()
const { pagination, getParams, onSizeChange, onCurrentChange } = usePagination()

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
  id: '' as number | string,
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
  selectionDataList: [] as {ModuleName}Item[],
})

// 列表
const loading = ref(false)
const dataList = ref<{ModuleName}Item[]>([])

const tableColumns = computed<TableColumn<{ModuleName}Item>[]>(() => [
  ...(batch.value.enable
    ? [{
      type: 'selection',
      fixed: 'left',
      width: 48,
    } satisfies TableColumn<{ModuleName}Item>]
    : []),
  {tableColumns}
  {
    id: 'operation',
    header: '操作',
    width: 120,
    align: 'center',
    fixed: 'right',
  },
])

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
  api{ModuleName}.list(params).then((res: any) => {
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

const formRef = ref<InstanceType<typeof DetailForm>>()

const { open: openModal, update: updateModal } = useFaModal().create({
  destroyOnClose: true,
  closeOnClickOverlay: false,
  closeOnPressEscape: false,
  beforeClose: (action, done) => {
    if (action === 'confirm') {
      // 调用 DetailForm 组件内部 submit 方法
      formRef.value?.submit().then((success) => {
        if (!success) {
          return
        }

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
      formRef.value?.submit().then((success) => {
        if (!success) {
          return
        }

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
    router.push({
      name: '{routeDetailName}',
    })
  }
  else {
    formModeProps.value.id = ''
    if (formMode.value === 'modal') {
      updateModal({
        title: '新增{cname}',
      })
      openModal()
    }
    else {
      updateDrawer({
        title: '新增{cname}',
      })
      openDrawer()
    }
  }
}

function onEdit(row: {ModuleName}Item) {
  if (formMode.value === 'router') {
    router.push({
      name: '{routeDetailName}',
      params: {
        id: row.id,
      },
    })
  }
  else {
    formModeProps.value.id = row.id
    if (formMode.value === 'modal') {
      updateModal({
        title: '编辑{cname}',
      })
      openModal()
    }
    else {
      updateDrawer({
        title: '编辑{cname}',
      })
      openDrawer()
    }
  }
}

function onDel(row: {ModuleName}Item) {
  useFaModal().confirm({
    title: '确认信息',
    content: `确认删除「${row.{firstField}}」吗？`,
    onConfirm: () => {
      api{ModuleName}.delete(row.id).then(() => {
        getDataList()
        useFaToast().success('删除成功')
      })
    },
  })
}

function onBatchDel() {
  const rows = batch.value.selectionDataList
  if (!rows.length) {
    return
  }

  useFaModal().confirm({
    title: '确认信息',
    content: `确认删除选中的 ${rows.length} 条数据吗？`,
    onConfirm: () => {
      Promise.all(rows.map(row => api{ModuleName}.delete(row.id))).then(() => {
        getDataList()
        useFaToast().success('批量删除成功')
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
            {searchFields}
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
      <div class="mx--4 my-3 border-t border-t-dashed" />
      <FaTable
        v-loading="loading"
        table-root-class="rounded-lg overflow-hidden"
        :class="{ 'min-h-0 flex-1': tableAutoHeight }"
        row-key="id"
        selectable
        multiple
        stripe
        column-visibility
        border
        :columns="tableColumns"
        :data="dataList"
        @selection-change="batch.selectionDataList = $event"
      >
        <template #toolbar>
          <div class="flex flex-1 gap-2 items-center">
            <FaButton @click="onCreate">
              新增
            </FaButton>
            <FaDropdown
              v-if="batch.enable"
              :items="[
                [
                  { label: '批量删除', variant: 'destructive', disabled: !batch.selectionDataList.length, handle: onBatchDel },
                ],
              ]"
            >
              <FaButton variant="outline" :disabled="!batch.selectionDataList.length">
                批量操作
                <FaIcon name="i-ep:arrow-down" />
              </FaButton>
            </FaDropdown>
          </div>
        </template>
        {tableCellSlots}
        <template #cell-operation="{ row }">
          <div class="flex-center gap-2">
            <FaButton variant="outline" size="icon-sm" @click="onEdit(row.original)">
              <FaIcon name="i-ri:edit-line" />
            </FaButton>
            <FaDropdown
              :items="[
                [
                  { label: '删除', variant: 'destructive', handle: () => onDel(row.original) },
                ],
              ]"
            >
              <FaButton variant="outline" size="icon-sm">
                <FaIcon name="i-ri:more-line" />
              </FaButton>
            </FaDropdown>
          </div>
        </template>
      </FaTable>
      <FaPagination :page="pagination.page" :size="pagination.size" :total="pagination.total" class="mt-2" @page-change="currentChange" @size-change="sizeChange" />
    </FaPageMain>
  </div>
</template>
```

业务页面保持简洁标题即可，不要在 `FaPageHeader #description` 中加入解释技能或模板来源的说明文字。

---

## detail.vue 模板（router 模式）

```vue
<script setup lang="ts">
import eventBus from '@/utils/eventBus'
import DetailForm from './components/DetailForm/index.vue'

defineOptions({
  name: '{componentNameDetail}',
})

const route = useRoute()
const router = useRouter()

const appPage = useAppPage()

onMounted(() => {
  appPage.setCustomTitle(route.params.id ? '编辑' : '新增')
})
onUnmounted(() => {
  appPage.resetCustomTitle()
})

const formRef = useTemplateRef('formRef')

function onSubmit() {
  formRef.value?.submit().then((success) => {
    if (!success) {
      return
    }

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
      <div class="max-w-4xl w-full">
        <DetailForm :id="route.params.id as string" ref="formRef" />
      </div>
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
import type { FormExpose } from '@fantastic-admin/components'
import { ref } from 'vue'
import api{ModuleName} from '@/api/modules/{fileName}'

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
const formRef = useTemplateRef<FormExpose>('formRef')

interface DetailFormModel {
  id: number | string
  {formModelTypes}
}

const model = ref<DetailFormModel>({
  id: props.id,
  {formInitialValues}
})

const validationSchema = {
  {formValidationSchema}
}

onMounted(() => {
  if (model.value.id !== '') {
    getInfo()
  }
})

function getInfo() {
  loading.value = true
  api{ModuleName}.detail(model.value.id).then((res: any) => {
    loading.value = false
    {formAssign}
  }).catch(() => {
    loading.value = false
  })
}

async function submit() {
  const result = await formRef.value?.validate()

  if (!result?.valid) {
    return false
  }

  if (model.value.id === '') {
    await api{ModuleName}.create(model.value)
    useFaToast().success('新增成功')
  }
  else {
    await api{ModuleName}.edit(model.value)
    useFaToast().success('编辑成功')
  }

  return true
}

defineExpose({
  submit,
})
</script>

<template>
  <div v-loading="loading">
    <FaForm
      ref="formRef"
      :model="model"
      :validation-schema="validationSchema"
      label-placement="right"
      :label-width="120"
    >
      {formFields}
    </FaForm>
  </div>
</template>
```

---

## api/modules/{fileName}.ts 模板

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
    params: {
      id,
    },
    fake: true,
  }),

  create: (data: any) => api.post('{apiPrefix}/create', data, {
    fake: true,
  }),

  edit: (data: any) => api.post('{apiPrefix}/edit', data, {
    fake: true,
  }),

  delete: (id: number | string) => api.post('{apiPrefix}/delete', {
    id,
  }, {
    fake: true,
  }),
}
```

不生成 fake mock 时，去掉所有 `fake: true` 配置，并确保接口地址与真实后端约定一致。

---

## api/fake_modules/{fileName}.fake.ts 模板

```typescript
import { faker } from '@faker-js/faker'
import { defineFakeRoute } from 'vite-plugin-fake-server/client'

// {cname}
const {moduleName}List: any[] = []
for (let i = 0; i < 50; i++) {
  {moduleName}List.push({
    id: i + 1,
    {mockFields}
  })
}

export default defineFakeRoute([
  {
    url: '/fake/{apiPrefix}/list',
    method: 'get',
    response: ({ query }) => {
      const { {searchQueryFields}, from, limit } = query
      const list = {moduleName}List.filter((item) => {
        return {searchFilterExpression}
      })
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
      return {
        error: '',
        status: 1,
        data: {
          isSuccess: true,
        },
      }
    },
  },
  {
    url: '/fake/{apiPrefix}/edit',
    method: 'post',
    response: () => {
      return {
        error: '',
        status: 1,
        data: {
          isSuccess: true,
        },
      }
    },
  },
  {
    url: '/fake/{apiPrefix}/delete',
    method: 'post',
    response: () => {
      return {
        error: '',
        status: 1,
        data: {
          isSuccess: true,
        },
      }
    },
  },
])
```

如果有多个搜索字段，可以用 `&&` 组合过滤条件：

```typescript
return (title ? item.title.includes(title) : true)
  && (status !== undefined && status !== '' ? item.status === ~~status : true)
```

---

## router/modules/{routeFileName}.ts 模板

```typescript
import type { RouteRecordRaw } from 'vue-router'
import { $t } from '@/locales'

function Layout() {
  return import('@/layouts/index.vue')
}

const routes: RouteRecordRaw = {
  path: '{routePath}',
  component: Layout,
  name: '{routeRootName}',
  meta: {
    title: '{routeTitle}',
    icon: '{icon}',
  },
  children: [
    {
      path: '',
      name: '{routeListName}',
      component: () => import('@/views/{viewPath}/list.vue'),
      meta: {
        title: '{cname}列表',
        menu: false,
        breadcrumb: false,
        keepAlive: '{routeDetailName}',
      },
    },
    {
      path: 'detail/:id?',
      name: '{routeDetailName}',
      component: () => import('@/views/{viewPath}/detail.vue'),
      meta: {
        title: '...',
        menu: false,
        activeMenu: '{routePath}',
        keepAlive: true,
        noKeepAlive: '{routeListName}',
      },
    },
  ],
}

export default routes
```

`modal` / `drawer` 模式不需要详情路由，列表路由也不需要 `keepAlive: '{routeDetailName}'`。

---

## 字段生成规则

### TypeScript item 字段

```typescript
title: string
status: number
createdAt: string
```

### 搜索默认值和查询参数

```typescript
const searchDefault = {
  title: '',
  status: '',
}

const params = {
  ...getParams(),
  ...(search.value.title && { title: search.value.title }),
  ...(search.value.status !== '' && { status: search.value.status }),
}
```

### 搜索栏字段

首个主要搜索字段直接显示，次要搜索条件使用 `v-show="!fold"`：

```vue
<FaLabel label="{label}" class="col-span-1">
  <FaInput
    v-model="search.{field}"
    placeholder="请输入{label}，支持模糊查询"
    clearable
    class="w-full"
    @keydown.enter="currentChange()"
    @clear="currentChange()"
  />
</FaLabel>
```

### FaTable 列

普通字段：

```typescript
{
  accessorKey: '{field}',
  header: '{label}',
},
```

需要自定义展示的字段使用 `id`，并在模板里添加 `#cell-{id}` 插槽：

```typescript
{
  id: 'status',
  header: '状态',
  width: 100,
  align: 'center',
},
```

```vue
<template #cell-status="{ row }">
  <FaBadge :variant="row.original.status ? 'default' : 'secondary'">
    {{ row.original.status ? '启用' : '停用' }}
  </FaBadge>
</template>
```

### 表单字段

```vue
<FaFormItem name="{field}" label="{label}" required>
  <FaInput placeholder="请输入{label}" class="w-full" />
</FaFormItem>
```

`FaFormItem` 会自动向第一个子控件注入 `modelValue` 和 `onUpdate:modelValue`，不要再手写
`v-model="model.{field}"` 或 `v-model="model.value.{field}"`。

### 表单 model 类型字段

```typescript
{field}: string
status: number
enabled: boolean
```

### 表单初始值

```typescript
{field}: '',
status: 0,
enabled: true,
```

### 表单详情赋值

```typescript
model.value.{field} = res.data.{field}
```

### 表单验证 schema

文本输入：

```typescript
{field}(value: string) {
  return value?.trim() ? true : '请输入{label}'
},
```

选择、开关、日期：

```typescript
{field}(value: string | number | boolean | undefined) {
  return value !== undefined && value !== '' ? true : '请选择{label}'
},
```

非必填字段不要生成 validation schema 项；生成必填字段时，在对应 `FaFormItem` 上同时加
`required`。

### Mock 数据字段映射

| 字段类型/含义 | faker 方法 |
|---------------|------------|
| 标题 | `faker.book.title()` 或 `faker.lorem.words(3)` |
| 名称 | `faker.person.fullName()` 或 `faker.commerce.productName()` |
| 用户名 | `faker.internet.username()` |
| 手机号 | `faker.phone.number()` |
| 邮箱 | `faker.internet.email()` |
| 描述 | `faker.lorem.sentence()` |
| 数量 | `faker.number.int({ min: 1, max: 100 })` |
| 金额 | `faker.number.float({ min: 10, max: 9999, fractionDigits: 2 })` |
| 布尔状态 | `faker.datatype.boolean()` |
| 枚举状态 | `faker.helpers.arrayElement([0, 1, 2])` |
| 日期 | `faker.date.recent().toISOString()` |

### Mock 搜索过滤

字符串模糊匹配：

```typescript
title ? item.title.includes(title) : true
```

数字/枚举精确匹配。注意 query 参数是字符串，`0` 不能用普通 truthy 判断：

```typescript
status !== undefined && status !== '' ? item.status === ~~status : true
```

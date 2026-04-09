<script setup lang="ts">
import apiStandardModule from '@/api/modules/standardModule'
import eventBus from '@/utils/eventBus'
import DetailForm from './components/DetailForm/index.vue'

defineOptions({
  name: 'PagesExampleFormModeList',
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
const formMode = ref<'router' | 'modal' | 'drawer'>('router')

// 详情
const formModeProps = ref({
  id: '',
})

// 搜索
const searchDefault = {
  title: '',
  title2: '',
  title3: '',
  title4: '',
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
    ...(search.value.title && { title: search.value.title }),
  }
  apiStandardModule.list(params).then((res: any) => {
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
    router.push({
      name: 'standardModuleExampleDetail',
    })
  }
  else {
    formModeProps.value.id = ''
    if (formMode.value === 'modal') {
      updateModal({
        title: '新增标准模块',
      })
      openModal()
    }
    else {
      updateDrawer({
        title: '新增标准模块',
      })
      openDrawer()
    }
  }
}

function onEdit(row: any) {
  if (formMode.value === 'router') {
    router.push({
      name: 'standardModuleExampleDetail',
      params: {
        id: row.id,
      },
    })
  }
  else {
    formModeProps.value.id = row.id
    if (formMode.value === 'modal') {
      updateModal({
        title: '编辑标准模块',
      })
      openModal()
    }
    else {
      updateDrawer({
        title: '编辑标准模块',
      })
      openDrawer()
    }
  }
}

function onDel(row: any) {
  useFaModal().confirm({
    title: '确认信息',
    content: `确认删除「${row.title}」吗？`,
    onConfirm: () => {
      apiStandardModule.delete(row.id).then(() => {
        getDataList()
        faToast.success('删除成功')
      })
    },
  })
}
</script>

<template>
  <div :class="{ 'absolute flex flex-col size-full': tableAutoHeight }">
    <FaPageHeader title="标准模块管理" class="mb-0">
      <template #description>
        <div class="space-y-3">
          <p>
            标准模块即包含 CRUD（增查改删）操作的基础模块，可通过
            <FaKbd>
              fa-crud-page-generator
            </FaKbd>
            skill 或直接参考本模块的代码，快速生成一个标准模块，并在此基础上完善业务模块所需要的功能。
          </p>
          <div class="space-y-3">
            <div class="flex gap-3 items-center">
              <span class="shrink-0">特性1：列表展示模式</span>
              <FaButtonGroup>
                <FaButton :variant="!tableAutoHeight ? 'default' : 'outline'" @click="tableAutoHeight = false">
                  默认
                </FaButton>
                <FaButton :variant="tableAutoHeight ? 'default' : 'outline'" @click="tableAutoHeight = true">
                  列表高度自适应
                </FaButton>
              </FaButtonGroup>
            </div>
            <div class="flex gap-3 items-center">
              <span class="shrink-0">特性2：表单展示模式</span>
              <FaButtonGroup>
                <FaButton :variant="formMode === 'router' ? 'default' : 'outline'" @click="formMode = 'router'">
                  路由跳转
                </FaButton>
                <FaButton :variant="formMode === 'modal' ? 'default' : 'outline'" @click="formMode = 'modal'">
                  对话框
                </FaButton>
                <FaButton :variant="formMode === 'drawer' ? 'default' : 'outline'" @click="formMode = 'drawer'">
                  抽屉
                </FaButton>
              </FaButtonGroup>
            </div>
          </div>
        </div>
      </template>
    </FaPageHeader>
    <FaPageMain :class="{ 'flex-1 overflow-auto': tableAutoHeight }" :main-class="{ 'flex-1 flex flex-col overflow-auto': tableAutoHeight }">
      <FaSearchBar :show-toggle="false">
        <template #default="{ fold, toggle }">
          <div class="gap-x-8 gap-y-2 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            <FaLabel label="标题" class="col-span-1">
              <FaInput
                v-model="search.title"
                placeholder="请输入标题，支持模糊查询"
                clearable
                class="w-full"
                @keydown.enter="currentChange()"
                @clear="currentChange()"
              />
            </FaLabel>
            <FaLabel v-show="!fold" label="标题2" class="col-span-1">
              <FaInput
                v-model="search.title2"
                placeholder="请输入标题，支持模糊查询"
                clearable
                class="w-full"
                @keydown.enter="currentChange()"
                @clear="currentChange()"
              />
            </FaLabel>
            <FaLabel v-show="!fold" label="标题3" class="col-span-1">
              <FaInput
                v-model="search.title3"
                placeholder="请输入标题，支持模糊查询"
                clearable
                class="w-full"
                @keydown.enter="currentChange()"
                @clear="currentChange()"
              />
            </FaLabel>
            <FaLabel v-show="!fold" label="标题4" class="col-span-1">
              <FaInput
                v-model="search.title4"
                placeholder="请输入标题，支持模糊查询"
                clearable
                class="w-full"
                @keydown.enter="currentChange()"
                @clear="currentChange()"
              />
            </FaLabel>
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
        <ElTableColumn prop="title" label="标题" />
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

# 页面优化模式

本文档展示如何用框架内建组件替换常见的自定义代码和原生 HTML 实现。

## 基础元素替换

### 按钮优化

**优化前**:
```vue
<button class="btn btn-primary" @click="handleClick">
  提交
</button>

<button class="custom-button" :disabled="loading">
  <span v-if="loading">加载中...</span>
  <span v-else>提交</span>
</button>
```

**优化后**:
```vue
<FaButton @click="handleClick">
  提交
</FaButton>

<FaButton :loading="loading">
  提交
</FaButton>
```

### 输入框优化

**优化前**:
```vue
<div class="form-group">
  <input
    v-model="username"
    type="text"
    class="form-control"
    placeholder="请输入用户名"
  >
</div>
```

**优化后**:
```vue
<FaInput v-model="username" placeholder="请输入用户名" />
```

### 卡片容器优化

**优化前**:
```vue
<div class="card">
  <div class="card-header">
    <h3>卡片标题</h3>
    <p class="text-muted">卡片描述</p>
  </div>

  <div class="card-body">
    卡片内容
  </div>

  <div class="card-footer">
    底部内容
  </div>
</div>
```

**优化后**:
```vue
<FaCard title="卡片标题" description="卡片描述">
  卡片内容
  <template #footer>
    底部内容
  </template>
</FaCard>
```

## 交互组件替换

### 模态对话框优化

**优化前**:
```vue
<script setup>
const visible = ref(false)
const title = ref('')
const content = ref('')

function handleClose() {
  visible.value = false
}

function handleConfirm() {
  // 确认逻辑
  visible.value = false
}
</script>

<template>
  <div v-if="visible" class="modal-overlay" @click="handleClose">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>{{ title }}</h3>
        <button class="close-btn" @click="handleClose">
          ×
        </button>
      </div>
      <div class="modal-body">
        {{ content }}
      </div>
      <div class="modal-footer">
        <button @click="handleClose">
          取消
        </button>
        <button @click="handleConfirm">
          确定
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
/* 更多样式... */
</style>
```

**优化后**:
```vue
<script setup>
const modal = ref(false)
</script>

<template>
  <FaButton @click="modal = true">
    打开对话框
  </FaButton>
  <FaModal v-model="modal" title="标题">
    内容
  </FaModal>
</template>
```

### 分页组件优化

**优化前**:
```vue
<script setup>
const page = ref(1)
const size = ref(10)
const total = ref(100)
const totalPages = computed(() => Math.ceil(total.value / size.value))
</script>

<template>
  <div class="pagination">
    <button :disabled="page === 1" @click="page--">
      上一页
    </button>
    <span>{{ page }} / {{ totalPages }}</span>
    <button :disabled="page === totalPages" @click="page++">
      下一页
    </button>
  </div>
</template>
```

**优化后**:
```vue
<FaPagination :page="page" :size="size" :total="total" />

<script setup>
const page = ref(1)
const size = ref(10)
const total = ref(100)
</script>
```

## 反馈组件替换

### 加载状态优化

**优化前**:
```vue
<div v-if="loading" class="loading-overlay">
  <div class="spinner">
</div>

  <p>
加载中...
</p>
</div>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}
.spinner {
  /* 自定义动画 */
}
</style>
```

**优化后**:
```vue
<script setup>
import { useFaLoading } from '@/ui/components/FaLoading'

async function fetchData() {
  const { close } = useFaLoading()
  try {
    await api.getData()
  }
  finally {
    close()
  }
}
</script>
```

### 空状态优化

**优化前**:
```vue
<div v-if="list.length === 0" class="empty-state">
  <img src="/empty.png" alt="空状态">
  <p>暂无数据</p>
</div>
```

**优化后**:
```vue
<FaEmpty v-if="list.length === 0" description="暂无数据" />
```

### 消息提示优化

**优化前**:
```vue
<script setup>
function showMessage(message: string) {
  alert(message)
}

// 或自定义实现
const messages = ref<string[]>([])
function showMessage(message: string) {
  messages.value.push(message)
  setTimeout(() => {
    messages.value.shift()
  }, 3000)
}
</script>
```

**优化后**:
```vue
<script setup>
import { useFaToast } from '@/ui/components/FaToast'

const toast = useFaToast()

function showMessage(message: string) {
  toast.success(message)
}
</script>
```

## 表单组件替换

### 复选框优化

**优化前**:
```vue
<label class="checkbox-wrapper">
  <input v-model="checked" type="checkbox">
  <span>同意协议</span>
</label>
```

**优化后**:
```vue
<FaCheckbox v-model="checked">
  同意协议
</FaCheckbox>
```

### 开关优化

**优化前**:
```vue
<div class="switch-wrapper">
  <input
    v-model="enabled"
    type="checkbox"
    class="switch-input"
  >
  <span class="switch-slider"></span>
</div>

<style scoped>
.switch-wrapper {
  /* 自定义开关样式 */
}
</style>
```

**优化后**:
```vue
<FaSwitch v-model="enabled" />
```

### 下拉选择优化

**优化前**:
```vue
<select v-model="selected" class="form-select">
  <option value="">请选择</option>
  <option v-for="item in options" :key="item.value" :value="item.value">
    {{ item.label }}
  </option>
</select>
```

**优化后**:
```vue
<FaSelect v-model="selected" :options="options" placeholder="请选择" />
```

### 级联选择优化

**优化前**:
```vue
<script setup>
// 自定义多级联动下拉：需要手动管理每一层的选中状态
const province = ref('')
const city = ref('')
const district = ref('')
const cities = computed(() => getCities(province.value))
const districts = computed(() => getDistricts(city.value))
</script>

<template>
  <select v-model="province">
    <option v-for="p in provinces" :key="p.value" :value="p.value">{{ p.label }}</option>
  </select>
  <select v-model="city" :disabled="!province">
    <option v-for="c in cities" :key="c.value" :value="c.value">{{ c.label }}</option>
  </select>
  <select v-model="district" :disabled="!city">
    <option v-for="d in districts" :key="d.value" :value="d.value">{{ d.label }}</option>
  </select>
</template>
```

**优化后**:
```vue
<script setup>
const selected = ref<string | undefined>()

const options = [
  {
    label: '浙江省', value: 'zj',
    children: [
      {
        label: '杭州市', value: 'hz',
        children: [
          { label: '西湖区', value: 'xh' },
          { label: '余杭区', value: 'yh' },
        ],
      },
    ],
  },
]
</script>

<template>
  <FaCascader v-model="selected" :options="options" placeholder="请选择地区" clearable />
</template>
```

## 数据展示优化

### 标签页优化

**优化前**:
```vue
<script setup>
const activeTab = ref('tab1')
const tabs = [
  { key: 'tab1', label: '标签1' },
  { key: 'tab2', label: '标签2' },
]
</script>

<template>
  <div class="tabs">
    <div class="tab-headers">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        :class="{ active: activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </div>
    </div>
    <div class="tab-content">
      <div v-if="activeTab === 'tab1'">
        内容1
      </div>
      <div v-if="activeTab === 'tab2'">
        内容2
      </div>
    </div>
  </div>
</template>
```

**优化后**:
```vue
<FaTabs v-model="activeTab" :tabs="tabs">
  <template #tab1>内容1</template>
  <template #tab2>内容2</template>
</FaTabs>

<script setup>
const activeTab = ref('tab1')
const tabs = [
  { key: 'tab1', label: '标签1' },
  { key: 'tab2', label: '标签2' },
]
</script>
```

### 头像显示优化

**优化前**:
```vue
<div class="avatar">
  <img v-if="user.avatar" :src="user.avatar" alt="头像">
  <span v-else class="avatar-fallback">{{ user.name[0] }}</span>
</div>

<style scoped>
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}
</style>
```

**优化后**:
```vue
<FaAvatar :src="user.avatar" :alt="user.name" />
```

## 特效组件应用

### 卡片特效增强

**优化前**:
```vue
<div class="card">
  <!-- 普通卡片 -->
</div>
```

**优化后**:
```vue
<!-- 添加发光效果 -->
<FaGlowyCard>
  <!-- 卡片内容 -->
</FaGlowyCard>

<!-- 添加聚光灯效果 -->
<FaSpotlightCard>
  <!-- 卡片内容 -->
</FaSpotlightCard>

<!-- 添加边框光束 -->
<FaCard>
  <FaBorderBeam />
  <!-- 卡片内容 -->
</FaCard>
```

### 文字特效增强

**优化前**:
```vue
<h1 class="title">
欢迎使用
</h1>
```

**优化后**:
```vue
<!-- 添加闪光效果 -->
<FaSparklesText text="欢迎使用" />

<!-- 添加高亮效果 -->
<FaTextHighlight>
欢迎使用
</FaTextHighlight>

<!-- 添加翻转效果 -->
<FaFlipWords :words="['欢迎', 'Welcome', 'Bienvenue']" />
```

## 布局优化

### 页面结构优化

**优化前**:
```vue
<template>
  <div class="page">
    <div class="page-header">
      <h1>页面标题</h1>
      <div class="actions">
        <button>操作</button>
      </div>
    </div>
    <div class="page-content">
      <!-- 内容 -->
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}
.page-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
```

**优化后**:
```vue
<template>
  <FaPageHeader title="页面标题">
    <template #actions>
      <FaButton>操作</FaButton>
    </template>
  </FaPageHeader>
  <FaPageMain>
    <!-- 内容 -->
  </FaPageMain>
</template>
```

## 优化原则

1. **优先使用框架组件**: 检查 `src/ui/components/` 是否有对应的内建组件
2. **参考组件源码**: 查看组件实现了解使用方式和 API
3. **保持功能一致**: 确保替换后的组件功能与原代码一致
4. **简化代码**: 移除不必要的自定义样式和逻辑
5. **统一风格**: 使用框架组件可以保持整个应用的视觉一致性
6. **提升可维护性**: 框架组件有统一的 API 和文档，更易维护

## 常见场景映射

| 场景       | 原实现                 | 框架组件                      |
| ---------- | ---------------------- | ----------------------------- |
| 用户列表   | 自定义表格 + 分页      | FaCard + FaPagination         |
| 表单提交   | 原生 form + input      | FaInput + FaButton + FaModal  |
| 数据加载   | 自定义 loading         | FaLoading                     |
| 错误提示   | alert / 自定义 toast   | FaToast                       |
| 确认对话框 | confirm / 自定义 modal | FaModal (useFaModal)          |
| 图片上传   | 自定义上传组件         | FaImageUpload                 |
| 搜索功能   | input + 搜索逻辑       | FaSearchBar                   |
| 级联选择   | 多级联动 select        | FaCascader                    |
| 数据统计   | 自定义数字展示         | FaCountTo / FaAnimatedCountTo |
| 趋势展示   | 自定义图表             | FaSparkline + FaTrend         |
| 时间显示   | 自定义格式化           | FaTimeAgo                     |

# FaPasswordStrength 密码强度组件

实时显示密码强度指示，帮助用户创建更安全的密码。

## 使用场景

- 用户注册密码设置
- 修改密码页面
- 重置密码表单
- 账号安全设置
- 密码强度要求提示

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `password` | `string` | `''` | 密码值 |

## 示例

### 基础用法

```vue
<script setup lang="ts">
const password = ref('')
</script>

<template>
  <div>
    <FaInput v-model="password" type="password" placeholder="请输入密码" />
    <FaPasswordStrength :password="password" class="mt-2" />
  </div>
</template>
```

### 基础密码强度

```vue
<script setup lang="ts">
const password = ref('')
</script>

<template>
  <div class="space-y-2">
    <FaInput v-model="password" type="password" placeholder="请输入密码" />
    <FaPasswordStrength :password="password" />
  </div>
</template>
```

### 注册表单

```vue
<script setup lang="ts">
const form = ref({
  password: '',
  confirmPassword: '',
})
</script>

<template>
  <form class="space-y-4">
    <div>
      <FaLabel label="密码">
        <FaInput v-model="form.password" type="password" placeholder="请输入密码" />
      </FaLabel>
      <FaPasswordStrength :password="form.password" class="mt-2" />
    </div>
    <FaInput 
      v-model="form.confirmPassword" 
      type="password" 
      placeholder="确认密码" 
    />
  </form>
</template>
```

### 密码修改

```vue
<script setup lang="ts">
const form = ref({
  oldPassword: '',
  newPassword: '',
})

function handleChangePassword() {
  // 修改密码逻辑
}
</script>

<template>
  <FaCard title="修改密码">
    <div class="space-y-4">
      <FaInput 
        v-model="form.oldPassword" 
        type="password" 
        placeholder="当前密码" 
      />
      <div>
        <FaInput 
          v-model="form.newPassword" 
          type="password" 
          placeholder="新密码" 
        />
        <FaPasswordStrength :password="form.newPassword" class="mt-2" />
      </div>
      <FaButton @click="handleChangePassword">确认修改</FaButton>
    </div>
  </FaCard>
</template>
```

### 带验证规则提示

```vue
<script setup lang="ts">
const { t } = useI18n()
const password = ref('')

const rules = computed(() => [
  { text: t('hasLength'), met: password.value.length >= 8 },
  { text: t('hasUppercase'), met: /[A-Z]/.test(password.value) },
  { text: t('hasLowercase'), met: /[a-z]/.test(password.value) },
  { text: t('hasNumber'), met: /\d/.test(password.value) },
  { text: t('hasSpecialChar'), met: /[^A-Z0-9]/i.test(password.value) },
])
</script>

<template>
  <div class="space-y-4">
    <FaInput v-model="password" type="password" placeholder="请输入密码" />
    <FaPasswordStrength :password="password" />
    
    <div class="text-sm space-y-1">
      <div 
        v-for="(rule, index) in rules" 
        :key="index"
        class="flex items-center gap-2"
        :class="rule.met ? 'text-green-600' : 'text-muted-foreground'"
      >
        <FaIcon :name="rule.met ? 'i-lucide:check-circle' : 'i-lucide:circle'" class="size-4" />
        {{ rule.text }}
      </div>
    </div>
  </div>
</template>
```

### 强度指示器样式

```vue
<script setup lang="ts">
const password = ref('')

const strengthTips = [
  '非常弱',
  '弱',
  '一般',
  '强',
  '非常强',
]

const strength = computed(() => {
  let score = 0
  if (password.value.length >= 8) score++
  if (/[A-Z]/.test(password.value)) score++
  if (/[a-z]/.test(password.value)) score++
  if (/\d/.test(password.value)) score++
  if (/[^A-Z0-9]/i.test(password.value)) score++
  return score
})
</script>

<template>
  <div class="space-y-2">
    <FaInput v-model="password" type="password" placeholder="请输入密码" />
    <div class="flex items-center gap-2">
      <FaPasswordStrength :password="password" class="flex-1" />
      <span class="text-xs text-muted-foreground">
        {{ strengthTips[strength - 1] || '' }}
      </span>
    </div>
  </div>
</template>
```

## 注意事项

### 强度规则

密码强度根据以下规则计算（满分 5 分）：

1. 长度至少 8 个字符
2. 包含大写字母
3. 包含小写字母
4. 包含数字
5. 包含特殊字符

1. **实时反馈**：密码强度会随输入实时更新
2. **颜色指示**：
   - 红色：非常弱（0 分）
   - 橙色：弱（1-2 分）
   - 黄色：一般（3-4 分）
   - 绿色：强（5 分）
3. **提示工具**：鼠标悬停问号图标查看详细建议
4. **国际化**：组件内置多语言支持

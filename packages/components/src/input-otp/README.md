# FaInputOTP 验证码输入组件

用于输入短信验证码、邮箱验证码等一次性密码的输入组件。

## 使用场景

- 短信验证码输入
- 邮箱验证码验证
- 双重身份验证（2FA）
- 登录保护验证
- 支付密码验证
- 敏感操作确认

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `length` | `number` | `6` | 验证码位数 |

### Model

| 名称 | 类型 | 说明 |
|------|------|------|
| `modelValue` | `string` | 输入的验证码 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `complete` | - | 验证码输入完成时触发 |

## 示例

### 基础用法

```vue
<script setup lang="ts">
const code = ref('')
</script>

<template>
  <FaInputOTP v-model="code" />
</template>
```

### 基础验证码输入

```vue
<script setup lang="ts">
const code = ref('')
</script>

<template>
  <FaInputOTP v-model="code" />
</template>
```

### 4 位验证码

```vue
<script setup lang="ts">
const code = ref('')
</script>

<template>
  <FaInputOTP v-model="code" :length="4" />
</template>
```

### 监听输入完成

```vue
<script setup lang="ts">
const code = ref('')

function handleComplete() {
  console.log('验证码输入完成:', code.value)
  // 自动提交验证
  verifyCode(code.value)
}
</script>

<template>
  <FaInputOTP v-model="code" @complete="handleComplete" />
</template>
```

### 验证码表单

```vue
<script setup lang="ts">
import { toast } from 'vue-sonner'

const code = ref('')
const sending = ref(false)
const countdown = ref(0)

function sendCode() {
  if (countdown.value > 0) return
  sending.value = true
  // 发送验证码 API
  setTimeout(() => {
    sending.value = false
    countdown.value = 60
    const timer = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) clearInterval(timer)
    }, 1000)
    toast.success('验证码已发送')
  }, 1000)
}

function handleComplete() {
  // 验证验证码
  console.log('验证:', code.value)
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex gap-2">
      <FaInput placeholder="手机号" class="flex-1" />
      <FaButton :disabled="countdown > 0" :loading="sending" @click="sendCode">
        {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
      </FaButton>
    </div>
    <FaInputOTP v-model="code" @complete="handleComplete" />
  </div>
</template>
```

### 邮箱验证

```vue
<script setup lang="ts">
const email = ref('')
const code = ref('')

function handleComplete() {
  // 验证邮箱验证码
  console.log('邮箱验证:', email.value, code.value)
}
</script>

<template>
  <div class="space-y-4">
    <FaInput v-model="email" type="email" placeholder="邮箱地址" />
    <div>
      <p class="text-sm text-muted-foreground mb-2">请输入发送到 {{ email }} 的验证码</p>
      <FaInputOTP v-model="code" @complete="handleComplete" />
    </div>
  </div>
</template>
```

### 密码保护验证

```vue
<script setup lang="ts">
const code = ref('')

function handleComplete() {
  // 验证成功后执行敏感操作
  console.log('验证通过，执行操作')
}
</script>

<template>
  <FaCard title="安全验证">
    <p class="text-muted-foreground mb-4">为了您的账号安全，请输入验证码继续操作</p>
    <FaInputOTP v-model="code" @complete="handleComplete" />
  </FaCard>
</template>
```

## 注意事项

1. **自动聚焦**：组件会自动聚焦到第一个输入框
2. **自动跳转**：输入数字后自动跳转到下一个输入框
3. **粘贴支持**：支持粘贴验证码，会自动分配到各个输入框
4. **退格支持**：按退格键自动删除并跳转到前一个输入框
5. **完成事件**：输入位数达到 `length` 时自动触发 `complete` 事件

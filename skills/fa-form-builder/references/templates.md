# 表单页面代码模板

使用 FaForm/FaFormItem + vee-validate + zod 验证。

占位符说明：
- `{cname}` — 模块中文名
- `{componentName}` — 组件名（PascalCase）
- `{zodSchema}` — zod 字段定义
- `{initialValues}` — `model` 表单初始值
- `{formItems}` — FaFormItem 列表
- `{imports}` — 需要手动 import 的组件
- `{maxWidth}` — 单列 `max-w-600px` / 双列 `max-w-1200px`
- `{gridClass}` — 双列时 `grid grid-cols-1 gap-x-8 gap-y-6 items-start md:grid-cols-2` / 单列时 `grid gap-6`

---

## index.vue 模板

```vue
<script setup lang="ts">
import type { FormExpose } from '@fantastic-admin/components'
import { toTypedSchema } from '@vee-validate/zod'
import { ref } from 'vue'
import * as z from 'zod'
{imports}

defineOptions({
  name: '{componentName}',
})

const router = useRouter()

const formRef = useTemplateRef<FormExpose>('formRef')
const loading = ref(false)

const model = ref({
  {initialValues}
})

const validationSchema = toTypedSchema(z.object({
  {zodSchema}
}))

async function onSubmit(values: typeof model.value) {
  loading.value = true
  try {
    // TODO: 调用 API，如 apiXxx.create(values) 或 apiXxx.edit(values)
  }
  finally {
    loading.value = false
  }
}

async function submit() {
  await formRef.value?.submit()
}

function handleCancel() {
  router.back()
}
</script>

<template>
  <div>
    <FaPageHeader title="{cname}" />
    <FaPageMain>
      <div v-loading="loading" class="mx-auto {maxWidth}">
        <FaForm
          ref="formRef"
          :model="model"
          :validation-schema="validationSchema"
          class="{gridClass}"
          @submit="onSubmit"
        >
          {formItems}
        </FaForm>
      </div>
    </FaPageMain>
    <FaFixedBar position="bottom" class="flex gap-2 justify-center">
      <FaButton type="button" variant="outline" @click="handleCancel">
        取消
      </FaButton>
      <FaButton type="button" :loading="loading" @click="submit">
        提交
      </FaButton>
    </FaFixedBar>
  </div>
</template>
```

---

## 各字段类型的 FaFormItem 片段

```vue
<!-- FaInput（文本） -->
<FaFormItem name="{field}" label="{label}" required>
  <FaInput placeholder="请输入{label}" class="w-full" />
</FaFormItem>

<!-- FaInput（密码）+ FaPasswordStrength -->
<FaFormItem name="{field}" label="{label}" required>
  <FaInput type="password" placeholder="请输入{label}" class="w-full" />
  <template #description="{ value }">
    <FaPasswordStrength :password="(value as string) ?? ''" />
  </template>
</FaFormItem>

<!-- FaTextarea -->
<FaFormItem name="{field}" label="{label}" required>
  <FaTextarea placeholder="请输入{label}" class="w-full" />
</FaFormItem>

<!-- FaSelect -->
<FaFormItem name="{field}" label="{label}" required>
  <FaSelect :options="{field}Options" placeholder="请选择{label}" class="w-full" />
</FaFormItem>
<!-- script 中同时生成 options 占位：const {field}Options = ref([{ label: '选项1', value: 1 }]) -->

<!-- FaSwitch -->
<FaFormItem name="{field}" label="{label}">
  <FaSwitch />
</FaFormItem>

<!-- FaCheckbox（多选，手动维护数组） -->
<FaFormItem name="{field}" label="{label}">
  <template #default="{ value, setValue }">
    <div class="flex flex-wrap gap-4">
      <FaCheckbox
        v-for="opt in {field}Options"
        :key="opt.value"
        :model-value="((value as string[] | undefined) ?? []).includes(opt.value)"
        @update:model-value="(checked) => setValue(checked ? [...((value as string[] | undefined) ?? []), opt.value] : ((value as string[] | undefined) ?? []).filter(v => v !== opt.value))"
      >
        {{ opt.label }}
      </FaCheckbox>
    </div>
  </template>
</FaFormItem>
<!-- script 中同时生成 options 占位：const {field}Options = [{ label: '选项1', value: '1' }] -->

<!-- 日期 -->
<FaFormItem name="{field}" label="{label}" required>
  <FaInput type="date" class="w-full" />
</FaFormItem>

<!-- 日期时间 -->
<FaFormItem name="{field}" label="{label}" required>
  <FaInput type="datetime-local" class="w-full" />
</FaFormItem>

<!-- FaImageUpload -->
<FaFormItem name="{field}" label="{label}" required>
  <FaImageUpload action="/upload/image" />
</FaFormItem>

<!-- FaFileUpload -->
<FaFormItem name="{field}" label="{label}" required>
  <FaFileUpload action="/upload/file" />
</FaFormItem>

<!-- FaIconPicker -->
<FaFormItem name="{field}" label="{label}">
  <FaIconPicker />
</FaFormItem>

<!-- FaNumberField -->
<FaFormItem name="{field}" label="{label}" required>
  <FaNumberField class="w-full" />
</FaFormItem>

<!-- 双列布局中需要占满整行的字段，加 md:col-span-2 -->
<!-- <FaFormItem name="{field}" label="{label}" class="md:col-span-2"> -->
```

`FaFormItem` 会自动向第一个子控件注入 `modelValue` 和 `onUpdate:modelValue`，默认不要手写
`v-model`。只有多选、组合控件等非单一控件场景，才使用 slot props 手动调用 `setValue`。

---

## zod 验证规则片段

```typescript
// 必填文本
{field}: z.string().min(1, '请输入{label}'),

// 必填文本 + 最大长度
{field}: z.string().min(1, '请输入{label}').max(50, '最多50个字符'),

// 必填数字（最小值）
{field}: z.number({ message: '请输入{label}' }).min(0.01, '最小值为0.01'),

// 必填选择（string）
{field}: z.string().min(1, '请选择{label}'),

// 必填选择（number）
{field}: z.number({ message: '请选择{label}' }),

// 布尔（开关，非必填）
{field}: z.boolean(),

// 数组（多选，非必填）
{field}: z.array(z.string()),

// 图片上传（string[]，必填至少一张）
{field}: z.array(z.string()).min(1, '请上传{label}'),

// 非必填文本
{field}: z.string().optional(),
```

---

## 组件导入说明

Fantastic-admin 应用默认通过组件解析器自动导入 `Fa*` 组件，通常不需要手动 import。
只有目标应用未启用自动导入或组件解析器缺少对应组件时，才按该应用本地约定补充 import。

---

## 字段类型映射表

根据用户描述的关键词选择对应组件：

| 用户描述关键词 | 生成组件 | 备注 |
|---|---|---|
| 文本、名称、标题、账号、邮箱、手机 | `FaInput` | 默认文本输入 |
| 密码 | `FaInput type="password"` | 自动添加 FaPasswordStrength |
| 多行、描述、备注、内容、简介 | `FaTextarea` | |
| 下拉、选择、类型、分类、状态（枚举值） | `FaSelect` | 生成 options 数组占位 |
| 开关、启用、禁用、是否、boolean | `FaSwitch` | |
| 复选、多选 | `FaCheckbox`（多个） | 每个选项一个 FaCheckbox，手动维护数组 |
| 日期 | `FaInput type="date"` | |
| 日期时间 | `FaInput type="datetime-local"` | |
| 图片、头像、封面、缩略图 | `FaImageUpload` | |
| 文件、附件 | `FaFileUpload` | |
| 图标 | `FaIconPicker` | |
| 数字、金额、数量、年龄 | `FaNumberField` | |

字段类型不明确时，默认使用 `FaInput`。

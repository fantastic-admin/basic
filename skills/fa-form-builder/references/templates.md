# 表单页面代码模板

使用 vee-validate + zod 验证，全部使用 Fa* 内建组件，不引入任何 Element Plus 组件。

占位符说明：
- `{cname}` — 模块中文名
- `{componentName}` — 组件名（PascalCase）
- `{zodSchema}` — zod 字段定义
- `{initialValues}` — 表单初始值
- `{formItems}` — FormField 列表
- `{imports}` — 需要手动 import 的组件
- `{maxWidth}` — 单列 `max-w-600px` / 双列 `max-w-1200px`
- `{gridClass}` — 双列时 `grid grid-cols-1 gap-x-8 gap-y-6 items-start md:grid-cols-2` / 单列时 `space-y-6`

---

## index.vue 模板

```vue
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/shadcn/ui/form'
{imports}

defineOptions({
  name: '{componentName}',
})

const router = useRouter()

const formSchema = toTypedSchema(z.object({
  {zodSchema}
}))

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: formSchema,
  initialValues: {
    {initialValues}
  },
})

const loading = ref(false)

const onSubmit = handleSubmit(async (values) => {
  // TODO: 调用 API，如 apiXxx.create(values) 或 apiXxx.edit(values)
})

function handleCancel() {
  router.back()
}
</script>

<template>
  <div>
    <FaPageHeader title="{cname}" />
    <FaPageMain>
      <div v-loading="loading" class="mx-auto {maxWidth}">
        <form class="{gridClass}" @submit="onSubmit">
          {formItems}
        </form>
      </div>
    </FaPageMain>
    <FaFixedBar position="bottom" class="flex gap-2 justify-center">
      <FaButton type="button" variant="outline" @click="handleCancel">
        取消
      </FaButton>
      <FaButton type="submit" :loading="isSubmitting" @click="onSubmit">
        提交
      </FaButton>
    </FaFixedBar>
  </div>
</template>
```

---

## 各字段类型的 FormField 片段

```vue
<!-- FaInput（文本） -->
<FormField v-slot="{ componentField }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <FaInput v-bind="componentField" placeholder="请输入{label}" class="w-full" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>

<!-- FaInput（密码）+ FaPasswordStrength -->
<FormField v-slot="{ componentField }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <div class="w-full space-y-2">
        <FaInput v-bind="componentField" type="password" placeholder="请输入{label}" class="w-full" />
        <FaPasswordStrength :model-value="componentField.modelValue" />
      </div>
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>

<!-- FaTextarea -->
<FormField v-slot="{ componentField }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <FaTextarea v-bind="componentField" placeholder="请输入{label}" class="w-full" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>

<!-- FaSelect -->
<FormField v-slot="{ componentField }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <FaSelect v-bind="componentField" :options="{field}Options" placeholder="请选择{label}" class="w-full" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>
<!-- script 中同时生成 options 占位：const {field}Options = ref([{ label: '选项1', value: 1 }]) -->

<!-- FaSwitch（componentField 会传字符串，需手动绑定 boolean） -->
<FormField v-slot="{ value, handleChange }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <FaSwitch :model-value="value" @update:model-value="handleChange" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>

<!-- FaCheckbox（多选，手动维护数组） -->
<FormField v-slot="{ value, handleChange }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <div class="flex flex-wrap gap-4">
      <FaCheckbox
        v-for="opt in {field}Options"
        :key="opt.value"
        :model-value="value?.includes(opt.value)"
        @update:model-value="(checked) => handleChange(checked ? [...(value || []), opt.value] : (value || []).filter(v => v !== opt.value))"
      >
        {{ opt.label }}
      </FaCheckbox>
    </div>
    <FormMessage />
  </FormItem>
</FormField>
<!-- script 中同时生成 options 占位：const {field}Options = [{ label: '选项1', value: '1' }] -->

<!-- 日期（原生 input） -->
<FormField v-slot="{ componentField }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <input v-bind="componentField" type="date" class="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>

<!-- FaImageUpload -->
<FormField v-slot="{ value, handleChange }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <FaImageUpload :model-value="value" action="/upload/image" @update:model-value="handleChange" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>

<!-- FaFileUpload -->
<FormField v-slot="{ value, handleChange }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <FaFileUpload :model-value="value" action="/upload/file" @update:model-value="handleChange" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>

<!-- FaIconPicker -->
<FormField v-slot="{ componentField }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <FaIconPicker v-bind="componentField" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>

<!-- FaNumberField -->
<FormField v-slot="{ value, handleChange }" name="{field}">
  <FormItem>
    <FormLabel>{label}</FormLabel>
    <FormControl>
      <FaNumberField :model-value="value" class="w-full" @update:model-value="handleChange" />
    </FormControl>
    <FormMessage />
  </FormItem>
</FormField>

<!-- 双列布局中需要占满整行的字段，加 md:col-span-2 -->
<!-- <FormField ... class="md:col-span-2"><FormItem class="md:col-span-2"> -->
```

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

## 需要手动 import 的组件

以下组件不在自动导入范围内，使用时需在 script 顶部添加 import：

```typescript
import FaImageUpload from '@/ui/components/FaImageUpload/index.vue'
import FaFileUpload from '@/ui/components/FaFileUpload/index.vue'
import FaIconPicker from '@/ui/components/FaIconPicker/index.vue'
import FaNumberField from '@/ui/components/FaNumberField/index.vue'
```

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
| 日期 | 原生 `<input type="date">` | 暂无 Fa 内建日期选择器 |
| 日期时间 | 原生 `<input type="datetime-local">` | |
| 图片、头像、封面、缩略图 | `FaImageUpload` | |
| 文件、附件 | `FaFileUpload` | |
| 图标 | `FaIconPicker` | |
| 数字、金额、数量、年龄 | `FaNumberField` | |

字段类型不明确时，默认使用 `FaInput`。

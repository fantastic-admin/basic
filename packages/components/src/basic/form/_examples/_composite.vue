<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import FaButton from '../../button/index.vue'
import FaIcon from '../../icon/index.vue'
import FaInput from '../../input/index.vue'
import FaFormItem from '../FormItem.vue'
import FaForm from '../index.vue'

const result = shallowRef('')
const inputAuth = shallowRef('')

const model = ref({
  auths: [] as string[],
})

const validationSchema = {
  auths(value: string[]) {
    return value.length ? true : '请至少添加一个权限标识'
  },
}

function addAuth() {
  const auth = inputAuth.value.trim()
  if (!auth) {
    return
  }

  if (model.value.auths.includes(auth)) {
    inputAuth.value = ''
    return
  }

  model.value.auths = [...model.value.auths, auth]
  inputAuth.value = ''
}

function removeAuth(auth: string) {
  model.value.auths = model.value.auths.filter(item => item !== auth)
}

function handleSubmit(values: Record<string, unknown>) {
  result.value = JSON.stringify(values, null, 2)
}
</script>

<template>
  <div class="gap-4 grid max-w-160">
    <FaForm
      :model="model"
      :validation-schema="validationSchema"
      @submit="handleSubmit"
    >
      <FaFormItem name="auths" label="权限标识" required :auto-bind="false">
        <div class="flex flex-wrap gap-2 max-w-full items-center">
          <div
            v-for="item in model.auths"
            :key="item"
            class="text-xs text-secondary-foreground px-2.5 py-2 border rounded-lg bg-secondary inline-flex gap-1.5 max-w-full items-center"
          >
            <span class="truncate" :title="item">{{ item }}</span>
            <button
              type="button"
              class="flex-center size-4"
              @click="removeAuth(item)"
            >
              <FaIcon name="i-ep:close" />
            </button>
          </div>
          <FaInput
            v-model="inputAuth"
            placeholder="请输入权限标识"
            class="w-50"
            @keyup.enter="addAuth"
          />
          <FaButton
            type="button"
            variant="outline"
            @click="addAuth"
          >
            新增
          </FaButton>
        </div>
      </FaFormItem>
      <FaButton type="submit">
        提交
      </FaButton>
    </FaForm>
    <pre v-if="result" class="text-sm m-0 p-4 rounded-md bg-muted">{{ result }}</pre>
  </div>
</template>

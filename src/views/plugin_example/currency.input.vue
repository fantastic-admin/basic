<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import type { CurrencyInputOptions } from 'vue-currency-input'
import { createReusableTemplate, useClipboard } from '@vueuse/core'
import { useCurrencyInput } from 'vue-currency-input'
import { toast } from 'vue-sonner'
import Alert from './components/alert.vue'
import Command from './components/command.vue'

const Option = createReusableTemplate<{
  $slots: {
    default: any
    switch: any
  }
  label: string
  description?: string
}>()

const localeEnabled = ref(false)
const locale = ref('zh-ZH')
const locales = ref(['de-DE', 'de-CH', 'en-US', 'en-IN', 'nl-NL', 'sv-SE', 'fr-FR', 'es-ES', 'pt-PT', 'pt-BR', 'zh-ZH', 'ja-JP', 'ar-SA', 'fa-IR', 'bg-BG'])

const currency = ref('CNY')
const currencies = ref(['EUR', 'USD', 'GBP', 'BRL', 'INR', 'CNY', 'JPY', 'SAR', 'IRR', 'BGN'])

const currencyDisplay = ref('symbol')
const currencyDisplays = ref([
  { value: 'symbol', label: 'Symbol' },
  { value: 'narrowSymbol', label: 'Narrow symbol' },
  { value: 'code', label: 'Code' },
  { value: 'name', label: 'Name' },
  { value: 'hidden', label: 'Hidden' },
])

const accountingSign = ref(false)

const useGrouping = ref(true)

const hideCurrencySymbolOnFocus = ref(true)
const hideGroupingSeparatorOnFocus = ref(true)
const hideNegligibleDecimalDigitsOnFocus = ref(true)
const hideNegligibleDecimalDigitsOnFocusEnabled = ref(true)

const valueRangeEnabled = ref(false)
const minValue = ref(undefined)
const maxValue = ref(undefined)

const precisionEnabled = ref(false)
const precisionRangeEnabled = ref(false)
const precisionRangeValue = ref([2, 5])
function range(from: number, to: number) {
  return Array.from({ length: to - from }, (_, i) => from + i)
}
const precision = ref(2)
const precisionOptions = computed(() => range(1, 16))

const valueScalingEnabled = ref(false)
const valueScaling = ref('precision')
const valueScalingOptions = ref([
  { value: 'precision', label: 'Precision' },
  { value: 'thousands', label: 'Thousands' },
  { value: 'millions', label: 'Millions' },
  { value: 'billions', label: 'Billions' },
])

const autoDecimalDigits = ref(false)
watch(autoDecimalDigits, (value) => {
  hideNegligibleDecimalDigitsOnFocusEnabled.value = !value
  hideNegligibleDecimalDigitsOnFocus.value = !value
})

const options = computed(() => {
  return {
    locale: localeEnabled.value ? locale.value : undefined,
    currency: currency.value,
    currencyDisplay: currencyDisplay.value,
    valueRange: valueRangeEnabled.value
      ? {
          min: minValue.value === '' ? undefined : minValue.value,
          max: maxValue.value === '' ? undefined : maxValue.value,
        }
      : undefined,
    precision: precisionEnabled.value
      ? precisionRangeEnabled.value
        ? { min: precisionRangeValue.value[0], max: precisionRangeValue.value[1] }
        : precision.value
      : undefined,
    hideCurrencySymbolOnFocus: hideCurrencySymbolOnFocus.value,
    hideGroupingSeparatorOnFocus: hideGroupingSeparatorOnFocus.value,
    hideNegligibleDecimalDigitsOnFocus: hideNegligibleDecimalDigitsOnFocus.value,
    autoDecimalDigits: autoDecimalDigits.value,
    valueScaling: valueScalingEnabled.value ? valueScaling.value : undefined,
    useGrouping: useGrouping.value,
    accountingSign: accountingSign.value,
  }
})

const { inputRef, setValue, setOptions, numberValue, formattedValue } = useCurrencyInput(options.value as CurrencyInputOptions)

watch(options, (value) => {
  setOptions(value as CurrencyInputOptions)
})

watch(numberValue, (val) => {
  setValue(val)
}, {
  immediate: true,
})

onMounted(() => {
  numberValue.value = 1234.5
})

const { copy, copied, isSupported } = useClipboard()

watch(copied, (val) => {
  if (val) {
    toast.success('复制成功', {
      position: 'top-center',
    })
  }
})

function handleCopy() {
  copy(JSON.stringify(options.value, null, 2))
}

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Option.define v-slot="{ $slots, label, description }">
      <section class="mb-6 min-w-0">
        <div class="mb-2 flex items-center justify-between">
          <span class="text-xl font-medium">{{ label }}</span>
          <component :is="$slots.switch" />
        </div>
        <div v-if="description" class="mb-2 text-sm opacity-30">
          {{ description }}
        </div>
        <component :is="$slots.default" />
      </section>
    </Option.define>
    <Alert />
    <FaPageHeader title="货币格式输入">
      <template #description>
        <p>
          安装命令：
          <Command text="pnpm add vue-currency-input" />
        </p>
      </template>
      <FaButton variant="outline" @click="open('https://github.com/dm4t2/vue-currency-input')">
        <FaIcon name="i-ep:link" />
        访问 vue-currency-input
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <div class="grid items-center gap-y-4 md-grid-cols-2 md-gap-x-8">
        <ElInput ref="inputRef" v-model="formattedValue" />
        <div>
          数值：<code class="ml-2">{{ numberValue != null ? numberValue : 'null' }}</code>
        </div>
      </div>
    </FaPageMain>
    <FaPageMain title="选项">
      <template #title>
        <div class="flex items-center justify-between">
          选项
          <ElButton v-if="isSupported" size="small" @click="handleCopy">
            复制选项
          </ElButton>
        </div>
      </template>
      <div class="grid grid-cols-1 gap-x-8 md-grid-cols-2">
        <div>
          <Option.reuse label="地理位置">
            <template #switch>
              <ElSwitch v-model="localeEnabled" />
            </template>
            <ElSelect v-model="locale" :disabled="!localeEnabled">
              <ElOption v-for="item in locales" :key="item" :value="item" :label="item" />
            </ElSelect>
          </Option.reuse>
          <Option.reuse label="货币">
            <ElSelect v-model="currency">
              <ElOption v-for="item in currencies" :key="item" :value="item" :label="item" />
            </ElSelect>
          </Option.reuse>
          <Option.reuse label="货币显示" description="如何在格式化中显示货币">
            <ElSelect v-model="currencyDisplay">
              <ElOption v-for="item in currencyDisplays" :key="item.value" :value="item.value" :label="item.label" />
            </ElSelect>
          </Option.reuse>
          <Option.reuse label="会计标志" description="是否使用会计符号格式化">
            <template #switch>
              <ElSwitch v-model="accountingSign" />
            </template>
          </Option.reuse>
          <Option.reuse label="使用分组" description="是否使用分组分隔符，如千/万/千万分隔符">
            <template #switch>
              <ElSwitch v-model="useGrouping" />
            </template>
          </Option.reuse>
          <Option.reuse label="无干扰输入" description="对焦时隐藏格式的不同部分，以方便输入">
            <div>
              <ElCheckbox v-model="hideCurrencySymbolOnFocus" label="隐藏货币符号" />
            </div>
            <div>
              <ElCheckbox v-model="hideGroupingSeparatorOnFocus" label="隐藏分组分隔符" />
            </div>
            <div>
              <ElCheckbox v-model="hideNegligibleDecimalDigitsOnFocus" :disabled="!hideNegligibleDecimalDigitsOnFocusEnabled" label="隐藏可忽略的小数位数" />
            </div>
          </Option.reuse>
        </div>
        <div>
          <Option.reuse label="数值范围" description="验证在模糊时触发，并在超出范围时自动设置相应的阈值">
            <template #switch>
              <ElSwitch v-model="valueRangeEnabled" />
            </template>
            <div class="flex items-center space-x-4">
              <ElInputNumber v-model="minValue" :disabled="!valueRangeEnabled" placeholder="最小值" class="flex-1" />
              <span class="text-center">to</span>
              <ElInputNumber v-model="maxValue" :disabled="!valueRangeEnabled" placeholder="最大值" class="flex-1" />
            </div>
          </Option.reuse>
          <Option.reuse label="精确度" description="覆盖显示的小数位数，仅适用于支持小数位的货币">
            <template #switch>
              <ElSwitch v-model="precisionEnabled" />
            </template>
            <div>
              <ElCheckbox v-model="precisionRangeEnabled" :disabled="!precisionEnabled" label="使用范围" />
              <ElSlider v-if="precisionRangeEnabled" v-model="precisionRangeValue" range show-stops :min="1" :max="15" />
              <ElSelect v-else v-model="precision" :disabled="!precisionEnabled">
                <ElOption v-for="item in precisionOptions" :key="item" :value="item" :label="item" />
              </ElSelect>
            </div>
          </Option.reuse>
          <Option.reuse label="数值缩放" description="对输出值进行缩放">
            <template #switch>
              <ElSwitch v-model="valueScalingEnabled" />
            </template>
            <ElSelect v-model="valueScaling" :disabled="!valueScalingEnabled">
              <ElOption v-for="item in valueScalingOptions" :key="item.value" :value="item.value" :label="item.label" />
            </ElSelect>
          </Option.reuse>
          <Option.reuse label="自动小数位" description="是否自动插入小数符号，将最后输入的数字作为小数位">
            <template #switch>
              <ElSwitch v-model="autoDecimalDigits" />
            </template>
          </Option.reuse>
        </div>
      </div>
    </FaPageMain>
  </div>
</template>

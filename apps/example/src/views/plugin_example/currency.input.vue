<script setup lang="ts">
import type { CurrencyInputOptions } from 'vue-currency-input'
import { createReusableTemplate, useClipboard } from '@vueuse/core'
import { useCurrencyInput } from 'vue-currency-input'
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
const localeOptions = computed(() => locales.value.map(item => ({ label: item, value: item })))

const currency = ref('CNY')
const currencies = ref(['EUR', 'USD', 'GBP', 'BRL', 'INR', 'CNY', 'JPY', 'SAR', 'IRR', 'BGN'])
const currencyOptions = computed(() => currencies.value.map(item => ({ label: item, value: item })))

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
const minValue = ref<number>()
const maxValue = ref<number>()
const minNumberValue = computed({
  get() {
    return minValue.value ?? 0
  },
  set(value: number) {
    minValue.value = value
  },
})
const maxNumberValue = computed({
  get() {
    return maxValue.value ?? 0
  },
  set(value: number) {
    maxValue.value = value
  },
})

const precisionEnabled = ref(false)
const precisionRangeEnabled = ref(false)
const precisionRangeValue = ref([2, 5])
function range(from: number, to: number) {
  return Array.from({ length: to - from }, (_, i) => from + i)
}
const precision = ref(2)
const precisionOptions = computed(() => range(1, 16))
const precisionSelectOptions = computed(() => precisionOptions.value.map(item => ({ label: String(item), value: item })))

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
          min: minValue.value,
          max: maxValue.value,
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

const currencyInputRef = useTemplateRef<{ ref?: HTMLInputElement }>('currencyInputRef')
const { inputRef: currencyNativeInputRef, setValue, setOptions, numberValue, formattedValue } = useCurrencyInput(options.value as CurrencyInputOptions)
const formattedInputValue = computed({
  get() {
    return formattedValue.value ?? ''
  },
  set(value: string) {
    formattedValue.value = value
  },
})

watch(currencyInputRef, (value) => {
  currencyNativeInputRef.value = value?.ref ?? null
}, {
  flush: 'post',
})

watch(options, (value) => {
  setOptions(value as CurrencyInputOptions)
})

watch(numberValue, (val) => {
  setValue(val)
}, {
  immediate: true,
})

onMounted(async () => {
  await nextTick()
  numberValue.value = 1234.5
})

const { copy, copied, isSupported } = useClipboard()

watch(copied, (val) => {
  if (val) {
    useFaToast().success('复制成功', {
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
          <Component :is="$slots.switch" />
        </div>
        <div v-if="description" class="text-sm mb-2 opacity-30">
          {{ description }}
        </div>
        <Component :is="$slots.default" />
      </section>
    </Option.define>
    <Alert />
    <FaPageHeader title="货币格式输入">
      <template #description>
        <Command text="pnpm add vue-currency-input" />
      </template>
      <FaButton variant="outline" size="icon" @click="open('https://github.com/dm4t2/vue-currency-input')">
        <FaIcon name="i-simple-icons:github" />
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <div class="gap-y-4 grid items-center md-gap-x-8 md-grid-cols-2">
        <FaInput ref="currencyInputRef" v-model="formattedInputValue" class="w-full" />
        <div>
          数值：<code class="ml-2">{{ numberValue != null ? numberValue : 'null' }}</code>
        </div>
      </div>
    </FaPageMain>
    <FaPageMain title="选项">
      <template #title>
        <div class="flex items-center justify-between">
          选项
          <FaButton v-if="isSupported" size="sm" @click="handleCopy">
            复制选项
          </FaButton>
        </div>
      </template>
      <div class="gap-x-8 grid grid-cols-1 md-grid-cols-2">
        <div>
          <Option.reuse label="地理位置">
            <template #switch>
              <FaSwitch v-model="localeEnabled" />
            </template>
            <FaSelect v-model="locale" :options="localeOptions" :disabled="!localeEnabled" class="w-full" />
          </Option.reuse>
          <Option.reuse label="货币">
            <FaSelect v-model="currency" :options="currencyOptions" class="w-full" />
          </Option.reuse>
          <Option.reuse label="货币显示" description="如何在格式化中显示货币">
            <FaSelect v-model="currencyDisplay" :options="currencyDisplays" class="w-full" />
          </Option.reuse>
          <Option.reuse label="会计标志" description="是否使用会计符号格式化">
            <template #switch>
              <FaSwitch v-model="accountingSign" />
            </template>
          </Option.reuse>
          <Option.reuse label="使用分组" description="是否使用分组分隔符，如千/万/千万分隔符">
            <template #switch>
              <FaSwitch v-model="useGrouping" />
            </template>
          </Option.reuse>
          <Option.reuse label="无干扰输入" description="对焦时隐藏格式的不同部分，以方便输入">
            <div>
              <FaCheckbox v-model="hideCurrencySymbolOnFocus">
                隐藏货币符号
              </FaCheckbox>
            </div>
            <div>
              <FaCheckbox v-model="hideGroupingSeparatorOnFocus">
                隐藏分组分隔符
              </FaCheckbox>
            </div>
            <div>
              <FaCheckbox v-model="hideNegligibleDecimalDigitsOnFocus" :disabled="!hideNegligibleDecimalDigitsOnFocusEnabled">
                隐藏可忽略的小数位数
              </FaCheckbox>
            </div>
          </Option.reuse>
        </div>
        <div>
          <Option.reuse label="数值范围" description="验证在模糊时触发，并在超出范围时自动设置相应的阈值">
            <template #switch>
              <FaSwitch v-model="valueRangeEnabled" />
            </template>
            <div class="flex items-center space-x-4">
              <FaNumberField v-model="minNumberValue" :disabled="!valueRangeEnabled" class="flex-1" />
              <span class="text-center">to</span>
              <FaNumberField v-model="maxNumberValue" :disabled="!valueRangeEnabled" class="flex-1" />
            </div>
          </Option.reuse>
          <Option.reuse label="精确度" description="覆盖显示的小数位数，仅适用于支持小数位的货币">
            <template #switch>
              <FaSwitch v-model="precisionEnabled" />
            </template>
            <div class="space-y-2">
              <FaCheckbox v-model="precisionRangeEnabled" :disabled="!precisionEnabled">
                使用范围
              </FaCheckbox>
              <FaSlider v-if="precisionRangeEnabled" v-model="precisionRangeValue" :min="1" :max="15" />
              <FaSelect v-else v-model="precision" :options="precisionSelectOptions" :disabled="!precisionEnabled" />
            </div>
          </Option.reuse>
          <Option.reuse label="数值缩放" description="对输出值进行缩放">
            <template #switch>
              <FaSwitch v-model="valueScalingEnabled" />
            </template>
            <FaSelect v-model="valueScaling" :options="valueScalingOptions" :disabled="!valueScalingEnabled" class="w-full" />
          </Option.reuse>
          <Option.reuse label="自动小数位" description="是否自动插入小数符号，将最后输入的数字作为小数位">
            <template #switch>
              <FaSwitch v-model="autoDecimalDigits" />
            </template>
          </Option.reuse>
        </div>
      </div>
    </FaPageMain>
  </div>
</template>

<script setup lang="ts">
// 行政区划数据来源于 https://github.com/modood/Administrative-divisions-of-China
import pcasRaw from './pcas-code.json'

defineOptions({
  name: 'PcasCascader',
})

const props = withDefaults(
  defineProps<{
    disabled?: boolean
    type?: 'pc' | 'pca' | 'pcas'
    format?: 'code' | 'name' | 'both'
  }>(),
  {
    disabled: false,
    type: 'pca',
    format: 'code',
  },
)

const value = defineModel<string[] | {
  code: string
  name: string
}[]>({
  default: [],
})

interface pcasItem {
  code: string
  name: string
  children?: pcasItem[]
}

const pcasData = computed(() => {
  const data: pcasItem[] = []
  // 省份
  pcasRaw.forEach((p) => {
    const tempP: pcasItem = {
      code: p.code,
      name: p.name,
    }
    const tempChildrenC: pcasItem[] = []
    // 城市
    p.children.forEach((c) => {
      const tempC: pcasItem = {
        code: c.code,
        name: c.name,
      }
      if (['pca', 'pcas'].includes(props.type)) {
        const tempChildrenA: pcasItem[] = []
        // 区县
        c.children.forEach((a) => {
          const tempA: pcasItem = {
            code: a.code,
            name: a.name,
          }
          if (props.type === 'pcas') {
            const tempChildrenS: pcasItem[] = []
            // 街道
            a.children.forEach((s) => {
              const tempS: pcasItem = {
                code: s.code,
                name: s.name,
              }
              tempChildrenS.push(tempS)
            })
            tempA.children = tempChildrenS
          }
          tempChildrenA.push(tempA)
        })
        tempC.children = tempChildrenA
      }
      tempChildrenC.push(tempC)
    })
    tempP.children = tempChildrenC
    data.push(tempP)
  })
  return data
})

const myValue = computed({
  // 将入参数据转成 code 码
  get: () => {
    return anyToCode(value.value)
  },
  // 将 code 码转成出参数据
  set: (val) => {
    value.value = val ? codeToAny(val) : []
  },
})

function anyToCode(value: any[], dictionarie: any[] = pcasData.value) {
  const input: string[] = []
  if (value.length > 0) {
    const findItem = dictionarie.find((item) => {
      if (props.format === 'code') {
        return item.code === value[0]
      }
      else if (props.format === 'name') {
        return item.name === value[0]
      }
      else {
        return item.name === value[0].name && item.code === value[0].code
      }
    })
    input.push(findItem.code)
    if (findItem.children) {
      input.push(...anyToCode(value.slice(1 - value.length), findItem.children))
    }
  }
  return input
}

function codeToAny(codes: string[], dictionarie: any[] = pcasData.value): any {
  const output = []
  const findItem = dictionarie.find(item => item.code === codes[0])
  if (findItem) {
    switch (props.format) {
      case 'code':
        output.push(findItem.code)
        break
      case 'name':
        output.push(findItem.name)
        break
      case 'both':
        output.push({
          code: findItem.code,
          name: findItem.name,
        })
    }
    const newCodes = codes.slice(1 - codes.length)
    if (newCodes.length > 0 && findItem.children) {
      output.push(...codeToAny(newCodes, findItem.children))
    }
  }
  return output
}
</script>

<template>
  <ElCascader v-model="myValue" :options="pcasData as any[]" :props="{ value: 'code', label: 'name' }" :disabled="disabled" clearable filterable />
</template>

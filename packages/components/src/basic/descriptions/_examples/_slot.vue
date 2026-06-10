<script setup lang="ts">
import type { DescriptionItem } from '../index.vue'
// 组件实际使用时无需手动导入，框架会自动导入
import FaIcon from '../../icon/index.vue'
import FaTag from '../../tag/index.vue'
import FaDescriptions from '../index.vue'

type ProfileItem = DescriptionItem<{
  icon: string
  tagVariant?: 'default' | 'secondary' | 'destructive' | 'outline'
}>

const items: ProfileItem[] = [
  { key: 'username', label: 'Username', value: 'kooriokami', icon: 'i-lucide:user' },
  { key: 'telephone', label: 'Telephone', value: '18100000000', icon: 'i-lucide:smartphone' },
  { key: 'place', label: 'Place', value: 'Suzhou', icon: 'i-lucide:map-pin' },
  { key: 'remarks', label: 'Remarks', value: 'School', icon: 'i-lucide:notebook-text', tagVariant: 'outline' },
  { key: 'address', label: 'Address', value: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province', icon: 'i-lucide:building-2', span: 2 },
]
</script>

<template>
  <FaDescriptions :items="items" border label-width="200px">
    <template #label-username="{ item, label }">
      <div class="inline-flex gap-2 items-center">
        <FaIcon :name="item.icon" class="size-4" />
        <span>{{ label }}</span>
      </div>
    </template>

    <template #label-telephone="{ item, label }">
      <div class="inline-flex gap-2 items-center">
        <FaIcon :name="item.icon" class="size-4" />
        <span>{{ label }}</span>
      </div>
    </template>

    <template #label-place="{ item, label }">
      <div class="inline-flex gap-2 items-center">
        <FaIcon :name="item.icon" class="size-4" />
        <span>{{ label }}</span>
      </div>
    </template>

    <template #label-remarks="{ item, label }">
      <div class="inline-flex gap-2 items-center">
        <FaIcon :name="item.icon" class="size-4" />
        <span>{{ label }}</span>
      </div>
    </template>

    <template #label-address="{ item, label }">
      <div class="inline-flex gap-2 items-center">
        <FaIcon :name="item.icon" class="size-4" />
        <span>{{ label }}</span>
      </div>
    </template>

    <template #value-remarks="{ item, value }">
      <FaTag :variant="item.tagVariant">
        {{ value }}
      </FaTag>
    </template>
  </FaDescriptions>
</template>

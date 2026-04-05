<script setup lang="ts">
const modal = shallowRef(false)

function handleClick(text: string) {
  faToast(text)
}

const items = [
  [
    { label: 'Preview', icon: 'i-lucide:eye', handle: () => handleClick('Preview') },
    { label: 'Duplicate', icon: 'i-lucide:copy', handle: () => handleClick('Duplicate') },
  ],
  [
    {
      label: 'More',
      items: [
        [
          { label: 'Share', handle: () => handleClick('Share') },
        ],
        [
          { label: 'Delete', variant: 'destructive' as const, handle: () => handleClick('Delete') },
        ],
      ],
    },
  ],
]
</script>

<template>
  <div>
    <FaButton @click="modal = true">
      打开
    </FaButton>
    <FaModal
      v-model="modal"
      title="FaModal 中的下拉菜单"
      description="在模态框内容区内触发 FaDropdown"
      :footer="false"
      class="sm:max-w-2xl"
      content-class="min-h-auto"
    >
      <div class="py-6 flex-center">
        <FaDropdown :items="items">
          <FaButton>
            Actions
            <FaIcon name="i-ep:caret-bottom" />
          </FaButton>
        </FaDropdown>
      </div>
    </FaModal>
  </div>
</template>

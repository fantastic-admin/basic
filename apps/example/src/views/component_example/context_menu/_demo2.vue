<script setup lang="ts">
function handleClick(text: string) {
  faToast(text)
}
</script>

<template>
  <FaContextMenu
    :items="[
      [
        { label: 'Open', handle: () => handleClick('Open') },
        {
          label: 'More',
          items: [
            [
              { label: 'Save Page...', handle: () => handleClick('Save Page...') },
            ],
          ],
        },
      ],
    ]"
  >
    <div class="text-sm border rounded-md border-dashed flex h-[150px] w-[300px] items-center justify-center">
      <FaIcon name="i-hugeicons:mouse-right-click-06" class="op-50 size-12" />
    </div>
  </FaContextMenu>
</template>

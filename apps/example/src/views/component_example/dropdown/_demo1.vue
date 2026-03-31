<script setup lang="ts">
function handleClick(text: string) {
  faToast(text)
}
</script>

<template>
  <FaDropdown
    :items="[
      [
        { label: 'Open', handle: () => handleClick('Open') },
        { label: 'Edit', icon: 'i-ep:edit', handle: () => handleClick('Edit') },
        { label: 'Copy', disabled: true, handle: () => handleClick('Copy') },
      ],
      [
        { label: 'Delete', variant: 'destructive', handle: () => handleClick('Delete') },
      ],
    ]"
  >
    <FaButton>
      Actions
      <FaIcon name="i-ep:caret-bottom" />
    </FaButton>
  </FaDropdown>
</template>

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
    <FaButton>
      Actions
      <FaIcon name="i-ep:caret-bottom" />
    </FaButton>
  </FaDropdown>
</template>

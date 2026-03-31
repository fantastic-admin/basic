<template>
  <div class="flex gap-4">
    <FaAvatar src="https://fantastic-admin.hurui.me/logo.svg" />
    <FaAvatar src="" fallback="Hooray" />
    <div class="flex space-x--2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background">
      <FaTooltip text="Fantastic-admin">
        <FaAvatar src="https://github.com/fantastic-admin.png" class="transition hover:(scale-110 z-1)" />
      </FaTooltip>
      <FaTooltip text="Hooray">
        <FaAvatar src="https://github.com/hooray.png" class="transition hover:(scale-110 z-1)" />
      </FaTooltip>
      <FaTooltip text="Admin">
        <FaAvatar src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=admin" class="transition hover:(scale-110 z-1)" />
      </FaTooltip>
    </div>
  </div>
</template>

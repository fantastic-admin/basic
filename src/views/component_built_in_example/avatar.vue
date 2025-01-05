<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <FaPageHeader title="头像" description="FaAvatar" />
    <FaPageMain>
      <div class="flex gap-4">
        <FaAvatar src="https://fantastic-admin.hurui.me/logo.png" />
        <FaAvatar src="https://fantastic-admin.hurui.me/logo.png" shape="square" />
        <FaAvatar src="" fallback="Hooray" />
      </div>
    </FaPageMain>
  </div>
</template>

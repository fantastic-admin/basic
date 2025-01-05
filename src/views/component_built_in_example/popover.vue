<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <FaPageHeader title="浮动面板" description="FaPopover" />
    <FaPageMain>
      <FaPopover>
        <FaButton>
          浮动面板
          <FaIcon name="i-ep:caret-bottom" />
        </FaButton>
        <template #panel>
          <div class="h-30 w-60 flex items-center justify-center">
            面板内容
          </div>
        </template>
      </FaPopover>
    </FaPageMain>
  </div>
</template>

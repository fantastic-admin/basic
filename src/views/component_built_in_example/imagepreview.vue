<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <FaPageHeader title="图片预览" description="FaImagePreview" />
    <FaPageMain>
      <div class="space-x-4">
        <FaImagePreview src="https://fantastic-admin.hurui.me/logo.svg" />
        <FaImagePreview src="http://www.baidu.com" class="size-25" />
        <FaImagePreview src="http://www.baidu.com">
          <template #error>
            <div class="flex-col-center text-sm text-secondary-foreground/50">
              <div>
                自定义错误信息
              </div>
              <div>
                图片加载失败
              </div>
            </div>
          </template>
        </FaImagePreview>
      </div>
    </FaPageMain>
  </div>
</template>

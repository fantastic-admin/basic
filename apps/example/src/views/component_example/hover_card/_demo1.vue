<template>
  <FaHoverCard class="min-w-auto">
    <FaButton variant="link">
      @hooray
    </FaButton>
    <template #card>
      <div class="flex space-x-4">
        <FaAvatar shape="circle" src="https://github.com/vuejs.png" class="bg-muted" />
        <div class="space-y-1">
          <h4 class="text-sm font-semibold">
            @hooray
          </h4>
          <p class="text-sm">
            一个前端开发工程师
          </p>
          <div class="pt-2 flex items-center">
            <FaIcon name="i-ci:calendar-days" class="mr-2 opacity-70 h-4 w-4" />
            <span class="text-xs text-muted-foreground">
              2020 年注册
            </span>
          </div>
        </div>
      </div>
    </template>
  </FaHoverCard>
</template>

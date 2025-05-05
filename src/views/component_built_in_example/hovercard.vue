<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <FaPageHeader title="悬浮卡片" description="FaHoverCard" />
    <FaPageMain>
      <FaHoverCard class="min-w-auto">
        <FaButton variant="link">
          @hooray
        </FaButton>
        <template #card>
          <div class="flex space-x-4">
            <FaAvatar shape="circle" src="https://github.com/vuejs.png" />
            <div class="space-y-1">
              <h4 class="text-sm font-semibold">
                @hooray
              </h4>
              <p class="text-sm">
                一个前端开发工程师
              </p>
              <div class="flex items-center pt-2">
                <FaIcon name="i-ci:calendar-days" class="mr-2 h-4 w-4 opacity-70" />
                <span class="text-xs text-muted-foreground">
                  2020 年注册
                </span>
              </div>
            </div>
          </div>
        </template>
      </FaHoverCard>
    </FaPageMain>
  </div>
</template>

<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <FaPageHeader title="内容块" description="FaPageMain" />
    <FaPageMain>
      PageMain 是最常用的页面组件，几乎所有页面都会使用到
    </FaPageMain>
    <FaPageMain title="你可以设置一个自定义的标题">
      这里放页面内容
    </FaPageMain>
    <FaPageMain>
      <template #title>
        <div class="flex-center-between">
          通过 slot 设置标题
          <FaButton variant="outline" size="sm">
            还可以放置自定义按钮
          </FaButton>
        </div>
      </template>
      这里放页面内容
    </FaPageMain>
    <FaPageMain title="带展开/收起功能" collaspe height="100px">
      <div class="space-y-4">
        <h1 class="text-4xl font-bold">
          Fantastic-admin
        </h1>
        <img src="@/assets/images/logo.svg" class="w-20">
        <p>用过的人都说好！！！</p>
      </div>
    </FaPageMain>
  </div>
</template>

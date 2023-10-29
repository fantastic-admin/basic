<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <PageHeader title="内容块" content="PageMain" />
    <PageMain>
      PageMain 是最常用的页面组件，几乎所有页面都会使用到
    </PageMain>
    <PageMain title="你可以设置一个自定义的标题">
      这里放页面内容
    </PageMain>
    <PageMain>
      <template #title>
        <div style="display: flex; align-item: center; justify-content: space-between;">
          通过 slot 设置标题
          <ElButton size="small">
            还可以放置自定义按钮
          </ElButton>
        </div>
      </template>
      这里放页面内容
    </PageMain>
    <ElRow :gutter="20" style="margin: -10px 10px;">
      <ElCol :md="8">
        <PageMain style="margin: 10px 0;">
          还可以结合 ElRow 使用
        </PageMain>
      </ElCol>
      <ElCol :md="8">
        <PageMain style="margin: 10px 0;">
          这里放页面内容
        </PageMain>
      </ElCol>
      <ElCol :md="8">
        <PageMain style="margin: 10px 0;">
          这里放页面内容
        </PageMain>
      </ElCol>
    </ElRow>
    <PageMain title="带展开功能" collaspe height="200px">
      <h1>Fantastic-admin</h1>
      <img src="../../assets/images/logo.png">
      <p>这是一款开箱即用的中后台框架，同时它也经历过数十个真实项目的技术沉淀，确保框架在开发中可落地、可使用、可维护</p>
    </PageMain>
  </div>
</template>

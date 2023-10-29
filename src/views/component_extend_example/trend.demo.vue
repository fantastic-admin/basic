<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <PageHeader title="趋势符号">
      <template #content>
        <p>Trend</p>
        <p style="margin-bottom: 0;">
          标记上升和下降趋势。通常用绿色代表“好”，红色代表“不好”，股票涨跌场景除外
        </p>
      </template>
    </PageHeader>
    <ElRow :gutter="20" style="margin: 0 10px;">
      <ElCol :md="8">
        <PageMain title="基础用法" style="margin: 0;">
          <p>
            <Trend value="12.3" />
          </p>
          <p>
            <Trend value="12.3" type="down" />
          </p>
        </PageMain>
      </ElCol>
      <ElCol :md="8">
        <PageMain title="颜色反转" style="margin: 0;">
          <p>
            <Trend value="12.3" reverse />
          </p>
          <p>
            <Trend value="12.3" type="down" reverse />
          </p>
        </PageMain>
      </ElCol>
      <ElCol :md="8">
        <PageMain title="前缀后缀" style="margin: 0;">
          <p>
            <Trend value="12.3" prefix="$" />
          </p>
          <p>
            <Trend value="12.3" suffix="%" />
          </p>
        </PageMain>
      </ElCol>
    </ElRow>
  </div>
</template>

<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <FaPageHeader title="SVG Icon" description="可以使用自定义的 SVG 图标" />
    <FaPageMain>
      <p>单色 SVG Icon</p>
      <FaIcon name="example-emotion-line" class="size-12" />
      <FaIcon name="example-emotion-laugh-line" class="size-12" />
      <FaIcon name="example-emotion-unhappy-line" class="size-12" />
      <p>彩色 SVG Icon</p>
      <FaIcon name="example-crown" class="size-12" />
      <FaIcon name="example-star" class="size-12" />
      <FaIcon name="example-vip" class="size-12" />
      <p>使用方法：</p>
      <ol>
        <li>上 <a href="https://www.iconfont.cn/" target="_blank">Iconfont</a> 下载需要的 svg 图标</li>
        <li>将 svg 文件放入 ./src/assets/icons 目录下，文件名即为 name</li>
      </ol>
    </FaPageMain>
  </div>
</template>

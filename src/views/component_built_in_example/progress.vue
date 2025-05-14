<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <FaPageHeader title="进度条" description="FaProgress" />
    <FaPageMain>
      <FaProgress :model-value="33" />
    </FaPageMain>
  </div>
</template>

<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <FaPageMain>
    <RouterLink v-slot="{ navigate }" :to="{ name: 'breadcrumbExampleDetail1' }" custom>
      <FaButton @click="navigate">
        查看详情页
      </FaButton>
    </RouterLink>
  </FaPageMain>
</template>

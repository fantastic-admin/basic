<route lang="yaml">
name: notFound
meta:
  title: 找不到页面
  constant: true
  layout: false
</route>

<script lang="ts" setup>
const router = useRouter()

const data = ref({
  inter: NaN,
  countdown: 5,
})

onBeforeRouteLeave(() => {
  data.value.inter && clearInterval(data.value.inter)
})

onMounted(() => {
  data.value.inter = setInterval(() => {
    data.value.countdown--
    if (data.value.countdown === 0) {
      data.value.inter && clearInterval(data.value.inter)
      goBack()
    }
  }, 1000)
})

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="notfound">
    <svg-icon name="404" class="icon" />
    <div class="content">
      <h1>404</h1>
      <div class="desc">
        抱歉，你访问的页面不存在
      </div>
      <el-button type="primary" @click="goBack">
        {{ data.countdown }} 秒后，返回首页
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notfound {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 700px;

  @include position-center(xy);

  .icon {
    width: 400px;
    height: 400px;
  }

  .content {
    h1 {
      margin: 0;
      font-size: 72px;
      color: var(--el-text-color-primary);
    }

    .desc {
      margin: 20px 0 30px;
      font-size: 20px;
      color: var(--el-text-color-secondary);
    }
  }
}
</style>

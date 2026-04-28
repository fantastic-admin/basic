<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
import Demo3 from './_demo3.vue'
</script>

<template>
  <div>
    <FaPageHeader title="一次性密码输入框" description="FaInputOTP" />
    <FaPageMain main-class="p-4">
      <Demo1 />
    </FaPageMain>
    <FaPageMain title="长度" main-class="p-4">
      <Demo2 />
    </FaPageMain>
    <FaPageMain title="回调" main-class="p-4">
      <Demo3 />
    </FaPageMain>
  </div>
</template>

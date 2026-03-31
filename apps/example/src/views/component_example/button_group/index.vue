<script setup lang="ts">
import Demo1 from './_demo1.vue'
import Demo2 from './_demo2.vue'
import Demo3 from './_demo3.vue'
import Demo4 from './_demo4.vue'
import Demo5 from './_demo5.vue'
</script>

<template>
  <div>
    <FaPageHeader title="按钮组" description="FaButtonGroup" />
    <FaPageMain main-class="p-0">
      <div class="p-4">
        <Demo1 />
      </div>
    </FaPageMain>
    <FaPageMain title="垂直" main-class="p-0">
      <div class="p-4">
        <Demo2 />
      </div>
    </FaPageMain>
    <FaPageMain title="分割线" main-class="p-0">
      <div class="p-4">
        <Demo3 />
      </div>
    </FaPageMain>
    <FaPageMain title="嵌套" main-class="p-0">
      <div class="p-4">
        <Demo4 />
      </div>
    </FaPageMain>
    <FaPageMain title="与其他组件组合" main-class="p-0">
      <div class="p-4">
        <Demo5 />
      </div>
    </FaPageMain>
  </div>
</template>

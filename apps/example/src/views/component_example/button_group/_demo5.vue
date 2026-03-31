<script setup lang="ts">
const currency = ref('CNY')
</script>

<template>
  <div class="flex flex-col gap-4 items-start">
    <FaButtonGroup>
      <FaInput />
      <FaButton variant="outline" size="icon">
        <FaIcon name="i-ep:search" />
      </FaButton>
    </FaButtonGroup>
    <FaButtonGroup>
      <FaSelect
        v-model="currency"
        :options="[
          { label: '¥', value: 'CNY' },
          { label: '$', value: 'USD' },
          { label: '€', value: 'EUR' },
        ]"
        class="gap-1 w-inherit"
      />
      <FaInput placeholder="10.00" />
    </FaButtonGroup>
    <FaButtonGroup>
      <FaButton variant="outline">
        关注
      </FaButton>
      <FaDropdown
        :items="[
          [
            { label: '加入黑名单' },
            { label: '分享到群聊' },
            { label: '反馈举报' },
          ],
          [
            { label: '取消关注' },
          ],
        ]"
      >
        <FaButton variant="outline" size="icon">
          <FaIcon name="i-ep:caret-bottom" />
        </FaButton>
      </FaDropdown>
    </FaButtonGroup>
  </div>
</template>

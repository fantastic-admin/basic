<route lang="yaml">
meta:
  enabled: false
</route>

<template>
  <div>
    <FaPageHeader title="按钮" description="FaButton" />
    <FaPageMain>
      <div class="flex gap-4">
        <FaButton>
          按钮
        </FaButton>
        <FaButton variant="destructive">
          按钮
        </FaButton>
        <FaButton variant="outline">
          按钮
        </FaButton>
        <FaButton variant="secondary">
          按钮
        </FaButton>
        <FaButton variant="ghost">
          按钮
        </FaButton>
        <FaButton variant="link">
          按钮
        </FaButton>
        <FaButton disabled>
          按钮
        </FaButton>
        <FaButton loading>
          按钮
        </FaButton>
      </div>
    </FaPageMain>
    <FaPageMain title="按钮组">
      <div class="flex flex-col items-start gap-4">
        <FaButtonGroup>
          <FaButton variant="secondary">
            <FaIcon name="i-mdi:eye" class="size-4" />
            查看详情
          </FaButton>
          <FaButton>
            <FaIcon name="i-mdi:pencil" class="size-4" />
            编辑
          </FaButton>
          <FaButton variant="destructive">
            <FaIcon name="i-mdi:delete" class="size-4" />
            删除
          </FaButton>
        </FaButtonGroup>
        <FaButtonGroup vertical>
          <FaButton variant="secondary">
            <FaIcon name="i-mdi:eye" class="size-4" />
            查看详情
          </FaButton>
          <FaButton>
            <FaIcon name="i-mdi:pencil" class="size-4" />
            编辑
          </FaButton>
          <FaButton variant="destructive">
            <FaIcon name="i-mdi:delete" class="size-4" />
            删除
          </FaButton>
        </FaButtonGroup>
      </div>
    </FaPageMain>
  </div>
</template>

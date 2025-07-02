<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import { useFaImagePreview } from '@/ui/components/FaImagePreview'

const { open } = useFaImagePreview()

function openSingle() {
  open('https://fantastic-admin.hurui.me/logo.svg')
}

function openMulti() {
  open([
    'https://fantastic-admin.hurui.me/logo.svg',
    'https://fantastic-mobile.hurui.me/logo.png',
  ])
}

function openMulti2() {
  open([
    'https://fantastic-admin.hurui.me/logo.svg',
    'https://fantastic-mobile.hurui.me/logo.png',
  ], 1)
}
</script>

<template>
  <div>
    <FaPageHeader title="图片预览" description="FaImagePreview" />
    <FaPageMain>
      <div class="space-x-4">
        <FaImagePreview src="https://fantastic-admin.hurui.me/logo.svg" />
        <FaImagePreview src="http://www.baidu.com" class="size-25" />
        <FaImagePreview src="http://www.baidu.com">
          <template #error>
            <div class="flex-col-center text-sm text-secondary-foreground/50">
              <div>
                自定义错误信息
              </div>
              <div>
                图片加载失败
              </div>
            </div>
          </template>
        </FaImagePreview>
      </div>
    </FaPageMain>
    <FaPageMain title="函数式调用">
      <div class="space-x-4">
        <FaButton @click="openSingle">
          预览单张
        </FaButton>
        <FaButton @click="openMulti">
          预览多张
        </FaButton>
        <FaButton @click="openMulti2">
          预览多张（初始预览第2张）
        </FaButton>
      </div>
    </FaPageMain>
  </div>
</template>

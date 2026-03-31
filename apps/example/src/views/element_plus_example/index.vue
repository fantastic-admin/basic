<script setup lang="ts">
import Button from './components/button.vue'
import Checkbox from './components/checkbox.vue'
import Icon from './components/icon.vue'
import Input from './components/input.vue'
import InputNumber from './components/inputnumber.vue'
import Link from './components/link.vue'
import Radio from './components/radio.vue'
import Rate from './components/rate.vue'
import Select from './components/select.vue'
import Slider from './components/slider.vue'
import Switch from './components/switch.vue'

const components = {
  图标: Icon,
  按钮: Button,
  文字链接: Link,
  单选框: Radio,
  多选框: Checkbox,
  输入框: Input,
  数字输入框: InputNumber,
  选择器: Select,
  开关: Switch,
  滑块: Slider,
  评分: Rate,
}

const UIdialog = ref(false)

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <FaPageHeader title="Element Plus">
      <template #description>
        <div class="space-y-2">
          <p>框架内置 Element Plus 组件库，本页仅展示部分组件，更多组件及使用说明请查看 Element Plus 官网</p>
          <FaButton variant="link" class="p-0 h-auto" @click="UIdialog = true">
            不想使用 Element Plus ？
          </FaButton>
          <FaModal v-model="UIdialog" title="切换组件库" description="本框架默认搭载 Element Plus 组件库，同时也支持替换成其他 UI 组件库，你可以根据实际需求选择合适的组件库。" :footer="false">
            <div class="c-green-6 text-sm/6 px-4 py-2 rounded-2 bg-green/20">
              演示站挑选了以下 6 款组件库作为示例，你可以点击进行预览
            </div>
            <div class="mt-4 flex-col-center gap-2">
              <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/antd-example/')">
                <FaIcon name="https://antdv.com/favicon.ico" />
                Ant Design Vue 演示站
              </FaButton>
              <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/arco-example/')">
                <FaIcon name="https://unpkg.byted-static.com/latest/byted/arco-config/assets/favicon.ico" />
                Arco Design Vue 演示站
              </FaButton>
              <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/naive-example/')">
                <FaIcon name="i-logos:naiveui" />
                Naive UI 演示站
              </FaButton>
              <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/tdesign-example/')">
                <FaIcon name="https://static.tdesign.tencent.com/favicon.ico" />
                TDesign 演示站
              </FaButton>
              <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/vexip-example/')">
                <FaIcon name="https://www.vexipui.com/vexip-ui.svg" />
                Vexip UI 演示站
              </FaButton>
              <FaButton variant="outline" class="w-full" @click="open('https://fantastic-admin.hurui.me/idux-example/')">
                <FaIcon name="https://idux.site/favicon.ico" />
                访问 iDux 演示站
              </FaButton>
            </div>
          </FaModal>
        </div>
      </template>
      <FaButton variant="outline" @click="open('https://element-plus.org/#/zh-CN')">
        <FaIcon name="i-ep:link" />
        Element Plus 官网
      </FaButton>
    </FaPageHeader>
    <FaPageMain title="官方组件">
      <ElTabs type="border-card">
        <ElTabPane v-for="(item, key) in components" :key="key" :label="key">
          <Component :is="item" />
        </ElTabPane>
      </ElTabs>
    </FaPageMain>
  </div>
</template>

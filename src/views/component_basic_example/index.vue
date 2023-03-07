<route lang="yaml">
meta:
  enabled: false
</route>

<script lang="ts" setup>
import Icon from './components/icon.vue'
import Button from './components/button.vue'
import Link from './components/link.vue'
import Radio from './components/radio.vue'
import Checkbox from './components/checkbox.vue'
import Input from './components/input.vue'
import InputNumber from './components/inputnumber.vue'
import Select from './components/select.vue'
import Switch from './components/switch.vue'
import Slider from './components/slider.vue'
import Rate from './components/rate.vue'

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

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <page-header title="基础组件" content="由 Element Plus 提供，本页仅展示部分组件，更多组件及使用说明请查看 Element Plus 官网">
      <el-button @click="open('https://element-plus.org/#/zh-CN')">
        <template #icon>
          <el-icon>
            <svg-icon name="i-ep:link" />
          </el-icon>
        </template>
        Element Plus 官网
      </el-button>
    </page-header>
    <page-main>
      <el-tabs type="border-card">
        <el-tab-pane v-for="(item, key) in components" :key="key" :label="key">
          <component :is="item" />
        </el-tab-pane>
      </el-tabs>
    </page-main>
  </div>
</template>

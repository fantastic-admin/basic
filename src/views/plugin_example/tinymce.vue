<route lang="yaml">
meta:
  enabled: false
</route>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import TinymceEditor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce/tinymce'
import Alert from './components/alert.vue'
import Command from './components/command.vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/icons/default/icons'
import 'tinymce/models/dom'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/image'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/table'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/code'
import 'tinymce/plugins/searchreplace'

const settingsStore = useSettingsStore()

const defaultSetting = ref({
  language_url: 'tinymce/langs/zh-Hans.js',
  language: 'zh-Hans',
  skin_url: settingsStore.settings.app.colorScheme === 'light' ? 'tinymce/skins/ui/oxide' : 'tinymce/skins/ui/oxide-dark',
  content_css: settingsStore.settings.app.colorScheme === 'light' ? 'tinymce/skins/content/default/content.min.css' : 'tinymce/skins/content/dark/content.min.css',
  min_height: 250,
  max_height: 600,
  selector: 'textarea',
  plugins: 'autolink autoresize fullscreen image insertdatetime link lists media preview table wordcount code searchreplace',
  toolbar: 'undo redo | blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor removeformat | link image media table insertdatetime searchreplace | preview code fullscreen',
  branding: false,
  menubar: false,
  toolbar_mode: 'sliding',
  insertdatetime_formats: [
    '%Y年%m月%d日',
    '%H点%M分%S秒',
    '%Y-%m-%d',
    '%H:%M:%S',
  ],
  // https://www.tiny.cloud/docs/tinymce/6/file-image-upload/#images_upload_handler
  images_upload_handler: (blobInfo: any) => new Promise((resolve) => {
    const img = `data:image/jpeg;base64,${blobInfo.base64()}`
    resolve(img)
  }),
})

const content = ref('<h1>Fantastic-admin</h1>')

onMounted(() => {
  tinymce.init({})
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <Alert />
    <FaPageHeader title="TinyMCE 编辑器">
      <template #description>
        <div class="space-y-2">
          <p>
            安装命令：
            <Command text="pnpm add tinymce @tinymce/tinymce-vue" />
          </p>
          <p>
            安装成功后，在框架 /public 目录下创建 tinymce 文件夹，并将 /node_modules/tinymce 目录下的 skins 文件夹复制到 /public/tinymce 目录下；然后在到 TinyMCE 官网
            <FaButton variant="link" class="h-auto p-0" href="https://www.tiny.cloud/get-tiny/language-packages/" target="_blank">
              下载中文语言包
            </FaButton>
            ，解压并放到 /public/tinymce 目录下。
          </p>
        </div>
      </template>
      <FaButton variant="outline" @click="open('https://github.com/tinymce/tinymce')">
        <FaIcon name="i-ep:link" />
        访问 TinyMCE
      </FaButton>
    </FaPageHeader>
    <FaPageMain>
      <div class="min-w-full prose">
        <TinymceEditor v-model="content" :init="defaultSetting" />
      </div>
    </FaPageMain>
    <FaPageMain title="预览">
      <div class="min-w-full prose">
        <div v-html="content" />
      </div>
    </FaPageMain>
  </div>
</template>

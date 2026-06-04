# FaFileUpload 文件上传

支持拖拽、点击、粘贴、自定义上传请求和文件夹上传的文件上传组件，带进度显示和文件管理功能。

## 使用场景

- 附件文件上传
- 批量文件上传
- 资料文件上传
- 证据/凭证上传
- 文档上传
- 文件夹批量上传

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `action` | `string` | `''` | 默认上传请求地址，使用 `httpRequest` 时可不传 |
| `method` | `string` | `'post'` | 默认上传请求方法 |
| `headers` | `Headers \| Record<string, any>` | `{}` | 默认上传请求头 |
| `data` | `Record<string, any>` | `{}` | 默认上传附加表单数据 |
| `name` | `string` | `'file'` | 默认上传文件字段名 |
| `afterUpload` | `(response: any) => string \| Promise<string>` | - | 上传成功后从响应中提取文件 URL |
| `beforeUpload` | `(file: File) => boolean \| Promise<boolean>` | - | 上传前钩子，返回 `false` 时跳过该文件 |
| `httpRequest` | `(options: FileUploadRequestOptions) => any \| Promise<any>` | - | 自定义上传请求，返回值会传给 `afterUpload` 和 `onSuccess` |
| `multiple` | `boolean` | `false` | 是否支持多选文件 |
| `max` | `number` | `0` | 最大上传数量，`0` 表示不限制 |
| `directory` | `boolean` | `false` | 是否选择文件夹；启用后只能选择文件夹，文件夹内文件会扁平化上传 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `description` | `string` | `拖放或点击上传` | 描述信息 |

```ts
interface FileUploadRequestOptions {
  action: string
  method: string
  headers: Headers | Record<string, any>
  data: Record<string, any>
  name: string
  file: File
  onProgress: (percent: number) => void
}
```

### Model

| 名称 | 类型 | 说明 |
|------|------|------|
| `modelValue` | `FileItem[]` | 已上传的文件列表（必需） |

### FileItem

```ts
interface FileItem {
  name: string
  size: number
  url?: string
  status?: 'uploading' | 'success' | 'error'
  progress?: number
  file?: File
}
```

## Slots

| 名称 | 说明 |
|------|------|
| `default` | 自定义上传区域内容 |

## Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `onSuccess` | `response: any, file: File` | 单个文件上传成功时触发 |
| `onClick` | `fileItem: FileItem, index: number` | 点击文件项时触发 |

## 粘贴上传

将鼠标移入当前组件，或通过 `Tab` 聚焦当前组件后，可直接按 `Ctrl+V` / `Cmd+V` 粘贴剪贴板中的文件。启用 `directory` 后，粘贴上传不可用。

## 注意事项

1. **文件列表**：`modelValue` 是必需的双向绑定属性。
2. **上传进度**：默认上传请求会自动更新进度；自定义 `httpRequest` 可调用 `onProgress` 更新进度。
3. **状态显示**：上传中、成功、失败状态会自动显示。
4. **重新上传**：失败的文件可以点击重试。
5. **删除文件**：上传成功的文件可以删除。
6. **上传校验**：组件不再内置格式、大小校验，请使用 `beforeUpload` 自行处理。

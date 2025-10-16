# 图片压缩功能设计文档

## 目标
- 支持用户通过拖拽或点击选择本地图片（单张/多张，先实现单张）。
- 用户可选择压缩质量（10-100，默认 85）。
- 提供“确认压缩”按钮，执行本地压缩并提供下载。
- 展示原图与压缩后预览、大小对比，提示压缩率。
- 保持操作简单、反馈明确、在本地完成处理，保护隐私。

## 页面结构（`app/compress/page.tsx`）
- 顶部标题与说明。
- 上传区域：
  - 支持 dragenter/dragover/drop；
  - 支持点击打开文件选择对话框；
  - 仅接受图片类型（`image/*`），拒绝其他类型。
- 质量设置：
  - `input[type=range]`，范围 10-100，默认 85；
  - 右侧实时显示当前质量百分比。
- 操作区：
  - “确认压缩”按钮（无文件时禁用）；
  - 压缩中显示 loading 状态。
- 结果区：
  - 原图与压缩后预览（img 标签）；
  - 大小信息（字节/KB/MB）与压缩率；
  - “下载压缩图片”按钮。

## 交互与状态
- `selectedFile: File | null`：当前选择的原图文件。
- `originalUrl: string | null`：原图预览 URL（`URL.createObjectURL`）。
- `compressedBlob: Blob | null`：压缩后的二进制数据。
- `compressedUrl: string | null`：压缩后预览 URL。
- `quality: number`：压缩质量（0.1-1 映射自 10-100）。
- `isDragging: boolean`：拖拽视觉反馈。
- `isCompressing: boolean`：压缩过程状态。
- `error: string | null`：错误信息（文件类型不符、读取失败等）。

## 压缩方案
- 使用 `<img>` + `<canvas>` 在前端本地完成压缩：
  1. 通过 `FileReader`/`createImageBitmap`/`Image` 加载原图。
  2. 创建 `canvas`，保持原尺寸（后续可扩展尺寸调整）。
  3. 使用 `canvas.toBlob(mime, quality)` 生成压缩 Blob：
     - JPEG 使用 `image/jpeg`；PNG 若非透明可转 JPEG 以获得更高压缩率；
     - 若原图含透明通道则保留 PNG（`image/png`，质量参数对 PNG 无效，后续可引入更高级算法）。
- 兼容性：`canvas.toBlob` 在现代浏览器可用；对不支持环境降级为 `toDataURL` 再转 Blob。

## 文件与类型校验
- 仅接受 `image/*`（`file.type.startsWith('image/')`）。
- 若大小为 0、或图片读取失败，显示错误提示。
- 再次选择文件时，释放旧的 `ObjectURL`。

## 无障碍与可用性
- 拖拽区域支持键盘操作（按钮触发文件选择）。
- 对屏幕阅读器提供 ARIA 标签。
- 主题适配深色模式，hover/active 状态明显。

## 错误处理
- 非图片类型：提示“仅支持图片文件（JPG/PNG/WebP 等）”。
- 读取/压缩失败：提示“压缩失败，请重试”。
- 给出重置/重新选择入口。

## 扩展计划（非本次范围）
- 多图批量压缩与打包下载（ZIP）。
- 尺寸缩放（最大边设置）。
- 更先进压缩（如 UPNG、MozJPEG、Squoosh codecs）。
- EXIF 保留/去除选项。

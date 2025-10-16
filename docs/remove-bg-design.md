# 抠图去背景功能设计文档

## 目标
- 支持上传图片并预览（单张）。
- 一键去除背景，得到透明 PNG 结果。
- 提供结果下载按钮。
- 调用 remove.bg 官方 API，通过服务端代理保护 API Key。

## 端到端流程
1. 用户在 `app/remove-bg/page.tsx` 上传图片（`image/*`）。
2. 前端展示预览，点击“去除背景”。
3. 前端以 `multipart/form-data` 调用本地 API `/api/remove-bg`，字段：
   - `image_file`: 文件
   - `size`: `auto`（默认）
4. 服务端 API 从环境变量 `REMOVE_BG_API_KEY` 读取 Key，转发请求到 `https://api.remove.bg/v1.0/removebg`，并将响应的二进制 PNG 回传。
5. 前端接收 Blob，生成预览 URL，并提供下载。

## 安全
- 不在浏览器内直接使用明文 API Key，避免泄露。
- 将用户提供的 Key 配置为 `.env.local` 中的 `REMOVE_BG_API_KEY`。

## 页面结构
- 左侧上传与预览卡片；右侧结果卡片。
- 中部操作区：
  - “去除背景”按钮（未选择图片时禁用）。
  - 处理中显示加载状态；失败显示错误信息。
- 结果区：
  - 去背景后的图片预览（PNG 透明背景），下载按钮。

## 状态
- `selectedFile: File | null`
- `previewUrl: string | null`
- `isProcessing: boolean`
- `error: string | null`
- `resultBlob: Blob | null`
- `resultUrl: string | null`

## API 设计
- `POST /api/remove-bg`
  - 请求：`multipart/form-data`，字段同 remove.bg。
  - 响应：`image/png` 二进制；错误返回 `JSON { error }`。

## 扩展（非本次范围）
- 批量图片。
- 前景/背景微调。
- 结果尺寸与背景颜色设置。

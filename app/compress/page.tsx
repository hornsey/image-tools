"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function CompressPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);

  const [quality, setQuality] = useState<number>(85);
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

  const formatBytes = (bytes: number): string => {
    if (!bytes) return "0 B";
    const units = ["B", "KB", "MB", "GB"]; 
    let i = 0;
    let n = bytes;
    while (n >= 1024 && i < units.length - 1) {
      n /= 1024;
      i++;
    }
    return `${n % 1 === 0 ? n : n.toFixed(2)} ${units[i]}`;
  };

  const resetCompressed = () => {
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    setCompressedBlob(null);
    setCompressedUrl(null);
  };

  const cleanupObjectUrls = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
  };

  useEffect(() => {
    return () => {
      cleanupObjectUrls();
    };
  }, []);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("仅支持图片文件（JPG/PNG/WebP 等）");
      return;
    }
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    resetCompressed();
    setSelectedFile(file);
    setOriginalSize(file.size);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
  };

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [originalUrl]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // 清空 input 以便重复选择同一文件
    if (e.target) e.target.value = "";
  };

  const detectPreferredMime = (file: File): string => {
    // 对 JPEG/WebP 使用有损压缩；PNG 默认保留 PNG（质量参数不生效），后续可拓展透明检测
    if (file.type.includes("jpeg") || file.type.includes("jpg")) return "image/jpeg";
    if (file.type.includes("webp")) return "image/webp";
    if (file.type.includes("png")) return "image/png";
    // 兜底使用原类型或 JPEG
    return file.type || "image/jpeg";
  };

  const compressImage = async () => {
    if (!selectedFile) return;
    setError(null);
    setIsCompressing(true);
    resetCompressed();
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error("图片加载失败"));
        image.src = originalUrl || URL.createObjectURL(selectedFile);
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas 不支持");
      ctx.drawImage(img, 0, 0);

      const mime = detectPreferredMime(selectedFile);
      const qualityFloat = Math.min(1, Math.max(0.1, quality / 100));

      const blob: Blob | null = await new Promise((resolve) => {
        // 对 PNG，quality 参数通常无效；但保持一致 API
        if (canvas.toBlob) {
          canvas.toBlob((b) => resolve(b), mime, qualityFloat);
        } else {
          // 旧环境降级
          const dataUrl = canvas.toDataURL(mime, qualityFloat);
          const arr = dataUrl.split(",");
          const mimeMatch = arr[0].match(/:(.*?);/);
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) u8arr[n] = bstr.charCodeAt(n);
          resolve(new Blob([u8arr], { type: mimeMatch ? mimeMatch[1] : mime }));
        }
      });

      if (!blob) throw new Error("压缩失败，请重试");
      setCompressedBlob(blob);
      const url = URL.createObjectURL(blob);
      setCompressedUrl(url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "压缩失败，请重试");
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedBlob) return;
    const a = document.createElement("a");
    const extension = (compressedBlob.type.includes("png") ? "png" : compressedBlob.type.includes("webp") ? "webp" : "jpg");
    a.href = compressedUrl as string;
    a.download = `compressed.${extension}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            图片压缩
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            智能压缩图片，保持高质量的同时减小文件大小
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? "border-blue-400 bg-blue-50/50 dark:bg-blue-900/20" : "border-gray-300 dark:border-gray-600"
              }`}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
            >
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {selectedFile ? "已选择图片" : "拖拽图片到此处"}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {selectedFile ? selectedFile.name : "或者点击选择文件"}
              </p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={openFileDialog} className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  选择图片
                </button>
                {selectedFile && (
                  <button onClick={() => handleFiles(null)} className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors">
                    重置
                  </button>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  压缩质量
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{quality}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="mt-4 text-right">
                <button
                  onClick={compressImage}
                  disabled={!selectedFile || isCompressing}
                  className={`inline-flex items-center justify-center bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-lg transition-colors`}
                >
                  {isCompressing ? "压缩中..." : "确认压缩"}
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">原始大小</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{originalSize ? formatBytes(originalSize) : "-"}</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">压缩后</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">{compressedBlob ? formatBytes(compressedBlob.size) : "-"}</p>
              </div>
            </div>

            {(originalUrl || compressedUrl) && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {originalUrl && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">原图预览</p>
                    <img src={originalUrl} alt="原图预览" className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700" />
                  </div>
                )}
                {compressedUrl && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">压缩后预览</p>
                    <img src={compressedUrl} alt="压缩后预览" className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700" />
                  </div>
                )}
              </div>
            )}

            {compressedBlob && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  压缩率：{originalSize && compressedBlob ? `${Math.max(0, (100 - (compressedBlob.size / originalSize) * 100)).toFixed(1)}%` : "-"}
                </p>
                <button onClick={downloadCompressed} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                  下载压缩图片
                </button>
              </div>
            )}

            {error && (
              <div className="mt-6 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";

export default function RemoveBgPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [previewUrl, resultUrl]);

  const onChoose = () => fileInputRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!file.type.startsWith("image/")) {
      setError("仅支持图片文件（JPG/PNG/WebP 等）");
      return;
    }
    setError(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultBlob(null);
    setResultUrl(null);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    // 允许重复选择同一文件
    e.target.value = "";
  };

  const removeBackground = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    setResultUrl(null);
    try {
      const form = new FormData();
      form.append("image_file", selectedFile);
      form.append("size", "auto");

      const resp = await fetch("/api/remove-bg", {
        method: "POST",
        body: form,
      });

      if (!resp.ok) {
        const maybeJson = await resp.json().catch(() => null);
        throw new Error(maybeJson?.error || `去背景失败（${resp.status}）`);
      }
      const blob = await resp.blob();
      setResultBlob(blob);
      setResultUrl(URL.createObjectURL(blob));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "去背景失败，请重试");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!resultBlob || !resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "no-bg.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            抠图去背景
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            AI智能识别，一键去除图片背景
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    上传图片
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    支持 JPG、PNG、WebP 格式
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={onChoose} className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                      选择图片
                    </button>
                    {selectedFile && (
                      <button onClick={() => { setSelectedFile(null); if (previewUrl) URL.revokeObjectURL(previewUrl); setPreviewUrl(null); if (resultUrl) URL.revokeObjectURL(resultUrl); setResultBlob(null); setResultUrl(null); }} className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors">
                        重置
                      </button>
                    )}
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
                  {previewUrl && (
                    <div className="mt-6 text-left">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">预览</p>
                      <img src={previewUrl} alt="原图预览" className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700" />
                    </div>
                  )}
                </div>
              </div>

              <div className="relative">
                <div className="border-2 border-dashed border-green-300 dark:border-green-600 rounded-lg p-8 text-center bg-green-50 dark:bg-green-900/20">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">
                    处理结果
                  </h3>
                  <p className="text-green-600 dark:text-green-300 mb-4">
                    {resultUrl ? "背景已去除，可下载透明PNG" : "去除背景后在此显示结果"}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={removeBackground} disabled={!selectedFile || isProcessing} className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2 px-6 rounded-lg transition-colors">
                      {isProcessing ? "处理中..." : "去除背景"}
                    </button>
                    {resultUrl && (
                      <button onClick={downloadResult} className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                        下载图片
                      </button>
                    )}
                  </div>
                  {resultUrl && (
                    <div className="mt-6 text-left">
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">结果预览（透明 PNG ）</p>
                      <img src={resultUrl} alt="去背景结果" className="w-full h-auto rounded-lg border border-green-200 dark:border-green-700" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-8 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
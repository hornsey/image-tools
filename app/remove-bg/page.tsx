export default function RemoveBgPage() {
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
                  <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                    选择图片
                  </button>
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
                    背景已去除，可下载透明PNG
                  </p>
                  <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                    下载图片
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  高级选项
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="auto-enhance" className="mr-2" defaultChecked />
                    <label htmlFor="auto-enhance" className="text-sm text-gray-700 dark:text-gray-300">
                      自动增强边缘
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="hair-detail" className="mr-2" defaultChecked />
                    <label htmlFor="hair-detail" className="text-sm text-gray-700 dark:text-gray-300">
                      头发细节优化
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="shadow-keep" className="mr-2" />
                    <label htmlFor="shadow-keep" className="text-sm text-gray-700 dark:text-gray-300">
                      保留阴影
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
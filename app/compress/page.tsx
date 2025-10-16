export default function CompressPage() {
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
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                拖拽图片到此处
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                或者点击选择文件
              </p>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                选择图片
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  压缩质量
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">85%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                defaultValue="85"
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">原始大小</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">2.5 MB</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">压缩后</p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">850 KB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
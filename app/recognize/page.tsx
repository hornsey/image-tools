export default function RecognizePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            图片识别
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            AI智能识别图片内容，提取文字和物体信息
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative">
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9A2.25 2.25 0 0013.5 5.25h-9A2.25 2.25 0 002.25 7.5v9A2.25 2.25 0 004.5 18.75z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                    上传或拍摄图片
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    支持 OCR 文字识别和物体检测
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      选择图片
                    </button>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      拍照识别
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-full">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                    识别结果
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        检测到的文字
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        这里将显示识别到的文字内容...
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                        识别到的物体
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm">
                          文字
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full text-sm">
                          人物
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full text-sm">
                          建筑
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  识别模式
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <input type="radio" name="recognize-mode" id="ocr" className="mr-2" defaultChecked />
                    <label htmlFor="ocr" className="text-sm text-gray-700 dark:text-gray-300">
                      OCR文字识别
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="recognize-mode" id="object" className="mr-2" />
                    <label htmlFor="object" className="text-sm text-gray-700 dark:text-gray-300">
                      物体检测
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" name="recognize-mode" id="all" className="mr-2" />
                    <label htmlFor="all" className="text-sm text-gray-700 dark:text-gray-300">
                      综合识别
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
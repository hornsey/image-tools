export default function AiGeneratePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            AI 生图
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            输入文字描述，AI 为您生成精美图片
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="relative">
                <div className="space-y-6">
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      图片描述
                    </label>
                    <textarea
                      id="prompt"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="例如：一只可爱的猫咪坐在樱花树下，阳光透过花瓣洒在猫咪身上，日式动漫风格"
                      defaultValue="一只可爱的猫咪坐在樱花树下，阳光透过花瓣洒在猫咪身上，日式动漫风格"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="style" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        风格
                      </label>
                      <select
                        id="style"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option>写实风格</option>
                        <option>动漫风格</option>
                        <option>水彩画</option>
                        <option>油画风格</option>
                        <option>赛博朋克</option>
                        <option>极简主义</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        尺寸
                      </label>
                      <select
                        id="size"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option>1024x1024</option>
                        <option>1024x768</option>
                        <option>768x1024</option>
                        <option>1920x1080</option>
                      </select>
                    </div>
                  </div>

                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    生成图片
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="border-2 border-dashed border-orange-300 dark:border-orange-600 rounded-lg p-8 text-center bg-orange-50 dark:bg-orange-900/20 h-full flex flex-col justify-center">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-orange-700 dark:text-orange-400 mb-2">
                    AI 生成结果
                  </h3>
                  <p className="text-orange-600 dark:text-orange-300 mb-4">
                    您的创意将在这里呈现
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p>预计生成时间：30-60秒</p>
                    <p>消耗积分：10积分</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  快速提示词
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    风景照片
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    人物肖像
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    产品设计
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    抽象艺术
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    建筑风格
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    动物世界
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    美食摄影
                  </button>
                  <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    科技未来
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
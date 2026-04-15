import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            OpenEVAI
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            建筑与室内设计 AI 生成工具
            <br />
            用 AI 快速生成专业级的建筑和室内效果图
          </p>
        </header>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Text to Image Card */}
          <Link 
            href="/txt2img"
            className="block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              文生图
            </h2>
            <p className="text-gray-600 mb-4">
              输入文字描述，一键生成建筑或室内设计效果图。支持多种风格选择，从现代中式到极简主义。
            </p>
            <div className="text-accent font-semibold">
              开始创作 →
            </div>
          </Link>

          {/* Image to Image Card */}
          <Link 
            href="/img2img"
            className="block p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
          >
            <div className="text-4xl mb-4">🖼️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              图生图
            </h2>
            <p className="text-gray-600 mb-4">
              上传草图或白模图片，AI 自动渲染成精美效果图。保持原有结构，提升视觉效果。
            </p>
            <div className="text-accent font-semibold">
              上传草图 →
            </div>
          </Link>
        </div>

        {/* History Link */}
        <div className="text-center mt-12">
          <Link 
            href="/history"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span className="mr-2">📚</span>
            查看历史记录
          </Link>
        </div>

        {/* Features Section */}
        <section className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            核心功能
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-2xl mb-3">🎨</div>
              <h4 className="font-semibold text-gray-900 mb-2">多种风格</h4>
              <p className="text-sm text-gray-600">
                现代中式、极简、新古典等多种建筑和室内风格预设
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-2xl mb-3">✨</div>
              <h4 className="font-semibold text-gray-900 mb-2">智能提示词</h4>
              <p className="text-sm text-gray-600">
                大白话自动转换为专业级 AI 绘画提示词
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-2xl mb-3">⚡</div>
              <h4 className="font-semibold text-gray-900 mb-2">快速生成</h4>
              <p className="text-sm text-gray-600">
                基于 Stable Diffusion XL，10-30 秒出图
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

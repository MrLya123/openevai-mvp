'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const ARCHITECTURE_STYLES = [
  { value: 'modern-chinese', label: '现代中式', prompt: '现代中式风格，简洁线条，传统元素现代化表达，灰色调为主' },
  { value: 'minimalist', label: '极简主义', prompt: '极简主义风格，干净利落，大面积留白，几何形态' },
  { value: 'neoclassical', label: '新古典', prompt: '新古典主义风格，对称布局，精致装饰，优雅庄重' },
  { value: 'contemporary', label: '当代风格', prompt: '当代建筑风格，创新材料，玻璃幕墙，流线型设计' },
  { value: 'industrial', label: '工业风', prompt: '工业风格，裸露结构，金属材质，粗犷质感' },
  { value: 'mediterranean', label: '地中海风格', prompt: '地中海风格，白色墙面，蓝色点缀，拱形门窗' },
]

const INTERIOR_STYLES = [
  { value: 'modern-luxury', label: '现代轻奢', prompt: '现代轻奢风格，高级材质，精致细节，低调奢华' },
  { value: 'nordic', label: '北欧风', prompt: '北欧风格，自然光线，木质元素，舒适温馨' },
  { value: 'new-chinese', label: '新中式', prompt: '新中式风格，传统韵味，现代功能，禅意空间' },
  { value: 'art-deco', label: '装饰艺术', prompt: '装饰艺术风格，几何图案，金属装饰，复古优雅' },
  { value: 'wabi-sabi', label: '侘寂风', prompt: '侘寂风格，自然质朴，不完美之美，宁静致远' },
  { value: 'smart-home', label: '智能家居', prompt: '智能家居风格，科技感，自动化设备，现代便利' },
]

export default function Txt2ImgPage() {
  const [prompt, setPrompt] = useState('')
  const [styleType, setStyleType] = useState<'architecture' | 'interior'>('architecture')
  const [selectedStyle, setSelectedStyle] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('请输入描述内容')
      return
    }

    setIsGenerating(true)
    setError(null)
    setResult(null)

    try {
      const stylePrompt = (styleType === 'architecture' 
        ? ARCHITECTURE_STYLES.find(s => s.value === selectedStyle)?.prompt 
        : INTERIOR_STYLES.find(s => s.value === selectedStyle)?.prompt) || ''

      const fullPrompt = stylePrompt ? `${prompt}，${stylePrompt}` : prompt

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: fullPrompt,
          mode: 'txt2img',
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '生成失败')
      }

      const data = await response.json()
      setResult(data.output?.[0] || data.urls?.[0])
      
      // Save to history
      if (data.output?.[0] || data.urls?.[0]) {
        const history = JSON.parse(localStorage.getItem('openevai_history') || '[]')
        history.unshift({
          type: 'txt2img',
          prompt: fullPrompt,
          imageUrl: data.output?.[0] || data.urls?.[0],
          timestamp: new Date().toISOString(),
        })
        localStorage.setItem('openevai_history', JSON.stringify(history.slice(0, 20)))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  const currentStyles = styleType === 'architecture' ? ARCHITECTURE_STYLES : INTERIOR_STYLES

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">文生图</h1>
          <p className="text-gray-600 mt-2">输入描述，生成建筑或室内设计效果图</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                类型选择
              </label>
              <div className="flex gap-4">
                <button
                  onClick={() => { setStyleType('architecture'); setSelectedStyle('') }}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                    styleType === 'architecture'
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🏛️ 建筑设计
                </button>
                <button
                  onClick={() => { setStyleType('interior'); setSelectedStyle('') }}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
                    styleType === 'interior'
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  🏠 室内设计
                </button>
              </div>
            </div>

            {/* Style Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                风格选择（可选）
              </label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="">不指定风格</option>
                {currentStyles.map((style) => (
                  <option key={style.value} value={style.value}>
                    {style.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                描述内容
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：高端现代中式风格的独栋别墅建筑，深灰色大理石外立面，黄昏时分，8K 超高清"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                提示：描述越详细，生成效果越好。可以包含建筑风格、材质、光线、时间等信息
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-4 bg-accent hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  正在生成中...（约 10-30 秒）
                </>
              ) : (
                '✨ 开始生成'
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">生成结果</h2>
            
            {isGenerating && (
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                  <p className="text-gray-600">AI 正在创作中...</p>
                  <p className="text-sm text-gray-500 mt-2">这可能需要 10-30 秒</p>
                </div>
              </div>
            )}

            {!isGenerating && result && (
              <div className="space-y-4">
                <Image
                  src={result}
                  alt="Generated image"
                  width={512}
                  height={512}
                  className="w-full rounded-lg"
                  unoptimized
                />
                <div className="flex gap-3">
                  <a
                    href={result}
                    download="openevai-generated.png"
                    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-center font-medium transition-colors"
                  >
                    📥 下载图片
                  </a>
                  <button
                    onClick={() => setResult(null)}
                    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    🔄 重新生成
                  </button>
                </div>
              </div>
            )}

            {!isGenerating && !result && (
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">🎨</div>
                  <p>生成的图片将在这里显示</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

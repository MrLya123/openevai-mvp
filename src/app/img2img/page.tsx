'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const STYLE_PRESETS = [
  { value: 'realistic', label: '写实渲染', prompt: '照片级真实感，精细材质，自然光照，8K 超高清' },
  { value: 'artistic', label: '艺术表现', prompt: '艺术化处理，强调氛围，色彩丰富，富有表现力' },
  { value: 'architectural', label: '建筑表现', prompt: '专业建筑摄影风格，清晰结构，精准透视' },
  { value: 'conceptual', label: '概念设计', prompt: '概念艺术风格，创意表达，独特视角' },
]

export default function Img2ImgPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState('')
  const [stylePreset, setStylePreset] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('请选择图片文件')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('图片大小不能超过 10MB')
      return
    }

    setImageFile(file)
    setError(null)

    const reader = new FileReader()
    reader.onloadend = () => {
      setSelectedImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleImageSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleGenerate = async () => {
    if (!imageFile) {
      setError('请上传图片')
      return
    }

    setIsGenerating(true)
    setError(null)
    setResult(null)

    try {
      // Convert image to base64
      const base64Image = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(imageFile)
      })

      // Remove data:image/xxx;base64, prefix
      const cleanBase64 = base64Image.split(',')[1]

      const stylePrompt = STYLE_PRESETS.find(s => s.value === stylePreset)?.prompt || ''
      const fullPrompt = stylePrompt ? `${prompt}，${stylePrompt}` : prompt

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: fullPrompt || 'enhance this architectural image, professional rendering, high quality',
          mode: 'img2img',
          image: cleanBase64,
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
          type: 'img2img',
          prompt: fullPrompt,
          originalImage: selectedImage,
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

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-gray-600 hover:text-gray-900 mb-4 inline-block">
            ← 返回首页
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">图生图</h1>
          <p className="text-gray-600 mt-2">上传草图或白模，AI 自动渲染成效果图</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. 上传图片</h2>
              
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-accent transition-colors"
              >
                {selectedImage ? (
                  <div className="relative">
                    <Image
                      src={selectedImage}
                      alt="Uploaded"
                      width={400}
                      height={300}
                      className="mx-auto rounded-lg max-h-64 object-contain"
                      unoptimized
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage(null)
                        setImageFile(null)
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="text-6xl mb-4">📁</div>
                    <p className="text-gray-700 font-medium mb-2">
                      点击或拖拽上传图片
                    </p>
                    <p className="text-sm text-gray-500">
                      支持 JPG、PNG 格式，最大 10MB
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleImageSelect(e.target.files[0])}
                className="hidden"
              />

              {error && !selectedImage && (
                <div className="mt-3 text-red-600 text-sm">⚠️ {error}</div>
              )}
            </div>

            {/* Style Preset */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. 选择渲染风格（可选）</h2>
              <div className="grid grid-cols-2 gap-3">
                {STYLE_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setStylePreset(preset.value)}
                    className={`py-3 px-4 rounded-lg font-medium transition-colors text-sm ${
                      stylePreset === preset.value
                        ? 'bg-accent text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. 补充描述（可选）</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="例如：现代简约风格客厅，米色沙发，落地窗，自然光线"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                可以描述材质、颜色、光线等细节，留空则自动优化
              </p>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !selectedImage}
              className="w-full py-4 bg-accent hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  正在渲染中...（约 10-30 秒）
                </>
              ) : (
                '🎨 开始渲染'
              )}
            </button>

            {error && selectedImage && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">生成结果</h2>

            {isGenerating && (
              <div className="space-y-4">
                <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
                    <p className="text-gray-600">AI 正在渲染中...</p>
                    <p className="text-sm text-gray-500 mt-2">这可能需要 10-30 秒</p>
                  </div>
                </div>
              </div>
            )}

            {!isGenerating && result && selectedImage && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">原图</p>
                    <Image
                      src={selectedImage}
                      alt="Original"
                      width={256}
                      height={256}
                      className="w-full rounded-lg"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">生成结果</p>
                    <Image
                      src={result}
                      alt="Generated"
                      width={256}
                      height={256}
                      className="w-full rounded-lg"
                      unoptimized
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <a
                    href={result}
                    download="openevai-rendered.png"
                    className="flex-1 py-2 px-4 bg-accent hover:bg-blue-700 text-white rounded-lg text-center font-medium transition-colors"
                  >
                    📥 下载结果
                  </a>
                  <button
                    onClick={() => setResult(null)}
                    className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                  >
                    🔄 重新渲染
                  </button>
                </div>
              </div>
            )}

            {!isGenerating && !result && (
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-6xl mb-4">🖼️</div>
                  <p>渲染后的图片将在这里显示</p>
                  <p className="text-sm mt-2">与原图对比查看效果</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

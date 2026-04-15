'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface HistoryItem {
  type: 'txt2img' | 'img2img'
  prompt: string
  imageUrl: string
  originalImage?: string
  timestamp: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('openevai_history')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  const clearHistory = () => {
    localStorage.removeItem('openevai_history')
    setHistory([])
  }

  const deleteItem = (index: number) => {
    const newHistory = history.filter((_, i) => i !== index)
    localStorage.setItem('openevai_history', JSON.stringify(newHistory))
    setHistory(newHistory)
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('zh-CN')
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <Link href="/" className="text-gray-600 hover:text-gray-900 mb-2 inline-block">
              ← 返回首页
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">历史记录</h1>
            <p className="text-gray-600 mt-2">查看最近生成的图片</p>
          </div>
          {history.length > 0 && (
            <button
              onClick={clearHistory}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
            >
              🗑️ 清空记录
            </button>
          )}
        </div>

        {/* History Grid */}
        {history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-16 text-center">
            <div className="text-8xl mb-6">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">暂无历史记录</h2>
            <p className="text-gray-600 mb-8">
              开始创作你的第一个设计吧！
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/txt2img"
                className="px-6 py-3 bg-accent hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                📝 文生图
              </Link>
              <Link
                href="/img2img"
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors"
              >
                🖼️ 图生图
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-square relative">
                  <Image
                    src={item.imageUrl}
                    alt="Generated"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {item.type === 'img2img' && item.originalImage && (
                    <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                      图生图
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {item.prompt}
                  </p>
                  <p className="text-xs text-gray-400 mb-3">
                    {formatDate(item.timestamp)}
                  </p>
                  <div className="flex gap-2">
                    <a
                      href={item.imageUrl}
                      download={`openevai-${index}.png`}
                      className="flex-1 py-2 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors text-center"
                    >
                      📥 下载
                    </a>
                    <button
                      onClick={() => deleteItem(index)}
                      className="py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-sm font-medium transition-colors"
                    >
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {history.length > 0 && (
          <div className="mt-8 text-center text-gray-500 text-sm">
            共 {history.length} 条记录 · 仅保存在本地浏览器
          </div>
        )}
      </div>
    </main>
  )
}

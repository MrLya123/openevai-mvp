#!/bin/bash

echo "🦞 OpenEVAI MVP 快速启动脚本"
echo "================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  未找到 .env.local 文件"
    echo "正在从 .env.example 创建..."
    cp .env.example .env.local
    echo ""
    echo "❗ 请编辑 .env.local 文件，填入你的 REPLICATE_API_TOKEN"
    echo "   获取地址：https://replicate.com/account/api-tokens"
    echo ""
    read -p "完成后按回车继续..." 
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

echo ""
echo "🚀 启动开发服务器..."
echo "访问地址：http://localhost:3000"
echo ""

npm run dev

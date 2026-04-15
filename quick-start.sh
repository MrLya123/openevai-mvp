#!/bin/bash

echo "🦞 OpenEVAI MVP - 快速启动脚本"
echo "================================"
echo ""

# 检查是否在正确目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误：请在项目根目录运行此脚本"
    echo "   正确路径：/home/gem/workspace/agent/workspace/openevai-mvp"
    exit 1
fi

# 检查 node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 正在安装依赖..."
    npm install
fi

# 检查环境变量
if [ ! -f ".env.local" ]; then
    echo "⚠️  环境变量未配置"
    echo "   已创建 .env.local（演示模式）"
    echo "   如需真实生成，请编辑 .env.local 添加 REPLICATE_API_TOKEN"
    cp .env.example .env.local
fi

echo ""
echo "🚀 启动开发服务器..."
echo ""
echo "   本地访问：http://localhost:3000"
echo ""
echo "   按 Ctrl+C 停止服务器"
echo ""

npm run dev
#!/bin/bash

echo "正在启动任务拆解助手..."
echo

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "错误：未找到 Node.js，请先安装 Node.js"
    echo "下载地址：https://nodejs.org/"
    exit 1
fi

# 检查是否已安装依赖
if [ ! -d "node_modules" ]; then
    echo "正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "错误：依赖安装失败"
        exit 1
    fi
fi

echo "启动开发服务器..."
npm run dev 
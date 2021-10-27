#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 项目发布
cd ../pisaai

git pull && cp -r ../pisaai.com/dist .
git add .
git commit -m 'deploy'
git push

cd -

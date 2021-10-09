#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd dist

# git init
git init
git add -A
git commit -m 'deploy'


git push -f https://github.com/wearebug/pisaai.com.git master:gh-pages

cd -

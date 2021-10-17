#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd dist

# 生成域名验证文件
echo pisaai.com > CNAME

# 修复Github pages 部署时, history 模式路由访问子路由提示 404 的问题
cat index.html > 404.html

# git init
git init
git add -A
git commit -m 'deploy'


git push -f git@github.com:wearebug/wearebug.github.io.git master

cd -

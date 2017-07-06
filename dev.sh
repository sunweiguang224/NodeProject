#!/bin/bash

# jenkins已有参数
# env_flag、root_flag

# 需要jenkins提供的参数
# pre_cmd(字符串类型，默认空字符串)：发布脚本执行前运行的命令
# reload_modules(布尔类型，默认false)：是否重新安装node_modules
reload_modules=true;

cp -r ./ /Users/swg/Desktop/test

# 发布脚本执行前运行的命令
if [ $reload_modules == true ]
 then
  rm -rf node_modules
fi

# 是否重新安装node_modules
if [ $reload_modules == true ]
 then
  rm -rf node_modules
fi

# 更新svn
svn update

# 如果node项目没有node_modules目录时，安装node模块
if (test -f package.json) && !(test -d ./node_modules); then
  npm install
fi

# 代码编译
npm run build

# 执行完毕
echo '发布完毕'



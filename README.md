# NodeProject(Node前端开发自动化构建工程)

1.首先安装需要的模块：
  npm install                   // gulp编译需要的模块
  npm install supervisor -g     // 服务器自动重启工具
  npm install nrm -g            // 源管理工具
2.md5版本号，需要修改如下文件中的代码：
  node_modules\gulp-rev\index.js( manifest[originalFile] = revisionedFile;  ->  manifest[originalFile] = originalFile + '?v=' + file.revHash; )
  node_modules\rev-path\index.js( return filename + '-' + hash + ext;  ->  return filename + ext; )
  node_modules\gulp-rev-collector\index.js( path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' )  ->  path.basename(json[key]).split('?')[0] )
3.如windows编译node-sass不成功，则将other/node-sass.zip解压后放入node_modules文件夹下。
4.谷歌商店添加JetBrains IDE Support扩展实现文件变化自动刷新浏览器。
5.启动方式：
  npm start
  npm run build
  npm start -- --name login
  npm run build -- --name login
6.启动express http服务：
  npm run server 或 node server.js

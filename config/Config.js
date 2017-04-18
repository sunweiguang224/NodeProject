var minimist = require('minimist'); // 获取key-value形势的参数，如 npm run build -- --name login --age 18

// 分模块编译，优先级：命令行 > 指定 > 全部，
var args = minimist(process.argv);
var pageName = args.name || '' || '*';

// ************************************ 变量Config ************************************
var Config = {};

/*默认无值移动端,这个值决定npm run create时使用pc或mobile模板*/
Config.runtime = 'pc';

// 代码输出方式, static(静态文件) | express(express服务)
Config.output = 'static';
// Config.output = 'express';

// 源代码路径
Config.sourcePath = {
  root: 'src',
  css: [
    'src/*common/css/**/*.*',     // 原先写法 css: 'src/*(page|common)/**/css/*.scss',
    'src/*page/' + pageName + '/css/*.scss'
  ],
  icon: 'src/**/img/icon*/*',
  img: [
    'src/*common/img/*.*',
    'src/*page/' + pageName + '/img/*.*',
    'src/*widget/*/img/*.?(png|jpg|gif)',
  ],
  html: 'src/*page/' + pageName + '/*.html',
  router: 'src/*page/' + pageName + '/*.js',
  js: {
    common: 'src/*common/js/*.js',	// 由nodejs负责
    page: 'src/*page/' + pageName + '/js/*.js*'		// 由webpack负责(js或者jsx,jsx给react用)
  },
};
// 生成器模板文件路径
Config.generatorPath = {
  m: [
    'config/generator/m/**/*.*'
  ],
  pc: [
    'config/generator/pc/**/*.*'
  ]
};
// 开发环境编译路径
Config.developPath = {
  root: 'dev',
  static: 'dev/static',
  router: 'dev/router'
};
// 生产环境编译路径
Config.productPath = {
  root: 'dist',
  static: 'dist/static',
  router: 'dist/router',
  temp: '.temp'
};

module.exports = Config;

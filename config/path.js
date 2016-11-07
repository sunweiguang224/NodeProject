var minimist = require('minimist'); // 获取key-value形势的参数，如 npm run build -- --name login --age 18

// 分模块编译，优先级：命令行 > 指定 > 全部，
var args = minimist(process.argv);
var moduleName = args.name || '' || '*';

// ************************************ 变量Path ************************************
const Path = {
	srcRoot: 'src',
	devRoot: 'dev',
	distRoot: 'dist',
  tempRoot: '.temp'
};
Path.src = {
	css: [
    Path.srcRoot + '/*common/css/**/*.*',     // 原先写法 css: Path.srcRoot + '/*(module|common)/**/css/*.scss',
    Path.srcRoot + '/*module/'+moduleName+'/css/*.scss'
  ],
	icon: {
    module: Path.srcRoot + '/*module/*/img/*/*', // common模块下图片是公用的，页面之间可以利用缓存，故不作处理
    common: Path.srcRoot + '/*common/img/*/*'
  },
	img: [
    Path.srcRoot + '/*common/img/*.*',
    Path.srcRoot + '/*module/'+moduleName+'/img/*.*'
  ],
	html: Path.srcRoot + '/*module/'+moduleName+'/*.html',
	router: Path.srcRoot + '/*module/'+moduleName+'/*.js',
	js: {
		common: Path.srcRoot + '/*common/js/*.js',	// 由nodejs负责
		module: Path.srcRoot + '/*module/'+moduleName+'/js/*.js'		// 由webpack负责
	},
	generator: {
    mobile: [
      'config/generator/mobile/*.html',
      'config/generator/mobile/*/*'
    ],
    pc: [
      'config/generator/pc/*.html',
      'config/generator/pc/*/*'
    ]
  }
};

/*默认无值移动端*/
Path.env = 'pc';

module.exports = Path;
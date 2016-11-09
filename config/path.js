var minimist = require('minimist'); // 获取key-value形势的参数，如 npm run build -- --name login --age 18

// 分模块编译，优先级：命令行 > 指定 > 全部，
var args = minimist(process.argv);
var pageName = args.name || '' || '*';

// ************************************ 变量Path ************************************
const Path = {
	srcRoot: 'src',
	devRoot: 'dev',
	distRoot: 'dist',
  tempRoot: '.temp'
};
Path.src = {
	css: [
    Path.srcRoot + '/*common/css/**/*.*',     // 原先写法 css: Path.srcRoot + '/*(page|common)/**/css/*.scss',
    Path.srcRoot + '/*page/'+pageName+'/css/*.scss'
  ],
	icon: {
		page: Path.srcRoot + '/*page/*/img/*/*',
		widget: Path.srcRoot + '/*widget/*/img/*/*',
    common: Path.srcRoot + '/*common/img/*/*', // common模块下图片是公用的，页面之间可以利用缓存，故不作处理
	},
	img: [
    Path.srcRoot + '/*common/img/*.*',
    Path.srcRoot + '/*page/'+pageName+'/img/*.*',
    Path.srcRoot + '/*widget/*/img/*.*',
  ],
	html: Path.srcRoot + '/*page/'+pageName+'/*.html',
	router: Path.srcRoot + '/*page/'+pageName+'/*.js',
	js: {
		common: Path.srcRoot + '/*common/js/*.js',	// 由nodejs负责
		page: Path.srcRoot + '/*page/'+pageName+'/js/*.js'		// 由webpack负责
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

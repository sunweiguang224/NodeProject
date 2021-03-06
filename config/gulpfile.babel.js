/**
 * gulp配置文件
 * Created by weiguangsun on 2016/4/5.
 * 由gulpfile.js命名为gulpfile.babel.js，gulp读取配置文件时自动调用babel，
 * 前提需要先安装babel-core、babel-preset-es2015、babel-preset-stage-0
 */
// 引入组件
import NodeUtil from './NodeUtil.js';
import Config from './Config.js';
import gulp from 'gulp';
//$ = require('gulp-load-plugins')(),		//插件加载器，启动加载devDependencies中所有插件
import uglify from 'gulp-uglify';		// js压缩混淆
import rename from 'gulp-rename';		// 文件重命名
import sass from 'gulp-sass';			// sass预编译
import concat from 'gulp-concat';			// 文件合并 .pipe(concat('all.js'
import minifyHtml from 'gulp-minify-html';		// html压缩
import imagemin from 'gulp-imagemin';		// 图片压缩
import liveReload from 'gulp-livereload';		// 文件变化时自动刷新浏览器，chrome需要安装LiveReload插件
import minifyCss from 'gulp-minify-css';		// css压缩
import replace from 'gulp-replace';		// 文件清除
import clean from 'gulp-clean';	// 清除目录下的内容
import runSequence from 'run-sequence';	// 使gulp任务按顺序执行，因为gulp里任务默认是异步执行的
import webpack from 'webpack-stream';		//webpack
import autoprefixer from 'gulp-autoprefixer';		// 自动添加css前缀
import header from 'gulp-header';		// 自动添加文件头
import size from 'gulp-size';		// 显示gulp.dest输出到磁盘上的文件尺寸
import sourcemaps from 'gulp-sourcemaps';		// 生成sourcemaps
import fs from 'fs';		// 文件操作模块
import inquirer from 'inquirer';		// 控制台接收输入
import babel from 'gulp-babel';		// es6编译
import fileInclude from 'gulp-file-include';		// 为html引入tpl模板
import spritesmith from 'gulp.spritesmith';		// 精灵图
import glob from 'glob';		// 路径匹配
import mergeStream from 'merge-stream';		// 合并流然后返回给run-sequence保证任务顺序执行
import path from 'path';		// 路径解析模块
import rev from 'gulp-rev';		// 修改文件名增加md5，并生成rev-manifest.json
import revCollector from 'gulp-rev-collector';		// 根据rev-manifest.json对html中引用的静态资源路径做替换
import gzip from 'gulp-gzip';		// gzip对html、js、css、img进行强力压缩，用法：.pipe(gzip({append: false})) //去掉.gz后缀
import supervisor from 'supervisor';		// 监控文件修改，并重启进程

// ************************************ 编译目录清理 ************************************
gulp.task('task_clean_dev', () => {
  console.log('>>>>>>>>>>>>>>> 开发目录开始清理。' + NodeUtil.getNow());
  return gulp.src(Config.developPath.root).pipe(clean());
});
gulp.task('task_clean_dist', () => {
  console.log('>>>>>>>>>>>>>>> 发布目录开始清理。' + NodeUtil.getNow());
  return gulp.src(Config.productPath.root).pipe(clean())
});
gulp.task('task_clean_temp', () => {
  console.log('>>>>>>>>>>>>>>> 临时目录开始清理。' + NodeUtil.getNow());
  return gulp.src(Config.productPath.temp).pipe(clean())
});

// ************************************ 编译CSS ************************************
function compileCss() {
  console.log('>>>>>>>>>>>>>>> css文件开始编译。' + NodeUtil.getNow());
  return gulp.src(Config.sourcePath.css)		// return这个流是为了保证任务按顺序执行
    .pipe(sourcemaps.init())	// 放到最开始才能对应原始的scss文件
    .pipe(sass({outputStyle: 'uncompressed'}))
    .pipe(sourcemaps.write({includeContent: false}))  // 使用处理之前的源文件，当CSS被多个插件处理时，要加这句话，否则对应关系会错乱
    // .pipe(autoprefixer({
    //   browsers: ['last 100 versions', '> 1%'], cascade: false
    // }));
    .pipe(autoprefixer());
}
gulp.task('task_css_dev', () => {
  return compileCss()
    .pipe(sourcemaps.write('./'))	// 写到目标css同级目录下
    .pipe(gulp.dest(Config.developPath.static));
});
gulp.task('task_css_dist', () => {
  return compileCss()
    .pipe(header('\/* This css was compiled at ' + NodeUtil.getNow() + '. *\/\n'))
    //.pipe(minifyCss())
    .pipe(rename({suffix: '.min'}))
    .pipe(rev())
    .pipe(size({showFiles: true}))
    .pipe(rev.manifest('rev-manifest/css.json'))
    .pipe(gulp.dest(Config.productPath.temp))
    ;
});

// ************************************ 合成精灵图+生成scss ************************************
gulp.task('task_sprite', () => {
  console.log('>>>>>>>>>>>>>>> 开始合成精灵图。' + NodeUtil.getNow());
  let merged = mergeStream();
  let iconDirs = glob.sync(path.normalize(Config.sourcePath.icon + '/..'));
  iconDirs.forEach(function (iconDir) {
    if (fs.statSync(iconDir).isDirectory()) {
      console.log(iconDir);
      let dirArr = iconDir.split('/');
      // 临时dir数组
      let newDirArray = [].concat(dirArr);
      newDirArray.shift();
      let dirName = newDirArray.pop();
      let stream = gulp.src(iconDir + '/*')
        .pipe(spritesmith({
          cssTemplate: `./config/spritesmith/spritesmith.${Config.runtime}.hbs`,
          padding: 10,
          layout: 'top-down',
          imgName: `${dirName}.png`,
          cssName: `_${dirName}.scss`,
          // 取相对路径即可,因为css和img是部署在一起的
          imgPath: `../../../${newDirArray.join('/')}/${dirName}.png`,
          cssVarMap: function(sprite){
            sprite.mixinName = `i-${dirArr[1]}-${sprite.name}`;
          }
        }));
      merged.add(stream.img.pipe(gulp.dest(iconDir + '/..')));
      merged.add(stream.css.pipe(gulp.dest(iconDir + '/..')));
    }
  });
  return merged.isEmpty() ? null : merged;  // 保证顺序执行

});

// ************************************ 编译图片 ************************************
function compileImg() {
  console.log('>>>>>>>>>>>>>>> 图片文件开始编译。' + NodeUtil.getNow());
  return gulp.src(Config.sourcePath.img);
}
gulp.task('task_img_dev', () => {
  return compileImg()
    .pipe(gulp.dest(Config.developPath.static))
    ;
});
gulp.task('task_img_dist', () => {
  return compileImg()
    .pipe(imagemin())
    .pipe(gulp.dest(Config.productPath.static))
    .pipe(size({showFiles: true}));
});

// ************************************ 编译JS ************************************
function webpackCompileJs() {
  console.log('>>>>>>>>>>>>>>> js文件开始编译。' + NodeUtil.getNow());
  let webpackConfig = require("./webpack/webpack.config.js");
  return gulp.src('')
    .pipe(webpack(webpackConfig))
    .pipe(header('\/* This css was compiled at ' + NodeUtil.getNow() + '. *\/\n'));
}
gulp.task('task_js_dev', () => {
  function deployDev(stream) {
    return stream.pipe(gulp.dest(Config.developPath.static))
      ;
  }

  // common部分的js
  deployDev(gulp.src(Config.sourcePath.js.common));
  // page部分的js
  return deployDev(webpackCompileJs());
});
gulp.task('task_js_dist', () => {
  function deployDist(options) {
    return options.stream.pipe(uglify({
      mangle: true,  // 类型：Boolean 默认：true 是否修改变量名
      compress: true,  // 类型：Boolean 默认：true 是否完全压缩
      preserveComments: 'none'  // all保留所有注释
    }))
    .pipe(gzip({append: false}))
      .pipe(rename({suffix: '.min'}))
      .pipe(rev())
      .pipe(gulp.dest(Config.productPath.static))
      .pipe(rev.manifest(options.manifestPath))
      .pipe(gulp.dest(Config.productPath.temp))
      ;
  }

  // common部分的js
  deployDist({
    stream: gulp.src(Config.sourcePath.js.common),
    manifestPath: 'rev-manifest/js-common.json'
  });
  // page部分的js
  return deployDist({
    stream: webpackCompileJs(),
    manifestPath: 'rev-manifest/js-page.json'
  });
});

// ************************************ 编译HTML ************************************
let outputType = null;  // 代码输出方式, 'static'(静态文件) | 'server'(express服务)
function compileHtml(isProduct) {
  console.log('>>>>>>>>>>>>>>> html文件开始编译。' + NodeUtil.getNow());
  var options = {
    src: (function () {
      if (isProduct) {
        return [Config.sourcePath.html, Config.productPath.temp + '/rev-manifest/*.json'];
      } else {
        return [Config.sourcePath.html];
      }
    })(),
    compress: isProduct ? '.min' : '',
    path: (function () {
      if (isProduct) {
        // CDN静态资源
        if (outputType == 'server') {
          return './static';
        } else if (outputType == 'static') {
          return './static';
        }
      } else {
        if (outputType == 'server') {
          return './static';
        } else if (outputType == 'static') {
          return './static';
        }
      }
    })()
  };
  return gulp.src(options.src)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: __dirname + '/../'
    }))
    .pipe(replace('{{path}}', options.path))
    .pipe(replace('{{min}}', options.compress))
    .pipe(rename({
      dirname: ''
    }));
}

gulp.task('task_html_dev', () => {
  return compileHtml()
    .pipe(gulp.dest(Config.developPath.root));
});
gulp.task('task_html_dist', () => {
  return compileHtml(true)
    .pipe(revCollector())
    .pipe(minifyHtml())
    .pipe(gulp.dest(Config.productPath.root))
    .pipe(size({showFiles: true}));
});

// ************************************ 复制router ************************************
function compileRouter() {
  console.log('>>>>>>>>>>>>>>> router开始复制。' + NodeUtil.getNow());
  return gulp.src(Config.sourcePath.router)
    .pipe(rename(function (path) {
      path.basename = path.dirname.split('/').pop(); // 取最后一级文件夹名作文路由文件名
      path.dirname = '';
    }));
}
gulp.task('task_router_dev', () => {
  return compileRouter()
    .pipe(gulp.dest(Config.developPath.router))
    ;
});
gulp.task('task_router_dist', () => {
  return compileRouter()
    .pipe(gulp.dest(Config.productPath.router))
    ;
});

// ************************************ 程序入口(npm start),选择以何种服务启动NodeJs. ************************************
let entry = {
  // 文件编译+监听
  staticDev: function (callback, output) {
    outputType = output || 'static';
    runSequence(
      ['task_clean_dev'],
      'task_sprite',
      ['task_css_dev', 'task_img_dev', 'task_js_dev'],
      'task_html_dev',
      'task_router_dev',
      function () {
        console.log('>>>>>>>>>>>>>>> gulp dev全部任务执行完毕。' + NodeUtil.getNow());
        // 监视html、模板变化
        gulp.watch([`${Config.sourcePath.root}/**/*.{html,tpl}`], ['task_html_dev']);
        // 监视router
        gulp.watch([Config.sourcePath.router], ['task_router_dev']);
        // 监视css变化
        gulp.watch([`${Config.sourcePath.root}/**/*.scss`], ['task_css_dev']);
        // 监视精灵图变化
        gulp.watch([`${Config.sourcePath.root}/**/img/*/*.{png,jpg,gif}`], ['task_sprite']);
        // 监视图片变化
        gulp.watch([`${Config.sourcePath.root}/**/img/*.{png,jpg,gif}`], ['task_img_dev']);
        // 监视js、模板变化
        gulp.watch([`${Config.sourcePath.root}/**/*.{js,jsx,tpl,vue}`], ['task_js_dev']);
        // 开启liveReload
        liveReload.listen();
        // 监听开发目录变化，触发liveReload刷新浏览器
        gulp.watch([`${Config.developPath.root}/**/*`], function (file) {
          //setTimeout(function(){
          // console.log('文件改变:        ' + path);
          liveReload.changed(file.path);
          //}, 1000);
        });
        console.log('>>>>>>>>>>>>>>> gulp 已开启所有监听。' + NodeUtil.getNow());
        callback && callback();
      }
    );
  },
  // 文件编译+压缩
  staticDist: function (callback, output) {
    outputType = output || 'static';
    runSequence(
      ['task_clean_dist'],
      'task_sprite',
      ['task_css_dist', 'task_img_dist', 'task_js_dist'],
      'task_html_dist',
      'task_router_dist',
      'task_clean_temp',
      function () {
        console.log('>>>>>>>>>>>>>>> gulp全部任务执行完毕。' + NodeUtil.getNow());
        callback && callback();
      }
    );
  },
  // 文件编译+监听+server启动
  serverDev: function () {
    entry.staticDev(function () {
      // supervisor -w dev -e js server.js（-e .意为-extension *，-w dev监视dev目录）
      supervisor.run(('-w dev -e js,html ./config/express/server.dev.js').split(' '));
    }, 'server');
  },
  // 文件编译+压缩+server启动
  serverDist: function () {
    entry.staticDist(function () {
      require('./express/server.dist.js');
    }, 'server');
  }
};
gulp.task('default', function () {
  // entry['staticDev']();
  // entry['serverDev']();
  // return;
  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'env',
      message: 'please choose environment:',
      choices: [
        'staticDev',
        'staticDist',
        'serverDev',
        'serverDist'
      ]
    }
  ]).then((answer) => {
    entry[answer.env]();
  });
});
gulp.task('dev', function () {
  entry.staticDev();
});
gulp.task('dist', function () {
  entry.staticDist();
});

// ************************************ 创建新模块(npm run create) ************************************
gulp.task('create', () => {
  console.log('>>>>>>>>>>>>>>> 开始创建新模块。' + NodeUtil.getNow());
  inquirer.prompt([
    {
      type: 'rawlist',
      name: 'mode',
      message: 'please input pc or mobile',
      choices: ['m', 'pc']
    },
    {
      type: 'input',
      name: 'name',
      message: 'please input page\'s name ?',
      validate: function (input) {
        return input ? true : false;
      }
    }, {
      type: 'input',
      name: 'title',
      message: 'please input page\'s title ?'
    }, {
      type: 'input',
      name: 'desc',
      message: 'please input page\'s description ?'
    }, {
      type: 'input',
      name: 'author',
      message: 'please input your name ?',
      default: 'swg'
    }
  ]).then((answer) => {
    answer.desc = answer.desc || answer.title;
    console.log(JSON.stringify(answer, ' ', 2));
    let sourcePath = answer.mode == 'pc' ? Config.generatorPath.pc : Config.generatorPath.m;
    let destPath = `${Config.sourcePath.root}/page/${answer.name}`;
    gulp.src(sourcePath)
      .pipe(rename({
        basename: answer.name
      }))
      .pipe(replace('${{name}}', answer.name))
      .pipe(replace('${{title}}', answer.title))
      .pipe(replace('${{desc}}', answer.desc))
      .pipe(replace('${{author}}', answer.author))
      .pipe(gulp.dest(destPath))
      .on('end', function () {
        setTimeout(function () {
          fs.mkdirSync(destPath + '/img');
          fs.mkdirSync(destPath + '/img/icon');
        }, 1000);
      })
    ;
    console.log('>>>>>>>>>>>>>>> ' + answer.page + '模块' + file + '文件创建完毕。' + NodeUtil.getNow());
  });
});

/**
 * 页面: ${{title}}
 * 功能描述: ${{desc}}
 * 作者: ${{author}}
 //var $body = $('body');
 //var tpl = require('../tpl/demo.tpl')({a: Date.now()});
 //var css = require('../css/demo.scss');
 //var json = require('../json/demo.json');
 */
import $ from 'jquery';
import PATH from 'PATH';
import helper from 'helper';
import lazyload from 'lazyload';
import param from 'param';

class Biz {
	/* 构造方法 */
	constructor() {
    this.params = window.param.getAll();
		this.init();
	}

	/* 初始化页面 */
	init() {
		var ts = this;
    console.log(ts.param);
		// 先渲染页面，再绑定事件
		$.when(
			this.getData(),
			this.getData()
		).then(function () {
			ts.bindEvent();
		})
	}

	/* 获取数据- */
	getData() {
		let ts = this,
			defer = $.Deferred();
		$.ajax({
			cache: false,
			async: true,
			url: PATH.interface + '/xxx',
			type: 'get',
			data: {}
		}).then(function (data) {
			ts.renderPage(data);
			defer.resolve();
		});
		return defer;
	}

	/* 渲染页面- */
	renderPage(data) {
		//var html = require('../tpl/xxx.tpl')(data);
		//$('xxx').html(html);
	}

	/* 绑定事件 */
	bindEvent() {

	}

	/* 工具方法 */
	util() {

	}
}

// 开始执行
$(document).on('DOMContentLoaded', function () {
	new Biz();
});

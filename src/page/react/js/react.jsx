/**
 * 页面: 
 * 功能描述: 
 * 作者: swg
 //var $body = $('body');
 //var tpl = require('../tpl/demo.tpl')({a: Date.now()});
 //var css = require('../css/demo.scss');
 //var json = require('../json/demo.json');
 */
import $ from 'jquery';
import PATH from 'path';
import helper from 'helper';
import lazyload from 'lazyload';
import param from 'param';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReactRender from '../../../widget/ReactDemo/com.jsx';

class Biz {
	/* 构造方法 */
	constructor() {
    this.params = param.getAll();
		this.init();
    
    // var aaaaa = ReactDOMServer.renderToString(<ReactRender/>);
    // var bbbbb = ReactDOMServer.renderToStaticMarkup(<ReactRender/>);
    let list = [1,2,3];
    function changeList(){
      debugger
      obj.setProps({
        list: [1]
      });
    }
    let obj = ReactDOM.render(<ReactRender list={list} changeList={changeList}/>, document.querySelector('.g-container'));
	}

	/* 初始化页面 */
	init() {
		// 先渲染页面，再绑定事件
		$.when(
			this.get(),
			this.get()
		).then(() => {
			this.bindEvent();
		})
	}

	/* 获取数据- */
	get() {
    return;
    let defer = $.Deferred();
		$.ajax({
			async: true,
			url: PATH.interface + '/xxx',
			type: 'get',
			data: {}
		}).then(data => {
			this.render(data);
			defer.resolve();
		});
		return defer;
	}

	/* 渲染- */
	render(data) {
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
	// new Biz();
});

/**
 * 页面: 
 * 功能描述: 
 * 作者: swg
 */
var $ = require('jquery');
var path = require('path');
var helper = require('helper');
require('lazyload');

function Biz() {
	var $body = $('body');
	//var tpl = require('../tpl/demo.tpl')({a: Date.now()});
	//var css = require('../css/demo.scss');
	//var json = require('../json/demo.json');

	var MultiLine = require('../../../widget/m-multiLine/m-multiLine.js');
	new MultiLine().init();
}
new Biz();

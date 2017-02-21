/**
 * 页面: vue
 * 功能描述: vue
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
import Vue from 'vue';
import List from '../vue/List.vue';

class Biz {
	/* 构造方法 */
	constructor() {

    new Vue({
      el: '#list',
      template: '<List v-bind:lis="lis" v-bind:t1="333333"/>',
      components: {
        List,
      },
      data: {
        lis: ['1114eeeeeeeeeeeedddddddd', 333, 6566, 123],
      }
    })
	}
}

// 开始执行
$(document).on('DOMContentLoaded', function () {
	new Biz();
});

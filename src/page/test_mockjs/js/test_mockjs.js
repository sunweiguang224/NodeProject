/**
 * 页面: test_mockjs
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
import mockjs from 'mockjs';
import tj from 'tj';

class Biz {
  /* 构造方法 */
  constructor() {
    $(document).ajaxStart(function(data){
    }).ajaxStop(function(data){
    });
    mockjs.mock('/123', {
      // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
      }]
    });
    $.ajax({
      // cache: false,
      async: true,
      url: '/123',
      type: 'get',
      // dataType:'json'
    }).then(function (data) {
      console.log(data);
    });
  }

  /* 初始化页面 */
  init() {
    var ts = this;
    // 先渲染页面，再绑定事件
    // this.getData();


  }

  /* 获取数据- */
  getData() {
    let ts = this,
      defer = $.Deferred();
    $.ajax({
      cache: false,
      async: true,
      url: 'http://localhost:1234/NodeProject/dev/common/js/common.bundle1.js',
      type: 'get',
      data: {}
    }).then(function (data) {
      console.log(data);
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

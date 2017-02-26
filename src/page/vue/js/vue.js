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
import recursion from '../vue/recursion.vue';

class Biz {
  /* 构造方法 */
  constructor() {

    window.vm = new Vue({
      el: '#list111',
      template: '<list v-bind:lis="lis" :bool="true" :html="html" :num="num" :type="type"/>',
      components: {
        list: List,
      },
      data: {
        lis: ['1114eeeeeeeeeeeedddddddd', 333, 6566, 123],
        html: '<b style="color: red;">哈哈</b><script >console.log(111)</script>',
        num: 1,
        type: 1,
      },
      created: function () {
        console.log('created');
      },
      beforeCreate: function () {
        console.log('beforeCreate');
      },
      beforeMount: function () {
        console.log('beforeMount');
      },
      mounted: function () {
        console.log('mounted');
      },
      beforeDestroy: function () {
        console.log('beforeDestroy');
      },
      destroyed: function () {
        console.log('destroyed');
      },
      beforeUpdate: function () {
        console.log('beforeUpdate');
      },
      updated: function () {
        console.log('updated');
      }
    });


    new Vue({
      el: '#recursion',
      template: '<recursion :list="list"/>',
      components: {
        recursion: recursion,
      },
      data: {
        list: [1, 2, 3, 4, 5],
      },
    })

    setTimeout(function () {
      var app4 = new Vue({
        el: '#app-4',
        data: {
          todos: [
            {text: 'Learn JavaScript'},
            {text: 'Learn Vue'},
            {text: 'Build something awesome'}
          ]
        },
        mounted: function (event) {
          this.$el.style.visibility = 'visible';
        }
      })
    }, 2000);
  }
}

// 开始执行
$(document).on('DOMContentLoaded', function () {
  new Biz();
});

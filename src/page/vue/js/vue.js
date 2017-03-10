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
import Vuex from 'vuex';
Vue.use(Vuex)
import List from '../vue/List.vue';
import recursion from '../vue/recursion.vue';

class Biz {
  /* 构造方法 */
  constructor() {

    var store1 = new Vuex.Store({
      state: {
        count: 333
      },
      mutations: {
        increment: state => state.count++,
        decrement: state => state.count--
      }
    });
    
    // var store = {
    //   state: {
    //     count: 333
    //   },
    //   mutations: {
    //     increment: state => state.count++,
    //     decrement: state => state.count--
    //   }
    // };

    let list1 = new Vue({
      el: '#list111',
      store: store1,
      template: `
        <list v-bind:lis="lis" :bool="true" :html="html" :type="type" :num="num" v-on:bbb="bbb"
         />
        `,
      components: {
        list: List,
      },
      data: {
        lis: ['1114eeeeeeeeeeeedddddddd', 333, 6566, 123],
        html: '<b style="color: red;">哈哈ddddd</b><script >console.log(111)</script>',
        num: 1,
        type: 1,
      },
      propsData: {
        num: 1
      },
      methods: {
        click11: function () {
          alert(6)
        },
        bbb(event){
          debugger
          recursion1.$data.isShow = false;
        }
      },
    });
debugger

    var isShow = true;
    let recursion1 = new Vue({
      el: '#recursion',
      template: '<recursion :list="list" :isShow="isShow"/>',
      components: {
        recursion: recursion,
      },
      data: {
        list: [1, 2, 3, 4, 5],
        isShow: isShow,
      },
    });
    // setTimeout(function () {
    //   var app4 = new Vue({
    //     el: '#app-4',
    //     data: {
    //       todos: [
    //         {text: 'Learn JavaScript'},
    //         {text: 'Learn Vue'},
    //         {text: 'Build something awesome'}
    //       ]
    //     },
    //     mounted: function (event) {
    //       this.$el.style.visibility = 'visible';
    //     }
    //   })
    // }, 2000);
  }
}

// 开始执行
$(document).on('DOMContentLoaded', function () {
  new Biz();
});

/**
 * 页面: 
 * 功能描述: 
 * 作者: swg
 */
var lazyload = require('lazyload');
var $ = require('jquery');
var jQuery = $;
var path = require('path');
var helper = require('helper.webpack');
var uuid = require('uuid');

function A(){

}
Object.assign(A.prototype, {
	hello: function(){
		console.log('hello');
	}
});
console.log(A.prototype.constructor)
console.dir(A)
new A().hello();
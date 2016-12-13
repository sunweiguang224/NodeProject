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

function A() {

}
Object.assign(A.prototype, {
	hello: function () {
		console.log('hello');
	}
});
console.log(A.prototype.constructor)
console.dir(A)
new A().hello();

var a = '1';
var b = '哈哈${a}嘎嘎';

class Big {
	constructor() {
		console.log('constructor Big');
	}

	b() {
		console.log('method b');
	}
}
class Small extends Big {
	constructor() {
		console.log('constructor Small');
		super();
	}

	s() {
		console.log('method s');
	}
}

debugger
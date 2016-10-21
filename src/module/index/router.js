var express = require('express');
var request = require('../../../server/request.js');

var router = express.Router();

router.get('/index', function(req, res, next){
	/*request.get({
		url: 'http://api.k.sohu.com/api/search/v6/hotwords.go',
		param: {
			a: 1,
			b: '二'
		},
		success: function(data){
			console.log(data);
			//res.render('dev/module/test2/test2.html', data);
			res.render('module/test2/test2.html', data);
		}
	});*/
	console.log(__dirname + '/index.html')
	res.render(__dirname + '/index.html');
});

module.exports = router;

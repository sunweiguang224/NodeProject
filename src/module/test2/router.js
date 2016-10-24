var express = require('express');
var ajax = require('../../../config/express/ajax.js');

var router = express.Router();

router.get('/test2', function(req, res, next){
	ajax.get({
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
	});
});

module.exports = router;

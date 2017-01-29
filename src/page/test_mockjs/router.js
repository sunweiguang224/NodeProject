var express = require('express');
var ajax = require('../../../config/express/ajax.js');
var mockjs = require('mockjs');


var router = express.Router();

router.get('/test_mockjs', function (req, res, next) {
  ajax.get({
    url: 'http://api.k.sohu.com/api/search/v6/hotwords.go',
    param: {
      a: 1,
      b: '二'
    },
    success: function (data) {
      // console.log(data);
      // res.render('dev/page/test2/test2.html', data);
      // res.render('page/test2/test2.html', data);
      // res.render('page/test2/test2.html', data);
      // var a = mockjs.mock({
      //   // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      //   'list|1-10': [{
      //     // 属性 id 是一个自增数，起始值为 1，每次增 1
      //     'id|+1': 1
      //   }]
      // });
      // console.log(a)
      // res.write(JSON.stringify(a));
      // res.end();

      var b = {
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        'list|1-10': [{
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1
        }]
      }
      console.log(JSON.stringify(b));

      //连接数据库
      var mysql = require('mysql');
      var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'swg224',
        database: 'mockserver'
      });

      connection.connect();
      //查询
      connection.query('SELECT * from mock', function (err, rows, fields) {
        if (err) throw err;

        console.log(JSON.stringify(rows, ' ', 2));
        // console.log(JSON.stringify(fields, ' ', 2));

        res.write(JSON.stringify(rows, ' ', 2));
        res.end();
      });
      //关闭连接
      connection.end();

    }
  });
});

module.exports = router;

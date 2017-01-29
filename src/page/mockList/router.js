var express = require('express');
var ajax = require('../../../config/express/ajax.js');
var mockjs = require('mockjs');
var artTemplate = require('art-template');

var router = express.Router();

// 列表页面
router.get('/mockList', function (req, res, next) {
  console.log(__dirname)
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
  connection.query('SELECT * from mock order by id desc', function (err, rows, fields) {
    if (err) throw err;
    res.render(__dirname + '/../../../dev/page/mockList/mockList.html', {rows: rows});
    res.end();
  });
  //关闭连接
  connection.end();
});


// 删除接口
router.get('/mockDelete_interface', function (req, res, next) {
  console.log(req.query.id);
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
  connection.query('delete from mock where id = '+req.query.id, {
    path: req.query.path,
    json: req.query.json
  }, function (err) {
    var result = '删除成功';
    if (err) {
      result = '删除失败  ' + err.toString();
    }
    // 输出
    res.write(result);
    res.end();
  });
  //关闭连接
  connection.end();
});

module.exports = router;

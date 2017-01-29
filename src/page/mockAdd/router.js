var express = require('express');
var ajax = require('../../../config/express/ajax.js');
var mockjs = require('mockjs');

var router = express.Router();

// 添加页面
router.get('/mockAdd', function (req, res, next) {
  res.render(__dirname + '/../../../dev/page/mockAdd/mockAdd.html');
});

// 添加接口
router.get('/mockAdd_interface', function (req, res, next) {
  //连接数据库
  var mysql = require('mysql');
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'swg224',
    database: 'mockserver'
  });
  connection.connect();
  console.log(req.query.path);
  console.log(req.query.json);
  //查询
  connection.query('insert into mock set ?', {
    path: req.query.path,
    json: req.query.json
  }, function (err) {
    var result = '添加成功';
    if (err) {
      result = '添加失败  ' + err.toString();
    }
    // 输出
    res.write(result);
    res.end();
  });
  //关闭连接
  connection.end();
});

/* 启动模拟接口服务 */
/*//连接数据库
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
  // 遍历启动
  for (var i in rows) {
    var row = rows[i];
    // 启动

    router.get(row.path, function (req, res, next) {
      try {
        console.log(JSON.parse(row.json))
        var json = mockjs.mock(JSON.parse(row.json));
        res.write(JSON.stringify(json));
      } catch (error) {
        res.write(error.toString());
        console.log(error);
      }
      res.end();
    });
    console.log('已经成功启动模拟接口:' + row.path)
  }
});
//关闭连接
connection.end();*/

// 返回模拟的数据
router.get('/mock/*', function (req, res, next) {
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
  connection.query('SELECT * from mock where path=' + mysql.escape(req.originalUrl), function (err, rows, fields) {
    if (err) throw err;
    try {
      var row = rows[0];
      console.log(JSON.parse(row.json))
      var json = mockjs.mock(JSON.parse(row.json));
      res.write(JSON.stringify(json));
    } catch (error) {
      res.write(error.toString());
      console.log(error);
    }
    res.end();
  });
  //关闭连接
  connection.end();
});

module.exports = router;

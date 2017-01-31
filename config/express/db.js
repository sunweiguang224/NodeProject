var mysql = require('mysql');

var db = function (method) {
  // 创建连接,每次connection.end()之后都要重新创建
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'swg224',
    database: 'mockserver'
  });
  // 连接数据库
  connection.connect();

  try {
    // 执行方法
    method && method(connection);
  } catch (error) {
    console.error(error.toString());
    throw error;
  } finally {
    //关闭连接
    connection.end();
  }
};

module.exports = db;

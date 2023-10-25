var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express(); // 开启express服务

const option = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3000',
  database: 'user'
}


app.use(bodyParser.json()); // json请求

app.use(bodyParser.urlencoded({extended: false})); // 表单请求

const db = mysql.createPool(option); // sql连接池链接sql表

// const conn = mysql.createConnection(option);

// db.connect(err => {
//   if (err) {
//     console.log('连接数据库失败')
//   } else {
//     console.log('连接数据库成功')
//   }
// })

app.all('/',(req,res) => {
  res.setHeader('Content-Type','text/plain') // 设置请求头
  db.query('SELECT * FROM user',(err,data) => { // 登录接口 数据库查询，根据用户名查询是否有此用户
  if(err) {
    res.send({"msg": "404"});
  } else {
    res.json(new Result({data: data}))
    }
  });
})

function Result({state=1,msg='ok',data={}}) {
  this.state = state;
  this.msg = msg;
  this.data = data;
}

module.exports = app;
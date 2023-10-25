/**
  模型文件user.js，这个模型用来和数据库里的表对应，
 */

var Sequelize = require('sequelize');
var sequelize = require('./db');

// 创建 model
  const Usert = sequelize.define('my', {
    userName: {
        type: Sequelize.STRING, // 指定值的类型
        field: 'username' // 指定存储在表中的键名称
    },
    // 没有指定 field，表中键名称则与对象键名相同，为 password
    password: {
        type: Sequelize.STRING
    }
  },{
      // 如果为 true 则表的名称和 model 相同，即 user
      // 为 false MySQL创建的表名称会是复数 users
      // 如果指定的表名称本就是复数形式则不变
      freezeTableName: false
  });
//如果不存在就创建此表
var my = Usert.sync({ force: false });

// 添加新用户
exports.addUser = function(username, password) {
  // 向 user 表中插入数据
  return Usert.create({
      username: username,
      password: password
  });
};
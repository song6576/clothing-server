/**
 * 系统用户表
 * 创建一个User.js文件,创建一个数据模型,规定参数，将构造好的模块抛出
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
  'users',
  {
    id: {
      type:Sequelize.INTEGER, // int类型
      primaryKey: true, // 主键
      autoIncrement: true, // 自增
    },
    // 邮箱
    // email: {
    //   type:Sequelize.STRING, // 字符串
    // },
    // 用户名
    username: {
      type:Sequelize.STRING, // 字符串
    },
    // 密码
    password: {
      type:Sequelize.STRING, // 字符串
    },
    // 创建时间
    created: {
      type:Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    // 手机号
    iphone: {
      type:Sequelize.STRING,
    },
    // 角色
    role: {
      type:Sequelize.STRING,
    },
  },{
    timestamps: false, // 不自动加上createdAt和updatedAt
  }
)
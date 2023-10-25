/**
 * 居民信息表
 * 创建一个residents.js文件,创建一个数据模型,规定参数，将构造好的模块抛出
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
  'residents',
  {
    id: {
      type:Sequelize.INTEGER, // int类型
      primaryKey: true, // 主键
      autoIncrement: true, // 自增
    },
    // 类型
    type: {
      type:Sequelize.STRING, // 字符串
    },
    // 备注
    text: {
      type:Sequelize.STRING, // 字符串
    }
  },{
    timestamps: false, // 不自动加上createdAt和updatedAt
  }
)
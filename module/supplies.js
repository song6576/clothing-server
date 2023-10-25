/**
 * 物资信息管理表
 * 创建一个residents.js文件,创建一个数据模型,规定参数，将构造好的模块抛出
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
  'supplies',
  {
    id: {
      type:Sequelize.INTEGER, // int类型
      primaryKey: true, // 主键
      autoIncrement: true, // 自增
    },
    // 服装名称
    suppliesName: {
      type:Sequelize.STRING, // 字符串
    },
    // 服装数量
    count: {
      type:Sequelize.INTEGER, // int类型
    },
    // 类别
    type: {
      type:Sequelize.STRING,
    },
    // 姓名
    username: {
      type:Sequelize.STRING,
    },
    // 创建时间
    createTime: {
      type:Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
  },{
    timestamps: false, // 不自动加上createdAt和updatedAt
  }
)
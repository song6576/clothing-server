/**
 * 健康管理表
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
  'health',
  {
    id: {
      type:Sequelize.INTEGER, // int类型
      primaryKey: true, // 主键
      autoIncrement: true, // 自增
    },
    // 姓名
    name: {
      type:Sequelize.STRING,
    },
    // 积分
    integral: {
      type:Sequelize.INTEGER,
    },
    // 创建时间
    createTime: {
      type:Sequelize.STRING,
    },
  },{
    timestamps: false, // 不自动加上createdAt和updatedAt
    freezeTableName: true, // 自动会给表名增加复数，比如user---users,设置为false，不自动添加
  }
)
/**
 * 服装信息申请审批表
 * 创建一个audit.js文件,创建一个数据模型,规定参数，将构造好的模块抛出
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
  'audits',
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
    amount: {
      type:Sequelize.INTEGER, // int类型
    },
    // 备注
    type: {
      type:Sequelize.STRING,
    },
    // 申请人
    auditPeople: {
      type:Sequelize.STRING,
    },
    // 备注
    text: {
      type:Sequelize.STRING,
    },
    // 状态
    status: {
      type:Sequelize.INTEGER,
      defaultValue: 0
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
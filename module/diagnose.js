/**
 * 物资信息申请审批表
 * 创建一个audit.js文件,创建一个数据模型,规定参数，将构造好的模块抛出
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
  'diagnoses',
  {
    id: {
      type:Sequelize.INTEGER, // int类型
      primaryKey: true, // 主键
      autoIncrement: true, // 自增
    },
    // 患者姓名
    name: {
      type:Sequelize.STRING,
    },
    // 诊断时间
    diagnoseTime: {
      type:Sequelize.STRING, // 字符串
    },
    // 患者电话
    iphone: {
      type:Sequelize.STRING,
    },
    // 居住地址
    address: {
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
    freezeTableName: true, // 自动会给表名增加复数，比如user---users,设置为false，不自动添加
  }
)
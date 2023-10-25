/**
 * 疫苗接种表
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
  'warning',
  {
    id: {
      type:Sequelize.INTEGER, // int类型
      primaryKey: true, // 主键
      autoIncrement: true, // 自增
    },
    // 接种姓名
    region: {
      type:Sequelize.STRING,
    },
    // 居住地址
    address: {
      type:Sequelize.STRING,
    },
    // 标签
    tag: {
      type:Sequelize.INTEGER,
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
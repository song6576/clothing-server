/**
 * 财务管理
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
    'finance',
    {
        id: {
            type: Sequelize.INTEGER, // int类型
            primaryKey: true, // 主键
            autoIncrement: true, // 自增
        },
        username: {
            type: Sequelize.STRING,
        },
        // 支出
        disburse: {
            type: Sequelize.STRING,
        },
        // 充值
        amount: {
            type: Sequelize.STRING,
        },
        // 创建时间
        createTime: {
            type: Sequelize.STRING,
        },
    }, {
    timestamps: false, // 不自动加上createdAt和updatedAt
    freezeTableName: true, // 自动会给表名增加复数，比如user---users,设置为false，不自动添加
}
)
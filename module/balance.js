/**
 * 系统用户表
 * 创建一个balance.js文件,创建一个数据模型,规定参数，将构造好的模块抛出
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
    'balance',
    {
        id: {
            type: Sequelize.INTEGER, // int类型
            primaryKey: true, // 主键
            autoIncrement: true, // 自增
        },
        username: {
            type: Sequelize.STRING, // 字符串
        },
        amount: {
            type: Sequelize.STRING,
        },
        // 创建时间
        createTime: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
    }, {
    timestamps: false, // 不自动加上createdAt和updatedAt
}
)
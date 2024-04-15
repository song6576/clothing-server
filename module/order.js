/**
 * 订单列表
 * 创建一个order.js文件,创建一个数据模型,规定参数，将构造好的模块抛出
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
    'order',
    {
        id: {
            type: Sequelize.INTEGER, // int类型
            primaryKey: true, // 主键
            autoIncrement: true, // 自增
        },
        orderNo: {
            type: Sequelize.STRING, // 字符串
        },
        shappingName: {
            type: Sequelize.STRING, // 字符串
        },
        destory: {
            type: Sequelize.STRING, // 字符串
        },
        price: {
            type: Sequelize.DECIMAL,
        },
        amount: {
            type: Sequelize.INTEGER, // int类型
        },
        account: {
            type: Sequelize.STRING,
        },
        payment: {
            type: Sequelize.STRING,
        },
        // 状态
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        imgUrl: {
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
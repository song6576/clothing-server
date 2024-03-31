/**
 * 轮播图片
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
    'avatar',
    {
        id: {
            type: Sequelize.INTEGER, // int类型
            primaryKey: true, // 主键
            autoIncrement: true, // 自增
        },
        // 类型
        imgUrl: {
            type: Sequelize.STRING, // 字符串
        },
        username: {
            type: Sequelize.STRING, // 字符串
        },
        createTime: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
    }, {
    timestamps: false, // 不自动加上createdAt和updatedAt
}
)
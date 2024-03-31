/**
 * 商品列表
 */
const Sequelize = require('sequelize');
const db = require('../utils/db');

module.exports = db.sequelize.define(
    'shop',
    {
        id: {
            type: Sequelize.INTEGER, // int类型
            primaryKey: true, // 主键
            autoIncrement: true, // 自增
        },
        shopName: {
            type: Sequelize.STRING,
        },
        imgUrl: {
            type: Sequelize.STRING,
        },
        price: {
            type: Sequelize.DECIMAL,
        },
        destory: {
            type: Sequelize.STRING,
        },
        inventory: {
            type: Sequelize.STRING,
        },
        // 创建时间
        createTime: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
    }, {
    timestamps: false, // 不自动加上createdAt和updatedAt
    freezeTableName: true, // 自动会给表名增加复数，比如user---users,设置为false，不自动添加
}
)
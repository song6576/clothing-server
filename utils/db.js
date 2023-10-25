//db.js
var Sequelize = require('sequelize');

const db = {};

//四个参数分别是 数据库名称，用户名，密码，配置

const sequelize = new Sequelize('user', 'root', 'root', { //换成自己的数据库
    host: 'localhost', // 数据库地址
    dialect: 'mysql', // 指定连接的数据库类型
    pool: {
        max: 5, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        idle: 10000, // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
        acquire: 3000
    },
    define: {
        timestamps: false,
        freezeTableName: true, // 自动会给表名增加复数，比如user---users,设置为false，不自动添加
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
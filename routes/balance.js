/**
 * 头像
 */
const express = require('express');
const router = express.Router();
const balance = require('../module/balance');
const cors = require('cors');
router.use(cors());

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 添加
router.post('/addBalance', async (req, res) => {
    const content = await balance.create({
        username: req.query.username,
        amount: req.query.amount,
        createTime: formatDate(new Date()),
    })
    res.send({ code: 200, msg: '添加成功!', content })
})

// 查询
router.get('/reqBalance', async (req, res) => {
    balance.findAll()
        .then(data => {
            res.send({ code: 200, msg: '查询成功!', data })
        })
})

// 根据条件查询，比如用户名称
router.get('/reqBalanceByName', async (req, res) => {
    balance.findAll({
        where: {
            username: req.query.username
        }
    })
        .then(data => {
            res.send({ code: 200, msg: '查询成功!', data })
        })
})

// 删除
router.post('/delBalance', (req, res) => {
    balance.destroy({
        where: {
            id: req.query.id
        }
    }).then(data => {
        res.send({ code: 200, msg: '删除成功!', data })
    })
})

// 修改
router.post('/updateBalance', async (req, res) => {
    const content = await balance.findByPk(req.query.id).then(post => {
        post.update({
            amount: req.query.amount,
            createTime: formatDate(new Date())
        })
    })
    res.send({ code: 200, msg: '修改成功!', content })
})


module.exports = router;
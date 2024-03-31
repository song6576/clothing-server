const express = require('express');
const router = express.Router();
const finance = require('../module/finance');

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 查询
router.get('/finance', (req, res) => {
    finance.findAll().then(data => {
        res.send({ code: 200, msg: '查询成功!', data })
    })
        .catch(err => res.send('error' + err))
})

// 添加
router.post('/addFinance', async(req, res) => {
    const now = new Date();
    const formattedDate = formatDate(now);
    const content = await finance.create({
        username: req.query.username,
        disburse: req.query.disburse,
        amount: req.query.amount,
        createTime: formattedDate,
    })
    res.send({ code: 200, msg: '添加成功!', content })
})

// 根据查询的id修改
router.post('/updateFinance', async(req, res) => {
    const now = new Date();
    const formattedDate = formatDate(now);
    const content = await finance.findByPk(req.query.id).then(post => {
        post.update({
            username: req.query.username,
            disburse: req.query.disburse,
            amount: req.query.amount,
            createTime: formattedDate,
        })
    })
    res.send({ code: 200, msg: '服装审批信息修改成功!', content })
})


// 删除
router.post('/deleteFinance', (req, res) => {
    finance.destroy({
        where: {
            id: req.query.id
        }
    }).then(data => {
        res.send({ code: 200, msg: '删除成功!', data })
    })
})

module.exports = router

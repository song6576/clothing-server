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
    try {
        const { username, amount } = req.query;

        // 查询数据库，看是否已存在该用户的余额记录
        let existingBalance = await balance.findAll({
            where: {
                username: req.query.username
            }
        })

        if (existingBalance.length > 0) {
            // 如果已存在该用户的记录，则更新现有记录的金额
            existingBalance[0].amount = parseFloat(existingBalance[0].amount) + parseFloat(amount);
            await existingBalance[0].save();
            res.send({ code: 200, msg: '充值成功！', content: existingBalance[0] });
        } else {
            // 如果不存在该用户的记录，则新增一条记录
            const newBalance = await balance.create({
                username: username,
                amount: amount,
                createTime: formatDate(new Date()),
            });
            res.send({ code: 200, msg: '充值成功！', content: newBalance });
        }
    } catch (error) {
        // 错误处理
        console.error("Error:", error);
        res.status(500).send({ code: 500, msg: '服务器内部错误' });
    }
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
// router.post('/updateBalance', async (req, res) => {
//     const content = await balance.findByPk(req.query.id).then(post => {
//         post.update({
//             amount: req.query.amount,
//             createTime: formatDate(new Date())
//         })
//     })
//     res.send({ code: 200, msg: '修改成功!', content })
// })

router.post('/updateBalance', async (req, res) => {
    try {
        const { username, amount } = req.query;
        const content = await balance.findAll({
            where: {
                username: username
            }
        })
        if (content.length > 0) {
            content[0].amount = parseFloat(amount);
            await content[0].save();
            res.send({ code: 200, msg: '充值成功！', content: content[0] });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ code: 500, msg: '服务器内部错误' });
    }
})

module.exports = router;
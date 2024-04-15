/**
 * 订单管理
 */
const express = require('express');
const router = express.Router();
const Audit = require('../module/order');

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}`;
}

// 添加订单信息
router.post('/addOrder', async (req, res) => {
    const now = new Date();
    const content = await Audit.create({
        shappingName: req.query.shappingName,
        orderNo: formatDate(now) + req.query.id,
        amount: req.query.amount,
        account: req.query.account,
        payment: req.query.payment,
        destory: req.query.destory,
        imgUrl: req.query.imgUrl,
        price: req.query.price,
        status: 0,
        createTime: now,
    })
    res.send({ code: 200, msg: '添加订单信息成功!', content })
})

// 查询所有订单信息
router.post('/order', (req, res) => {
    Audit.findAll().then(data => {
        res.send({ code: 200, msg: '信息查询成功!', data })
    })
})

// 通过分类查询订单信息
router.post('/reqClothingType', async (req, res) => {
    let result = await Audit.findAll({
        where: {
            type: req.query.type,
        },
        attributes: ['id', 'auditPeople', 'suppliesName','destory','price', 'amount', 'type', 'createTime', 'text', 'status'], //允许显示的字段
    });
    res.send({
        code: 200,
        result
    })
})

// 根据条件查询
router.post('/reqOrderName', async (req, res) => {
    let data = await Audit.findAll({
        where: {
            account: req.query.account,
        },
        attributes: ['id', 'orderNo', 'shappingName', 'destory','price','amount','account', 'createTime', 'payment', 'status','imgUrl'], //允许显示的字段
    });
    res.send({
        code: 200,
        data
    })
})

// 删除
router.post('/delAudit', (req, res) => {
    Audit.findByPk(req.query.id).then(id => {
        if (id) {
            Audit.destroy({
                where: {
                    id: req.query.id
                }
            })
            res.send({ status: 200, msg: '删除订单信息成功!' })
        } else {
            res.send({ msg: '删除失败/订单信息已经删除过了!' })
        }
    })
        .catch(err => res.send('error' + err))
})

// 修改
router.post('/updateOrder', async (req, res) => {
    const now = new Date()
    const content = await Audit.findByPk(req.query.id).then(post => {
        post.update({
            shappingName: req.query.shappingName,
            orderNo: formatDate(now) + req.query.id,
            amount: req.query.amount,
            account: req.query.account,
            payment: req.query.payment,
            destory: req.query.destory,
            imgUrl: req.query.imgUrl,
            price: req.query.price,
            status: req.query.status,
            createTime: now,
        })
    })
    res.send({ status: 200, msg: '服装审批信息修改成功!', content })
})


module.exports = router;